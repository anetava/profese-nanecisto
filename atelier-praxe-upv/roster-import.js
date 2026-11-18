'use strict';
window.IVP_ROSTER=null;
try { const data=JSON.parse(localStorage.getItem('ivp.roster.2026-2027')); if(data?.people?.length&&Array.isArray(data.placements))window.IVP_ROSTER=data; } catch {}
window.IVP_IMPORT=(()=>{
const key='ivp.roster.2026-2027';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function unzip(file){
if(file.size>12000000)throw Error('Soubor je příliš velký. Použijte původní tabulku do 12 MB.');
const bytes=new Uint8Array(await file.arrayBuffer()),view=new DataView(bytes.buffer),decoder=new TextDecoder();let end=bytes.length-22;
while(end>=Math.max(0,bytes.length-65557)&&view.getUint32(end,true)!==0x06054b50)end--;
if(end<0)throw Error('Soubor není platná tabulka XLSX.');
const count=view.getUint16(end+10,true);let pos=view.getUint32(end+16,true),total=0;const files={};
for(let i=0;i<count;i++){
if(view.getUint32(pos,true)!==0x02014b50)throw Error('Tabulku nelze přečíst.');
const method=view.getUint16(pos+10,true),size=view.getUint32(pos+20,true),plain=view.getUint32(pos+24,true),n=view.getUint16(pos+28,true),extra=view.getUint16(pos+30,true),comment=view.getUint16(pos+32,true),offset=view.getUint32(pos+42,true),name=decoder.decode(bytes.slice(pos+46,pos+46+n));pos+=46+n+extra+comment;
if(!/^xl\/(sharedStrings.xml|worksheets\/sheet\d+.xml|workbook.xml|_rels\/workbook.xml.rels)$/.test(name))continue;
total+=plain;if(total>25000000)throw Error('Rozbalená tabulka je příliš velká.');
const start=offset+30+view.getUint16(offset+26,true)+view.getUint16(offset+28,true);let content=bytes.slice(start,start+size);
if(method===8)content=new Uint8Array(await new Response(new Blob([content]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer());else if(method!==0)throw Error('Nepodporované komprimování tabulky.');
files[name]=decoder.decode(content);
}return files;
}
function parse(files){
const xml=s=>new DOMParser().parseFromString(s||'<empty/>','application/xml');
const strings=[...xml(files['xl/sharedStrings.xml']).getElementsByTagName('si')].map(n=>n.textContent);
const relations=[...xml(files['xl/_rels/workbook.xml.rels']).getElementsByTagName('Relationship')];
const sheets=[...xml(files['xl/workbook.xml']).getElementsByTagName('sheet')];
const getSheet=name=>{const sheet=sheets.find(s=>s.getAttribute('name')===name);if(!sheet)throw Error('Chybí list '+name+'.');const rel=relations.find(r=>r.getAttribute('Id')===sheet.getAttribute('r:id'));let path=rel?.getAttribute('Target')||'';path=path.startsWith('/')?path.slice(1):'xl/'+path;return xml(files[path]);};
const rows=doc=>[...doc.getElementsByTagName('row')].map(row=>{const values=[];for(const cell of row.getElementsByTagName('c')){const col=cell.getAttribute('r').match(/^[A-Z]+/)[0];let idx=0;for(const char of col)idx=idx*26+char.charCodeAt(0)-64;const value=cell.getElementsByTagName('v')[0]?.textContent||'';values[idx-1]=String(cell.getAttribute('t')==='s'?strings[+value]:cell.getAttribute('t')==='inlineStr'?cell.textContent:value).trim();}return {row:+row.getAttribute('r'),values};});
const source=rows(getSheet('Studenti a praxe')).filter(r=>r.row>=6&&r.values.some(Boolean));
const kinds={'Souvislá řízená praxe':'continuous','Skupinový náslech':'group','Průběžná praxe na IVP':'ivp','Řízená náslechová praxe':'guided','Microteaching':'micro','Reflexe pedagogické praxe':'reflection'};
const people=[],placements=[],seen=new Map();
for(const {row,values:r} of source){const [name,email,group,kind,school,term,status]=Array.from({length:7},(_,i)=>r[i]||'');if(!name||!email||!email.includes('@'))throw Error('Na řádku '+row+' chybí jméno nebo platný školní e-mail.');if(!kinds[kind])throw Error('Na řádku '+row+' je neznámý druh praxe: '+kind);const mail=email.toLowerCase();let person=seen.get(mail);if(!person){person={id:'u-'+encodeURIComponent(mail),name,email,group,stage:kinds[kind]};people.push(person);seen.set(mail,person);}placements.push({id:'p-'+row,studentId:person.id,kind,moduleId:kinds[kind],school,term,status:status||'K doplnění',sourceRow:row});}
if(!people.length)throw Error('Tabulka neobsahuje studenty.');
const schools=rows(getSheet('Skoly')).filter(r=>r.row>=6&&r.values.some(Boolean)).map(({values:r})=>({name:r[0]||'',email:r[1]||'',phone:r[2]||'',contact:r[3]||''}));
return {people,placements,schools};
}
const stateKey='atelier-praxe-upv.live.v1';
function validateBackup(obj,options={}){
const fail=()=>{throw Error(options.scope==='student'?'Soubor není úplná osobní záloha studenta pro rok 2026/2027.':'Soubor není úplná koordinátorská záloha Ateliéru pro rok 2026/2027.');};
const record=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const text=v=>typeof v==='string';
const identifier=v=>text(v)&&v.length>0&&v.length<=500&&!/[\s/\\<>"']/.test(v)&&!['__proto__','prototype','constructor'].includes(v);
const modules=new Set(['ivp','group','guided','micro','continuous','reflection','nacvik','adaptio','ss','kurzy']);
function safe(v,depth=0){if(depth>40)fail();if(v&&typeof v==='object'){for(const k of Object.keys(v)){if(['__proto__','prototype','constructor'].includes(k))fail();safe(v[k],depth+1);}}}
safe(obj);
const scope=options.scope||'coordinator';
if(!['coordinator','student'].includes(scope)||!record(obj)||obj.format!=='atelier-private-v2'||obj.scope!==scope||obj.year!=='2026/2027'||!record(obj.roster)||!record(obj.db))fail();
const roster=obj.roster;if(!Array.isArray(roster.people)||!roster.people.length||roster.people.length>10000||!Array.isArray(roster.placements)||!Array.isArray(roster.schools))fail();
if(scope==='student'&&roster.people.length!==1)fail();
const ids=new Set(),mails=new Set();
for(const p of roster.people){if(!record(p)||!identifier(p.id)||ids.has(p.id)||!text(p.name)||!p.name.trim()||!text(p.email)||!p.email.includes('@')||!text(p.group)||!modules.has(p.stage))fail();const mail=p.email.trim().toLowerCase();if(mails.has(mail))fail();ids.add(p.id);mails.add(mail);}
if(Object.keys(obj.db).length!==ids.size||Object.keys(obj.db).some(id=>!ids.has(id)))fail();
const placementIds=new Set();
for(const p of roster.placements){if(!record(p)||!identifier(p.id)||placementIds.has(p.id)||!ids.has(p.studentId)||!modules.has(p.moduleId)||!['kind','school','term','status'].every(k=>text(p[k])))fail();placementIds.add(p.id);}
for(const s of roster.schools){if(!record(s)||!['name','email','phone','contact'].every(k=>text(s[k])))fail();}
for(const id of ids){const entry=obj.db[id];if(!record(entry)||!['records','events','reflections','placements'].every(k=>Array.isArray(entry[k])))fail();
 for(const key of ['records','events','reflections','placements']){const seen=new Set();for(const row of entry[key]){if(!record(row)||!identifier(row.id)||seen.has(row.id))fail();seen.add(row.id);if(key==='reflections'){if(!modules.has(row.blockId)||!['draft','submitted','returned','confirmed'].includes(row.status))fail();}else if(!modules.has(row.moduleId))fail();}}
 for(const p of entry.placements){if(p.studentId!==id||!placementIds.has(p.id)||!['kind','school','term','status'].every(k=>text(p[k])))fail();const source=roster.placements.find(r=>r.id===p.id);if(source.studentId!==id||source.moduleId!==p.moduleId)fail();}
 const expected=roster.placements.filter(r=>r.studentId===id);if(expected.length!==entry.placements.length||expected.some(p=>!entry.placements.some(r=>r.id===p.id)))fail();
}
if(obj.finalOutputs!==undefined)window.FINAL_OUTPUT_CONTEXT.validateDrafts(obj.finalOutputs,ids);
return obj;
}
function restoreBackup(input){
const obj=validateBackup(input),ids=obj.roster.people.map(p=>p.id);
window.FINAL_OUTPUT_CONTEXT.applyStorage([[key,JSON.stringify(obj.roster)],[stateKey,JSON.stringify(obj.db)],...window.FINAL_OUTPUT_CONTEXT.changes(obj.finalOutputs,ids)]);
return obj;
}
function workingBackup(input,people,role,currentDb){
const scope=role==='ivp'?'coordinator':role==='student'?'student':null;
const fail=()=>{throw Error('Záloha neodpovídá tomuto pracovnímu profilu a jeho praxím.');};
if(!scope||!input||input.year!=='2026/2027')fail();
let obj=input;
if(obj.format==='atelier-private-v1'){
 if(scope!=='coordinator'||obj.scope==='student'||!obj.db)fail();
 const selected=Object.fromEntries(people.map(p=>[p.id,obj.db[p.id]]));
 obj={...obj,format:'atelier-private-v2',scope:'coordinator',db:selected,roster:{people,placements:people.flatMap(p=>selected[p.id]?.placements||[]),schools:[]}};
}
validateBackup(obj,{scope});
if(scope==='student'&&(people.length!==1||obj.roster.people[0].id!==people[0].id))fail();
const next=Object.fromEntries(people.map(p=>{
 const incoming=obj.db[p.id],existing=currentDb[p.id];if(!incoming||!existing)fail();
 const expected=existing.placements||[];
 if(incoming.placements.length!==expected.length||expected.some(row=>!incoming.placements.some(item=>item.id===row.id&&item.studentId===p.id&&item.moduleId===row.moduleId)))fail();
 const entry=structuredClone(incoming);
 if(scope==='student')entry.placements=expected.map(row=>{const saved=entry.placements.find(item=>item.id===row.id);const preparation=saved.preparation||{};return {...row,preparation:Object.fromEntries(['place','task','docs'].filter(k=>typeof preparation[k]==='boolean').map(k=>[k,preparation[k]]))};});
 return [p.id,entry];
}));
const ids=new Set(people.map(p=>p.id));
const finalOutputs=obj.finalOutputs===undefined?undefined:Object.fromEntries(Object.entries(obj.finalOutputs).filter(([id])=>ids.has(id)));
return {db:next,finalOutputs};
}
function restoreWorkingBackup(input,people,role,db,save){
const prepared=workingBackup(input,people,role,db),before=Object.fromEntries(people.map(p=>[p.id,db[p.id]]));
try{
 Object.assign(db,prepared.db);
 window.FINAL_OUTPUT_CONTEXT.applyStorage(window.FINAL_OUTPUT_CONTEXT.changes(prepared.finalOutputs,people.map(p=>p.id)),save,[stateKey]);
}catch(err){Object.assign(db,before);throw err;}
return true;
}
function bindRestore(root){
const input=root.querySelector('#ivp-restore-backup');if(!input)return;
input.onchange=async()=>{const result=root.querySelector('#restore-result');try{if(!input.files?.[0])return;if(input.files[0].size>12000000)throw Error('Použijte zálohu do 12 MB.');result.textContent='Kontroluji zálohu…';const obj=validateBackup(JSON.parse(await input.files[0].text()));result.innerHTML='<h3>'+obj.roster.people.length+' studentů · '+obj.roster.placements.length+' praxí</h3><p>Obnoví se také záznamy, reflexe, termíny a vaše úpravy. Případné místní pracovní údaje se nahradí.</p><button class="primary">Obnovit úplnou zálohu →</button>';result.querySelector('button').onclick=()=>{try{restoreBackup(obj);try{sessionStorage.setItem(stateKey+'.view','ivp');}catch{}location.hash='umisteni';location.reload();}catch(err){result.textContent=err.message;}};}catch(err){result.textContent=err instanceof SyntaxError?'Soubor není platná záloha JSON.':err.message;}};
}

function render(){return '<header class="local-hero"><small>KOORDINÁTOR IVP · 2026/2027</small><h1>Vaši studenti. Jejich praxe.</h1><p>Vyberte vyplněnou tabulku z počítače. Seznam se načte jen do tohoto prohlížeče. Nikomu nic neodešleme.</p></header><section class="local-card"><h2>Načíst studenty z tabulky</h2><label class="primary">Vybrat soubor Excel<input id="ivp-xlsx" type="file" accept=".xlsx" style="display:block;margin-top:16px"></label><div id="import-result" role="status" aria-live="polite"></div><p>Stejná tabulka, kterou jste vyplnila: listy Studenti a praxe a Skoly.</p></section><section class="local-card"><h2>Obnovit z uložené zálohy</h2><p>Pro nový počítač nebo prohlížeč použijte úplnou koordinátorskou zálohu JSON. Obnoví studenty i rozpracovanou praxi.</p><label>Vybrat zálohu<input id="ivp-restore-backup" type="file" accept=".json,application/json"></label><div id="restore-result" role="status" aria-live="polite"></div></section>';}
function bind(root){bindRestore(root);const input=root.querySelector('#ivp-xlsx');if(!input)return;input.onchange=async()=>{const result=root.querySelector('#import-result');try{result.textContent='Kontroluji tabulku…';const data=parse(await unzip(input.files[0]));result.innerHTML='<h3>'+data.people.length+' studentů · '+data.placements.length+' praxí</h3><p>Chybějící termíny: '+data.placements.filter(r=>!r.term).length+'. Školy k doplnění: '+data.placements.filter(r=>!r.school).length+'.</p><button id="confirm-import" class="primary">Zobrazit studenty v Ateliéru →</button>';result.querySelector('button').onclick=()=>{try{localStorage.setItem(key,JSON.stringify(data));sessionStorage.setItem('atelier-praxe-upv.live.v1.view','ivp');location.hash='umisteni';location.reload()}catch{result.textContent='Prohlížeč nepovolil uložení. Povolte místní úložiště.'}};}catch(err){result.textContent=err.message;}};}
return {render,bind,parse,unzip,validateBackup,restoreBackup,workingBackup,restoreWorkingBackup};})();
