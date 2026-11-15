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
  let db; try { db=JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch { db=fresh(); }
  let role='student',who='alex',search='',statusFilter='all';
  const person=()=>people.find(p=>p.id===who);
  const current=()=>db[who];
  const recordRoute=r=>r.tool?r.tool:'praxe/'+r.moduleId+'/zaznam/'+encodeURIComponent(r.id);
  const navItems=[['start','Všechny moduly'],['ivp','Praxe IVP'],['nacvik','Praxe nanečisto'],['adaptio','Adaptio'],['ss','Praxe SŠ'],['kurzy','Kurzy ČZU']];
  const names={student:'Student',mentor:'Cvičný učitel',ivp:'Přehled IVP'};
  const section=(ey,title,desc='')=>'<header class="subhead"><small class="eyebrow">'+e(ey)+'</small><h1>'+e(title)+'</h1>'+(desc?'<p>'+e(desc)+'</p>':'')+'</header>';
  const visibleRecords=()=>[...current().records,...(role==='student'?Object.values(current().tools||{}).flat():[])].filter(r=>role==='student'||r.status!=='draft');
  const fmt=d=>d?new Intl.DateTimeFormat('cs-CZ',{day:'numeric',month:'long',year:'numeric'}).format(new Date(d+'T12:00:00')):'';
  function toast(msg){const node=document.getElementById('toast');node.textContent=msg;clearTimeout(toast.t);toast.t=setTimeout(()=>node.textContent='',3500);}
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(db));return true}catch{toast('Uložení v prohlížeči se nezdařilo. Zálohujte si portfolio tiskem.');return false}}
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
  function hub(){
    const personal=role==='student'?'Připravte se na další hodinu, zkuste si náročnou situaci nebo se vraťte k tomu, co jste viděli při náslechu.':role==='mentor'?'Otevřete si práci studenta, připravte společný rozbor nebo si vyberte situaci pro další setkání.':'Podívejte se, kdo čeká na přijetí na školu a které práce už prošly společným rozborem.';
    return '<section class="hub-hero"><div class="hub-intro"><small class="eyebrow">Ateliér praxí · IVP ČZU</small><h1>Co právě potřebujete?</h1><p>'+personal+'</p>'+link('ivp',role==='student'?'Moje pedagogická praxe →':role==='mentor'?'Otevřít práce k rozboru →':'Otevřít koordinaci praxí →','primary')+'</div><figure><img src="hub.webp" alt="Dva studující před cvičnou školou probírají své poznámky."></figure></section>'+
    '<header class="hub-head"><h2>Vyberte si podle situace</h2></header><div class="hub-grid">'+catalog.map(([id,name,kind,title,desc,photo])=>'<a class="hub-card" href="#'+id+'"><img src="'+photo+'" alt=""><div><small>'+e(name)+'</small><h3>'+e(title)+'</h3><p>'+e(desc)+'</p><span aria-hidden="true">↗</span></div></a>').join('')+'</div>';
  }
  function practiceLinks(){
    const links=role==='student'?[['skola','Moje škola'],['plan','Termíny'],['skills','Moje kompetence'],['portfolio','Moje portfolio'],['sources','Metodiky a pomoc']]:[['skola',role==='ivp'?'Žádosti o školu':'Přijetí na školu'],['skills','Kompetence'],['portfolio','Portfolio'],['sources','Metodiky a pomoc']];
    return '<nav class="practice-links" aria-label="Nástroje pro pedagogické praxe">'+links.map(([id,name])=>link(id,name)).join('')+'</nav>';
  }
  function schoolPage(){
    const choices=role==='student'?'':'<label class="student-select">Studující <select id="school-user">'+people.map(p=>'<option value="'+p.id+'" '+(p.id===who?'selected':'')+'>'+e(p.name)+'</option>').join('')+'</select></label>';
    return section('Praxe IVP · '+person().name,role==='student'?'Moje cvičná škola':'Přijetí na cvičnou školu')+choices+'<div id="prep-space">'+PREP.render(current().prep||{},role)+'</div>';
  }
  function practiceTool(page){
    const tool=page==='nacvik'||page==='adaptio'?ATools:WORK;
    const notes=role==='student'?(current().tools?.[page]||[]):[];
    const ref={nacvik:['Původní trenažér Foxy','https://foxy-studio-campus-pilot.web.app/modules/nanecisto/index.html#prace/upv'],adaptio:['Samostatná aplikace Adaptio','https://adaptio-pruvodce-ucitele.aneta-vadovicova.chatgpt.site'],ss:['Kampus Foxy · Praxe SŠ','https://foxy-studio-campus-pilot.web.app/']}[page];
    return '<div id="tool-space" data-page="'+page+'">'+tool.render(page,notes,role)+'</div>'+(ref?'<footer class="tool-source"><a href="'+ref[1]+'" target="_blank" rel="noopener">'+ref[0]+' ↗</a></footer>':'');
  }
  function studentHome(){
    const p=person(),m=mod(p.stage),pending=current().records.find(r=>['draft','returned'].includes(r.status)),target=pending?mod(pending.moduleId):m;
    return '<section class="hero"><div class="hero-copy"><small>'+e(p.name)+' · Učitelství praktického vyučování</small><h1>'+({group:'Co dnes uvidíte ve výuce?',micro:'Jak povedete první výstup?',continuous:'Co si žáci odnesou z hodiny?'}[p.stage])+'</h1><p>'+({group:'Při náslechu vyberte jeden okamžik. Zapište, co udělal učitel a jak na to žáci reagovali.',micro:'Naplánujte si krátkou instruktáž a určete, podle čeho poznáte, že jí skupina rozumí.',continuous:'Spojte přípravu, vlastní výuku a rozbor s cvičným učitelem do jednoho záznamu.'}[p.stage])+'</p>'+link('praxe/'+target.id+(pending?'/upravit/'+pending.id:''),pending?'Pokračovat v záznamu →':'Otevřít moji praxi →','primary')+'</div><figure class="hero-photo"><img src="praxe.webp" alt="Studentka učitelství a mentorka poslouchají, jak žák vysvětluje sestavení dřevěného spoje."><figcaption>'+e(target.title)+'</figcaption></figure></section>'+
    practiceLinks()+'<div class="section-head"><div><small class="eyebrow">Studijní cesta</small><h2>Od náslechu k vlastní výuce</h2></div></div><div class="grid">'+modules.map((m,i)=>'<article class="tile phase-tile"><img class="phase-photo" src="phase-'+(i+1)+'.webp" alt="" loading="lazy"><span class="tag">'+[2,3,4,5,6,6][i]+'. semestr · Praxe '+String(i+1).padStart(2,'0')+'</span><h3>'+e(m.title)+'</h3><p>'+e(m.short)+'</p>'+link('praxe/'+m.id,'Otevřít praxi →')+'</article>').join('')+'</div>';
  }
  function modulePage(m){
    const records=current().records.filter(r=>r.moduleId===m.id);
    const mi=modules.indexOf(m), syl=syllabi[mi], guided=m.id==='guided', chosen=current().guidedPlan||'uis';
    const targets=guided&&chosen==='uis'?{theory:4,practice:6}:m.observationTargets;
    const variant=guided?'<aside class="notice"><strong>Rozsah řízeného náslechu</strong><p>Sylabus UIS pro rok 2026/27 a dodaná metodika 03 uvádějí různé počty. Po domluvě s garantem vyberte podklad pro své počítadlo.</p><label>Počítat podle<select id="guided-target" '+(role==='student'?'':'disabled')+'><option value="uis" '+(chosen==='uis'?'selected':'')+'>UIS 2026/27 · 4 teoretické a 6 praktických</option><option value="method" '+(chosen==='method'?'selected':'')+'>Metodika 03 · 10 teoretických a 2 praktické</option></select></label></aside>':'';
    return section('Praxe '+String(modules.indexOf(m)+1).padStart(2,'0')+' · '+person().name,m.title,m.goal)+variant+
    '<details class="area-box"><summary>Jak praxe probíhá a co doložím</summary>'+(syl?'<p><a href="'+e(syl.url)+'" target="_blank" rel="noopener">'+e(syl.name)+'</a><br>'+e(syl.note)+'</p>':'')+'<p>'+e(m.place)+'</p><ol class="steps">'+m.steps.map(x=>'<li>'+e(x)+'</li>').join('')+'</ol><h3>Co předložit</h3><ul>'+m.evidence.map(x=>'<li>'+e(x)+'</li>').join('')+'</ul><p>'+e(m.credit)+'</p><small>'+e((m.source||[]).join(' · '))+'</small></details><div id="record-space">'+PRACTICE.render({...m,observationTargets:targets},records,role)+'</div>';
  }
  function skills(){
    const records=visibleRecords();
    return section(person().name+' · Kompetence','Co už dokládá moje praxe?','U každé kompetence uvidíte, v kolika situacích jste ji pozorovali nebo sami použili. Do počítadla vstupují kompetence se záznamem po společném rozboru.')+
    '<div class="stack">'+AREAS.map(area=>{const count=area.skills.filter(s=>records.some(r=>r.competency===s.code && r.status==='confirmed')).length;return '<details class="area-box"><summary>'+e(area.name)+' <small class="skill-count">'+count+' / '+area.skills.length+' po rozboru</small></summary>'+area.skills.map(s=>{const list=records.filter(r=>r.competency===s.code);return '<details><summary>'+e(s.code)+' · '+e(s.name)+' <small>('+list.length+')</small></summary><p>'+e(s.example||s.hint||'Vyberte při zápisu konkrétní situaci, na které tuto dovednost ukážete.')+'</p>'+(list.length?list.map(r=>'<p>'+e(r.title||'Rozepsaný záznam')+' · '+e(mod(r.moduleId)?.title)+' · '+e(statusName(r.status))+' '+link(recordRoute(r),'Otevřít doklad','text-btn')+'</p>').join(''):'<p>Zatím bez dokladu. Kompetenci přiřadíte v záznamu z praxe.</p>')+'</details>'}).join('')+'</details>'}).join('')+'</div><p class="muted">'+link('sources','Původ kompetencí a metodik','text-btn')+'</p>';
  }
  function exportBody(r){
    return '<article class="record-export"><h3>'+e(r.title||'Rozepsaný záznam')+'</h3><p>'+e(r.tool?toolLabel(r.tool):mod(r.moduleId)?.title)+' · '+e(r.tool?'Vlastní poznámka':statusName(r.status))+'</p>'+PRACTICE.recordBody(r)+'</article>';
  }
  function listRecords(){
    const normalize=s=>String(s).toLocaleLowerCase('cs').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const out=visibleRecords().filter(r=>(statusFilter==='all'||statusFilter===r.status)&&normalize([r.title,r.date,fmt(r.date),mod(r.moduleId)?.title,r.competency,r.reflection,r.feedback,r.nextStep,...Object.values(r.fields||{}),...Object.values(r.review||{}),...(r.timeline||[]).flatMap(Object.values)].join(' ')).includes(normalize(search))).sort((a,b)=>b.date.localeCompare(a.date));
    return out.length?out.map(r=>'<details class="area-box entry"><summary>'+e(r.title||'Rozepsaný záznam')+' · '+e(fmt(r.date))+'</summary>'+exportBody(r)+link(recordRoute(r),r.tool?'Otevřít modul':'Otevřít v praxi')+'</details>').join(''):'<p class="empty">Žádný odpovídající záznam.</p>';
  }
  function portfolio(){
    return section(person().name,role==='student'?'Moje portfolio':'Portfolio studujícího','Na jednom místě najdete záznamy, vlastní reflexe a zpětnou vazbu z praxí.')+
    '<div class="panel portfolio-toolbar"><label>Hledat v portfoliu<input type="search" id="filter-q" placeholder="Téma, datum, kompetence…" value="'+e(search)+'"></label><label>Stav<select id="filter-st">'+[['all','Všechny záznamy'],...['draft','submitted','returned','confirmed'].map(s=>[s,statusName(s)])].map(([v,l])=>'<option value="'+v+'"'+(v===statusFilter?' selected':'')+'>'+e(l)+'</option>').join('')+'</select></label><button class="primary" data-print>Vytisknout celé portfolio / PDF</button></div><div class="records-list" id="results">'+listRecords()+'</div>';
  }
  function staff(){
    const pending=people.flatMap(p=>db[p.id].records.filter(r=>r.status==='submitted').map(r=>({p,r})));
    return section('Ukázková role · '+names[role],role==='mentor'?'Co čeká na rozbor?':'Přehled pedagogických praxí',role==='mentor'?'Otevřete práci studenta, přečtěte si reflexi a doplňte zpětnou vazbu.':'Sledujte zaznamenanou práci a průběh rozborů u modelové skupiny.')+
    (role==='mentor'?'<section class="panel"><h2>K rozboru · '+pending.length+'</h2>'+pending.map(({p,r})=>'<div class="overview-row"><div><strong>'+e(r.title)+'</strong><small>'+e(p.name)+' · '+e(mod(r.moduleId).title)+'</small></div><button class="secondary" data-person="'+p.id+'" data-stage="'+r.moduleId+'" data-entry="'+e(r.id)+'">Otevřít</button></div>').join('')+(pending.length?'':'<p>V tuto chvíli nikdo nečeká na zpětnou vazbu.</p>')+'</section>':'')+
    '<div class="section-head"><h2>Studijní skupina</h2></div><div class="grid">'+people.map(p=>{const rs=db[p.id].records;return '<article class="tile"><span class="tag">'+e(mod(p.stage).title)+'</span><h3>'+e(p.name)+'</h3><p>Záznamy celkem · '+rs.length+'<br>Po rozboru · '+rs.filter(r=>r.status==='confirmed').length+'</p><button class="secondary" data-person="'+p.id+'">Otevřít portfolio</button></article>'}).join('')+'</div>';
  }
  function sources(){
    return section('IVP ČZU · MŠMT','Z čeho průvodce vychází','Podmínky jednotlivých praxí určují metodiky IVP. Profesní kompetence slouží k pojmenování toho, co můžete ve své práci doložit.')+'<div class="stack">'+SOURCES.map(s=>'<article class="panel"><h3>'+e(s.name)+'</h3><p>'+e(s.note)+'</p>'+(s.url?'<a href="'+e(s.url)+'" target="_blank" rel="noopener">Otevřít zdroj ↗</a>':'')+'</article>').join('')+'</div>';
  }
  function render(){
    const page=route(),m=page.startsWith('praxe/')?mod(page.split('/')[1]):null;
    const nav=navItems;
    const active=navItems.some(([id])=>id===page)?page:'ivp';
    const content=page==='start'?hub():page==='skola'?schoolPage():toolPages.includes(page)?practiceTool(page):m?modulePage(m):page==='skills'?skills():page==='portfolio'?portfolio():page==='sources'?sources():page==='plan'&&role==='student'?'<div id="plan-space">'+PLAN.render(current().events,modules)+'</div>':role==='student'?studentHome():staff()+practiceLinks()+STAFFTOOLS.render(db,people,role);
    root.innerHTML='<header class="site-head"><a class="brand" href="#start"><img src="mark.svg" alt=""><span>Ateliér praxí<small>Učitelství praktického vyučování</small></span></a><nav aria-label="Hlavní nabídka">'+nav.map(([id,name])=>'<a href="#'+id+'" '+(active===id?'aria-current="page"':'')+'>'+e(name)+'</a>').join('')+'</nav><label class="account"><span class="sr">Ukázkový profil</span><select id="mode">'+[...people.map(p=>['student/'+p.id,p.name+' · student']),['mentor','Cvičný učitel'],['ivp','Koordinátor IVP']].map(([id,l])=>'<option value="'+id+'" '+(id===(role==='student'?'student/'+who:role)?'selected':'')+'>'+l+'</option>').join('')+'</select></label></header><main id="content" tabindex="-1">'+content+'</main><footer class="appfoot"><span>Ukázková skupina · záznamy zůstávají v tomto prohlížeči</span><a href="#sources">Metodiky a zdroje</a></footer>';
    document.querySelector('#mode').onchange=ev=>{const [r,p]=ev.target.value.split('/');role=r;if(p)who=p;search='';statusFilter='all';navigate('start')};
    root.querySelectorAll('[data-person]').forEach(b=>b.onclick=()=>{who=b.dataset.person;search='';statusFilter='all';navigate(b.dataset.stage?'praxe/'+b.dataset.stage+'/zaznam/'+encodeURIComponent(b.dataset.entry):'portfolio')});
    if(page==='skola'){
      const select=root.querySelector('#school-user');if(select)select.onchange=()=>{who=select.value;render()};
      PREP.bind(root.querySelector('#prep-space'),current().prep||{},role,state=>{current().prep=state;const ok=persist();render();if(ok)toast('Změna je uložená.')});
    }
    if(page==='ivp' && role!=='student')STAFFTOOLS.bind(root,{openStudent:(id,dest='portfolio')=>{who=id;navigate(dest)},go:navigate});
    if(toolPages.includes(page)){
      const tool=page==='nacvik'||page==='adaptio'?ATools:WORK;
      const notes=role==='student'?(current().tools?.[page]||[]):[],save=items=>{if(role!=='student')return;current().tools||={};current().tools[page]=items.map(r=>({...r,tool:page}));const ok=persist();render();if(ok)toast('Poznámka je ve vašem portfoliu.')};
      if(tool===WORK)tool.bind(root.querySelector('#tool-space'),page,notes,role,save);
      else tool.bind(root.querySelector('#tool-space'),page,notes,save,role);
    }
    if(m?.id==='guided'&&role==='student')document.querySelector('#guided-target').onchange=ev=>{current().guidedPlan=ev.target.value;persist();render()};
    if(m){PRACTICE.bind(document.querySelector('#record-space'),m,current().records.filter(r=>r.moduleId===m.id),{role:role,save:items=>{current().reviewLog=STAFFTOOLS.logChanges(current().records.filter(r=>r.moduleId===m.id),items,current().reviewLog);current().records=[...current().records.filter(r=>r.moduleId!==m.id),...items];const ok=persist();render();if(ok)toast('Záznam je uložený.')},go:navigate})}
    if(m && page.split('/')[2]==='zaznam'){
      const sel=[...root.querySelectorAll('[data-record-id]')].find(el=>el.dataset.recordId===page.split('/')[3]);
      if(sel){sel.open=true;requestAnimationFrame(()=>sel.scrollIntoView({block:'start'}))}
    }
    if(m && page.split('/')[2]==='upravit' && role==='student'){
      const edit=[...root.querySelectorAll('[data-rec-edit]')].find(b=>b.dataset.recEdit===page.split('/')[3]);
      if(edit){edit.click();history.replaceState(null,'','#praxe/'+m.id)}
    }
    if(page==='plan'&&role==='student'){PLAN.bind(document.querySelector('#plan-space'),current().events,modules,{save:ev=>{current().events=ev;persist();render()},open:id=>navigate('praxe/'+id)})}
    if(page==='portfolio'){
      document.querySelector('#filter-q').oninput=ev=>{search=ev.target.value;document.querySelector('#results').innerHTML=listRecords()};
      document.querySelector('#filter-st').onchange=ev=>{statusFilter=ev.target.value;document.querySelector('#results').innerHTML=listRecords()};
      document.querySelector('[data-print]').onclick=()=>{root.querySelector('.print-all')?.remove();root.insertAdjacentHTML('beforeend','<div class="print-all"><h1>Portfolio pedagogických praxí</h1><p>'+e(person().name)+' · Učitelství praktického vyučování · ukázkový profil</p>'+visibleRecords().map(exportBody).join('')+'</div>');document.body.classList.add('print-mode');window.print()};
    }
  }
  window.addEventListener('afterprint',()=>document.body.classList.remove('print-mode'));
  window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0)});
  render();
})();
