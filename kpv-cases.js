// Original teaching cases, source-checked 2026-10-11. Rubrics are contextual,
// not a psychometric instrument, professional qualification or course credit.
export const kpvSources = {
  'kpv-uis-1': { title: 'UIS ČZU: Odborná praxe I (KPV), LS 2026/2027', url: 'https://is.czu.cz/katalog/syllabus.pl?predmet=285933&jazyk=1', note: 'Aktuální český sylabus. Hlavička 120 hodin a 6 kreditů; text metod obsahuje rozporných 160 hodin. Rozsah musí sjednotit garant.' },
  'kpv-uis-2': { title: 'UIS ČZU: Odborná praxe II (KPV), ZS 2026/2027', url: 'https://is.czu.cz/katalog/syllabus.pl?predmet=294643&jazyk=1', note: 'Aktuální český sylabus; 6 kreditů, zápočet. Hlavička a rozpis pracovní zátěže nejsou shodným údajem o hodinách praxe.' },
  'kpv-uis-3': { title: 'UIS ČZU: Odborná praxe III (KPV), LS 2026/2027', url: 'https://is.czu.cz/katalog/syllabus.pl?predmet=294573&jazyk=1', note: 'Aktuální český sylabus; 6 kreditů, zápočet.' },
  'kpv-uis-4': { title: 'UIS ČZU: Odborná praxe IV (KPV), ZS 2026/2027', url: 'https://is.czu.cz/katalog/syllabus.pl?predmet=294645&jazyk=1', note: 'Individuální plán navázaný na bakalářskou práci; 6 kreditů, zápočet.' },
  'kpv-uis-1k': { title: 'UIS ČZU: Odborná praxe I (KPVk), LS 2026/2027', url: 'https://is.czu.cz/katalog/syllabus.pl?predmet=294572&jazyk=1' },
  'kpv-uis-2k': { title: 'UIS ČZU: Odborná praxe II (KPVk), ZS 2026/2027', url: 'https://is.czu.cz/katalog/syllabus.pl?predmet=294644&jazyk=1' },
  'kpv-uis-3k': { title: 'UIS ČZU: Odborná praxe III (KPVk), LS 2026/2027', url: 'https://is.czu.cz/katalog/syllabus.pl?predmet=294574&jazyk=1' },
  'kpv-uis-4k': { title: 'UIS ČZU: Odborná praxe IV (KPVk), ZS 2026/2027', url: 'https://is.czu.cz/katalog/syllabus.pl?predmet=294646&jazyk=1' },
  'kpv-nsk': { title: 'NSK: Kariérový poradce / kariérová poradkyně, 75-004-R', url: 'https://www.narodnikvalifikace.cz/kvalifikace-1538/hodnotici-standard', note: 'Profesní rámec: práce s informacemi, rozhovor, etika, diagnostika, skupina, evaluace. Tato simulace není zkouškou NSK.' },
  'kpv-nsp': { title: 'NSP: Kariérový poradce pro vzdělávací a profesní dráhu', url: 'https://www.nsp.cz/jednotka-prace/karierovy-poradce-pro-vzd', note: 'Popis profesních činností; neuděluje individuální oprávnění ani psychodiagnostickou kvalifikaci.' },
  'kpv-ethics': { title: 'IAEVG: Ethical Guidelines', url: 'https://iaevg.com/Ethical-guidelines', note: 'Mezinárodní profesní vodítko, včetně odpovědného používání AI; nejde o český právní předpis.' },
  'kpv-cakp': { title: 'ČAKP: Etický kodex', url: 'https://www.cakp.cz/dokumenty-cakp/', note: 'Kodex asociace slouží jako profesní inspirace; nezaměňovat s obecně závazným právem.' },
  'kpv-quality': { title: 'Euroguidance: Podpora kvality kariérového poradenství', url: 'https://www.euroguidance.cz/publikace/sultana.pdf', note: 'Metodické východisko pro cíle, portfolio a vyhodnocování vzdělávání.' },
  'kpv-competencies': { title: 'IAEVG: International Competencies', url: 'https://iaevg.com/competencies', note: 'Profesní rámec zahrnuje výzkum, hodnocení služeb, spolupráci a práci s informacemi.' },
  'kpv-europass': { title: 'Evropská komise: Create your Europass CV', url: 'https://europass.europa.eu/en/create-europass-cv', note: 'Doporučení pro srozumitelný životopis odpovídající konkrétní nabídce.' },
  'kpv-school': { title: 'NPI ČR · Školní poradenská pracoviště', url: 'https://poradenstvi.npi.cz/skolni-poradenska-pracoviste', note: 'Kariérové poradenství ve škole a návaznost na další pracovníky poradenského pracoviště.' }
};

export const kpvStages = [
  { id: 'kpv-1', name: 'Odborná praxe I', short: 'Pozorujte a ptejte se', description: 'Naše příprava: vstup do organizace, stínování, pozorování bez nálepkování a bezpečné zacházení s informacemi.', officialNote: 'UIS 2026/27: VVV31Z / VVV141Z, LS, zápočet, 6 kreditů. Hlavička uvádí 120 hodin, část metod 160 hodin. Přesný rozsah a počet pracovišť ověřte v platných pokynech garanta; simulace je nenahrazuje.', sourceIds: ['kpv-uis-1','kpv-uis-1k'] },
  { id: 'kpv-2', name: 'Odborná praxe II', short: 'Veďte rozhovor s oporou', description: 'Naše příprava: porozumění zakázce klienta, práce s možnostmi, informacemi a přiměřenými nástroji pod vedením mentora.', officialNote: 'UIS 2026/27: VVV33Z / VVV143Z, ZS, zápočet, 6 kreditů. Zaměření na vybrané pracoviště a jeho klientelu. U hodin se řiďte potvrzenými pokyny garanta: sylabus obsahuje rozdíl mezi hlavičkou a rozpisem zátěže.', sourceIds: ['kpv-uis-2','kpv-uis-2k'] },
  { id: 'kpv-3', name: 'Odborná praxe III', short: 'Propojujte a přizpůsobujte', description: 'Naše příprava: vedení skupiny, úprava postupu, spolupráce s dalšími službami, kritická práce s AI a intervize.', officialNote: 'UIS 2026/27: VVV34Z / VVV144Z, LS, zápočet, 6 kreditů. Služby v reálném prostředí, reflektivní deník a společná reflexe. Tematické rozdělení zde je návrhem přípravy, nikoli přepisem závazné osnovy.', sourceIds: ['kpv-uis-3','kpv-uis-3k'] },
  { id: 'kpv-4', name: 'Odborná praxe IV', short: 'Ověřujte, co pomáhá', description: 'Naše příprava: propojení tématu bakalářské práce s potřebou pracoviště, vyhodnocení výsledků, předání a další profesní rozvoj.', officialNote: 'UIS 2026/27: VCV14Z / VCV18Z, ZS, zápočet, 6 kreditů. Individuální plán vzniká s účastí vedoucího bakalářské práce; praxi provází příprava, deník a závěrečná reflexe. Konkrétní zařazení závisí na studijním plánu.', sourceIds: ['kpv-uis-4','kpv-uis-4k'] }
];

const O = (id, label, detail, score, consequence, explanation) => ({id,label,detail,score,consequence,explanation});
const C = (n, stage, title, setting, goal, scene, prompt, skill, options, principle, transfer, sourceIds, sourceNote) => ({
  id: `kpv-${String(n).padStart(2,'0')}`, track: 'kpv', stage: `kpv-${stage}`, title, setting,
  role: 'Studující KPV na odborné praxi pod vedením mentora', goal, scene, prompt, skill, options, principle, transfer, sourceIds, sourceNote
});

export const kpvCases = [
  C(1,1,'První den: co už můžete převzít?','Kariérní centrum',
    'Vyjasníte si studentskou roli dříve, než přijmete samostatný úkol.',
    'Na první den máte domluveno stínování. Klient přichází o deset minut dříve a kolegyně Vás požádá o zahájení konzultace. Mentor je ve vedlejší místnosti. Dosud nemáte domluvené úkoly ani způsob vedení záznamů.',
    'Co uděláte před zahájením poradenské části?', 'Profesní hranice', [
      O('a','Vyjasním si rozsah úkolu s mentorem','Klienta přivítáte; poradenský rozhovor zahájíte až po dohodě o vedení a dohledu.',2,'Klient ví, s kým jedná, a Vy víte, za jakou část odpovídáte.','V tomto zadání chybí předchozí pověření. Krátké ověření role umožní bezpečné zapojení.'),
      O('b','Zatím projdu klientovu profesní historii','Získáte údaje o vzdělání a praxi, aby mentor mohl plynule navázat.',0,'Rozhovor už vytváří zakázku i záznam, přestože jejich pravidla neznáte.','Ani běžné otázky nejsou automaticky vhodné pro první samostatný kontakt bez vyjasněné role.'),
      O('c','Požádám klienta, aby počkal na mentora','Klienta usadíte a začátek konzultace ponecháte celý zkušenému kolegovi.',1,'Nevstoupíte za hranice role, ale nevyužijete možnost domluvit si přiměřený úkol.','Čekání je přijatelné; cílená domluva navíc podpoří Vaše učení.')
    ],'Nejasná role je důvod k domluvě, nikoli k improvizaci.',
    'S mentorem si před prvním kontaktem sepište dva dovolené úkoly a jeden úkol vyžadující jeho přítomnost.',
    ['kpv-uis-1','kpv-ethics'],'Autorská situace procvičuje pověření a hranice studentské role; nejde o univerzální zákaz rozhovoru.'),

  C(2,1,'Ticho ještě není nezájem','Pozorování konzultace',
    'Rozlišíte pozorovatelný děj od vlastní interpretace.',
    'Při stínování klient po otázce mlčí, dívá se na stůl a pak požádá o její zopakování. V deníku máte zatím větu „Klient byl nemotivovaný“. Nemáte další informace o důvodu jeho reakce.',
    'Který zápis poskytne nejlepší podklad pro rozbor?', 'Pozorování a úsudek', [
      O('a','Klient působil nejistě; poradce zopakoval otázku','Nejistotu označíte za svůj dojem a doplníte, jak poradce reagoval.',1,'Dojem je označený, ale čtenář neví, z jakého konkrétního děje vychází.','Pro společný rozbor doplňte pozorovaný podklad; opatrně formulovaný dojem jej nenahrazuje.'),
      O('b','Oddělím pozorování od vysvětlení','Zapíšete reakci; důvody označíte za hypotézy a připravíte otázku k reflexi.',2,'Mentor může porovnat Váš popis s vlastní zkušeností.','Konkrétní děj lze ověřovat; motivaci z něj samotného spolehlivě určit nelze.'),
      O('c','Vymažu celý moment, protože důvod neznám','Nejednoznačný moment vynecháte a více rozepíšete závěrečnou dohodu, které jste rozuměli.',0,'Ztratíte právě situaci, na které se můžete naučit lépe pozorovat.','Nejistotu je užitečné zachovat a pojmenovat, ne ji odstranit z reflexe.')
    ],'Nejprve co se stalo. Potom co si o tom myslíte.',
    'Při povoleném stínování oddělte jeden pozorovaný děj, dvě možné interpretace a otázku pro mentora.',
    ['kpv-uis-1','kpv-quality'],'Autorský nácvik zápisu pro reflexi; reakce modelového klienta není diagnostickým údajem.'),

  C(3,1,'Dva letáky, dvě různé informace','Informační přepážka',
    'Zvolíte ověření odpovídající konkrétnímu informačnímu dotazu.',
    'Klient se ptá, zda je místní kurz dostupný večer. Papírový leták uvádí úterý, web poskytovatele středu a datum poslední aktualizace chybí. Přihlášky se podle obou zdrojů stále přijímají.',
    'Jakou informaci klientovi předáte?', 'Ověřování informací', [
      O('a','Doporučím řídit se webem poskytovatele','Za rozhodující považujete údaj z webu; papírový leták označíte jako pravděpodobně starší.',0,'Klient může plánovat podle údaje, jehož aktuálnost neznáte.','Obecný předpoklad o webu konkrétní rozpor neřeší.'),
      O('b','Předám obě varianty s upozorněním','Klient si před přihlášením může datum ověřit sám.',1,'Rozpor nezatajíte, ale praktická otázka zůstane nevyřešená.','Je to poctivé minimum; při dostupném kontaktu lze podpořit i samotné ověření.'),
      O('c','Ověřím aktuální termín přímo','S klientem kontaktujete poskytovatele a zapíšete potvrzený údaj.',2,'Rozhodnutí se opře o konkrétní běh a aktuální potvrzení.','Před předáním jisté odpovědi je potřeba vyřešit rozpor, ne pouze seřadit zdroje.')
    ],'Důvěryhodný zdroj může obsahovat neaktuální údaj.',
    'Pod dohledem mentora ověřte jeden rozporný veřejný údaj a zaznamenejte, jak jste nejistotu uzavřeli.',
    ['kpv-nsk','kpv-nsp'],'Původní případ rozvíjí práci s kariérovými informacemi; neučí aktuální nabídku konkrétního kurzu.'),

  C(4,1,'Znáte organizaci, nebo jen její web?','Nezisková poradna',
    'Zjistíte, jak se klient skutečně dostane ke službě.',
    'Web poradny nabízí kariérové konzultace veřejnosti. Při stínování vidíte, že část příchozích dostává termín a část kontakt na jinou službu. Máte připravit stručnou mapu pracoviště.',
    'Na co se při domluveném rozboru zaměříte?', 'Orientace v organizaci', [
      O('a','Na cestu klienta od prvního kontaktu','Zjistíte podmínky vstupu, důvody přijetí či předání a návaznost na další dostupné služby.',2,'Mapa zachytí rozdíl mezi veřejnou nabídkou a skutečným postupem.','Pro orientaci na praxi potřebujete vědět, kdo, kdy a s čím službu využije.'),
      O('b','Na přehled všech projektů a partnerů','Zmapujete nabídku projektů, jejich financování a vazby na partnerské organizace.',1,'Získáte kontext, ale nemusíte vysvětlit, proč se s klienty zachází odlišně.','Přehled projektů má cenu, když jej propojíte s konkrétní cestou klienta.'),
      O('c','Na srovnání počtu přijatých a odmítnutých','Z provozních počtů odvodíte, jak dobře poradna naplňuje deklarovanou dostupnost.',0,'Bez znalosti pravidel můžete za odmítnutí považovat vhodné předání.','Samotné počty neukazují důvody ani přiměřenost služby.')
    ],'Mapujte rozhodování a návaznosti, ne jen seznam činností.',
    'S mentorem nakreslete tři kroky příchodu modelového klienta a bod, kdy je vhodná jiná služba.',
    ['kpv-uis-1','kpv-competencies'],'Vlastní aplikace orientace na pracovišti a koordinace služeb; nejde o audit skutečné organizace.'),

  C(5,1,'Úkol: dnes se hlavně dívejte','Stínování zkušené poradkyně',
    'Změníte obecné pozorování v dosažitelný učební cíl.',
    'Čekají Vás tři konzultace. Mentor řekne, ať sledujete, co Vás zaujme. Minule jste zapsali mnoho detailů, ale při reflexi jste neuměli říct, co jste se naučili.',
    'Jak si dnešní pozorování připravíte?', 'Řízení vlastního učení', [
      O('a','Zapíšu co nejvíce vět poradkyně','Z vět později vyberete ty, které byste mohli používat.',0,'Získáte materiál bez jasné otázky a můžete přehlédnout, proč věta zazněla.','Napodobení formulací samo neukazuje porozumění jejich účelu.'),
      O('b','Dohodnu si otázku k pozorování','Zaměříte se na ověřování společného porozumění zakázce.',2,'Na konci můžete rozebrat konkrétní příklady i rozdíly.','Malý pozorovatelný cíl pomůže využít omezený čas a získat cílenou zpětnou vazbu.'),
      O('c','Požádám o seznam nejčastějších chyb','Při konzultacích budu sledovat, zda se jim poradkyně vyhýbá.',1,'Máte oporu, ale pozorování se zúží na chyby podle cizího seznamu.','Doplňte vlastní otázku a účel sledovaného postupu.')
    ],'Dobrý učební cíl umožní poznat, co jste nově pochopili.',
    'Před dalším stínováním dohodněte s mentorem jeden jev; po něm přineste dva anonymní popisy, ne doslovný přepis.',
    ['kpv-uis-1','kpv-quality'],'Autorská pomůcka pro cílenou přípravu; nepředepisuje závaznou podobu deníku IVP.'),

  C(6,1,'Případ do portfolia bez cizího příběhu','Reflektivní deník',
    'Vyberete podklad, který podporuje reflexi bez zbytečného odhalování klienta.',
    'Chcete rozebrat své příliš rychlé doporučení. Klientův příběh obsahuje neobvyklé zaměstnání, malou obec a rodinnou událost. Jméno jste už odstranili; předání klientských podkladů škole není domluveno.',
    'Co připravíte pro skupinovou reflexi?', 'Důvěrnost a dokumentace', [
      O('a','Ponechám podrobnosti, jméno už tam není','Neobvyklou profesi i rodinné okolnosti ponecháte, aby spolužáci rozuměli kontextu.',0,'Kombinace údajů může člověka odhalit i bez jména.','Odstranění přímého identifikátoru samo o sobě nezajišťuje anonymitu.'),
      O('b','Přinesu jen otázku k vlastnímu postupu','Bez klientských detailů se zeptáte, jak poznat příliš rychlé doporučení.',1,'Soukromí klienta ochráníte, ale skupině chybí situace potřebná k rozboru Vašeho rozhodnutí.','Obecná otázka je bezpečný začátek. Vhodně zobecněný příklad by umožnil konkrétnější zpětnou vazbu.'),
      O('c','Připravím zobecněný příklad s mentorem','S mentorem vyberete potřebný kontext a ověříte, zda jej lze bezpečně sdílet.',2,'Skupina může rozebrat Vaši práci bez přebírání klientovy dokumentace.','Cílem je učit se z postupu, nikoli shromáždit co nejúplnější soukromý příběh.')
    ],'Reflexe potřebuje kontext rozhodnutí, ne všechny údaje o člověku.',
    'Nechte mentora před sdílením zkontrolovat jeden modelový zápis; žádné skutečné klientské údaje nevkládejte do této aplikace.',
    ['kpv-uis-1','kpv-cakp','kpv-nsk'],'Etická aplikace důvěrnosti a práce s portfoliem; přesný režim dokumentace určuje pracoviště.'),

  C(7,2,'„Prostě mi řekněte, kam mám jít.“','Konzultace s dospělým klientem',
    'Ověříte zakázku místo předčasného výběru povolání za klienta.',
    'Při rozhovoru vedeném s mentorem klient řekne: „V obchodě už nechci být. Prostě mi řekněte, kam mám jít.“ Máte k dispozici seznam kurzů, ale zatím nevíte, co mu na současné práci nevyhovuje.',
    'Který další krok nejvíce pomůže rozhodnutí?', 'Zakázka a naslouchání', [
      O('a','Zjistím, co má změna vyřešit','Necháte klienta popsat žádoucí změnu, její důvody a společně vymezíte dosažitelný cíl dnešního rozhovoru.',2,'Rozlišíte, zda jde o obor, směny, prostředí nebo jiný problém.','Doporučení má vycházet ze zadání, které jste spolu skutečně ověřili.'),
      O('b','Předložím tři kurzy s dobrou dostupností','Klient je porovná podle obsahu, termínu a dostupnosti místa.',1,'Nabídka může rozhovor rozhýbat, ale zatím stojí na Vašich kritériích.','Konkrétní možnosti mohou přijít po vyjasnění, co mají řešit.'),
      O('c','Navrhnu administrativu jako blízký přechod','Zdůrazníte využití zkušeností z obchodu a postupné doplnění potřebných dovedností.',0,'Zvolíte směr dříve, než víte, zda odpovídá potřebám klienta.','Přenositelné zkušenosti jsou jen jednou částí rozhodnutí.')
    ],'Zakázka popisuje, co chce klient řešit, ne Vaši první radu.',
    'Pod vedením mentora zkuste shrnout zakázku jednou větou a nechte klienta její znění opravit.',
    ['kpv-uis-2','kpv-nsk'],'Vlastní dialogová situace navázaná na identifikaci zakázky; nabídky kurzů jsou modelové.'),

  C(8,2,'Dvě dobré nabídky, žádná jednoznačná','Volba zaměstnání',
    'Podpoříte klientovo rozhodnutí podle jeho vlastních kritérií.',
    'Dospělá klientka má dvě ověřené nabídky. První přináší vyšší odměnu a delší cestu, druhá menší odměnu a předvídatelné směny. Péči o dítě má zajištěnou v obou variantách. Ptá se, kterou byste přijali Vy.',
    'Jak odpovíte užitečně a bez převzetí její volby?', 'Autonomie klienta', [
      O('a','Sdělím svou volbu a nechám ji rozhodnout','Vysvětlíte vlastní důvody a zdůrazníte, že konečné rozhodnutí přísluší klientce.',1,'Nabídnete pohled, který však může nechtěně převážit nad jejími prioritami.','Průhledně sdělený názor není totéž co společně vyjasněné kritérium.'),
      O('b','Porovnáme důsledky podle jejích priorit','Klientka pojmenuje přínosy, nevýhody i pro sebe rozhodující rozdíly obou nabídek.',2,'Klientka má podklad pro rozhodnutí, které umí sama vysvětlit.','V zadání není objektivně nejlepší nabídka; rozhodující je význam rozdílů pro tuto klientku.'),
      O('c','Spočítám čistou hodinovou odměnu včetně dojíždění','Započítáte náklady i čas cesty a doporučíte nabídku s lepším finančním výsledkem.',0,'Důležitý ukazatel zaměníte za úplné rozhodovací pravidlo.','Předvídatelnost nebo prostor pro rozvoj nemusí být vyjádřitelné jedinou částkou.')
    ],'Pomozte porovnávat; váhu kritériím dává klient.',
    'S mentorem nacvičte otázku „Kterého rozdílu byste si za půl roku nejvíce všímala?“ na smyšlené dvojici nabídek.',
    ['kpv-cakp','kpv-nsp'],'Autorská aplikace samostatného kariérového rozhodování; nejde o finanční doporučení.'),

  C(9,2,'Kurz slibuje kvalifikaci. Jakou přesně?','Výběr dalšího vzdělávání',
    'Rozlišíte reklamní příslib od doloženého výstupu vzdělávání.',
    'Klient ukáže reklamu „Nová profese za víkend“. Stránka slibuje certifikát, ale neuvádí přesný kvalifikační standard ani zkoušku. Klient se ptá, zda bude doklad stačit pro vybranou pracovní pozici.',
    'Co je potřeba zjistit před doporučením?', 'Kvalifikační orientace', [
      O('a','Prohlédnu recenze absolventů','V recenzích vyhledáte zkušenosti s výukou, lektory a následným pracovním uplatněním.',1,'Zjistíte zkušenost s kurzem, ale ne význam jeho dokladu pro cílovou práci.','Recenze mohou doplnit, nikoli nahradit ověření výstupu.'),
      O('b','Porovnám délku s jinými kurzy','Srovnáte rozsah výuky a výrazně kratší kurz vyřadíte jako nedostatečnou přípravu.',0,'Délka sama nerozhoduje o uznání nebo využitelnosti dokladu.','Je nutné zjistit, co konkrétně se ověřuje a co vyžaduje cílová pozice.'),
      O('c','Ověřím doklad i požadavky pozice','Porovnáte výstup kurzu s relevantními kvalifikačními podmínkami.',2,'Klient uvidí, jaký krok kurz skutečně umožňuje a co případně chybí.','Pojem certifikát může označovat různé doklady; nelze z něj vyvodit oprávnění.')
    ],'Než doporučíte cestu, ověřte, kam skutečně vede.',
    'S mentorem porovnejte jednu veřejnou nabídku kurzu s požadavky modelové pozice a poznamenejte nevyjasněné body.',
    ['kpv-nsk','kpv-nsp'],'Případ učí ověřovací postup, nikoli konkrétní právní kvalifikaci nebo nárok na rekvalifikaci.'),

  C(10,2,'Životopis bez pracovních zkušeností?','Univerzitní kariérní centrum',
    'Pomůžete doložit schopnost konkrétní zkušeností bez vymýšlení praxe.',
    'Studentka se hlásí na juniorskou pozici organizátorky akcí. Tvrdí, že nemá žádnou praxi, ale dobrovolnicky připravila dvě studentské debaty. Víte, že domlouvala prostory a koordinovala registraci. Neměla zaměstnaneckou pozici ani rozpočet.',
    'Jak tuto zkušenost využijete v životopisu?', 'Dokládání schopností', [
      O('a','Popíšeme konkrétní dobrovolnickou činnost','Uvedete skutečnou roli, úkoly a doložitelné výsledky relevantní pro nabídku.',2,'Zaměstnavatel uvidí využitelnou zkušenost bez zavádějícího pracovního titulu.','Relevantní zkušenost může vzniknout mimo zaměstnání; potřebuje přesný popis.'),
      O('b','Zařadíme ji mezi zájmy bez dalších detailů','Dobrovolnictví ukáže její aktivitu, pracovní sekce zůstane prázdná.',1,'Informace je pravdivá, ale snadno zanikne její vazba na požadavky pozice.','Konkrétní příklad schopnosti je přesvědčivější než obecný zájem.'),
      O('c','Použijeme titul projektová manažerka','Pod běžnějším pracovním titulem uvedete přípravu debat a koordinaci přihlášek.',0,'Titul může vyvolat nepodložené očekávání odpovědnosti a zkušeností.','Srozumitelnost nesmí stát na nadsazeném označení role.')
    ],'Silný životopis je konkrétní, nikoli přikrášlený.',
    'Pod dohledem mentora nacvičte převod jedné vlastní neformální zkušenosti do věty: úkol, postup, výsledek.',
    ['kpv-europass','kpv-nsp'],'Původní příklad používá zásadu relevance a doložitelnosti; není univerzální šablonou životopisu.'),

  C(11,2,'Test ukázal „technický typ“','Práce se sebepoznávacím nástrojem',
    'Zachováte přiměřený význam orientačního výsledku.',
    'Klient přinese výstup volného internetového kvízu „technický typ“. Neznáte jeho validitu ani způsob výpočtu. Klient říká: „Takže kreativní obory mohu vyškrtnout?“ Neproběhlo odborné diagnostické vyšetření.',
    'Jak výsledek zapojíte do rozhovoru?', 'Kritické používání nástrojů', [
      O('a','Nechám klienta udělat ještě dva podobné kvízy','Shoda výsledků by mohla posílit důvěru v doporučení.',0,'Více neověřených nástrojů nevytváří ověřený závěr.','Neznáte jejich kvalitu ani to, zda vůbec zjišťují stejnou věc.'),
      O('b','Proberu výsledek jako námět','Vyjasníte omezení; hledáte zkušenosti podporující i zpochybňující výsledek.',2,'Klient nemusí zavřít možnosti kvůli jednomu označení.','V tomto případě může kvíz otevřít rozhovor, ale neopravňuje k vyřazení oborů.'),
      O('c','Kvíz odložím a pokračuji bez něj','Místo jeho rozboru zahájíte mapování oblíbených činností a zkušeností ze školy.',1,'Zamezíte přeceňování výsledku, ale můžete minout obavu, se kterou klient přišel.','Vyjasnit význam výsledku bývá užitečnější než jej pouze odsunout.')
    ],'Orientační výsledek otevírá otázky; neurčuje osud.',
    'S mentorem si u používaného nástroje zjistěte účel, podmínky použití a hranice interpretace.',
    ['kpv-nsp','kpv-nsk'],'Vlastní model odlišuje sebepoznání od psychodiagnostického závěru; nehodnotí konkrétní test.'),

  C(12,2,'Formulář je překážka, ne klient','Poradna pro dospělé',
    'Přizpůsobíte způsob práce bez převzetí klientova rozhodování.',
    'Dospělý klient říká, že dlouhým formulářům špatně rozumí, a žádá vysvětlení nahlas. Formulář není test čtenářské schopnosti. Jeho účelem je zachytit klientovy preference. Máte souhlas mentora s vedením této části.',
    'Jak budete postupovat?', 'Přístupnost komunikace', [
      O('a','Vyplním formulář podle dosavadního rozhovoru','Preference odvodíte z jeho dosavadního vyprávění a připravíte mu hotové shrnutí.',0,'Do odpovědí mohou vstoupit Vaše domněnky a preference.','Usnadnění formy nesmí změnit autora odpovědí.'),
      O('b','Dám klientovi více času a klidné místo','Formulář si nejprve projde sám; budete připraveni odpovědět na následné dotazy.',1,'Pomůžete s tempem, ale neřešíte jím pojmenovanou překážku.','Nejprve reagujte na požadavek vysvětlení, ne na odhad, co by měl potřebovat.'),
      O('c','Otázky projdeme společně nahlas','Otázky vysvětlíte po částech; klient odpovídá sám a na závěr ověříte význam jeho odpovědí.',2,'Zachováte účel formuláře i vlastní hlas klienta.','V zadání lze změnit způsob zadání, protože nejde o standardizovaný test.')
    ],'Měňte dostupnost úkolu, ne hlas člověka.',
    'Po dohodě s mentorem připravte jednu otázku ve stručné a ústně vysvětlitelné podobě; neodhadujte diagnózu klienta.',
    ['kpv-uis-2','kpv-ethics'],'Autorské přizpůsobení nehodnoticího formuláře; standardizované nástroje mohou mít jiná pravidla.'),

  C(13,3,'Ve skupině mluví stále stejní dva','Kariérový workshop',
    'Změníte strukturu aktivity tak, aby vzniklo více příležitostí zapojit se.',
    'Spoluvedete skupinu osmi dospělých. Cílem je pojmenovat vlastní rozhodovací kritéria. Dva účastníci mluví dlouho; ostatní zatím dostali jen závěrečnou otázku „Souhlasíte?“. Část setkání ještě zbývá.',
    'Jak upravíte následující aktivitu?', 'Vedení skupiny', [
      O('a','Nejprve individuálně, potom dvojice a dobrovolné sdílení','Dáte každému čas vytvořit vlastní podklad před společnou diskusí.',2,'Více účastníků má prostor formulovat své kritérium bez soutěže o slovo.','Struktura odpovídá cíli a netrestá dosavadní aktivitu ani mlčení.'),
      O('b','Vyzvu postupně všechny k veřejné odpovědi','Každý dostane stejný čas na odpověď; může také své vystoupení vynechat.',1,'Zajistíte možnost promluvit, ale ne každému vyhoví okamžité veřejné sdílení.','Možnost odmítnout je vhodná. Krátká příprava by navíc usnadnila formulaci vlastního kritéria před veřejným sdílením.'),
      O('c','Nechám aktivní dvojici nejprve dokončit své příklady','Jejich příklady shrnete na tabuli a ostatní požádáte o doplnění.',0,'Zbývající čas dále získají ti, kteří už mluvili.','Problém je v rozdělení příležitosti; další vzorový příklad jej sám neřeší.')
    ],'Ticho ve skupině není automaticky důkaz nezájmu.',
    'S mentorem při jedné aktivitě sledujte příležitosti zapojení, nikoli pořadí „nejaktivnějších“ účastníků.',
    ['kpv-uis-3','kpv-competencies'],'Vlastní didaktické řešení skupiny s uvedeným cílem; jiný cíl může vyžadovat jinou strukturu.'),

  C(14,3,'Stejný workshop, jiné potřeby','Skupina před změnou zaměstnání',
    'Upravíte program podle zjištěných potřeb a zachováte společný cíl.',
    'Připravili jste workshop k životopisu. Na začátku se ukáže, že polovina skupiny životopis má a chce zkoušet pohovor, druhá potřebuje začít od zkušeností. Mentor umožní úpravu. Společným cílem je připravit konkrétní krok k vybrané pozici.',
    'Která úprava nejlépe odpovídá zjištění?', 'Přizpůsobení vzdělávání', [
      O('a','Zrychlím společný výklad životopisu','Začátečníkům dáte stručnou šablonu a pokročilejší necháte na konci položit otázky.',1,'Část programu zachováte, ale odlišné potřeby se řeší jen okrajově.','Rychlejší výklad není vždy vhodnější pro začátečníky ani pokročilé.'),
      O('b','Rozdělím úlohy, zachovám společný cíl','Jedni doloží zkušenost v CV, druzí ji využijí v odpovědi při pohovoru.',2,'Obě skupiny pracují na smysluplném kroku a mohou sdílet výstup.','Úprava zachovává cíl, ale rozlišuje cestu podle vstupní připravenosti.'),
      O('c','Přejdu celý na nácvik pohovoru','Ve dvojicích si všichni vyzkoušejí pohovor a navzájem okomentují své odpovědi.',0,'Změníte program podle jedné části skupiny a ponecháte druhou bez potřebného základu.','Atraktivnější aktivita sama nezaručuje shodu s potřebami všech.')
    ],'Společný cíl nemusí znamenat stejný úkol pro každého.',
    'S mentorem napište dvě úlohy rozdílné náročnosti, které prokazují tentýž jasně vymezený výsledek.',
    ['kpv-quality','kpv-competencies'],'Autorský návrh diferenciace; konkrétní účinnost je třeba ověřit, nikoli předpokládat.'),

  C(15,3,'AI připravila přesvědčivý seznam','Příprava kariérových informací',
    'Zkontrolujete rozhodující tvrzení návrhu AI před použitím.',
    'Ve schváleném nástroji pracujete pouze se smyšleným profilem. AI navrhla tři večerní kurzy a podmínky přijetí. Jeden odkaz nefunguje a jiný vede na starší běh. Návrh má být zítra ukázkou pro klienta.',
    'Jak s návrhem naložíte?', 'Odpovědná spolupráce s AI', [
      O('a','Požádám stejnou AI o potvrzení aktuálnosti','Zadáte jí opravu odkazů a výslovný požadavek na kontrolu právě otevřených kurzů.',0,'Model může zopakovat stejnou chybu v přesvědčivější podobě.','Vnitřní souhlas generátoru není nezávislé ověření faktu.'),
      O('b','Neověřený návrh ponechám jen pro mentora','Klientovi jej zatím neukážete; připravíte seznam bodů čekajících na kontrolu.',1,'Zabráníte předání neověřených nabídek, ale použitelný přehled dosud nevznikl.','Označený interní návrh je bezpečný mezikrok. Před použitím zbývá skutečně ověřit rozhodující údaje.'),
      O('c','Nabídky ověřím u poskytovatelů','S mentorem opravíte neplatné nabídky a u ostatních označíte, co ještě čeká na přímé ověření.',2,'Vznikne přehled s rozlišitelnými fakty a otevřenými otázkami.','AI pomůže připravit návrh; za výběr a předání podkladů nadále odpovídá člověk.')
    ],'Přesvědčivá formulace není důkaz správnosti.',
    'S mentorem ověřte na smyšleném profilu tři tvrzení návrhu AI a zapište, které se změnilo po kontrole.',
    ['kpv-ethics','kpv-nsp'],'Původní případ aplikuje profesionální dohled nad AI; nevyžaduje odesílání skutečných klientských údajů.'),

  C(16,3,'Zakázka přesahuje kariérové poradenství','Individuální konzultace',
    'Rozpoznáte hranici úkolu a navrhnete návaznou pomoc.',
    'Klient chce rozebrat změnu profese, ale většinu setkání žádá léčebné doporučení k dlouhodobým zdravotním potížím. V zadání není akutní ohrožení. Nejste zdravotnický pracovník; mentor je dostupný a pracoviště má pravidla předávání.',
    'Co uděláte v této situaci?', 'Hranice odbornosti', [
      O('a','Vyjasním hranici a domluvím s mentorem návaznost','Kariérovou část oddělíte od potřeby zdravotní pomoci a proberete bezpečný další krok.',2,'Klient získá orientaci, kterou část můžete řešit a kam patří další otázky.','Přiznání hranice neznamená opuštění klienta; umožňuje přiměřenou spolupráci.'),
      O('b','Domluvím další kariérovou konzultaci','Klientovi vysvětlíte hranici role, návaznou zdravotní pomoc zatím neproberete.',1,'Vymezíte vlastní roli, ale klient zatím neví, kam patří jeho další otázka.','Pokračování může být užitečné. V této situaci je ale dostupný mentor i pravidla pro potřebnou návaznost.'),
      O('c','Doporučím postup, který pomohl někomu známému','Uvedete, že jde jen o osobní zkušenost.',0,'Osobní doporučení může být chápáno jako odborná rada a nemusí se pro klienta hodit.','Výslovný požadavek na léčebný postup je za hranicí role v tomto zadání.')
    ],'Předání je součást odborné práce, pokud klient potřebuje jiný typ pomoci.',
    'S mentorem projděte anonymní model předání: komu, s jakým účelem a jaké informace se smějí sdílet.',
    ['kpv-ethics','kpv-uis-3'],'Nácvik profesní hranice u neakutní situace; není to zdravotní triáž ani návod pro krizovou intervenci.'),

  C(17,3,'Plán nevyšel. Byl opravdu proveditelný?','Návazná konzultace',
    'Odlišíte nezrealizovaný úkol od neověřené domněnky o motivaci.',
    'Klient neodeslal žádnou ze tří domluvených žádostí. Při doptání zjistíte, že požadované směny končí po posledním autobusovém spoji. V předchozím rozhovoru jste dostupnost spojení neověřili.',
    'Jak upravíte další postup?', 'Práce s bariérami', [
      O('a','Zmenším úkol ze tří žádostí na jednu','Vyberete jednu nabídku a domluvíte konkrétní den pro odeslání žádosti.',1,'Zmenšíte objem práce, ale konkrétní dopravní překážka zůstane.','Úprava musí reagovat i na proveditelnost, ne pouze na počet žádostí.'),
      O('b','Upravíme plán podle skutečné dostupnosti','Společně ověříte návaznost směn a dopravy a vyberete uskutečnitelný další krok.',2,'Nový krok bude stát na podmínkách, které klient skutečně může splnit.','Nová informace vyžaduje revizi plánu; není důkazem nedostatku snahy.'),
      O('c','Zaměřím se na důsledné dodržení dohody','Znovu projdete původní dohodu a stanovíte termín, kdy budou všechny žádosti odeslány.',0,'Můžete posílit tlak na úkol, který nebyl proveditelný.','Odpovědnost zahrnuje také opravu chybného předpokladu při plánování.')
    ],'Neúspěšný krok může odhalit chybu plánu, ne člověka.',
    'Před dalším úkolem pod dohledem ověřte s klientem jednu podmínku, která by mohla bránit jeho splnění.',
    ['kpv-uis-3','kpv-cakp'],'Vlastní analýza konkrétní překážky; neposuzuje obecnou motivaci klienta.'),

  C(18,3,'Předání kontaktu nestačilo','Spolupráce dvou služeb',
    'Navrhnete další krok předání, který klient dokáže uskutečnit.',
    'Klient potřebuje vedle kariérové konzultace i pomoc s digitálními dovednostmi. Předali jste mu web vzdělávacího centra, ale říká, že neví, jak poznat vhodnou aktivitu. Nežádá, abyste za něj převzali veškerou komunikaci.',
    'Jak podpoříte návaznost?', 'Koordinace podpory', [
      O('a','Pošlu kontakt přímo kolegovi v centru','Přiložíte telefon a stručný popis potřeby, aby kolega mohl klienta aktivně oslovit.',0,'Předání klientových údajů předběhne domluvu, co si klient přeje a co je dovoleno.','Dobrá snaha propojit služby neopravňuje k automatickému sdílení kontaktu.'),
      O('b','Doporučím zavolat na recepci centra','Vyhledáte telefon a provozní dobu; samotný obsah hovoru necháte na klientovi.',1,'Nabídnete dostupnější cestu, ale klient stále nemusí vědět, na co se ptát.','Pomůže konkrétní účel a krátká příprava prvního kontaktu.'),
      O('c','Připravíme první dotaz do centra','Domluvíte účel dotazu, klientem zvolený kontakt a potřebnou podporu podle pravidel.',2,'Klient odchází s krokem, který chápe a může sám provést.','Návaznost lze podpořit bez převzetí celé situace nebo zbytečného sdílení údajů.')
    ],'Užitečné předání propojí kontakt s proveditelným krokem.',
    'S mentorem nacvičte třívětý dotaz pro modelového klienta: co hledám, co potřebuji zjistit, jak mě lze kontaktovat.',
    ['kpv-competencies','kpv-cakp'],'Autorská situace koordinace podpory; oprávnění ke sdílení určuje konkrétní režim pracoviště.'),

  C(19,4,'Bakalářská práce, která se vejde do praxe','Dohoda s pracovištěm',
    'Převedete široký zájem na proveditelnou a smysluplnou otázku.',
    'Chcete zkoumat „jak AI mění kariérové poradenství“. Na praxi budete několik týdnů. Pracoviště potřebuje zlepšit srozumitelnost informačního listu a vedoucí bakalářské práce chce jasnou vazbu mezi otázkou, postupem a daty.',
    'Jaký první návrh přinesete na společnou konzultaci?', 'Výzkumná otázka', [
      O('a','Vymezím jednu úpravu a ověřitelný výsledek','Navrhnete zjistit, zda modeloví uživatelé po úpravě správně najdou v listu konkrétní informaci.',2,'Vznikne posouditelný návrh odpovídající potřebě i délce praxe.','Ještě je nutné dohodnout design, účastníky a schválení; otázka však už má měřitelný obsah.'),
      O('b','Shromáždím co nejvíce dostupných provozních dat','Nejprve prohlédnete dostupné záznamy; otázku vyberete podle nalezených vztahů a rozdílů.',0,'Hromadění dat před účelem může vytvořit zbytečné zásahy a nejasnou interpretaci.','Nejprve potřebujete zdůvodnit, co a proč zjišťujete.'),
      O('c','Sepíšu přehled AI nástrojů pro pracoviště','U každého nástroje uvedete účel, požadavky na obsluhu a dostupnost pro pracoviště.',1,'Vznikne praktický podklad, ale dosud neodpovídá potřebě ověřit srozumitelnost listu.','Přehled může pomoci jako příprava; sám účinek úpravy nezjistí.')
    ],'Měřitelná otázka spojuje potřebu pracoviště s proveditelným postupem.',
    'S vedoucím práce a mentorem dohodněte jednu hlavní otázku, jeden výstup a údaje nezbytné k jeho posouzení.',
    ['kpv-uis-4','kpv-competencies'],'Původní návrh malého ověřování; žádný sběr dat se tím automaticky neschvaluje.'),

  C(20,4,'Líbilo se jim to. Naučili se to?','Vyhodnocení workshopu',
    'Odlišíte spokojenost, sebedůvěru a prokázaný výkon.',
    'Po modelovém workshopu dalo 18 z 20 účastníků nejvyšší známku spokojenosti. Cílem přitom bylo rozpoznat v inzerátu chybějící rozhodující informaci. Dosud máte pouze hodnocení zážitku.',
    'Co potřebujete pro posouzení vzdělávacího výsledku?', 'Výsledky učení', [
      O('a','Zeptám se, zda si nyní více věří','Účastníci na škále vyjádří, nakolik si nyní věří při čtení inzerátů.',1,'Získáte důležitý pocit připravenosti, nikoli přímý doklad zvládnutí úkolu.','Sebedůvěra a výkon se mohou lišit a je užitečné je nemíchat.'),
      O('b','Použiji nový inzerát a kritéria','Účastník řeší nový příklad; předem stanovíte, jak poznáte splnění úkolu.',2,'Získáte doklad cílové schopnosti mimo příklad použitý ve výuce.','Pro tvrzení o zlepšení potřebujete také vhodné vstupní nebo srovnávací měření.'),
      O('c','Použiji vysokou spokojenost jako hlavní důkaz','Hodnocení zážitku doplníte jejich komentáři o tom, co se jim líbilo.',0,'Smícháte oblibu zážitku s výsledkem učení.','Spokojenost vypovídá o zkušenosti, ale nezodpoví danou výkonovou otázku.')
    ],'Měřte výsledek, který slibuje cíl aktivity.',
    'S mentorem připravte jeden nový modelový úkol a dvě pozorovatelná kritéria pro jeho posouzení.',
    ['kpv-quality','kpv-uis-4'],'Autorský návrh evaluace; vysoká spokojenost není znehodnocena, pouze má jiný význam.'),

  C(21,4,'Malý pilot nepřinesl jasný rozdíl','Rozbor výsledků s vedoucím práce',
    'Formulujete závěr odpovídající síle dat.',
    'V malém pilotu jedna skupina použila simulaci a druhá pracovní list. Průměry jsou blízko, výsledky rozptýlené a několik měření chybí. Zadání neumožňuje spolehlivě rozhodnout, zda je mezi postupy rozdíl.',
    'Který závěr je obhajitelný?', 'Interpretace nejistoty', [
      O('a','Obě metody fungují stejně','Podobné průměry vyložíte jako možnost zaměnit postupy bez dopadu na výsledky.',0,'Nejasný výsledek zaměníte za prokázanou rovnocennost.','K závěru o stejné účinnosti je potřeba design a přesnost určená právě pro takovou otázku.'),
      O('b','Zveřejním průměry a velikosti skupin','Výsledky popíšete bez výroku o tom, který postup je účinnější.',1,'Nevyslovíte nepodložený závěr, ale čtenář nezíská úplný obraz nejistoty a chybějících měření.','Popis čísel je dobrý základ. Pro interpretaci potřebujete přidat rozsah nejistoty a omezení pilotu.'),
      O('c','Závěr ponechám otevřený','Uvedete odhad, nejistotu, chybějící měření a omezení pro plán dalšího výzkumu.',2,'Výsledek zůstane užitečný pro plán další studie bez přehnaného tvrzení.','Poctivý závěr respektuje, co data rozlišit dokážou a co zatím ne.')
    ],'Neprokázaný rozdíl není prokázaná shoda.',
    'S vedoucím práce napište ke smyšlenému pilotu jeden dovolený a jeden nepodložený závěr.',
    ['kpv-competencies','kpv-uis-4'],'Autorská úloha výzkumného úsudku; nejde o skutečný výsledek výzkumu Nanečisto.'),

  C(22,4,'Výsledek vypadá lépe bez tří pokusů','Kontrola modelového datasetu',
    'Rozlišíte předem zdůvodněné vyloučení od úpravy podle žádoucího výsledku.',
    'Tři účastníci dosáhli nízkého skóre. Kdybyste je vynechali, průměr by byl vyšší. Záznam nepotvrzuje technickou chybu. Před analýzou nebylo stanoveno pravidlo vyřadit nízké skóre.',
    'Jak tyto pokusy zpracujete?', 'Výzkumná integrita', [
      O('a','Ponechám je a prověřím kvalitu podle stejných pravidel','Případné chyby ověříte bez ohledu na to, zda zlepšují výsledek.',2,'Zachováte rozmanitost výkonu a transparentnost analýzy.','Nízký výkon není sám o sobě vadné měření; případné vyloučení potřebuje nezávislý důvod.'),
      O('b','Ukážu hlavně průměr bez těchto účastníků','Úplný soubor připojíte do přílohy a v hlavním textu vysvětlíte vynechání.',0,'Hlavní sdělení zvýhodní variantu vybranou podle výsledku.','Umístění úplných dat do přílohy neodstraňuje zkreslení hlavního závěru.'),
      O('c','Ponechám všechny pokusy bez další kontroly','Žádný pokus nevyřadíte; soubor analyzujete v nynější podobě.',1,'Nevyberete data podle skóre, ale přeskočíte běžnou kontrolu kvality záznamů.','Stejná kontrola duplicit, úplnosti a technických problémů má platit pro celý soubor, ne jen pro nízká skóre.')
    ],'Pravidlo pro data nesmí vzniknout jen proto, že vylepší výsledek.',
    'S vedoucím práce si před sběrem vyjasněte postup pro duplicity, neúplné pokusy a technické chyby.',
    ['kpv-competencies','kpv-ethics'],'Autorská analytická situace na smyšlených údajích; konkrétní analýzu má posoudit metodolog.'),

  C(23,4,'Mentor chce závěr, který data nenesou','Předání výsledků pracovišti',
    'Podáte užitečnou zpětnou vazbu bez změny jejího věcného významu.',
    'Pracoviště Vám vytvořilo dobré podmínky. Při společném rozboru mentor navrhne titulek „Nový program prokazatelně zvyšuje úspěšnost“. Vy máte jen popis osmi dobrovolných účastníků bez srovnávacího měření.',
    'Jak na návrh odpovíte?', 'Odborná komunikace', [
      O('a','Ponechám titulek a omezení dopíšu menším textem','Pod titulkem vysvětlíte, že šlo o osm dobrovolných účastníků a chybělo srovnávací měření.',0,'Silný titulek bude tvrdit něco, co podklady nedokládají.','Omezení v poznámce nemá napravovat zavádějící hlavní sdělení.'),
      O('b','Navrhnu přesnější závěr a pokračování','Popíšete zkušenost osmi účastníků a navrhnete další ověření účinku bez přehnaného závěru.',2,'Pracoviště dostane použitelný závěr a jasnou cestu pokračování.','Vstřícnost může spočívat v dobrém vysvětlení, ne v nadsazení evidence.'),
      O('c','Odmítnu výsledky pracovišti předat','Předání odložíte, aby se omezený pilot nedostal do veřejné prezentace jako důkaz účinku.',1,'Ochráníte závěr, ale zbytečně přerušíte spolupráci před pokusem o dohodu.','Nejprve proberte přesné znění a případný spor s vedoucím práce.')
    ],'Dobrý partner potřebuje přesný závěr, ne lichotivý závěr.',
    'S vedoucím a mentorem nacvičte dvouvěté sdělení: co pilot ukázal a co zatím tvrdit nelze.',
    ['kpv-uis-4','kpv-cakp'],'Původní scénář odborné spolupráce a interpretace; vztahuje se na popsané omezené podklady.'),

  C(24,4,'Poslední reflexe: co uděláte příště jinak?','Závěrečná reflexe praxe',
    'Proměníte obecné sebehodnocení v plán profesního rozvoje.',
    'V závěrečném deníku píšete „Potřebuji zlepšit komunikaci“. Mentor připomene situaci, kdy jste nabídli možnosti dříve, než jste ověřili klientův cíl. Máte připravit jeden konkrétní rozvojový krok.',
    'Který plán umožní poznat, zda se něco změnilo?', 'Reflexe a další rozvoj', [
      O('a','Přečtu si další knihu o komunikaci','Vyberete titul o rozhovoru a vypíšete si otázky, které chcete někdy vyzkoušet.',1,'Získáte nový podklad, ale nepoznáte, zda se změnilo Vaše jednání.','Samostudium propojte s konkrétním nácvikem a zpětnou vazbou.'),
      O('b','Při příštím rozhovoru budu více empatický','Před konzultací si připomenete důležitost pozornosti, vstřícnosti a respektu ke klientovi.',0,'Záměr je pozitivní, ale není jasné, jaké chování změníte a jak je ověříte.','Vágní vlastnost se obtížně trénuje i reflektuje.'),
      O('c','Nacvičím ověření společného cíle','Ve dvou nácvicích mentor sleduje shrnutí cíle a možnost klienta toto shrnutí opravit.',2,'Vznikne pozorovatelný krok s konkrétní zpětnou vazbou.','Plán míří na situaci z reflexe a umožňuje porovnat postup před nácvikem a po něm.')
    ],'Reflexe má změnit další pokus, ne pouze popsat minulý.',
    'S mentorem dohodněte jeden modelový nácvik, pozorovací kritérium a krátkou zpětnou vazbu.',
    ['kpv-uis-4','kpv-quality'],'Autorská příprava rozvojového plánu; splnění případu samo neprokazuje zvládnutí rozhovoru v reálné praxi.')
];
