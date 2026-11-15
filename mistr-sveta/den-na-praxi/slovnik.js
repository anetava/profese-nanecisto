'use strict';

// The catalogue keeps the formal wording. Each menu item also names a task a learner can picture.
const MENU_SKILL_COPY = {
  'K01.1': [
    'Připravím si oděv a dodržím hygienu', 'Pripravím si odev a dodržím hygienu',
    'Při příchodu z ulice na pracoviště záleží na čistých rukou stejně jako na pracovním oděvu.',
    'Pri príchode z ulice na pracovisko záleží na čistých rukách rovnako ako na pracovnom odeve.'
  ],
  'K01.2': [
    'Zacházím bezpečně s potravinami', 'Bezpečne zaobchádzam s potravinami',
    'Když se na jednom stole střídají různé suroviny, záleží na tom, co se čeho dotklo.',
    'Keď sa na jednom stole striedajú rôzne suroviny, záleží na tom, čo sa čoho dotklo.'
  ],
  'K01.3': [
    'Poznám riziko a zareaguji', 'Rozpoznám riziko a zareagujem',
    'Louže v cestě mezi kuchyní a sálem může překvapit kolegu, který nese horký talíř.',
    'Kaluž na ceste medzi kuchyňou a sálou môže prekvapiť kolegu, ktorý nesie horúci tanier.'
  ],
  'K02.1': [
    'Vyberu vhodnou surovinu', 'Vyberiem vhodnú surovinu',
    'Pro salát rozhoduje i to, jestli je zelenina křehká a jak chutná za syrova.',
    'Pri šaláte záleží aj na tom, či je zelenina krehká a ako chutí za surova.'
  ],
  'K02.2': [
    'Převezmu a uložím dodávku', 'Prevezmem a uložím dodávku',
    'Po převzetí dodávky potřebuje další směna vědět, co přišlo a kterou zásobu použít první.',
    'Po prevzatí dodávky potrebuje ďalšia zmena vedieť, čo prišlo a ktorú zásobu použiť ako prvú.'
  ],
  'K02.3': [
    'Očistím a připravím suroviny', 'Očistím a pripravím suroviny',
    'U bedny zeleniny je po očištění dobře vidět, kolik z ní skutečně zbude do pokrmu.',
    'Pri debničke zeleniny po očistení dobre vidno, koľko z nej skutočne zostane do jedla.'
  ],
  'K03.1': [
    'Nakrájím suroviny na stejnou velikost', 'Nakrájam suroviny na rovnakú veľkosť',
    'Podobně velké kousky mrkve změknou v jednom hrnci přibližně ve stejnou chvíli.',
    'Podobne veľké kúsky mrkvy zmäknú v jednom hrnci približne v rovnakom čase.'
  ],
  'K03.2': [
    'Vařím, peču a dusím', 'Varím, pečiem a dusím',
    'Stejný kus zeleniny chutná po upečení jinak než po uvaření ve vodě.',
    'Rovnaký kus zeleniny chutí po upečení inak ako po uvarení vo vode.'
  ],
  'K03.3': [
    'Zvolím postup pro konkrétní pokrm', 'Zvolím postup pre konkrétne jedlo',
    'Při plné troubě se při volbě postupu počítá i s tím, co dalšího kuchyně právě připravuje.',
    'Pri plnej rúre závisí výber postupu aj od toho, čo ďalšie kuchyňa práve pripravuje.'
  ],
  'K04.1': [
    'Připravím studený pokrm nebo předkrm', 'Pripravím studené jedlo alebo predjedlo',
    'U salátu záleží i na tom, kdy přijde zálivka, aby listy při podání zůstaly svěží.',
    'Pri šaláte záleží aj na tom, kedy sa pridá zálievka, aby listy pri podávaní zostali svieže.'
  ],
  'K04.2': [
    'Uvařím polévku, omáčku a přílohu', 'Uvarím polievku, omáčku a prílohu',
    'Při výdeji je na naběračce hned vidět, jestli má omáčka potřebnou hustotu.',
    'Pri výdaji na naberačke hneď vidno, či má omáčka potrebnú hustotu.'
  ],
  'K04.3': [
    'Připravím hlavní jídlo i moučník', 'Pripravím hlavné jedlo aj múčnik',
    'Aby mohla porce opustit kuchyni, musí být včas hotová také poslední součást talíře.',
    'Aby porcia mohla opustiť kuchyňu, musí byť načas hotová aj posledná súčasť jedla.'
  ],
  'K05.1': [
    'Nachystám si pracoviště', 'Pripravím si pracovisko',
    'Když během výdeje potřebujete kleště, najdete je přesně tam, kam jste si je předem položili.',
    'Keď počas výdaja potrebujete kliešte, nájdete ich presne tam, kam ste si ich vopred položili.'
  ],
  'K05.2': [
    'Rozvrhnu si práci na směně', 'Rozvrhnem si prácu na zmene',
    'Brambory a ryba potřebují různě dlouhou přípravu, i když mají na stůl dorazit společně.',
    'Zemiaky a ryba potrebujú rôzne dlhú prípravu, aj keď majú na stôl prísť spoločne.'
  ],
  'K05.3': [
    'Sladím výdej jídel pro jeden stůl', 'Zladím výdaj jedál pre jeden stôl',
    'Obsluha potřebuje na výdeji poznat, které talíře už může odnést ke stejnému stolu.',
    'Obsluha potrebuje pri výdaji vedieť, ktoré taniere už môže odniesť k tomu istému stolu.'
  ],
  'K06.1': [
    'Připravím nádobí, sklo a příbory', 'Pripravím riad, sklo a príbor',
    'Před otevřením sálu je čas zkontrolovat, zda má každý host čistou sklenici a správný příbor.',
    'Pred otvorením sály je čas skontrolovať, či má každý hosť čistý pohár a správny príbor.'
  ],
  'K06.2': [
    'Prostřu a obsloužím stůl', 'Prestriem a obslúžim stôl',
    'Teprve když si hosté sednou, ukáže se, jestli je u stolu dost místa k podání vody i jídla.',
    'Až keď si hostia sadnú, ukáže sa, či je pri stole dosť miesta na podanie vody aj jedla.'
  ],
  'K06.3': [
    'Postarám se o hosty od příchodu po rozloučení', 'Postarám sa o hostí od príchodu po rozlúčku',
    'Během celé návštěvy přichází chvíle nabídnout další chod i chvíle dopřát hostům klid.',
    'Počas celej návštevy príde chvíľa ponúknuť ďalší chod aj chvíľa dopriať hosťom pokoj.'
  ],
  'K07.1': [
    'Připravím a podám nealkoholický nápoj', 'Pripravím a podám nealkoholický nápoj',
    'Dvě limonády objednané ke stejnému stolu mají chutnat stejně.',
    'Dve limonády objednané k tomu istému stolu majú chutiť rovnako.'
  ],
  'K07.2': [
    'Připravím kávu a čaj', 'Pripravím kávu a čaj',
    'Na chuti šálku se projeví už množství kávy nebo čaje, které při přípravě odměříte.',
    'Na chuti šálky sa prejaví už množstvo kávy alebo čaju, ktoré pri príprave odmeriate.'
  ],
  'K07.3': [
    'Doporučím a podám nápoj k jídlu', 'Odporučím a podám nápoj k jedlu',
    'Host, který si přeje méně sladký nápoj, ocení doporučení k vlastnímu výběru jídla.',
    'Hosť, ktorý si želá menej sladký nápoj, ocení odporúčanie k jedlu, ktoré si vybral.'
  ],
  'K08.1': [
    'Přivítám hosta a přijmu objednávku', 'Privítam hosťa a prijmem objednávku',
    'Přesný zápis u stolu přenese do kuchyně i přání hosta, který chce omáčku zvlášť.',
    'Presný zápis pri stole prenesie do kuchyne aj želanie hosťa, ktorý chce omáčku osobitne.'
  ],
  'K08.2': [
    'Doporučím jídlo a ověřím alergeny', 'Odporučím jedlo a overím alergény',
    'Když se host zeptá na složení dresinku, odpověď najdete v ověřených podkladech kuchyně.',
    'Keď sa hosť spýta na zloženie dresingu, odpoveď nájdete v overených podkladoch kuchyne.'
  ],
  'K08.3': [
    'Vyřeším stížnost hosta', 'Vyriešim sťažnosť hosťa',
    'Hostovi, který dostal jinou přílohu, pomůže, když ví, kdo se o výměnu postará.',
    'Hosťovi, ktorý dostal inú prílohu, pomôže, keď vie, kto sa o výmenu postará.'
  ],
  'K09.1': [
    'Posoudím chuť, vůni, vzhled a konzistenci', 'Posúdim chuť, vôňu, vzhľad a konzistenciu',
    'Při ochutnávce potřebuje kuchař vědět, zda je polévka příliš slaná, řídká, nebo jí schází vůně.',
    'Pri ochutnávke potrebuje kuchár vedieť, či je polievka príliš slaná, riedka alebo jej chýba vôňa.'
  ],
  'K09.2': [
    'Upravím pokrm na talíři', 'Upravím jedlo na tanieri',
    'U dvou porcí stejného jídla hosté hned poznají rozdíl ve velikosti i úpravě.',
    'Pri dvoch porciách rovnakého jedla si hostia hneď všimnú rozdiel vo veľkosti aj úprave.'
  ],
  'K09.3': [
    'Ověřím, že host dostal, co si objednal', 'Overím, či hosť dostal, čo si objednal',
    'Krátká kontrola odhalí třeba přílohu, která u jednoho místa ještě chybí.',
    'Krátka kontrola odhalí napríklad prílohu, ktorá jednému hosťovi ešte chýba.'
  ],
  'K10.1': [
    'Přepočítám suroviny na počet porcí', 'Prepočítam suroviny na počet porcií',
    'Recept pro čtyři hosty můžete dostat i tehdy, když na oběd dorazí celá školní skupina.',
    'Recept pre štyroch hostí môžete dostať aj vtedy, keď na obed príde celá školská skupina.'
  ],
  'K10.2': [
    'Spočítám náklady a navrhnu cenu', 'Spočítam náklady a navrhnem cenu',
    'Když zdraží hlavní surovina, kalkulace ukáže, jak se změní náklady na jednu porci.',
    'Keď zdražie hlavná surovina, kalkulácia ukáže, ako sa zmenia náklady na jednu porciu.'
  ],
  'K10.3': [
    'Omezím plýtvání v provozu', 'Obmedzím plytvanie v prevádzke',
    'Z množství nevyužité přílohy po obědě se dá odhadnout, kolik jí připravit příště.',
    'Z množstva nevyužitej prílohy po obede sa dá odhadnúť, koľko jej pripraviť nabudúce.'
  ],
  'K11.1': [
    'Domluvím se s týmem při práci', 'Dohodnem sa s tímom pri práci',
    'Když na jednu objednávku pracují tři lidé, potřebuje každý vědět, kterou část má na starosti.',
    'Keď na jednej objednávke pracujú traja ľudia, každý potrebuje vedieť, za ktorú časť zodpovedá.'
  ],
  'K11.2': [
    'Předám kolegům důležité informace', 'Odovzdám kolegom dôležité informácie',
    'Střídající kolega potřebuje vědět, kterou objednávku už host dostal a na co ještě čeká.',
    'Kolega, ktorý vás strieda, potrebuje vedieť, čo už hosť z objednávky dostal a na čo ešte čaká.'
  ],
  'K11.3': [
    'Zhodnotím svou práci a vyberu další krok', 'Zhodnotím svoju prácu a vyberiem ďalší krok',
    'Když pojmenujete konkrétní moment, který vás zdržel, víte, co si na příští směně vyzkoušet jinak.',
    'Keď pomenujete konkrétnu chvíľu, ktorá vás zdržala, viete, čo si na ďalšej zmene vyskúšať inak.'
  ],
  'K12.1': [
    'Naplánuji a dokončím zakázku', 'Naplánujem a dokončím zákazku',
    'U občerstvení pro dvacet hostů záleží jak na počtu porcí, tak na hodině předání.',
    'Pri občerstvení pre dvadsiatich hostí záleží na počte porcií aj na čase odovzdania.'
  ],
  'K12.2': [
    'Sladím práci kuchyně a obsluhy', 'Zladím prácu kuchyne a obsluhy',
    'Když se u hostů protáhne první chod, kuchyně potřebuje vědět, kdy dokončit druhý.',
    'Keď sa hostia zdržia pri prvom chode, kuchyňa potrebuje vedieť, kedy dokončiť druhý.'
  ],
  'K12.3': [
    'Představím svou práci pomocí portfolia', 'Predstavím svoju prácu pomocou portfólia',
    'U pohovoru můžete na konkrétní ukázce vysvětlit, co jste dělali samostatně a jak vaše práce dopadla.',
    'Na pohovore môžete na konkrétnej ukážke vysvetliť, čo ste robili samostatne a ako vaša práca dopadla.'
  ]
};

function menuSkillName(c) {
  const row = MENU_SKILL_COPY[c.code];
  return row ? t(row[0], row[1]) : c.name;
}

function menuSkillWhy(c) {
  const row = MENU_SKILL_COPY[c.code];
  return row ? t(row[2], row[3]) : c.goal;
}
