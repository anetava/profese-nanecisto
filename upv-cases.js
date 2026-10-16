// Autorské, smyšlené situace. Mapování na veřejné sylaby není schválením IVP.
// Ověření veřejných zdrojů: 11. 10. 2026. UIS: akademický rok 2026/2027.
export const upvSources = {
  'upv-uis-1': { title: 'UIS 2026/2027 · VVV173Z · Průběžná pedagogická praxe', url: 'https://is.czu.cz/katalog/syllabus.pl?predmet=294587&jazyk=1', note: 'Zápočet, 2 kredity. Sylabus uvádí 10 hodin praxe; těžištěm je videotrénink a rozbor pozorování.' },
  'upv-uis-2': { title: 'UIS 2026/2027 · VVV174Z · Skupinový náslech', url: 'https://is.czu.cz/katalog/syllabus.pl?predmet=285935&jazyk=1', note: 'Zápočet, 2 kredity, 40 hodin praxe. Pozorování, záznamy a společný rozbor.' },
  'upv-uis-3': { title: 'UIS 2026/2027 · VVV175Z · Řízená náslechová pedagogická praxe', url: 'https://is.czu.cz/katalog/syllabus.pl?predmet=285936&jazyk=1', note: 'Zápočet, 8 kreditů, 40 hodin praxe. Sylabus stanoví 6 náslechů praktických a 4 teoretických vyučovacích jednotek.' },
  'upv-uis-4': { title: 'UIS 2026/2027 · VVV176Z · Microteaching', url: 'https://is.czu.cz/katalog/syllabus.pl?predmet=285934&jazyk=1', note: 'Zápočet, 4 kredity, 20 hodin praxe. Příprava a předvedení mikrovýstupů, videomonitoring a reflexe.' },
  'upv-uis-5': { title: 'UIS 2026/2027 · VVV177E · Souvislá řízená pedagogická praxe', url: 'https://is.czu.cz/katalog/syllabus.pl?predmet=294600&jazyk=1', note: '10 kreditů, 160 hodin praxe, čtyři týdny. Sylabus rozlišuje podmínky zápočtu a závěrečného výstupu před komisí.' },
  'upv-uis-6': { title: 'UIS 2026/2027 · VVV178Z · Reflexe pedagogické praxe', url: 'https://is.czu.cz/katalog/syllabus.pl?predmet=294594&jazyk=1', note: 'Zápočet, 2 kredity. Hodinovou dotaci zde nepřebíráme: záhlaví a rozpis zátěže uvádějí rozdílné údaje.' },
  'upv-plan': { title: 'IVP · Studijní plán bakalářského UPV', url: 'https://www.ivp.czu.cz/dl/82143?lang=cs', note: 'Veřejný plán slouží pro pořadí šesti předmětů. Aktuální údaje o předmětech byly kontrolovány také v UIS 2026/2027.' },
  'upv-calendar': { title: 'IVP · Harmonogram 2026/2027', url: 'https://www.ivp.czu.cz/dl/156253?lang=cs', note: 'Pro konkrétní termíny praxe platí harmonogram a pokyny garanta, nikoli pořadí tréninkových karet.' },
  'upv-method': { title: 'IVP · Metodika souvislé řízené praxe UPV', url: 'https://www.ivp.czu.cz/dl/135149?lang=cs', note: 'Veřejný metodický materiál, aktualizace 7. 10. 2024. Organizační detaily je nutné porovnat s aktuálními pokyny předmětu.' },
  'upv-kraau': { title: 'MŠMT · Kompetenční rámec absolventa a absolventky učitelství', url: 'https://msmt.gov.cz/vzdelavani/pedagogicti-pracovnici/priprava-pedagogickych-pracovniku/kompetencni-ramec-absolventa-a-absolventky-ucitelstvi', note: 'Formativní profesní rámec; skóre simulace není jeho certifikovaným měřením.' },
  'upv-oskr': { title: 'MŠMT · Oborový rámec pro odborné předměty, praktické vyučování a odborný výcvik', url: 'https://edu.gov.cz/wp-content/uploads/2026/07/OSKR_Ucitelstvi-odbornych-predmetu-praktickeho-vyucovani-a-odborneho-vycviku_final_prosinec-2025.pdf', note: 'Oborová příloha KRAAU, finální verze od prosince 2025. Slouží pro tematické mapování, nikoli jako oficiální klíč odpovědí.' }
};

export const upvStages = [
  { id: 'upv-1', name: 'Průběžná pedagogická praxe (UPV)', short: 'Všímám si výuky', description: 'Rozlište, co jste skutečně viděli, a co si teprve vykládáte. Hledejte důkazy učení.', officialNote: 'VVV173Z · 1. ročník, LS · 2 kredity, zápočet. Aktuální sylabus pracuje především s videozáznamy výuky.', sourceIds: ['upv-uis-1', 'upv-plan'] },
  { id: 'upv-2', name: 'Průběžná pedagogická praxe – skupinový náslech (UPV)', short: 'Pozoruji s ostatními', description: 'Připravte si zaměření náslechu a porovnejte své záznamy s ostatními pozorovateli.', officialNote: 'VVV174Z · 2. ročník, ZS · 2 kredity, zápočet. Harmonogram 2026/2027 vymezuje skupinové náslechy na 1. 10.–30. 11. 2026.', sourceIds: ['upv-uis-2', 'upv-plan', 'upv-calendar'] },
  { id: 'upv-3', name: 'Řízená náslechová pedagogická praxe (UPV)', short: 'Rozumím tomu, co vidím', description: 'Spojte pozorování s otázkou pro cvičného učitele a ověřte více možných vysvětlení.', officialNote: 'VVV175Z · 2. ročník, LS · 8 kreditů, zápočet. Harmonogram 2026/2027 vymezuje náslechy na 1. 3.–30. 4. 2027.', sourceIds: ['upv-uis-3', 'upv-plan', 'upv-calendar'] },
  { id: 'upv-4', name: 'Průběžná pedagogická praxe - Microteaching (UPV)', short: 'Zkouším učit', description: 'Natrénujte krátké zadání, ověření porozumění, práci s pomůckami a úpravu vlastního výstupu.', officialNote: 'VVV176Z · 3. ročník, ZS · 4 kredity, zápočet. Příprava na mikrovýstupy; tento trénink nenahrazuje jejich předvedení.', sourceIds: ['upv-uis-4', 'upv-plan'] },
  { id: 'upv-5', name: 'Souvislá řízená pedagogická praxe (UPV)', short: 'Vedu výuku pod vedením', description: 'Rozhodujte v reálném tempu hodiny a v mezích své role. Propojte přípravu, bezpečnost a učení žáků.', officialNote: 'VVV177E · 3. ročník · 10 kreditů. V plánu je předmět v 6. semestru; harmonogram určuje období praxe 1. 12. 2026–28. 2. 2027. Konkrétní termín potvrzuje garant.', sourceIds: ['upv-uis-5', 'upv-plan', 'upv-calendar'] },
  { id: 'upv-6', name: 'Reflexe pedagogické praxe (UPV)', short: 'Zlepšuji další hodinu', description: 'Z promyšleného rozboru vytvořte malou změnu, jejíž účinek dokážete znovu ověřit.', officialNote: 'VVV178Z · 3. ročník, LS · 2 kredity, zápočet. Konkrétní podmínky a kritéria stanoví předmět v Moodle.', sourceIds: ['upv-uis-6', 'upv-plan'] }
];

const sourceNote = 'Autorská smyšlená situace k uvedenému předmětu. Zdroje ukotvují téma; volby a jejich hodnocení jsou návrhem k odborné revizi.';
const makeCase = (n, stage, data) => ({ id: `upv-${String(n).padStart(2, '0')}`, track: 'upv', stage: `upv-${stage}`, ...data, sourceNote });
const option = (id, label, detail, score, consequence, explanation) => ({ id, label, detail, score, consequence, explanation });

export const upvCases = [
  makeCase(1, 1, {
    title: 'Co je na záznamu skutečně vidět?', setting: 'Videorozbor odborné hodiny', role: 'Student/ka UPV při videotréninku',
    goal: 'Oddělit pozorovaný děj od vysvětlení chování žáka.', skill: 'Pozorování bez nálepek',
    scene: 'Na třicetisekundovém úseku žák sleduje pracovní list a na otázku neodpoví. Spolužák do archu napsal „nemá zájem o obor“. Neviděli jste začátek hodiny ani zadání. Máte připravit jednu větu pro společný rozbor.',
    prompt: 'Který zápis je teď nejlépe podložený?',
    options: [
      option('a', 'Popíšu děj a nechám příčinu otevřenou', 'Žák neodpověděl; z tohoto úseku nevíme proč.', 2, 'Skupina může pracovat se stejným pozorováním a ověřovat různé příčiny.', 'Krátký úsek dovoluje popsat reakci. Zájem, porozumění ani obavy z něj spolehlivě nepoznáte.'),
      option('b', 'Zapíšu možné neporozumění', 'Přidám otazník a návrh vrátit se k zadání.', 1, 'Máte užitečnou hypotézu, ale snadno z ní může vzniknout předčasný závěr.', 'Hypotézu má smysl prověřit. V záznamu ji nejprve oddělte od toho, co je na videu doloženo.'),
      option('c', 'Zapíšu nezájem o probíranou látku', 'Vycházím z toho, že žák na otázku neodpovídá.', 0, 'Záznam zamění jednu reakci za vysvětlení motivace.', 'Mlčení může mít více příčin. Takový závěr by mohl ovlivnit další očekávání bez dostatečného podkladu.')
    ],
    principle: 'Nejprve popis, potom pracovní vysvětlení a otázka k ověření.', transfer: 'Při rozboru jedné ukázky vytvořte dva sloupce: pozorovaný děj a možné vysvětlení. Jeden sporný závěr projděte s vyučujícím.', sourceIds: ['upv-uis-1']
  }),
  makeCase(2, 1, {
    title: 'Hotový list ještě není dosažený cíl', setting: 'Video z hotelové školy', role: 'Student/ka UPV při rozboru výuky',
    goal: 'Vybrat důkaz odpovídající cíli výuky.', skill: 'Cíl a důkaz učení',
    scene: 'Cílem hodiny je, aby žák zdůvodnil volbu způsobu oslovení hosta podle situace. Na videu všichni správně přepsali tři vzorové věty. Učitel se ptá, zda je hotovo; třída přikývne. Máte rozhodnout, co ještě potřebujete zjistit.',
    prompt: 'Co nejlépe doplní chybějící důkaz?',
    options: [
      option('a', 'Zkontroluji přesnost přepsaných vět', 'Porovnám pracovní listy se vzorem.', 1, 'Zjistíte přesnost zápisu, ale zdůvodnění volby zůstane neověřené.', 'Kontrola má svůj význam; cíl však obsahuje rozhodování podle situace, které opis neukáže.'),
      option('b', 'Hledám volbu v nové situaci', 'Každý vybere oslovení a zdůvodní je.', 2, 'Získáte výkon, který odpovídá cíli a není pouhým přepisem.', 'Mírně změněná situace ukáže, zda žák rozpozná okolnosti a dokáže svoji volbu vysvětlit.'),
      option('c', 'Přijmu dokončení listů jako splněný cíl', 'Práce je správně a všichni ji dokončili.', 0, 'Zaměníte splnění činnosti za zvládnutí zamýšlené schopnosti.', 'Správný produkt může vzniknout opsáním. Bez zdůvodnění není podstatná část cíle doložena.')
    ],
    principle: 'Důkaz učení vybírejte podle cíle, nikoli podle snadnosti kontroly.', transfer: 'S cvičným učitelem vyberte jeden cíl a pojmenujte konkrétní žákovský výkon, který jej doloží.', sourceIds: ['upv-uis-1', 'upv-oskr']
  }),
  makeCase(3, 1, {
    title: 'Tichá třída, rozdílné výsledky', setting: 'Videorozbor práce s technickým náčrtem', role: 'Student/ka UPV jako pozorovatel/ka',
    goal: 'Nepoužít klid ve třídě jako jediný ukazatel porozumění.', skill: 'Hledání více důkazů',
    scene: 'Třída pracuje tiše. Učitel řekne, že vše běží výborně. Kamera zabere tři listy: první má postup správně, druhý opakuje stále stejnou chybu a třetí je téměř prázdný. Při rozboru máte zhodnotit, co lze z ukázky usoudit.',
    prompt: 'Jaký závěr odpovídá dostupným údajům?',
    options: [
      option('a', 'Klid potvrzuje, že zadání všichni pochopili', 'Problémy na listech doženou během práce.', 0, 'Přehlédnete konkrétní signály, že část žáků může potřebovat podporu.', 'Samotná absence rušení neprokazuje porozumění ani úspěšný postup.'),
      option('b', 'Popíšu problém na dvou listech', 'Zachytím chybu a chybějící práci, další žáky zatím neprověřím.', 1, 'Zaznamenáte důležitý signál, ale o dalších žácích stále chybí informace.', 'Popis zachycených listů je podložený. Pro posouzení celé třídy však potřebujete širší ověření.'),
      option('c', 'Výsledky se liší; potřebujeme širší ověření', 'Klidné prostředí posoudím zvlášť.', 2, 'Zachováte to, co funguje, a pojmenujete konkrétní nejistotu.', 'Výstupy zachycených žáků se liší. Další kontrola může zjistit rozsah obtíží bez nálepkování celé třídy.')
    ],
    principle: 'Vhodné prostředí pomáhá učení, ale samo učení nedokládá.', transfer: 'Během domluveného náslechu porovnejte průběh činnosti s několika neidentifikujícími ukázkami výsledků a proberte rozdíl s učitelem.', sourceIds: ['upv-uis-1', 'upv-kraau']
  }),
  makeCase(4, 1, {
    title: 'Kdo během ukázky vlastně vidí?', setting: 'Video demonstrace v učebně', role: 'Student/ka UPV při pozorování',
    goal: 'Rozpoznat překážku v uspořádání demonstrace.', skill: 'Podmínky pro názorné učení',
    scene: 'Učitel předvádí ruční skládání papírového modelu na stole. Čtyři žáci stojí za ostatními a naklánějí se do stran. Při samostatném pokusu právě oni vynechají první přehyb. Ostatní kroky se jim daří. Nejde o práci s nebezpečným nástrojem.',
    prompt: 'Jaký podnět je pro rozbor nejpřesnější?',
    options: [
      option('a', 'Prověřím, kdo viděl první krok', 'Porovnám místo žáků a chybný přehyb.', 2, 'Otevřete ověřitelnou možnost změnit rozestavení a ukázku zopakovat.', 'Časová i prostorová souvislost je důvodem k otázce, ne automatickým důkazem příčiny.'),
      option('b', 'Navrhnu delší ukázku pro všechny', 'Učitel předvede celý postup znovu stejným způsobem.', 1, 'Opakování může pomoci, ale překážka ve výhledu může zůstat.', 'Délka ukázky nemusí být problém. Je potřeba prověřit, zda se informace vůbec dostane ke všem.'),
      option('c', 'Doporučím žákům více se soustředit', 'Chyba nastala hned na začátku postupu.', 0, 'Přenesete odpovědnost na žáky bez ověření podmínek.', 'Z videa nevyplývá nesoustředěnost. Pozorované postavení nabízí konkrétnější vysvětlení.')
    ],
    principle: 'Před závěrem o schopnosti žáka ověřte, zda měl dostupné zadání a ukázku.', transfer: 'Před pozorovanou demonstrací se s učitelem domluvte, že budete sledovat viditelnost a slyšitelnost z různých míst.', sourceIds: ['upv-uis-1', 'upv-oskr']
  }),
  makeCase(5, 2, {
    title: 'Před náslechem znáte jen název hodiny', setting: 'Příprava skupinového náslechu na SOŠ', role: 'Student/ka UPV ve skupině pozorovatelů',
    goal: 'Připravit pozorování v kontextu výuky.', skill: 'Smysluplná příprava náslechu',
    scene: 'Zítra sledujete hodinu „Komunikace se zákazníkem“. Máte školní vzdělávací program, ale neznáte konkrétní cíl ani to, co už třída trénovala. Skupina si chce rozdělit, kdo bude hodnotit učitele, žáky a pomůcky.',
    prompt: 'Co uděláte před rozdělením pozorování?',
    options: [
      option('a', 'Každému přidělím stejně rozsáhlou oblast', 'Podrobnosti zjistíme až během hodiny.', 1, 'Práce bude rozdělená, ale některé záznamy nemusí odpovídat cíli.', 'Organizace skupiny pomůže až tehdy, když víte, čemu má pozorování sloužit.'),
      option('b', 'Doptám se na cíl a návaznost hodiny', 'S učitelem vyjasním kontext a potom zaměření záznamů.', 2, 'Skupina sleduje podstatné situace a vyhne se hodnocení vytrženému z kontextu.', 'Stejná aktivita může mít jiný smysl při prvním nácviku a při samostatném ověřování.'),
      option('c', 'Převezmu cíl z předchozího vzorového náslechu', 'Téma i ročník jsou podobné.', 0, 'Do záznamu vstoupí neověřený předpoklad o záměru cizí hodiny.', 'Podobný název tématu nezaručuje stejný cíl, předchozí zkušenost ani požadovaný výkon.')
    ],
    principle: 'Dobré pozorování začíná přesně položenou otázkou a znalostí kontextu.', transfer: 'Před jedním náslechem si od učitele ověřte cíl, předchozí učivo a jeden jev, na který se máte zaměřit.', sourceIds: ['upv-uis-2']
  }),
  makeCase(6, 2, {
    title: 'Dva pozorovatelé, dva různé závěry', setting: 'Společný rozbor skupinového náslechu', role: 'Student/ka UPV při kolegiální diskusi',
    goal: 'Vyjasnit nesouhlas pomocí záznamů a kritérií.', skill: 'Profesní dialog',
    scene: 'Vy jste napsali „většina žáků byla aktivní“, kolegyně „pracovali jen dva“. Oba jste pozorovali stejnou hodinu. Vy jste počítali práci ve dvojicích, kolegyně pouze hlasité odpovědi před třídou. Máte odevzdat společný závěr.',
    prompt: 'Jak postupovat, aby závěr něco znamenal?',
    options: [
      option('a', 'Rozhodneme hlasováním celé skupiny', 'Převezmeme názor, který získá většinu.', 0, 'Získáte shodu, ale nevyřešíte rozdílný význam slova aktivita.', 'Počet souhlasících nenahrazuje vyjasnění toho, co každý pozoroval.'),
      option('b', 'Uvedeme obě hodnocení vedle sebe', 'V závěru zachováme pohled každého pozorovatele.', 1, 'Rozdíl nezamlčíte, ale čtenář stále neví, odkud pochází.', 'Různé pohledy jsou cenné; potřebují být ukotvené v konkrétní činnosti a čase.'),
      option('c', 'Porovnáme, co každý počítal', 'Oddělíme práci ve dvojicích a hlasité odpovědi.', 2, 'Zjistíte, že údaje se mohou doplňovat, aniž by jeden musel být chybný.', 'Stejný pojem jste používali různě. Společná definice zpřesní další pozorování.')
    ],
    principle: 'Než hledáte shodu v hodnocení, sjednoťte význam pozorovaných znaků.', transfer: 'Před dalším skupinovým náslechem si na krátké společné ukázce ověřte, zda zaznamenáváte stejný jev stejně.', sourceIds: ['upv-uis-2', 'upv-kraau']
  }),
  makeCase(7, 2, {
    title: 'Odpovědi zná pořád stejná dvojice', setting: 'Náslech odborného předmětu', role: 'Student/ka UPV jako člen/ka pozorující skupiny',
    goal: 'Rozlišit výkon dobrovolníků od porozumění celé skupiny.', skill: 'Rozsah pozorovaného důkazu',
    scene: 'Učitel položil osm otázek. Na sedm odpověděli stejní dva dobrovolníci správně; ostatní nemluvili. Učitel uzavřel, že třída látce rozumí. Vaše skupina má do rozboru připravit věcnou otázku, nikoli přebírat výuku.',
    prompt: 'Která otázka nejlépe odpovídá záznamu?',
    options: [
      option('a', 'A co porozumění ostatních?', 'Navrhnu krátkou samostatnou odpověď všech.', 2, 'Rozbor se zaměří na chybějící informace o širší skupině.', 'Správné odpovědi dvojice jsou důkazem jejího výkonu. O ostatních zatím víte málo.'),
      option('b', 'Neměli bychom dobrovolníky přestat vyvolávat?', 'Omezíme jejich prostor pro další odpovědi.', 1, 'Můžete uvolnit prostor, ale samotné omezení nezajistí informace od všech.', 'Cílem není trestat iniciativu, nýbrž vhodně rozšířit příležitost odpovědět.'),
      option('c', 'Proč se ostatní žáci nechtějí učit?', 'Zaměřím se na jejich malou ochotu mluvit.', 0, 'Do otázky vložíte neověřený výklad motivace.', 'Mlčení neukazuje, zda žák rozumí, přemýšlí, váhá, nebo nedostal prostor.')
    ],
    principle: 'Závěr o celé třídě potřebuje informace i mimo nejhlasitější žáky.', transfer: 'Se souhlasem učitele sledujte počet různých odpovídajících bez jmen a porovnejte jej se způsobem ověřování porozumění.', sourceIds: ['upv-uis-2', 'upv-oskr']
  }),
  makeCase(8, 2, {
    title: 'Plynulá ukázka, nejistý první pokus', setting: 'Skupinový náslech výuky aranžování', role: 'Student/ka UPV jako pozorovatel/ka',
    goal: 'Rozlišit kvalitu předvedení od zvládnutí žákem.', skill: 'Pozorování nácviku',
    scene: 'Učitel plynule předvedl sestavení stolní dekorace z bezpečných papírových dílů. Žáci sledovali a přikyvovali. V následném pokusu se mnozí ptají, kterým dílem začít. Skupina chce v zápisu pochválit bezchybnou demonstraci jako důkaz úspěšného nácviku.',
    prompt: 'Co do společného závěru doplníte?',
    options: [
      option('a', 'Zapíšu úvodní dotazy a navrhnu více procvičování', 'Doporučení zatím nevážu na určitý krok postupu.', 1, 'Zachytíte obtíže při zahájení; další nácvik ale ještě nemá konkrétní zaměření.', 'Obecně více procvičovat může být užitečné. Přesnější podporu umožní zjistit, který krok žáky zastavil.'),
      option('b', 'Oddělím ukázku od prvního pokusu', 'Zapíšu, při kterém kroku žáci váhají.', 2, 'Učitel získá konkrétní podnět, který může vyzkoušet.', 'Plynulé předvedení je jedna část výuky. Žák potřebuje příležitost postup sám provést a získat zpětnou vazbu.'),
      option('c', 'Označím dotazy za běžný detail bez významu', 'Hlavní je odborná správnost celé ukázky.', 0, 'Ztrácíte informaci o překážce, která brání žákům začít.', 'Opakující se dotaz může ukazovat, který krok zůstal skrytý nebo příliš rychlý.')
    ],
    principle: 'Sledujte nejen učitelovo předvedení, ale i to, co po něm zvládne žák.', transfer: 'Při náslechu si poznamenejte jeden rozdíl mezi ukázkou a prvním pokusem žáků a otevřete jej v rozboru.', sourceIds: ['upv-uis-2', 'upv-oskr']
  }),
  makeCase(9, 3, {
    title: 'Stejná chyba nemusí mít stejnou příčinu', setting: 'Individuální náslech odborné výuky', role: 'Student/ka UPV pod vedením cvičného učitele',
    goal: 'Připravit otázku, která rozliší možné příčiny chyby.', skill: 'Didaktický úsudek',
    scene: 'Dva žáci chybně seřadili kroky jednoduchého pracovního plánu. Jeden tvrdí, že přehlédl řádek, druhý nedokáže vysvětlit návaznost kroků. Cvičný učitel se při rozboru ptá, jak byste navrhli další podporu. Zatím nemáte další údaje.',
    prompt: 'Co je vhodný první krok?',
    options: [
      option('a', 'Oběma nabídnu stejný správný vzor', 'Chyba je totožná, pomoc proto může být stejná.', 1, 'Žáci mohou chybu opravit, ale příčina zůstane skrytá.', 'Vzor někdy pomůže. Bez krátkého vysvětlení postupu nevíte, zda je potřeba pozornost, nebo nové porozumění.'),
      option('b', 'Oba zařadím mezi žáky bez základních znalostí', 'Rozhodnu podle výsledného chybného pořadí.', 0, 'Z jedné chyby vytvoříte trvalejší nálepku a možná zbytečně snížíte nároky.', 'Výsledek sám nerozlišuje mezi nepozorností, nejasným zadáním a nepochopením.'),
      option('c', 'Nechám každého popsat rozhodující krok', 'S učitelem ověřím příčinu a teprve potom zvolím podporu.', 2, 'Navazující pomoc může reagovat na konkrétní potřebu každého žáka.', 'Krátká cílená otázka přinese více než automatické přiřazení stejné nápravy.')
    ],
    principle: 'Než opravujete chybu, zjistěte, jak vznikla.', transfer: 'V rozboru náslechu navrhněte k jedné chybě dvě možné příčiny a jednu otázku, která je pomůže rozlišit.', sourceIds: ['upv-uis-3']
  }),
  makeCase(10, 3, {
    title: 'Pomoc, nebo zbytečné snížení nároku?', setting: 'Náslech výuky s delším zadáním', role: 'Student/ka UPV jako pozorovatel/ka',
    goal: 'Navrhnout podporu podle pozorované překážky.', skill: 'Přístupné zadání',
    scene: 'Žák po dlouhém ústním zadání začne jinou část úkolu. Když mu učitel zadání rozdělí do tří krátkých kroků na kartě, pracuje správně. Spolužák na náslechu navrhuje, aby tento žák příště dostával jednodušší obsah. Nemáte žádné další podklady o jeho potřebách.',
    prompt: 'Jaký návrh nejlépe odpovídá pozorování?',
    options: [
      option('a', 'Zachovám cíl a zpřehledním zadání', 'Úpravu a další pozorování domluvím s cvičným učitelem.', 2, 'Podpora reaguje na doloženou překážku a ponechá příležitost zvládnout obsah.', 'Z této situace vyplývá přínos struktury zadání. Nevyplývá z ní, že žák potřebuje méně náročný cíl.'),
      option('b', 'Před každým úkolem zadání zopakuji', 'Zatím použiji stejnou dlouhou ústní podobu.', 1, 'Další vysvětlení může pomoci, ale účinnější oporu už jste pozorovali.', 'Opakování bez změny podoby nemusí odstranit obtíž se sledováním více kroků.'),
      option('c', 'Doporučím jednodušší obsah dalších úkolů', 'Snížím nároky, aby chybných začátků ubylo.', 0, 'Můžete snížit příležitost učit se na základě příliš slabého důkazu.', 'Jedna reakce na dlouhé zadání není podkladem pro trvalé snížení nároků ani pro diagnózu.')
    ],
    principle: 'Podporu volte podle konkrétní překážky; diagnózu z jedné situace neodvozujte.', transfer: 'Při náslechu porovnejte dvě podoby zadání stejného cíle a proberte s učitelem, kdo z nich měl užitek.', sourceIds: ['upv-uis-3', 'upv-oskr']
  }),
  makeCase(11, 3, {
    title: 'Dobrý pocit, ale podle čeho?', setting: 'Rozbor hodnocení praktického úkolu', role: 'Student/ka UPV při individuálním náslechu',
    goal: 'Navázat hodnocení na předem srozumitelná kritéria.', skill: 'Průhledné hodnocení',
    scene: 'Dva podobně kvalitní návrhy výlohy dostaly odlišnou zpětnou vazbu. Jeden byl pochválen jako „profesionální“, druhý jako „málo nápaditý“. Cílem bylo čitelné uspořádání informací, nikoli výtvarná originalita. Při rozboru máte navrhnout, jak hodnocení zpřesnit.',
    prompt: 'Na co se zaměříte?',
    options: [
      option('a', 'Navrhnu stejnou pochvalu pro všechny', 'Tím předejdu pocitu nespravedlnosti.', 0, 'Hodnocení bude příjemné, ale nepomůže rozpoznat kvalitu práce.', 'Rovný přístup neznamená stejný komentář bez ohledu na skutečný výkon.'),
      option('b', 'Zaměřím se na kritéria zadání', 'Porovnám čitelnost a uspořádání obou návrhů.', 2, 'Žáci mohou rozumět rozdílu v hodnocení i dalšímu kroku ke zlepšení.', 'Kritéria musí odpovídat tomu, co se učilo; dojem z originality nemá tiše měnit cíl úkolu.'),
      option('c', 'Doplním ke každému návrhu více pochval', 'Negativní komentář tak bude vyváženější.', 1, 'Tón může být podporující, ale důvod hodnocení stále zůstane nejasný.', 'Povzbuzení je užitečné. Bez konkrétního kritéria však žák neví, co zachovat a co změnit.')
    ],
    principle: 'Hodnocení má ukázat vztah mezi zadáním, výkonem a dalším krokem.', transfer: 'Po dohodě s učitelem přiřaďte dvěma neidentifikujícím ukázkám práce stejná kritéria a společně vysvětlete případný rozdíl.', sourceIds: ['upv-uis-3', 'upv-kraau']
  }),
  makeCase(12, 3, {
    title: 'Jedna hodina nevysvětluje celou třídu', setting: 'První individuální náslech', role: 'Student/ka UPV při rozhovoru s cvičným učitelem',
    goal: 'Ověřit kontext před zobecněním pozorování.', skill: 'Práce s nejistotou',
    scene: 'V první sledované hodině žáci působili unaveně a pomalu reagovali. Chcete napsat, že zvolená metoda není pro tuto třídu vhodná. Učitel zmíní změnu rozvrhu a náročnou předchozí akci. Není jasné, jak třída obvykle pracuje.',
    prompt: 'Jaký závěr zapíšete?',
    options: [
      option('a', 'Metoda se pro tuto třídu nehodí', 'Rozhodující je první pozorovaný výkon.', 0, 'Přisoudíte příčinu metodě, i když okolnosti nejsou oddělené.', 'Jedna hodina neumožňuje rozlišit účinek metody od vlivu jiných podmínek.'),
      option('b', 'Zapíšu únavu jako možné vysvětlení', 'Zohledním změnu rozvrhu, další pozorování zatím nenaplánuji.', 1, 'Doplníte důležitý kontext bez tvrzení, že znáte jedinou příčinu.', 'Pracovní vysvětlení je přiměřené. Zatím ale chybí krok, který by je pomohl prověřit v běžných podmínkách.'),
      option('c', 'Popíšu výkon a jeho okolnosti', 'Domluvím další pozorování v běžné hodině.', 2, 'Záznam zůstane poctivý a navede další náslech.', 'Nejistotu lze přesně pojmenovat a postupně snížit dalšími údaji.')
    ],
    principle: 'Přiměřený závěr může být zatím otevřený.', transfer: 'S učitelem vyberte jeden jev k opakovanému pozorování a zaznamenejte také změny podmínek.', sourceIds: ['upv-uis-3']
  }),
  makeCase(13, 4, {
    title: 'Devadesát sekund na dobré zadání', setting: 'Microteaching před spolužáky', role: 'Student/ka UPV vedoucí mikrovýstup',
    goal: 'Zadat krátký úkol s ověřitelným výsledkem.', skill: 'Srozumitelné instrukce',
    scene: 'Máte devadesát sekund na zahájení nácviku: dvojice mají vybrat vhodnou odpověď na běžnou stížnost hosta a uvést jeden důvod. Nejde o skutečného klienta. Chcete, aby spolužáci hned začali a po třech minutách měli porovnatelný výsledek.',
    prompt: 'Jak zadání uzavřete?',
    options: [
      option('a', 'Vymezím výstup, čas a ověřím první krok', 'Jedna dvojice vlastními slovy řekne, co má odevzdat.', 2, 'Rychle zjistíte, zda instrukce vedou k zamýšlené činnosti.', 'Krátké ověření může zachytit nejasnost před začátkem; nejde o další dlouhý výklad.'),
      option('b', 'Zeptám se, zda je všechno jasné', 'Po souhlasném přikývnutí spustím čas.', 1, 'Žáci mohou začít, ale skryté neporozumění nemusí vyjít najevo.', 'Obecná otázka nechává prostor mlčet. Konkrétní vlastní formulace více ukáže.'),
      option('c', 'Přidám všechny možné varianty situace', 'Podrobnostmi předejdu případným dotazům.', 0, 'Krátké zadání zahltíte informacemi, které nejsou pro první krok nutné.', 'Přesnost nevyžaduje vysvětlit vše najednou. Důležitý je jasný cíl a proveditelný začátek.')
    ],
    principle: 'Dobré zadání umožní začít a poznat, kdy je úkol splněný.', transfer: 'Při mikrovýstupu si nechte od spolužáka zaznamenat první instrukci a první reakci skupiny. Potom instrukci upravte.', sourceIds: ['upv-uis-4']
  }),
  makeCase(14, 4, {
    title: 'Projektor nefunguje. Cíl zůstává.', setting: 'Microteaching bez funkčního projektoru', role: 'Student/ka UPV připravující mikrovýstup',
    goal: 'Zachovat cíl při změně prostředku výuky.', skill: 'Přizpůsobení výukového plánu',
    scene: 'Žáci mají porovnat dvě nabídky služeb a zdůvodnit výběr podle zadaných potřeb zákazníka. Projektor nefunguje. Máte obě nabídky také vytištěné a papírové kartičky potřeb. Na mikrovýstup zbývá osm minut.',
    prompt: 'Co je nejúčelnější změna?',
    options: [
      option('a', 'Věnuji úvod pokusu projektor opravit', 'Původní prezentace je připravená nejlépe.', 1, 'Technika se možná obnoví, ale ubývá čas na zamýšlené rozhodování žáků.', 'Krátká kontrola má smysl; při dostupné náhradě není účelné spotřebovat výuku na opravu.'),
      option('b', 'Použiji tištěné nabídky', 'Dvojice vyberou službu a zdůvodní svou volbu.', 2, 'Žáci mohou dosáhnout cíle i bez původní techniky.', 'Změnili jste prostředek, nikoli to podstatné, co mají žáci vykonat.'),
      option('c', 'Nahradím porovnání přednáškou o službách', 'Vysvětlím, která nabídka je lepší.', 0, 'Z výuky zmizí samostatná volba, kterou měl cíl procvičit.', 'Téma zůstalo podobné, ale žáci už neprovádějí zamýšlenou činnost.')
    ],
    principle: 'Pomůcka slouží cíli; při výpadku hledejte jiný způsob stejné učební činnosti.', transfer: 'K příštímu mikrovýstupu připravte jednu variantu bez hlavní techniky a s vyučujícím ověřte, zda zachovává cíl.', sourceIds: ['upv-uis-4', 'upv-oskr']
  }),
  makeCase(15, 4, {
    title: 'AI připravila hezký, ale rozporný příklad', setting: 'Příprava mikrovýstupu s AI', role: 'Student/ka UPV jako autor/ka výukového příkladu',
    goal: 'Ověřit odborný obsah před použitím ve výuce.', skill: 'Kontrola podkladů z AI',
    scene: 'AI vytvořila přehledný příklad kalkulace zakázky. Při kontrole si všimnete, že dvě tabulky používají různé jednotky množství, ale závěr působí přesvědčivě. Máte dostupnou ověřenou školní metodiku a vlastní zadání. Příklad ještě nikdo ze žáků neviděl.',
    prompt: 'Jak s příkladem naložíte?',
    options: [
      option('a', 'Sjednotím vzhled obou tabulek', 'Výsledek převezmu; jeho číselná hodnota působí přiměřeně.', 0, 'Grafická úprava může zakrýt obsahový rozpor.', 'Přiměřeně vypadající číslo není kontrolou jednotek, vstupů ani postupu.'),
      option('b', 'Požádám AI o kontrolu jejího postupu', 'Příklad zatím odložím, kontrolu podle metodiky teprve připravím.', 1, 'Příklad zatím nepoužijete a můžete získat námět k opravě. Nezávislé ověření však ještě chybí.', 'AI může vlastní chybu zopakovat. Její další odpověď nenahrazuje porovnání s podkladem a výpočet.'),
      option('c', 'Přepočítám příklad podle metodiky', 'Prověřím vstupy, jednotky a správnost postupu.', 2, 'Výukový materiál získá dohledatelný základ a ověřený postup.', 'Za výběr a odbornou kontrolu příkladu odpovídá jeho uživatel ve výuce, i když návrh vytvořila AI.')
    ],
    principle: 'AI může návrh urychlit; přesvědčivá forma nedokládá správnost obsahu.', transfer: 'K jednomu materiálu z AI si veďte krátký záznam: původní návrh, ověřený zdroj, opravená chyba a kontrola výsledku.', sourceIds: ['upv-uis-4', 'upv-oskr']
  }),
  makeCase(16, 4, {
    title: 'Po mikrovýstupu dostanete pět rad', setting: 'Zpětná vazba po microteachingu', role: 'Student/ka UPV před opakováním mikrovýstupu',
    goal: 'Vybrat jednu změnu podle významu a důkazu.', skill: 'Využití zpětné vazby',
    scene: 'Spolužáci doporučili více úsměvu, jiné barvy snímků, pomalejší řeč, delší úvod a jasnější zadání. Na záznamu dva účastníci začali jiný úkol, než jste zamýšleli. Za chvíli máte výstup zopakovat a změnit jednu věc.',
    prompt: 'Na kterou změnu se zaměříte jako první?',
    options: [
      option('a', 'Zpřesním zadání a zkusím je znovu', 'Ověřím, zda skupina začne správný úkol.', 2, 'Změna reaguje na konkrétní překážku a můžete ověřit její účinek.', 'Máte konkrétní signál, že zadání potřebuje ověřit. Tato úprava má pro aktuální cíl větší význam než kosmetická změna.'),
      option('b', 'Zpomalím řeč během celého výstupu', 'Zadání zachovám; delší čas by měl podpořit porozumění.', 1, 'Tempo může pomoci, ale nemusí odstranit chybějící nebo rozpornou instrukci.', 'Užitečný nápad je potřeba spojit s přesným místem, kde vzniklo neporozumění.'),
      option('c', 'Zapracuji všech pět rad do nového výstupu', 'Změním zadání, tempo, úvod, vzhled snímků i projev.', 0, 'Při krátkém opakování nepoznáte, která změna pomohla, a můžete přidat nové potíže.', 'Úplná přestavba ztíží provedení i reflexi. Pro tento nácvik je přínosnější jeden cílený krok.')
    ],
    principle: 'Zpětnou vazbu proměňte v konkrétní změnu a ověřte její účinek.', transfer: 'Před opakováním mikrovýstupu napište jednu změnu a jeden pozorovatelný znak zlepšení. Po výstupu je porovnejte.', sourceIds: ['upv-uis-4', 'upv-kraau']
  }),
  makeCase(17, 5, {
    title: 'Bezpečný začátek předchází splnění plánu', setting: 'Praktická výuka ve školní dílně', role: 'Student/ka UPV pod vedením cvičného učitele',
    goal: 'Rozpoznat hranici své role při bezpečnostní nejistotě.', skill: 'Bezpečnost a odpovědnost',
    scene: 'Má začít činnost s vybavením, které ještě neznáte. Žák upozorní na chybějící ochranný prvek uvedený v místních pokynech. Cvičný učitel je na dohled. Skupina čeká a Vy jste pozadu s plánem. Provoz zařízení dosud nezačal.',
    prompt: 'Jaký první krok je obhajitelný?',
    options: [
      option('a', 'Činnost nespustím; přejdu k teorii', 'Nikdo zařízení nepoužije, učitele oslovím po hodině.', 1, 'Zamezíte použití neověřeného zařízení, ale řešení dostupnou odpovědnou osobou odkládáte.', 'Nezahájit činnost je správné. Když je učitel přítomen, přizvěte jej hned: potvrdí bezpečnou organizaci skupiny i další postup.'),
      option('b', 'Činnost nespustím a přivolám cvičného učitele', 'S ním zvolím bezpečný další postup pro skupinu.', 2, 'Rozhodnutí o zařízení převezme osoba znalá místních podmínek a své odpovědnosti.', 'Nejistotu nelze překrýt tlakem na plán. Nácvik zde neudává technický postup opravy ani obsluhy.'),
      option('c', 'Ochranný prvek nahradím dostupnou pomůckou', 'Chci zachovat plán a zařízení hned využít.', 0, 'Improvizujete bezpečnostní řešení mimo ověřený postup a své znalosti.', 'O vhodnosti náhrady nemáte potřebné informace ani potvrzení odpovědné osoby.')
    ],
    principle: 'Při bezpečnostní nejistotě se činnost nerozbíhá; postup se ověří s odpovědným učitelem.', transfer: 'Před prvním výstupem projděte s cvičným učitelem místní pravidla, rozdělení odpovědnosti a postup přerušení činnosti.', sourceIds: ['upv-uis-5', 'upv-method', 'upv-oskr']
  }),
  makeCase(18, 5, {
    title: 'Zakázka je hotová. Procvičili si ji všichni?', setting: 'Skupinová tvorba nabídky v odborné učebně', role: 'Student/ka UPV vedoucí domluvený výstup',
    goal: 'Zachovat příležitost každého žáka nacvičit cílovou činnost.', skill: 'Organizace společné práce',
    scene: 'Čtveřice má připravit návrh služby; každý má umět zdůvodnit cenu. Jeden žák vytvořil celou kalkulaci a ostatní upravovali vzhled. Výsledek je hotový dříve. Do konce činnosti zbývá šest minut a cvičný učitel sleduje Váš výstup.',
    prompt: 'Jak využijete zbývající čas?',
    options: [
      option('a', 'Pochválím rychlost a zadám další společný návrh', 'Skupina má zjevně dostatečnou kapacitu.', 0, 'Rychlý člen může znovu převzít celou cílovou činnost.', 'Společný produkt nedokládá, že cenu umí zdůvodnit každý.'),
      option('b', 'Nechám autora vysvětlit výpočet celé skupině', 'Ostatní jeho postup sledují a mohou se ptát.', 1, 'Vysvětlení může pomoci, ale samostatné porozumění ostatních zůstává neověřené.', 'Sledovat postup je jiná činnost než jej vlastními slovy zdůvodnit.'),
      option('c', 'Každý vysvětlí změnu jednoho vstupu', 'Dvojice potom porovnají dopad na cenu.', 2, 'Každý získá příležitost uplatnit cílové uvažování a Vy uvidíte, kdo potřebuje pomoc.', 'Úprava navazuje na hotovou práci a cíleně doplňuje chybějící individuální výkon.')
    ],
    principle: 'Skupinový úspěch a individuální učení sledujte odděleně.', transfer: 'S cvičným učitelem do jedné skupinové činnosti zařaďte krátký individuální výstup navázaný na její cíl.', sourceIds: ['upv-uis-5', 'upv-oskr']
  }),
  makeCase(19, 5, {
    title: 'Plán pokračuje, porozumění zatím ne', setting: 'Vlastní výstup v odborném předmětu', role: 'Student/ka UPV s přítomným cvičným učitelem',
    goal: 'Upravit další krok výuky podle zjištěného porozumění.', skill: 'Reakce na průběžné ověření',
    scene: 'Polovina třídy v krátkém ověření zaměnila vstupní údaj a výsledek jednoduché kalkulace. Další úkol na tomto rozlišení stojí. Do konce hodiny zbývá patnáct minut. V přípravě máte ještě dvě aktivity a chcete stihnout celý plán.',
    prompt: 'Co uděláte jako další krok?',
    options: [
      option('a', 'Vrátím se k rozlišení na příkladu', 'Pak ověřím odpovědi a upravím další úkol.', 2, 'Výuka reaguje na zjištěnou překážku místo dalšího hromadění chyb.', 'Pokud další krok závisí na nezvládnutém rozlišení, je cílená úprava účelnější než dodržení počtu aktivit.'),
      option('b', 'Zopakuji správnou definici a pokračuji', 'Zachovám obě naplánované aktivity.', 1, 'Vysvětlení může některým pomoci, ale bez ověření nevíte komu.', 'Pouhé zopakování neukáže, zda žáci rozlišení skutečně použijí.'),
      option('c', 'Pokračuji a chyby rozeberu po dokončení všeho', 'Celkový kontext snad pomůže pochopit základ.', 0, 'Navazující úloha může procvičovat nesprávné pojetí a zvýšit frustraci.', 'Máte konkrétní informaci, že předpoklad další aktivity zatím část třídy nezvládá.')
    ],
    principle: 'Plán výuky je opora pro dosažení cíle; průběžné údaje mohou změnit cestu.', transfer: 'Do přípravy s cvičným učitelem vyznačte jeden rozhodovací bod: podle jakého výsledku budete pokračovat nebo vložíte podporu.', sourceIds: ['upv-uis-5', 'upv-kraau']
  }),
  makeCase(20, 5, {
    title: 'Žák zpochybní Váš výpočet', setting: 'Vlastní výstup s modelovou kalkulací', role: 'Student/ka UPV při řízené praxi',
    goal: 'Zareagovat na věcnou námitku a opravit případnou chybu.', skill: 'Odborná důvěryhodnost',
    scene: 'Při porovnání cen služby žák upozorní, že jste do tabulky dvakrát započítali jednu položku. Nejste si jistí. Tabulka je promítnutá, zdrojové zadání je dostupné a úkol není bezpečnostně rizikový. Cvičný učitel je přítomen.',
    prompt: 'Jak odpovíte?',
    options: [
      option('a', 'Potvrdím svůj výsledek a kontrolu nechám po hodině', 'Nechci ztratit plynulost výkladu.', 0, 'Třída může pokračovat s chybou, kterou jste právě mohli ověřit.', 'Plynulost výkladu není důvodem vydávat neověřený údaj za jistý.'),
      option('b', 'Porovnám položky se zadáním', 'Případnou chybu opravím a přepočítám výsledek.', 2, 'Žáci vidí odborný postup kontroly a důvod případné opravy.', 'Věcná námitka je příležitostí ukázat, jak se rozhodnutí ověřuje, nikoli zkouškou neomylnosti.'),
      option('c', 'Přenechám celý zbytek příkladu cvičnému učiteli', 'Odpovědnost za správnost tak bude jasná.', 1, 'Získáte podporu, ale zbytečně se vzdáte dostupné vlastní kontroly.', 'Učitele přizvěte, pokud nejistota trvá. Zde můžete nejprve sami projít konkrétní položky.')
    ],
    principle: 'Důvěryhodnost stojí i na schopnosti ověřit námitku a transparentně opravit chybu.', transfer: 'Při rozboru výstupu s učitelem projděte jednu situaci, kdy jste změnili nebo ověřili své vysvětlení.', sourceIds: ['upv-uis-5', 'upv-oskr']
  }),
  makeCase(21, 6, {
    title: 'Hodina byla příjemná. Co se žáci naučili?', setting: 'Reflexní seminář po řízené praxi', role: 'Student/ka UPV s vlastními podklady',
    goal: 'Propojit vlastní dojem s výstupy žáků.', skill: 'Reflexe opřená o důkazy',
    scene: 'V reflexi píšete „hodina se povedla, žáci byli spokojení“. Máte také závěrečné odpovědi: většina správně vybrala řešení, ale jen třetina je zdůvodnila. Cílem byla volba i zdůvodnění. Cvičný učitel pochválil příjemnou komunikaci.',
    prompt: 'Jak reflexi zpřesníte?',
    options: [
      option('a', 'Hodinu označím za celkově úspěšnou', 'Pochvala učitele i spokojenost žáků se shodují.', 0, 'Podstatný rozdíl mezi částmi cíle se nepromítne do další výuky.', 'Příjemná atmosféra má hodnotu, ale nedokládá splnění obou částí cíle.'),
      option('b', 'Označím hodinu za neúspěšnou', 'Zdůvodnění většina žáků nezvládla.', 1, 'Všímáte si důležitého problému, ale přehlédnete dílčí úspěchy.', 'Užitečná reflexe rozliší, co se podařilo, co ne a na co má navazovat další krok.'),
      option('c', 'Rozliším atmosféru, volbu a zdůvodnění', 'Navrhnu další nácvik důvodu a způsob jeho ověření.', 2, 'Máte konkrétní základ pro navazující výuku i zachování toho, co fungovalo.', 'Tři různé informace mohou platit současně; jejich oddělení zpřesní plán zlepšení.')
    ],
    principle: 'Reflexe je užitečná, když mění další rozhodnutí, nikoli jen celkový dojem.', transfer: 'Do semináře přineste neidentifikující souhrn výsledků k jednomu cíli a vedle něj vlastní původní očekávání.', sourceIds: ['upv-uis-6']
  }),
  makeCase(22, 6, {
    title: 'První a druhý pokus nejsou stejná situace', setting: 'Vyhodnocování vlastního profesního pokroku', role: 'Student/ka UPV v reflexním semináři',
    goal: 'Vymezit, co výsledky dvou pokusů dovolují tvrdit.', skill: 'Přiměřené závěry o zlepšení',
    scene: 'Při druhé hodině dopadli žáci lépe. Použili jste nové kartičky, ale současně měli jednodušší zadání a deset minut navíc. Chcete do portfolia napsat, že kartičky prokazatelně zvýšily úspěšnost. Vyučující Vás žádá o přesnější závěr.',
    prompt: 'Která formulace odpovídá podkladům?',
    options: [
      option('a', 'Výsledek se zlepšil, změnilo se však více podmínek', 'Samostatný účinek kartiček z toho nepoznám.', 2, 'Popíšete skutečný posun i hranice svého vysvětlení.', 'Změnu výsledku vidíte. Pro její přisouzení jedinému prvku však chybí srovnatelné podmínky.'),
      option('b', 'Zlepšení určitě způsobily kartičky', 'Byly nejvýraznější změnou hodiny.', 0, 'Připíšete příčinu jednomu prvku bez potřebného srovnání.', 'Výraznost změny není důkaz jejího samostatného účinku.'),
      option('c', 'Výsledky nepoužiji k závěru o zlepšení', 'Lišil se úkol i čas, srovnání proto celé vyřadím.', 1, 'Předejdete přehnanému závěru, ale zahodíte užitečnou zkušenost.', 'Údaje mohou popsat průběh a inspirovat další ověření, i když samy nedokazují příčinu.')
    ],
    principle: 'Popis změny a vysvětlení její příčiny jsou dvě různé věci.', transfer: 'S vyučujícím naplánujte malé další ověření: podobný úkol, srovnatelný čas, předem zvolený ukazatel a zaznamenané odlišnosti.', sourceIds: ['upv-uis-6']
  }),
  makeCase(23, 6, {
    title: 'Portfolio, které dovolí poznat posun', setting: 'Výběr podkladů do reflexního portfolia', role: 'Student/ka UPV připravující reflexi',
    goal: 'Vybrat podklady, které ukážou vlastní změnu v jednání.', skill: 'Dokládání profesního rozvoje',
    scene: 'Do semináře se vejdou tři krátké ukázky. Máte mnoho zdařilých příprav, jeden záznam nejasného zadání, jeho upravenou podobu a poznámku učitele, jak na úpravu reagovali žáci. Chcete ukázat, co jste se během praxe naučili.',
    prompt: 'Která trojice bude nejvýpovědnější?',
    options: [
      option('a', 'Tři nejlépe graficky zpracované přípravy', 'Portfolio bude působit profesionálně a jednotně.', 0, 'Ukázky mohou dobře vypadat, ale nemusí doložit změnu ve Vašem jednání.', 'Forma usnadňuje čtení; sama však neukazuje proces profesního učení.'),
      option('b', 'Původní zadání, úprava a záznam reakce', 'Vysvětlím důvod změny i zbývající nejistotu.', 2, 'Čtenář může sledovat problém, Vaši volbu i její pozorovaný důsledek.', 'Pro reflexi pokroku je užitečná návaznost podkladů, ne pouze výběr nejhezčích výsledků.'),
      option('c', 'Tři pochvaly od různých pozorovatelů', 'Více pohledů potvrdí můj pokrok.', 1, 'Získáte cennou zpětnou vazbu, ale bez ukázek může zůstat příliš obecná.', 'Komentáře získají sílu, když je spojíte s konkrétním cílem a doloženým jednáním.')
    ],
    principle: 'Portfolio má ukázat, co jste změnili, proč a s jakým pozorovaným výsledkem.', transfer: 'Vyberte s vyučujícím jednu trojici podkladů o téže schopnosti; odstraňte nepotřebné identifikátory třetích osob podle pravidel předmětu.', sourceIds: ['upv-uis-6']
  }),
  makeCase(24, 6, {
    title: 'Dvě dobré rady si odporují', setting: 'Supervizní rozbor závěru praxe', role: 'Student/ka UPV plánující další rozvoj',
    goal: 'Proměnit rozporné rady v ověřitelný plán.', skill: 'Samostatný profesní úsudek',
    scene: 'Cvičný učitel doporučil u odborné diskuse více času na přemýšlení, spolužák naopak rychlejší tempo. V záznamu některé odpovědi přicházejí až po chvíli; při dlouhých organizačních přechodech ale skupina ztrácí pozornost. Máte zvolit jedno opatření pro další výstup.',
    prompt: 'Jak obě rady využijete?',
    options: [
      option('a', 'Zvolím radu zkušenějšího člověka pro celou hodinu', 'Všechny činnosti proto zpomalím.', 1, 'Využijete zkušenost učitele, ale opomenete rozdíl mezi přemýšlením a organizací.', 'Autorita může dát směr; konkrétní úprava musí odpovídat místu a funkci dané situace.'),
      option('b', 'Obě rady zprůměruji do středního tempa', 'Vyhnu se příliš rychlému i pomalému vedení.', 0, 'Vznikne neurčitý pokyn bez jasného okamžiku použití.', 'Problém nemusí spočívat v celkovém tempu, nýbrž v rozdílných potřebách jednotlivých fází.'),
      option('c', 'Rozliším otázky a organizační přechody', 'Zkrátím přesuny; po otázce nechám čas.', 2, 'Obě pozorování využijete pro konkrétní změnu a její další sledování.', 'Zdánlivě rozporné rady se mohou vztahovat k různým částem výuky. Kontext umožní jejich rozumné spojení.')
    ],
    principle: 'Radu neposuzujte pouze podle autora; vztáhněte ji ke konkrétní situaci a cíli.', transfer: 'V dalším výstupu nechte kolegu zaznamenat délku dvou organizačních přechodů a reakce po vybrané otázce. Společně vyhodnoťte změnu.', sourceIds: ['upv-uis-6', 'upv-kraau']
  })
];
