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
    return '<header class="study-hero"><div><small class="eyebrow">'+(student?e(person.name)+' · ':'')+'STUDIJNÍ CESTA · 2026/2027</small><h1>Od pozorování<br>k vlastní výuce.</h1><p>'+(student?'V každém bloku víte, co si připravit, co zaznamenat a co si odnést do další hodiny. Vaše práce postupně tvoří portfolio.':'Šest bloků pedagogické praxe na jednom místě. U každého najdete zadání, studentské formuláře, metodiku a návaznou reflexi.')+'</p><a class="primary" href="#'+(live?'umisteni':'ivp')+'">'+(student?'Moje aktuální praxe':'Přehled studentů')+' →</a></div><figure><img src="praxe.webp?v=atelier-foto1" alt="Studující učitelství s mentorkou při praktické výuce."><figcaption>Pozorovat. Vyzkoušet. Porozumět.</figcaption></figure></header>'+ 
      '<div class="study-heading"><div><small class="eyebrow">CELÁ CESTA STUDIEM</small><h2>Šest bloků. Každý má smysl.</h2></div><p>Otevřete jen to, co právě potřebujete.<br>Zadání a dokumenty zůstávají spolu.</p></div><section class="study-blocks" aria-label="Bloky pedagogických praxí">'+modules.map((m,i)=>{
        const assigned=placements.filter(p=>p.moduleId===m.id), records=(entry.records||[]).filter(r=>r.moduleId===m.id);
        const count=people.reduce((n,p)=>n+(db[p.id]?.placements||[]).filter(r=>r.moduleId===m.id).length,0);
        const badge=student?(assigned.length?'Vaše přiřazená praxe':(!live&&person.stage===m.id?'Váš aktuální blok':'Součást studijní cesty')):(live?count+' přiřazených praxí':'Podklady k bloku');
        return '<article class="study-block" data-tone="'+(i%2?'rose':'aqua')+'"><img src="phase-'+(i+1)+'.webp?v=atelier-foto1" alt="" loading="lazy"><div><div class="study-meta"><small>'+String(i+1).padStart(2,'0')+' / '+semesters[i]+'. SEMESTR</small><span>'+badge+'</span></div><h3>'+e(m.title)+'</h3><p>'+aims[i]+'</p>'+(student&&records.length?'<small class="study-records">Vaše záznamy: '+records.length+' · po rozboru: '+records.filter(r=>r.status==='confirmed').length+'</small>':'')+'<div class="study-actions"><a class="primary" href="#'+(student?'praxe/':'materialy/')+m.id+'">'+(student?'Otevřít blok':'Dokumenty k bloku')+' →</a><a href="#'+(student?'materialy/'+m.id:'reflexe')+'">'+(student?'Formuláře a metodika':'Přehled reflexí')+'</a></div></div></article>';
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
