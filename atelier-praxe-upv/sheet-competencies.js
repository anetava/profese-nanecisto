'use strict';
window.SHEET_COMP = (() => {
 const maps={
  ivp:[['1.1',11,'plan'],['1.2',14,'observed'],['2.5',18,'reflection'],['5.1',21,'reflection']],
  group:[['2.1',11,'observed'],['2.5',20,'reflection'],['5.1',22,'reflection'],['6.1',25,'plan']],
  guided:[['2.1',11,'observed'],['2.5',20,'reflection'],['5.1',22,'reflection'],['6.1',25,'plan']],
  micro:[['2.1',9,'plan'],['3.3',12,'plan'],['2.4',19,'plan'],['2.5',26,'reflection'],['6.1',28,'plan']],
  continuous:[['2.1',10,'plan'],['3.3',13,'plan'],['5.1',14,'plan'],['2.5',19,'reflection'],['6.1',23,'plan']],
  reflection:[['2.5',16,'reflection'],['6.1',21,'plan'],['5.1',22,'reflection']]
 };
 const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function links(r){
  const values=r.sheetValues||{},items=window.SHEET_DATA?.[r.sheet]?.items||[];
  const result=(maps[r.sheet]||[]).filter(([,i])=>typeof values['f'+i]==='string'&&values['f'+i].trim()).map(([code,i,kind])=>({code,kind,sourceField:items[i]?.label||'Arch',excerpt:values['f'+i].trim(),reason:kind==='observed'?'Záznam pozorované výuky jiného učitele; není dokladem vlastní výuky.':kind==='plan'?'Vlastní příprava nebo plán. Provedení je potřeba doložit.':'Vlastní reflexivní podklad k posouzení pedagogem.'}));
  if(r.sheet==='continuous'&&values.f10?.trim()&&values.f18?.trim()&&values.f19?.trim()){const old=result.findIndex(x=>x.code==='2.1');if(old>=0)result.splice(old,1);result.push({code:'2.1',kind:'practice',sourceField:'Cíl + rozhodující okamžik + doklad',excerpt:values.f10+' / '+values.f19+' / '+values.f18,reason:'Cíl je propojen s popisem vlastní výuky a uvedeným dokladem. Pedagog posoudí konkrétní projev.'});}
  return result;
 }
 function fields(v={}){
  return '<section class="sheet-kraau"><h2>KRAAU · Co už dokládám?</h2><p>Mapa MŠMT se doplní automaticky z konkrétních odpovědí. Další projev můžete přiřadit zde. Vyberte, zda jde o vlastní činnost, pozorování nebo plán.</p><label>Kompetence MŠMT<select name="fKraauCode"><option value="">Vyberte, pokud máte další konkrétní doklad</option>'+KRAAU.skills.map(s=>'<option value="'+s.code+'"'+(v.fKraauCode===s.code?' selected':'')+'>'+escape(s.code+' · '+s.name)+'</option>').join('')+'</select></label><label>Druh dokladu<select name="fKraauKind">'+[['plan','Teprve připravuji'],['observed','Pozoroval/a jsem učitele'],['practice','Sám/sama jsem provedl/a'],['reflection','Reflektuji vlastní zkušenost']].map(([k,t])=>'<option value="'+k+'"'+(v.fKraauKind===k?' selected':'')+'>'+t+'</option>').join('')+'</select></label><label>Konkrétní situace a doklad<textarea name="fKraauText" rows="4" placeholder="Co jste udělal/a, jak žáci reagovali a kde je doklad?">'+escape(v.fKraauText||'')+'</textarea></label><a href="#skills">Otevřít přehled 6 oblastí a 18 kompetencí MŠMT →</a></section>';
 }
 return {links,fields};
})();
