'use strict';
window.STUDY_GUIDE = (() => {
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const rows=[
    ['ivp',1,2,'letní','VVV173Z','1 týden','Poznat školu a naučit se pozorovat výuku.','Pozorování AV výuky, exkurze, mapa školy a řízená diskuse.','Co učitel udělal a jaká konkrétní reakce žáka následovala?'],
    ['group',2,3,'zimní','VVV174Z','2 týdny · 10 + 2','Porovnat výuku a učit se z rozboru s ostatními.','10 teoretických a 2 praktické jednotky; vlastní záznam každé jednotky.','Které žákovo jednání dokládá, že zvolená metoda pomohla?'],
    ['guided',2,4,'letní','VVV175Z','2 týdny · 10 + 2','Porozumět rozhodování učitele ve vlastním oboru.','Individuální náslechy, časový průběh každé jednotky a didaktický rozbor.','Proč učitel v daném okamžiku změnil postup a co tím sledoval?'],
    ['micro',3,5,'zimní','VVV176Z','2 týdny podle plánu','Vyzkoušet vlastní instruktáž v bezpečném prostředí.','Příprava nejméně na 2 strany, mikrovýstup, videomonitoring a rozbor.','Co účastníci zvládli bez dalšího vysvětlování a co změním?'],
    ['continuous',3,6,'letní','VVV177E','4 týdny · 14 + závěrečný výstup','Samostatně připravit a vést výuku a ověřit její účinek.','Přípravy, vlastní výuka, rozbory, portfolio a závěrečný výstup před komisí.','Jaký výkon žáka dokládá cíl hodiny a jak upravím další výuku?'],
    ['reflection',3,6,'letní','VVV178Z','1 týden podle plánu','Doložit profesní posun a naplánovat další rozvoj.','Porovnání vlastních dokladů, písemná reflexe a řízená diskuse.','Co se mezi dvěma zkušenostmi změnilo a čím to mohu doložit?']
  ];
  const get=id=>{const r=rows.find(x=>x[0]===id);return r?{id:r[0],year:r[1],semester:r[2],season:r[3],code:r[4],extent:r[5],why:r[6],task:r[7],question:r[8]}:null;};
  const label=id=>{const m=get(id);return m?m.year+'. ročník · '+m.semester+'. semestr ('+m.season+')':'';};
  function map(modules,role='student') {
    return '<section class="guide-map" aria-labelledby="guide-map-title"><header><small class="eyebrow">UPV · KOMBINOVANÉ STUDIUM · 2026/2027</small><h2 id="guide-map-title">Kdy mě čeká která praxe?</h2><p>Vyberte ročník a praxi. V každém bloku vás provedeme přípravou, záznamem, rozborem a reflexí.</p></header><div class="guide-years">'+[1,2,3].map(y=>'<section><h3>'+y+'. ročník</h3>'+(y===1?'<p class="guide-term">1. semestr · zimní: příprava v rámci studia; samostatný blok praxe zde plán neuvádí.</p>':'')+rows.filter(r=>r[1]===y).map(r=>{const m=modules.find(m=>m.id===r[0]);return '<a class="guide-year-card" href="#'+(role==='student'?'praxe/':'zadani/')+r[0]+'"><span>'+r[2]+'. semestr · '+r[3]+'</span><strong>'+esc(m?.title||r[0])+'</strong><small>'+r[5]+'</small><b>Otevřít průvodce praxí</b></a>';}).join('')+'</section>').join('')+'</div><p class="guide-source">Rozložení podle <a href="https://www.ivp.czu.cz/dl/82143?lang=cs" target="_blank" rel="noopener">studijního plánu UPV</a>. Konkrétní termíny vaší skupiny najdete v zadání předmětu a ve svém plánu. Praxe 01–06 jsou bloky, nikoli ročníky.</p></section>';
  }
  function reflection(id){const i=get(id);return i?'<aside class="reflection-coach"><h3>Jak z pozorování udělat užitečnou reflexi</h3><p><strong>Situace:</strong> co se skutečně stalo? <strong>Význam:</strong> co vám ukázala reakce žáků? <strong>Další krok:</strong> co konkrétně změníte a jak poznáte účinek?</p><p>'+i.question+'</p><p>Možnosti vám pomáhají začít. Vyberte jen to, co odpovídá vaší zkušenosti; vlastní příklad připište do „Vlastní text“. Doporučení z rozboru využijte v dalším pokusu.</p><a href="#praxe/'+id+'">Zpět k zadání a záznamům této praxe</a></aside>':'';}
  return {get,label,map,reflection};
})();
