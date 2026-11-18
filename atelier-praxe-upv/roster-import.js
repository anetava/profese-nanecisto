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
function render(){return '<header class="local-hero"><small>KOORDINÁTOR IVP · 2026/2027</small><h1>Vaši studenti. Jejich praxe.</h1><p>Vyberte vyplněnou tabulku z počítače. Seznam se načte jen do tohoto prohlížeče. Nikomu nic neodešleme.</p></header><section class="local-card"><h2>Načíst studenty z tabulky</h2><label class="primary">Vybrat soubor Excel<input id="ivp-xlsx" type="file" accept=".xlsx" style="display:block;margin-top:16px"></label><div id="import-result" role="status" aria-live="polite"></div><p>Stejná tabulka, kterou jste vyplnila: listy Studenti a praxe a Skoly.</p></section>';}
function bind(root){const input=root.querySelector('#ivp-xlsx');if(!input)return;input.onchange=async()=>{const result=root.querySelector('#import-result');try{result.textContent='Kontroluji tabulku…';const data=parse(await unzip(input.files[0]));result.innerHTML='<h3>'+data.people.length+' studentů · '+data.placements.length+' praxí</h3><p>Chybějící termíny: '+data.placements.filter(r=>!r.term).length+'. Školy k doplnění: '+data.placements.filter(r=>!r.school).length+'.</p><button id="confirm-import" class="primary">Zobrazit studenty v Ateliéru →</button>';result.querySelector('button').onclick=()=>{try{localStorage.setItem(key,JSON.stringify(data));sessionStorage.setItem('atelier-praxe-upv.live.v1.view','ivp');location.hash='umisteni';location.reload()}catch{result.textContent='Prohlížeč nepovolil uložení. Povolte místní úložiště.'}};}catch(err){result.textContent=err.message;}};}
return {render,bind,parse,unzip};})();
