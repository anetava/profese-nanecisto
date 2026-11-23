const assert=require('node:assert/strict');global.window=global;
for(const file of ['interactive-sheets-data','competency-framework','sheet-competencies','competency-evidence','interactive-sheets'])require('../atelier-praxe-upv/'+file+'.js');
for(const id of ['ivp','group','guided','micro','continuous','reflection']){
 const r={id:'test',title:'Záznam',date:'2026-11-23',values:{}};
 assert.equal(COMPETENCY.links(SHEETS.portfolio({sheets:{[id]:[r]}})[0]).length,0);
 const items=SHEET_DATA[id].items;r.values=Object.fromEntries(items.map((x,i)=>['f'+i,x.type==='textarea'?'Konkrétní záznam situace a reakce žáků.':'']).filter(([,v])=>v));
 const rec=SHEETS.portfolio({sheets:{[id]:[r]}})[0],links=COMPETENCY.links(rec);
 assert(links.length>0,id);
 assert(links.every(x=>COMPETENCY.state(rec,x).key!=='demonstrated'));
 if(['ivp','group','guided'].includes(id))assert(links.every(x=>x.kind!=='practice'));
}
for(const code of COMPETENCY.codes){
 const r=SHEETS.portfolio({sheets:{group:[{id:'x',values:{fKraauCode:code,fKraauKind:'practice',fKraauText:'Vlastní činnost doložená konkrétní situací.'}}]}})[0];
 assert(COMPETENCY.links(r).some(x=>x.code===code&&x.kind==='practice'));
}
console.log('All six worksheet mappings, empty sheets, observation boundary and all 18 explicit codes passed.');
