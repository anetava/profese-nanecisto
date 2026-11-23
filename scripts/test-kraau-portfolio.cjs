const assert=require('node:assert/strict');global.window=global;
for(const file of ['interactive-sheets-data','competency-framework','sheet-competencies','competency-evidence','competency-ui','interactive-sheets'])require('../atelier-praxe-upv/'+file+'.js');
const row=(values,sheet='arch-naslechu',extra={})=>SHEETS.portfolio({sheets:{[sheet]:[{id:'sample',title:'Náslech',date:'2026-11-23',values,...extra}]}})[0];
const codes=r=>COMPETENCY.links(r).map(x=>x.code);
assert.equal(KRAAU.areas.length,6);assert.equal(KRAAU.skills.length,18);
assert.deepEqual(codes(row({f6:'Student',f8:'23.11.',f21:['Učitel ověřil porozumění']})),[]);
assert.deepEqual(codes(row({f21:['Nepozorováno'],fObs21:'Nic jsem neviděl.'})),[]);
assert.deepEqual(codes(row({f21:['Učitel ověřil porozumění'],fObs21:'Učitel vyzval žáka k popisu postupu, žák vysvětlil oba kroky.'})),['2.4']);
assert.deepEqual(codes(row({f21:['Žák dostal konkrétní doporučení'],fObs21:'Učitel doporučil měřit od nuly a žák měření opravil.'})),['4.2']);
assert.deepEqual(codes(row({f23:['Žáci sami řešili úkol'],fObs23:'Samostatný úkol.'})),[]);
const observation=row({f13:'Žák vysvětlí postup.',f27:'Učitel předvedl spoj, žák jej zopakoval.',f31:'S učitelem jsme porovnali dvě reakce.',f32:'Příště vyzkouším názornou instrukci.'},'arch-naslechu',{practiceId:'guided'});
assert.equal(observation.moduleId,'guided');assert(COMPETENCY.links(observation).every(x=>x.kind!=='practice'));
assert(codes(observation).includes('2.1'));assert(codes(observation).includes('2.5'));assert(codes(observation).includes('5.1'));
for(const code of COMPETENCY.codes){
 const values={['fAct_'+code]:'ano',['fActKind_'+code]:'practice',['fActText_'+code]:'Vlastní situace a pozorovatelný účinek.', ['fActSource_'+code]:'Arch 1, část rozbor.'};
 const r=row(values,'continuous');assert.deepEqual(codes(r),[code]);assert.equal(COMPETENCY.links(r)[0].kind,'practice');assert.equal(COMPETENCY.state(r,COMPETENCY.links(r)[0]).key,'practice');
 delete values['fActSource_'+code];assert.deepEqual(codes(row(values,'continuous')),[]);
}
const actual=row({f10:'Cíl jednotky.',f18:'Video 3:10',f19:'Žáci zaměnili pořadí. Předvedl jsem jeden krok a nechal je opravit postup.'},'continuous');
assert.equal(COMPETENCY.links(actual).find(l=>l.code==='2.1').kind,'practice');
const simulated=row({fAct_2:'ignored','fAct_2.4':'ano','fActKind_2.4':'practice','fActText_2.4':'Modelová zkušenost','fActSource_2.4':'Trenažér'},'nacvik');
assert.equal(COMPETENCY.links(simulated)[0].kind,'plan');
const n=COMPUI.stats([observation,actual]);assert.equal(n.evidence,2);assert(n.covered<=18);assert.equal(n.confirmed,0);
assert.equal(COMPUI.stats([actual]).evidence,1); // Multiple codes do not multiply documents.
actual.status='confirmed';const l=COMPETENCY.links(actual).find(l=>l.code==='2.1');
actual.competencyReview={'2.1':{verdict:'demonstrated',note:'Cíl a skutečný výkon byly ověřeny.',reviewerRole:'mentor',reviewedAt:'2026-11-23T17:00:00Z',evidenceSignature:COMPETENCY.signature(actual,l)}};
assert.equal(COMPUI.stats([actual]).confirmed,1);actual.sheetValues.f19='Změněný popis';assert.equal(COMPUI.stats([actual]).confirmed,0);
const unsafe=row({f13:'<img src=x onerror=alert(1)>'});assert(!COMPUI.live(unsafe,[]).includes('<img'));
const preview=COMPUI.live(observation,[]);assert(preview.includes('Moje portfolio'));assert(preview.includes('Proč tyto kompetence?'));assert(!preview.includes('0 / 18'));assert(preview.includes('zatím neuloženo'));assert(!preview.includes('<ol>'));assert(COMPUI.live(observation,[observation],true).includes('Záznam je uložený.'));
console.log('KRAAU: 18 activities, source requirements, observation/own-action boundary, simulations, distinct-document counts, unsaved preview, changed evidence and HTML escaping passed.');

// The simplified form preserves every omitted answer when reopening an old record.
for(const [sheet,indices] of Object.entries(SHEETS.omitted)) {
 const fresh=SHEETS.form(sheet);
 for(const i of indices) {
  assert(!fresh.includes('name="f'+i+'"'),sheet+' redundant field '+i);
  const item=SHEET_DATA[sheet].items[i],value=item.type==='choice'?item.options[0]:'Dříve zapsaná zkušenost';
  const restored=SHEETS.form(sheet,{values:{['f'+i]:value}});
  assert(restored.includes('Dříve vyplněné odpovědi'));
  assert(restored.includes('name="f'+i+'"'));
 }
 assert.equal((fresh.match(/>Uložit do portfolia</g)||[]).length,1);
}
console.log('Simplified forms: omitted prompts preserved for existing answers; one primary save.');
