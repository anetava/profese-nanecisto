'use strict';

function skillChapters(p) {
  const cook = p.track === 'cook';
  return [
    {id:'specialty', name:cook ? t('Kuchařské dovednosti','Kuchárske zručnosti') : t('Obsluha hostů','Obsluha hostí'), photo:cook ? 'assets/cook-3.webp' : 'assets/service-3.webp', accepts:c => !commonSkill(c)},
    {id:'operations', name:t('Příprava a chod provozu','Príprava a chod prevádzky'), photo:cook ? 'photos/ema-1.webp' : 'photos/table.webp', accepts:c => /^K0[125]\./.test(c.code)},
    {id:'quality', name:t('Kvalita a hospodaření','Kvalita a hospodárenie'), photo:cook ? 'photos/plate.webp' : 'photos/matej-1.webp', accepts:c => /^K(09|10)\./.test(c.code)},
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
    return '<details class="map-group"><summary><span class="map-group-name">' + html(chapter.name) +
      '</span><span class="map-caret" aria-hidden="true">⌄</span><span class="map-track" aria-hidden="true">' + markers + '</span></summary>' +
      '<ul>' + entries + '</ul></details>';
  }).join('');
  const latest = !forecast && [...model.history].sort((a,b) => b.day.localeCompare(a.day) || b.level-a.level)[0];
  const recentWork = latest ? action('menu-proof',t('Poslední potvrzení','Posledné potvrdenie') + ' · ' +
    menuSkillName(competency(latest.code)) + ' · ' + latest.level + '/3',latest.code,'map-recorded') : '';
  const help = forecast
    ? t('Takhle bude mapa vypadat, až pedagog potvrdí třetí úroveň u všech dovedností. Otevřete oblast a vyberte si dovednost, která vás zajímá.',
        'Takto bude mapa vyzerať, keď pedagóg potvrdí tretiu úroveň pri všetkých zručnostiach. Otvorte oblasť a vyberte si zručnosť, ktorá vás zaujíma.')
    : t('Každé políčko je jedna dovednost. Za každou úroveň potvrzenou pedagogem se vybarví třetina. Na úrovni 3 je celé tyrkysové.',
        'Každé políčko je jedna zručnosť. Za každú úroveň potvrdenú pedagógom sa vyfarbí tretina. Na úrovni 3 je celé tyrkysové.');
  return '<section class="skill-map' + (forecast ? ' preview-map' : '') + '"><div class="map-heading"><div><h2>' +
    (forecast ? t('Mapa v cíli','Mapa v cieli') : t('Moje mapa dovedností','Moja mapa zručností')) +
     '</h2><p>' + html(help) + '</p>' + recentWork + '</div><div class="map-count"><strong>' + complete + '<span> / ' + skills.length + '</span></strong><small>' +
    (forecast ? t('cíl na úrovni 3','cieľ na úrovni 3') : t('na úrovni 3')) + '</small></div></div><div class="map-groups">' + groups + '</div></section>';
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
      line:t('Dva hosté u jednoho stolu si objednali stejné jídlo. Zkontroluji obě porce a dám obsluze vědět, že může jít. Hosté ochutnají první sousto spolu.',
        'Dvaja hostia pri jednom stole si objednali rovnaké jedlo. Skontrolujem obe porcie a dám obsluhe vedieť, že môže ísť. Hostia ochutnajú prvé sústo spolu.'),
      codes:['K09.2','K05.3','K12.2'],
      alt:t('podává kolegyni na výdeji talíř s pečenou zeleninou','podáva kolegyni pri výdaji tanier s pečenou zeleninou')
    },
    dan: {
      ambition:t('Chci si v kuchyni vzít na starost teplé přílohy.','Chcem mať v kuchyni na starosti teplé prílohy.'),
      place:t('U sporáku','Pri sporáku'),
      line:t('Zelenina na pánvi má barvu i pevný skus. Od výdeje slyším, že ryba je hotová. Teď je chvíle dokončit přílohu, aby obojí dorazilo na stůl horké.',
        'Zelenina na panvici má farbu a zostala chrumkavá. Od výdaja počujem, že ryba je hotová. Teraz je čas dokončiť prílohu, aby oboje prišlo na stôl horúce.'),
      codes:['K03.3','K09.1','K05.3'],
      alt:t('obrací zeleninu kleštěmi na pánvi','obracia zeleninu kliešťami na panvici')
    },
    lea: {
      ambition:t('Chci si stát za každým talířem, který vydám.','Chcem si stáť za každým tanierom, ktorý vydám.'),
      place:t('U poslední porce večera','Pri poslednej porcii večera'),
      line:t('Dokončuji poslední talíř bylinkami. I na konci večera má host dostat stejně dobře připravené jídlo jako ten, který přišel první.',
        'Dokončujem posledný tanier bylinkami. Aj na konci večera má hosť dostať rovnako dobre pripravené jedlo ako ten, ktorý prišiel prvý.'),
      codes:['K09.2','K09.1','K05.3'],
      alt:t('dokončuje pokrm čerstvými bylinkami','dokončuje jedlo čerstvými bylinkami')
    },
    matej: {
      ambition:t('Chci mít v restauraci na starosti vlastní stoly.','Chcem mať v reštaurácii na starosti vlastné stoly.'),
      place:t('U svých prvních stolů','Pri svojich prvých stoloch'),
      line:t('Host váhá mezi dvěma jídly. Zeptám se, na co má chuť, popíšu rozdíl a dám mu čas vybrat. Když se vrátím, objednává s jistotou.',
        'Hosť váha medzi dvoma jedlami. Spýtam sa, na čo má chuť, vysvetlím rozdiel a dám mu čas vybrať si. Keď sa vrátim, objednáva si s istotou.'),
      codes:['K08.1','K08.2','K06.3'],
      alt:t('představuje hostům otevřený jídelní lístek','predstavuje hosťom otvorený jedálny lístok')
    },
    nora: {
      ambition:t('Chci, aby se hosté u mých stolů cítili vítaní.','Chcem, aby sa hostia pri mojich stoloch cítili vítaní.'),
      place:t('Při večerním servisu','Pri večernom servise'),
      line:t('Přináším hlavní chod. Pamatuji si, kdo si co objednal. Kolegyně přichází s druhým talířem a oba hosté mohou začít jíst společně.',
        'Prinášam hlavný chod. Pamätám si, kto si čo objednal. Kolegyňa prichádza s druhým tanierom a obaja hostia môžu začať jesť spolu.'),
      codes:['K06.2','K09.3','K12.2'],
      alt:t('předkládá hostce hlavní chod','podáva hostke hlavný chod')
    },
    tomas: {
      ambition:t('Chci umět vést servis od přivítání až po poslední kávu.','Chcem vedieť viesť obsluhu od privítania až po poslednú kávu.'),
      place:t('U kávy po obědě','Pri káve po obede'),
      line:t('Po dezertu přináším espresso. Vím, ke komu patří, a hosté mohou v klidu dokončit rozhovor. Kolega mezitím ví, který stůl už je obsloužený.',
        'Po dezerte prinášam espresso. Viem, komu patrí, a hostia môžu v pokoji dokončiť rozhovor. Kolega medzitým vie, ktorý stôl je už obslúžený.'),
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
    : t('Mířím na nejvyšší úroveň ve všech '+count+' dovednostech.','Mierim na najvyššiu úroveň vo všetkých '+count+' zručnostiach.');
  const brief=todayBrief(p,s);
  const shiftAction=s.phase===0 ? primary(brief.cta,brief.act,brief.val) : menuAssignmentAction(s);
  return '<header class="menu-hero passport-cover"><div class="passport-identity"><span class="passport-kicker">' +
    t('Moje portfolio','Moje portfólio') + '</span><h1>' + html(p.name) + '</h1><p class="passport-profession">' +
    html(profession(p)) + ' <span>·</span> ' + p.year + '. ' + t('ročník') + '</p><p class="passport-goal">' + html(scene.ambition) + '</p><p class="passport-target">' + html(goal) +
    '</p>' + goBtn('portfolio',t('Co už mohu ukázat zaměstnavateli','Čo už môžem ukázať zamestnávateľovi')+' →','passport-link') +
    '</div><figure class="passport-photo">' + photo('photos/future-'+p.id+'.webp',p.name+' · '+scene.alt) +
    '<figcaption><button type="button" class="future-link" data-do="go" data-value="future"><span>' +
    t('Já za tři roky','Ja o tri roky') + '</span><b aria-hidden="true"></b></button></figcaption></figure></header>' +
    '<section class="next-shift"><div><span class="passport-kicker">' + html(relativeDate(s.day)) + ' · ' + html(stageLabels()[s.phase]) +
     '</span><h2>'+html(courseTitle(p,s))+'</h2><p>'+html(menuSkillWhy(competency(s.code),p))+'</p></div>'+shiftAction+'</section>';
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
  return '<div class="future-page">' + goBtn('path','← '+t('Zpět k mé mapě','Späť k mojej mape'),'back') +
    '<header class="future-spread"><figure>' + photo('photos/future-'+p.id+'.webp',p.name+' · '+scene.alt) + '</figure><div>' +
    '<span class="passport-kicker">' + t('Moje portfolio za tři roky','Moje portfólio o tri roky') + '</span><h1>' + html(p.name) +
    '<small>' + html(scene.place) + '</small></h1><p>'+html(scene.line)+'</p></div></header>' +
    '<section class="future-work"><div><span class="passport-kicker">'+t('Moje budoucí práce','Moja budúca práca')+'</span><h2>'+
    t('Co k tomu potřebuji umět','Čo na to potrebujem vedieť')+'</h2></div><div>'+
    scene.codes.map(code => action('detail',menuSkillName(competency(code))+' →',code,'future-skill')).join('')+'</div></section>'+
    portfolioMap(p,model,true)+'<div class="future-return">'+goBtn('path',t('Zpět k mému dnešnímu kroku','Späť k môjmu dnešnému kroku'),'button primary arrow')+
    goBtn('portfolio',t('Moje potvrzené práce','Moje potvrdené práce'),'text-link')+'</div></div>';
}
