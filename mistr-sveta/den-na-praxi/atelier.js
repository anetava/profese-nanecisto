'use strict';
const root=document.querySelector('#app'), dialog=document.querySelector('#picker'), outlet=document.querySelector('#message');
const scopedKey=id=>'mistr-sveta.atelier.1.'+id;
const sessionCache=new Map();
let language='cs', studentId='ema', role='student', view='day', hintStage='', rosterFilter='all', selectedCode='';
let studentStyle=false;
let audioSession=null, busy=false, noticeTimer=0, classroomSettings={title:'Gastro ateliér',lang:'cs'}, hasStorage=true, quizError=false;
const allRoles=['student','teacher','leader','admin'];
try{const s=JSON.parse(localStorage.getItem(scopedKey('settings'))||'null');if(s)classroomSettings=s;
 studentStyle=localStorage.getItem(scopedKey('student-style'))==='on';language=localStorage.getItem(scopedKey('language'))||classroomSettings.lang||'cs';studentId=localStorage.getItem(scopedKey('profile'))||'ema';
}catch{hasStorage=false}
if(!['cs','sk'].includes(language))language='cs';
if(!PEOPLE.some(p=>p.id===studentId))studentId='ema';
const t=(cs,sk=cs)=>language==='sk'?sk:cs;
const loc=x=>Array.isArray(x)?x[language==='sk'?1:0]:String(x??'');
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
function go(page){if(busy||audioSession){tell(t('Nejdřív dokončete záznam.','Najskôr dokončite záznam.'));return}window.speechSynthesis?.cancel();if(page!=='exercise'&&['#vydej','#obsluha','#po-smene','#moje-portfolio'].includes(window.location?.hash))window.history.replaceState(null,'',window.location.pathname+window.location.search);view=page;quizError=false;render(true)}
function scenes(p){const folder=p.full&&p.id!=='ema'?'assets/':'photos/';const n=p.full?6:3;return Array.from({length:n},(_,i)=>folder+p.photo+'-'+i+'.webp')}
function picture(p,phase){const images=scenes(p);const idx=p.full?[0,1,2,3,4,5,3,5][phase]:[0,0,1,1,2,2,1,2][phase];return images[idx]}
function face(p){return scenes(p)[0]}
const photo=(path,alt,cls='')=>'<img class="'+cls+'" src="'+html(path)+'" alt="'+html(alt)+'" decoding="async">';
const action=(name,label,value='',cls='button',attrs='')=>'<button type="button" class="'+cls+'" data-do="'+name+'" data-value="'+html(value)+'" '+attrs+'>'+html(label)+'</button>';
const goBtn=(v,label,cls='button')=>action('go',label,v,cls);
const pill=(label,cls='')=>'<span class="pill '+cls+'">'+html(label)+'</span>';
const labelsNav=()=>({day:t('Dnes'),path:t('Moje cesta','Moja cesta'),journal:t('Deník','Denník'),portfolio:t('Portfolio','Portfólio'),group:t('Moje skupina','Moja skupina'),overview:t('Přehled výcviku','Prehľad výcviku'),admin:t('Správa ukázky','Správa ukážky')});
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
 const items=role==='student'?['day','path','journal','portfolio']:role==='teacher'?['group']:role==='leader'?['overview']:['admin'];
 const active=['prepare','reflect','tip','during','exercise','summary'].includes(view)?'day':view==='employer'?'portfolio':view==='skill'?'path':view==='inspect'?'group':view;
 return '<header class="bar"><div class="shell bar-inner">'+'<button type="button" class="wordmark" data-do="home"><span>MISTR SVĚTA<span aria-hidden="true">.</span></span><small>'+t('Průvodce odborným výcvikem','Sprievodca odborným výcvikom')+'</small></button>'+'<nav aria-label="'+t('Hlavní navigace','Hlavná navigácia')+'">'+items.map(k=>action('go',labelsNav()[k],k,'nav-link',active===k?'aria-current="page"':'')).join('')+'</nav><div class="bar-tools">'+action('lang',language==='cs'?'SK':'CZ','','language','aria-label="'+t('Přepnout do slovenštiny','Prepnúť do češtiny')+'"')+'<button class="profile-btn" data-do="accounts" aria-haspopup="dialog">'+(role==='student'?photo(face(person()),'','avatar'):'')+'<span>'+html(role==='student'?person().name:roleLabel(role))+'</span><b aria-hidden="true">⌄</b></button></div></div></header>';
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
 const img=mentor?(p.track==='cook'?'photos/chef-mentor.webp':'photos/service-mentor.webp'):!defaultTask?picture(p,3):p.track==='cook'?'photos/plate.webp':'photos/table.webp';
 const guideText=guide(p,s);
 const headline=mentor?(p.track==='cook'?t('Nejdřív porovnejte, potom dolaďte','Najskôr porovnajte, potom dolaďte'):t('Všímejte si hosta při příchodu','Všímajte si hosťa pri príchode')):guideText[0];
 return back()+title(mentor?t('Učím se od mistra','Učím sa od majstra'):t('Našeptávač','Našepkávač'),headline)+'<div class="editorial">'+photo(img,mentor?t('Ilustrační ukázka vedení na pracovišti','Ilustračná ukážka vedenia na pracovisku'):headline)+'<div><h2>'+t('Čeho si všimnout','Čo si všimnúť')+'</h2><p>'+html(mentor?(p.track==='cook'?t('Sledujte, který detail mistryně ukáže jako první. U vlastního talíře začněte stejnou kontrolou.','Sledujte, na ktorý detail majsterka ukáže ako prvý. Pri vlastnom tanieri začnite rovnakou kontrolou.'):t('Sledujte vzdálenost od stolu. Nechte hosta v klidu dosednout a navázat oční kontakt.','Sledujte vzdialenosť od stola. Nechajte hosťa v pokoji si sadnúť a nadviazať očný kontakt.')):guideText[1])+'</p><p>'+html(guideText[2])+'</p>'+
 (mentor?'<details><summary>'+t('Profese v zahraničí','Profesia v zahraničí')+'</summary>'+ (p.track==='cook'?'<p>'+t('Absolventka ICE Mashama Bailey získala v roce 2022 cenu James Beard Outstanding Chef. Jakou surovinu z domova byste chtěli jednou ukázat na vlastním talíři?','Absolventka ICE Mashama Bailey získala v roku 2022 cenu James Beard Outstanding Chef. Ktorú surovinu z domu by ste raz chceli ukázať na vlastnom tanieri?')+'</p><a href="https://www.ice.edu/newyork/explore-ice/alumni-profiles/mashama-bailey" target="_blank" rel="noopener">Mashama Bailey · ICE ↗</a>':'<p>'+t('Na Culinary Institute of America získávají studenti praxi v restauracích otevřených hostům. Co chcete, aby si host zapamatoval z vaší obsluhy?','Na Culinary Institute of America získavajú študenti prax v reštauráciách otvorených hosťom. Čo chcete, aby si hosť zapamätal z vašej obsluhy?')+'</p><a href="https://www.ciachef.edu/" target="_blank" rel="noopener">Culinary Institute of America ↗</a>')+'</details>':'')+
 '<div class="actions">'+goBtn('day',t('Zpět k dnešní směně','Späť k dnešnej zmene'),'button primary')+'</div></div></div>';
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
function journalPage(){
 const p=person(),m=data(),s=m.shift;
 return title(p.name,t('Můj deník','Môj denník'),t('Vaše postřehy před prací, během ní a po ní.','Vaše postrehy pred prácou, počas nej a po nej.'))+
 '<div class="journal-layout"><div><h2>'+html(courseTitle(p,s))+'</h2><p class="meta">'+relativeDate(s.day)+' · '+html(stageLabels()[s.phase])+'</p>'+notesFor(p,s)+reviewHistory(s)+(s.phase===3?goBtn('during',t('Přidat postřeh','Pridať postreh')):'')+(s.phase===4||s.phase===7?goBtn('reflect',t('Otevřít reflexi','Otvoriť reflexiu')):'')+
 pastJournal(p,m)+'</div>'+photo(scenes(p).at(-1),p.name+' · '+period('after'),'journal-photo')+'</div>';
}
function pastJournal(p,m){
 const seen=new Set([m.shift.id]);
 const arr=[...m.finished.slice().reverse(),...m.history.slice().reverse()].filter(a=>{if(seen.has(a.id))return false;seen.add(a.id);return true});
 return arr.length?sectionHead(t('Předchozí směny','Predchádzajúce zmeny'))+arr.map(s=>'<details><summary>'+html(dateLabel(s.day)+' · '+competency(s.code).name)+'</summary>'+notesFor(p,s)+(s.reviews?reviewHistory(s):'<p>'+html(feedbackText(s))+'</p>')+'</details>').join(''):'';
}
function reviewHistory(s){return (s.reviews||[]).map(r=>'<div class="entry review"><b>'+t('Pedagog','Pedagóg')+' · '+html(r.result==='approved'?t('potvrzeno','potvrdené'):t('k doplnění','na doplnenie'))+'</b><p>'+html(feedbackText(r))+'</p>'+mediaMarkup({audio:r.audio})+'</div>').join('')}
function skillRow(c,m){const n=maxLevel(m,c.code);return '<button class="skill-row" data-do="detail" data-value="'+c.code+'"><span><b>'+html(c.name)+'</b><small>'+html(c.domain)+'</small></span><strong>'+(n?n+' / 3':t('K nácviku','Na nácvik'))+' <i>›</i></strong></button>'}
function pathPage(){
 const p=person(),m=data(),s=m.shift,skills=skillSet(p);
 return title(p.name+' · '+profession(p),t('Moje cesta k profesi','Moja cesta k profesii'))+'<div class="path-top"><div><span class="ey">'+t('Profil absolventa','Profil absolventa')+'</span><h2>'+html(p.track==='cook'?t('Od přípravy surovin k samostatnému výdeji','Od prípravy surovín k samostatnému výdaju'):t('Od prvního prostření k samostatné obsluze','Od prvého prestierania k samostatnej obsluhe'))+'</h2><p>'+t('Pedagog potvrzuje úroveň podle práce, kterou jste předvedli. Každé potvrzení najdete ve svém portfoliu.','Pedagóg potvrdzuje úroveň podľa práce, ktorú ste predviedli. Každé potvrdenie nájdete vo svojom portfóliu.')+'</p><b>'+earned(m)+' / '+skills.length+' '+t('potvrzených dovedností','potvrdených zručností')+'</b><progress value="'+earned(m)+'" max="'+skills.length+'"></progress></div>'+photo(picture(p,3),p.name+' · '+profession(p))+'</div>'+
 sectionHead(t('Na čem právě pracujete','Na čom práve pracujete'))+skillRow(competency(s.code),m)+
 '<details><summary>'+t('Otevřít všechny dovednosti mého oboru','Otvoriť všetky zručnosti môjho odboru')+' ('+skills.length+')</summary>'+skills.map(c=>skillRow(c,m)).join('')+'</details>'+
 '<details><summary>'+t('Výukové moduly a profil celého oboru','Výučbové moduly a profil celého odboru')+'</summary>'+cat().modules.map(mod=>'<details><summary>'+html(mod.id+' · '+mod.title)+'</summary><p>'+html(mod.description)+'</p>'+cat().competencies.filter(c=>c.module===mod.id).map(c=>skillRow(c,m)).join('')+'</details>').join('')+'<a href="archiv.html">'+t('Otevřít další aktivity původní akademie','Otvoriť ďalšie aktivity pôvodnej akadémie')+' ↗</a></details>';
}
function skillPage(){
 const p=person(),m=data(),s=m.shift,c=competency(selectedCode)||competency(s.code),mod=moduleInfo(c.code),earnedLevel=maxLevel(m,c.code);
 return back('path')+title(mod.id+' · '+mod.title,c.name,c.goal)+(s.code===c.code?'<section class="practice-record"><span class="ey">'+html(progressState(s))+'</span><h2>'+html(courseTitle(p,s))+'</h2><p>'+html(learnerOutcome(s))+'</p>'+personalEvidence(s)+(s.phase>=4?goBtn('summary',t('Celá směna','Celá zmena')):'')+'</section>':'')+sectionHead(t('Tři úrovně dovednosti','Tri úrovne zručnosti'))+c.levels.map((x,i)=>'<div class="entry"><span class="ey">'+t('Úroveň ')+(i+1)+'</span><h3>'+html(x)+'</h3><p>'+html(c.tasks[i])+'</p>'+(earnedLevel>i?pill(t('Potvrzeno pedagogem','Potvrdené pedagógom'),'green'):s.code===c.code&&s.level===i+1?pill(t('Aktuální cíl','Aktuálny cieľ')):'')+'</div>').join('')+
 '<details><summary>'+t('Co pedagog pozoruje','Čo pedagóg pozoruje')+'</summary><ul>'+c.checks.map(x=>'<li>'+html(x)+'</li>').join('')+'</ul></details>'+ (s.code===c.code?goBtn('day',t('Zpět na moji směnu','Späť na moju zmenu'),'button primary'):'');
}
function portfolio(){
 const p=person(),m=data();
 return title(p.name+' · '+profession(p),t('Moje portfolio','Moje portfólio'),t('Práce, u kterých pedagog potvrdil konkrétní úroveň dovednosti.','Práce, pri ktorých pedagóg potvrdil konkrétnu úroveň zručnosti.'))+(m.shift.phase>=4&&m.shift.phase!==6?'<div class="practice-record no-print"><span class="ey">'+html(progressState(m.shift))+'</span><p>'+html(courseTitle(p,m.shift))+'</p>'+goBtn('summary',t('Moje rozpracovaná směna','Moja rozpracovaná zmena'),'text-link')+'</div>':'')+'<div class="actions no-print">'+goBtn('employer',t('Pro zaměstnavatele','Pre zamestnávateľa'),'button primary')+action('print',t('Tisk / uložit PDF','Tlač / uložiť PDF'),'','button primary')+action('export',t('Stáhnout záznamy','Stiahnuť záznamy'))+'</div><div class="portfolio-list">'+m.history.slice().reverse().map(a=>{
 const c=competency(a.code);return '<article class="portfolio-entry"><div class="ey">'+html(dateLabel(a.day))+' · '+t('Úroveň ')+a.level+'</div><h2>'+html(c.name)+'</h2><p>'+html(c.levels[a.level-1])+'</p><p class="teacher-note">'+html(feedbackText(a))+'</p><small>'+html(a.author)+' · '+t('osobně potvrzeno','osobne potvrdené')+'</small>'+mediaMarkup(a.notes?.after)+mediaMarkup({audio:a.audio})+(a.examplePhoto?'<figure class="sample-evidence">'+photo(a.examplePhoto,t('Modelový doklad práce fiktivního žáka','Modelový doklad práce fiktívneho žiaka'))+'<figcaption>'+t('Modelový doklad práce · ilustrační fotografie','Modelový doklad práce · ilustračná fotografia')+'</figcaption></figure>':'')+'<details><summary>'+t('Kritéria a žákovská reflexe','Kritériá a žiacka reflexia')+'</summary><ul>'+c.checks.map(x=>'<li>'+html(x)+'</li>').join('')+'</ul>'+noteRead(p,a,'after')+'</details></article>';
 }).join('')+'</div>';
}
function asksForHelp(s){return s.phase===3&&s.notes.during.choice===2&&!s.helpSeen}
function group(){
 const waiting=PEOPLE.filter(p=>data(p).shift.phase===5).length;
 const entries=PEOPLE.filter(p=>rosterFilter==='all'||data(p).shift.phase===5).sort((a,b)=>(data(b).shift.phase===5?2:asksForHelp(data(b).shift)?1:0)-(data(a).shift.phase===5?2:asksForHelp(data(a).shift)?1:0));
 return title(classroomSettings.title,t('Moje skupina','Moja skupina'),t('Otevřete žáka a uvidíte jeho zadání, vlastní postřehy i hodnocení.','Otvorte žiaka a uvidíte jeho zadanie, vlastné postrehy aj hodnotenie.'))+
 '<div class="choices filters">'+action('filter',t('Všichni','Všetci')+' · '+PEOPLE.length,'all','choice','aria-pressed="'+(rosterFilter==='all')+'"')+action('filter',t('K posouzení','Na posúdenie')+' · '+waiting,'waiting','choice','aria-pressed="'+(rosterFilter==='waiting')+'"')+'</div><div class="roster">'+entries.map(p=>{const m=data(p),s=m.shift;return '<button class="person-row" data-do="inspect" data-value="'+p.id+'">'+photo(face(p),'','portrait')+'<span class="who"><b>'+p.name+'</b><small>'+profession(p)+' · '+p.year+'. '+t('ročník')+'</small></span><span class="roster-course">'+html(courseTitle(p,s))+'</span>'+pill(asksForHelp(s)?t('Prosí o ukázku','Prosí o ukážku'):shortStages()[s.phase],s.phase===5||asksForHelp(s)?'amber':s.phase===6?'green':'')+'<i>›</i></button>'}).join('')+(!entries.length?'<p>'+t('Všechny odevzdané práce jsou vyřízené.','Všetky odovzdané práce sú vybavené.')+'</p>':'')+'</div>';
}
function inspect(){
 const p=person(),m=data(),s=m.shift,c=competency(s.code),pictures=scenes(p);
 const journal='<details '+(s.phase===5?'open':'')+'><summary>'+t('Deník a sebereflexe','Denník a sebareflexia')+'</summary>'+notesFor(p,s)+pastJournal(p,m)+'</details>';
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
function about(){return '<div class="modal-head"><h2 id="dialogtitle">'+t('O aplikaci','O aplikácii')+'</h2>'+closeBtn()+'</div><p>'+t('MISTR SVĚTA vás provází odborným výcvikem. Vyberete si, co chcete procvičit, vyzkoušíte to při práci a uložíte si zpětnou vazbu pedagoga.','MISTR SVĚTA vás sprevádza odborným výcvikom. Vyberiete si, čo chcete precvičiť, vyskúšate si to pri práci a uložíte si spätnú väzbu pedagóga.')+'</p><p>'+t('Šest fiktivních žáků a ilustrační fotografie vytvořené pomocí AI. Záznamy se ukládají do tohoto prohlížeče.','Šesť fiktívnych žiakov a ilustračné fotografie vytvorené pomocou AI. Záznamy sa ukladajú do tohto prehliadača.')+'</p><p>'+t('Pracovní mapa dovedností vychází z oboru Kuchař–číšník. Konkrétní přiřazení ke školnímu programu ověří škola.','Pracovná mapa zručností vychádza z odboru Kuchár–čašník. Konkrétne priradenie k školskému programu overí škola.')+'</p><a href="https://edu.gov.cz/wp-content/uploads/2022/01/65-51-H01-Kuchar-cisnik.pdf" target="_blank" rel="noopener">RVP 65-51-H/01 ↗</a><p><a href="#po-smene">'+t('Tomáš po směně','Tomáš po zmene')+'</a> · <a href="#moje-portfolio">'+t('Portfolio kuchařky Ley','Portfólio kuchárky Ley')+'</a></p><p><a href="#vydej">'+t('Vyzkoušet kuchyň','Vyskúšať kuchyňu')+'</a> · <a href="#obsluha">'+t('Vyzkoušet obsluhu','Vyskúšať obsluhu')+'</a></p><details><summary>'+t('Zahraniční předlohy průvodce','Zahraničné predlohy sprievodcu')+'</summary><p><a href="https://www.epfl.ch/labs/ml4ed/research/412-2/" target="_blank" rel="noopener">DUAL-T · EPFL ↗</a> — '+t('pracovní deník kuchařského učně a zpětná vazba mistra.','pracovný denník kuchárskeho učňa a spätná väzba majstra.')+'</p><p><a href="https://apprenticeship.rouxbe.com/" target="_blank" rel="noopener">ACF · Rouxbe ↗</a> — '+t('krátká příprava a výkon na pracovišti.','krátka príprava a výkon na pracovisku.')+'</p><p><a href="https://www.rp.edu.sg/industry/solutions/technologies-for-licensing/adaptive-customer-experience-training-system-acets/" target="_blank" rel="noopener">ACETS · Republic Polytechnic ↗</a> — '+t('nácvik interakce s hostem.','nácvik interakcie s hosťom.')+'</p></details><p><a href="archiv.html">'+t('Původní akademie a starší lokální zápisy','Pôvodná akadémia a staršie lokálne zápisy')+' ↗</a></p>'}
function closeBtn(){return action('close','×','','close','aria-label="'+t('Zavřít','Zavrieť')+'"')}
function accountModal(){
 return '<div class="modal-head"><h2 id="dialogtitle">'+t('Přepnout pohled','Prepnúť pohľad')+'</h2>'+closeBtn()+'</div><p class="meta">'+t('Ukázková skupina','Ukážková skupina')+' · '+html(classroomSettings.title)+'</p>'+
 '<div class="role-options">'+allRoles.map(r=>action('role',roleLabel(r),r,'choice','aria-pressed="'+(role===r)+'"')).join('')+'</div>'+
 '<h3>'+t('Žákovské profily','Žiacke profily')+'</h3><div class="person-options">'+PEOPLE.map(p=>'<button data-do="student" data-value="'+p.id+'">'+photo(face(p),'','portrait')+'<span><b>'+p.name+'</b><small>'+profession(p)+'</small></span></button>').join('')+'</div>'+(role==='student'?'<details><summary>'+t('Moje preference','Moje nastavenia')+'</summary>'+action('tone',t('Studentská povzbuzení','Študentské povzbudenia')+' · '+(studentStyle?t('zapnuta','zapnuté'):t('vypnuta','vypnuté')),'','choice','aria-pressed="'+studentStyle+'"')+'</details>':'');
}
const homeFor=()=>({student:'day',teacher:'group',leader:'overview',admin:'admin'})[role];
function render(scroll=false){
 const pages=role==='student'?{day:dayPage,summary:summaryPage,employer:employerPage,prepare:morningPage,exercise:exercisePage,during:()=>noteForm('during'),reflect:()=>noteForm('after'),journal:journalPage,path:pathPage,skill:skillPage,portfolio,tip:tipPage}:role==='teacher'?{group,inspect}:role==='admin'?{admin}:{overview};
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
function switchPerson(id){guard(PEOPLE.some(p=>p.id===id));studentId=id;setPref('profile',id)}
function newModal(f){dialog.innerHTML=f();if(!dialog.open)dialog.showModal()}
function handle(act,val){
 if((audioSession||busy)&&act!=='stop'){tell(t('Nejdřív dokončete záznam.','Najskôr dokončite záznam.'));return}
 switch(act){
 case 'home':go(homeFor());break;
 case 'accounts':newModal(accountModal);break;
 case 'tone':guard(role==='student');studentStyle=!studentStyle;setPref('student-style',studentStyle?'on':'off');render();dialog.close();tell(t('Preference je uložena.','Nastavenie je uložené.'));break;
 case 'listen':{guard(role==='student'&&view==='prepare');const voices=window.speechSynthesis?.getVoices()||[];const v=voices.find(x=>x.localService&&x.lang.toLowerCase().startsWith(language));if(!v){tell(t('V zařízení chybí místní český hlas. Zadání je napsané vedle fotografie.','V zariadení chýba miestny slovenský hlas. Zadanie je napísané pri fotografii.'));break}if(window.speechSynthesis.speaking){window.speechSynthesis.cancel();break}const p=person(),s=data().shift,u=new SpeechSynthesisUtterance([courseTitle(p,s),competency(s.code).tasks[s.level-1],s.hint].filter(Boolean).join('. '));u.voice=v;u.lang=v.lang;window.speechSynthesis.speak(u);break}
 case 'about':newModal(about);break;
 case 'close':dialog.close();break;
 case 'role':guard(allRoles.includes(val));role=val;rosterFilter='all';dialog.close();go(homeFor());break;
 case 'student':switchPerson(val);role='student';dialog.close();go('day');break;
 case 'lang':language=language==='cs'?'sk':'cs';setPref('language',language);render();break;
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
 case 'detail':guard(role==='student'&&!!competency(val));selectedCode=val;go('skill');break;
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
document.addEventListener('submit',e=>{const form=e.target;e.preventDefault();if(busy||audioSession)return;
 try{
 if(form.id==='settingsForm'){guard(role==='admin');const value=form.elements.group.value.trim();guard(value);const lang=form.elements.language.value;guard(['cs','sk'].includes(lang));const newSettings={title:value,lang};if(hasStorage)localStorage.setItem(scopedKey('settings'),JSON.stringify(newSettings));classroomSettings=newSettings;language=lang;setPref('language',lang);render();tell(t('Nastavení je uloženo.','Nastavenia sú uložené.'))}
 if(form.id==='assignForm'){guard(role==='teacher');const code=form.elements.code.value,day=form.elements.date.value;guard(skillSet(person()).some(c=>c.code===code)&&/^\d{4}-\d{2}-\d{2}$/.test(day)&&day>=dayStamp());mutate(m=>{guard(m.shift.phase===6);const level=maxLevel(m,code)+1;guard(level<=3);m.finished.push(m.shift);m.shift=newShift(code,level,day,m.finished.length+1)});render();tell(t('Nový úkol je v profilu žáka.','Nová úloha je v profile žiaka.'))}
 }catch(err){problem(err)}});
window.addEventListener('storage',e=>{if(e.key?.startsWith('mistr-sveta.atelier.1.')&&!busy&&!audioSession){if(e.key===scopedKey('settings')&&e.newValue)classroomSettings=JSON.parse(e.newValue);render()}});
window.addEventListener('pagehide',()=>{if(audioSession){stopVoice();audioSession.stream.getTracks().forEach(x=>x.stop())}});
function openSharedExercise(){
 const hash=window.location?.hash;
 const profile={'#vydej':'ema','#obsluha':'matej','#po-smene':'tomas','#moje-portfolio':'lea'}[hash];
 if(!profile||busy||audioSession)return;
 if(dialog.open)dialog.close();
 switchPerson(profile);role='student';exerciseState.answer=null;
 view=hash==='#moje-portfolio'?'employer':hash==='#po-smene'?(data().shift.phase>=4?'summary':'day'):serviceExercise(person(),data().shift)?'exercise':'day';
}
window.addEventListener('hashchange',()=>{openSharedExercise();render(true)});
openSharedExercise();
render();
