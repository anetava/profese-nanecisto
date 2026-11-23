'use strict';
window.SHEET_COMP = (() => {
 // Rules link a structured question to a topic, never grade the written answer.
 // Required fields retain the source of each suggestion; choices alone are insufficient.
 const rules={
  ivp:[['1.1','plan',[11],'Orientace v oboru a ŠVP'],['1.2','observed',[14],'Propojení teorie s praktickým úkolem'],['2.5','reflection',[18],'Vlastní výklad pozorované situace'],['6.1','plan',[21],'Otázka pro další profesní učení']],
  group:[['2.1','observed',[11],'Cíl pozorované jednotky'],['2.5','reflection',[19,20],'Výklad opřený o dohledatelný podklad'],['5.1','reflection',[22],'Záznam rozboru s vyučujícím'],['6.1','plan',[25],'Další krok z náslechu']],
  guided:[['2.1','observed',[11],'Cíl pozorované jednotky'],['2.5','reflection',[19,20],'Výklad opřený o dohledatelný podklad'],['5.1','reflection',[22],'Záznam rozboru s vyučujícím'],['6.1','plan',[25],'Další krok z náslechu']],
  micro:[['2.1','plan',[9],'Cíl a znak úspěchu mikrovýstupu'],['2.2','plan',[11],'Předchozí zkušenosti účastníků'],['3.3','plan',[12],'Příprava prostředků a bezpečného pracoviště'],['1.2','plan',[16],'Srozumitelná instrukce'],['2.4','plan',[19],'Otázka pro ověření porozumění'],['2.5','reflection',[24,26],'Rozbor opřený o podklad z mikrovýstupu'],['6.1','plan',[28],'Úprava dalšího pokusu']],
  continuous:[['2.1','plan',[10],'Cíl vlastní výuky'],['3.3','plan',[13],'Příprava pomůcek a bezpečné práce'],['5.1','plan',[14],'Domluva spolupráce s cvičným učitelem'],['2.4','practice',[18,19],'Popsaná reakce na průběh vlastní výuky a její doklad'],['2.5','reflection',[18,19],'Rozbor konkrétního okamžiku vlastní výuky'],['2.5','reflection',[18,21],'Doporučení z rozboru ve vztahu k dokladu'],['6.1','plan',[23],'Navazující vlastní pokus']],
  reflection:[['2.5','reflection',[12,13,16],'Srovnání dřívějšího a pozdějšího dokladu'],['6.1','reflection',[12,13,16,21],'Profesní plán opřený o srovnání zkušeností'],['5.1','reflection',[22],'Podnět ze společného rozboru']],
  'arch-naslechu':[['2.1','observed',[13],'Cíl v pozorované hodině'],['2.5','reflection',[24],'Rozbor situace z náslechu'],['1.2','observed',[27],'Zvolená metoda a skutečná činnost žáka'],['2.5','reflection',[27],'Vysvětlení vztahu metody, cíle a činnosti žáka'],['3.3','observed',[29],'Použití prostředku pro učení'],['2.5','reflection',[31],'Upřesnění výkladu po rozboru'],['5.1','reflection',[31],'Společný rozbor s vyučujícím'],['6.1','plan',[32],'Přenos zkušenosti do vlastní výuky']],
  adaptio:[['5.1','reflection',[16],'Konkrétní domluva po rozhovoru s mentorem'],['6.1','reflection',[16,18],'Vlastní profesní reflexe po rozhovoru'],['6.1','plan',[20],'Plán ověření domluvy']],
  kurzy:[['6.1','plan',[9,12,13],'Plán profesního rozvoje ze studijního zdroje'],['2.5','reflection',[17,19],'Rozbor skutečného vyzkoušení']],
  ss:[['4.1','plan',[9,11],'Kritérium pro konkrétní pracovní úkol'],['5.1','plan',[14],'Domluva školy a pracoviště'],['4.1','reflection',[11,18,19],'Vyhodnocení výkonu podle kritéria a podkladu'],['5.1','reflection',[19,21],'Zpráva a navazující spolupráce se školou']],
  nacvik:[['2.4','plan',[12],'Nácvik instrukce v modelové situaci'],['2.5','plan',[16],'Rozbor modelu, nikoli uskutečněné výuky'],['6.1','plan',[19],'Plán přenosu z modelu do praxe']]
 };
 const observationFields={21:['2.4','4.2'],22:['2.3'],23:['2.2'],30:['3.1','3.3']};
 const activities={
 '1.1':'Ověřil/a jsem odborný obsah a použité zdroje',
 '1.2':'Zprostředkoval/a jsem odborný postup žákům',
 '2.1':'Stanovil/a jsem cíl výuky a vysvětlil/a jej žákům',
 '2.2':'Upravil/a jsem úkol podle zjištěných potřeb žáků',
 '2.3':'Propojil/a jsem učivo se zkušeností a zájmem žáků',
 '2.4':'Ověřil/a jsem porozumění a upravil/a další postup',
 '2.5':'Vyhodnotil/a jsem výuku podle konkrétních dokladů',
 '3.1':'Podpořil/a jsem důvěru a bezpečné vztahy ve třídě',
 '3.2':'Vedl/a jsem žáky ke spolupráci a dodržování pravidel',
 '3.3':'Uspořádal/a jsem prostředí a pomůcky pro učení',
 '4.1':'Použil/a jsem se žáky konkrétní hodnoticí kritéria',
 '4.2':'Poskytl/a jsem zpětnou vazbu a žák ji využil',
 '4.3':'Vedl/a jsem žáky k reflexi vlastního učení',
 '5.1':'Spolupracoval/a jsem s kolegou ve prospěch žáků',
 '5.2':'Spolupracoval/a jsem s rodiči v zájmu žáka',
 '6.1':'Vyhodnotil/a jsem svůj rozvoj a naplánoval/a další krok',
 '6.2':'Vyřešil/a jsem profesní situaci s ohledem na etické principy',
 '6.3':'Použil/a jsem konkrétní postup vlastní psychohygieny'
 };
 const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const clean=v=>typeof v==='string'?v.trim():'';
 function links(r){
  const v=r.sheetValues||{}, items=window.SHEET_DATA?.[r.sheet]?.items||[], out=[];
  for(const [code,kind,fields,reason] of rules[r.sheet]||[])if(fields.every(i=>clean(v['f'+i])))out.push({code,kind,sourceField:fields.map(i=>items[i]?.label?.split('\n')[0]||'Arch').join(' + '),excerpt:fields.map(i=>clean(v['f'+i])).join(' / '),reason:reason+'. Vazba podle účelu otázky; obsah dokladu je třeba společně posoudit.'});
  if(r.sheet==='continuous'&&[10,18,19].every(i=>clean(v['f'+i]))){const i=out.findIndex(l=>l.code==='2.1');if(i>=0)out.splice(i,1);out.push({code:'2.1',kind:'practice',sourceField:'Cíl + vlastní výuka + dohledatelný podklad',excerpt:[10,19,18].map(i=>v['f'+i]).join(' / '),reason:'Student popisuje vlastní práci s cílem a připojuje podklad. Nejde o potvrzení dosažené úrovně.'});}
  if(r.sheet==='arch-naslechu')for(const [i,codes] of Object.entries(observationFields)){
   const value=clean(v['fObs'+i]);const chosen=[v['f'+i]].flat().filter(Boolean);
   if(!value||!chosen.length||chosen.includes('Nepozorováno'))continue;
   let actual=[];
   if(i==='21'){if(chosen.includes('Učitel ověřil porozumění'))actual.push('2.4');if(chosen.some(x=>['Žák dostal konkrétní doporučení','Žák dostal prostor k opravě'].includes(x)))actual.push('4.2');}
   if(i==='22')actual=['2.3'];
   if(i==='23'&&chosen.includes('Učitel přizpůsobil podporu'))actual=['2.2'];
   // Environment checklist does not prove psychological safety; its example concerns organisation.
   if(i==='30'&&chosen.some(x=>['Podmínky podporovaly soustředění','Bylo nutné upravit organizaci'].includes(x)))actual=['3.3'];
   for(const code of actual)out.push({code,kind:'observed',sourceField:items[Number(i)].label.split('  ')[0]+' · vlastní příklad',excerpt:chosen.join('; ')+' / '+value,reason:'Pozorovaná činnost učitele doložená konkrétním příkladem. Nevypovídá o vlastním výukovém výkonu studenta.'});
  }
  for(const code of Object.keys(activities)){
   if(v['fAct_'+code]!=='ano'||!clean(v['fActText_'+code])||!clean(v['fActSource_'+code]))continue;
   let kind=v['fActKind_'+code];if(!['plan','observed','practice','reflection'].includes(kind))continue;
   if(r.sheet==='nacvik')kind='plan';
   out.push({code,kind,sourceField:activities[code],excerpt:clean(v['fActText_'+code])+' / Doklad: '+clean(v['fActSource_'+code]),reason:'Student označil konkrétní činnost a připojil situaci i umístění dokladu. Přiřazení nehodnotí kvalitu výkonu.'});
  }
  return out.sort((a,b)=>({practice:4,reflection:3,observed:2,plan:1}[b.kind]||0)-({practice:4,reflection:3,observed:2,plan:1}[a.kind]||0));
 }
 function hint(id,i){const codes=[...new Set((rules[id]||[]).filter(r=>r[2].includes(i)).map(r=>r[0]))];return codes.length?'<small class="field-competencies">Tímto podkladem rozvíjíte témata KRAAU '+codes.map(escape).join(' · ')+'.</small>':'';}
 function observation(id,i,v){if(id!=='arch-naslechu'||!observationFields[i])return '';return '<label class="observation-example">Konkrétní příklad k této oblasti<textarea name="fObs'+i+'" placeholder="Co učitel udělal a jak reagoval žák? Bez příkladu se vazba nepřidá.">'+escape(v['fObs'+i]||'')+'</textarea></label>';}
 function activityFields(v){return '<details class="additional-evidence"><summary>Doložit další činnost z praxe</summary><p>Běžné odpovědi se přiřazují samy. Zde doplňte jen další skutečnou zkušenost. Vyberte činnost; nástroj zná její vazbu na KRAAU. Nemusíte dokládat všechny oblasti v každé praxi.</p>'+KRAAU.areas.map(a=>'<details><summary>'+escape(a.name)+'</summary>'+a.skills.map(s=>{const c=s.code;return '<details class="activity-evidence"'+(v['fAct_'+c]?' open':'')+'><summary>'+escape(activities[c])+' <b>'+c+'</b></summary><label><input type="checkbox" name="fAct_'+c+'" value="ano"'+(v['fAct_'+c]==='ano'?' checked':'')+'> Přidat tuto činnost k dokladům</label><p>'+escape(s.example)+'</p><label>Druh zkušenosti<select name="fActKind_'+c+'">'+[['plan','Příprava / model'],['observed','Pozoroval/a jsem učitele'],['practice','Vlastní provedení'],['reflection','Vlastní reflexe']].map(([k,t])=>'<option value="'+k+'"'+(v['fActKind_'+c]===k?' selected':'')+'>'+t+'</option>').join('')+'</select></label><label>Co se stalo a jaký to mělo účinek<textarea name="fActText_'+c+'">'+escape(v['fActText_'+c]||'')+'</textarea></label><label>Kde je doklad (část archu, datum, příloha)<input name="fActSource_'+c+'" value="'+escape(v['fActSource_'+c]||'')+'"></label></details>';}).join('')+'</details>').join('')+'</details>';}
 function fields(v={}){
  return '<section class="sheet-kraau">'+activityFields(v)+'<details><summary>Přímé přiřazení podle kódu KRAAU</summary><h2>KRAAU · Co už dokládám?</h2><p>Mapa MŠMT se doplní automaticky z konkrétních odpovědí. Další projev můžete přiřadit zde. Vyberte, zda jde o vlastní činnost, pozorování nebo plán.</p><label>Kompetence MŠMT<select name="fKraauCode"><option value="">Vyberte, pokud máte další konkrétní doklad</option>'+KRAAU.skills.map(s=>'<option value="'+s.code+'"'+(v.fKraauCode===s.code?' selected':'')+'>'+escape(s.code+' · '+s.name)+'</option>').join('')+'</select></label><label>Druh dokladu<select name="fKraauKind">'+[['plan','Teprve připravuji'],['observed','Pozoroval/a jsem učitele'],['practice','Sám/sama jsem provedl/a'],['reflection','Reflektuji vlastní zkušenost']].map(([k,t])=>'<option value="'+k+'"'+(v.fKraauKind===k?' selected':'')+'>'+t+'</option>').join('')+'</select></label><label>Konkrétní situace a doklad<textarea name="fKraauText" rows="4" placeholder="Co jste udělal/a, jak žáci reagovali a kde je doklad?">'+escape(v.fKraauText||'')+'</textarea></label><a href="#skills">Otevřít přehled 6 oblastí a 18 kompetencí MŠMT →</a></details></section>';
 }
 return {links,fields,hint,observation,rules,activities};
})();
