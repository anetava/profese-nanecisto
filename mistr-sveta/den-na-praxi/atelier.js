'use strict';
const root=document.querySelector('#app'), dialog=document.querySelector('#picker'), outlet=document.querySelector('#message');
const scopedKey=id=>'mistr-sveta.atelier.1.'+id;
const sessionCache=new Map();
let language='cs', studentId='ema', role='student', view='path', hintStage='', rosterFilter='all';
let studentStyle=false;
let audioSession=null, busy=false, noticeTimer=0, classroomSettings={title:'Gastro ateliér',lang:'cs'}, hasStorage=true, quizError=false;
const allRoles=['student','teacher','leader','admin'];
try{const s=JSON.parse(localStorage.getItem(scopedKey('settings'))||'null');if(s)classroomSettings=s;
 studentStyle=localStorage.getItem(scopedKey('student-style'))==='on';language=localStorage.getItem(scopedKey('language'))||classroomSettings.lang||'cs';studentId=localStorage.getItem(scopedKey('profile'))||'ema';
}catch{hasStorage=false}
if(!['cs','sk'].includes(language))language='cs';
if(!PEOPLE.some(p=>p.id===studentId))studentId='ema';
const styleWords={
'Moje cesta':'Moje skilly','Moja cesta':'Moje skilly','Směna':'Moje směna','Zmena':'Moja zmena','Deník':'Zápisky','Denník':'Zápisky','Portfolio':'Moje práce','Portfólio':'Moja práca','Plánovač':'Můj plán','Plánovač praxe':'Kdy mám praxi?','Kariérní mapa':'Kam mířím','Kariérna mapa':'Kam mierim','Můj lístek dovedností':'Moje skilly v provozu','Môj lístok zručností':'Moje skilly v prevádzke','Cíl směny':'Dnešní mise','Cieľ zmeny':'Dnešná misia','K nácviku':'Chci zkusit','Na nácvik':'Chcem skúsiť','Vlastní nácvik':'Můj trénink','Vlastný nácvik':'Môj tréning','Můj deník praxe':'Moje směny v kostce','Môj denník praxe':'Moje zmeny v kocke','Před směnou':'Před startem','Pred zmenou':'Pred štartom','Během směny':'Přímo v akci','Počas zmeny':'Priamo v akcii','Po směně':'Po směně v kostce','Po zmene':'Po zmene v kocke','Co posuzuje pedagog a jaké jsou úrovně':'Podle čeho mistr pozná můj level?','Čo posudzuje pedagóg a aké sú úrovne':'Podľa čoho majster spozná môj level?','Doklad práce':'Moje ukázka práce','Doklad práce ':'Moja ukážka práce','Situace k nácviku':'Co si zkusím','Situácia na nácvik':'Čo si skúsim','Úkol této směny':'Co dnes zvládnu','Úloha tejto zmeny':'Čo dnes zvládnem','Otevřít ranní přípravu':'Jdu na přípravu','Otvoriť rannú prípravu':'Idem na prípravu','Závěrečná reflexe':'Jak mi to šlo?','Záverečná reflexia':'Ako mi to išlo?','K čemu mi to je?':'Proč se mi tenhle skill hodí?','Na čo mi to je?':'Kde tento skill využijem?','Jak ji získám?':'Jak si odemknu další level?','Ako ju získam?':'Ako si odomknem ďalší level?','Co přesně zvládnu':'Co budu mít v ruce','Čo presne zvládnem':'Čo budem mať v rukách','Uložené dny':'Moje dosavadní směny','Uložené dni':'Moje doterajšie zmeny','Naplánovaná směna':'Co mě čeká','Naplánovaná zmena':'Čo ma čaká'};
function youthCopy(text){
 if(!studentStyle||role!=='student'||typeof text!=='string')return text;
 if(text==='Plánovač'&&language==='sk')return 'Môj plán';
 if(text==='Plánovač praxe'&&language==='sk')return 'Kedy mám prax?';
 return styleWords[text]??text.replace(/\bSamostatně\b/g,'Bez nápovědy').replace(/\bSamostatne\b/g,'Bez pomoci').replace(/Vyzkoušet si/g,'Zkusit si').replace(/Vyskúšať si/g,'Skúsiť si').replace(/Zobrazit/g,'Ukázat').replace(/Zobraziť/g,'Ukázať').replace(/dovedností/g,'skillů').replace(/zručností/g,'skillov').replace(/Úroveň/g,'Level').replace(/úroveň/g,'level');
}
const t=(cs,sk=cs)=>youthCopy(language==='sk'?sk:cs);
const loc=x=>Array.isArray(x)?youthCopy(x[language==='sk'?1:0]):String(x??'');
const html=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const person=(id=studentId)=>PEOPLE.find(p=>p.id===id);
const cat=()=>CATALOG[language];
const competency=code=>cat().competencies.find(x=>x.code===code);
const moduleInfo=code=>cat().modules.find(x=>x.id===competency(code).module);
const roleLabel=r=>({student:t('Žák','Žiak'),teacher:t('Pedagog','Pedagóg'),leader:t('Vedení','Vedenie'),admin:t('Správce','Správca')})[r];
const profession=p=>p.track==='cook'?(p.girl?t('Kuchařka','Kuchárka'):t('Kuchař','Kuchár')):(p.girl?t('Servírka','Čašníčka'):t('Číšník','Čašník'));
const stageLabels=()=>[t('Před směnou','Pred zmenou'),t('Příchod na pracoviště','Príchod na pracovisko'),t('Ukázka na pracovišti','Ukážka na pracovisku'),t('Vlastní práce','Vlastná práca'),t('Závěrečná reflexe','Záverečná reflexia'),t('Čeká na pedagoga','Čaká na pedagóga'),t('Potvrzeno','Potvrdené'),t('K doplnění','Na doplnenie')];
const shortStages=()=>[t('Ráno'),t('Příchod','Príchod'),t('Ukázka','Ukážka'),t('Nácvik'),t('Reflexe','Reflexia'),t('K posouzení','Na posúdenie'),t('Potvrzeno','Potvrdené'),t('K doplnění','Na doplnenie')];
const period=k=>({before:t('Před směnou','Pred zmenou'),during:t('Během směny','Počas zmeny'),after:t('Po směně','Po zmene')})[k];
const timeNow=()=>new Intl.DateTimeFormat(language==='sk'?'sk-SK':'cs-CZ',{hour:'2-digit',minute:'2-digit'}).format(new Date());
const dateLabel=d=>new Intl.DateTimeFormat(language==='sk'?'sk-SK':'cs-CZ',{day:'numeric',month:'long'}).format(new Date(d+'T12:00:00'));
const relativeDate=d=>d===dayStamp()?t('Dnes'):dateLabel(d);
const skillSet=p=>cat().competencies.filter(c=>CATALOG.cs.competencies.find(k=>k.code===c.code).branch!==(p.track==='cook'?'Číšník':'Kuchař'));
const options=(p,s)=>CHOICES[s.code===DEFAULT_CODE[p.track]?p.track:'general'];
const maxLevel=(record,code)=>record.history.reduce((n,e)=>e.code===code?Math.max(n,e.level):n,0);
const earned=record=>new Set(record.history.map(a=>a.code)).size;

function data(p=person()){
 try{if(hasStorage){const raw=localStorage.getItem(scopedKey(p.id));if(raw){const a=JSON.parse(raw);if(a.version!==1||!a.shift||!Array.isArray(a.history))throw Error('invalid');return a;}}}catch(error){if(error.message==='invalid')throw error}
 if(!sessionCache.has(p.id)){
  const initial=seed(p);sessionCache.set(p.id,initial);
  if(hasStorage){try{localStorage.setItem(scopedKey(p.id),JSON.stringify(initial))}catch{hasStorage=false}}
 }
 return JSON.parse(JSON.stringify(sessionCache.get(p.id)));
}
function mutate(fn,p=person()){
 const model=data(p);fn(model);model.revision++;if(hasStorage)localStorage.setItem(scopedKey(p.id),JSON.stringify(model));
 sessionCache.set(p.id,model);return model;
}
function setPref(k,value){try{localStorage.setItem(scopedKey(k),value)}catch{}}
function tell(message){outlet.textContent=message;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>outlet.textContent='',5500)}
function go(page){if(busy||audioSession){tell(t('Nejdřív dokončete záznam.','Najskôr dokončite záznam.'));return}window.speechSynthesis?.cancel();if((/^#(?:dovednost|budoucnost|stul|ukazka)-/.test(window.location?.hash))||page!=='exercise'&&['#slovnik','#mistr','#planovac','#karierni-mapa','#denik','#vydej','#obsluha','#po-smene','#moje-portfolio','#listek-kuchyne','#listek-obsluha'].includes(window.location?.hash))window.history.replaceState(null,'',window.location.pathname+window.location.search);if(page==='guide')window.history.replaceState(null,'','#slovnik');if(page==='planner')window.history.replaceState(null,'','#planovac');if(page==='career')window.history.replaceState(null,'','#karierni-mapa');view=page;quizError=false;render(true)}
function scenes(p){const folder=p.full&&p.id!=='ema'?'assets/':'photos/';const n=p.full?6:3;return Array.from({length:n},(_,i)=>folder+p.photo+'-'+i+'.webp')}
function picture(p,phase){const images=scenes(p);const idx=p.full?[0,1,2,3,4,5,3,5][phase]:[0,0,1,1,2,2,1,2][phase];return images[idx]}
function face(p){return scenes(p)[0]}
const photo=(path,alt,cls='')=>'<img class="'+cls+'" src="'+html(path)+'" alt="'+html(alt)+'" decoding="async">';
const action=(name,label,value='',cls='button',attrs='')=>'<button type="button" class="'+cls+'" data-do="'+name+'" data-value="'+html(value)+'" '+attrs+'>'+html(label)+'</button>';
const goBtn=(v,label,cls='button')=>action('go',label,v,cls);
const pill=(label,cls='')=>'<span class="pill '+cls+'">'+html(label)+'</span>';
const careerLabel=()=>t('Kariérní mapa','Kariérna mapa');
function careerPage(){return '<section class="career-poster" id="karierni-mapa"><h2>'+t('Kam mě může dovést praxe?', 'Kam ma môže priviesť prax?')+'</h2><a href="photos/karierni-mapa.webp"><img src="photos/karierni-mapa.webp" width="1086" height="1448" alt="'+t('Od úkolu na směně přes potvrzení pedagogem a vlastní portfolio až k vedení kuchyně nebo restaurace.', 'Od úlohy na zmene cez potvrdenie pedagógom a vlastné portfólio až k vedeniu kuchyne alebo reštaurácie.')+'"></a></section>'}
const labelsNav=()=>({guide:t('Slovník'),planner:t('Plánovač'),career:careerLabel(),day:t('Směna','Zmena'),path:t('Moje cesta','Moja cesta'),journal:t('Deník','Denník'),portfolio:t('Portfolio','Portfólio'),group:t('Moje skupina','Moja skupina'),overview:t('Přehled výcviku','Prehľad výcviku'),admin:t('Správa ukázky','Správa ukážky')});
const primary=(label,act,val='')=>action(act,label,val,'button primary arrow');
const title=(tag,name,desc='')=>'<div class="page-title"><span class="ey">'+html(tag)+'</span><h1>'+html(name)+'</h1>'+(desc?'<p>'+html(desc)+'</p>':'')+'</div>';
function courseTitle(p,s){if(s.code!==DEFAULT_CODE[p.track])return competency(s.code).name;return p.track==='cook'?t('Dvě porce pečené mrkve','Dve porcie pečenej mrkvy'):t('Oběd pro dva hosty','Obed pre dvoch hostí');}
function station(p){return p.track==='cook'?t('Cvičná kuchyně','Cvičná kuchyňa'):t('Cvičná restaurace','Cvičná reštaurácia')}
function photoCaption(p,n){if(!p.full){return n<=1?t('Před směnou','Pred zmenou'):[4,5,7].includes(n)?t('Reflexe po práci','Reflexia po práci'):t('Práce na stanovišti','Práca na stanovišti')}return [t('Cestou na praxi','Cestou na prax'),t('Příprava pracoviště','Príprava pracoviska'),t('Ukázka s pedagogem','Ukážka s pedagógom'),t('Práce na stanovišti','Práca na stanovišti'),t('Po skončení výcviku','Po skončení výcviku'),t('Reflexe po směně','Reflexia po zmene'),t('Praktický nácvik','Praktický nácvik'),t('Návrat k zápisu','Návrat k zápisu')][n]}
function heroText(p,s){
 const c=competency(s.code),standard=c.levels[s.level-1];
 const isDefault=s.code===DEFAULT_CODE[p.track],cook=p.track==='cook';
 if(s.phase===0)return [courseTitle(p,s),isDefault?(cook?t('Na výdeji dnes připravíte dvě porce podle vzoru. Cestou se podívejte, podle čeho je porovnáte.','Na výdaji dnes pripravíte dve porcie podľa vzoru. Cestou sa pozrite, podľa čoho ich porovnáte.'):t('Připravíte stůl pro dva a podáte vodu. Cestou si vyberte detail, který si dnes chcete pohlídat.','Pripravíte stôl pre dvoch a podáte vodu. Cestou si vyberte detail, ktorý si dnes chcete postrážiť.')):c.tasks[s.level-1],t('Otevřít ranní přípravu','Otvoriť rannú prípravu')];
 if(s.phase===1)return [t('Připravte si stanoviště','Pripravte si stanovište'),t('Po příchodu se převlékněte, ohlaste se pedagogovi a ověřte si dnešní zadání.','Po príchode sa prezlečte, ohláste sa pedagógovi a overte si dnešné zadanie.'),t('Jsem na pracovišti','Som na pracovisku')];
 if(s.phase===2)return [t('Podívejte se na ukázku','Pozrite si ukážku'),standard,t('Ukázka a instruktáž proběhly','Ukážka a inštruktáž prebehli')];
 if(s.phase===3)return [courseTitle(p,s),c.tasks[s.level-1],t('Práce je hotová','Práca je hotová')];
 if(s.phase===4)return [t('Co si ze směny odnášíte?','Čo si zo zmeny odnášate?'),t('Vyberte, co se při práci povedlo nebo změnilo. Jeden postřeh a jeden krok na příště stačí.','Vyberte, čo sa pri práci podarilo alebo zmenilo. Stačí jeden postreh a jeden krok nabudúce.'),t('Zapsat reflexi','Zapísať reflexiu')];
 if(s.phase===5)return [t('Zápis má pedagog','Zápis má pedagóg'),t('Výsledek hodnocení najdete tady. Mezitím si v deníku můžete projít své poznámky.','Výsledok hodnotenia nájdete tu. Zatiaľ si v denníku môžete prejsť svoje poznámky.'),t('Otevřít deník','Otvoriť denník')];
 if(s.phase===7)return [t('Doplňte jeden detail','Doplňte jeden detail'),loc(s.feedback)||t('Pedagog vám nahrál zpětnou vazbu. Pusťte si ji při doplnění zápisu.','Pedagóg vám nahral spätnú väzbu. Vypočujte si ju pri doplnení zápisu.'),t('Doplnit reflexi','Doplniť reflexiu')];
 return [t('Výkon je v portfoliu','Výkon je v portfóliu'),c.name+' · '+t('potvrzená úroveň ','potvrdená úroveň ')+s.level,t('Otevřít portfolio','Otvoriť portfólio')];
}
function sectionHead(h,sub=''){return '<div class="section-head"><h2>'+html(h)+'</h2>'+(sub?'<small>'+html(sub)+'</small>':'')+'</div>'}
function nav(){
 const items=role==='student'?['path','day','planner','journal','portfolio','career','guide']:role==='teacher'?['group']:role==='leader'?['overview']:['admin'];
 const active=['prepare','reflect','tip','during','exercise','summary'].includes(view)?'day':view==='employer'?'portfolio':['menu-study','future','table'].includes(view)?'path':view==='inspect'?'group':view;
 return '<header class="bar"><div class="shell bar-inner">'+'<button type="button" class="wordmark" data-do="home"><span>MISTR SVĚTA<span aria-hidden="true">.</span></span><small>'+t('Průvodce odborným výcvikem','Sprievodca odborným výcvikom')+'</small></button>'+'<nav aria-label="'+t('Hlavní navigace','Hlavná navigácia')+'">'+items.map(k=>k==='career'?'<a class="nav-link career-link" href="#karierni-mapa" data-do="go" data-value="career" '+(active===k?'aria-current="page"':'')+'>'+careerLabel()+'</a>':action('go',labelsNav()[k],k,'nav-link',active===k?'aria-current="page"':'')).join('')+ '</nav><div class="bar-tools">'+action('journal-search',t('Hledat','Hľadať'),'','text-link')+action('lang',language==='cs'?'SK':'CZ','','language','aria-label="'+t('Přepnout do slovenštiny','Prepnúť do češtiny')+'"')+(role==='student'?action('tone','Gen Z','','tone-btn','aria-pressed="'+studentStyle+'"'):'')+'<button class="profile-btn" data-do="accounts" aria-haspopup="dialog">'+(role==='student'?photo(face(person()),'','avatar'):'')+'<span>'+html(role==='student'?person().name:roleLabel(role))+'</span><b aria-hidden="true">⌄</b></button>'+(role==='student'?'<a class="career-thumb" href="#karierni-mapa" data-do="go" data-value="career" aria-label="'+careerLabel()+'" title="'+careerLabel()+'"><img src="photos/karierni-mapa.webp" alt="" width="34" height="44"></a>':'')+'</div></div></header>';
}
function footer(){return '<footer class="shell footer"><span>'+t('Fiktivní skupina · údaje v tomto prohlížeči','Fiktívna skupina · údaje v tomto prehliadači')+'</span><div>'+action('accounts',t('Přepnout roli','Prepnúť rolu'),'','text-link')+' · '+action('about',t('O aplikaci a zdrojích','O aplikácii a zdrojoch'),'','text-link')+'</div></footer>'}
function guide(p,s){
 const c=competency(s.code);
 if(s.code!==DEFAULT_CODE[p.track])return [c.tasks[s.level-1],c.levels[s.level-1],c.checks.join(' · ')];
 return p.track==='cook'?[t('Položte dva talíře vedle sebe.','Položte dva taniere vedľa seba.'),t('Zkontrolujte polohu mrkve vůči pyré. Mají obě porce podobnou velikost?','Skontrolujte polohu mrkvy voči pyré. Majú obe porcie podobnú veľkosť?'),t('Před předáním pohledem obejděte celý okraj talíře.','Pred odovzdaním pohľadom skontrolujte celý okraj taniera.')]:
 [t('Podívejte se na stůl z místa hosta.','Pozrite sa na stôl z miesta hosťa.'),t('Porovnejte obě místa. Kam se host posadí a odkud mu pohodlně podáte vodu?','Porovnajte obe miesta. Kam si hosť sadne a odkiaľ mu pohodlne podáte vodu?'),t('Před příchodem hostů si cestu ke stolu projděte s pedagogem.','Pred príchodom hostí si cestu k stolu prejdite s pedagógom.')];
}
function trail(p,s){
 const cards=[
 [p.track==='cook'?'photos/plate.webp':'photos/table.webp',t('Pracovní vzor','Pracovný vzor'),p.track==='cook'?t('Jak poznat vyváženou porci','Ako spoznať vyváženú porciu'):t('Stůl z pohledu hosta','Stôl z pohľadu hosťa'),'tip','result'],
 [p.track==='cook'?'photos/chef-mentor.webp':'photos/service-mentor.webp',t('Od mistra','Od majstra'),p.track==='cook'?t('Co si na výdeji hlídá šéfkuchařka','Čo si na výdaji všíma šéfkuchárka'):t('Jak dát hostovi prostor','Ako dať hosťovi priestor'),'tip','mentor'],
 [scenes(p).at(-1),t('Vlastní záznam','Vlastný záznam'),t('Co si chci zapamatovat','Čo si chcem zapamätať'),'go','journal']];
 if(s.code===DEFAULT_CODE[p.track])cards[0]=[p.track==='cook'?'photos/ema-3.webp':'assets/service-3.webp',t('Nácvik · 1 min','Nácvik · 1 min'),p.track==='cook'?t('Rozhodnutí na výdeji','Rozhodnutie na výdaji'):t('Co říct hostovi u stolu','Čo povedať hosťovi pri stole'),'exercise',''];
 if(s.code!==DEFAULT_CODE[p.track])cards[0]=[picture(p,3),t('Dnešní kritéria','Dnešné kritériá'),competency(s.code).name,'detail',s.code];
 return '<div class="library-cards">'+cards.map(([img,tag,name,act,val])=>'<button class="photo-card" data-do="'+act+'" data-value="'+html(val)+'">'+photo(img,'')+'<span>'+html(tag)+'</span><strong>'+html(name)+' <i>↗</i></strong></button>').join('')+'</div>';
}
function photoWay(p,s){
 const photos=scenes(p),all=p.full;
 const indices=all?[0,1,2,3,4,5]:[0,3,5];
 const d=guide(p,s);
 const steps=[
 t('Ještě cestou si vyberte detail, na který se chcete soustředit.','Ešte cestou si vyberte detail, na ktorý sa chcete sústrediť.'),
 t('Na místě si ověřte zadání a přípravu pracoviště podle pravidel provozu.','Na mieste si overte zadanie a prípravu pracoviska podľa pravidiel prevádzky.'),
 d[1],competency(s.code).tasks[s.level-1],
 t('Předejte pracoviště podle pokynů pedagoga. Potom si dejte prostor na krátkou reflexi.','Odovzdajte pracovisko podľa pokynov pedagóga. Potom si nechajte priestor na krátku reflexiu.'),
 t('Stačí zachytit jeden moment a co příště vyzkoušíte.','Stačí zachytiť jeden moment a čo vyskúšate nabudúce.')];
 return '<details class="day-sequence"><summary>'+t('Projít den ve fotografiích','Prejsť deň vo fotografiách')+'</summary><div class="scene-gallery">'+indices.map((i,j)=>'<figure>'+photo(photos[j],p.name+' · '+photoCaption(p,i))+'<figcaption><b>'+html(photoCaption(p,i))+'</b><p>'+html(steps[i])+'</p></figcaption></figure>').join('')+'</div></details>';
}
function dayPage(){return todayTutor()}
function back(page='day'){return goBtn(page,'← '+(labelsNav()[page]||t('Zpět','Späť')),'back')}
function tipPage(){
 const p=person(),s=data().shift,mentor=hintStage==='mentor',defaultTask=s.code===DEFAULT_CODE[p.track];
 const cook=p.track==='cook', skill=competency(s.code);
 const img=defaultTask?(mentor?(cook?'photos/chef-mentor.webp':'photos/service-mentor.webp'):(cook?'photos/plate.webp':'photos/table.webp')):picture(p,3);
 const headline=defaultTask?(cook?t('Připravte dvě stejné porce','Pripravte dve rovnaké porcie'):t('Připravte stůl pro dva hosty','Pripravte stôl pre dvoch hostí')):menuSkillName(skill);
 const steps=defaultTask?(cook?[
 t('Položte svůj talíř vedle vzorové porce od pedagoga.','Položte svoj tanier vedľa vzorovej porcie od pedagóga.'),
 t('Porovnejte množství mrkve a pyré. Doplňte nebo uberte tam, kde se vaše porce liší od vzoru.','Porovnajte množstvo mrkvy a pyré. Doplňte alebo uberte tam, kde sa vaša porcia líši od vzoru.'),
 t('Zkontrolujte, že je okraj čistý. Ukažte oba talíře pedagogovi a řekněte, co jste upravili.','Skontrolujte, že okraj je čistý. Ukážte oba taniere pedagógovi a povedzte, čo ste upravili.')
 ]:[
 t('Připravte dvě místa podle prostření, které vám ukázal pedagog.','Pripravte dve miesta podľa prestretia, ktoré vám ukázal pedagóg.'),
 t('Postavte se ke každé židli. Zkontrolujte, že host pohodlně dosáhne na sklenici a má příbor k objednanému jídlu.','Postavte sa ku každej stoličke. Skontrolujte, že hosť pohodlne dosiahne na pohár a má príbor k objednanému jedlu.'),
 t('Po příchodu oba hosty přivítejte, nechte je usednout a nabídněte vodu.','Po príchode oboch hostí privítajte, nechajte ich sadnúť si a ponúknite vodu.')
 ]):[skill.tasks[s.level-1],skill.levels[s.level-1],skill.evidence];
 const labels=defaultTask?[t('Začněte tady','Začnite tu'),t('Co zkontrolovat','Čo skontrolovať'),t('Jak práci dokončit','Ako prácu dokončiť')]:[t('Praktický úkol','Praktická úloha'),t('Podle čeho poznáte výsledek','Podľa čoho spoznáte výsledok'),t('Čím práci doložíte','Čím prácu doložíte')];
 const badge='<i class="ms-patch" aria-hidden="true">MS</i>';
 const outcome=defaultTask?(cook?t('Dva hosté si objednali stejné jídlo. Oba mají dostat stejně velkou a stejně upravenou porci.','Dvaja hostia si objednali rovnaké jedlo. Obaja majú dostať rovnako veľkú a rovnako upravenú porciu.'):t('Hosté se mohou usadit a začít jíst, aniž by museli žádat o chybějící příbor nebo sklenici.','Hostia sa môžu usadiť a začať jesť bez toho, aby museli žiadať o chýbajúci príbor alebo pohár.')):skill.goal;
 return '<div class="master-guide">'+back()+'<header><span>'+html(p.name)+' · '+html(profession(p))+' · '+t('Ukázka na pracovišti','Ukážka na pracovisku')+'</span><h1>'+html(headline)+'</h1><p>'+html(outcome)+'</p></header><div class="master-grid"><figure class="uniform '+(cook?'kitchen':'service')+'">'+photo(img,headline)+(mentor&&defaultTask?badge+badge:'')+'</figure><ol>'+steps.map((step,i)=>'<li><b>'+labels[i]+'</b><p>'+html(step)+'</p></li>').join('')+'</ol></div><footer><details><summary>'+t('Jaká dovednost se mi zapíše?','Aká zručnosť sa mi zapíše?')+'</summary><b>'+html(menuSkillName(skill))+'</b><p>'+t('Pedagog sleduje','Pedagóg sleduje')+' · '+skill.checks.map(html).join(' · ')+'. '+t('Po předvedení práce může potvrdit úroveň ','Po predvedení práce môže potvrdiť úroveň ')+s.level+'/3.</p></details>'+goBtn('day',t('Pokračovat na dnešní směně','Pokračovať na dnešnej zmene')+' →','button primary')+'</footer></div>';

}
function mediaMarkup(n){
 const img=n?.photo||'',voice=n?.audio||'';
 return (/^data:image\/(jpeg|png|webp);base64,/.test(img)?photo(img,t('Vlastní fotografie práce','Vlastná fotografia práce'),'evidence-img'):'')+
 (/^data:audio\/[a-z0-9+;=.,-]+;base64,/i.test(voice)?'<audio controls preload="metadata" src="'+html(voice)+'"></audio>':'');
}
function choices(p,s,k,value,field){
 return '<div class="choices" role="group" aria-label="'+html(field==='next'?t('Další krok','Ďalší krok'):period(k))+'">'+options(p,s)[k].map((x,i)=>action('choice',loc(x),field+'|'+i,'choice','aria-pressed="'+(value===i)+'"')).join('')+'</div>';
}
function recordingControl(k,n){
 const on=audioSession?.key===k;
 return '<div class="media-buttons">'+action(on?'stop':'record',on?t('Zastavit a uložit','Zastaviť a uložiť'):t('Nahrát hlas (30 s)','Nahrať hlas (30 s)'),k,'button small')+(n.audio?action('clear-audio',t('Odebrat nahrávku','Odobrať nahrávku'),k,'text-link'):'')+'</div>';
}
function noteForm(k){
 const p=person(),s=data().shift,n=s.notes[k],isAfter=k==='after',cook=p.track==='cook';
 const current=k==='before'?t('Na co se dnes zaměříte?','Na čo sa dnes zameriate?'):k==='during'?t('Co právě potřebujete nebo měníte?','Čo práve potrebujete alebo meníte?'):t('Co jste u své práce zaznamenali?','Čo ste pri svojej práci zaznamenali?');
 const quiz=cook?[t('Na cestě na výdej je mokrá podlaha. Co uděláte?','Na ceste na výdaj je mokrá podlaha. Čo urobíte?'),t('Zastavím se a upozorním pedagoga.','Zastavím sa a upozorním pedagóga.'),t('Projdu s talíři co nejrychleji.','Prejdem s taniermi čo najrýchlejšie.')]:[t('Na sklenici je odštípnutý okraj. Jak postupujete?','Na pohári je odštiepený okraj. Ako postupujete?'),t('Otočím sklenici druhou stranou.','Otočím pohár druhou stranou.'),t('Vyřadím ji a upozorním pedagoga.','Vyradím ho a upozorním pedagóga.')];
 const ready=hasNote(n)&&(!isAfter||n.next!==null)&&(k!=='before'||s.quiz);
 const figure=photo(picture(p,k==='before'?0:k==='during'?3:5),p.name+' · '+period(k),'note-pic');
 const previous=isAfter&&hasNote(s.notes.before)?'<div class="focus-recall"><b>'+t('Váš ranní cíl','Váš ranný cieľ')+'</b><p>'+html([s.notes.before.choice!==null?loc(options(p,s).before[s.notes.before.choice]):'',loc(s.notes.before.text)].filter(Boolean).join(' · '))+'</p>'+mediaMarkup({audio:s.notes.before.audio})+'</div>':'';
 return back()+title(period(k),current)+'<div class="note-layout"><div class="formbody">'+previous+(s.hint&&k==='before'?'<p class="callout"><b>'+roleLabel('teacher')+'</b> '+html(s.hint)+'</p>':'')+(s.phase===7&&isAfter?'<p class="callout"><b>'+t('Komentář pedagoga','Komentár pedagóga')+'</b> '+html(loc(s.feedback))+mediaMarkup({audio:s.reviews.at(-1)?.audio})+'</p>':'')+
 '<div class="field"><h2>'+t('Stačí jedna volba nebo vlastní postřeh','Stačí jedna voľba alebo vlastný postreh')+'</h2>'+choices(p,s,k,n.choice,'choice')+'<label>'+t('Vlastní slova','Vlastnými slovami')+'<textarea data-note="'+k+'" maxlength="1000" placeholder="'+t('Jedna věta stačí…','Stačí jedna veta…')+'">'+html(loc(n.text))+'</textarea></label>'+recordingControl(k,n)+mediaMarkup(n)+'</div>'+
 (isAfter?'<div class="field"><h2>'+t('Co zkusíte příště?','Čo skúsite nabudúce?')+'</h2>'+choices(p,s,'next',n.next,'next')+'<label class="file-pick">'+t('Připojit fotku vlastní práce','Pripojiť fotku vlastnej práce')+'<input type="file" data-photo accept="image/jpeg,image/png,image/webp"></label>'+(n.photo?action('clear-photo',t('Odebrat fotku','Odobrať fotku'),'','text-link'):'')+'</div>':'')+
 (k==='before'?'<div class="field"><span class="ey">BOZP</span><h2>'+quiz[0]+'</h2><div class="choices">'+quiz.slice(1).map((label,i)=>action('quiz',label,String(i),'choice','aria-pressed="'+(s.quiz&&i===(cook?0:1))+'"')).join('')+'</div>'+(s.quiz?'<p class="success">'+t('Správně. Pokyny k vašemu stanovišti ještě projdete s pedagogem.','Správne. Pokyny k pracovisku ešte prejdete s pedagógom.')+'</p>':quizError?'<p class="warning">'+t('Zkuste jinou možnost. Nebezpečí nejdřív ohlaste.','Skúste inú možnosť. Nebezpečenstvo najskôr nahláste.')+'</p>':'')+'</div>':'')+
 '<div class="actions">'+action('save-note',k==='before'?t('Dokončit přípravu','Dokončiť prípravu'):isAfter?t('Předat pedagogovi','Odovzdať pedagógovi'):t('Uložit postřeh','Uložiť postreh'),k,'button primary arrow','data-save '+(ready?'':'disabled'))+'</div></div><aside class="form-aside">'+figure+'<h2>'+html(courseTitle(p,s))+'</h2><p>'+html(competency(s.code).levels[s.level-1])+'</p>'+(k==='before'?action('listen',t('Poslechnout zadání','Vypočuť si zadanie'),'','text-link'):'')+'</aside></div>';
}
function hasNote(n){return n.choice!==null||!!loc(n.text).trim()||!!n.audio}
function noteRead(p,s,k){
 const n=s.notes[k];
 if(!n||!hasNote(n))return '';
 const opts=options(p,s);
 const text=[n.choice!==null?loc(opts[k][n.choice]):'',loc(n.text)].filter(Boolean);
 return '<div class="entry"><div class="entry-label">'+period(k)+(n.time?' · '+html(n.time):'')+'</div>'+text.map(a=>'<p>'+html(a)+'</p>').join('')+mediaMarkup(n)+(k==='during'&&s.helpSeen?'<small>'+t('Ukázka s pedagogem proběhla','Ukážka s pedagógom prebehla')+' · '+html(s.helpSeen)+'</small>':'')+(k==='after'&&n.next!==null?'<small>'+t('Příště','Nabudúce')+' · '+html(loc(opts.next[n.next]))+'</small>':'')+'</div>';
}
function feedbackText(r){return loc(r.comment||r.feedback||'')}
function notesFor(p,s){return ['before','during','after'].map(k=>noteRead(p,s,k)).join('')||'<p>'+t('První postřeh přibude po ranní přípravě.','Prvý postreh pribudne po rannej príprave.')+'</p>'}
function collectJournal(p,m){
 const days=new Map(),seen=new Set();
 function add(day,label,body){
  if(!days.has(day))days.set(day,[]);
  days.get(day).push({label,body});
 }
 planJournal(m,p,add);
 for(const s of [m.shift,...m.finished,...m.history]){
  if(seen.has(s.id))continue;
  seen.add(s.id);
  const current=s===m.shift;
  const notes=['before','during','after'].map(k=>noteRead(p,s,k)).join('');
  if(current&&!notes&&!s.reviews?.length&&s.phase===0)continue;
  const feedback=reviewHistory(s)||(feedbackText(s)?'<p><b>'+t('Pedagog','Pedagóg')+'</b> · '+html(feedbackText(s))+'</p>':'');
  const controls=current&&[3,4,7].includes(s.phase)?goBtn(s.phase===3?'during':'reflect',t('Doplnit zápis','Doplniť zápis')):'';
  add(s.day,courseTitle(p,s),notes+feedback+controls||'<p>'+html(stageLabels()[s.phase]||'')+'</p>');
 }
 for(const [code,records] of Object.entries(m.menuStudy||{})){
  for(const r of records)add(r.day,competency(code).name,menuStudyRecord({menuStudy:{[code]:[r]}},code));
 }
 for(const [n,item] of Object.entries(m.tableNotes||{})){
  const story=tableCase(n,p),label=tableWord(Number(n))+' · '+story.title;
  for(const r of [...(item.earlier||[]),item]){
   add(r.day,label,(r.parts?.length?'<ul>'+tableMessage(story,r.parts)+'</ul>':'')+(r.answer?'<p>'+html(r.answer)+'</p>':''));
   if(Number.isInteger(r.field))add(r.fieldDay||r.day,t('Reflexe','Reflexia')+' · '+label,'<p>'+html(tableReflections()[r.field])+'</p>');
  }
 }
 for(const [day,r] of Object.entries(m.dailyReflections||{})){
  add(day,t('Reflexe a sebereflexe','Reflexia a sebareflexia'),reflectionBody(r));
 }
 return days;
}
function journalPage(){
 const p=person(),m=data(),days=collectJournal(p,m);
 const fmt=new Intl.DateTimeFormat(language==='sk'?'sk-SK':'cs-CZ',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
 const cards=[...days.keys()].sort().reverse().map(day=>{
  const entries=days.get(day);
  return '<details class="journal-day"><summary><span><strong>'+html(fmt.format(new Date(day+'T12:00:00')))+'</strong><span>'+entries.map(e=>html(e.label)).join(' · ')+'</span></span></summary>'+entries.map(e=>'<article><h3>'+html(e.label)+'</h3>'+e.body+'</article>').join('')+action('day-reflect',t('Moje reflexe a sebereflexe','Moja reflexia a sebareflexia'),day,'button')+'</details>';
 }).join('');
 const embedded=window.self!==window.top;
 const previewUrl='?nahled=telefon#denik-'+encodeURIComponent(p.id);
 const preview=embedded?'':'<details class="phone-preview" '+(new URLSearchParams(location.search).has('mobil')?'open':'')+'><summary>'+t('Zobrazit deník na mobilu','Zobraziť denník na mobile')+'</summary><iframe loading="lazy" title="'+t('Mobilní náhled deníku','Mobilný náhľad denníka')+'" src="'+previewUrl+'"></iframe></details>';
 return title(p.name,t('Můj deník praxe','Môj denník praxe'),t('Vyberte den a otevřete si zápisy z praxe.','Vyberte deň a otvorte si zápisy z praxe.'))+
 preview+'<section class="journal-days"><h2>'+t('Uložené dny','Uložené dni')+' ('+days.size+')</h2>'+ (cards||'<p>'+t('Zatím tu žádný den není. První zápis přibude po ranní přípravě.','Zatiaľ tu žiadny deň nie je. Prvý zápis pribudne po rannej príprave.')+'</p>')+'</section>'+
 '<details class="journal-days"><summary>'+t('Plánované dny v kalendáři','Plánované dni v kalendári')+'</summary>'+Object.entries(yearPlan(m,p,planYear)).sort(([a],[b])=>a.localeCompare(b)).map(([d,e])=>action('plan-day',dateLabel(d)+' · '+planName(e.type),d,'button')).join(' ')+'</details>'+(m.shift.phase===0?'<section><h2>'+t('Naplánovaná směna','Naplánovaná zmena')+'</h2><p>'+html(dateLabel(m.shift.day)+' · '+courseTitle(p,m.shift))+'</p>'+goBtn('prepare',t('Otevřít ranní přípravu','Otvoriť rannú prípravu'),'button primary')+'</section>':'')+tableJournal(p,m);
}
function pastJournal(p,m){
 const seen=new Set([m.shift.id]);
 const arr=[...m.finished.slice().reverse(),...m.history.slice().reverse()].filter(a=>{if(seen.has(a.id))return false;seen.add(a.id);return true});
 return arr.length?sectionHead(t('Předchozí směny','Predchádzajúce zmeny'))+arr.map(s=>'<details><summary>'+html(dateLabel(s.day)+' · '+competency(s.code).name)+'</summary>'+notesFor(p,s)+(s.reviews?reviewHistory(s):'<p>'+html(feedbackText(s))+'</p>')+'</details>').join(''):'';
}
function reviewHistory(s){return (s.reviews||[]).map(r=>'<div class="entry review"><b>'+t('Pedagog','Pedagóg')+' · '+html(r.result==='approved'?t('potvrzeno','potvrdené'):t('k doplnění','na doplnenie'))+'</b><p>'+html(feedbackText(r))+'</p>'+mediaMarkup({audio:r.audio})+'</div>').join('')}
function portfolio(){
 const p=person(),m=data();
 return '<div class="my-portfolio"><header class="evidence-title"><span class="passport-kicker">' + t('Moje portfolio','Moje portfólio') +
   '</span><h1>' + html(p.name) + '</h1><p>' + html(profession(p)) + ' · ' + p.year + '. ' + t('ročník') +
   '</p></header>' + marketValue(p,m) + '<h2 class="evidence-heading">' + t('Moje potvrzené práce','Moje potvrdené práce') + '</h2>'+(m.shift.phase>=4&&m.shift.phase!==6?'<div class="practice-record no-print"><span class="ey">'+html(progressState(m.shift))+'</span><p>'+html(courseTitle(p,m.shift))+'</p>'+goBtn('summary',t('Moje rozpracovaná směna','Moja rozpracovaná zmena'),'text-link')+'</div>':'')+'<div class="actions no-print">'+goBtn('employer',t('Pro zaměstnavatele','Pre zamestnávateľa'),'button primary')+action('print',t('Tisk / uložit PDF','Tlač / uložiť PDF'),'','button primary')+action('export',t('Stáhnout záznamy','Stiahnuť záznamy'))+'</div><div class="portfolio-list">'+m.history.slice().reverse().map(a=>{
 const c=competency(a.code);return '<article class="portfolio-entry" data-code="'+html(a.code)+'" tabindex="-1"><div class="ey">'+html(dateLabel(a.day))+' · '+t('Úroveň ')+a.level+'</div><h2>'+html(c.name)+'</h2><p>'+html(c.levels[a.level-1])+'</p><p class="teacher-note">'+html(feedbackText(a))+'</p><small>'+html(a.author)+' · '+t('osobně potvrzeno','osobne potvrdené')+'</small>'+mediaMarkup(a.notes?.after)+mediaMarkup({audio:a.audio})+(a.examplePhoto?'<figure class="sample-evidence">'+photo(a.examplePhoto,t('Modelový doklad práce fiktivního žáka','Modelový doklad práce fiktívneho žiaka'))+'<figcaption>'+t('Modelový doklad práce · ilustrační fotografie','Modelový doklad práce · ilustračná fotografia')+'</figcaption></figure>':'')+'<details><summary>'+t('Kritéria a žákovská reflexe','Kritériá a žiacka reflexia')+'</summary><ul>'+c.checks.map(x=>'<li>'+html(x)+'</li>').join('')+'</ul>'+noteRead(p,a,'after')+'</details></article>';
 }).join('')+'</div>'+portfolioMap(p,m)+'</div>';
}
function asksForHelp(s){return s.phase===3&&s.notes.during.choice===2&&!s.helpSeen}
const bookMark='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 6Q7 3 2 5v14q5-2 10 1 5-3 10-1V5q-5-2-10 1v14"/></svg>';
function showDayBook(d){
 guard(role==='student');const p=person(),m=data(),entries=collectJournal(p,m).get(d)||[];
 newModal(()=>'<h2 id="dialogtitle">'+t('Deník','Denník')+' · '+html(dateLabel(d))+'</h2>'+
 (entries.length?entries.map(e=>'<article><h3>'+html(e.label)+'</h3>'+e.body+'</article>').join(''):'<p>'+t('Tato praxe je naplánovaná. Vyberte, čemu jste se věnovali.','Táto prax je naplánovaná. Vyberte, čomu ste sa venovali.')+'</p>')+
 action('book-edit',t('Vybrat činnosti','Vybrať činnosti'),d,'button primary')+action('day-reflect',t('Moje reflexe','Moja reflexia'),d,'button')+'<button class="button" data-plan-close>'+t('Zavřít','Zavrieť')+'</button>');
}
function group(){
 const states=[['all',t('Celá skupina','Celá skupina')],['waiting',t('K posouzení','Na posúdenie')],['help',t('Prosí o ukázku','Prosí o ukážku')],['back',t('K doplnění','Na doplnenie')],['done',t('Potvrzeno','Potvrdené')]];
 const pupils=PEOPLE.map(p=>{const s=data(p).shift;return {p,s,state:s.phase===5?'waiting':asksForHelp(s)?'help':s.phase===7?'back':s.phase===6?'done':'active'}});
 const entries=pupils.filter(x=>rosterFilter==='all'||x.state===rosterFilter).sort((a,b)=>['waiting','help','back','active','done'].indexOf(a.state)-['waiting','help','back','active','done'].indexOf(b.state));
 return title(classroomSettings.title,t('Moje skupina','Moja skupina'),t('Vyberte stav, nebo otevřete deník přímo u jména žáka.','Vyberte stav alebo otvorte denník priamo pri mene žiaka.'))+
 '<div class="master-filters">'+states.map(([id,label])=>action('filter',label+' · '+pupils.filter(x=>id==='all'||x.state===id).length,id,'master-filter '+id,'aria-pressed="'+(rosterFilter===id)+'"')).join('')+'</div><div class="master-roster">'+entries.map(({p,s,state})=>'<article data-state="'+state+'">'+photo(face(p),'','portrait')+'<div><b>'+html(p.name)+'</b><small>'+html(profession(p)+' · '+courseTitle(p,s))+'</small><strong>'+html(states.find(x=>x[0]===state)?.[1]||shortStages()[s.phase])+'</strong></div><footer>'+action('master-journal',t('Deník','Denník'),p.id,'button')+(state==='waiting'?action('master-review',t('Posoudit výkon','Posúdiť výkon'),p.id,'button primary'):action('inspect',t('Otevřít směnu','Otvoriť zmenu'),p.id,'button'))+'</footer></article>').join('')+(!entries.length?'<p>'+t('V této skupině teď nikdo není.','V tejto skupine teraz nikto nie je.')+'</p>':'')+'</div>';
}
function inspect(){
 const p=person(),m=data(),s=m.shift,c=competency(s.code),pictures=scenes(p);
 const journal='<details id="master-journal" '+(s.phase===5?'open':'')+'><summary>'+t('Deník a sebereflexe','Denník a sebareflexia')+'</summary>'+notesFor(p,s)+tableJournal(p,m,true)+pastJournal(p,m)+teacherPlanNotes(m,p)+menuStudyJournal(m)+'</details>';
 return back('group')+title(profession(p)+' · '+p.year+'. '+t('ročník'),p.name)+'<div class="inspect-grid"><div class="inspect-main"><span class="ey">'+html(stageLabels()[s.phase])+'</span><h2>'+html(courseTitle(p,s))+'</h2><p>'+html(c.name)+' · '+t('úroveň ')+s.level+'</p><p>'+html(c.levels[s.level-1])+'</p>'+(asksForHelp(s)?'<div class="callout"><b>'+t('Žádost o další ukázku','Žiadosť o ďalšiu ukážku')+'</b><p>'+html(loc(s.notes.during.text))+'</p>'+action('help-seen',t('Ukázka proběhla','Ukážka prebehla'))+'</div>':'')+journal+reviewHistory(s)+
 (s.phase===5?'<form id="reviewForm" class="review-form"><h2>'+t('Ověření výkonu','Overenie výkonu')+'</h2><p>'+t('Zaškrtněte jen to, co jste přímo pozorovali při práci.','Zaškrtnite iba to, čo ste priamo pozorovali pri práci.')+'</p>'+c.checks.map((x,i)=>'<label class="check"><input type="checkbox" name="criterion" data-check="'+i+'" '+(s.checks[i]?'checked':'')+'>'+html(x)+'</label>').join('')+'<label class="check"><input type="checkbox" name="safe" '+(s.safe?'checked':'')+'>'+t('Ověřil/a jsem bezpečný postup','Overil/a som bezpečný postup')+'</label><label>'+t('Zpětná vazba žákovi','Spätná väzba žiakovi')+'<textarea data-review-note maxlength="800">'+html(s.reviewDraft||'')+'</textarea></label>'+recordingControl('teacher',{audio:s.reviewAudio||''})+mediaMarkup({audio:s.reviewAudio})+'<div class="actions">'+action('approve',t('Osobně potvrdit úroveň ','Osobne potvrdiť úroveň ')+s.level,'','button primary',(s.checks.filter(Boolean).length===3&&s.safe)?'':'disabled')+action('return',t('Vrátit k doplnění','Vrátiť na doplnenie'),'','button',(s.reviewDraft?.trim()||s.reviewAudio)?'':'disabled')+'</div></form>':'')+
 (s.phase===0?'<details><summary>'+t('Přidat pokyn k dnešní směně','Pridať pokyn k dnešnej zmene')+'</summary><label>'+t('Pokyn pro žáka','Pokyn pre žiaka')+'<textarea data-hint maxlength="400">'+html(s.hint)+'</textarea></label>'+action('save-hint',t('Uložit pokyn','Uložiť pokyn'))+'</details>':'')+
 (s.phase===6?assignForm(p,m):'')+'</div><aside>'+photo(picture(p,s.phase),p.name+' · '+photoCaption(p,s.phase),'side-img')+'<details><summary>'+t('Potvrzené úrovně','Potvrdené úrovne')+' ('+earned(m)+')</summary>'+m.history.slice().reverse().map(a=>'<p>'+html(competency(a.code).name)+' · '+t('úroveň ')+a.level+' · '+dateLabel(a.day)+'</p>').join('')+'</details></aside></div>';
}
function assignForm(p,m){
 const available=skillSet(p).filter(c=>maxLevel(m,c.code)<3);
 if(!available.length)return '';
 return '<details><summary>'+t('Zadat další praktický výkon','Zadať ďalší praktický výkon')+'</summary><form id="assignForm"><label>'+t('Dovednost a následující úroveň','Zručnosť a nasledujúca úroveň')+'<select name="code">'+available.map(c=>'<option value="'+c.code+'">'+html(c.name)+' · '+(1+maxLevel(m,c.code))+'</option>').join('')+'</select></label><label>'+t('Datum výcviku','Dátum výcviku')+'<input required name="date" type="date" min="'+dayStamp()+'" value="'+dayStamp()+'"></label><button class="button primary">'+t('Přidělit výkon','Prideliť výkon')+'</button></form></details>';
}
function overview(){
 const records=PEOPLE.map(p=>data(p)),phases=records.map(m=>m.shift.phase);
 const stats=[[PEOPLE.length,t('Žáků ve skupině','Žiakov v skupine')],[phases.filter(x=>x===5).length,t('Čeká na posouzení','Čaká na posúdenie')],[records.filter(m=>m.history.some(a=>a.day===dayStamp())).length,t('Žáků s dnešním potvrzením','Žiakov s dnešným potvrdením')]];
 return title(classroomSettings.title,t('Přehled výcviku','Prehľad výcviku'))+'<div class="stats">'+stats.map(([n,l])=>'<div><b>'+n+'</b><span>'+l+'</span></div>').join('')+'</div>'+sectionHead(t('Průběh práce podle zaměření','Priebeh práce podľa zamerania'))+'<div class="table-scroll"><table><thead><tr>'+[t('Zaměření','Zameranie'),t('Příprava','Príprava'),t('Na pracovišti','Na pracovisku'),t('Reflexe','Reflexia'),t('K posouzení','Na posúdenie'),t('Potvrzeno','Potvrdené')].map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody>'+['cook','service'].map(tr=>{const ps=PEOPLE.filter(p=>p.track===tr).map(p=>data(p).shift.phase);return '<tr><th>'+(tr==='cook'?t('Kuchyně','Kuchyňa'):t('Obsluha'))+'</th>'+[[0,1],[2,3],[4,7],[5],[6]].map(group=>'<td>'+ps.filter(i=>group.includes(i)).length+'</td>').join('')+'</tr>'}).join('')+'</tbody></table></div>';
}
function admin(){
 return title(t('Správce ukázky','Správca ukážky'),t('Nastavení skupiny','Nastavenia skupiny'),t('Tyto změny se projeví ve všech čtyřech pohledech tohoto prohlížeče.','Tieto zmeny sa prejavia vo všetkých štyroch pohľadoch tohto prehliadača.'))+
 '<form id="settingsForm" class="settings"><label>'+t('Název skupiny','Názov skupiny')+'<input name="group" required maxlength="45" value="'+html(classroomSettings.title)+'"></label><label>'+t('Výchozí jazyk ukázky','Predvolený jazyk ukážky')+'<select name="language"><option value="cs" '+(classroomSettings.lang==='cs'?'selected':'')+'>Čeština</option><option value="sk" '+(classroomSettings.lang==='sk'?'selected':'')+'>Slovenčina</option></select></label><button class="button primary">'+t('Uložit nastavení','Uložiť nastavenia')+'</button></form>'+
 '<details><summary>'+t('Šest fiktivních profilů','Šesť fiktívnych profilov')+'</summary>'+PEOPLE.map(p=>'<p>'+html(p.name+' · '+profession(p)+' · '+p.year+'. '+t('ročník'))+'</p>').join('')+'</details><details><summary>'+t('Záznam rozhodnutí pedagogů','Záznam rozhodnutí pedagógov')+'</summary>'+PEOPLE.map(p=>'<h3>'+p.name+'</h3>'+[...data(p).history.map(a=>dateLabel(a.day)+' · '+competency(a.code).name+' · '+a.author),...data(p).log.filter(e=>e.kind==='returned').map(e=>dateLabel(e.day)+' · '+t('Vráceno k doplnění','Vrátené na doplnenie')+' · PED-01')].map(x=>'<p>'+html(x)+'</p>').join('')).join('')+'</details><details><summary>'+t('Přístupy v ukázce','Prístupy v ukážke')+'</summary><p>'+t('Žák zapisuje vlastní práci. Pedagog pozoruje a potvrzuje. Vedení sleduje souhrny. Správce mění nastavení skupiny. Přepínač umožňuje vyzkoušet všechny role bez přihlášení.','Žiak zaznamenáva vlastnú prácu. Pedagóg pozoruje a potvrdzuje. Vedenie sleduje súhrny. Správca mení nastavenia skupiny. Prepínač umožňuje vyskúšať všetky roly bez prihlásenia.')+'</p></details>';
}
function about(){return '<div class="modal-head"><h2 id="dialogtitle">'+t('O aplikaci','O aplikácii')+'</h2>'+closeBtn()+'</div><p>'+t('MISTR SVĚTA vás provází odborným výcvikem. Vyberete si, co chcete procvičit, vyzkoušíte to při práci a uložíte si zpětnou vazbu pedagoga.','MISTR SVĚTA vás sprevádza odborným výcvikom. Vyberiete si, čo chcete precvičiť, vyskúšate si to pri práci a uložíte si spätnú väzbu pedagóga.')+'</p><p>'+t('Šest fiktivních žáků a ilustrační fotografie vytvořené pomocí AI. Záznamy se ukládají do tohoto prohlížeče.','Šesť fiktívnych žiakov a ilustračné fotografie vytvorené pomocou AI. Záznamy sa ukladajú do tohto prehliadača.')+'</p><p>'+t('Pracovní mapa dovedností vychází z oboru Kuchař–číšník. Konkrétní přiřazení ke školnímu programu ověří škola.','Pracovná mapa zručností vychádza z odboru Kuchár–čašník. Konkrétne priradenie k školskému programu overí škola.')+'</p><a href="https://edu.gov.cz/wp-content/uploads/2022/01/65-51-H01-Kuchar-cisnik.pdf" target="_blank" rel="noopener">RVP 65-51-H/01 ↗</a><p><a href="#po-smene">'+t('Tomáš po směně','Tomáš po zmene')+'</a> · <a href="#moje-portfolio">'+t('Portfolio kuchařky Ley','Portfólio kuchárky Ley')+'</a></p><p><a href="#vydej">'+t('Vyzkoušet kuchyň','Vyskúšať kuchyňu')+'</a> · <a href="#obsluha">'+t('Vyzkoušet obsluhu','Vyskúšať obsluhu')+'</a></p><details><summary>'+t('Zahraniční předlohy průvodce','Zahraničné predlohy sprievodcu')+'</summary><p><a href="https://www.epfl.ch/labs/ml4ed/research/412-2/" target="_blank" rel="noopener">DUAL-T · EPFL ↗</a> — '+t('pracovní deník kuchařského učně a zpětná vazba mistra.','pracovný denník kuchárskeho učňa a spätná väzba majstra.')+'</p><p><a href="https://apprenticeship.rouxbe.com/" target="_blank" rel="noopener">ACF · Rouxbe ↗</a> — '+t('krátká příprava a výkon na pracovišti.','krátka príprava a výkon na pracovisku.')+'</p><p><a href="https://www.rp.edu.sg/industry/solutions/technologies-for-licensing/adaptive-customer-experience-training-system-acets/" target="_blank" rel="noopener">ACETS · Republic Polytechnic ↗</a> — '+t('nácvik interakce s hostem.','nácvik interakcie s hosťom.')+'</p></details>'+tableSources()+'<p><a href="archiv.html">'+t('Původní akademie a starší lokální zápisy','Pôvodná akadémia a staršie lokálne zápisy')+' ↗</a></p>'}
function closeBtn(){return action('close','×','','close','aria-label="'+t('Zavřít','Zavrieť')+'"')}
function accountModal(){
 return '<div class="modal-head"><h2 id="dialogtitle">'+t('Přepnout pohled','Prepnúť pohľad')+'</h2>'+closeBtn()+'</div><p class="meta">'+t('Ukázková skupina','Ukážková skupina')+' · '+html(classroomSettings.title)+'</p>'+
 '<div class="role-options">'+allRoles.map(r=>action('role',roleLabel(r),r,'choice','aria-pressed="'+(role===r)+'"')).join('')+'</div>'+
 '<h3>'+t('Žákovské profily','Žiacke profily')+'</h3><div class="person-options">'+PEOPLE.map(p=>'<button data-do="student" data-value="'+p.id+'">'+photo(face(p),'','portrait')+'<span><b>'+p.name+'</b><small>'+profession(p)+'</small></span></button>').join('')+'</div>'+(role==='student'?'<details><summary>'+t('Moje preference','Moje nastavenia')+'</summary>'+action('tone','Gen Z'+' · '+(studentStyle?t('zapnuta','zapnuté'):t('vypnuta','vypnuté')),'','choice','aria-pressed="'+studentStyle+'"')+'</details>':'');
}
const homeFor=()=>({student:'path',teacher:'group',leader:'overview',admin:'admin'})[role];
function render(scroll=false){
 const pages=role==='student'?{guide:fieldGuide,planner:planPage,career:careerPage,day:dayPage,summary:summaryPage,employer:employerPage,prepare:morningPage,exercise:exercisePage,during:()=>noteForm('during'),reflect:()=>noteForm('after'),journal:journalPage,path:pathPage,future:futurePage,table:tablePage,'menu-study':menuStudyPage,portfolio,tip:tipPage}:role==='teacher'?{group,inspect}:role==='admin'?{admin}:{overview};
 if(!pages[view])view=homeFor();
 const s=data().shift;
 if(role==='student'&&((view==='prepare'&&s.phase!==0)||(view==='during'&&s.phase!==3)||(view==='reflect'&&![4,7].includes(s.phase))))view='day';
 document.documentElement.lang=language;
 root.innerHTML=nav()+'<main class="shell main" id="workspace" tabindex="-1">'+(!hasStorage?'<p class="warning">'+t('Změny zůstanou jen do zavření této stránky.','Zmeny zostanú iba do zatvorenia tejto stránky.')+'</p>':'')+pages[view]()+'</main>'+footer();
 if(scroll){window.scrollTo(0,0);document.querySelector('main').focus({preventScroll:true})}
}
function guard(b){if(!b)throw Error('invalid')}
const noteKey=()=>({prepare:'before',during:'during',reflect:'after'})[view];
function checkedNote(key){
 guard(role==='student'&&key===noteKey());
 const phase=data().shift.phase;guard((key==='before'&&phase===0)||(key==='during'&&phase===3)||(key==='after'&&[4,7].includes(phase)));
}
function syncButtons(){
 const m=data(),s=m.shift,k=noteKey(),btn=document.querySelector('[data-save]');
 const focusNext = document.querySelector('[data-focus-next]');
 if(view==='prepare'&&focusNext)focusNext.disabled=!hasNote(s.notes.before)||!!audioSession;
 if(k&&btn)btn.disabled=!hasNote(s.notes[k])||(k==='after'&&s.notes.after.next===null)||(k==='before'&&!s.quiz)||!!audioSession;
 if(view==='inspect'&&s.phase===5){
  const approve=document.querySelector('[data-do=approve]'),ret=document.querySelector('[data-do=return]');
  if(approve)approve.disabled=s.checks.filter(Boolean).length!==3||!s.safe||!!audioSession;
  if(ret)ret.disabled=!(s.reviewDraft?.trim()||s.reviewAudio)||!!audioSession;
 }
}
function navigateStage(v){
 const s=data().shift;
 if(v==='prepare')morningStep=hasNote(s.notes.before)?'safety':'focus';
 if(['prepare','reflect','journal','portfolio'].includes(v)){go(v);return}
 const phase={arrive:1,observed:2,finish:3}[v];guard(role==='student'&&s.phase===phase);
 mutate(m=>m.shift.phase++);go('day');
 if(v==='finish')tell(t('Nácvik se zapsal k dovednosti','Nácvik sa zapísal k zručnosti')+' „'+competency(s.code).name+'“.');
}
function teacherReview(ok){
 guard(role==='teacher'&&view==='inspect');
 mutate(m=>{const s=m.shift;guard(s.phase===5);
 if(ok)guard(s.safe&&s.checks.filter(Boolean).length===3);
 else guard(s.reviewDraft?.trim()||s.reviewAudio);
 const note=s.reviewDraft?.trim()||(s.reviewAudio?'':localized('Výkon splnil všechna pozorovaná kritéria.','Výkon splnil všetky pozorované kritériá.'));
 const decision={...approval(s,note),audio:s.reviewAudio||'',result:ok?'approved':'returned',criteria:[...s.checks],safe:s.safe,at:new Date().toISOString()};
 s.reviews.push(decision);s.phase=ok?6:7;s.feedback=note;s.safe=false;s.checks=[];s.reviewDraft='';s.reviewAudio='';
 if(ok){guard(!m.history.some(h=>h.id===s.id));m.history.push(decision)}
 m.log.push({kind:decision.result,day:dayStamp(),at:decision.at,code:s.code,level:s.level});
 });render();tell(ok?t('Úroveň je potvrzená a výkon je v portfoliu.','Úroveň je potvrdená a výkon je v portfóliu.'):t('Pokyn k doplnění je v deníku žáka.','Pokyn na doplnenie je v denníku žiaka.'));
}
function downloadPortfolio(){
 guard(role==='student'&&view==='portfolio');const m=data(),p=person();const bundle={program:'65-51-H/01',version:2,language,student:p.name,track:profession(p),exported:new Date().toISOString(),confirmed:m.history.map(a=>({...a,competency:competency(a.code).name,standard:competency(a.code).levels[a.level-1],criteria:competency(a.code).checks.map((label,i)=>({label,observed:a.criteria[i]})),reflections:Object.fromEntries(Object.entries(a.notes).map(([k,n])=>[k,{...n,text:loc(n.text),selected:n.choice===null?'':loc(options(p,a)[k][n.choice]),nextStep:n.next===null?'':loc(options(p,a).next[n.next])}]))}))};
 const url=URL.createObjectURL(new Blob([JSON.stringify(bundle,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='Mistr_sveta_'+p.name+'_portfolio.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function noteStage(key){if(key==='teacher'){guard(role==='teacher'&&view==='inspect'&&data().shift.phase===5)}else checkedNote(key)}
function blobURL(blob){return new Promise((resolve,reject)=>{const f=new FileReader();f.onload=()=>resolve(f.result);f.onerror=reject;f.readAsDataURL(blob)})}
function saveVoice(key,uri){noteStage(key);mutate(m=>{if(key==='teacher')m.shift.reviewAudio=uri;else{m.shift.notes[key].audio=uri;m.shift.notes[key].time=timeNow()}})}
async function recordVoice(key){
 noteStage(key);
 if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){tell(t('Mikrofon zde není dostupný. Vyberte možnost nebo napište větu.','Mikrofón tu nie je dostupný. Vyberte možnosť alebo napíšte vetu.'));return}
 busy=true;let stream;
 try{
 stream=await navigator.mediaDevices.getUserMedia({audio:true});
 const mime=['audio/webm;codecs=opus','audio/mp4','audio/ogg;codecs=opus','audio/webm'].find(x=>MediaRecorder.isTypeSupported(x));
 const recorder=new MediaRecorder(stream,{...(mime?{mimeType:mime}:{}),audioBitsPerSecond:32000});const parts=[];
 audioSession={key,recorder,stream,timer:0};
 recorder.ondataavailable=e=>{if(e.data.size)parts.push(e.data)};
 recorder.onstop=async()=>{const current=audioSession;busy=true;
 try{clearTimeout(current?.timer);stream.getTracks().forEach(x=>x.stop());const blob=new Blob(parts,{type:recorder.mimeType||'audio/webm'});guard(blob.size>0);saveVoice(key,await blobURL(blob));tell(t('Nahrávka je uložená.','Nahrávka je uložená.'))}catch(e){problem(e)}finally{audioSession=null;busy=false;render()}};
 recorder.start(500);audioSession.timer=setTimeout(stopVoice,30000);render();tell(t('Nahrávám. Nahrávání se po 30 sekundách zastaví.','Nahrávam. Nahrávanie sa po 30 sekundách zastaví.'));
 }catch{stream?.getTracks().forEach(x=>x.stop());audioSession=null;tell(t('Mikrofon se neotevřel. Vyberte možnost nebo napište větu.','Mikrofón sa neotvoril. Vyberte možnosť alebo napíšte vetu.'))}finally{busy=false}
}
function stopVoice(){if(audioSession?.recorder.state==='recording'){audioSession.recorder.stop();busy=true}}
async function attachPhoto(file){
 if(!file)return;checkedNote('after');guard(!busy&&!audioSession);
 if(!['image/jpeg','image/webp','image/png'].includes(file.type)||file.size>12*1024*1024){tell(t('Vyberte JPEG, PNG nebo WebP do 12 MB.','Vyberte JPEG, PNG alebo WebP do 12 MB.'));return}
 busy=true;try{const im=new Image();im.src=await blobURL(file);await im.decode();const scale=Math.min(1,780/Math.max(im.width,im.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(im.width*scale));canvas.height=Math.max(1,Math.round(im.height*scale));canvas.getContext('2d').drawImage(im,0,0,canvas.width,canvas.height);
 mutate(m=>m.shift.notes.after.photo=canvas.toDataURL('image/jpeg',.73));render();tell(t('Fotka je u záznamu.','Fotka je pri zázname.'))}finally{busy=false}
}
function problem(e){tell(e?.name==='QuotaExceededError'?t('Úložiště je plné. Zkraťte nahrávku nebo odeberte fotku a zkuste to znovu.','Úložisko je plné. Skráťte nahrávku alebo odoberte fotku a skúste to znova.'):t('Tento krok se nepodařilo uložit. Ověřte aktuální stav.','Tento krok sa nepodarilo uložiť. Overte aktuálny stav.'))}
function switchPerson(id){guard(PEOPLE.some(p=>p.id===id));if(id!==studentId){resetMenu()}studentId=id;setPref('profile',id)}
function newModal(f){dialog.innerHTML=f();if(!dialog.open)dialog.showModal()}
function handle(act,val){
 if((audioSession||busy)&&act!=='stop'){tell(t('Nejdřív dokončete záznam.','Najskôr dokončite záznam.'));return}
 if(act.startsWith('table-')){handleTable(act,val);return}
 switch(act){
 case 'home':go(homeFor());break;
 case 'accounts':newModal(accountModal);break;
 case 'tone':guard(role==='student');studentStyle=!studentStyle;setPref('student-style',studentStyle?'on':'off');render();dialog.close();tell(t('Preference je uložena.','Nastavenie je uložené.'));break;
 case 'listen':{guard(role==='student'&&view==='prepare');const voices=window.speechSynthesis?.getVoices()||[];const v=voices.find(x=>x.localService&&x.lang.toLowerCase().startsWith(language));if(!v){tell(t('V zařízení chybí místní český hlas. Zadání je napsané vedle fotografie.','V zariadení chýba miestny slovenský hlas. Zadanie je napísané pri fotografii.'));break}if(window.speechSynthesis.speaking){window.speechSynthesis.cancel();break}const p=person(),s=data().shift,u=new SpeechSynthesisUtterance([courseTitle(p,s),competency(s.code).tasks[s.level-1],s.hint].filter(Boolean).join('. '));u.voice=v;u.lang=v.lang;window.speechSynthesis.speak(u);break}
 case 'about':newModal(about);break;
 case 'close':dialog.close();break;
 case 'role':guard(allRoles.includes(val));role=val;rosterFilter='all';dialog.close();go(homeFor());break;
 case 'student':switchPerson(val);role='student';dialog.close();go(homeFor());break;
 case 'lang':language=language==='cs'?'sk':'cs';setPref('language',language);render();break;
 case 'fav-skill':guard(role==='student'&&skillSet(person()).some(c=>c.code===val));mutate(m=>{const ids=new Set(m.favourites||[]);if(ids.has(val))ids.delete(val);else ids.add(val);m.favourites=[...ids]});menuOpenCode=val;render();focusMenuRow(val);break;
 case 'journal-search':journalSearch();break;
 case 'day-reflect':reflectDay(val);break;
 case 'day-book':showDayBook(val);break;
 case 'book-edit':guard(role==='student');openPlanDay(val);break;
 case 'master-journal':case 'master-review':guard(role==='teacher');switchPerson(val);go('inspect');{const target=document.querySelector(act==='master-journal'?'#master-journal':'#reviewForm');if(target){if(act==='master-journal')target.open=true;target.scrollIntoView({block:'start'});target.querySelector('summary,input')?.focus({preventScroll:true})}}break;
 case 'plan-day':guard(role==='student');planYear=schoolStart(val);go('planner');openPlanDay(val);break;
 case 'go':go(val);break;
 case 'exercise':{
  guard(role==='student'&&!!serviceExercise(person(),data().shift));
  exerciseState.answer=null;go('exercise');break;
 }
 case 'answer-exercise':{
  guard(role==='student'&&view==='exercise'&&/^[012]$/.test(val));
  exerciseState.answer=Number(val);render();
  document.querySelector('.answer-reply')?.focus();
  break;
 }
 case 'finish-exercise':{
  const p=person(),s=data().shift,ex=serviceExercise(p,s);
  guard(role==='student'&&view==='exercise'&&ex&&exerciseState.answer===ex.best);
  if(s.phase===0){
   mutate(m=>{m.shift.warmupDone=true});morningStep=hasNote(s.notes.before)?'safety':'focus';go('prepare');
  }else{go('day')}
  break;
 }
 case 'morning-next':checkedNote('before');guard(hasNote(data().shift.notes.before));morningStep='safety';quizError=false;render(true);break;
 case 'morning-back':checkedNote('before');morningStep='focus';render(true);break;
 case 'step':guard(role==='student');navigateStage(val);break;
 case 'detail':openMenuSkill(val);break;
 case 'menu-filter':menuFilterAction(val);break;
 case 'map-mode':switchPortfolioMap(val);break;
 case 'map-result':openConfirmedMap(val);break;
 case 'choose-goal':choosePracticeGoal(val);break;
 case 'clear-goal':
  guard(role==='student' && view==='future' && data().practiceGoal);
  mutate(model => {delete model.practiceGoal});
  render();document.querySelector('.goal-option')?.focus({preventScroll:true});
  tell(t('Osobní cíl je odebraný.','Osobný cieľ je odstránený.'));break;
 case 'station-try':handleStationTry(val);break;
 case 'menu-study':case 'menu-study-save':menuStudyAction(act,val);break;
 case 'menu-proof':{
  guard(role==='student'&&skillSet(person()).some(c=>c.code===val)&&maxLevel(data(),val)>0);
  go('portfolio');const entry=document.querySelector('.portfolio-entry[data-code="'+val+'"]');
  if(entry){entry.focus({preventScroll:true});entry.scrollIntoView({block:'start'})}break;
 }
 case 'tip':guard(role==='student');hintStage=val;go('tip');break;
 case 'filter':guard(role==='teacher');rosterFilter=val;render();break;
 case 'inspect':guard(role==='teacher');switchPerson(val);go('inspect');break;
 case 'choice':{const k=noteKey();checkedNote(k);const [field,num]=val.split('|');guard(['choice','next'].includes(field)&&/^[012]$/.test(num)&&(field!=='next'||k==='after'));mutate(m=>{m.shift.notes[k][field]=Number(num);m.shift.notes[k].time=timeNow()});render();break}
 case 'quiz':checkedNote('before');quizError=Number(val)!==(person().track==='cook'?0:1);mutate(m=>m.shift.quiz=!quizError);render();break;
 case 'save-note':{checkedNote(val);mutate(m=>{const s=m.shift,n=s.notes[val];guard(hasNote(n));n.time=timeNow();if(val==='after'){guard(n.next!==null);s.phase=5;s.checks=[];s.safe=false}else if(val==='before'){guard(s.quiz);s.phase=1}});go(val==='after'?'summary':'day');tell(val==='after'?t('Pedagog má váš zápis k posouzení.','Pedagóg má váš zápis na posúdenie.'):t('Záznam je u vaší dovednosti i v deníku.','Záznam je pri vašej zručnosti aj v denníku.'));break}
 case 'save-hint':guard(role==='teacher'&&view==='inspect'&&data().shift.phase===0);mutate(m=>m.shift.hint=document.querySelector('[data-hint]').value.trim());tell(t('Pokyn je v ranní přípravě.','Pokyn je v rannej príprave.'));break;
 case 'help-seen':guard(role==='teacher'&&view==='inspect'&&asksForHelp(data().shift));mutate(m=>{m.shift.helpSeen=timeNow()});render();tell(t('Ukázka je zaznamenaná v deníku.','Ukážka je zaznamenaná v denníku.'));break;
 case 'approve':teacherReview(true);break;
 case 'return':teacherReview(false);break;
 case 'export':downloadPortfolio();break;
 case 'print-employer':guard(role==='student'&&view==='employer');window.print();break;
 case 'print':guard(role==='student'&&view==='portfolio');window.print();break;
 case 'record':recordVoice(val).catch(problem);break;
 case 'stop':stopVoice();break;
 case 'clear-audio':saveVoice(val,'');render();break;
 case 'clear-photo':checkedNote('after');mutate(m=>m.shift.notes.after.photo='');render();break;
 }
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-do]');if(!b||b.disabled)return;try{handle(b.dataset.do,b.dataset.value||'')}catch(error){problem(error)}});
document.addEventListener('input',e=>{
 const el=e.target;try{
 if(el.dataset.note){const k=el.dataset.note;checkedNote(k);mutate(m=>{m.shift.notes[k].text=el.value;m.shift.notes[k].time=timeNow()});syncButtons()}
 if(el.hasAttribute('data-review-note')){guard(role==='teacher'&&view==='inspect'&&data().shift.phase===5);mutate(m=>m.shift.reviewDraft=el.value);syncButtons()}
 }catch(err){problem(err)}
});
document.addEventListener('change',e=>{const el=e.target;try{
 if(el.hasAttribute('data-photo')){attachPhoto(el.files[0]).catch(problem);return}
 if(el.closest('#reviewForm')&&el.type==='checkbox'){guard(role==='teacher'&&view==='inspect'&&data().shift.phase===5);mutate(m=>{if(el.name==='safe')m.shift.safe=el.checked;else m.shift.checks[Number(el.dataset.check)]=el.checked});syncButtons()}
 }catch(err){problem(err)}});
document.addEventListener('submit',e=>{const form=e.target;if(['plan-edit','daily-reflect'].includes(form.id))return;e.preventDefault();if(busy||audioSession)return;
 try{
 if(form.id==='settingsForm'){guard(role==='admin');const value=form.elements.group.value.trim();guard(value);const lang=form.elements.language.value;guard(['cs','sk'].includes(lang));const newSettings={title:value,lang};if(hasStorage)localStorage.setItem(scopedKey('settings'),JSON.stringify(newSettings));classroomSettings=newSettings;language=lang;setPref('language',lang);render();tell(t('Nastavení je uloženo.','Nastavenia sú uložené.'))}
 if(form.id==='assignForm'){guard(role==='teacher');const code=form.elements.code.value,day=form.elements.date.value;guard(skillSet(person()).some(c=>c.code===code)&&/^\d{4}-\d{2}-\d{2}$/.test(day)&&day>=dayStamp());mutate(m=>{guard(m.shift.phase===6);const level=maxLevel(m,code)+1;guard(level<=3);m.finished.push(m.shift);m.shift=newShift(code,level,day,m.finished.length+1)});render();tell(t('Nový úkol je v profilu žáka.','Nová úloha je v profile žiaka.'))}
 }catch(err){problem(err)}});
window.addEventListener('storage',e=>{if(e.key?.startsWith('mistr-sveta.atelier.1.')&&!busy&&!audioSession){if(e.key===scopedKey('settings')&&e.newValue)classroomSettings=JSON.parse(e.newValue);render()}});
window.addEventListener('pagehide',()=>{if(audioSession){stopVoice();audioSession.stream.getTracks().forEach(x=>x.stop())}});
function openSharedExercise(){
 const hash=window.location?.hash;
 const profile={'#listek-kuchyne':'ema','#listek-obsluha':'matej','#vydej':'ema','#obsluha':'matej','#po-smene':'tomas','#moje-portfolio':'lea'}[hash];
 if(!profile||busy||audioSession)return;
 if(dialog.open)dialog.close();
 switchPerson(profile);role='student';exerciseState.answer=null;
 view=hash.startsWith('#listek-')?'path':hash==='#moje-portfolio'?'employer':hash==='#po-smene'?(data().shift.phase>=4?'summary':'day'):serviceExercise(person(),data().shift)?'exercise':'day';
}
function renderSharedEntry(scroll=false){
 if(location.hash==='#slovnik'&&!busy&&!audioSession){role='student';view='guide';render(scroll);return;}
 if(location.hash==='#mistr'&&!busy&&!audioSession){role='teacher';view='group';rosterFilter='all';render(scroll);return;}
 if(location.hash==='#planovac'&&!busy&&!audioSession){role='student';view='planner';render(scroll);return;}
 if(location.hash==='#karierni-mapa'&&!busy&&!audioSession){role='student';view='career';render(true);return;}
 if(/^#denik(?:-[a-z]+)?$/.test(window.location.hash)&&!busy&&!audioSession){const requested=window.location.hash.slice(7);if(requested&&PEOPLE.some(p=>p.id===requested))switchPerson(requested);role='student';view='journal';render(scroll);return;}
 const tableLink=/^#stul-(12|7)-([a-z]+)$/.exec(window.location?.hash || '');
 if (tableLink && PEOPLE.some(p=>p.id===tableLink[2]) && !busy && !audioSession) {
   if (dialog.open) dialog.close();
   switchPerson(tableLink[2]);role='student';tableNumber=tableLink[1];view='table';render(scroll);return;
 }
 if(['#ukazka-kuchyne','#ukazka-obsluha'].includes(window.location?.hash) && !busy && !audioSession){switchPerson(window.location.hash==='#ukazka-kuchyne'?'ema':'matej');role='student';hintStage='mentor';view='tip';render(scroll);return;}
 const futureProfile = window.location?.hash?.match(/^#budoucnost-([a-z]+)$/)?.[1];
 if (PEOPLE.some(p => p.id === futureProfile) && !busy && !audioSession) {
   if (dialog.open) dialog.close();
   switchPerson(futureProfile);role='student';view='future';render(scroll);return;
 }
 const code = window.location?.hash?.match(/^#dovednost-(K\d{2}\.\d+|P0[1-8])$/)?.[1];
 const skill = code && competency(code);
 if (skill && !busy && !audioSession) {
   if (dialog.open) dialog.close();
   if (!skillSet(person()).some(c => c.code === code)) {
     switchPerson(CATALOG.cs.competencies.find(c => c.code === code).branch === 'Kuchař' ? 'ema' : 'matej');
   }
   role='student';view='path';resetMenu();menuOpenCode=code;
   render();focusMenuRow(code);
   return;
 }
 openSharedExercise();render(scroll);
}
'use strict';
const schoolStart = d => Number(d.slice(0,4))-(Number(d.slice(5,7))<9?1:0);
let planYear=schoolStart(dayStamp()), planDay='', draggedDay='';
const shiftPlanTypes=['kitchen','service','team'];
function planName(type){
 return {kitchen:t('Praxe v kuchyni','Prax v kuchyni'),service:t('Praxe v obsluze','Prax v obsluhe'),team:t('Společná směna','Spoločná zmena')}[type];
}
function stampDate(y,m,d){
 const date=new Date(y,m,d,12);
 return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
}
function initialPlan(p,y){
 const entries={};
 for(let i=0;i<10;i++){
  const first=new Date(y,8+i,1,12);
  for(const week of [1,3]){
   const day=stampDate(y,8+i,1+(8-first.getDay())%7+week*7);
   entries[day]={type:p.track==='cook'?'kitchen':'service',note:''};
  }
 }
 return entries;
}
function yearPlan(m,p,y){return m.schoolPlans?.[y]||initialPlan(p,y)}
function changePlan(fn){
 guard(role==='student');
 mutate(m=>{m.schoolPlans||={};const entries=m.schoolPlans[planYear]||initialPlan(person(),planYear);fn(entries,m);m.schoolPlans[planYear]=entries});
}
function planJournal(m,p,add){
 for(const entries of Object.values(m.schoolPlans||{}))for(const [day,e] of Object.entries(entries)){
  if(e.saved||e.note?.trim())add(day,planName(e.type),'<p>'+html([...(e.activities||[]).map(i=>taskOptions()[i]),e.note].filter(Boolean).join(' · ')||t('Deník založen. Zápis doplníte v plánovači.','Denník založený. Zápis doplníte v plánovači.'))+'</p>');
 }
}
const fieldSources=[
 ['Professional Cooking · Mise en place','https://resources.escoffier.edu/textbooks/gisslen/professional_cooking_07.pdf'],
 ['Professional Cooking · Sauces','https://resources.escoffier.edu/textbooks/gisslen/professional_cooking_09.pdf'],
 ['Cambridge Dictionary · à la carte','https://dictionary.cambridge.org/dictionary/english/a-la-carte'],
 ["Cambridge Dictionary · table d’hôte",'https://dictionary.cambridge.org/dictionary/english/table-d-hote'],
 ['Escoffier · Culinary glossary','https://www.escoffier.edu/blog/culinary-arts/the-essential-glossary-of-cooking-terms-for-the-culinary-arts/']
];
const fieldTerms=[
 ['Mise en place','K05.1',0,'Příprava surovin, inventáře a pracoviště před zahájením práce.','Príprava surovín, inventára a pracoviska pred začiatkom práce.','Před výdejem si rozmístěte talíře a kleště v pořadí použití.','Pred výdajom si rozložte taniere a kliešte v poradí použitia.'],
 ['Julienne','K03.1',0,'Řez na tenké stejnoměrné nudličky.','Rez na tenké rovnomerné rezančeky.','Položte vedle sebe tři nudličky mrkve a porovnejte jejich tloušťku.','Položte vedľa seba tri rezančeky mrkvy a porovnajte ich hrúbku.'],
 ['Chiffonade','K03.1',0,'Listy bylinek nebo zeleniny nakrájené na tenké proužky.','Listy bylín alebo zeleniny nakrájané na tenké pásiky.','Na ozdobení rajčat připravte proužky bazalky.','Na ozdobenie paradajok pripravte pásiky bazalky.'],
 ['Roux','K04.2',1,'Jíška připravená z mouky a tuku k zahuštění.','Zápražka pripravená z múky a tuku na zahustenie.','Podle receptury zvolte světlou nebo tmavší jíšku.','Podľa receptúry zvoľte svetlú alebo tmavšiu zápražku.'],
 ['Déglacer','K03.3',1,'Přidáním tekutiny rozpustit přípečky ze dna nádoby.','Pridaním tekutiny rozpustiť výpek na dne nádoby.','Po opečení masa použijte vývar jako základ omáčky.','Po opečení mäsa použite vývar ako základ omáčky.'],
 ['Dashi','K04.2',4,'Japonský vývar, často z řasy kombu a sušených rybích vloček.','Japonský vývar, často z riasy kombu a sušených rybích vločiek.','U polévky miso určete, co tvoří základ její chuti.','Pri polievke miso určte, čo tvorí základ jej chuti.'],
 ['À la carte','K08.1',2,'Host si vybírá jednotlivá jídla, každé má vlastní cenu.','Hosť si vyberá jednotlivé jedlá, každé má vlastnú cenu.','Host chce jen předkrm. Ukažte mu jeho cenu v nabídce.','Hosť chce iba predjedlo. Ukážte mu jeho cenu v ponuke.'],
 ['Table d’hôte','K08.1',3,'Sestavené menu za pevnou cenu s omezeným výběrem jídel.','Zostavené menu za pevnú cenu s obmedzeným výberom jedál.','Před objednáním vysvětlete, které chody cena zahrnuje.','Pred objednaním vysvetlite, ktoré chody cena zahŕňa.']
];
function fieldGuide(){
 const p=person(),codes=skillSet(p).map(c=>c.code);
 return title(p.name,t('Slovník ze směny','Slovník zo zmeny'),t('Vyhledejte výraz, který zazněl na praxi.','Vyhľadajte výraz, ktorý zaznel na praxi.'))+
 '<label>'+t('Najít pojem','Nájsť pojem')+'<input id="field-find" type="search" placeholder="Julienne, menu, dashi…"></label><div class="field-terms">'+fieldTerms.map(([name,code,src,cs,sk,ex,sx])=>'<details><summary>'+html(name)+'</summary><p>'+html(t(cs,sk))+'</p><p><b>'+t('Na směně','Na zmene')+'</b> · '+html(t(ex,sx))+'</p>'+(codes.includes(code)?action('detail',menuSkillName(competency(code))+' →',code,'button'):'<p>'+html(competency(code).name)+'</p>')+'<p><a href="'+fieldSources[src][1]+'" target="_blank" rel="noopener">'+t('Zdroj')+' · '+html(fieldSources[src][0])+'</a></p></details>').join('')+'</div><p id="field-empty" hidden>'+t('Žádný odpovídající pojem.','Žiadny zodpovedajúci pojem.')+'</p>'+learningModel(p);
}
document.addEventListener('input',e=>{if(e.target.id!=='field-find')return;const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');let hits=0;document.querySelectorAll('.field-terms details').forEach(el=>{el.hidden=!norm(el.textContent).includes(norm(e.target.value.trim()));if(!el.hidden)hits++});document.querySelector('#field-empty').hidden=hits>0});
function learningModel(p){
 const s=data(p).shift,c=competency(s.code);
 return '<details class="learning-model"><summary>'+t('Jak získám potvrzenou kompetenci?','Ako získam potvrdenú kompetenciu?')+'</summary><h3>'+html(menuSkillName(c))+'</h3><ol>'+
 [t('Před směnou si projdu zadání.','Pred zmenou si prejdem zadanie.')+' '+c.tasks[s.level-1],t('Mistr předvede postup. Při samostatné práci sleduje','Majster predvedie postup. Pri samostatnej práci sleduje')+' · '+c.checks.join(', '),t('Po směně popíšu výsledek. Co bych příště udělal/a jinak a proč?','Po zmene opíšem výsledok. Čo by som nabudúce urobil/a inak a prečo?'),t('Pedagog potvrdí úroveň podle pozorované práce, nebo vrátí úkol k doplnění.','Pedagóg potvrdí úroveň podľa pozorovanej práce alebo vráti úlohu na doplnenie.')].map(v=>'<li>'+html(v)+'</li>').join('')+
 '</ol>'+menuLevelList(c,maxLevel(data(p),c.code),s.level)+goBtn('day',t('Otevřít svoji směnu','Otvoriť svoju zmenu'),'button primary')+'</details>';
}

function planPage(){
 const p=person(),m=data(),entries=yearPlan(m,p,planYear);
 const months=Array.from({length:12},(_,i)=>{
  const first=new Date(planYear,8+i,1,12), count=new Date(planYear,9+i,0).getDate();
  const label=first.toLocaleDateString(language,{month:'long',year:'numeric'});
  const blanks='<i></i>'.repeat((first.getDay()+6)%7);
  const cells=Array.from({length:count},(_,j)=>{
   const d=stampDate(planYear,8+i,j+1),e=entries[d],label=dateLabel(d)+(e?' · '+planName(e.type):'');
   const dayButton='<button type="button" data-cal-day="'+d+'" aria-label="'+html(label)+'" title="'+html(label)+'" '+(e?'draggable="true" class="booked"':'')+'>'+ (j+1)+(e?'<span>'+html(planName(e.type))+'</span>'+(e.activities||[]).map(i=>'<small class="activity-chip ac-'+Number(i)+'">'+html(taskOptions()[i])+'</small>').join('')+'<b class="drag-grip" aria-hidden="true">⠿</b>':'')+'</button>';
   if(!e)return dayButton;
   return '<div class="shift-cell" data-kind="'+html(e.type)+'">'+dayButton+'<button type="button" class="day-book" data-do="day-book" data-value="'+d+'" title="'+html(t('Deník','Denník')+' · '+dateLabel(d))+'" aria-label="'+html(t('Otevřít deník','Otvoriť denník')+' · '+dateLabel(d))+'">'+bookMark+'</button></div>';
  }).join('');
  return '<details class="cal-month" '+(dayStamp().startsWith(stampDate(planYear,8+i,1).slice(0,7))?'open':'')+'><summary>'+html(label)+'</summary><div class="cal-grid">'+(language==='sk'?['Po','Ut','St','Št','Pi','So','Ne']:['Po','Út','St','Čt','Pá','So','Ne']).map(x=>'<small>'+x+'</small>').join('')+blanks+cells+'</div></details>';
 }).join('');
 const upcoming=Object.keys(entries).filter(d=>d>=dayStamp()).sort(),next=upcoming[0];
 const yearChoice='<label>'+t('Školní rok','Školský rok')+' <select id="plan-year">'+[...new Set([planYear-1,planYear,planYear+1,...Object.keys(m.schoolPlans||{}).map(Number)])].sort().map(y=>'<option value="'+y+'" '+(y===planYear?'selected':'')+'>'+y+' / '+(y+1)+'</option>').join('')+'</select></label>';
 return '<section class="shift-spot"><div><small>'+html(p.name)+' · '+t('Plánovač praxe','Plánovač praxe')+'</small><h1>'+t('Moje příští směna','Moja ďalšia zmena')+'</h1><h2>'+(next?html(dateLabel(next)+' · '+planName(entries[next].type)):t('Zatím bez termínu','Zatiaľ bez termínu'))+'</h2>'+(next?action('day-book',t('Otevřít deník směny','Otvoriť denník zmeny'),next,'button primary'):'')+' '+goBtn('guide',t('Slovník na praxi','Slovník na prax'),'button')+'</div><img src="'+html(next&&entries[next].type==='service'?'photos/service-mentor.webp':next&&entries[next].type==='kitchen'?'photos/chef-mentor.webp':picture(p,3))+'" alt=""></section>'+
 '<div class="shift-ribbon">'+upcoming.slice(1,4).map(d=>'<button type="button" data-cal-day="'+d+'"><small>'+html(new Date(d+'T12:00:00').toLocaleDateString(language,{weekday:'long'}))+'</small><b>'+html(dateLabel(d))+'</b><span>'+html(planName(entries[d].type))+'</span></button>').join('')+'</div><details class="season-plan"><summary>'+t('Celý školní rok · plánovat nebo přesunout směnu','Celý školský rok · plánovať alebo presunúť zmenu')+'</summary>'+yearChoice+'<p>'+t('Vyberte měsíc a den. Barevnou směnu můžete přetáhnout na volný den. Výchozí termíny jsou modelové.','Vyberte mesiac a deň. Farebnú zmenu môžete pretiahnuť na voľný deň. Východiskové termíny sú modelové.')+'</p><div class="cal-year">'+months+'</div></details>'+mySkillShelf(p,m)+learningModel(p);
}
function taskOptions(){
 return [t('Příprava pracoviště','Príprava pracoviska'),t('Příprava porcí','Príprava porcií'),t('Obsluha hostů','Obsluha hostí'),t('Spolupráce při výdeji','Spolupráca pri výdaji'),t('Závěrečná kontrola','Záverečná kontrola')];
}
function picks(name,items,selected,multiple=false){
 return '<div class="tile-picks">'+items.map(([key,label])=>'<label><input type="'+(multiple?'checkbox':'radio')+'" name="'+name+'" value="'+html(key)+'" '+(selected.includes(String(key))?'checked':'')+'><span>'+html(label)+'</span></label>').join('')+'</div>';
}
function mySkillShelf(p,m){
 const skills=skillSet(p),known=skills.filter(c=>maxLevel(m,c.code)>0),fav=skills.filter(c=>(m.favourites||[]).includes(c.code));
 const list=(items,empty)=>items.length?items.map(c=>action('detail',menuSkillName(c)+(maxLevel(m,c.code)?' · '+maxLevel(m,c.code)+'/3':''),c.code,'button')).join(' '):'<p>'+empty+'</p>';
 return '<section class="skill-shelf"><details><summary>'+t('Co už dokážu','Čo už dokážem')+' · '+known.length+'</summary><p>'+t('Úroveň potvrzená pedagogem','Úroveň potvrdená pedagógom')+'</p>'+list(known,t('První dovednost přibude po potvrzení praxe.','Prvá zručnosť pribudne po potvrdení praxe.'))+'</details><details><summary>★ '+t('Moje oblíbené','Moje obľúbené')+' · '+fav.length+'</summary>'+list(fav,t('Otevřete dovednost a zvolte Přidat do oblíbených.','Otvorte zručnosť a zvoľte Pridať do obľúbených.'))+'</details></section>';
}
function openPlanDay(d){
 planDay=d;const e=yearPlan(data(),person(),planYear)[d];
 newModal(()=>'<h2 id="dialogtitle">'+html(dateLabel(d))+'</h2><form id="plan-edit"><fieldset><legend>'+t('Kde mám praxi?','Kde mám prax?')+'</legend>'+picks('type',shiftPlanTypes.map(k=>[k,planName(k)]),[e?.type||(person().track==='cook'?'kitchen':'service')])+'</fieldset><fieldset><legend>'+t('Co si zapíšu do deníku?','Čo si zapíšem do denníka?')+'</legend>'+picks('activities',taskOptions().map((v,i)=>[i,v]),(e?.activities||[]).map(String),true)+'</fieldset><details '+(e?.note?'open':'')+'><summary>'+t('Vlastní poznámka','Vlastná poznámka')+'</summary><textarea name="note" aria-label="'+t('Poznámka')+'" maxlength="2000">'+html(e?.note||'')+'</textarea></details><label>'+t('Datum praxe','Dátum praxe')+'<input type="date" name="day" required min="'+planYear+'-09-01" max="'+(planYear+1)+'-08-31" value="'+d+'"></label><p data-plan-error role="alert"></p><button type="submit" class="button primary">'+t('Uložit do kalendáře a deníku','Uložiť do kalendára a denníka')+'</button> <button type="button" class="button" data-plan-close>'+t('Zavřít','Zavrieť')+'</button></form>'+(e?action('day-reflect',t('Moje reflexe','Moja reflexia'),d,'text-link'):''));

}
document.addEventListener('click',e=>{if(e.target.closest('[data-plan-close]'))dialog.close();const b=e.target.closest('[data-cal-day]');if(b&&role==='student'&&Date.now()>ignoreTapUntil)openPlanDay(b.dataset.calDay)});
document.addEventListener('change',e=>{if(e.target.id==='plan-year'){planYear=Number(e.target.value);render();document.querySelector('.season-plan').open=true}});
document.addEventListener('dragstart',e=>{draggedDay=e.target.closest('.booked')?.dataset.calDay||'';if(draggedDay)e.dataTransfer.setData('text/plain',draggedDay)});
document.addEventListener('dragend',()=>draggedDay='');
document.addEventListener('dragover',e=>{if(draggedDay&&e.target.closest('[data-cal-day]'))e.preventDefault()});
function moveDayReflection(m,from,to){
 if(!m.dailyReflections?.[from]||m.dailyReflections[to]||[m.shift,...m.history,...m.finished].some(s=>s.day===from))return;
 m.dailyReflections[to]=m.dailyReflections[from];delete m.dailyReflections[from];
}
function occupied(){const alert=dialog.querySelector('[data-plan-error]');if(dialog.open&&alert){alert.textContent=t('Tento den už má praxi. Vyberte volný den.','Tento deň už má prax. Vyberte voľný deň.');return}tell(t('Tento den už má praxi. Vyberte volný den.','Tento deň už má prax. Vyberte voľný deň.'))}
function moveBooking(from,to){
 if(!from||!to||from===to||role!=='student')return;
 const entries=yearPlan(data(),person(),planYear);if(!entries[from])return;if(entries[to])return occupied();
 changePlan((map,m)=>{map[to]={...map[from],saved:true};delete map[from];moveDayReflection(m,from,to)});
 render();tell(t('Praxe přesunuta','Prax presunutá')+' · '+dateLabel(to));
}
document.addEventListener('drop',e=>{
 const to=e.target.closest('[data-cal-day]')?.dataset.calDay;if(!to||!draggedDay)return;
 e.preventDefault();moveBooking(draggedDay,to);draggedDay='';
});
function expandMonth(el){const month=el?.closest('.cal-month');if(month&&!month.open)month.open=true}
document.addEventListener('dragenter',e=>{if(draggedDay)expandMonth(e.target)});
let finger=null,ignoreTapUntil=0;
document.addEventListener('pointerdown',e=>{
 if(e.pointerType==='mouse'||!e.target.closest('.drag-grip'))return;
 const btn=e.target.closest('[data-cal-day]');finger={from:btn.dataset.calDay,id:e.pointerId};btn.setPointerCapture(e.pointerId);e.preventDefault();
});
document.addEventListener('pointermove',e=>{
 if(finger?.id!==e.pointerId)return;
 const target=document.elementFromPoint(e.clientX,e.clientY);expandMonth(target);
 document.querySelector('.cal-drop')?.classList.remove('cal-drop');target?.closest('[data-cal-day]')?.classList.add('cal-drop');
 if(e.clientY<70||e.clientY>innerHeight-70)window.scrollBy(0,e.clientY<70?-18:18);
});
document.addEventListener('pointerup',e=>{
 if(finger?.id!==e.pointerId)return;const from=finger.from;finger=null;ignoreTapUntil=Date.now()+400;
 document.querySelector('.cal-drop')?.classList.remove('cal-drop');moveBooking(from,document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-cal-day]')?.dataset.calDay);
});
document.addEventListener('pointercancel',()=>{finger=null;document.querySelector('.cal-drop')?.classList.remove('cal-drop')});
document.addEventListener('submit',e=>{
 if(e.target.id!=='plan-edit'||role!=='student')return;e.preventDefault();
 const form=e.target.elements,to=form.day.value;
 if(to!==planDay&&yearPlan(data(),person(),planYear)[to])return occupied();
 changePlan((map,m)=>{if(to!==planDay)moveDayReflection(m,planDay,to);delete map[planDay];map[to]={type:form.namedItem('type').value,activities:Array.from(e.target.querySelectorAll('[name=activities]:checked'),x=>Number(x.value)),note:form.note.value.trim(),saved:true}});dialog.close();render();tell(t('Praxe je uložená v kalendáři.','Prax je uložená v kalendári.'));
});

function reflectionChoices(){return [t('Potřebuji ukázku','Potrebujem ukážku'),t('Zvládám s připomenutím','Zvládam s pripomenutím'),t('Zvládám samostatně','Zvládam samostatne')]}
function reflectionBody(r){
 return '<p><b>'+t('Co se při práci stalo?','Čo sa pri práci stalo?')+'</b><br>'+html(r.event)+'</p><p><b>'+t('Jak jsem si vedl/a?','Ako sa mi darilo?')+'</b><br>'+html(reflectionChoices()[r.rating]||'')+'</p>'+(r.next?'<p>'+t('Příště','Nabudúce')+' · '+html(r.next)+'</p>':'');
}
function reflectDay(d){
 guard(role==='student');const r=data().dailyReflections?.[d]||{};
 const events=taskOptions(),steps=[t('Zkontroluji postup před směnou','Skontrolujem postup pred zmenou'),t('Požádám o ukázku','Požiadam o ukážku'),t('Zkusím to samostatně','Skúsim to samostatne')];
 const choices=(arr,old)=>[...new Set([...arr,...(old?[old]:[])])].map(v=>[v,v]);
 newModal(()=>'<h2 id="dialogtitle">'+html(dateLabel(d))+' · '+t('Reflexe dne','Reflexia dňa')+'</h2><form id="daily-reflect" data-date="'+html(d)+'"><fieldset><legend>'+t('Čemu jsem se věnoval/a?','Čomu som sa venoval/a?')+'</legend>'+picks('event',choices(events,r.event),[r.event])+'</fieldset><fieldset><legend>'+t('Jak samostatně jsem pracoval/a?','Ako samostatne som pracoval/a?')+'</legend>'+picks('rating',reflectionChoices().map((v,i)=>[i,v]),[String(r.rating)])+'</fieldset><fieldset><legend>'+t('Co zkusím příště?','Čo skúsim nabudúce?')+'</legend>'+picks('next',choices(steps,r.next),[r.next])+'</fieldset><p role="alert" data-ref-error></p><button class="button primary">'+t('Uložit reflexi','Uložiť reflexiu')+'</button> <button type="button" data-plan-close class="button">'+t('Zavřít','Zavrieť')+'</button></form>');

}
document.addEventListener('submit',e=>{
 const form=e.target;if(form.id!=='daily-reflect'||role!=='student')return;e.preventDefault();
 const v=form.elements;if(!v.event.value||v.rating.value===''){form.querySelector('[data-ref-error]').textContent=t('Vyberte činnost a míru samostatnosti.','Vyberte činnosť a mieru samostatnosti.');return}mutate(m=>{m.dailyReflections||={};m.dailyReflections[form.dataset.date]={event:v.event.value.trim(),rating:Number(v.rating.value),next:v.next.value.trim()}});
 dialog.close();render();tell(t('Reflexe je uložená v deníku.','Reflexia je uložená v denníku.'));
});
function journalSearch(){
 let rows=[];const profiles=role==='student'?[person()]:PEOPLE;
 for(const p of profiles){
  for(const [day,entries] of collectJournal(p,data(p))){
   for(const e of entries){
    const box=document.createElement('div');box.innerHTML=e.body;
    box.querySelectorAll('button,form,audio,img').forEach(node=>node.remove());
    const display=box.textContent.trim(),[y,m,d]=day.split('-');
    rows.push({day,title:p.name+' · '+e.label,text:display,terms:[day,Number(d)+'.'+Number(m)+'.'+y,dateLabel(day),p.name,e.label,display].join(' ')});
   }
  }
 }
 rows.sort((a,b)=>b.day.localeCompare(a.day));
 newModal(()=>'<h2 id="dialogtitle">'+t('Hledat v deníku a reflexích','Hľadať v denníku a reflexiách')+'</h2><label>'+t('Datum, jméno nebo slovo','Dátum, meno alebo slovo')+'<input id="journal-query" type="search" autocomplete="off"></label><label>'+t('Přesné datum','Presný dátum')+'<input id="journal-date" type="date"></label><div id="journal-hits" aria-live="polite"></div><button class="button" data-plan-close>'+t('Zavřít','Zavrieť')+'</button>');
 const normalize=s=>s.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const q=dialog.querySelector('#journal-query'),dt=dialog.querySelector('#journal-date'),out=dialog.querySelector('#journal-hits');
 function match(){
  const words=normalize(q.value).trim().split(/\s+/).filter(Boolean);
  if(!words.length&&!dt.value){out.textContent='';return}
  const hits=rows.filter(r=>(!dt.value||dt.value===r.day)&&words.every(w=>normalize(r.terms).includes(w)));
  out.innerHTML='<p>'+t('Počet výsledků','Počet výsledkov')+' · '+hits.length+'</p>'+hits.map(r=>'<details><summary>'+html(dateLabel(r.day)+' · '+r.title)+'</summary><p>'+html(r.text)+'</p></details>').join('');
 }
 q.oninput=dt.oninput=match;q.focus();
}

function teacherPlanNotes(m,p){const rows=[];for(const [d,r] of Object.entries(m.dailyReflections||{}))rows.push('<h3>'+html(dateLabel(d))+'</h3>'+reflectionBody(r));planJournal(m,p,(day,label,body)=>rows.push('<h3>'+html(dateLabel(day)+' · '+label)+'</h3>'+body));return rows.join('')}
window.addEventListener('hashchange',()=>renderSharedEntry(true));
renderSharedEntry();
