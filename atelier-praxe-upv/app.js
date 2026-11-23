'use strict';
(() => {
  const modules = [...METHODS, FINAL_METHOD, REFLECTION_METHOD];
  const syllabi=SOURCES.filter(s=>s.name.startsWith('UIS ČZU'));
  const mod = id => modules.find(m => m.id === id);
  const people = window.IVP_ROSTER?.people || [{id:'alex',name:'Alex',stage:'group'},{id:'ema',name:'Ema',stage:'micro'},{id:'sam',name:'Sam',stage:'continuous'}];
  const KEY = window.IVP_ROSTER ? 'atelier-praxe-upv.live.v1' : 'atelier-praxe-upv.demo.v1';
  const root = document.getElementById('shell');
  const e = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const link = (route,label,cls='secondary') => '<a class="'+cls+'" href="#'+encodeURI(route)+'">'+e(label)+'</a>';
  const fieldExamples = {
    group:{title:'Jak učitel ověřil pochopení pracovního postupu',kind:'theory',status:'draft',competency:'2.5',reflection:'Po ukázce žáci ve dvojici vysvětlili pořadí operací. Dvě dvojice zaměnily stejný krok.',nextStep:'V rozboru se zeptám, podle čeho učitel poznal, kdy ukázku zopakovat.'},
    micro:{title:'Instruktáž pro první samostatné měření',kind:'activity',status:'submitted',competency:'2.1',reflection:'První zadání popisovalo můj výklad. Přeformulovala jsem cíl jako činnost žáka.',nextStep:'Při příštím výstupu ukážu dvě ukázky měření.'},
    continuous:{title:'Žáci vysvětlují výběr měřidla',kind:'teaching',status:'confirmed',competency:'4.2',feedback:'Při rozboru jsme doložili zpětnou vazbu konkrétní opravou postupu žáka.',reflection:'Po otázce k přesnosti žák sám navrhl jiné měřidlo.',nextStep:'Při druhém pokusu nechám žáky pojmenovat změnu vlastními slovy.'}
  };
  const fresh = () => window.IVP_ROSTER ? Object.fromEntries(people.map(p=>[p.id,{events:[],records:[],reflections:[],retries:[],prep:{status:"draft"},placements:IVP_ROSTER.placements.filter(r=>r.studentId===p.id)}])) : Object.fromEntries(people.map((p,i) => {
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
      if(window.IVP_ROSTER && !Array.isArray(entry.placements))entry.placements=defaults[p.id].placements;
      if (!Array.isArray(entry.records)) entry.records=defaults[p.id].records;
      if (!Array.isArray(entry.events)) entry.events=defaults[p.id].events;
      if (!Array.isArray(entry.reflections)) entry.reflections=window.IVP_ROSTER?[]:IVPREF.seed(p.id);
      if (!Array.isArray(entry.retries)) entry.retries=[];
      if (!entry.prep) entry.prep=RoleDesk.initialPrep(p.id);
    }
    return out;
  }
  try {stored=localStorage.getItem(KEY);db=hydrate(JSON.parse(stored));} catch {db=hydrate(null);}

  let role=window.IVP_ROSTER?'ivp':'student',who=people[0].id,search='',statusFilter='all';
  const roleProfiles=window.IVP_ROSTER?[['ivp','Koordinátor IVP']]:[['mentor','Cvičný učitel'],['ivp','Koordinátor IVP'],...RoleDesk.profiles];
  const allowedPeople=()=>role==='student'?people.filter(p=>p.id===who):role==='ivp'?people:role==='mentor'?people.filter(p=>p.id!=='sam'):[];
  function useProfile(value){
    const [next,id]=value.split('/');
    if(next==='student' && people.some(p=>p.id===id)){role=next;who=id;}
    else if(roleProfiles.some(([key])=>key===value)){role=value;if(role==='mentor' && !allowedPeople().some(p=>p.id===who))who=allowedPeople()[0].id;}
  }
  const entryProfile=new URLSearchParams(location.search).get('profil');
  try {useProfile(entryProfile||sessionStorage.getItem(KEY+'.view')||(window.IVP_ROSTER?'ivp':'student/alex'));} catch {if(entryProfile)useProfile(entryProfile);}
  const refContext=()=>({
    db,who,role,people:allowedPeople(),toast,openRecord,canSee:id=>allowedPeople().some(p=>p.id===id),
    save:(id,rows)=>{
      if(!allowedPeople().some(p=>p.id===id)||!['ivp','student'].includes(role))return false;
      const before=db[id].reflections;db[id].reflections=rows;
      if(persist())return true;
      db[id].reflections=before;return false;
    }
  });
  try {const selected=sessionStorage.getItem(KEY+'.selected');if(role!=='student'&&allowedPeople().some(p=>p.id===selected))who=selected;} catch {}
  function rememberStudent(id){who=id;try{sessionStorage.setItem(KEY+'.selected',id)}catch{}}
  function openRecord(id,moduleId,recordId){
    if(!allowedPeople().some(p=>p.id===id))return;
    const record=db[id]?.records.find(r=>r.id===recordId&&r.moduleId===moduleId);
    if(!PRACTICE.readable(record,role))return;
    rememberStudent(id);search='';statusFilter='all';navigate('praxe/'+moduleId+'/zaznam/'+encodeURIComponent(recordId));
  }
  const person=()=>people.find(p=>p.id===who);
  const current=()=>db[who];
  const recordRoute=r=>r.isSheet?'arch/'+r.sheet+'/'+encodeURIComponent(r.id):r.isRetry?'druhy-pokus/'+encodeURIComponent(r.id):r.isBlockReflection?IVPREF.route(r.blockId,r.id):r.tool?r.tool:'praxe/'+r.moduleId+'/zaznam/'+encodeURIComponent(r.id);
  const navItems=[['umisteni','Studenti a praxe'],['start','Všechny moduly'],['ivp','Praxe IVP'],['nacvik','Praxe nanečisto'],['adaptio','Adaptio'],['ss','Praxe SŠ'],['kurzy','Kurzy ČZU']];
  const names={student:'Student',mentor:'Cvičný učitel',ivp:'Přehled IVP'};
  const section=(ey,title,desc='')=>'<header class="subhead"><small class="eyebrow">'+e(ey)+'</small><h1>'+e(title)+'</h1>'+(desc?'<p>'+e(desc)+'</p>':'')+'</header>';
  const visibleRecords=()=>allowedPeople().some(p=>p.id===who)
    ? [...current().records.map(r=>PRACTICE.readable(r,role)).filter(Boolean),...(role==='student'?[...Object.values(current().tools||{}).flat(),...current().retries,...SHEETS.portfolio(current())]:[]),...IVPREF.portfolio(refContext())].filter(r=>role==='student'||r.status!=='draft')
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
  function route(){return location.hash.slice(1)||(window.IVP_ROSTER?'umisteni':'start')}
  function statusName(s){return PRACTICE.statusLabel(s)}
  const catalog=[
    ['ivp','Praxe IVP','Studium','Chystám se na praxi','Škola, termíny, záznamy a společný rozbor s učitelem.','phase-2.webp?v=atelier-foto1'],
    ['nacvik','Praxe nanečisto','Trénink','Chci si to zkusit před hodinou','Vyberte, jak zareagujete ve třídě. Podívejte se, co vaše rozhodnutí změní.','phase-4.webp?v=zaci-ss1'],
    ['adaptio','Adaptio','Začátek v profesi','Jdu na praxi nebo začínám učit','Připravte si rozhovor s cvičným učitelem nebo otevřete Adaptio pro začátek v zaměstnání.','phase-6.webp?v=atelier-foto1'],
    ['ss','Praxe SŠ','Odborný výcvik','Propojuji školu a pracoviště','Sledujte jeden úkol očima žáka, učitele a instruktora na pracovišti.','phase-5.webp?v=zaci-ss1'],
    ['kurzy','Kurzy ČZU','Další vzdělávání','Chci se dál vzdělávat','Projděte si kurz pro instruktory praktického vyučování a vyberte si vlastní cíl.','phase-1.webp?v=atelier-foto1']
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
    return '<nav class="block-nav" aria-label="K tomuto bloku"><button type="button" class="secondary" data-block-docs>Dokumenty k bloku ↓</button></nav>';
  }
  function blockExtras(id){
    return '<div class="block-extras">'+BLOCKS.docs(id,role)+IVPREF.block(id,refContext())+'</div>';
  }
  function hub(){
    const personal=RoleDesk.isSpecial(role)?RoleDesk.intro(role):role==='student'?'Připravte se na další hodinu, zkuste si náročnou situaci nebo se vraťte k tomu, co jste viděli při náslechu.':role==='mentor'?'Otevřete si práci studenta, připravte společný rozbor nebo si vyberte situaci pro další setkání.':'Podívejte se, kdo čeká na přijetí na školu a které práce už prošly společným rozborem.';
    return '<section class="hub-hero"><div class="hub-intro"><small class="eyebrow">Ateliér praxí · IVP ČZU</small><h1>Co právě potřebujete?</h1><p>'+personal+'</p>'+link(window.IVP_ROSTER?'umisteni':'ivp',role==='student'?'Moje pedagogická praxe →':role==='mentor'?'Otevřít práce k rozboru →':(RoleDesk.isSpecial(role)?RoleDesk.caption(role):'Otevřít koordinaci praxí →'),'primary')+'</div><figure><img src="hub.webp?v=atelier-foto1" alt="Studující různých generací spolu přicházejí do školy."></figure></section>'+
    shortcuts()+STUDY_GUIDE.map(modules,role)+'<header class="hub-head"><h2>Vyberte si podle situace</h2></header><div class="hub-grid">'+catalog.map(([id,name,kind,title,desc,photo])=>'<a class="hub-card" href="#'+id+'"><img src="'+photo+'" alt=""><div><small>'+e(name)+'</small><h3>'+e(title)+'</h3><p>'+e(desc)+'</p><span aria-hidden="true">↗</span></div></a>').join('')+'</div>';
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
  function practiceTool(page,scenarioMatch){
    const tool=page==='nacvik'||page==='adaptio'?ATools:WORK;
    const notes=role==='student'?(current().tools?.[page]||[]):[];
    const ref={nacvik:['Původní trenažér Foxy','https://foxy-studio-campus-pilot.web.app/modules/nanecisto/index.html#prace/upv'],ss:['Kampus Foxy · Praxe SŠ','https://foxy-studio-campus-pilot.web.app/']}[page];
    const last=notes.at(-1);
    const recent=last?'<p class="saved-source"><strong>Poslední uložený podklad</strong> '+e(last.title)+' '+link(sourceRef(page,last.id),'Navázat reflexí pro IVP','text-btn')+'</p>':'';
    if(page==='adaptio'){
      if(scenarioMatch)return '<div id="tool-space" data-page="adaptio">'+ATools.adaptioCase()+'</div>';
      const portfolio=role==='student'&&last?'<aside class="adapt-saved"><small class="eyebrow">V mém portfoliu</small><h3>'+e(last.title)+'</h3><p>'+e(last.nextStep)+'</p><div>'+link('portfolio','Otevřít moje portfolio','text-btn')+' '+link(sourceRef(page,last.id),'Připravit reflexi pro IVP','text-btn')+'</div></aside>':'';
      const older=notes.length>1?'<details class="area-box"><summary>Dřívější přípravy · '+(notes.length-1)+'</summary>'+notes.slice(0,-1).reverse().map(r=>'<p><strong>'+e(r.title)+'</strong><br>'+e(r.nextStep)+' '+link(sourceRef(page,r.id),'Navázat reflexí','text-btn')+'</p>').join('')+'</details>':'';
      return '<div id="tool-space" data-page="adaptio">'+ATools.adaptioHome(role)+'</div>'+portfolio+older+blockNav(page)+blockExtras(page);
    }
    return blockNav(page)+'<div id="tool-space" data-page="'+page+'">'+tool.render(page,notes,role)+'</div>'+recent+(ref?'<footer class="tool-source"><a href="'+ref[1]+'" target="_blank" rel="noopener">'+ref[0]+' ↗</a></footer>':'')+blockExtras(page);
  }
  function studentHome(){
    const p=person(),m=mod(p.stage),pending=current().records.find(r=>['draft','returned'].includes(r.status)),target=pending?mod(pending.moduleId):m;
    return '<section class="hero"><div class="hero-copy"><small>'+e(p.name)+' · Učitelství praktického vyučování</small><h1>'+({group:'Co dnes uvidíte ve výuce?',micro:'Jak povedete první výstup?',continuous:'Co si žáci odnesou z hodiny?'}[p.stage])+'</h1><p>'+({group:'Při náslechu zaznamenejte průběh celé jednotky. Pro společný rozbor pak vyberte konkrétní okamžik a reakci žáků.',micro:'Naplánujte si krátkou instruktáž a určete, podle čeho poznáte, že jí skupina rozumí.',continuous:'Spojte přípravu, vlastní výuku a rozbor s cvičným učitelem do jednoho záznamu.'}[p.stage])+'</p>'+link('praxe/'+target.id+(pending?'/upravit/'+pending.id:''),pending?'Pokračovat v záznamu →':'Otevřít moji praxi →','primary')+'</div><figure class="hero-photo"><img src="praxe.webp?v=atelier-foto1" alt="Student učitelství a mentorka poslouchají, jak žák vysvětluje sestavení dřevěného spoje."><figcaption>'+e(target.title)+'</figcaption></figure></section>'+
    practiceLinks()+'<a class="kit-link" href="#druhy-pokus"><strong>Můj druhý pokus →</strong><span>Otevřete svůj poslední záměr a při další návštěvě školy zaznamenejte, co se změnilo.</span></a><div class="section-head"><div><small class="eyebrow">Studijní cesta</small><h2>Od náslechu k vlastní výuce</h2></div></div><div class="grid">'+modules.map((m,i)=>'<article class="tile phase-tile"><img class="phase-photo" src="phase-'+(i+1)+'.webp?v=zaci-ss1" alt="" loading="lazy"><span class="tag">'+STUDY_GUIDE.label(m.id)+' · Praxe '+String(i+1).padStart(2,'0')+'</span><h3>'+e(m.title)+'</h3><p>'+e(m.short)+'</p>'+link('praxe/'+m.id,'Otevřít praxi →')+'</article>').join('')+'</div>';
  }
  function modulePage(m,overview=false){
    const records=current().records.filter(r=>r.moduleId===m.id);
    const mi=modules.findIndex(item=>item.id===m.id), syl=syllabi[mi];
    const targets=m.observationTargets;

    return (!overview&&role==='ivp'?'<nav class="record-owner"><a href="#podklady">← Podklady k rozboru</a><strong>'+e(person().name)+'</strong><a href="#portfolio">Portfolio studenta →</a></nav>':'')+section('Praxe '+String(modules.findIndex(item=>item.id===m.id)+1).padStart(2,'0')+' · '+(overview?'Zadání a podklady':person().name),m.title,m.goal)+STUDY_GUIDE.panel(m,{role,entry:current(),syllabus:syl})+
    '<details class="area-box"><summary>Podrobné požadavky a podmínky splnění</summary>'+'<p>'+e(m.place)+'</p><ol class="steps">'+m.steps.map(x=>'<li>'+e(x)+'</li>').join('')+'</ol><h3>Co předložit</h3><ul>'+m.evidence.map(x=>'<li>'+e(x)+'</li>').join('')+'</ul><p>'+e(m.credit)+'</p><small>'+e((m.source||[]).join(' · '))+'</small></details>'+(overview?BLOCKS.docs(m.id,role):'<details class="legacy-records"'+(/\/(novy|upravit)\//.test(location.hash)||location.hash.endsWith('/novy')?' open':'')+'><summary>Dřívější krátké záznamy a jejich rozbory</summary><div id="record-space">'+PRACTICE.render({...m,observationTargets:targets},records,role,{reflections:current().reflections})+'</div></details>'+blockExtras(m.id));
  }
  function skills(){
    return section(person().name+' · Rámec MŠMT','Co už dokládá moje praxe?','Mapa se průběžně doplňuje z vašich záznamů, reflexí a posouzení pedagoga.')+COMPUI.map(visibleRecords(),recordRoute);
  }
  function exportBody(r){
    return '<article class="record-export"><h3>'+e(r.title||'Rozepsaný záznam')+'</h3><p>'+e(r.isBlockReflection?BLOCKS.get(r.blockId)?.title:r.tool?toolLabel(r.tool):mod(r.moduleId)?.title)+' · '+e(r.isRetry?'Osobní druhý pokus':r.isBlockReflection?'Reflexe pro IVP':r.tool?'Vlastní poznámka':statusName(r.status))+'</p>'+PRACTICE.recordBody(r)+'</article>';
  }
  function listRecords(){
    const normalize=s=>String(s).toLocaleLowerCase('cs').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const out=visibleRecords().filter(r=>(statusFilter==='all'||statusFilter===r.status)&&normalize([r.title,r.date,fmt(r.date),mod(r.moduleId)?.title,r.isBlockReflection?BLOCKS.get(r.blockId)?.title:'',COMPETENCY.links(r).map(l=>l.code).join(' '),r.competency,r.reflection,r.feedback,r.nextStep,...Object.values(r.fields||{}),...Object.values(r.review||{}),...(r.timeline||[]).flatMap(Object.values)].join(' ')).includes(normalize(search))).sort((a,b)=>b.date.localeCompare(a.date));
    return out.length?out.map(r=>'<details class="area-box entry"><summary>'+e(r.title||'Rozepsaný záznam')+' · '+e(fmt(r.date))+'</summary>'+exportBody(r)+link(recordRoute(r),r.isRetry?'Otevřít srovnání':r.isBlockReflection?'Otevřít reflexi a odpověď':r.tool?'Otevřít modul':'Otevřít v praxi')+(role==='student'&&!r.isBlockReflection&&!r.isRetry?' '+link(sourceRef(r.tool||r.moduleId,r.id),'Navázat reflexí pro IVP','text-btn'):'')+(role==='student'&&r.nextStep&&!r.isRetry?' '+link('druhy-pokus/'+encodeURIComponent(r.id),'Porovnat s druhým pokusem','text-btn'):'')+'</details>').join(''):'<p class="empty">Žádný odpovídající záznam.</p>';
  }
  function portfolio(){
    let finalDraft=null,finalUnreadable=false;
    if(role==='student')try{finalDraft=FINAL_OUTPUT_CONTEXT.read(person().id)}catch{finalUnreadable=true}
    const finalCard=role==='student'?'<aside class="portfolio-final"><div><h2>Moje závěrečné sebehodnocení</h2><p>'+(finalUnreadable?'Uložený souhrn teď nelze načíst. Otevřete jej a zkontrolujte uložené údaje.':finalDraft?'Máte uložený koncept souhrnu. Můžete se vrátit k volbám, doplnit ho a stáhnout pro závěrečný rozbor.':'Až budete uzavírat praxi, vyberete zde své doklady a shrnete, v čem jste se posunuli.')+' Jde o samostatný dokument k portfoliu.</p></div><a class="primary" href="zaverecny-vystup.html">'+(finalDraft?'Pokračovat v souhrnu':'Vyplnit závěrečné sebehodnocení')+' →</a></aside>':'';
    return section(person().name,role==='student'?'Moje portfolio':'Portfolio studujícího','Na jednom místě najdete záznamy, vlastní reflexe a zpětnou vazbu z praxí.')+
    (role==='student'?'<div class="export-actions"><button class="secondary" data-exp-kind="full">Stáhnout celé portfolio</button><button class="secondary" data-exp-kind="brief">Stáhnout stručné portfolio</button></div>':'')+finalCard+'<div class="panel portfolio-toolbar"><label>Hledat v portfoliu<input type="search" id="filter-q" placeholder="Téma, datum, kompetence…" value="'+e(search)+'"></label><label>Stav<select id="filter-st">'+[['all','Všechny záznamy'],...['draft','submitted','returned','confirmed'].map(s=>[s,statusName(s)])].map(([v,l])=>'<option value="'+v+'"'+(v===statusFilter?' selected':'')+'>'+e(l)+'</option>').join('')+'</select></label><button class="primary" data-print>Vytisknout celé portfolio / PDF</button></div><div class="records-list" id="results">'+listRecords()+'</div>';
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
    const routedPage=special&&!['start','sources','materialy','adaptio'].includes(rawPage)?'ivp':scenarioMatch?scenarioMatch[1]:rawPage;
    const page=window.IVP_ROSTER && routedPage==='ivp'?'studium':routedPage;
    const parts=page.split('/').map(part=>{try{return decodeURIComponent(part)}catch{return part}});
    const sheetPractice=role==='student'&&parts.length===2&&parts[0]==='praxe'&&STUDY_GUIDE.get(parts[1])?parts[1]:null;
    if(sheetPractice){parts[0]='arch';parts[1]=['group','guided'].includes(sheetPractice)?'arch-naslechu':sheetPractice;}
    let recordUnavailable=false;
    if(parts[0]==='praxe'&&parts[2]==='zaznam'&&role!=='student'){
      const owners=allowedPeople().filter(p=>db[p.id].records.some(r=>r.id===parts[3]&&r.moduleId===parts[1]&&PRACTICE.readable(r,role)));
      if(owners.length===1)rememberStudent(owners[0].id);else recordUnavailable=true;
    }
    const baseModule=parts[0]==='praxe'?mod(parts[1]):null,m=baseModule&&window.IVP_ROSTER?{...baseModule,schoolOptions:[...new Set((current().placements||[]).filter(r=>r.moduleId===baseModule.id).map(r=>r.school).filter(Boolean))]}:baseModule,refPage=parts[0]==='reflexe';
    const liveNav=role==='ivp'?[['umisteni','Přehled studentů'],['studium','Bloky praxí'],['podklady','Podklady k rozboru'],['materialy','Dokumenty'],['start','Všechny moduly']]:[['umisteni','Moje praxe'],['studium','Studijní cesta'],['plan','Můj plán'],['reflexe','Moje reflexe'],['skills','Moje kompetence'],['portfolio','Portfolio'],['materialy','Dokumenty']];
    const demoNav=role==='student'?[['ivp','Moje praxe'],['studium','Studijní cesta'],['plan','Můj plán'],['reflexe','Moje reflexe'],['skills','Moje kompetence'],['portfolio','Portfolio'],['materialy','Dokumenty']]:role==='ivp'?[['ivp','Přehled studentů'],['studium','Bloky praxí'],['podklady','Podklady k rozboru'],['materialy','Dokumenty'],['start','Všechny moduly'],['umisteni','Import studentů']]:navItems;
    const nav=window.IVP_ROSTER?liveNav:special?[['ivp',role==='method'?'Přehled metodika':'Přehled školy'],['adaptio','Adaptio'],['materialy','Dokumenty'],['sources','Metodiky']]:demoNav;
    let active=parts[0]==='reflexe'?(role==='ivp'&&window.IVP_ROSTER?'podklady':'reflexe'):parts[0]==='materialy'?'materialy':nav.some(([id])=>id===page)?page:(window.IVP_ROSTER&&['praxe','zadani','skills','druhy-pokus'].includes(parts[0])?'studium':special||!['materialy','sources'].includes(page)?'ivp':'');
    if(window.IVP_ROSTER&&role==='ivp'&&(page==='portfolio'||(parts[0]==='praxe'&&parts[2]==='zaznam')))active='podklady';
    let content;
    if(page==='umisteni'||(page==='skola'&&window.IVP_ROSTER)) content=window.IVP_ROSTER?IVP_LOCAL.render(allowedPeople(),db,role):IVP_IMPORT.render();
    else if(page==='podklady'&&role==='ivp')content=REVIEW.render({people:allowedPeople(),db});
    else if(parts[0]==='arch'&&!special)content=SHEETS.render(parts[1],current(),role,sheetPractice);
    else if(parts[0]==='materialy') content=BLOCKS.catalog(role);
    else if(page==='studium')content=STUDY.render({role,person:person(),entry:current(),modules,people:allowedPeople(),db,live:Boolean(window.IVP_ROSTER)});
    else if(page==='sources')content=sources();
    else if(special)content=page==='adaptio'?ATools.adaptioHome(role):RoleDesk.render(role,db,people,modules);
    else if(page==='start')content=hub();
    else if(refPage){
      if(parts[1]==='nova' && role==='student' && BLOCKS.get(parts[2])){
        content=link('reflexe','← Moje reflexe','text-btn')+STUDY_GUIDE.reflection(parts[2])+IVPREF.block(parts[2],refContext(),{compose:true,activityId:parts[3]==='zaznam'?undefined:parts[3],sourceId:parts[3]==='zaznam'?parts[4]:undefined});
      }else content=(role==='ivp'?'<p><a class="text-btn" href="#podklady">← Všechny podklady k rozboru</a></p>':'')+IVPREF.queue(refContext(),{focus:parts[1]});
    }
    else if(page==='skola')content=schoolPage();
    else if(toolPages.includes(page))content=practiceTool(page,scenarioMatch);
    else if(parts[0]==='zadani'&&mod(parts[1]))content=modulePage(mod(parts[1]),true);
    else if(m)content=recordUnavailable?section('Podklady studenta','Tento záznam nelze jednoznačně otevřít','Vyberte jej znovu z přehledu předaných podkladů.')+link('podklady','Otevřít podklady k rozboru'):modulePage(m);
    else if(parts[0]==='druhy-pokus'&&role==='student')content=DRUHY.render(visibleRecords(),current().retries,parts[1]);
    else if(page==='skills')content=skills();
    else if(parts[0]==='nahled'&&role==='student'&&['full','brief'].includes(parts[1]))content=link('materialy','← Dokumenty k praxím','text-btn')+section(person().name,parts[1]==='brief'?'Moje stručné portfolio':'Moje celé portfolio')+'<div class="export-actions"><button class="primary" data-exp-kind="'+parts[1]+'">Stáhnout HTML ↓</button><button class="secondary" data-preview-print>Tisk / uložit PDF</button></div><iframe class="doc-preview" title="Náhled mého portfolia" id="export-preview"></iframe>';
    else if(page==='portfolio')content=portfolio();
    else if(page==='plan'&&role==='student')content=(window.IVP_ROSTER?'<aside class="plan-placement-note"><strong>Vaše konkrétní dny praxe a rozborů</strong><p>Období ze seznamu umístění najdete v <a href="#umisteni">Moje praxe</a>. Zde si doplníte jednotlivé dny do vlastního kalendáře.</p></aside>':'')+'<div id="plan-space">'+PLAN.render(current().events,modules)+'</div><div class="calendar-take"><button type="button" class="secondary" data-calendar '+(current().events.length?'':'disabled')+'>Stáhnout termíny do mého kalendáře ↓</button><small>Soubor ICS pro kalendář v telefonu, Outlook nebo Google Kalendář.</small></div>';
    else content=role==='student'?studentHome():staff()+practiceLinks()+STAFFTOOLS.render(db,allowedPeople(),role);
    root.innerHTML='<header class="site-head"><a class="brand" href="#start"><span class="foxy-wordmark" aria-label="Foxy Studio">FOXY<b>STUDIO</b></span><span>Ateliér praxí<small>Učitelství praktického vyučování</small></span></a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-navigation">Nabídka <span aria-hidden="true">＋</span></button><nav id="main-navigation" aria-label="Hlavní nabídka">'+nav.map(([id,name])=>'<a href="#'+id+'" '+(active===id?'aria-current="page"':'')+'>'+e(name)+'</a>').join('')+'</nav><label class="account"><span class="sr">Pracovní náhled profilu</span><select id="mode">'+[...people.map(p=>['student/'+p.id,p.name+' · student']),...roleProfiles].map(([id,l])=>'<option value="'+id+'" '+(id===(role==='student'?'student/'+who:role)?'selected':'')+'>'+l+'</option>').join('')+'</select></label></header><main id="content" tabindex="-1"><nav class="orientation" aria-label="Orientace"><a href="#start">Úvod</a><a href="#studium">Šest bloků praxe</a><span>'+e(role==='student'?'Pohled studenta · '+person().name:roleProfiles.find(p=>p[0]===role)?.[1]||role)+'</span></nav>'+content+'</main><footer class="appfoot"><span>'+(window.IVP_ROSTER?'Soukromý seznam v tomto prohlížeči · přepínač profilů není přihlášení':'Ukázkové role · údaje se ukládají v tomto prohlížeči')+'</span><a href="#materialy">Dokumenty ke stažení</a><a href="#sources">Metodiky a zdroje</a></footer>';
    if(parts[0]==='arch')SHEETS.bind(root,parts[1],current(),role,(id,row)=>{const before=current().sheets;const rows=before?.[id]||[];current().sheets={...before,[id]:rows.some(r=>r.id===row.id)?rows.map(r=>r.id===row.id?row:r):[...rows,row]};if(persist())return true;current().sheets=before;toast('Arch se nepodařilo uložit.');return false;},parts[2]);
    root.querySelector('.nav-toggle').onclick=event=>{const button=event.currentTarget,head=root.querySelector('.site-head'),open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));head.setAttribute('data-nav-open',String(open));button.querySelector('span').textContent=open?'−':'＋';};
    root.querySelectorAll('a[href="zaverecny-vystup.html"]:not([download])').forEach(a=>a.onclick=event=>{event.preventDefault();try{location.href=FINAL_OUTPUT_CONTEXT.link(role==='student'?person():null);}catch(err){toast(err.message);}});
    if(parts[0]==='materialy'&&parts[1])requestAnimationFrame(()=>{const target=document.getElementById('dokumenty-'+parts[1]);if(target){target.tabIndex=-1;target.focus({preventScroll:true});target.scrollIntoView({block:'start'});}});
    if(page==='umisteni'||(page==='skola'&&window.IVP_ROSTER)){if(window.IVP_ROSTER)IVP_LOCAL.bind(root,db,role,persist,render,toast,id=>{useProfile('student/'+id);try{sessionStorage.setItem(KEY+'.view','student/'+id)}catch{}navigate('umisteni');},allowedPeople(),()=>{useProfile('ivp');try{sessionStorage.setItem(KEY+'.view','ivp')}catch{}navigate('umisteni');});else IVP_IMPORT.bind(root);}
    if(window.IVP_ROSTER && role==='student' && page!=='umisteni' && page!=='skola'){const bar=document.createElement('div');bar.className='lc-preview-bar';bar.innerHTML='<span>Pracovní náhled studenta</span><button type="button">← Zpět ke koordinaci</button>';root.querySelector('#content').prepend(bar);bar.querySelector('button').onclick=()=>{useProfile('ivp');try{sessionStorage.setItem(KEY+'.view','ivp')}catch{}navigate('umisteni');};}
    root.querySelectorAll('[data-guide-check]').forEach(box=>{box.onchange=()=>{const block=box.dataset.guideCheck,index=Number(box.dataset.guideStep);const before=structuredClone(current().guideChecks||{});current().guideChecks||={};const values=new Set(current().guideChecks[block]||[]);if(box.checked)values.add(index);else values.delete(index);current().guideChecks[block]=[...values];if(!persist()){current().guideChecks=before;box.checked=!box.checked;}else toast('Osobní postup uložen.');};});
    document.querySelector('#mode').onchange=ev=>{useProfile(ev.target.value);const url=new URL(location.href);url.searchParams.delete('profil');history.replaceState(null,'',url);try{sessionStorage.setItem(KEY+'.view',ev.target.value)}catch{} search='';statusFilter='all';navigate(window.IVP_ROSTER?'umisteni':role==='student'?'start':'ivp')};
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
    if(page==='podklady'&&role==='ivp')REVIEW.bind(root,{openRecord,openReflection:id=>navigate('reflexe/'+encodeURIComponent(id))});
    root.querySelectorAll('[data-person]').forEach(b=>b.onclick=()=>{if(!allowedPeople().some(p=>p.id===b.dataset.person))return;if(b.dataset.stage)return openRecord(b.dataset.person,b.dataset.stage,b.dataset.entry);rememberStudent(b.dataset.person);search='';statusFilter='all';navigate('portfolio')});
    if(page==='skola'){
      const select=root.querySelector('#school-user');if(select)select.onchange=()=>{who=select.value;render()};
      if(root.querySelector('#prep-space'))PREP.bind(root.querySelector('#prep-space'),current().prep||{},role,state=>{const before=current().prep;current().prep=state;if(!persist()){current().prep=before;return;}render();toast('Změna je uložená.')});
    }
    if(page==='ivp' && role!=='student')STAFFTOOLS.bind(root,{openStudent:(id,dest='portfolio')=>{if(!allowedPeople().some(p=>p.id===id))return;who=id;navigate(dest)},go:navigate});
    if(toolPages.includes(page)){
      const tool=page==='nacvik'||page==='adaptio'?ATools:WORK;
      const notes=role==='student'?(current().tools?.[page]||[]):[],save=items=>{
        if(role!=='student')return;
        const before=current().tools;
        current().tools={...before,[page]:items.map(r=>({...r,tool:page}))};
        if(!persist()){current().tools=before;return;}
        if(scenarioMatch)history.replaceState(null,'','#'+page);
        render();
        if(page==='adaptio'){const result=root.querySelector('.adapt-saved');if(result){result.tabIndex=-1;result.focus();}}
        toast(page==='adaptio'?'Příprava je uložená ve vašem portfoliu.':'Poznámka je ve vašem portfoliu.');
      };
      if(tool===WORK)tool.bind(root.querySelector('#tool-space'),page,notes,role,save);
      else tool.bind(root.querySelector('#tool-space'),page,notes,save,role,page==='adaptio'&&scenarioMatch?Number(scenarioMatch[2])-1:null);
      if(scenarioMatch&&page==='nacvik')root.querySelector('[data-scenario="'+(Number(scenarioMatch[2])-1)+'"]')?.click();
    }
    if(m&&!recordUnavailable){PRACTICE.bind(document.querySelector('#record-space'),m,current().records.filter(r=>r.moduleId===m.id),{role,save:items=>{
      const beforeRecords=current().records,beforeLog=current().reviewLog;
      const changed=items.find(r=>beforeRecords.find(old=>old.id===r.id)!==r);
      current().reviewLog=STAFFTOOLS.logChanges(beforeRecords.filter(r=>r.moduleId===m.id),items,beforeLog);
      current().records=[...beforeRecords.filter(r=>r.moduleId!==m.id),...items];
      if(!persist()){current().records=beforeRecords;current().reviewLog=beforeLog;return false;}
      if(changed)history.replaceState(null,'','#praxe/'+m.id+'/zaznam/'+encodeURIComponent(changed.id));
      render();toast(role==='student'?(changed?.status==='submitted'?'Záznam je ve frontě koordinátora v tomto prohlížeči.':'Rozepsaný záznam je uložený.'):(changed?.status==='returned'?'Záznam je vrácený k doplnění.':'Rozbor záznamu je uzavřený.'));return true;
    },go:navigate})}
    if(m && parts[2]==='zaznam'){
      const sel=[...root.querySelectorAll('[data-record-id]')].find(el=>el.dataset.recordId===parts[3]);
      if(sel){sel.open=true;requestAnimationFrame(()=>sel.scrollIntoView({block:'start'}))}
    }
    if(m && parts[2]==='novy' && role==='student')root.querySelector('[data-rec-new]')?.click();
    if(m && parts[2]==='upravit' && role==='student'){
      const edit=[...root.querySelectorAll('[data-rec-edit]')].find(b=>b.dataset.recEdit===parts[3]);
      if(edit){edit.click();history.replaceState(null,'','#praxe/'+m.id)}
    }
    if(page==='plan'&&role==='student'){PLAN.bind(document.querySelector('#plan-space'),current().events,modules,{save:ev=>{const before=current().events;current().events=ev;if(persist()){render();toast('Kalendář je uložený.')}else{current().events=before;render();}},open:id=>navigate('praxe/'+id)})}
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
