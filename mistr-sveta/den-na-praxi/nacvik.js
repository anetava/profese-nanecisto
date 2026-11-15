'use strict';

// Each question starts a short rehearsal of a real decision at the work station.
const studySituations = {
  'K01.1': [
    ['V šatně už máte pracovní oděv. Co ještě před vstupem do kuchyně zkontrolujete?', 'V šatni už máte pracovný odev. Čo ešte pred vstupom do kuchyne skontrolujete?'],
    ['Projděte si místní kontrolní seznam od převlečení až po hygienu rukou.', 'Prejdite si miestny kontrolný zoznam od prezlečenia až po hygienu rúk.']
  ],
  'K01.2': [
    ['Máte zpracovat syrovou surovinu a hotový pokrm. Jak si rozdělíte pracoviště?', 'Máte spracovať surovú surovinu a hotový pokrm. Ako si rozdelíte pracovisko?'],
    ['Na plánku ukažte pracovní plochy a pomůcky pro obě činnosti. Uspořádání ověřte s pedagogem.', 'Na plániku ukážte pracovné plochy a pomôcky pre obe činnosti. Usporiadanie si overte s pedagógom.']
  ],
  'K01.3': [
    ['V průchodu mezi výdejem a stolem hostů vidíte mokrou podlahu. Jak na ni upozorníte?', 'V priechode medzi výdajom a stolom hostí vidíte mokrú podlahu. Ako na ňu upozorníte?'],
    ['Nacvičte krátké upozornění pro kolegu. Uveďte místo a popište, co jste viděli.', 'Nacvičte si krátke upozornenie pre kolegu. Uveďte miesto a opíšte, čo ste videli.']
  ],
  'K02.1': [
    ['Dostanete dva druhy jablek. Které vlastnosti porovnáte při výběru do salátu?', 'Dostanete dva druhy jabĺk. Ktoré vlastnosti porovnáte pri výbere do šalátu?'],
    ['Popište barvu, pevnost a stav povrchu. Zdůvodněte svou volbu konkrétní vlastností.', 'Opíšte farbu, pevnosť a stav povrchu. Svoj výber zdôvodnite konkrétnou vlastnosťou.']
  ],
  'K02.2': [
    ['Na dodacím listu jsou čtyři přepravky. Před vámi stojí tři. Co zaznamenáte?', 'Na dodacom liste sú štyri prepravky. Pred vami stoja tri. Čo zaznamenáte?'],
    ['Porovnejte označení i množství s dodacím listem a rozdíl předejte osobě odpovědné za příjem.', 'Porovnajte označenie aj množstvo s dodacím listom a rozdiel oznámte osobe zodpovednej za príjem.']
  ],
  'K02.3': [
    ['Po očištění zeleniny zbývá víc odpadu, než jste čekali. Kde ho můžete omezit?', 'Po očistení zeleniny zostáva viac odpadu, než ste čakali. Kde ho môžete obmedziť?'],
    ['Porovnejte hmotnost před očištěním a po něm. S pedagogem si prohlédněte, co zůstalo na slupkách.', 'Porovnajte hmotnosť pred očistením a po ňom. S pedagógom si pozrite, čo zostalo na šupkách.']
  ],
  'K03.1': [
    ['Na prkénku leží vzorová kostka a vaše nakrájená zelenina. V čem se liší?', 'Na doske leží vzorová kocka a vaša nakrájaná zelenina. V čom sa líšia?'],
    ['Položte několik kousků vedle vzoru a porovnejte jejich výšku i šířku.', 'Položte niekoľko kúskov vedľa vzoru a porovnajte ich výšku aj šírku.']
  ],
  'K03.2': [
    ['Dvě kuchařské skupiny připravily stejnou zeleninu různými způsoby. Jak porovnáte výsledek?', 'Dve kuchárske skupiny pripravili rovnakú zeleninu rôznymi spôsobmi. Ako porovnáte výsledok?'],
    ['Sledujte barvu, tvar a konzistenci. Spojte jednu pozorovanou změnu s použitým postupem.', 'Sledujte farbu, tvar a konzistenciu. Spojte jednu pozorovanú zmenu s použitým postupom.']
  ],
  'K03.3': [
    ['Máte připravit brambory jako přílohu ke dvěma odlišným pokrmům. Jak vyberete postup?', 'Máte pripraviť zemiaky ako prílohu k dvom odlišným jedlám. Ako vyberiete postup?'],
    ['Začněte požadovaným výsledkem na talíři. Podle něj porovnejte dva možné postupy.', 'Začnite požadovaným výsledkom na tanieri. Podľa neho porovnajte dva možné postupy.']
  ],
  'K04.1': [
    ['Chystáte tři stejné studené předkrmy. Jak bude vypadat vzor první porce?', 'Chystáte tri rovnaké studené predjedlá. Ako bude vyzerať vzor prvej porcie?'],
    ['Podle receptury určete množství a rozložení součástí. Další dvě porce pak porovnejte s první.', 'Podľa receptúry určte množstvo a rozloženie súčastí. Ďalšie dve porcie potom porovnajte s prvou.']
  ],
  'K04.2': [
    ['Máte před sebou vzorovou a vlastní omáčku. Jak popíšete rozdíl v konzistenci?', 'Máte pred sebou vzorovú a vlastnú omáčku. Ako opíšete rozdiel v konzistencii?'],
    ['Naberte stejné množství stejnou lžící a sledujte, jak stéká. Své pozorování porovnejte s recepturou.', 'Naberte rovnaké množstvo rovnakou lyžicou a sledujte, ako steká. Svoje pozorovanie porovnajte s receptúrou.']
  ],
  'K04.3': [
    ['Hlavní složka je připravená, dokončuje se příloha. Co ještě potřebujete vědět před výdejem?', 'Hlavná zložka je pripravená, dokončuje sa príloha. Čo ešte potrebujete vedieť pred výdajom?'],
    ['Podle objednávky vyjmenujte součásti talíře a ověřte s kolegou, kdy bude možné porci zkompletovat.', 'Podľa objednávky vymenujte súčasti taniera a overte si s kolegom, kedy bude možné porciu skompletizovať.']
  ],
  'K05.1': [
    ['Za chvíli začíná směna. Na co potřebujete dosáhnout při prvních třech úkonech?', 'O chvíľu sa začína zmena. Na čo potrebujete dočiahnuť pri prvých troch úkonoch?'],
    ['Projděte si postup nanečisto a porovnejte rozmístění pomůcek s pořadím práce.', 'Prejdite si postup nanečisto a porovnajte rozmiestnenie pomôcok s poradím práce.']
  ],
  'K05.2': [
    ['Dvě součásti pokrmu mají být hotové ve stejnou chvíli. Kterou začnete připravovat dřív?', 'Dve súčasti jedla majú byť hotové v rovnakom čase. Ktorú začnete pripravovať skôr?'],
    ['Začněte časem výdeje a postupujte v plánu zpět. Započítejte i sestavení porce.', 'Začnite časom výdaja a v pláne postupujte späť. Započítajte aj zostavenie porcie.']
  ],
  'K05.3': [
    ['Na výdeji jsou dva podobné talíře pro různé stoly. Jak ověříte, komu patří?', 'Na výdaji sú dva podobné taniere pre rôzne stoly. Ako overíte, komu patria?'],
    ['Srovnejte každý talíř s odpovídající objednávkou a domluvte si s obsluhou jednoznačné předání.', 'Porovnajte každý tanier s príslušnou objednávkou a dohodnite si s obsluhou jednoznačné odovzdanie.']
  ],
  'K06.1': [
    ['Podle dnešního menu připravujete inventář pro dvě místa. Co vyberete pro první chod?', 'Podľa dnešného menu pripravujete inventár pre dve miesta. Čo vyberiete na prvý chod?'],
    ['Projděte menu v pořadí podávání. U zvolených kusů ověřte čistotu a stav.', 'Prejdite si menu v poradí podávania. Pri vybraných kusoch skontrolujte čistotu a stav.']
  ],
  'K06.2': [
    ['Prostřeli jste pro dva. Podívejte se na stůl z obou míst. Mají hosté stejný prostor?', 'Prestreli ste pre dvoch. Pozrite sa na stôl z oboch miest. Majú hostia rovnaký priestor?'],
    ['Porovnejte polohu obou prostření a vyzkoušejte si s prázdnou karafou přístup ke stolu.', 'Porovnajte polohu oboch prestretí a s prázdnou karafou si vyskúšajte prístup k stolu.']
  ],
  'K06.3': [
    ['Dvojice přichází do cvičné restaurace a rozhlíží se. Jak zahájíte obsluhu?', 'Dvojica prichádza do cvičnej reštaurácie a rozhliada sa. Ako začnete obsluhu?'],
    ['S kolegou si vyměňte role. Vyzkoušejte pozdrav, nabídnutí místa a ověření, jestli hostům vyhovuje.', 'S kolegom si vymeňte roly. Vyskúšajte si pozdrav, ponuku miesta a overenie, či hosťom vyhovuje.']
  ],
  'K07.1': [
    ['Dvě limonády podle stejného receptu se liší. Které kroky přípravy porovnáte?', 'Dve limonády podľa rovnakého receptu sa líšia. Ktoré kroky prípravy porovnáte?'],
    ['Začněte odměřenými množstvími a porovnejte postup s recepturou včetně způsobu podání.', 'Začnite odmeranými množstvami a porovnajte postup s receptúrou vrátane spôsobu podania.']
  ],
  'K07.2': [
    ['Host si objednal nový druh čaje z nabídky. Kde najdete údaje pro jeho přípravu?', 'Hosť si objednal nový druh čaju z ponuky. Kde nájdete údaje na jeho prípravu?'],
    ['Vyhledejte dávku a pokyny k přípravě v podkladech pracoviště. Porovnejte je s konkrétní objednávkou.', 'Vyhľadajte dávku a pokyny na prípravu v podkladoch pracoviska. Porovnajte ich s konkrétnou objednávkou.']
  ],
  'K07.3': [
    ['Host chce k obědu něco nealkoholického. Jak zjistíte, co mu bude chutnat?', 'Hosť chce k obedu niečo nealkoholické. Ako zistíte, čo mu bude chutiť?'],
    ['Zeptejte se na jednu preferenci. Podle odpovědi doporučte jeden konkrétní nápoj z nabídky.', 'Spýtajte sa na jednu preferenciu. Podľa odpovede odporučte jeden konkrétny nápoj z ponuky.']
  ],
  'K08.1': [
    ['Při objednávce dvou jídel host jedno změní. Jak ověříte konečnou objednávku?', 'Pri objednávke dvoch jedál hosť jedno zmení. Ako overíte konečnú objednávku?'],
    ['Změnu zaznamenejte a před odesláním vlastními slovy zopakujte celou objednávku.', 'Zmenu zaznamenajte a pred odoslaním vlastnými slovami zopakujte celú objednávku.']
  ],
  'K08.2': [
    ['Host se ptá na alergen v dnešní příloze. Odkud získáte odpověď ke konkrétní porci?', 'Hosť sa pýta na alergén v dnešnej prílohe. Odkiaľ získate odpoveď ku konkrétnej porcii?'],
    ['Najděte aktuální podklady k pokrmu. Nejasnost ověřte s odpovědnou osobou ještě před odpovědí hostovi.', 'Nájdite aktuálne podklady k jedlu. Nejasnosť si overte so zodpovednou osobou ešte pred odpoveďou hosťovi.']
  ],
  'K08.3': [
    ['Host říká, že na jídlo čeká příliš dlouho. Jakou první větou zareagujete?', 'Hosť hovorí, že na jedlo čaká príliš dlho. Akou prvou vetou zareagujete?'],
    ['Nechte hosta domluvit, pojmenujte jeho problém a nabídněte ověření stavu objednávky.', 'Nechajte hosťa dohovoriť, pomenujte jeho problém a ponúknite overenie stavu objednávky.']
  ],
  'K09.1': [
    ['Porovnáváte dva vzorky stejného pokrmu. Jak popíšete rozdíl tak, aby mu rozuměl kolega?', 'Porovnávate dve vzorky rovnakého jedla. Ako opíšete rozdiel tak, aby mu rozumel kolega?'],
    ['Vyberte jedinou pozorovatelnou vlastnost, třeba barvu nebo konzistenci, a popište oba vzorky stejnými slovy.', 'Vyberte jedinú pozorovateľnú vlastnosť, napríklad farbu či konzistenciu, a opíšte obe vzorky rovnakými výrazmi.']
  ],
  'K09.2': [
    ['Dva stejné talíře čekají na výdej. Podle čeho posoudíte, zda mohou odejít společně?', 'Dva rovnaké taniere čakajú na výdaj. Podľa čoho posúdite, či môžu ísť k hosťom spoločne?'],
    ['Položte talíře vedle sebe a porovnejte velikost porcí, rozmístění součástí a čistotu okrajů.', 'Položte taniere vedľa seba a porovnajte veľkosť porcií, rozmiestnenie súčastí a čistotu okrajov.']
  ],
  'K09.3': [
    ['Na stůl přišlo jídlo v jiném pořadí, než host očekával. Kde zkontrolujete zadání?', 'Na stôl prišlo jedlo v inom poradí, než hosť očakával. Kde skontrolujete zadanie?'],
    ['Projděte záznam objednávky a ověřte s kolegou návaznost servisu.', 'Prejdite si záznam objednávky a overte si s kolegom nadväznosť servisu.']
  ],
  'K10.1': [
    ['Na čtyři porce potřebujete 320 g suroviny. Jak spočítáte množství na deset porcí?', 'Na štyri porcie potrebujete 320 g suroviny. Ako vypočítate množstvo na desať porcií?'],
    ['Jedna porce vychází na 80 g. Pro deset porcí potřebujete 800 g při stejném výtěžku.', 'Na jednu porciu pripadá 80 g. Na desať porcií potrebujete 800 g pri rovnakej výťažnosti.']
  ],
  'K10.2': [
    ['Z kilogramového balení použijete jen 250 g. Jakou část nákupní ceny zapíšete do kalkulace?', 'Z kilogramového balenia použijete iba 250 g. Akú časť nákupnej ceny zapíšete do kalkulácie?'],
    ['Při stejné jednotkové ceně připadá na 250 g čtvrtina nákupní ceny balení.', 'Pri rovnakej jednotkovej cene pripadá na 250 g štvrtina nákupnej ceny balenia.']
  ],
  'K10.3': [
    ['Po přípravě zeleniny zůstal plný koš odřezků. Jak zjistíte, kde vzniká největší ztráta?', 'Po príprave zeleniny zostal plný kôš odrezkov. Ako zistíte, kde vzniká najväčšia strata?'],
    ['Změřte zvlášť ztrátu při každém kroku. Teprve potom navrhněte jednu úpravu postupu.', 'Zmerajte stratu osobitne pri každom kroku. Až potom navrhnite jednu úpravu postupu.']
  ],
  'K11.1': [
    ['Kuchyně mění přílohu. Jak předáte informaci kolegovi, který právě obsluhuje?', 'Kuchyňa mení prílohu. Ako odovzdáte informáciu kolegovi, ktorý práve obsluhuje?'],
    ['Pojmenujte pokrm, změnu a dotčenou objednávku. Ověřte, co si kolega z vaší zprávy odnáší.', 'Pomenujte jedlo, zmenu a dotknutú objednávku. Overte si, čo si kolega z vašej správy odnáša.']
  ],
  'K11.2': [
    ['Končí vám směna a jedna objednávka zůstává rozpracovaná. Co předáte nástupci?', 'Končí sa vám zmena a jedna objednávka zostáva rozpracovaná. Čo odovzdáte nástupcovi?'],
    ['Uveďte, co je hotové, co ještě zbývá a kdo na výsledek čeká.', 'Uveďte, čo je hotové, čo ešte zostáva a kto na výsledok čaká.']
  ],
  'K11.3': [
    ['Dnes se vám podařilo něco lépe než minule. Co konkrétně by mohl vidět i pedagog?', 'Dnes sa vám niečo podarilo lepšie ako minule. Čo konkrétne by mohol vidieť aj pedagóg?'],
    ['Vybavte si jediný okamžik a spojte své rozhodnutí s výsledkem, který bylo možné pozorovat.', 'Vybavte si jediný okamih a spojte svoje rozhodnutie s výsledkom, ktorý sa dal pozorovať.']
  ],
  'K12.1': [
    ['Cvičné bistro má připravit malé občerstvení. Co si potřebujete se zadavatelem ověřit jako první?', 'Cvičné bistro má pripraviť malé občerstvenie. Čo si potrebujete so zadávateľom overiť ako prvé?'],
    ['Domluvte rozsah, počet porcí a čas předání. Z těchto údajů sestavte první kroky přípravy.', 'Dohodnite si rozsah, počet porcií a čas odovzdania. Z týchto údajov zostavte prvé kroky prípravy.']
  ],
  'K12.2': [
    ['Při školní akci přijde druhá skupina hostů dřív. S kým se domluvíte na dalším postupu?', 'Na školskú akciu príde druhá skupina hostí skôr. S kým sa dohodnete na ďalšom postupe?'],
    ['Zjistěte připravenost kuchyně i obsluhy a společně dohodněte, v jakém pořadí hosty obsloužíte.', 'Zistite pripravenosť kuchyne aj obsluhy a spoločne sa dohodnite, v akom poradí hostí obslúžite.']
  ],
  'K12.3': [
    ['Zaměstnavateli ukazujete jednu práci z portfolia. Co jste v ní osobně rozhodli vy?', 'Zamestnávateľovi ukazujete jednu prácu z portfólia. Čo ste v nej osobne rozhodli vy?'],
    ['Vyberte jednu potvrzenou práci. Pojmenujte své rozhodnutí a ukažte místo, kde je vidět jeho výsledek.', 'Vyberte jednu potvrdenú prácu. Pomenujte svoje rozhodnutie a ukážte miesto, kde vidno jeho výsledok.']
  ]
};

let menuStudyDraft = null;

function menuStudyRecord(model, code) {
  const records = model.menuStudy?.[code];
  if (!Array.isArray(records) || !records.length) return '';
  const skill = competency(code);
  if (!skill) return '';
  return '<section class="menu-evidence"><h3>' + t('Vlastní nácvik', 'Vlastný nácvik') + '</h3>' +
    records.slice().reverse().map(record => {
      const focus = skill.checks[record.focus];
      return '<article class="entry"><small>' + html(dateLabel(record.day)) + ' · ' +
        t('úroveň ', 'úroveň ') + html(record.level) + '</small>' +
        (focus ? '<p><b>' + t('Zaměření', 'Zameranie') + '</b> · ' + html(focus) + '</p>' : '') +
        (record.text ? '<p>' + html(record.text) + '</p>' : '') + '</article>';
    }).join('') + '</section>';
}

function menuStudyJournal(model) {
  const codes = Object.keys(model.menuStudy || {}).filter(code => competency(code) && model.menuStudy[code]?.length);
  if (!codes.length) return '';
  return '<details><summary>' + t('Vlastní nácvik dovedností', 'Vlastný nácvik zručností') + '</summary>' +
    codes.map(code => '<details><summary>' + html(competency(code).name) + '</summary>' +
      menuStudyRecord(model, code) + '</details>').join('') + '</details>';
}

function menuStudyPage() {
  const draft = menuStudyDraft;
  if (!draft || draft.student !== studentId || role !== 'student') {
    return goBtn('path', t('Otevřít moje kompetence', 'Otvoriť moje kompetencie'));
  }
  const skill = competency(draft.code);
  const model = data();
  const situation = studySituations[skill.code];
  const returnLink = action('detail', '← ' + t('Zpět na kompetenci', 'Späť na kompetenciu'), skill.code, 'back');
  const levelCopy = maxLevel(model, skill.code) >= 3
    ? t('Opakování', 'Opakovanie')
    : t('Nácvik');
  const focusChoices = skill.checks.map((label, i) =>
    '<label class="check"><input type="radio" name="practice-focus" value="' + i + '"' +
    (draft.focus === i ? ' checked' : '') + '>' + html(label) + '</label>').join('');
  const personal = model.practiceGoal === skill.code ? '<div class="practice-why"><span class="passport-kicker">' +
    t('K čemu mi to bude na směně','Na čo mi to bude na zmene') + '</span><p>' + html(menuSkillWhy(skill,person())) +
    '</p></div>' : '';
  const caseMarkup = situation ? '<div class="menu-practice-task"><span class="ey">' +
    t('Situace z provozu', 'Situácia z prevádzky') + '</span><h2>' + html(loc(situation[0])) +
    '</h2><details><summary>' + t('Ukázat tip od mistra', 'Ukázať tip od majstra') +
    '</summary><p>' + html(loc(situation[1])) + '</p></details></div>' : '';

  return '<section class="menu-practice">' + returnLink +
    title(moduleInfo(skill.code).title + ' · ' + levelCopy + ' · ' + t('úroveň ') + draft.level, menuSkillName(skill)) + personal +
    (stationChallenge(skill.code, person()) || caseMarkup) + '<details class="menu-practice-proof"><summary>' +
    t('Úkol pro tuto úroveň a způsob ověření', 'Úloha pre túto úroveň a spôsob overenia') + '</summary>' +
    '<p>' + html(skill.name) + '</p><p><strong>' + t('Praktický úkol', 'Praktická úloha') + '</strong> · ' + html(skill.tasks[draft.level - 1]) + '</p>' +
    '<p><strong>' + t('Očekávaný výkon', 'Očakávaný výkon') + '</strong> · ' + html(skill.levels[draft.level - 1]) + '</p>' +
    '<p><strong>' + t('Doklad práce', 'Doklad práce') + '</strong> · ' + html(skill.evidence) + '</p></details>' +
    '<fieldset class="menu-pick"><legend>' + t('Na co se při nácviku zaměříte?', 'Na čo sa pri nácviku zameriate?') + '</legend>' +
    focusChoices + '</fieldset><label class="menu-practice-note">' + t('Můj postřeh (volitelně)', 'Môj postreh (voliteľné)') +
    '<textarea data-study-text maxlength="400" rows="2">' + html(draft.text) + '</textarea></label>' +
    '<div class="menu-actions actions">' + action('menu-study-save', t('Zapsat do deníku', 'Zapísať do denníka'), skill.code,
      'button primary', draft.text.trim() || draft.focus !== null ? '' : 'disabled') +
    (model.shift.code === skill.code ? goBtn('day', t('Otevřít moji směnu', 'Otvoriť moju zmenu')) : '') +
    '</div><p class="meta">' + t('Úroveň potvrdí pedagog po předvedení práce na směně.', 'Úroveň potvrdí pedagóg po predvedení práce na zmene.') + '</p></section>';
}

function menuStudyAction(cmd, value) {
  guard(role === 'student');
  if (cmd === 'menu-study') {
    guard(skillSet(person()).some(skill => skill.code === value));
    const model = data();
    const assigned = model.shift.code === value && model.shift.phase !== 6;
    menuStudyDraft = {
      student: studentId, code: value, level: assigned ? model.shift.level : Math.min(maxLevel(model, value) + 1, 3),
      focus: null, text: ''
    };
    go('menu-study');
    return;
  }
  guard(cmd === 'menu-study-save' && view === 'menu-study');
  const draft = menuStudyDraft;
  guard(draft && draft.student === studentId && draft.code === value);
  const choice = document.querySelector('input[name="practice-focus"]:checked');
  const focus = choice ? Number(choice.value) : null;
  const text = document.querySelector('textarea[data-study-text]').value.trim().slice(0, 400);
  const skill = competency(value);
  guard(focus === null || (Number.isInteger(focus) && focus >= 0 && focus < skill.checks.length));
  guard(focus !== null || text);
  mutate(model => {
    if (!model.menuStudy) model.menuStudy = {};
    const records = model.menuStudy[value] || (model.menuStudy[value] = []);
    const day = dayStamp(), previous = records.at(-1);
    if (previous?.day === day && previous.level === draft.level && previous.focus === focus && previous.text === text) return;
    records.push({day, level:draft.level, focus, text});
  });
  menuStudyDraft = null;
  openMenuSkill(value);
  tell(t('Váš nácvik je u kompetence i v deníku.', 'Váš nácvik je pri kompetencii aj v denníku.'));
}

document.addEventListener('input', event => {
  const draft = menuStudyDraft, input = event.target;
  if (!draft || view !== 'menu-study' || role !== 'student' || draft.student !== studentId) return;
  if (input.matches('input[name="practice-focus"]')) draft.focus = Number(input.value);
  else if (input.matches('textarea[data-study-text]')) draft.text = input.value;
  else return;
  document.querySelector('[data-do="menu-study-save"]').disabled = draft.focus === null && !draft.text.trim();
});
