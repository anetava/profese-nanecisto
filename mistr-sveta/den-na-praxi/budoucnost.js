'use strict';

function skillChapters(p) {
  const cook = p.track === 'cook';
  return [
    {id:'specialty', name:cook ? t('Kuchařské dovednosti','Kuchárske zručnosti') : t('Obsluha hostů','Obsluha hostí'), photo:cook ? 'assets/cook-3.webp' : 'assets/service-3.webp', accepts:c => !commonSkill(c)},
    {id:'operations', name:t('Příprava a chod provozu','Príprava a chod prevádzky'), photo:cook ? 'photos/ema-1.webp' : 'photos/table.webp', accepts:c => /^K0[125]\./.test(c.code)},
    {id:'quality', name:t('Kvalita a hospodaření','Kvalita a hospodárenie'), photo:cook ? 'photos/plate.webp' : 'photos/matej-1.webp', accepts:c => /^K(09|10)\./.test(c.code)},
    {id:'graduate',name:t('Práce absolventa','Práca absolventa'),photo:'photos/table.webp',accepts:c=>c.code.startsWith('P')},
    {id:'team', name:t('Spolupráce a samostatná práce','Spolupráca a samostatná práca'), photo:cook ? 'photos/chef-mentor.webp' : 'photos/service-mentor.webp', accepts:() => true}
  ];
}

function portfolioMap(p, model, forecast = false) {
  const skills = skillSet(p);
  const chapters = skillChapters(p).map(chapter => ({...chapter, skills:[]}));
  let complete = 0;
  skills.forEach(skill => {
    const level = forecast ? 3 : maxLevel(model, skill.code);
    if (level === 3) complete++;
    chapters.find(chapter => chapter.accepts(skill)).skills.push({skill, level});
  });
  const levelLabel = t('Úroveň ');
  const groups = chapters.map(chapter => {
    const markers = chapter.skills.map(({level}) => '<i class="map-tile" data-level="' + level + '"></i>').join('');
    const entries = chapter.skills.map(({skill,level}) => '<li>' +
      action('detail',menuSkillName(skill),skill.code,'map-skill-link') +
      '<span>' + (forecast ? t('Cíl 3/3','Cieľ 3/3') : level ? levelLabel + level + '/3' : t('K nácviku','Na nácvik')) + '</span></li>').join('');
    return '<details class="map-group" data-chapter="' + chapter.id + '"><summary><span class="map-group-name">' + html(chapter.name) +
      '</span><span class="map-caret" aria-hidden="true">⌄</span><span class="map-track" aria-hidden="true">' + markers + '</span></summary>' +
      '<ul>' + entries + '</ul></details>';
  }).join('');
  const latest = !forecast && [...model.history].sort((a,b) => b.day.localeCompare(a.day) || b.level-a.level)[0];
  const recentWork = latest ? action('menu-proof',t('Poslední potvrzení','Posledné potvrdenie') + ' · ' +
    menuSkillName(competency(latest.code)) + ' · ' + latest.level + '/3',latest.code,'map-recorded') : '';
  const reached = !forecast && complete === skills.length;
  const evidenceLink = reached
    ? goBtn('employer',t('Ukázat hotové portfolio zaměstnavateli','Ukázať hotové portfólio zamestnávateľovi') + ' →','map-recorded')
    : recentWork;
  const help = forecast
    ? t('Takhle bude moje mapa vypadat, až u každé dovednosti předvedu práci na úrovni 3 a pedagog mi ji potvrdí.',
        'Takto bude moja mapa vyzerať, keď pri každej zručnosti predvediem prácu na úrovni 3 a pedagóg mi ju potvrdí.')
    : t('Jedno políčko je jedna dovednost. Za každou úroveň potvrzenou pedagogem se vybarví třetina.',
        'Jedno políčko je jedna zručnosť. Za každú úroveň potvrdenú pedagógom sa vyfarbí tretina.');
  const modes = [['now',t('Moje práce dnes','Moja práca dnes')],['goal',t('Cíl za tři roky','Cieľ o tri roky')]];
  const switcher = '<div class="map-switch" role="group" aria-label="' + t('Porovnat mapu','Porovnať mapu') + '">' +
    modes.map(([value,label]) => action('map-mode',label,value,'map-mode',
      'aria-pressed="' + (value === (forecast ? 'goal' : 'now')) + '"')).join('') + '</div>';
  return '<section class="skill-map' + (forecast ? ' preview-map' : '') + '" aria-labelledby="map-title">' +
    switcher + '<div class="map-heading"><div><h2 id="map-title">' +
    (reached ? t('Můj cíl v Mistru světa je splněný','Môj cieľ v aplikácii MISTR SVĚTA je splnený') :
      forecast ? t('Mapa v cíli','Mapa v cieli') : t('Moje mapa dovedností','Moja mapa zručností')) +
     '</h2><p>' + html(help) + '</p>' + evidenceLink + '</div><div class="map-count"><strong>' + complete + '<span> / ' + skills.length + '</span></strong><small>' +
    (forecast ? t('cíl na úrovni 3','cieľ na úrovni 3') : t('na úrovni 3')) + '</small></div></div><div class="map-groups">' + groups + '</div><p><a class="map-recorded" href="profil-oboru.html?lang=' + language + '">' + t('Celý obor · 13 oblastí a 44 dovedností','Celý odbor · 13 oblastí a 44 zručností') + ' →</a></p></section>';
}

function switchPortfolioMap(mode) {
  guard(role === 'student' && ['path','portfolio','future'].includes(view) && ['now','goal'].includes(mode));
  const map = document.querySelector('.skill-map');
  if (!map || map.classList.contains('preview-map') === (mode === 'goal')) return;
  const openChapters = Array.from(map.querySelectorAll('.map-group[open]'), node => node.dataset.chapter);
  map.outerHTML = portfolioMap(person(), data(), mode === 'goal');
  for (const group of document.querySelectorAll('.skill-map .map-group')) {
    if (openChapters.includes(group.dataset.chapter)) group.open = true;
  }
  document.querySelector('.map-mode[aria-pressed="true"]')?.focus({preventScroll:true});
}

function openConfirmedMap(code) {
  guard(role==='student' && skillSet(person()).some(c => c.code===code) && maxLevel(data(),code)>0);
  go('path');
  const entry=document.querySelector('.skill-map .map-skill-link[data-value="'+code+'"]');
  const group=entry?.closest('.map-group');
  if (group) {
    group.open=true;
    entry.focus({preventScroll:true});
    group.scrollIntoView({block:'center'});
  }
}

function futureScene(p) {
  const scenes = {
    ema: {
      ambition:t('Chci, aby mi v kuchyni svěřili výdej.','Chcem, aby mi v kuchyni zverili výdaj.'),
      place:t('U výdeje','Pri výdaji'),
      line:t('Dva hosté si objednali stejné jídlo. Položím talíře vedle sebe, porovnám porce a obě najednou předám obsluze.',
        'Dvaja hostia si objednali rovnaké jedlo. Položím taniere vedľa seba, porovnám porcie a obe naraz odovzdám obsluhe.'),
      offer:t('Svěřte mi výdej. Pohlídám, aby hosté u jednoho stolu dostali jídlo společně a teplé.',
        'Zverte mi výdaj. Postrážim, aby hostia pri jednom stole dostali jedlo spoločne a teplé.'),
      proof:t('Ukázala bych fotku dvou porcí a vysvětlila, co jsem na druhém talíři před výdejem upravila.',
        'Ukázala by som fotku dvoch porcií a vysvetlila, čo som na druhom tanieri pred výdajom upravila.'),
      codes:['K09.2','K05.3','K12.2'],
      alt:t('podává kolegyni na výdeji talíř s pečenou zeleninou','podáva kolegyni pri výdaji tanier s pečenou zeleninou')
    },
    dan: {
      ambition:t('Chci si v kuchyni vzít na starost teplé přílohy.','Chcem mať v kuchyni na starosti teplé prílohy.'),
      place:t('U sporáku','Pri sporáku'),
      line:t('Ryba bude hotová za dvě minuty. Ochutnám zeleninu na pánvi a dokončím ji tak, aby na sebe ryba a příloha nečekaly.',
        'Ryba bude hotová o dve minúty. Ochutnám zeleninu na panvici a dokončím ju tak, aby na seba ryba a príloha nečakali.'),
      offer:t('Vezmu si na starost přílohy. Sladím jejich přípravu s kolegou u sporáku i při více objednávkách.',
        'Vezmem si na starosti prílohy. Zladím ich prípravu s kolegom pri sporáku aj pri viacerých objednávkach.'),
      proof:t('Na časovém plánu jedné objednávky bych ukázal, co jsem začal připravovat dřív a proč.',
        'Na časovom pláne jednej objednávky by som ukázal, čo som začal pripravovať skôr a prečo.'),
      codes:['K03.3','K09.1','K05.3'],
      alt:t('obrací zeleninu kleštěmi na pánvi','obracia zeleninu kliešťami na panvici')
    },
    lea: {
      ambition:t('Chci si stát za každým talířem, který vydám.','Chcem si stáť za každým tanierom, ktorý vydám.'),
      place:t('U poslední porce večera','Pri poslednej porcii večera'),
      line:t('Dokončuji poslední talíř bylinkami. I na konci večera má host dostat stejně dobře připravené jídlo jako ten, který přišel první.',
        'Dokončujem posledný tanier bylinkami. Aj na konci večera má hosť dostať rovnako dobre pripravené jedlo ako ten, ktorý prišiel prvý.'),
      offer:t('Pohlídám velikost a úpravu porcí od první objednávky až po poslední.',
        'Postrážim veľkosť a úpravu porcií od prvej objednávky až po poslednú.'),
      proof:t('Porovnala bych dvě fotky stejného jídla ze začátku a konce směny. Ukázala bych, podle čeho jsem kontrolovala výsledek.',
        'Porovnala by som dve fotky rovnakého jedla zo začiatku a konca zmeny. Ukázala by som, podľa čoho som kontrolovala výsledok.'),
      codes:['K09.2','K09.1','K05.3'],
      alt:t('dokončuje pokrm čerstvými bylinkami','dokončuje jedlo čerstvými bylinkami')
    },
    matej: {
      ambition:t('Chci mít v restauraci na starosti vlastní stoly.','Chcem mať v reštaurácii na starosti vlastné stoly.'),
      place:t('U svých prvních stolů','Pri svojich prvých stoloch'),
      line:t('Host váhá mezi dvěma jídly. Zeptám se, na co má chuť, vysvětlím rozdíl a nechám ho v klidu vybrat.',
        'Hosť váha medzi dvoma jedlami. Spýtam sa, na čo má chuť, vysvetlím rozdiel a nechám ho v pokoji vybrať si.'),
      offer:t('Postarám se o vlastní stoly. Když host změní přílohu, předám změnu kuchyni včas.',
        'Postarám sa o vlastné stoly. Keď hosť zmení prílohu, odovzdám zmenu kuchyni včas.'),
      proof:t('Na objednávce bez jména hosta bych ukázal, jak jsem zapsal změnu a ověřil ji s kuchyní.',
        'Na objednávke bez mena hosťa by som ukázal, ako som zapísal zmenu a overil ju s kuchyňou.'),
      codes:['K08.1','K08.2','K06.3'],
      alt:t('představuje hostům otevřený jídelní lístek','predstavuje hosťom otvorený jedálny lístok')
    },
    nora: {
      ambition:t('Chci, aby se hosté u mých stolů cítili vítaní.','Chcem, aby sa hostia pri mojich stoloch cítili vítaní.'),
      place:t('Při večerním servisu','Pri večernom servise'),
      line:t('Přináším hlavní chod. Pamatuji si, kdo si co objednal. Kolegyně přichází s druhým talířem a oba hosté mohou začít jíst společně.',
        'Prinášam hlavný chod. Pamätám si, kto si čo objednal. Kolegyňa prichádza s druhým tanierom a obaja hostia môžu začať jesť spolu.'),
      offer:t('Převezmu servis u plného stolu. Každý host dostane svůj chod a kolegové vědí, co ještě zbývá přinést.',
        'Prevezmem obsluhu pri plnom stole. Každý hosť dostane svoj chod a kolegovia vedia, čo ešte treba priniesť.'),
      proof:t('Na plánku stolu bych vysvětlila, jak jsem si označila jednotlivá jídla a rozdělila podávání s kolegyní.',
        'Na plániku stola by som vysvetlila, ako som si označila jednotlivé jedlá a rozdelila podávanie s kolegyňou.'),
      codes:['K06.2','K09.3','K12.2'],
      alt:t('předkládá hostce hlavní chod','podáva hostke hlavný chod')
    },
    tomas: {
      ambition:t('Chci umět vést servis od přivítání až po poslední kávu.','Chcem vedieť viesť obsluhu od privítania až po poslednú kávu.'),
      place:t('U kávy po obědě','Pri káve po obede'),
      line:t('Po dezertu přináším espresso. Vím, ke komu patří, a hosté mohou v klidu dokončit rozhovor. Kolega mezitím ví, který stůl už je obsloužený.',
        'Po dezerte prinášam espresso. Viem, komu patrí, a hostia môžu v pokoji dokončiť rozhovor. Kolega medzitým vie, ktorý stôl je už obslúžený.'),
      offer:t('Předám rozpracovaný stůl tak, aby další směna věděla, kdo čeká na kávu a kdo už zaplatil.',
        'Odovzdám rozpracovaný stôl tak, aby ďalšia zmena vedela, kto čaká na kávu a kto už zaplatil.'),
      proof:t('Ukázal bych zápis z předání směny a podle něj vysvětlil, co stačilo kolegovi říct, aby mohl pokračovat.',
        'Ukázal by som zápis z odovzdania zmeny a podľa neho vysvetlil, čo stačilo povedať kolegovi, aby mohol pokračovať.'),
      codes:['K07.2','K06.3','K11.2'],
      alt:t('přináší hostům espresso','prináša hosťom espresso')
    }
  };
  return scenes[p.id];
}

function passportIntro(p, model) {
  const s=model.shift, skills=skillSet(p), count=skills.length, scene=futureScene(p);
  const allMastered=skills.every(c => maxLevel(model,c.code)===3);
  const goal=allMastered
    ? t('Všech '+count+' dovedností mám potvrzených na nejvyšší úrovni.','Všetkých '+count+' zručností mám potvrdených na najvyššej úrovni.')
    : t('Můj cíl je zvládnout všech '+count+' dovedností na nejvyšší úrovni (3/3).',
        'Mojím cieľom je zvládnuť všetkých '+count+' zručností na najvyššej úrovni (3/3).');
  const brief=todayBrief(p,s);
  const shiftAction=s.phase===0 ? primary(brief.cta,brief.act,brief.val) : menuAssignmentAction(s);
  return '<header class="menu-hero passport-cover"><div class="passport-identity"><span class="passport-kicker">' +
    t('Moje portfolio','Moje portfólio') + '</span><h1>' + html(p.name) + '</h1><p class="passport-profession">' +
    html(profession(p)) + ' <span>·</span> ' + p.year + '. ' + t('ročník') + '</p><p class="passport-goal">' + html(scene.ambition) + '</p><p class="passport-target">' + html(goal) +
    '</p>' + goBtn('portfolio',t('Co už mohu ukázat zaměstnavateli','Čo už môžem ukázať zamestnávateľovi')+' →','passport-link') +
    '</div><figure class="passport-photo">' + photo('photos/future-'+p.id+'.webp',p.name+' · '+scene.alt) +
    '<figcaption><button type="button" class="future-link" data-do="go" data-value="future"><span>' +
    t('Já za tři roky','Ja o tri roky') + '</span><b aria-hidden="true"></b></button></figcaption></figure></header>' +
    (s.phase===0 ? tableInvitation(p,model) : '') + '<section class="next-shift"><div><span class="passport-kicker">' + html(relativeDate(s.day)) + ' · ' + html(stageLabels()[s.phase]) +
     '</span><h2>'+html(courseTitle(p,s))+'</h2><p>'+html(menuSkillWhy(competency(s.code),p))+'</p></div>'+shiftAction+'</section>' +
    (s.phase===0 ? '' : tableInvitation(p,model)) + personalGoalCard(p, model);
}

function personalGoalCard(p, model) {
  const skill = model.practiceGoal && skillSet(p).find(c => c.code === model.practiceGoal);
  if (!skill) return '';
  const confirmed = maxLevel(model,skill.code);
  const saved = model.menuStudy?.[skill.code]?.length;
  const next = confirmed === 3
    ? action('menu-proof',t('Ukázat potvrzenou práci','Ukázať potvrdenú prácu'),skill.code,'button')
    : action('menu-study',saved ? t('Zopakovat nácvik','Zopakovať nácvik') : t('Otevřít nácvik','Otvoriť nácvik'),skill.code,'button');
  return '<section class="personal-goal"><div><span class="passport-kicker">' + t('Můj osobní cíl','Môj osobný cieľ') +
    '</span><h2>' + html(menuSkillName(skill)) + '</h2></div><div class="personal-goal-actions">' + next +
    goBtn('future',t('Změnit cíl','Zmeniť cieľ'),'text-link') + '</div></section>';
}

function choosePracticeGoal(code) {
  const p = person();
  guard(role === 'student' && view === 'future' && futureScene(p).codes.includes(code) && skillSet(p).some(c => c.code === code));
  if (data().practiceGoal !== code) mutate(model => {model.practiceGoal = code});
  menuStudyAction('menu-study',code);
  tell(t('Osobní cíl najdete i na své úvodní stránce.','Osobný cieľ nájdete aj na svojej úvodnej stránke.'));
}

function occupationPay(p) {
  const cook = p.track === 'cook';
  const occupation = cook ? t('Kuchařky a kuchaři kromě šéfkuchařů','Kuchárky a kuchári okrem šéfkuchárov') : t('Číšníci a servírky','Čašníci a čašníčky');
  const source = cook ? 'https://www.nsp.cz/jednotka-prace/kuchar' : 'https://nsp.cz/jednotka-prace/cisnik';
  return '<details class="career-fold"><summary>' + t('Kolik se v mém oboru vydělává v Česku?','Koľko sa v mojom odbore zarába v Česku?') +
    '</summary><p><b>' + (cook ? '28 530' : '23 992') + ' ' + t('Kč hrubého měsíčně','Kč v hrubom mesačne') + '</b><br>' +
    html(occupation) + ' · ' + t('soukromý sektor v Česku, 2025','súkromný sektor v Česku, 2025') + '</p><p>' +
    t('Jde o medián mezd lidí s různou délkou praxe. Přibližně polovina vydělávala více a polovina méně.',
      'Ide o medián miezd ľudí s rôznou dĺžkou praxe. Približne polovica zarábala viac a polovica menej.') + '</p>' +
    '<a href="' + source + '" target="_blank" rel="noopener noreferrer">Národní soustava povolání · ' + t('zdroj údajů','zdroj údajov') + '</a></details>';
}

function marketValue(p, model) {
  const record = [...model.history].sort((a,b) => b.level-a.level || b.day.localeCompare(a.day))[0];
  const intro = t('U pohovoru mohu ukázat, jakou práci jsem předvedl','Na pohovore môžem ukázať, akú prácu som predviedol');
  const introF = t('U pohovoru mohu ukázat, jakou práci jsem předvedla','Na pohovore môžem ukázať, akú prácu som predviedla');
  return '<section class="market-value"><div><span class="passport-kicker">' + t('Moje hodnota na trhu práce','Moja hodnota na trhu práce') +
    '</span><h2>' + t('Co už mohu nabídnout','Čo už môžem ponúknuť') + '</h2><p>' + html(p.girl ? introF : intro) +
    t(' a co při ní viděl pedagog.',' a čo pri nej videl pedagóg.') + '</p></div>' +
    (record ? '<div class="market-example"><span>' + t('Z mého portfolia','Z môjho portfólia') + ' · ' + t('úroveň ') + record.level +
      '/3</span><h3>' + html(menuSkillName(competency(record.code))) + '</h3><p>' + html(feedbackText(record) || learnerOutcome(record)) +
      '</p>'+action('menu-proof',t('Otevřít doklad práce','Otvoriť doklad práce')+' →',record.code,'passport-link')+'</div>'
      : '<p>'+t('První ukázka zde přibude, jakmile pedagog potvrdí vaši práci.','Prvá ukážka tu pribudne, keď pedagóg potvrdí vašu prácu.')+'</p>') + '</section>';
}

function futurePage() {
  const p=person(), model=data(), scene=futureScene(p);
  const interview = p.girl ? t('Co bych řekla u pohovoru','Čo by som povedala na pohovore') : t('Co bych řekl u pohovoru','Čo by som povedal na pohovore');
  const proofLabel = p.girl ? t('Čím bych to doložila?','Čím by som to doložila?') : t('Čím bych to doložil?','Čím by som to doložil?');
  const choices = scene.codes.map(code => {
    const chosen = code === model.practiceGoal;
    return action('choose-goal', menuSkillName(competency(code)) + (chosen ? t(' · můj cíl',' · môj cieľ') : ''), code, 'goal-option',
      chosen ? 'data-chosen="true"' : '');
  }).join('');
  return '<div class="future-page">' + goBtn('path','← '+t('Zpět k mé mapě','Späť k mojej mape'),'back') +
    '<header class="future-spread"><figure>' + photo('photos/future-'+p.id+'.webp',p.name+' · '+scene.alt) + '</figure><div>' +
    '<span class="passport-kicker">' + t('Moje portfolio za tři roky','Moje portfólio o tri roky') + '</span><h1>' + html(p.name) +
    '<small>' + html(scene.place) + '</small></h1><p>'+html(scene.line)+'</p></div></header>' +
    '<section class="future-work career-panel"><div class="career-offer"><span class="passport-kicker">'+t('Moje hodnota na trhu práce','Moja hodnota na trhu práce')+
    '</span><h2>'+html(interview)+'</h2><blockquote>„'+html(scene.offer)+'“</blockquote>' +
    '<details class="career-fold"><summary>'+html(proofLabel)+'</summary><p>'+html(scene.proof)+'</p>' +
    goBtn('portfolio',t('Co už mám v portfoliu dnes','Čo už mám v portfóliu dnes'),'passport-link')+'</details>'+occupationPay(p)+'</div>'+
    '<div class="career-choice"><span class="passport-kicker">'+t('Moje volba','Moja voľba')+'</span><h2>'+t('Tohle chci umět','Toto chcem vedieť')+
    '</h2><p>'+t('Vyberte si dovednost. Uloží se jako váš osobní cíl a otevře se nácvik.','Vyberte si zručnosť. Uloží sa ako váš osobný cieľ a otvorí sa nácvik.')+
    '</p><div class="goal-options">'+choices+'</div>' +
    (model.practiceGoal ? action('clear-goal',t('Odebrat osobní cíl','Odstrániť osobný cieľ'),'','text-link clear-goal') : '') + '</div></section>' +
    portfolioMap(p,model,true)+'<div class="future-return">'+goBtn('day',t('Otevřít moji směnu','Otvoriť moju zmenu'),'button primary arrow')+
    goBtn('portfolio',t('Moje potvrzené práce','Moje potvrdené práce'),'text-link')+'</div></div>';
}
