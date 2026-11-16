'use strict';
(() => {
  const modules = [...METHODS, FINAL_METHOD, REFLECTION_METHOD];
  const syllabi=SOURCES.filter(s=>s.name.startsWith('UIS ČZU'));
  const mod = id => modules.find(m => m.id === id);
  const people = [{id:'alex',name:'Alex',stage:'group'},{id:'ema',name:'Ema',stage:'micro'},{id:'sam',name:'Sam',stage:'continuous'}];
  const KEY = 'atelier-praxe-upv.demo.v1';
  const root = document.getElementById('shell');
  const e = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const link = (route,label,cls='secondary') => '<a class="'+cls+'" href="#'+encodeURI(route)+'">'+e(label)+'</a>';
  const fieldExamples = {
    group:{title:'Jak učitel ověřil pochopení pracovního postupu',kind:'theory',status:'draft',competency:'2.5',reflection:'Po ukázce žáci ve dvojici vysvětlili pořadí operací. Dvě dvojice zaměnily stejný krok.',nextStep:'V rozboru se zeptám, podle čeho učitel poznal, kdy ukázku zopakovat.'},
    micro:{title:'Instruktáž pro první samostatné měření',kind:'activity',status:'submitted',competency:'2.1',reflection:'První zadání popisovalo můj výklad. Přeformulovala jsem cíl jako činnost žáka.',nextStep:'Při příštím výstupu ukážu dvě ukázky měření.'},
    continuous:{title:'Žáci vysvětlují výběr měřidla',kind:'teaching',status:'confirmed',competency:'4.2',feedback:'Při rozboru jsme doložili zpětnou vazbu konkrétní opravou postupu žáka.',reflection:'Po otázce k přesnosti žák sám navrhl jiné měřidlo.',nextStep:'Při druhém pokusu nechám žáky pojmenovat změnu vlastními slovy.'}
  };
  const fresh = () => Object.fromEntries(people.map((p,i) => {
    const m=mod(p.stage),sample=fieldExamples[p.stage];
    const firstField=m.fields?.[0]?.label;
    const events=structuredClone(PLAN.sample);
    if(p.stage!=='group')events.forEach((ev,j)=>{ev.moduleId=p.stage;ev.title=(p.stage==='micro'?['Volba tématu mikrovýstupu','Konzultace přípravy','Mikrovýstup před skupinou','Reflexe mikrovýstupu']:['Konzultace přípravy hodiny','První výukový výstup','Rozbor výstupu s učitelem','Doplnění portfolia'])[j]});
    return [p.id,{events,records:[{id:'demo-'+p.id,moduleId:p.stage,date:'2026-11-'+(10+i),fields:firstField?{[firstField]:({group:'Modelová odborná škola · skupina B, 16 žáků',micro:'Po instruktáži změří dvojice vzorek a zdůvodní volbu měřidla.',continuous:'Žák samostatně vybere měřidlo pro zadanou toleranci a vysvětlí proč.'}[p.stage])}:{},timeline:[],feedback:'',...sample}]}];
  }));
  let db, stored;
  function hydrate(data) {
    const defaults=fresh(), out=data&&typeof data==='object'?data:{};
    for (const p of people) {
      const entry=out[p.id]||=defaults[p.id];
      if (!Array.isArray(entry.records)) entry.records=defaults[p.id].records;
      if (!Array.isArray(entry.events)) entry.events=defaults[p.id].events;
      if (!Array.isArray(entry.reflections)) entry.reflections=IVPREF.seed(p.id);
      if (!Array.isArray(entry.retries)) entry.retries=[];
      if (!entry.prep) entry.prep=RoleDesk.initialPrep(p.id);
    }
    return out;
  }
  try {stored=localStorage.getItem(KEY);db=hydrate(JSON.parse(stored));} catch {db=hydrate(null);}

  let role='student',who='alex',search='',statusFilter='all';
  const roleProfiles=[['mentor','Cvičný učitel'],['ivp','Koordinátor IVP'],...RoleDesk.profiles];
  const allowedPeople=()=>role==='student'?people.filter(p=>p.id===who):role==='ivp'?people:role==='mentor'?people.filter(p=>p.id!=='sam'):[];
  function useProfile(value){
    const [next,id]=value.split('/');
    if(next==='student' && people.some(p=>p.id===id)){role=next;who=id;}
    else if(roleProfiles.some(([key])=>key===value)){role=value;if(role==='mentor' && !allowedPeople().some(p=>p.id===who))who=allowedPeople()[0].id;}
  }
  const entryProfile=new URLSearchParams(location.search).get('profil');
  try {useProfile(entryProfile||sessionStorage.getItem(KEY+'.view')||'student/alex');} catch {if(entryProfile)useProfile(entryProfile);}
  const refContext=()=>({
    db,who,role,people:allowedPeople(),toast,canSee:id=>allowedPeople().some(p=>p.id===id),
    save:(id,rows)=>{
      if(!allowedPeople().some(p=>p.id===id)||!['ivp','student'].includes(role))return false;
      const before=db[id].reflections;db[id].reflections=rows;
      if(persist())return true;
      db[id].reflections=before;return false;
    }
  });
  const person=()=>people.find(p=>p.id===who);
  const current=()=>db[who];
  const recordRoute=r=>r.isRetry?'druhy-pokus/'+encodeURIComponent(r.id):r.isBlockReflection?IVPREF.route(r.blockId,r.id):r.tool?r.tool:'praxe/'+r.moduleId+'/zaznam/'+encodeURIComponent(r.id);
  const navItems=[['start','Všechny moduly'],['ivp','Praxe IVP'],['nacvik','Praxe nanečisto'],['adaptio','Adaptio'],['ss','Praxe SŠ'],['kurzy','Kurzy ČZU']];
  const names={student:'Student',mentor:'Cvičný učitel',ivp:'Přehled IVP'};
  const section=(ey,title,desc='')=>'<header class="subhead"><small class="eyebrow">'+e(ey)+'</small><h1>'+e(title)+'</h1>'+(desc?'<p>'+e(desc)+'</p>':'')+'</header>';
  const visibleRecords=()=>allowedPeople().some(p=>p.id===who)
    ? [...current().records,...(role==='student'?[...Object.values(current().tools||{}).flat(),...current().retries]:[]),...IVPREF.portfolio(refContext())].filter(r=>role==='student'||r.status!=='draft')
    : [];
  const fmt=d=>d?new Intl.DateTimeFormat('cs-CZ',{day:'numeric',month:'long',year:'numeric'}).format(new Date(d+'T12:00:00')):'';
  function toast(msg){const node=document.getElementById('toast');node.textContent=msg;clearTimeout(toast.t);toast.t=setTimeout(()=>node.textContent='',3500);}
  function persist(){
    try {
      if(localStorage.getItem(KEY)!==stored){
        toast('V jiné kartě přibyla změna. Zkopírujte rozepsaný text a obnovte stránku.');return false;
      }
      const next=JSON.stringify(db); localStorage.setItem(KEY,next); stored=next; return true;
    }catch{toast('Uložení se nezdařilo. Zkontrolujte dostupné místo v prohlížeči.');return false;}
  }
  window.addEventListener('storage',event=>{
    if(event.key!==KEY || event.newValue===stored)return;
    if(root.querySelector('form:focus-within')){toast('Praxe byla aktualizována v jiné kartě. Před obnovením si zkopírujte rozepsaný text.');return;}
    try{db=hydrate(JSON.parse(event.newValue));stored=event.newValue;render();}catch{}
  });
  function navigate(page){if(location.hash.slice(1)===page)render();else location.hash=page}
  function route(){return location.hash.slice(1)||'start'}
  function statusName(s){return PRACTICE.statusLabel(s)}
  const catalog=[
    ['ivp','Praxe IVP','Studium','Chystám se na praxi','Škola, termíny, záznamy a společný rozbor s učitelem.','phase-2.webp'],
    ['nacvik','Praxe nanečisto','Trénink','Chci si to zkusit před hodinou','Vyberte, jak zareagujete ve třídě. Podívejte se, co vaše rozhodnutí změní.','phase-4.webp'],
    ['adaptio','Adaptio','Začátek v profesi','Začínám učit','Pojmenujte situaci, se kterou chcete za mentorem. Domluvte si první krok.','phase-6.webp'],
    ['ss','Praxe SŠ','Odborný výcvik','Propojuji školu a pracoviště','Sledujte jeden úkol očima žáka, učitele a instruktora na pracovišti.','phase-5.webp'],
    ['kurzy','Kurzy ČZU','Další vzdělávání','Chci se dál vzdělávat','Projděte si kurz pro instruktory praktického vyučování a vyberte si vlastní cíl.','phase-1.webp']
  ];
  const toolPages=['nacvik','adaptio','ss','kurzy'];
  const toolLabel=id=>catalog.find(row=>row[0]===id)?.[1]||'';
  function shortcuts(){
    const n=role==='ivp'?people.flatMap(p=>db[p.id].reflections).filter(r=>r.status==='submitted').length:
      role==='student'?current().reflections.filter(r=>r.status==='returned').length:0;
    const label=role==='ivp'?'Reflexe k vyřízení':role==='mentor'?'Předané reflexe':'Moje reflexe';
    const status=n?' · '+n+(role==='student'?' k doplnění':''):'';
    return '<nav class="desk-links" aria-label="Reflexe a podklady">'+
      (!RoleDesk.isSpecial(role)?link('reflexe',label+status,'desk-link reflection-action'):'')+
      link('materialy','Dokumenty ke stažení','desk-link docs-action')+'</nav>';
  }
  function sourceRef(block,id){
    return 'reflexe/nova/'+block+'/zaznam/'+encodeURIComponent(id);
  }
  function blockNav(block){
    return '<nav class="block-nav" aria-label="K tomuto bloku"><button type="button" class="secondary" data-block-docs>Dokumenty k bloku ↓</button>'+
      (role==='student'?link('reflexe/nova/'+block,'Otevřít reflexi pro IVP','secondary'):link('reflexe','Přehled předaných reflexí','secondary'))+'</nav>';
  }
  function blockExtras(id){
    return '<div class="block-extras">'+BLOCKS.docs(id)+IVPREF.block(id,refContext())+'</div>';
  }
  function hub(){
    const personal=RoleDesk.isSpecial(role)?RoleDesk.intro(role):role==='student'?'Připravte se na další hodinu, zkuste si náročnou situaci nebo se vraťte k tomu, co jste viděli při náslechu.':role==='mentor'?'Otevřete si práci studenta, připravte společný rozbor nebo si vyberte situaci pro další setkání.':'Podívejte se, kdo čeká na přijetí na školu a které práce už prošly společným rozborem.';
    return '<section class="hub-hero"><div class="hub-intro"><small class="eyebrow">Ateliér praxí · IVP ČZU</small><h1>Co právě potřebujete?</h1><p>'+personal+'</p>'+link('ivp',role==='student'?'Moje pedagogická praxe →':role==='mentor'?'Otevřít práce k rozboru →':(RoleDesk.isSpecial(role)?RoleDesk.caption(role):'Otevřít koordinaci praxí →'),'primary')+'</div><figure><img src="hub.webp" alt="Dva studující před cvičnou školou probírají své poznámky."></figure></section>'+
    shortcuts()+'<header class="hub-head"><h2>Vyberte si podle situace</h2></header><div class="hub-grid">'+catalog.map(([id,name,kind,title,desc,photo])=>'<a class="hub-card" href="#'+id+'"><img src="'+photo+'" alt=""><div><small>'+e(name)+'</small><h3>'+e(title)+'</h3><p>'+e(desc)+'</p><span aria-hidden="true">↗</span></div></a>').join('')+'</div>';
  }
  function practiceLinks(){
    const links=role==='student'?[['skola','Moje škola'],['plan','Termíny'],['skills','Moje kompetence'],['portfolio','Moje portfolio'],['sources','Metodiky a pomoc']]:[['skola',role==='ivp'?'Žádosti o školu':'Přijetí na školu'],['skills','Kompetence'],['portfolio','Portfolio'],['sources','Metodiky a pomoc']];
    return (role==='student'?shortcuts():'')+'<nav class="practice-links" aria-label="Nástroje pro pedagogické praxe">'+links.map(([id,name])=>link(id,name)).join('')+'</nav>';
  }
  function schoolPage(){
    const options=allowedPeople().filter(p=>role==='student'||(role==='ivp'?db[p.id].prep.status!=='draft':['school','confirmed'].includes(db[p.id].prep.status)));
    if(!options.length)return section('Praxe IVP','Přijetí na cvičnou školu','Pro tento profil zatím není k dispozici předaná žádost.')+link('ivp','Zpět na přehled');
    if(!options.some(p=>p.id===who))who=options[0].id;
    const choices=role==='student'?'':'<label class="student-select">Studující <select id="school-user">'+options.map(p=>'<option value="'+p.id+'" '+(p.id===who?'selected':'')+'>'+e(p.name)+'</option>').join('')+'</select></label>';
    return section('Praxe IVP · '+person().name,role==='student'?'Moje cvičná škola':'Přijetí na cvičnou školu')+choices+'<div id="prep-space">'+PREP.render(current().prep||{},role)+'</div>';
  }
  function practiceTool(page){
    const tool=page==='nacvik'||page==='adaptio'?ATools:WORK;
    const notes=role==='student'?(current().tools?.[page]||[]):[];
    const ref={nacvik:['Původní trenažér Foxy','https://foxy-studio-campus-pilot.web.app/modules/nanecisto/index.html#prace/upv'],adaptio:['Samostatná aplikace Adaptio','https://adaptio-pruvodce-ucitele.aneta-vadovicova.chatgpt.site'],ss:['Kampus Foxy · Praxe SŠ','https://foxy-studio-campus-pilot.web.app/']}[page];
    const last=notes.at(-1);
    const recent=last?'<p class="saved-source"><strong>Poslední uložený podklad</strong> '+e(last.title)+' '+link(sourceRef(page,last.id),'Navázat reflexí pro IVP','text-btn')+'</p>':'';
    return blockNav(page)+'<div id="tool-space" data-page="'+page+'">'+tool.render(page,notes,role)+'</div>'+recent+(ref?'<footer class="tool-source"><a href="'+ref[1]+'" target="_blank" rel="noopener">'+ref[0]+' ↗</a></footer>':'')+blockExtras(page);
  }
  function studentHome(){
    const p=person(),m=mod(p.stage),pending=current().records.find(r=>['draft','returned'].includes(r.status)),target=pending?mod(pending.moduleId):m;
    return '<section class="hero"><div class="hero-copy"><small>'+e(p.name)+' · Učitelství praktického vyučování</small><h1>'+({group:'Co dnes uvidíte ve výuce?',micro:'Jak povedete první výstup?',continuous:'Co si žáci odnesou z hodiny?'}[p.stage])+'</h1><p>'+({group:'Při náslechu vyberte jeden okamžik. Zapište, co udělal učitel a jak na to žáci reagovali.',micro:'Naplánujte si krátkou instruktáž a určete, podle čeho poznáte, že jí skupina rozumí.',continuous:'Spojte přípravu, vlastní výuku a rozbor s cvičným učitelem do jednoho záznamu.'}[p.stage])+'</p>'+link('praxe/'+target.id+(pending?'/upravit/'+pending.id:''),pending?'Pokračovat v záznamu →':'Otevřít moji praxi →','primary')+'</div><figure class="hero-photo"><img src="praxe.webp" alt="Studentka učitelství a mentorka poslouchají, jak žák vysvětluje sestavení dřevěného spoje."><figcaption>'+e(target.title)+'</figcaption></figure></section>'+
    practiceLinks()+'<a class="kit-link" href="#druhy-pokus"><strong>Můj druhý pokus →</strong><span>Otevřete svůj poslední záměr a při další návštěvě školy zaznamenejte, co se změnilo.</span></a><div class="section-head"><div><small class="eyebrow">Studijní cesta</small><h2>Od náslechu k vlastní výuce</h2></div></div><div class="grid">'+modules.map((m,i)=>'<article class="tile phase-tile"><img class="phase-photo" src="phase-'+(i+1)+'.webp" alt="" loading="lazy"><span class="tag">'+[2,3,4,5,6,6][i]+'. semestr · Praxe '+String(i+1).padStart(2,'0')+'</span><h3>'+e(m.title)+'</h3><p>'+e(m.short)+'</p>'+link('praxe/'+m.id,'Otevřít praxi →')+'</article>').join('')+'</div>';
  }
  function modulePage(m){
    const records=current().records.filter(r=>r.moduleId===m.id);
    const mi=modules.indexOf(m), syl=syllabi[mi], guided=m.id==='guided', chosen=current().guidedPlan||'uis';
    const targets=guided&&chosen==='uis'?{theory:4,practice:6}:m.observationTargets;
    const variant=guided?'<aside class="notice"><strong>Rozsah řízeného náslechu</strong><p>Sylabus UIS pro rok 2026/2027 a dodaná metodika 03 uvádějí různé počty. Po domluvě s garantem vyberte podklad pro své počítadlo.</p><label>Počítat podle<select id="guided-target" '+(role==='student'?'':'disabled')+'><option value="uis" '+(chosen==='uis'?'selected':'')+'>UIS 2026/2027 · 4 teoretické a 6 praktických</option><option value="method" '+(chosen==='method'?'selected':'')+'>Metodika 03 · 10 teoretických a 2 praktické</option></select></label></aside>':'';
    return section('Praxe '+String(modules.indexOf(m)+1).padStart(2,'0')+' · '+person().name,m.title,m.goal)+blockNav(m.id)+variant+
    '<details class="area-box"><summary>Jak praxe probíhá a co doložím</summary>'+(syl?'<p><a href="'+e(syl.url)+'" target="_blank" rel="noopener">'+e(syl.name)+'</a><br>'+e(syl.note)+'</p>':'')+'<p>'+e(m.place)+'</p><ol class="steps">'+m.steps.map(x=>'<li>'+e(x)+'</li>').join('')+'</ol><h3>Co předložit</h3><ul>'+m.evidence.map(x=>'<li>'+e(x)+'</li>').join('')+'</ul><p>'+e(m.credit)+'</p><small>'+e((m.source||[]).join(' · '))+'</small></details><div id="record-space">'+PRACTICE.render({...m,observationTargets:targets},records,role)+'</div>'+blockExtras(m.id);
  }
  function skills(){
    const records=visibleRecords();
    return section(person().name+' · Kompetence','Co už dokládá moje praxe?','U každé kompetence uvidíte, v kolika situacích jste ji pozorovali nebo sami použili. Do počítadla vstupují kompetence se záznamem po společném rozboru.')+
    '<div class="stack">'+AREAS.map(area=>{const count=area.skills.filter(s=>records.some(r=>r.competency===s.code && r.status==='confirmed')).length;return '<details class="area-box"><summary>'+e(area.name)+' <small class="skill-count">'+count+' / '+area.skills.length+' po rozboru</small></summary>'+area.skills.map(s=>{const list=records.filter(r=>r.competency===s.code);return '<details><summary>'+e(s.code)+' · '+e(s.name)+' <small>('+list.length+')</small></summary><p>'+e(s.example||s.hint||'Vyberte při zápisu konkrétní situaci, na které tuto dovednost ukážete.')+'</p>'+(list.length?list.map(r=>'<p>'+e(r.title||'Rozepsaný záznam')+' · '+e(mod(r.moduleId)?.title)+' · '+e(statusName(r.status))+' '+link(recordRoute(r),'Otevřít doklad','text-btn')+'</p>').join(''):'<p>Zatím bez dokladu. Kompetenci přiřadíte v záznamu z praxe.</p>')+'</details>'}).join('')+'</details>'}).join('')+'</div><p class="muted">'+link('sources','Původ kompetencí a metodik','text-btn')+'</p>';
  }
  function exportBody(r){
    return '<article class="record-export"><h3>'+e(r.title||'Rozepsaný záznam')+'</h3><p>'+e(r.isBlockReflection?BLOCKS.get(r.blockId)?.title:r.tool?toolLabel(r.tool):mod(r.moduleId)?.title)+' · '+e(r.isRetry?'Osobní druhý pokus':r.isBlockReflection?'Reflexe pro IVP':r.tool?'Vlastní poznámka':statusName(r.status))+'</p>'+PRACTICE.recordBody(r)+'</article>';
  }
  function listRecords(){
    const normalize=s=>String(s).toLocaleLowerCase('cs').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const out=visibleRecords().filter(r=>(statusFilter==='all'||statusFilter===r.status)&&normalize([r.title,r.date,fmt(r.date),mod(r.moduleId)?.title,r.isBlockReflection?BLOCKS.get(r.blockId)?.title:'',r.competency,r.reflection,r.feedback,r.nextStep,...Object.values(r.fields||{}),...Object.values(r.review||{}),...(r.timeline||[]).flatMap(Object.values)].join(' ')).includes(normalize(search))).sort((a,b)=>b.date.localeCompare(a.date));
    return out.length?out.map(r=>'<details class="area-box entry"><summary>'+e(r.title||'Rozepsaný záznam')+' · '+e(fmt(r.date))+'</summary>'+exportBody(r)+link(recordRoute(r),r.isRetry?'Otevřít srovnání':r.isBlockReflection?'Otevřít reflexi a odpověď':r.tool?'Otevřít modul':'Otevřít v praxi')+(role==='student'&&!r.isBlockReflection&&!r.isRetry?' '+link(sourceRef(r.tool||r.moduleId,r.id),'Navázat reflexí pro IVP','text-btn'):'')+(role==='student'&&r.nextStep&&!r.isRetry?' '+link('druhy-pokus/'+encodeURIComponent(r.id),'Porovnat s druhým pokusem','text-btn'):'')+'</details>').join(''):'<p class="empty">Žádný odpovídající záznam.</p>';
  }
  function portfolio(){
    return section(person().name,role==='student'?'Moje portfolio':'Portfolio studujícího','Na jednom místě najdete záznamy, vlastní reflexe a zpětnou vazbu z praxí.')+
    (role==='student'?'<div class="export-actions"><button class="secondary" data-exp-kind="full">Stáhnout celé portfolio</button><button class="secondary" data-exp-kind="brief">Stáhnout stručné portfolio · 4 strany</button></div>':'')+'<div class="panel portfolio-toolbar"><label>Hledat v portfoliu<input type="search" id="filter-q" placeholder="Téma, datum, kompetence…" value="'+e(search)+'"></label><label>Stav<select id="filter-st">'+[['all','Všechny záznamy'],...['draft','submitted','returned','confirmed'].map(s=>[s,statusName(s)])].map(([v,l])=>'<option value="'+v+'"'+(v===statusFilter?' selected':'')+'>'+e(l)+'</option>').join('')+'</select></label><button class="primary" data-print>Vytisknout celé portfolio / PDF</button></div><div class="records-list" id="results">'+listRecords()+'</div>';
  }
  function staff(){
    const pending=allowedPeople().flatMap(p=>db[p.id].records.filter(r=>r.status==='submitted').map(r=>({p,r})));
    return section('Ukázková role · '+names[role],role==='mentor'?'Co čeká na rozbor?':'Přehled pedagogických praxí',role==='mentor'?'Otevřete práci studenta, přečtěte si reflexi a doplňte zpětnou vazbu.':'Odpovězte na reflexi, rozhodněte o žádosti o cvičnou školu nebo otevřete portfolio studujícího.')+
    shortcuts()+(role==='ivp'?RoleDesk.coordination(db,people):'')+
    (role==='mentor'?'<section class="panel"><h2>K rozboru · '+pending.length+'</h2>'+pending.map(({p,r})=>'<div class="overview-row"><div><strong>'+e(r.title)+'</strong><small>'+e(p.name)+' · '+e(mod(r.moduleId).title)+'</small></div><button class="secondary" data-person="'+p.id+'" data-stage="'+r.moduleId+'" data-entry="'+e(r.id)+'">Otevřít</button></div>').join('')+(pending.length?'':'<p>V tuto chvíli nikdo nečeká na zpětnou vazbu.</p>')+'</section>':'')+
    '<div class="section-head"><h2>Studijní skupina</h2></div><div class="grid">'+allowedPeople().map(p=>{const rs=db[p.id].records.filter(r=>r.status!=='draft');return '<article class="tile"><span class="tag">'+e(mod(p.stage).title)+'</span><h3>'+e(p.name)+'</h3><p>Záznamy celkem · '+rs.length+'<br>Po rozboru · '+rs.filter(r=>r.status==='confirmed').length+'</p><button class="secondary" data-person="'+p.id+'">Otevřít portfolio</button></article>'}).join('')+'</div>';
  }
  function foreignPractice(){
    const approaches=[
      ['USA · University of Michigan','Nácvik jedné učitelské věty','TeachingWorks rozkládá výuku na krátké úseky, které lze nacvičit se zpětnou vazbou. V modulu Praxe nanečisto zkuste dvě zahájení stejné instruktáže. Které z nich žákovi řekne, co má udělat?','https://library.teachingworks.org/curriculum-resources/pedagogies/using-approximations-to-practice-practice/'],
      ['Austrálie · AITSL','Učitel a žák ve stejném okamžiku','Při pozorování výuky se sleduje jednání učitele i žáků. V časové ose náslechu zachyťte jejich dvojici. Například učitel předal měřidlo a žák sám ukázal, kde bude odečítat.','https://www.aitsl.edu.au/resources/looking-at-classroom-practice'],
      ['Singapur · NIE, NTU','Jeden doklad pro rozhovor','Studující vybírají z elektronického portfolia doklady pro řízené rozhovory o svém rozvoji. V reflexi pro IVP můžete otevřít vlastní zápis a vybrat okamžik, který chcete s koordinátorem rozebrat.','https://www.ntu.edu.sg/nie/about-us/programme-offices/office-of-teacher-education-and-undergraduate-programmes/professional-practice-inquiry'],
      ['Spojené království · Ambition Institute','Druhý pokus po zpětné vazbě','Příručka pro vzdělavatele učitelů pracuje se záměrným nácvikem konkrétní dovednosti. Při dalším výstupu změňte jeden pokyn a sledujte, co žáci udělají jinak.','https://www.ambition.org.uk/research-and-insight/deliberate-practice-teacher-educators-handbook/']
    ];
    return '<details class="research-practice"><summary>Jak se na praxi připravují budoucí učitelé v zahraničí</summary><div class="research-grid">'+approaches.map(([place,title,body,url])=>'<article><small class="eyebrow">'+e(place)+'</small><h3>'+e(title)+'</h3><p>'+e(body)+'</p><a href="'+e(url)+'" target="_blank" rel="noopener">Otevřít původní zdroj ↗</a></article>').join('')+'</div></details>';
  }
  function sources(){
    return section('Akademický rok 2026/2027 · IVP ČZU a MŠMT','Z čeho průvodce vychází','Podmínky jednotlivých praxí určují metodiky IVP. Profesní kompetence slouží k pojmenování toho, co můžete ve své práci doložit.')+foreignPractice()+'<div class="stack">'+SOURCES.map(s=>'<article class="panel"><h3>'+e(s.name)+'</h3><p>'+e(s.note)+'</p>'+(s.url?'<a href="'+e(s.url)+'" target="_blank" rel="noopener">Otevřít zdroj ↗</a>':'')+'</article>').join('')+'</div>';
  }
  function render(){
    const rawPage=route(), special=RoleDesk.isSpecial(role);
    const scenarioMatch=/^(nacvik|adaptio)\/situace\/([1-3])$/.exec(rawPage);
    const page=special&&!['start','sources','materialy'].includes(rawPage)?'ivp':scenarioMatch?scenarioMatch[1]:rawPage;
    const parts=page.split('/'),m=parts[0]==='praxe'?mod(parts[1]):null,refPage=parts[0]==='reflexe';
    const nav=special?[['ivp',role==='method'?'Přehled metodika':'Přehled školy'],['materialy','Dokumenty'],['sources','Metodiky']]:navItems;
    const active=nav.some(([id])=>id===page)?page:(special||!['materialy','sources'].includes(page)?'ivp':'');
    let content;
    if(page==='materialy') content=BLOCKS.catalog(role);
    else if(page==='sources')content=sources();
    else if(special)content=RoleDesk.render(role,db,people,modules);
    else if(page==='start')content=hub();
    else if(refPage){
      if(parts[1]==='nova' && role==='student' && BLOCKS.get(parts[2])){
        content=link('reflexe','← Moje reflexe','text-btn')+IVPREF.block(parts[2],refContext(),{compose:true,activityId:parts[3]==='zaznam'?undefined:parts[3],sourceId:parts[3]==='zaznam'?parts[4]:undefined});
      }else content=IVPREF.queue(refContext(),{focus:parts[1]});
    }
    else if(page==='skola')content=schoolPage();
    else if(toolPages.includes(page))content=practiceTool(page);
    else if(m)content=modulePage(m);
    else if(parts[0]==='druhy-pokus'&&role==='student')content=DRUHY.render(visibleRecords(),current().retries,parts[1]);
    else if(page==='skills')content=skills();
    else if(parts[0]==='nahled'&&role==='student'&&['full','brief'].includes(parts[1]))content=link('materialy','← Dokumenty k praxím','text-btn')+section(person().name,parts[1]==='brief'?'Moje stručné portfolio':'Moje celé portfolio')+'<div class="export-actions"><button class="primary" data-exp-kind="'+parts[1]+'">Stáhnout HTML ↓</button><button class="secondary" data-preview-print>Tisk / uložit PDF</button></div><iframe class="doc-preview" title="Náhled mého portfolia" id="export-preview"></iframe>';
    else if(page==='portfolio')content=portfolio();
    else if(page==='plan'&&role==='student')content='<div id="plan-space">'+PLAN.render(current().events,modules)+'</div><div class="calendar-take"><button type="button" class="secondary" data-calendar '+(current().events.length?'':'disabled')+'>Stáhnout termíny do mého kalendáře ↓</button><small>Soubor ICS pro kalendář v telefonu, Outlook nebo Google Kalendář.</small></div>';
    else content=role==='student'?studentHome():staff()+practiceLinks()+STAFFTOOLS.render(db,allowedPeople(),role);
    root.innerHTML='<header class="site-head"><a class="brand" href="#start"><img src="mark.svg" alt=""><span>Ateliér praxí<small>Učitelství praktického vyučování</small></span></a><nav aria-label="Hlavní nabídka">'+nav.map(([id,name])=>'<a href="#'+id+'" '+(active===id?'aria-current="page"':'')+'>'+e(name)+'</a>').join('')+'</nav><label class="account"><span class="sr">Ukázkový profil</span><select id="mode">'+[...people.map(p=>['student/'+p.id,p.name+' · student']),...roleProfiles].map(([id,l])=>'<option value="'+id+'" '+(id===(role==='student'?'student/'+who:role)?'selected':'')+'>'+l+'</option>').join('')+'</select></label></header><main id="content" tabindex="-1">'+content+'</main><footer class="appfoot"><span>Ukázkové role · údaje se ukládají v tomto prohlížeči</span><a href="#materialy">Dokumenty ke stažení</a><a href="#sources">Metodiky a zdroje</a></footer>';
    document.querySelector('#mode').onchange=ev=>{useProfile(ev.target.value);const url=new URL(location.href);url.searchParams.delete('profil');history.replaceState(null,'',url);try{sessionStorage.setItem(KEY+'.view',ev.target.value)}catch{} search='';statusFilter='all';navigate(role==='student'?'start':'ivp')};
    root.querySelector('[data-block-docs]')?.addEventListener('click',()=>{
      const panel=root.querySelector('[aria-label="Dokumenty k bloku"]');
      if(!panel)return;
      panel.scrollIntoView({block:'start'});panel.querySelector('a')?.focus({preventScroll:true});
    });
    root.querySelector('[data-worksheets]')?.addEventListener('click',ev=>{ev.preventDefault();const h=root.querySelector('#pracovni-listy');h?.focus({preventScroll:true});h?.scrollIntoView({block:'start'});});
    if(role==='student'){
      const preview=root.querySelector('#export-preview');
      if(preview){preview.srcdoc=ATDOC.exportHtml(parts[1],person(),visibleRecords());root.querySelector('[data-preview-print]').onclick=()=>preview.contentWindow.print();}
      root.querySelectorAll('[data-exp-kind]').forEach(btn=>btn.onclick=()=>{ATDOC.download(btn.dataset.expKind,person(),visibleRecords());toast('Portfolio je připravené ke stažení.');});
      root.querySelector('[data-calendar]')?.addEventListener('click',()=>ATDOC.calendar(person(),current().events));
      if(parts[0]==='druhy-pokus')DRUHY.bind(root,visibleRecords(),row=>{
        const before=current().retries;current().retries=[...before,row];if(persist()){toast('Druhý pokus je ve vašem portfoliu.');return true;}current().retries=before;return false;
      },navigate);
    }
    if(special){
      RoleDesk.bind(root,role,db,people,(id,next)=>{
        const before=db[id].prep;db[id].prep=next;
        if(!persist()){db[id].prep=before;return;}
        render();toast('Odpověď školy je uložená.');
      });
      return;
    }
    root.querySelectorAll('[data-person]').forEach(b=>b.onclick=()=>{who=b.dataset.person;search='';statusFilter='all';navigate(b.dataset.stage?'praxe/'+b.dataset.stage+'/zaznam/'+encodeURIComponent(b.dataset.entry):'portfolio')});
    if(page==='skola'){
      const select=root.querySelector('#school-user');if(select)select.onchange=()=>{who=select.value;render()};
      if(root.querySelector('#prep-space'))PREP.bind(root.querySelector('#prep-space'),current().prep||{},role,state=>{current().prep=state;const ok=persist();render();if(ok)toast('Změna je uložená.')});
    }
    if(page==='ivp' && role!=='student')STAFFTOOLS.bind(root,{openStudent:(id,dest='portfolio')=>{if(!allowedPeople().some(p=>p.id===id))return;who=id;navigate(dest)},go:navigate});
    if(toolPages.includes(page)){
      const tool=page==='nacvik'||page==='adaptio'?ATools:WORK;
      const notes=role==='student'?(current().tools?.[page]||[]):[],save=items=>{if(role!=='student')return;current().tools||={};current().tools[page]=items.map(r=>({...r,tool:page}));const ok=persist();if(ok&&scenarioMatch)history.replaceState(null,'','#'+page);render();if(ok)toast('Poznámka je ve vašem portfoliu.')};
      if(tool===WORK)tool.bind(root.querySelector('#tool-space'),page,notes,role,save);
      else tool.bind(root.querySelector('#tool-space'),page,notes,save,role);
      if(scenarioMatch)root.querySelector('[data-scenario="'+(Number(scenarioMatch[2])-1)+'"]')?.click();
    }
    if(m?.id==='guided'&&role==='student')document.querySelector('#guided-target').onchange=ev=>{current().guidedPlan=ev.target.value;persist();render()};
    if(m){PRACTICE.bind(document.querySelector('#record-space'),m,current().records.filter(r=>r.moduleId===m.id),{role:role,save:items=>{if(parts[2]==='novy')history.replaceState(null,'','#praxe/'+m.id);current().reviewLog=STAFFTOOLS.logChanges(current().records.filter(r=>r.moduleId===m.id),items,current().reviewLog);current().records=[...current().records.filter(r=>r.moduleId!==m.id),...items];const ok=persist();render();if(ok)toast('Záznam je uložený.')},go:navigate})}
    if(m && page.split('/')[2]==='zaznam'){
      const sel=[...root.querySelectorAll('[data-record-id]')].find(el=>el.dataset.recordId===page.split('/')[3]);
      if(sel){sel.open=true;requestAnimationFrame(()=>sel.scrollIntoView({block:'start'}))}
    }
    if(m && parts[2]==='novy' && role==='student')root.querySelector('[data-rec-new]')?.click();
    if(m && page.split('/')[2]==='upravit' && role==='student'){
      const edit=[...root.querySelectorAll('[data-rec-edit]')].find(b=>b.dataset.recEdit===page.split('/')[3]);
      if(edit){edit.click();history.replaceState(null,'','#praxe/'+m.id)}
    }
    if(page==='plan'&&role==='student'){PLAN.bind(document.querySelector('#plan-space'),current().events,modules,{save:ev=>{current().events=ev;persist();render()},open:id=>navigate('praxe/'+id)})}
    if(page==='portfolio'){
      document.querySelector('#filter-q').oninput=ev=>{search=ev.target.value;document.querySelector('#results').innerHTML=listRecords()};
      document.querySelector('#filter-st').onchange=ev=>{statusFilter=ev.target.value;document.querySelector('#results').innerHTML=listRecords()};
      document.querySelector('[data-print]').onclick=()=>{root.querySelector('#print-portfolio')?.remove();const frame=document.createElement('iframe');frame.id='print-portfolio';frame.title='Portfolio pro tisk';frame.className='print-frame';frame.onload=()=>frame.contentWindow.print();frame.srcdoc=ATDOC.exportHtml('full',person(),visibleRecords());root.append(frame);};
    }
    IVPREF.bind(root,refContext());
    RFX.bind(root,{db,role,who,people:allowedPeople(),validBlock:id=>Boolean(BLOCKS.get(id)),persist,render,toast});
  }
  document.querySelector('a.skip')?.addEventListener('click',event=>{
    event.preventDefault();document.getElementById('content')?.focus();
  });
  window.addEventListener('afterprint',()=>document.body.classList.remove('print-mode'));
  window.addEventListener('hashchange',()=>{window.scrollTo(0,0);render()});
  render();
})();
