'use strict';

function serviceExercise(p, shift) {
  if (shift.code !== DEFAULT_CODE[p.track]) return null;
  if (p.track === 'cook') {
    return {
      heading: t('Můžou oba talíře na výdej?', 'Môžu ísť oba taniere na výdaj?'),
      situation: t('Dva hosté si objednali stejné jídlo. První porci už máte podle vzoru. Co uděláte s druhou těsně před výdejem?', 'Dvaja hostia si objednali rovnaké jedlo. Prvú porciu už máte podľa vzoru. Čo urobíte s druhou tesne pred výdajom?'),
      image: 'photos/ema-3.webp',
      alt: t('Kuchařka upravuje druhý ze dvou talířů pečené mrkve na výdeji.', 'Kuchárka upravuje druhý z dvoch tanierov pečenej mrkvy na výdaji.'),
      answers: [
        [t('Doladím bylinky na druhém talíři.', 'Doladím bylinky na druhom tanieri.'), t('Ozdoba je poslední detail. Hosté si ale všimnou i rozdílu ve velikosti porcí. Jak zkontrolujete obě najednou?', 'Ozdoba je posledný detail. Hostia si však všimnú aj rozdiel vo veľkosti porcií. Ako skontrolujete obe naraz?')],
        [t('Položím talíře vedle sebe a porovnám porce.', 'Položím taniere vedľa seba a porovnám porcie.'), t('Přesně. Vedle sebe snadno porovnáte množství mrkve i její polohu vůči pyré. Nakonec očima zkontrolujte oba okraje.', 'Presne. Vedľa seba ľahko porovnáte množstvo mrkvy aj jej polohu voči pyré. Nakoniec pohľadom skontrolujte oba okraje.')],
        [t('Zkontroluji, že je okraj druhého talíře čistý.', 'Skontrolujem, či je okraj druhého taniera čistý.'), t('Čistý okraj patří k výdeji. Ještě ale chcete vědět, jestli oba hosté dostanou srovnatelné porce. Co vám to ukáže?', 'Čistý okraj patrí k výdaju. Ešte však chcete vedieť, či obaja hostia dostanú porovnateľné porcie. Čo vám to ukáže?')]
      ],
      best: 1
    };
  }
  return {
    heading: t('Host ještě vybírá. Co řeknete?', 'Hosť si ešte vyberá. Čo poviete?'),
    situation: t('Přicházíte ke stolu s vodou. Jeden host zavře jídelní lístek, druhý v něm ještě listuje. Jak zahájíte obsluhu?', 'Prichádzate k stolu s vodou. Jeden hosť zatvorí jedálny lístok, druhý v ňom ešte listuje. Ako začnete obsluhu?'),
    image: 'assets/service-3.webp',
    alt: t('Číšník s karafou u stolu se dvěma hosty.', 'Čašník s karafou pri stole s dvoma hosťami.'),
    answers: [
      [t('„Dobrý den, mohu vám nabídnout vodu a nechat ještě chvilku na výběr?“', '„Dobrý deň, môžem vám ponúknuť vodu a nechať ešte chvíľku na výber?“'), t('Ano. Nabídka vody dá oběma hostům prostor. Počkejte na odpověď a teprve potom začněte nalévat.', 'Áno. Ponuka vody dá obom hosťom priestor. Počkajte na odpoveď a až potom začnite nalievať.')],
      [t('„Dobrý den, už víte, co si oba objednáte?“', '„Dobrý deň, už viete, čo si obaja objednáte?“'), t('Jeden host ještě vybírá. Přímá otázka na objednávku ho může uspěchat. Jak nabídnete první službu a zároveň mu necháte čas?', 'Jeden hosť si ešte vyberá. Priama otázka na objednávku ho môže uponáhľať. Ako ponúknete prvú službu a zároveň mu necháte čas?')],
      [t('„Dobrý den, zastavím se, až budete mít vybráno.“', '„Dobrý deň, zastavím sa, keď už budete mať vybraté.“'), t('Čas na výběr je dobrý začátek. Vodu však máte u sebe a můžete ji nabídnout už teď. Jak byste obojí spojili?', 'Čas na výber je dobrý začiatok. Vodu však máte pri sebe a môžete ju ponúknuť už teraz. Ako by ste oboje spojili?')]
    ],
    best: 0
  };
}

const exerciseState = {answer:null};
let morningStep = 'focus';

function shiftRibbon(phase) {
  const stages = [t('Před směnou','Pred zmenou'), t('Na pracovišti','Na pracovisku'), t('Po směně','Po zmene')];
  const active = phase === 0 ? 0 : phase <= 3 ? 1 : 2;
  return '<ol class="shift-ribbon" aria-label="'+t('Průběh směny','Priebeh zmeny')+'">'+stages.map((label, i) =>
    '<li'+(i===active?' aria-current="step"':'')+'><span aria-hidden="true">'+(i<active?'✓':i+1)+'</span>'+html(label)+'</li>'
  ).join('')+'</ol>';
}

function todayBrief(p,s) {
  const info=heroText(p,s);
  const exercise=serviceExercise(p,s);
  const cook=p.track==='cook';
  if(s.phase===0 && exercise && s.warmupDone) {
    return {head:t('Dolaďte přípravu na směnu.','Dolaďte prípravu na zmenu.'),text:hasNote(s.notes.before)?t('Váš cíl je v deníku. Zbývá krátká situace k bezpečnosti na pracovišti.','Váš cieľ je v denníku. Zostáva krátka situácia k bezpečnosti na pracovisku.'):t('Nácvik máte za sebou. Vyberte si jeden vlastní cíl a vyřešte krátkou situaci k bezpečnosti.','Nácvik máte za sebou. Vyberte si jeden vlastný cieľ a vyriešte krátku situáciu k bezpečnosti.'),cta:t('Dokončit ranní přípravu','Dokončiť rannú prípravu'),act:'step',val:'prepare',duration:''};
  }
  if(s.phase===0 && exercise) {
    return {
      head:cook?t('Dva talíře pro jeden stůl.','Dva taniere pre jeden stôl.'):t('Ke stolu přišli dva hosté.','K stolu prišli dvaja hostia.'),
      text:cook?t('Dnes budete vydávat pečenou mrkev pro dva hosty. Ještě cestou si na fotce vyzkoušejte, co pohlídat, aby oba dostali stejně pěknou porci.','Dnes budete vydávať pečenú mrkvu pre dvoch hostí. Ešte cestou si na fotke vyskúšajte, čo si postrážiť, aby obaja dostali rovnako peknú porciu.'):t('Dnes prostřete pro dva a nabídnete vodu. Cestou si vyzkoušejte, jak oslovit hosta, který ještě vybírá.','Dnes prestriete pre dvoch a ponúknete vodu. Cestou si vyskúšajte, ako osloviť hosťa, ktorý si ešte vyberá.'),
      cta:cook?t('Zkusit první výdej','Skúsiť prvý výdaj'):t('Zkusit oslovení hosta','Skúsiť oslovenie hosťa'),
      act:'exercise', val:'', duration:t('Nanečisto · asi 1 min','Nanečisto · asi 1 min')
    };
  }
  const destinations=['prepare','arrive','observed','finish','reflect','journal','portfolio','reflect'];
  const steps=[
    t('Vyberte si dnešní cíl.','Vyberte si dnešný cieľ.'),t('Jste na místě?','Ste na mieste?'),t('Teď sledujte mistra.','Teraz sledujte majstra.'),
    cook?t('Teď je výdej na vás.','Teraz je výdaj na vás.'):t('Teď obsluhujete vy.','Teraz obsluhujete vy.'),
    t('Co si vezmete na příště?','Čo si vezmete nabudúce?'),t('Váš zápis je u mistra.','Váš zápis je u majstra.'),
    t('Tuhle práci už umíte doložit.','Túto prácu už viete doložiť.'),info[0]
  ];
  const text=s.phase===2 && exercise?(cook?t('Postavte se k výdeji vedle pedagoga. Sledujte, jak porovná obě porce a co upraví jako poslední.','Postavte sa k výdaju vedľa pedagóga. Sledujte, ako porovná obe porcie a čo upraví ako posledné.'):t('Sledujte s pedagogem příchod ke stolu, pozdrav a nabídnutí vody. Po ukázce si vezmete druhý stůl vy.','Sledujte s pedagógom príchod k stolu, pozdrav a ponuku vody. Po ukážke si vezmete druhý stôl vy.')):info[1];
  return {head:exercise?steps[s.phase]:info[0],text,cta:info[2],act:'step',val:destinations[s.phase],duration:''};
}

function todayTutor(){
  const p=person(), model=data(), s=model.shift, n=s.phase, brief=todayBrief(p,s);
  const currentName=stageLabels()[n];
  const img=picture(p,n);
  const support=n===3?goBtn('during',t('Potřebuji radu / přidat postřeh','Potrebujem radu / pridať postreh'),'side-action'):n<=2?action('tip',t('Ukázat pracovní vzor','Ukázať pracovný vzor'),'result','side-action'):'';
  const skill=competency(s.code);
  const inset=n===0&&serviceExercise(p,s)?'<div class="preview-photo">'+photo(p.track==='cook'?'photos/plate.webp':'photos/table.webp',p.track==='cook'?t('Vzor porce pečené mrkve','Vzor porcie pečenej mrkvy'):t('Vzor stolu pro dva hosty','Vzor stola pre dvoch hostí'))+'<small>'+t('Dnešní zadání','Dnešné zadanie')+'</small></div>':'';
  return '<div class="shift-meta"><strong>'+html(p.name)+' <span>/</span> '+html(profession(p))+'</strong><span>'+html(relativeDate(s.day))+' · '+html(station(p))+' · 08:00</span></div>'+
    '<section class="shift-hero"><div class="shift-story"><div class="shift-kicker"><i></i>'+html(currentName)+'</div>'+
    '<h1>'+html(brief.head)+'</h1><p>'+html(brief.text)+'</p>'+
    (studentStyle?'<small class="peer-line">'+(p.track==='cook'?t('Výdej máte v rukou.','Výdaj máte v rukách.'):t('Dobrý servis začíná u vás.','Dobrý servis sa začína pri vás.'))+'</small>':'')+
    '<div class="shift-action">'+primary(brief.cta,brief.act,brief.val)+(brief.duration?'<small>'+html(brief.duration)+'</small>':'')+'</div></div>'+
    '<figure class="shift-visual">'+photo(img,p.name+' · '+photoCaption(p,n))+'<figcaption>'+html(photoCaption(p,n))+'</figcaption>'+inset+'</figure></section>'+
    shiftRibbon(n)+
    '<div class="shift-tools"><div>'+sectionHead(t('Po ruce na směně','Poruke na zmene'))+'</div>'+support+'</div>'+
    trail(p,s)+
    '<section class="journey"><div><span class="ey">'+t('Moje cesta k profesi','Moja cesta k profesii')+'</span><strong>'+html(skill.name)+'</strong><span>'+t('Dnešní cíl','Dnešný cieľ')+' · '+t('úroveň ')+s.level+'</span></div>'+goBtn('path',earned(model)+' / '+skillSet(p).length+' '+t('dovedností','zručností')+' →','progress-link')+'</section>'+
    photoWay(p,s);
}

function exercisePage(){
  const p=person(),s=data().shift,ex=serviceExercise(p,s);
  if(!ex)return todayTutor();
  const picked=exerciseState.answer;
  const solved=picked===ex.best;
  const parts=ex.answers.map(([answer],i)=>'<button type="button" data-do="answer-exercise" data-value="'+i+'" class="exercise-choice" aria-pressed="'+(i===picked)+'"><span aria-hidden="true">'+['A','B','C'][i]+'</span>'+html(answer)+'</button>').join('');
  let response='';
  if(picked!==null) {
    response='<div class="answer-reply '+(solved?'right':'retry')+'" role="status" tabindex="-1"><b>'+t('Mistr','Majster')+'</b><p>'+html(ex.answers[picked][1])+'</p></div>';
    if(solved) response+=primary(s.phase===0?t('Vybrat si cíl na směnu','Vybrať si cieľ na zmenu'):t('Zpět k mé směně','Späť k mojej zmene'),'finish-exercise');
  }
  return back()+'<div class="exercise-title"><span class="shift-kicker">'+t('Nácvik nanečisto · asi 1 min','Nácvik nanečisto · asi 1 min')+'</span><h1>'+html(ex.heading)+'</h1></div>'+
    '<div class="exercise-layout"><figure>'+photo(ex.image,ex.alt)+'</figure><section><p class="scenario">'+html(ex.situation)+'</p><div class="exercise-choices">'+parts+'</div>'+response+'</section></div>';
}

function morningPage(){
  const p=person(),s=data().shift,n=s.notes.before,cook=p.track==='cook';
  if(morningStep==='safety'&&!hasNote(n))morningStep='focus';
  const safety=morningStep==='safety';
  const question=safety?(cook?t('Na cestě na výdej je mokrá podlaha. Co uděláte?','Na ceste na výdaj je mokrá podlaha. Čo urobíte?'):t('Sklenice má odštípnutý okraj. Co uděláte?','Pohár má odštiepený okraj. Čo urobíte?')):t('Co si dnes chcete pohlídat?','Čo si dnes chcete postrážiť?');
  const choicesSafety=cook?[t('Zastavím se a upozorním pedagoga.','Zastavím sa a upozorním pedagóga.'),t('Projdu s talíři co nejrychleji.','Prejdem s taniermi čo najrýchlejšie.')]:[t('Otočím sklenici druhou stranou.','Otočím pohár druhou stranou.'),t('Vyřadím ji a upozorním pedagoga.','Vyradím ho a upozorním pedagóga.')];
  const ready=hasNote(n)&&s.quiz;
  const quizMarkup='<div class="choices">'+choicesSafety.map((label,i)=>action('quiz',label,String(i),'choice','aria-pressed="'+(s.quiz&&i===(cook?0:1))+'"')).join('')+'</div>'+
    (s.quiz?'<p class="success">'+t('Správně. Na místě projdete s pedagogem pravidla svého stanoviště.','Správne. Na mieste si s pedagógom prejdete pravidlá svojho stanovišťa.')+'</p>':quizError?'<p class="warning">'+t('Zkuste to znovu. Nejdřív zabraňte tomu, aby někdo přišel k úrazu.','Skúste to znova. Najprv zabráňte tomu, aby sa niekto zranil.')+'</p>':'');
  const own='<details class="own-note" '+((n.audio||loc(n.text)||audioSession)?'open':'')+'><summary>'+t('Raději odpovím vlastními slovy','Radšej odpoviem vlastnými slovami')+'</summary><label>'+t('Můj postřeh','Môj postreh')+'<textarea data-note="before" maxlength="1000">'+html(loc(n.text))+'</textarea></label>'+recordingControl('before',n)+mediaMarkup(n)+'</details>';
  return (safety?action('morning-back','← '+t('Můj cíl','Môj cieľ'),'','back'):back())+
    '<div class="exercise-title"><span class="shift-kicker">'+(safety?t('Před směnou · 2 ze 2 · bezpečí','Pred zmenou · 2 z 2 · bezpečnosť'):t('Před směnou · 1 ze 2 · můj cíl','Pred zmenou · 1 z 2 · môj cieľ'))+'</span><h1>'+html(question)+'</h1></div>'+
    '<div class="morning-layout"><section>'+(s.hint&&!safety?'<p class="callout"><b>'+roleLabel('teacher')+'</b> '+html(s.hint)+'</p>':'')+
    (safety?quizMarkup:'<p>'+t('Vyberte jeden detail. Po směně se k němu vrátíte v deníku.','Vyberte si jeden detail. Po zmene sa k nemu vrátite v denníku.')+'</p>'+choices(p,s,'before',n.choice,'choice')+own)+
    '<div class="actions">'+(safety?action('save-note',t('Dokončit přípravu','Dokončiť prípravu'),'before','button primary arrow','data-save '+(ready?'':'disabled')):action('morning-next',t('Pokračovat k bezpečnosti','Pokračovať k bezpečnosti'),'','button primary arrow','data-focus-next '+(hasNote(n)?'':'disabled')))+'</div></section>'+
    '<aside class="brief-aside">'+photo(picture(p,safety?1:3),p.name+' · '+photoCaption(p,safety?1:3))+'<b>'+html(courseTitle(p,s))+'</b>'+action('listen',t('Poslechnout zadání','Vypočuť si zadanie'),'','text-link')+'</aside></div>';
}
