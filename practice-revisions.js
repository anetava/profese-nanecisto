// Autorské modelové situace. Vycházejí z rámce praxí IVP, nikoli z jednotlivých skutečných žáků či klientů.
// Při skutečné praxi mají přednost pokyny cvičného učitele, mentora a pracoviště.
const Q = (title, setting, goal, skill, scene, prompt, answers, principle, transfer, sourceIds) => ({
  title, setting, goal, skill, scene, prompt,
  options: answers.map(([label,detail,score,consequence,explanation],i) => ({id:'abc'[i],label,detail,score,consequence,explanation})),
  principle, transfer, sourceIds,
  sourceNote:'Autorský modelový případ odvozený z rámce praxe a profesních doporučení. Přesný postup ověřte s vedoucím praxe a podle pravidel pracoviště.'
});

export const upvRevisions = {
  'upv-05': Q('První skupinový náslech: kam si sednout?', 'Příchod skupiny do cvičné SOŠ', 'Domluvit roli pozorovatele, aniž narušíte výuku.', 'Organizace náslechu',
    'Se spolužáky přicházíte na náslech odborného předmětu. Před hodinou se nestihlo domluvit, kde budete sedět a zda smíte nahlížet do žákovských prací. Učitel právě vítá třídu.', 'Co uděláte jako první?', [
      ['Vstoupím mezi lavice a prohlížím pracovní listy', 'Chci mít co nejvíce konkrétních podkladů.',0,'Žáci i učitel mění své chování a můžete překročit domluvený rozsah náslechu.','Náslech není povolením k volnému pohybu ani ke sběru osobních údajů.'],
      ['Požádám učitele o stručné upřesnění role', 'S kolegy zaujmeme nenápadné místo a případné práce probereme až po hodině.',2,'Pozorování bude užitečné a respektuje vedení hodiny.','Učitel určuje podmínky návštěvy a můžete si domluvit konkrétní otázku pro rozbor.'],
      ['Sednu si vzadu a nezeptám se vůbec', 'Počkám, zda nás učitel sám osloví.',1,'Výuku nenarušíte, ale nejasný účel a přístup k podkladům zůstanou.','Krátká domluva před vstupem nebo při vhodné příležitosti pomůže lépe cílit záznam.']
    ], 'Host ve třídě nejprve vyjasní svou pozorovatelskou roli.', 'Před návštěvou si zjistěte cíl hodiny, místo pozorování a způsob společného rozboru.', ['upv-uis-2','upv-method']),
  'upv-08': Q('Žák žádá o pomoc během náslechu', 'Pozorování odborné výuky na SOŠ', 'Reagovat na přímou žádost žáka v mezích domluvené role.', 'Hranice pozorování',
    'Jste v hodině jako pozorovatel. Žák u zadání zvedne ruku směrem k vám: „Můžete mi říct, co mám udělat?“ Cvičný učitel právě pomáhá jiné dvojici. Úkol má více správných postupů.', 'Co odpovíte?', [
      ['Poradím nejrychlejší postup', 'Žák nebude čekat a já se zapojím do hodiny.',0,'Můžete změnit zadání, učitelův plán i důkaz o samostatné práci žáka.','Bez domluvy nepřebírejte vedení učení od vyučujícího.'],
      ['Připomenu, že jsem pozorovatel', 'Odkážu na zadání a přivolám či upozorním cvičného učitele podle domluvy.',2,'Žák dostane cestu k podpoře a učitel ví o jeho potřebě.','Přiměřená reakce uznává žáka a současně respektuje vaši roli.'],
      ['Nevšímám si žáka', 'Mlčení zajistí nerušené pozorování.',1,'Nepřevezmete výuku, žák však nemusí vědět, na koho se obrátit.','Hranice role lze vyjádřit srozumitelně a laskavě.']
    ], 'Pozorovatel může pomoci zprostředkovat podporu bez nevyžádaného převzetí výuky.', 'Před náslechem se zeptejte, jak reagovat, když vás žák přímo osloví.', ['upv-uis-2','upv-method']),
  'upv-09': Q('Jeden žák opakovaně chybuje', 'Individuální náslech praktického vyučování', 'Nepřisoudit chybu schopnosti žáka bez zjištění podmínek.', 'Diagnostické pozorování',
    'Při pozorování žák dvakrát obrátí díl opačně. Z vašeho místa není vidět jeho schéma; ve třídě je hluk a učitel postup jednou vysvětlil celé skupině. Po hodině máte o žákovi mluvit s cvičným učitelem.', 'Jak podáte zjištění?', [
      ['Je nepozorný a potřebuje jednodušší práci', 'Dvě chyby v řadě stačí k závěru.',0,'Z jedné epizody vznikne nepodložená nálepka.','Nevíte, zda schéma viděl a slyšel zadání.'],
      ['Popíšu oba pokusy a zeptám se na zadání', 'Ověřím s učitelem, co měl žák k dispozici a jak lze porozumění prověřit.',2,'Rozbor vede k testovatelné podpoře místo k dojmu o žákovi.','Pozorování, možné vysvětlení a plán ověření patří oddělit.'],
      ['Zapíšu pouze počet chyb', 'Vyhnu se jakémukoli vysvětlení.',1,'Zápis je věcný, ale bez otázky k podmínkám je málo využitelný.','Počet může být začátkem rozhovoru, ne jeho koncem.']
    ], 'O chování mluvte konkrétně; příčinu ověřujte s vyučujícím.', 'Při rozboru přineste čas a popis dvou pokusů bez jména žáka.', ['upv-uis-3','upv-kraau']),
  'upv-10': Q('Ve třídě je podpůrné opatření', 'Řízený náslech v cvičné škole', 'Respektovat školní postup při podpoře žáka.', 'Přístupnost zadání',
    'Cvičný učitel vám před náslechem sdělí, že jeden žák používá upravené písemné zadání. Při hodině si všimnete, že spolužák chce tento list také. Neznáte podklad podpory ani pravidla sdílení.', 'Jak o situaci mluvit po hodině?', [
      ['Zeptám se žáka veřejně, proč má výjimku', 'Třída si rozdíl vyjasní.',0,'Můžete odhalit osobní informace a vyvolat stigmatizaci.','Důvody podpory nerozebírejte před třídou.'],
      ['S učitelem proberu požadavky zadání', 'Zeptám se, co smím vědět pro svůj výstup a zda je srozumitelnější verze užitečná i ostatním.',2,'Podporu plánujete pod vedením školy bez zasahování do soukromí.','Úprava dostupnosti pro více žáků může být vhodná; konkrétní opatření určuje škola.'],
      ['List budu ignorovat', 'Vlastní hodinu připravím jednotně pro všechny.',1,'Neotevřete citlivé údaje, ale můžete přehlédnout potřebu úpravy vlastního zadání.','Před svým výstupem si podmínky s cvičným učitelem vyjasněte.']
    ], 'Zajímejte se o potřebné pedagogické kroky, ne o soukromou diagnózu.', 'Před přípravou výstupu ověřte s učitelem dostupné úpravy, které máte dodržet.', ['upv-uis-3','upv-kraau']),
  'upv-12': Q('Z chodby slyšíte ponižující poznámku', 'Přestávka po individuálním náslechu', 'Včas předat konkrétní signál příslušnému pracovníkovi školy.', 'Bezpečné klima školy',
    'Po náslechu vidíte, že dva žáci opakovaně zesměšňují třetího kvůli chybě při práci. Ten odchází stranou. Nevíte, zda jde o jednorázový konflikt nebo delší dění; cvičný učitel je poblíž.', 'Jaký je přiměřený krok studenta praxe?', [
      ['Zjistím sám, kdo šikanuje koho', 'Odděleně vyslechnu žáky a rozhodnu, co se stalo.',0,'Převezmete šetření bez pověření a můžete situaci zhoršit.','Závažnost a postup posuzuje škola podle svého preventivního programu.'],
      ['Zastavím bezprostřední ponižování a informuji učitele', 'Popíšu, co jsem viděl a slyšel, bez nálepky; další postup nechám škole.',2,'Žák není ponechán bez pomoci a odpovědní pracovníci mají konkrétní informaci.','Bezprostřední bezpečí řešte hned, vyšetřování a dokumentaci podle pravidel školy.'],
      ['Počkám, zda se to bude opakovat', 'Z jedné přestávky nechci dělat závěr.',1,'Vyhnete se předčasnému závěru, ale opomenete aktuální ponižování.','Nejistota o příčině není důvod přehlédnout děj.']
    ], 'Při rizikovém chování chraňte žáka a předejte věcný popis; nevyšetřujte na vlastní pěst.', 'Před praxí zjistěte, na koho se obrátit při rizikovém chování a kdo má dohled o přestávce.', ['upv-uis-3','upv-method','upv-prevention']),
  'upv-13': Q('Zadání funguje vám, třídě ne', 'Nácvik mikrovýstupu', 'Ověřit srozumitelnost pokynu před samostatnou činností.', 'Jasné zadání',
    'V mikrovýstupu vysvětlíte ve čtyřech větách odborný postup. Spolužáci začnou v různé fázi a jeden použije jiný materiál. Původní plán počítal s desetiminutovou samostatnou prací.', 'Co uděláte teď?', [
      ['Zopakuji stejné čtyři věty hlasitěji', 'Při druhém poslechu to snad pochopí.',1,'Některým to pomůže, ale nepoznáte, kde zadání selhalo.','Hlasitost neřeší pořadí a kritérium úkolu.'],
      ['Zastavím nácvik a nechám zopakovat první krok', 'Ukážu materiál, vymezím výsledek a požádám o krátké převyprávění zadání.',2,'Třída může začít stejný úkol a vy získáte informaci o porozumění.','Ověření před zahájením šetří pozdější opravy.'],
      ['Nechám skupiny pokračovat po svém', 'Rozdíly mohou být tvořivé.',0,'Nelze posoudit společný cíl ani bezpečnost postupu.','Volba postupů patří až tam, kde je jasné, co je povinné a co je otevřené.']
    ], 'Pokyn je dobrý, když žák ví co, s čím a podle čeho.', 'Při dalším mikrovýstupu otestujte zadání na jednom spolužákovi předem.', ['upv-uis-4','upv-kraau']),
  'upv-15': Q('Generovaný příklad obsahuje chybu', 'Příprava mikrovýstupu pro odborný předmět', 'Ověřit odborný obsah před použitím ve výuce.', 'Odpovědné použití AI',
    'Připravujete krátký příklad pro žáky SOŠ. Generátor doplnil výpočet s přesvědčivým vysvětlením, ale jeho mezivýsledek nesouhlasí s postupem v podkladech školy. Do mikrovýstupu zbývá hodina.', 'Jak postupujete?', [
      ['Použiji příklad a upozorním na možné chyby AI', 'Žáci si nesoulad mohou sami najít.',0,'Můžete je učit chybný postup bez připraveného řešení.','Za správnost předloženého zadání odpovídá vyučující, i když vzniklo s pomocí nástroje.'],
      ['Přepočítám jej a proberu s cvičným učitelem', 'Při nejistotě zvolím ověřený příklad z výukových podkladů.',2,'Výstup zůstane věcně správný a přiměřený času.','Odborná kontrola a soulad s cílem mají přednost před atraktivní formulací.'],
      ['Opravím jen konečné číslo', 'Text i postup už nechám.',1,'Výsledek může vyjít, ale žáci mohou převzít chybnou argumentaci.','Ověřit je třeba celý postup a jednotky, nejen finální hodnotu.']
    ], 'Generovaný materiál používejte až po odborném ověření.', 'Před výstupem zkontrolujte výpočet, zdrojový postup a kritérium správné odpovědi.', ['upv-uis-4','upv-oskr']),
  'upv-17': Q('První den souvislé praxe', 'Cvičná střední odborná škola', 'Domluvit bezpečný plán výstupů s cvičným učitelem.', 'Vstup do praxe',
    'Na škole dostanete rozvrh a téma první hodiny. Neznáte ŠVP, pravidla odborné učebny ani to, kdo schvaluje přípravu. Cvičný učitel nabízí, že můžete zítra vést celou hodinu.', 'Jak navážete?', [
      ['Přijmu hodinu a připravím se podle internetu', 'Nechci promarnit příležitost.',0,'Můžete minout očekávaný obsah, organizaci i bezpečnostní pravidla.','Metodika praxe počítá s plánem výstupů a schvalováním přípravy cvičným učitelem.'],
      ['Domluvím plán a podklady s učitelem', 'Probereme cíl, třídu, ŠVP, BOZP, schválení přípravy a přiměřený první výstup.',2,'Výstup lze bezpečně připravit a zasadit do návaznosti výuky.','Rozsah i termín upravte podle školy a platné metodiky; plán vzniká v prvních dnech.'],
      ['Odložím veškeré vlastní výstupy o týden', 'Nejprve budu jen pozorovat.',1,'Získáte kontext, ale odklad bez dohody může narušit plán praxe.','Pozorování a postupný výstup se mají dohodnout s cvičným učitelem.']
    ], 'Vlastní výuka začíná společným plánem, znalostí školy a schválenou přípravou.', 'První den si s učitelem ujasněte plán, termín schválení příprav a pravidla bezpečnosti.', ['upv-uis-5','upv-method']),
  'upv-18': Q('Žák začne bez ochranného kroku', 'Praktické vyučování pod vedením cvičného učitele', 'Zastavit konkrétní nebezpečný postup a ověřit nápravu.', 'Bezpečnost a učení',
    'Vedete část výuky. Žák sahá po nástroji, ale vynechal kontrolu ochranných pomůcek vyžadovanou místními pravidly. Říká, že doma to dělá běžně. Cvičný učitel je v učebně.', 'Jak reagujete?', [
      ['Nechám úkon doběhnout a poučím jej potom', 'Doma to již umí.',0,'Riziko trvá a ostatní vidí nesprávný postup.','Při bezprostředním riziku je nutné práci přerušit podle místních pravidel.'],
      ['Přeruším úkon a přivolám učitele', 'Zajistím bezpečný stav, připomenu pravidlo a nechám žáka správný začátek předvést.',2,'Riziko ustane a opakování ověří skutečné porozumění.','Konkrétní technický postup i obnovení práce určují školní pravidla a cvičný učitel.'],
      ['Pošlu žáka pryč a dokončím úkol za něj', 'Třída uvidí správný výsledek.',1,'Přerušíte chybný úkon, ale žák si bezpečný postup neprocvičí.','Po zajištění bezpečí potřebuje přiměřenou příležitost k opravě.']
    ], 'Bezpečí je podmínka výuky; nápravu ověřte před pokračováním.', 'Před hodinou se učitele zeptejte, které chyby vyžadují okamžité zastavení a jak se hlásí.', ['upv-uis-5','upv-method','upv-oskr']),
  'upv-19': Q('Dvojice se směje spolužákově chybě', 'Vlastní hodina na cvičné SOŠ', 'Zastavit ponižující chování a vrátit žáky k bezpečné práci.', 'Vedení třídy',
    'Při nácviku dva žáci nahlas napodobují spolužáka, který se spletl. Ten odloží práci a mlčí. Máte rozpracovanou aktivitu a cvičný učitel pozoruje hodinu.', 'Co uděláte v okamžiku?', [
      ['Ignoruji poznámky a dál vysvětluji', 'Nechci ztratit tempo.',0,'Ponižování pokračuje a žák může ztratit možnost pracovat.','Rychlost plánu neospravedlňuje nebezpečné klima.'],
      ['Zastavím chování věcně a vrátím se k úkolu', 'Připomenu pravidlo respektu, zkontroluji, zda žák může pokračovat; po hodině předám učiteli popis.',2,'Třída zná hranici a škola může posoudit, zda je třeba další postup.','Bez nálepkování a veřejného vyšetřování chraňte důstojnost všech.'],
      ['Před třídou se ptám, kdo začal', 'Chci problém hned spravedlivě uzavřít.',1,'Situaci sice nepřehlédnete, ale veřejné pátrání může žáka dále vystavit.','Další zjišťování patří učiteli a školnímu postupu mimo veřejnou scénu.']
    ], 'Zastavte viditelné jednání; další šetření předejte škole.', 'S cvičným učitelem po hodině proberte přesná slova, reakci žáka a další odpovědnost.', ['upv-uis-5','upv-method','upv-prevention']),
  'upv-20': Q('Žák opraví váš odborný postup', 'Vlastní výstup v odborné učebně', 'Přiznat nejistotu a ověřit věc před pokračováním.', 'Odborná věrohodnost',
    'Na tabuli zapíšete mezivýsledek. Žák namítne, že jste při převodu jednotek vynechali krok; několik spolužáků už výsledek opsalo. Cvičný učitel je přítomen.', 'Co uděláte?', [
      ['Řeknu, že postup je správný, a jdu dál', 'Přípravu jsem si kontroloval.',0,'Třída může zafixovat chybu a přijít o důvěru v opravování omylů.','Námitku lze ověřit bez ztráty autority.'],
      ['Zastavím se a výpočet společně ověřím', 'Je-li chyba moje, opravím ji včetně navazujícího kroku; při nejistotě požádám cvičného učitele.',2,'Žáci vidí správný postup i profesionální zacházení s chybou.','Přiznání a oprava jsou věcnější než předstíraná jistota.'],
      ['Přejdu na další příklad a slíbím opravu později', 'Výuku teď nemusím přerušit.',1,'Část hodiny může pokračovat, ale již opsaná chyba ovlivní další práci.','Nejdříve zajistěte, aby na chybném kroku žáci nestavěli.']
    ], 'Chybu opravte ve chvíli, kdy ovlivňuje další učení.', 'V reflexi s učitelem zkontrolujte, co žáci po opravě skutečně používali.', ['upv-uis-5','upv-oskr']),
  'upv-21': Q('Po hodině slyšíte jen „bylo to dobré“', 'Rozbor s cvičným učitelem', 'Vytěžit z rozboru konkrétní podklad pro další hodinu.', 'Profesní reflexe',
    'Vaše první výuka skončila. Třída byla klidná, ale ve čtyřech pracovních listech chybí vysvětlení klíčového kroku. Cvičný učitel má nyní deset minut na rozbor.', 'Jak rozhovor otevřete?', [
      ['Požádám o známku za celou hodinu', 'Celkové hodnocení mi ukáže, zda jsem uspěl.',1,'Dostanete orientaci, ale nevíte, co změnit.','Pro další pokus potřebujete rozbor konkrétního žákovského výkonu.'],
      ['Ukážu anonymní ukázky a položím otázku', 'Zeptám se, zda problém vznikl v zadání nebo ověření, a domluvíme jednu změnu.',2,'Společně plánujete krok, který lze příště sledovat.','Cvičný učitel analyzuje výstup se studentem; doklady o učení zpřesňují debatu.'],
      ['Zapíšu, že hodina byla dobrá', 'Klid ve třídě mi stačí.',0,'Přehlédnete část nesplněného cíle.','Atmosféra je důležitá, ale sama nedokládá porozumění.']
    ], 'Reflexe spojuje cíl, výkon žáků a jednu další úpravu.', 'Po výstupu si vyhraďte rozbor s učitelem a přineste dvě anonymní ukázky.', ['upv-uis-6','upv-method']),
  'upv-23': Q('Z portfolia se dá poznat vaše změna', 'Závěrečná reflexe souvislé praxe', 'Doložit postupný rozvoj bez zbytečných údajů o žácích.', 'Portfolio a důvěrnost',
    'Máte první neschválený návrh zadání, později schválenou přípravu, anonymní vzorek odpovědí a poznámku cvičného učitele. Na fotografiích lavic jsou čitelná jména žáků.', 'Co zařadíte do portfolia?', [
      ['Všechny fotografie v původní podobě', 'Doklady tak působí autenticky.',0,'Zbytečně sdílíte identifikovatelné údaje.','Autenticita nevyžaduje jména žáků ani neomezené šíření obrazových záznamů.'],
      ['Jen schválenou finální přípravu', 'Ukážu nejlepší výsledek.',1,'Chráníte soukromí, ale posun v rozhodování není vidět.','Reflexi prospívá příčina úpravy a její ověřený dopad.'],
      ['Vyberu postup změny a bezpečné doklady', 'S učitelem ověřím povolené použití, odstraním identifikátory a popíšu limity závěru.',2,'Portfolio ukáže, co jste upravili a jak na to žáci reagovali.','Pravidla pracoviště a předmětu určují, jaké doklady lze sdílet.']
    ], 'Dokumentujte své pedagogické rozhodnutí, nikoli identitu žáků.', 'Před odevzdáním nechte učitele zkontrolovat výběr a úpravu dokladů.', ['upv-uis-6','upv-method'])
};

export const kpvRevisions = {
  'kpv-05': Q('Školní poradna a domluva o stínování', 'Odborná praxe I ve školním poradenském pracovišti', 'Respektovat účel služby a podmínky přítomnosti studenta.', 'Souhlas a role',
    'Mentorka vás zve ke konzultaci se žákyní o volbě dalšího studia. Žákyně při příchodu znejistí, když v místnosti uvidí neznámého člověka. Ještě jste si neujasnili, zda o vaší přítomnosti věděla.', 'Co uděláte?', [
      ['Zůstanu tiše sedět', 'Stínování bylo domluveno s mentorkou.',0,'Žákyně nemusí vědět, kdo jste a co si zapisujete.','Dohoda s pracovištěm nenahrazuje srozumitelné vysvětlení klientovi.'],
      ['Mentorka mě představí a nabídne volbu', 'Vysvětlíme účel stínování, pravidla záznamu a možnost konzultace bez mé účasti podle pravidel školy.',2,'Žákyně ví, v jaké roli jsem přítomen a jaké má možnosti.','Při práci se žáky má přednost bezpečí, důvěra a postup školy.'],
      ['Odejdu bez vysvětlení', 'Nikomu nebudu překážet.',1,'Nezasáhnete do důvěrnosti, ale žákyně ani vy nedostanete jasnou informaci pro příště.','Stručné vysvětlení a domluva pomáhají lépe než beze slov odejít.']
    ], 'Přítomnost studenta na konzultaci je třeba klientovi srozumitelně vymezit.', 'Před stínováním si s mentorkou domluvte představení, souhlas podle pravidel školy a podobu poznámek.', ['kpv-uis-1','kpv-ethics','kpv-school']),
  'kpv-04': Q('Klient přijde bez objednání', 'První týden praxe v kariérním centru', 'Zorientovat se v postupu pracoviště pro neobjednaný kontakt.', 'Vstupní kontakt',
    'Stínujete mentorku v poradně. Člověk u dveří říká, že má jen pět minut a potřebuje hned vybrat rekvalifikaci. Recepce je zavřená; zatím neznáte pravidla objednání ani záznamu.', 'Co uděláte?', [
      ['Rychle mu doporučím dostupný kurz', 'Pět minut stačí na základní radu.',0,'Rada mine skutečnou zakázku i pravidla služby.','Výběr vzdělávání vyžaduje ověřit potřebu a aktuální informace.'],
      ['Přivítám jej a vyjasním kontakt s mentorkou', 'Sdělím svou roli; zjistím, zda je možná krátká orientace či termín podle postupu poradny.',2,'Klient dostane konkrétní další krok a rozsah služby zůstane jasný.','Praxe studentovi sama o sobě nedává oprávnění k samostatné konzultaci.'],
      ['Pošlu ho na web bez dalšího zjištění', 'Objedná se sám.',1,'Může najít termín, ale bez ověření dostupnosti a vhodné služby.','I krátký vstupní kontakt má mít srozumitelný výsledek.']
    ], 'Neobjednaný kontakt vyžaduje orientaci, ne okamžitou diagnózu volby.', 'S mentorem si zapište postup pracoviště pro příchod bez termínu.', ['kpv-uis-1','kpv-nsk']),
  'kpv-07': Q('„Prostě mi řekněte, kam mám jít“', 'První vedená konzultace pod dohledem', 'Vyjasnit zakázku klienta před doporučením.', 'Otázky a naslouchání',
    'Klient říká, že chce odejít z obchodu. Máte seznam kurzů, ale nevíte, zda mu vadí samotná práce, rozvrh směn, doprava či vedení. Mentor je přítomen.', 'Co bude vaše další věta?', [
      ['Máme kurz administrativy', 'Podobná změna bývá dostupná.',0,'Povolání volíte místo klienta bez znalosti jeho cíle.','Nejdříve zjistěte, jakou změnu vlastně potřebuje.'],
      ['Co by se mělo změnit, aby vám práce dávala smysl?', 'Ověřím odpověď vlastními slovy a společně určím cíl dnešní konzultace.',2,'Možnosti budete porovnávat proti klientovým skutečným kritériím.','Otevřená otázka a shrnutí brání ukvapené radě.'],
      ['Mohu vám ukázat všechna volná místa', 'Široká nabídka jej nasměruje.',1,'Některá nabídka může pomoci, ale rozhovor zůstane bez zadaného cíle.','Seznam je nástroj pro pozdější porovnání.']
    ], 'Poradce podporuje klientovo rozhodnutí, nepřebírá je.', 'Nacvičte s mentorem jednu otázku a ověření zakázky před otevřením databáze.', ['kpv-uis-2','kpv-nsk']),
  'kpv-08': Q('Rodič chce znát závěr konzultace hned na chodbě', 'Praxe II ve školní poradně', 'Neimprovizovat sdělování informací o žákovi.', 'Důvěrnost a spolupráce',
    'Po rozhovoru se žákem o volbě oboru vás na chodbě zastaví rodič: „Co vám řekl? Vyberte mu školu, já na to nemám čas.“ Neznáte školní pravidla předávání informací ani dosud domluvený další krok. Mentorka je poblíž.', 'Co odpovíte?', [
      ['Shrnu žákovy pochybnosti a doporučím obor', 'Rodič má o budoucnost dítěte zájem.',0,'Mimo dohodnutý postup sdílíte obsah rozhovoru a rozhodujete za žáka.','Zájem rodiče neznamená, že student praxe může sám vyložit důvěrný rozhovor.'],
      ['Vymezím svou roli a přizvu mentorku', 'Nabídneme domluvený způsob společného setkání a ujasníme, jak zapojit žáka.',2,'Komunikace proběhne v rámci školy a s ohledem na žákovo rozhodování.','Práva zákonných zástupců a pravidla sdílení řešte s odpovědným pracovníkem školy.'],
      ['Řeknu jen, že rodič nemá právo nic vědět', 'Tím ochráníme žáka.',1,'Nesdělíte podrobnosti, ale vyřknete nepodložené obecné pravidlo a uzavřete spolupráci.','Rozsah sdílení se řídí věkem a pravidly služby; student jej neurčuje sám.']
    ], 'Na nečekanou žádost o citlivé informace reagujte přes vyjasněnou roli a školní postup.', 'S mentorkou proberte, kdo, co a jak sděluje žákům a zákonným zástupcům.', ['kpv-uis-2','kpv-ethics','kpv-school']),
  'kpv-11': Q('Test označil klienta za „technický typ“', 'Konzultace s výsledkem online dotazníku', 'Nezaměnit orientační výstup za diagnózu či profesní rozhodnutí.', 'Práce s nástroji',
    'Klient přinese komerční online test, který doporučil strojírenství. Má však zdravotní omezení pro některé činnosti a chce studovat práci s lidmi. Neznáte kvalitu testu; mentor sleduje rozhovor.', 'Jak s výsledkem naložíte?', [
      ['Řeknu, že test ukázal vhodný obor', 'Objektivní výsledek má přednost.',0,'Přehlédnete klientovy cíle i omezení a přisoudíte testu neznámou platnost.','Bez znalosti metody nelze z výstupu rozhodnout za klienta.'],
      ['Zeptám se, co mu z výsledku připadá užitečné', 'S mentorem ověřím možnosti a limity nástroje; jiné cesty porovnáme podle klientových kritérií.',2,'Výsledek je podnětem k rozhovoru, ne verdiktem.','Použití diagnostických metod a interpretace mají své kompetenční hranice.'],
      ['Test ignoruji', 'Je komerční, takže nemůže pomoci.',1,'Předejdete neoprávněné interpretaci, ale minete téma důležité pro klienta.','Nástroj lze kriticky probrat bez přijetí jeho závěru.']
    ], 'Nástroj rozšiřuje rozhovor; nenahrazuje klientovu volbu ani odbornou způsobilost.', 'Před použitím dotazníku ověřte jeho účel, kvalitu, pravidla interpretace a kompetence pracoviště.', ['kpv-uis-2','kpv-nsk','kpv-ethics']),
  'kpv-12': Q('Klient nerozumí formuláři', 'Přihlášení ke kurzu v poradně', 'Rozlišit informační a jazykovou překážku od nezájmu.', 'Srozumitelná podpora',
    'Klient souhlasí s přípravou přihlášky, ale několikrát přeskočí pole o předchozí kvalifikaci. Řekne, že některým výrazům nerozumí. Termín podání je zítra a mentor je k dispozici.', 'Jak mu pomůžete?', [
      ['Vyplním formulář podle svého odhadu', 'Čas běží.',0,'Můžete zapsat nepravdivé údaje či udělat rozhodnutí za klienta.','Osobní údaje a volby musí klient rozumět a potvrdit.'],
      ['Vysvětlím význam polí a ověřím údaje', 'Po domluvě s mentorem projdeme formulář krok za krokem; klient sám potvrdí odpovědi.',2,'Přihláška může být včas a klient rozumí obsahu.','Praktická pomoc odstraňuje překážku, aniž přebírá rozhodování.'],
      ['Dám klientovi odkaz domů', 'Tam má klid na vyplnění.',1,'Zachováte jeho samostatnost, ale jazyková překážka zůstane.','Podporu upravte podle toho, co mu skutečně brání v podání.']
    ], 'Odstraňte překážku a nechte klientovi kontrolu nad údaji.', 'S mentorem si připravte vysvětlení tří obtížných polí běžným jazykem.', ['kpv-uis-2','kpv-nsk']),
  'kpv-13': Q('Skupina radí za klientku', 'Skupinový kariérový workshop', 'Udržet účast a autonomii člena skupiny.', 'Facilitace skupiny',
    'Při aktivitě „další krok“ jedna účastnice řekne, že zvažuje změnu oboru. Dva ostatní ji přeruší: „Ty musíš na zdravotní.“ Zmlkne. Workshop vedete pod dohledem mentora.', 'Co řeknete skupině?', [
      ['Požádám účastníky, ať poradí hlasováním', 'Rychle získáme doporučení.',0,'Skupina může zvýšit tlak na volbu, kterou účastnice sama nezvážila.','Kariérové rozhodnutí nelze nahradit hlasováním.'],
      ['Zastavím nevyžádané rady a vrátím slovo účastnici', 'Připomenu pravidla sdílení, zeptám se, jakou zpětnou vazbu chce, a nabídnu možnost nemluvit.',2,'Účastnice rozhoduje, co sdělí a s čím chce pomoci.','Skupina může otevírat možnosti, pokud respektuje hranice jednotlivce.'],
      ['Přejdu na další aktivitu', 'Vyhneme se nepříjemnosti.',1,'Tlak přerušíte, ale pravidlo pro bezpečné sdílení nepojmenujete.','Krátká facilitace pomůže i ostatním.']
    ], 'Ve skupině chraňte právo mluvit i mlčet a právo volit si vlastní směr.', 'Před workshopem s mentorem domluvte pravidla sdílení a reakci na nevyžádané rady.', ['kpv-uis-3','kpv-nsk']),
  'kpv-14': Q('Firmy představují profese, ale jen jednu cestu', 'Školní kariérový workshop', 'Oddělit užitečné informace zaměstnavatele od nátlaku.', 'Nestrannost a informace',
    'Host z místní firmy představí svou nabídku praxí. Pak řekne třídě, že vysoká škola je ztráta času a každý by měl nastoupit rovnou k nim. Několik žáků se ptá na jiné cesty. Mentor vede workshop společně s vámi.', 'Jak navážete?', [
      ['Potvrdím, že místní firma ví nejlépe', 'Má zkušenost s oborem.',0,'Jedno pracovní místo vydáváte za obecné doporučení pro všechny.','Zkušenost firmy je cenný zdroj, nikoli rozhodnutí za žáka.'],
      ['Poděkuji za konkrétní nabídku a rozšířím srovnání', 'S mentorem otevřeme otázky o podmínkách praxe a vedle toho dostupné studijní i pracovní možnosti.',2,'Žáci mohou porovnat cesty podle svých cílů a ověřených podmínek.','Partnerství se zaměstnavatelem má podporovat orientaci, nikoli zúžit volbu.'],
      ['Hosta přeruším a ukončím setkání', 'Předejdeme ovlivňování.',1,'Zabráníte jednostrannému sdělení, ale přijdete o možnost informace kriticky použít.','Vhodné je zpřesnit tvrzení a přidat alternativy.']
    ], 'Poradenská skupina poskytuje více ověřitelných cest a prostor pro vlastní kritéria.', 'Před setkáním s hostem s mentorem domluvte otázky k podmínkám a pravidlo pro vyvážené informace.', ['kpv-uis-3','kpv-nsk','kpv-school']),
  'kpv-16': Q('Klient sdělí problém mimo kariérové poradenství', 'Konzultace pod dohledem mentora', 'Rozpoznat hranici kompetence a zajistit návaznost.', 'Předání do vhodné služby',
    'Klient začne mluvit o dlouhodobé úzkosti, která mu brání docházet do práce. Zeptá se vás, zda má vysadit předepsaný lék. Není popsáno bezprostřední ohrožení. Mentor je dostupný.', 'Jak odpovíte?', [
      ['Poradím, jak lék postupně vysadit', 'Je to hlavní překážka práce.',0,'Poskytnete zdravotní radu mimo svou odbornost.','O léčbě rozhoduje kvalifikovaný zdravotník.'],
      ['Uznám obtíž a vyjasním hranici', 'Nevyjadřuji se k léku; s mentorem domluvím vhodný kontakt na zdravotní pomoc a pokračování kariérové části.',2,'Klient dostane bezpečný další krok a poradenská zakázka zůstane srozumitelná.','Předání není odmítnutí člověka; zajistěte konkrétní návaznost a pravidla důvěrnosti.'],
      ['Rovnou ukončím celou konzultaci', 'Zdravotní téma se mne netýká.',1,'Nevstoupíte do léčby, ale klient ztratí podporu při hledání návaznosti.','I při hranici kompetence lze pomoci s vhodným předáním.']
    ], 'Při tématu mimo kompetenci jasně vymezte hranici a domluvte návaznost.', 'S mentorem předem zjistěte kontakty a postup pro naléhavé i nenaléhavé situace.', ['kpv-uis-3','kpv-nsk','kpv-school']),
  'kpv-18': Q('Předali jste kontakt. Klient se nikam nedostal', 'Navazující konzultace na praxi', 'Ověřit, zda doporučený krok byl proveditelný.', 'Kontinuita podpory',
    'Minule jste klientce dali kontakt na rekvalifikační kurz. Dnes říká, že web nedovolil přihlášení, protože kurz je plný; myslela si, že udělala chybu. Mentor je přítomen.', 'Co uděláte teď?', [
      ['Zopakuji stejný odkaz', 'Možná už formulář funguje.',0,'Překážka zůstane neověřená a klientka může odejít s pocitem selhání.','Nejprve ověřte aktuální nabídku a důvod nedostupnosti.'],
      ['Ověřím stav a s klientkou upravím plán', 'Zjistíme, zda existuje čekací listina či jiné vhodné termíny a co chce udělat dál.',2,'Další krok bude konkrétní a proveditelný.','Návaznost se pozná podle možnosti pokračovat, ne podle počtu předaných odkazů.'],
      ['Nabídnu první volný jiný kurz', 'Ušetříme čas.',1,'Může být dostupný, ale nevíte, zda odpovídá klientčiným kritériím.','Při změně nabídky znovu ověřte cíl a podmínky.']
    ], 'Po doporučení ověřujte, zda cesta skutečně funguje.', 'S mentorem stanovte, kdy a jak kontrolujete dostupnost doporučených služeb.', ['kpv-uis-3','kpv-nsk']),
  'kpv-19': Q('Praxe IV a téma bakalářské práce', 'Domluva s partnerským pracovištěm', 'Vymezit uskutečnitelný výstup přínosný pro pracoviště.', 'Plánování projektu',
    'Mentor navrhne, abyste během praxe „dokázali, že nový workshop zvyšuje zaměstnanost“. K dispozici máte jedinou malou skupinu a nemáte přístup k pozdějším pracovním výsledkům. Vedoucí práce se ještě nevyjádřil.', 'Jak projekt nastavíte?', [
      ['Přijmu tvrzení jako hlavní cíl', 'Spokojenost účastníků použiji jako doklad zaměstnanosti.',0,'Měřítko neodpovídá cíli a závěr nebude opřený o data.','Sledovat zaměstnanost bez navazujících údajů není možné.'],
      ['Sejdu se s mentorem a vedoucím práce', 'Vymezíme dosažitelnou otázku, potřebný souhlas, jednoduché ukazatele a použitelný výstup.',2,'Projekt odpovídá rozsahu praxe i potřebě pracoviště.','IVP propojuje závěrečnou praxi s bakalářskou prací; plán musí vzniknout společně.'],
      ['Odložím téma až na konec praxe', 'Tehdy uvidím, jaká data se najdou.',1,'Vyhnete se přehnanému slibu, ale přijdete o možnost předem plánovat sběr.','Otázku a dostupnost podkladů potřebujete vyjasnit na začátku.']
    ], 'Neslibujte dopad, který v rámci praxe nelze měřit.', 'Přineste na úvodní schůzku jednostránkový plán otázky, dat a využití výsledku.', ['kpv-uis-4','kpv-quality']),
  'kpv-20': Q('Workshop se líbil. Pomohl rozhodnout?', 'Vyhodnocení pilotního workshopu', 'Oddělit spokojenost od učení a dalšího kroku.', 'Evaluace služby',
    'Z osmnácti pozvaných dorazilo dvanáct; deset vyplnilo dotazník a osm označilo workshop za příjemný. Cílem ale bylo, aby si účastníci uměli určit vlastní kritéria pro další volbu.', 'Co řeknete mentorovi?', [
      ['Pomohli jsme většině účastníků rozhodnout', 'Osm kladných odpovědí stačí.',0,'Spokojenost není důkazem změny rozhodovací schopnosti.','Pozvaní, přítomní i odpovídající tvoří různé skupiny.'],
      ['Popíšu přesné počty a omezení', 'Doplním krátký úkol, v němž účastníci sami pojmenují kritéria, a uvedu, kdo odpověděl.',2,'Pracoviště získá pravdivou zprávu a lepší způsob příštího ověření.','Ukazatel má odpovídat předem vymezenému cíli.'],
      ['Data nepoužiji vůbec', 'Neodpověděli všichni.',1,'Nevyvodíte přehnaný závěr, ale přijdete o popis účasti a přijatelnosti.','Omezené údaje lze poctivě popsat se správnými jmenovateli.']
    ], 'Spokojenost, účast a změna dovednosti jsou různé výsledky.', 'Se školitelem určete jeden pozorovatelný výkon a způsob jeho zaznamenání.', ['kpv-uis-4','kpv-quality']),
  'kpv-23': Q('Pracoviště chce silnější závěr', 'Předání výsledků pilotu', 'Komunikovat poctivý závěr i při tlaku na úspěch.', 'Odborná integrita',
    'Mentor navrhuje napsat „pilot prokazatelně zvyšuje úspěšnost“. Vy máte jen zpětnou vazbu osmi dobrovolníků bez srovnání před a po. Text má jít na web organizace.', 'Jak odpovíte?', [
      ['Silný titulek ponechám, omezení dám do poznámky', 'Web potřebuje krátké sdělení.',0,'Hlavní tvrzení překročí podklady.','Poznámka nezachrání zavádějící závěr.'],
      ['Navrhnu přesné znění a další ověření', 'Popíšu zkušenost osmi lidí a co zatím nevíme; formulaci projdu s mentorem i vedoucím práce.',2,'Organizace má použitelný a důvěryhodný výstup.','Dobrá spolupráce zahrnuje schopnost říci, co data skutečně ukazují.'],
      ['Odmítnu cokoli předat', 'Žádná kontrolní skupina znamená žádnou zprávu.',1,'Předejdete nadsazení, ale zahodíte užitečná popisná zjištění.','I malý pilot může přinést poctivou informaci o průběhu.']
    ], 'Závěr má být přiměřený datům a srozumitelný partnerovi.', 'Napište dvě věty: co se stalo a co z toho nelze usoudit.', ['kpv-uis-4','kpv-ethics'])
};
