'use strict';
window.SOURCES = [
  {name:'IVP ČZU · Původní metodika 05',url:'https://www.ivp.czu.cz/dl/135149?lang=cs',note:'Oficiální metodický materiál, aktualizace 7. 10. 2024. Odlišujte od studijních průvodců Ateliéru.'},
  {name:'IVP ČZU · Studijní plán UPV',url:'https://www.ivp.czu.cz/dl/82143?lang=cs',note:'Rozložení předmětů v šesti semestrech, rozsah praxí, způsob zakončení a kredity.'},
  {name:'IVP ČZU · Profil absolventa',url:'https://www.ivp.czu.cz/dl/141454?lang=cs',note:'Tříleté kombinované bakalářské studium. Dvanáct týdnů praxe zahrnuje pozorování, vlastní výuku a reflexi.'},
  {name:'Ateliér praxí · Průvodce souvislou praxí podle metodiky IVP',url:'materialy/metodiky/05-souvisla-praxe.pdf?v=komplet-202627',note:'Studijní zpracování pro akademický rok 2026/2027. Rozsah výstupů, portfolio, závěrečný výstup a odpovědnosti účastníků.'},
  {name:'MŠMT · Kompetenční rámec absolventa a absolventky učitelství',url:'https://msmt.gov.cz/vzdelavani/pedagogicti-pracovnici/priprava-pedagogickych-pracovniku/kompetencni-ramec-absolventa-a-absolventky-ucitelstvi',note:'Mapa zachovává číslování 18 kompetencí a používá stručné pracovní názvy. Při studiu sledujte popis úrovně absolventa. Další stupně patří začínajícím a zkušeným učitelům.'},
  {name:'MŠMT · Oborový rámec pro odborné předměty, praktické vyučování a odborný výcvik',url:'https://msmt.gov.cz/uploads/OSKR/OSKR_Ucitelstvi_odbornych_predmetu_praktickeho_vyucovani_a_odborneho_vycviku.pdf',note:'Příklady pro odborné vzdělávání konkretizují mj. ukázku pracovního postupu, vedení nácviku a vztah školy k praxi.'},
  {name:'Ateliér praxí · Průvodce reflexí podle metodiky IVP',url:'materialy/metodiky/06-reflexe.docx?v=komplet-202627',note:'Studijní zpracování pro akademický rok 2026/2027 podle podkladů IVP ve Foxy Studio. Stanoví rozsah písemné reflexe, odevzdání do Moodlu a podmínky zápočtu.'},
  {name:'Foxy Studio · Studentský průvodce IVP',url:'https://foxy-studio-campus-pilot.web.app/',note:'Obsahová inspirace pro orientaci před praxí a práci s podklady.'}
];
// Krátké pracovní názvy; číslování odpovídá KRAAU. Příklady jsou situace pro studenta UPV.
window.AREAS = [
  ['Obor a jeho výuka', [
    ['1.1','Rozvíjím svou odbornost','Ověřte současný oborový postup a zaznamenejte, kde jste při přípravě aktualizovali učivo.'],
    ['1.2','Učím odborný postup srozumitelně','Předveďte první krok a nechte žáka vlastními slovy popsat, co udělá dál.']]],
  ['Plánování, vedení a reflexe výuky', [
    ['2.1','Vyjasňuji cíle společně se žáky','Dohodněte se, co bude žák umět na konci činnosti a jak pozná správný výsledek.'],
    ['2.2','Připravuji výuku pro rozdílné potřeby','Naplánujte oporu pro začátečníka i rozšíření pro žáka, který postup již ovládá.'],
    ['2.3','Probouzím zájem a zvídavost','Ukažte dva vzorky s různým výsledkem a nechte žáky odhadnout příčinu.'],
    ['2.4','Vedu výuku podle toho, čemu žáci rozumějí','V průběhu práce ověřte porozumění a podle odpovědí upravte další instrukci.'],
    ['2.5','Porovnávám výsledky s cílem hodiny','Vyberte ukázku práce a určete, který znak výrobku nebo postupu dokládá splněný cíl.']]],
  ['Podmínky pro učení', [
    ['3.1','Vytvářím prostředí pro bezpečné učení','Domluvte postup při nejistotě, aby se žák mohl včas zeptat.'],
    ['3.2','Podporuji spolupráci a domluvená pravidla','Dvojice si při nácviku vystřídá roli vykonavatele a pozorovatele.'],
    ['3.3','Uspořádávám pracoviště a digitální prostředí','Zkontrolujte, zda každý vidí na demonstraci a dosáhne na potřebné podklady.']]],
  ['Hodnocení a zpětná vazba', [
    ['4.1','Opírám hodnocení o známá kritéria','Předem ukažte dvě kritéria a dejte žákům možnost vlastní práci posoudit.'],
    ['4.2','Dávám i přijímám využitelnou zpětnou vazbu','Popište konkrétní krok, který žák zvládl. Po další ukázce se zeptejte, co mu pomohlo.'],
    ['4.3','Učím žáky reflektovat jejich postup','Položte otázku, co by žák při dalším pokusu změnil a proč.']]],
  ['Spolupráce v profesi', [
    ['5.1','Spolupracuji s kolegy ve prospěch žáků','S cvičným učitelem vyberte vhodnou podporu a při další hodině porovnejte její dopad.'],
    ['5.2','Zapojuji rodiny a partnery školy','S provázejícím učitelem promyslete, kdy může žákovi pomoci propojení školy, rodiny nebo zaměstnavatele.']]],
  ['Profesní rozvoj, etika a duševní zdraví', [
    ['6.1','Promýšlím svou učitelskou roli a další rozvoj','Zvolte jednu dovednost, určete nejbližší příležitost k nácviku a domluvte zpětnou vazbu.'],
    ['6.2','Jednám eticky, vedu k demokratickým hodnotám a ověřuji informace','Při práci s digitálním podkladem ověřte původ, chraňte osobní údaje a dejte prostor různým zdůvodněným pohledům.'],
    ['6.3','Pečuji o svou duševní pohodu','Pojmenujte náročnou situaci a určete, kdy využijete podporu nebo čas pro zotavení.']]]
].map(([name,skills])=>({name,skills:skills.map(([code,name,example])=>({code,name,example}))}));
window.FINAL_METHOD = {
 id:'continuous',credit:'Zápočet zohledňuje splněné výstupy a portfolio. Závěrečný samostatný výstup hodnotí komise.',title:'Souvislá řízená pedagogická praxe',short:'Vedu vlastní výuku',place:'Cvičná SOŠ nebo SOU',
 goal:'Připravte, odučte a rozeberte výuku ve svém oboru. U závěrečného výstupu samostatně předveďte celou vyučovací jednotku.',
 steps:[
 'S koordinátorem a cvičným učitelem sestavte rozvrh výstupů včetně závěrečného. Nejpozději do 3 dnů jej předejte koordinátorovi a pedagogovi IVP.',
 'Poznejte pracoviště, ŠVP, tematické plány a pravidla bezpečnosti. Proberte přípravy s cvičným učitelem.',
 'Standardní rozsah jsou čtyři týdny a 14 výstupů. Zkrácená varianta má dva týdny a osm výstupů a vyžaduje souhlas ředitele IVP na základě doloženého dvouletého pedagogického působení na odborné škole.',
 'Jednotku delší než 5 vyučovacích hodin lze podle metodiky započítat jako dva výstupy. Uveďte její délku a nechte započtení ověřit pedagogem; prostý počet záznamů v Ateliéru toto pravidlo nevyhodnocuje.',
 'Po každé jednotce proveďte s cvičným učitelem rozbor a doplňte doporučení do přípravy.',
 'Navíc absolvujte jeden závěrečný výstup před komisí. Přípravu zpracujte samostatně bez pomoci cvičného učitele. Metodika požaduje všechny fáze kombinované jednotky včetně zkoušení 1–2 žáků na začátku. Termín potvrzuje pedagog IVP; v den výstupu předložte portfolio.' ],
 evidence:['Charakteristika školy a rozvrh s vyznačenými výstupy','Přípravy s vlastní reflexí a doporučeními cvičného učitele','Tištěné portfolio pro pedagoga IVP a elektronická verze do Moodlu'],
 source:['IVP ČZU · Metodika 05 k souvislé řízené pedagogické praxi','IVP ČZU · Studijní plán UPV'],
 fields:[{label:'Cíl mé výuky',hint:'Co mají žáci samostatně předvést a podle čeho to poznáte?'},{label:'Doklad o učení',hint:'Která práce, odpověď nebo změna v postupu žáků doložila výsledek?'},{label:'Rozbor výstupu',hint:'Co jste zjistili s cvičným učitelem a jak to zapracujete do další hodiny?'}]
};
window.REFLECTION_METHOD = {
 id:'reflection',credit:'Podle sylabu VVV178Z pro rok 2026/2027 upřesňuje závazné podmínky a způsob hodnocení Moodle předmětu.',title:'Reflexe pedagogické praxe',short:'Hodnotím svůj pokrok',place:'IVP · závěr studia',
 goal:'Porovnejte, jak jste vyučování pozorovali na začátku studia a jak je dnes sami řídíte. Využijte konkrétní doklady z portfolia.',
 steps:['Vyberte z portfolia starší záznam z pozorování a vlastní výstup s podobným tématem.','U obou popište situaci, činnost žáků a doklad o jejich učení.','Dodaná metodika 06 požaduje celkové zhodnocení alespoň na tři strany do Moodlu. Aktuální sylabus odkazuje závazný rozsah a kritéria na Moodle předmětu; před odevzdáním ověřte aktuální zadání.','Absolvujte reflexi v celém rozsahu. V řízené diskusi na IVP vysvětlete vlastní didaktická rozhodnutí a proberte silné stránky i potřeby dalšího rozvoje.'],
 evidence:['Komplexní zhodnocení praxí: dodaná metodika uvádí nejméně tři strany; aktuální zadání ověřte v Moodlu','Podklady k diskusi: náslechové archy a přípravy vlastních hodin','Zápočet uděluje garant praxe na základě splněných podmínek.'],
 source:['IVP ČZU · Metodické pokyny 06 pro UPV, Reflexe pedagogické praxe','IVP ČZU · Studijní plán UPV. Předmět má rozsah 1 týden, 2 ECTS, zápočet.'],
 fields:[{label:'Co ukazují mé dvě ukázky?',hint:'Uveďte vlastní pozorování a srovnatelný moment z pozdější výuky.'},{label:'Co se změnilo v mém rozhodování?',hint:'Co byste dnes udělali jinak a na jakém dokladu to můžete ukázat?'},{label:'Na co se zaměřím dál?',hint:'Zvolte jednu kompetenci a naplánujte konkrétní pokus v další výuce.'}]
};
const ivpSyllabi = [
  ['VVV173Z',294587,'Průběžná pedagogická praxe','LS · 2 kredity. Pozorování a analýza výuky, práce s hospitačním záznamem a reflexe.'],
  ['VVV174Z',285935,'Skupinový náslech','ZS · 2 kredity. Pozorování ve vlastním zaměření a rozbor ve skupině.'],
  ['VVV175Z',285936,'Řízená náslechová praxe','LS · 8 kreditů. Sylabus uvádí 4 teoretické a 6 praktických jednotek. Přiložená metodika 03 uvádí 10 a 2. Pro tento Ateliér byl dne 23. 11. 2026 stanoven rozsah podle metodiky 03: 10 teoretických a 2 praktické jednotky. Rozdíl vůči UIS tím není odstraněn.'],
  ['VVV176Z',285934,'Microteaching','ZS · 4 kredity. Mikrovýstup, videomonitoring a rozbor didaktického, slovního i neverbálního projevu.'],
  ['VVV177E',294600,'Souvislá řízená praxe','LS · 10 kreditů. Vlastní výuka, její rozbor a samostatně připravený závěrečný výstup před komisí.'],
  ['VVV178Z',294594,'Reflexe pedagogické praxe','LS · 2 kredity. Reflexe doložených zkušeností, supervize a profesní cíle. Závazná kritéria a způsob hodnocení najdete v Moodlu předmětu.']
];
window.SOURCES.push(...ivpSyllabi.map(([code,id,title,note])=>({name:'UIS ČZU · '+code+' · '+title,url:'https://is.czu.cz/katalog/syllabus.pl?predmet='+id+';lang=cz',note:'2026/2027 · '+note})));
