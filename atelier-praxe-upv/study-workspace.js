'use strict';
window.STUDY = (() => {
  const e = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const semesters = [2,3,4,5,6,6];
  const aims = [
    'Poznáte prostředí školy a pojmenujete, co při výuce sledujete.',
    'Zachytíte konkrétní činnost učitele a reakci žáků.',
    'Propojíte pozorování výuky s vlastní přípravou a rozborem.',
    'Vyzkoušíte krátký výstup a ověříte, čemu žáci porozuměli.',
    'Připravíte, povedete a s učitelem rozeberete vlastní výuku.',
    'Vyberete doklady svého posunu a připravíte závěrečný rozbor.'
  ];
  function support(role) {
    const student = role === 'student';
    const items = student ? [
      ['druhy-pokus','01','Můj druhý pokus','Vraťte se k doporučení z rozboru a zachyťte, co jste příště změnili.'],
      ['skills','02','Moje kompetence','Propojte situace z výuky s tím, co už umíte doložit.'],
      ['nacvik','03','Praxe nanečisto','Vyzkoušejte si reakci na situaci ve třídě ještě před výukou.'],
      ['start','04','Další moduly','Adaptio, odborná praxe SŠ, kurzy a další podpora v jednom rozcestníku.']
    ] : [
      ['reflexe','01','Reflexe k rozboru','Otevřete předané reflexe a zanechte konkrétní doporučení.'],
      ['materialy','02','Dokumenty a výstupy','Pracovní listy pro studenty, metodiky i závěrečné formuláře.'],
      ['sources','03','Metodiky a kompetence','Ověřte původ požadavků a návaznost na kompetenční rámec.'],
      ['start','04','Všechny moduly','Praxe nanečisto, Adaptio, Praxe SŠ a Kurzy ČZU.']
    ];
    return '<section class="study-support" aria-label="Další podpora">'+items.map(([route,n,title,desc])=>'<a href="#'+route+'"><small>'+n+' / PODPORA</small><h3>'+title+'</h3><p>'+desc+'</p><span aria-hidden="true">↗</span></a>').join('')+'</section>';
  }
  function render({role,person,entry,modules,people,db,live}) {
    const student=role==='student', placements=entry.placements||[];
    const saved=(entry.records||[]).length;
    const confirmed=(entry.records||[]).filter(r=>r.status==='confirmed').length;
    const allPlacements=people.reduce((n,p)=>n+(db[p.id]?.placements||[]).length,0);
    const pending=people.reduce((n,p)=>n+[...(db[p.id]?.records||[]),...(db[p.id]?.reflections||[])].filter(r=>r.status==='submitted').length,0);
    const current=modules.find(m=>placements.some(p=>p.moduleId===m.id&&p.status==='Probíhá'))
      ||modules.find(m=>placements.some(p=>p.moduleId===m.id&&!['Absolvováno','Uzavřeno IVP'].includes(p.status)))
      ||(!live&&modules.find(m=>m.id===person.stage));
    const nextRoute=student?(current?'praxe/'+current.id:(live?'umisteni':'ivp')):(live?'umisteni':'ivp');
    const nextLabel=student?(current?'Pokračovat v mé praxi':'Otevřít moje praxe'):'Přehled studentů';
    const sideTitle=student?(confirmed?'Vaše zkušenost už má konkrétní doklady.':'Každá zkušenost může ukázat váš posun.'):'Od zadání až k závěrečnému rozboru.';
    return '<header class="study-hero study-hero-editorial"><div class="study-intro"><small class="eyebrow">'+(student?e(person.name)+' · ':'')+'STUDIJNÍ CESTA · 2026/2027</small><h1>Od pozorování<br>k vlastní výuce.</h1><p>'+(student?'Víte, proč jdete na praxi. Co si vyzkoušíte. A čím ukážete, že se jako učitel posouváte.':'Šest bloků pedagogické praxe. U každého zadání, studentské formuláře, metodika a návazná reflexe.')+'</p>'+(student&&current?'<p class="study-current"><small>VAŠE AKTUÁLNÍ PRAXE</small><strong>'+e(current.title)+'</strong></p>':'')+'<a class="primary" href="#'+nextRoute+'">'+nextLabel+' →</a></div><div class="study-hero-aside"><figure class="study-hero-photo"><img src="praxe.webp?v=atelier-foto1" alt="Studující učitelství s mentorkou při praktické výuce."><figcaption>Pozorovat. Vyzkoušet. Porozumět.</figcaption></figure><div class="study-next"><small class="eyebrow">'+(student?'MOJE PRAXE · MOJE PORTFOLIO':'VAŠE KOORDINACE')+'</small><h2>'+sideTitle+'</h2><div class="study-metrics">'+(student?'<div><b>'+saved+'</b><span>Moje záznamy</span></div><div><b>'+confirmed+'</b><span>Po rozboru</span></div>':'<div><b>'+allPlacements+'</b><span>Přiřazené praxe</span></div><div><b>'+pending+'</b><span>Čeká na rozbor</span></div>')+'</div><a class="study-next-link" href="#'+(student?'portfolio':'podklady')+'">'+(student?'Prohlédnout moje portfolio':'Otevřít podklady k rozboru')+' ↗</a><div class="study-stripe" aria-hidden="true"><span></span><span></span><span></span></div></div></div></header>'+
      '<div class="study-heading"><div><small class="eyebrow">CELÁ CESTA STUDIEM</small><h2>Kdy mě čeká která praxe?</h2></div><p>Vyberte svůj blok.<br>Najdete v něm zadání, formulář i reflexi.</p></div><p>UPV · kombinované studium. V 1. semestru probíhá příprava v rámci studia; samostatný blok praxe zde plán neuvádí.</p><section class="study-blocks" aria-label="Bloky pedagogických praxí">'+modules.map((m,i)=>{
        const assigned=placements.filter(p=>p.moduleId===m.id), records=(entry.records||[]).filter(r=>r.moduleId===m.id);
        const count=people.reduce((n,p)=>n+(db[p.id]?.placements||[]).filter(r=>r.moduleId===m.id).length,0);
        const badge=student?(assigned.length?'Vaše přiřazená praxe':(!live&&person.stage===m.id?'Váš aktuální blok':'Součást studijní cesty')):(live?count+' '+(count===1?'přiřazená praxe':count>=2&&count<=4?'přiřazené praxe':'přiřazených praxí'):'Podklady k bloku');
        return '<article class="study-block" data-tone="'+(i%2?'rose':'aqua')+'"><img src="phase-'+(i+1)+'.webp?v=atelier-foto1" alt="" loading="lazy"><div><div class="study-meta"><small>'+String(i+1).padStart(2,'0')+' / '+e(STUDY_GUIDE.label(m.id))+'</small><span>'+badge+'</span></div><h3>'+e(m.title)+'</h3><p>'+aims[i]+'</p><p><strong>Rozsah:</strong> '+e(STUDY_GUIDE.get(m.id)?.extent||'')+'</p>'+(student&&records.length?'<small class="study-records">Vaše záznamy: '+records.length+' · po rozboru: '+records.filter(r=>r.status==='confirmed').length+'</small>':'')+'<div class="study-actions"><a class="primary" href="#'+(student?'praxe/':'zadani/')+m.id+'">'+(student?'Otevřít blok':'Průvodce a zadání bloku')+' →</a>'+(student?'<a href="#materialy/'+m.id+'">Formuláře a metodika</a>':'')+'</div></div></article>';
      }).join('')+'</section>'+support(role);
  }
  function studentTools(entry) {
    const events=(entry.events||[]).slice().sort((a,b)=>String(a.date).localeCompare(String(b.date)));
    const now=new Date(),today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
    const next=events.find(ev=>ev.date>=today), date=next?new Intl.DateTimeFormat('cs-CZ',{day:'numeric',month:'long'}).format(new Date(next.date+'T12:00:00')):'';
    return '<section class="study-personal-tools" aria-label="Můj plán a studijní cesta"><a href="#plan"><small>MŮJ PLÁN · 2026/2027</small><h3>'+(next?e(date):'Místo pro vaše termíny')+'</h3><p>'+(next?e(next.title):'Přidejte si konkrétní den praxe nebo rozboru do svého kalendáře.')+'</p><span>Otevřít kalendář →</span></a><a href="#studium"><small>CELÁ STUDIJNÍ CESTA</small><h3>Co mě čeká dál?</h3><p>Všech šest bloků, formuláře, příprava i podpora mezi návštěvami školy.</p><span>Prohlédnout bloky praxí →</span></a></section>';
  }
  return {render,support,studentTools};
})();
