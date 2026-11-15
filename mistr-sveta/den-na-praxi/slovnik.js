'use strict';

// The catalogue keeps the formal wording. Each menu item also names a task a learner can picture.
const MENU_SKILL_COPY = {
  'K01.1': [
    'Připravím si oděv a dodržím hygienu', 'Pripravím si odev a dodržím hygienu',
    'Převléknu se a umyju si ruce, aby se nečistoty z ulice nedostaly k jídlu.',
    'Pred zmenou si umyjem ruky a prezlečiem sa, aby sa nečistoty zvonka nedostali do kuchyne.'
  ],
  'K01.2': [
    'Zacházím bezpečně s potravinami', 'Bezpečne zaobchádzam s potravinami',
    'Pro salát si nachystám čistou plochu, aby nepřišel do styku se syrovým masem.',
    'Na šalát si pripravím čistú plochu, aby neprišiel do styku so surovým mäsom.'
  ],
  'K01.3': [
    'Poznám riziko a zareaguji', 'Rozpoznám riziko a zareagujem',
    'Upozorním kolegy na louži u výdeje, aby tudy někdo neprošel s horkou polévkou.',
    'Upozorním kolegov na kaluž pri výdaji, aby tadiaľ niekto neprešiel s horúcou polievkou.'
  ],
  'K02.1': [
    'Vyberu vhodnou surovinu', 'Vyberiem vhodnú surovinu',
    'Do salátu vyberu pevná jablka, aby kousky při míchání držely tvar.',
    'Do šalátu vyberiem pevné jablká, aby kúsky pri miešaní držali tvar.'
  ],
  'K02.2': [
    'Převezmu a uložím dodávku', 'Prevezmem a uložím dodávku',
    'Novou dodávku označím a uložím tak, aby další směna věděla, kterou zásobu použít první.',
    'Novú dodávku označím a uložím tak, aby ďalšia zmena vedela, ktorú zásobu použiť ako prvú.'
  ],
  'K02.3': [
    'Očistím a připravím suroviny', 'Očistím a pripravím suroviny',
    'Mrkev očistím s co nejmenší ztrátou, aby jí z jedné bedny zbylo víc na porce.',
    'Mrkvu očistím s čo najmenšou stratou, aby jej z jednej debničky zostalo viac na porcie.'
  ],
  'K03.1': [
    'Nakrájím suroviny na stejnou velikost', 'Nakrájam suroviny na rovnakú veľkosť',
    'Mrkev nakrájím na stejně velké kostky, aby v polévce změkly přibližně ve stejnou chvíli.',
    'Mrkvu nakrájam na rovnako veľké kocky, aby v polievke zmäkli približne v rovnakom čase.'
  ],
  'K03.2': [
    'Vařím, peču a dusím', 'Varím, pečiem a dusím',
    'Porovnám vařenou a pečenou mrkev a zjistím, jak postup mění chuť a konzistenci.',
    'Porovnám varenú a pečenú mrkvu a zistím, ako postup mení chuť a konzistenciu.'
  ],
  'K03.3': [
    'Zvolím postup pro konkrétní pokrm', 'Zvolím postup pre konkrétne jedlo',
    'Podle objednávky vyberu postup, při kterém budou brambory křupavé na povrchu a měkké uvnitř.',
    'Podľa objednávky vyberiem postup, pri ktorom budú zemiaky na povrchu chrumkavé a vnútri mäkké.'
  ],
  'K04.1': [
    'Připravím studený pokrm nebo předkrm', 'Pripravím studené jedlo alebo predjedlo',
    'Salát promíchám se zálivkou těsně před podáním, aby listy zůstaly svěží i na stole.',
    'Šalát premiešam so zálievkou tesne pred podávaním, aby listy zostali svieže aj na stole.'
  ],
  'K04.2': [
    'Uvařím polévku, omáčku a přílohu', 'Uvarím polievku, omáčku a prílohu',
    'Na lžíci zkontroluji, jak omáčka stéká, a před výdejem doladím její hustotu.',
    'Na lyžici skontrolujem, ako omáčka steká, a pred výdajom doladím jej hustotu.'
  ],
  'K04.3': [
    'Připravím hlavní jídlo i moučník', 'Pripravím hlavné jedlo aj múčnik',
    'Při přípravě moučníku načasuji omáčku i zdobení, aby každá porce odcházela kompletní.',
    'Pri príprave múčnika načasujem omáčku aj zdobenie, aby každá porcia odchádzala kompletná.'
  ],
  'K05.1': [
    'Nachystám si pracoviště', 'Pripravím si pracovisko',
    'Kleště i talíře si připravím na dosah, aby kolegové při výdeji nečekali, až najdu pomůcky.',
    'Kliešte aj taniere si pripravím na dosah, aby kolegovia pri výdaji nečakali, kým nájdem pomôcky.'
  ],
  'K05.2': [
    'Rozvrhnu si práci na směně', 'Rozvrhnem si prácu na zmene',
    'Začnu bramborami a rybu přidám později, aby obojí dorazilo na stůl teplé.',
    'Začnem zemiakmi a rybu pridám neskôr, aby oboje prišlo na stôl teplé.'
  ],
  'K05.3': [
    'Sladím výdej jídel pro jeden stůl', 'Zladím výdaj jedál pre jeden stôl',
    'Před výdejem porovnám talíře s objednávkou, aby hosté u jednoho stolu dostali jídlo společně.',
    'Pred výdajom porovnám taniere s objednávkou, aby hostia pri jednom stole dostali jedlo naraz.'
  ],
  'K06.1': [
    'Připravím nádobí, sklo a příbory', 'Pripravím riad, sklo a príbor',
    'Podle dnešního menu nachystám příbory, aby host k polévce dostal lžíci včas.',
    'Podľa dnešného menu nachystám príbor, aby hosť dostal lyžicu k polievke včas.'
  ],
  'K06.2': [
    'Prostřu a obsloužím stůl', 'Prestriem a obslúžim stôl',
    'Při prostírání nechám místo na karafu, aby šla voda nalít bez natahování přes hosta.',
    'Pri prestieraní nechám miesto na karafu, aby sa dala voda naliať bez načahovania sa ponad hosťa.'
  ],
  'K06.3': [
    'Postarám se o hosty od příchodu po rozloučení', 'Postarám sa o hostí od príchodu po rozlúčku',
    'Sleduji, kdy hosté odloží příbory, a v pravou chvíli jim nabídnu další chod.',
    'Všímam si, kedy hostia odložia príbor, a v správnej chvíli im ponúknem ďalší chod.'
  ],
  'K07.1': [
    'Připravím a podám nealkoholický nápoj', 'Pripravím a podám nealkoholický nápoj',
    'Na dvě domácí limonády odměřím stejný poměr sirupu a vody, aby chutnaly stejně.',
    'Na dve domáce limonády odmeriam rovnaký pomer sirupu a vody, aby chutili rovnako.'
  ],
  'K07.2': [
    'Připravím kávu a čaj', 'Pripravím kávu a čaj',
    'U čaje si pohlídám čas louhování, aby i další šálek chutnal podle receptury.',
    'Pri čaji si ustrážim čas lúhovania, aby aj ďalšia šálka chutila podľa receptúry.'
  ],
  'K07.3': [
    'Doporučím a podám nápoj k jídlu', 'Odporučím a podám nápoj k jedlu',
    'Zjistím, co host jí a jaké chutě má rád, a podle toho mu doporučím nápoj.',
    'Zistím, čo hosť je a aké chute má rád, a podľa toho mu odporučím nápoj.'
  ],
  'K08.1': [
    'Přivítám hosta a přijmu objednávku', 'Privítam hosťa a prijmem objednávku',
    'U stolu si ověřím přání „omáčku zvlášť“ a zapíšu ho, aby ji kuchyně podala odděleně.',
    'Pri stole si overím želanie „omáčku osobitne“ a zapíšem ho, aby ju kuchyňa podala oddelene.'
  ],
  'K08.2': [
    'Doporučím jídlo a ověřím alergeny', 'Odporučím jedlo a overím alergény',
    'Ověřím složení dresinku u kuchyně, aby host dostal přesnou odpověď na otázku o alergenech.',
    'Zloženie dresingu si overím v kuchyni, aby hosť dostal presnú odpoveď na otázku o alergénoch.'
  ],
  'K08.3': [
    'Vyřeším stížnost hosta', 'Vyriešim sťažnosť hosťa',
    'Vyslechnu hosta a domluvím výměnu přílohy, aby věděl, jak a kdy se chyba napraví.',
    'Vypočujem si hosťa a dohodnem výmenu prílohy, aby vedel, ako a kedy sa chyba napraví.'
  ],
  'K09.1': [
    'Posoudím chuť, vůni, vzhled a konzistenci', 'Posúdim chuť, vôňu, vzhľad a konzistenciu',
    'Při ochutnávce popíšu, že je polévka řídká, aby kuchař věděl, co před výdejem upravit.',
    'Pri ochutnávke opíšem, že je polievka riedka, aby kuchár vedel, čo pred výdajom upraviť.'
  ],
  'K09.2': [
    'Upravím pokrm na talíři', 'Upravím jedlo na tanieri',
    'Před výdejem porovnám oba talíře, aby dva hosté se stejnou objednávkou dostali srovnatelné porce.',
    'Pred výdajom porovnám oba taniere, aby dvaja hostia pri rovnakej objednávke dostali porovnateľné porcie.'
  ],
  'K09.3': [
    'Ověřím, že host dostal, co si objednal', 'Overím, či hosť dostal, čo si objednal',
    'Porovnám objednávku s talíři na stole a doplním chybějící přílohu dřív, než si o ni host řekne.',
    'Porovnám objednávku s taniermi na stole a doplním chýbajúcu prílohu skôr, než si ju hosť vypýta.'
  ],
  'K10.1': [
    'Přepočítám suroviny na počet porcí', 'Prepočítam suroviny na počet porcií',
    'Přepočítám recept z 10 na 25 porcí, aby příloha vystačila i na posledního hosta.',
    'Prepočítam recept z 10 na 25 porcií, aby príloha vystačila aj pre posledného hosťa.'
  ],
  'K10.2': [
    'Spočítám náklady a navrhnu cenu', 'Spočítam náklady a navrhnem cenu',
    'Z navržené ceny porce odečtu náklady na suroviny a zjistím, kolik zbývá na další výdaje.',
    'Z navrhnutej ceny porcie odpočítam náklady na suroviny a zistím, koľko zostane na ďalšie výdavky.'
  ],
  'K10.3': [
    'Omezím plýtvání v provozu', 'Obmedzím plytvanie v prevádzke',
    'Po obědě zvážím nevydanou přílohu a podle výsledku upravím množství, aby jí příště méně zbylo.',
    'Po obede odvážim nevydanú prílohu a podľa výsledku upravím množstvo, aby jej menej zostávalo.'
  ],
  'K11.1': [
    'Domluvím se s týmem při práci', 'Dohodnem sa s tímom pri práci',
    'Před výdejem si rozdělíme práci, aby jeden připravil rybu a druhý ve stejnou chvíli přílohu.',
    'Pred výdajom si rozdelíme prácu, aby jeden pripravil rybu a druhý v rovnakom čase prílohu.'
  ],
  'K11.2': [
    'Předám kolegům důležité informace', 'Odovzdám kolegom dôležité informácie',
    'Při střídání řeknu, které přílohy už jsou hotové, aby je další směna nepřipravovala podruhé.',
    'Pri striedaní poviem, ktoré prílohy sú už hotové, aby ich ďalšia zmena nepripravovala druhýkrát.'
  ],
  'K11.3': [
    'Zhodnotím svou práci a vyberu další krok', 'Zhodnotím svoju prácu a vyberiem ďalší krok',
    'Po výdeji si zapíšu, že mě zdrželo hledání kleští, a příště je nachystám předem.',
    'Po výdaji si zapíšem, že ma zdržalo hľadanie klieští, a nabudúce ich nachystám vopred.'
  ],
  'K12.1': [
    'Naplánuji a dokončím zakázku', 'Naplánujem a dokončím zákazku',
    'Rozplánuji občerstvení pro dvacet hostů, aby byl celý domluvený počet porcí včas na místě.',
    'Rozplánujem občerstvenie pre dvadsať hostí, aby bol celý dohodnutý počet porcií načas na mieste.'
  ],
  'K12.2': [
    'Sladím práci kuchyně a obsluhy', 'Zladím prácu kuchyne a obsluhy',
    'Domluvím se s obsluhou na výdeji druhého chodu, aby jídlo nečekalo, když hosté ještě jedí první.',
    'Dohodnem sa s obsluhou na výdaji druhého chodu, aby jedlo nečakalo, kým hostia ešte jedia prvý.'
  ],
  'K12.3': [
    'Představím svou práci pomocí portfolia', 'Predstavím svoju prácu pomocou portfólia',
    'U pohovoru ukážu potvrzenou práci a na konkrétním příkladu vysvětlím, co zvládnu samostatně.',
    'Na pohovore ukážem potvrdenú prácu a na konkrétnom príklade vysvetlím, čo zvládnem samostatne.'
  ]
};

function menuSkillName(c) {
  const row = MENU_SKILL_COPY[c.code];
  return row ? t(row[0], row[1]) : c.name;
}

// Shared skills lead to different work on the floor and in the kitchen.
const SERVICE_SKILL_WHY = {
  'K01.1': [
    'Před prostíráním se převléknu a umyju si ruce, aby na příborech nezůstaly nečistoty zvenku.',
    'Pred prestieraním sa prezlečiem a umyjem si ruky, aby na príbore nezostali nečistoty zvonka.'
  ],
  'K05.1': [
    'Před otevřením sálu nachystám čisté sklenice, aby si první hosté mohli hned objednat vodu.',
    'Pred otvorením sály nachystám čisté poháre, aby si prví hostia mohli hneď objednať vodu.'
  ],
  'K05.2': [
    'Ještě před příchodem skupiny prostřu stoly, aby pak byl čas na objednávky.',
    'Ešte pred príchodom skupiny prestriem stoly, aby bol potom čas na objednávky.'
  ],
  'K10.1': [
    'Přepočítám recept na limonádu z 10 na 25 sklenic, aby na baru vystačil sirup.',
    'Prepočítam recept na limonádu z 10 na 25 pohárov, aby na bare vystačil sirup.'
  ],
  'K10.2': [
    'Spočítám náklady na jednu limonádu a zjistím, co udělá dražší sirup s navrženou cenou.',
    'Spočítam náklady na jednu limonádu a zistím, čo urobí drahší sirup s navrhnutou cenou.'
  ],
  'K10.3': [
    'Po snídani spočítám nevydané pečivo a předám údaj kuchyni, aby příště odhadla množství přesněji.',
    'Po raňajkách spočítam nevydané pečivo a odovzdám údaj kuchyni, aby nabudúce odhadla množstvo presnejšie.'
  ],
  'K11.1': [
    'S kolegou si rozdělíme stoly, aby se oběma příchozím skupinám hned někdo věnoval.',
    'S kolegom si rozdelíme stoly, aby sa obom prichádzajúcim skupinám hneď niekto venoval.'
  ],
  'K11.2': [
    'Při střídání nahlásím, že stůl čtyři čeká na dvě kávy, aby hosté nemuseli objednávat znovu.',
    'Pri striedaní nahlásim, že stôl štyri čaká na dve kávy, aby hostia nemuseli objednávať znova.'
  ],
  'K11.3': [
    'Zapíšu si, kterou objednávku bylo třeba opravovat, a příště si ji u stolu zopakuji.',
    'Zapíšem si, ktorú objednávku bolo treba opraviť, a nabudúce si ju pri stole zopakujem.'
  ],
  'K12.2': [
    'Dám kuchyni vědět, že hosté dojedli předkrm, aby druhý chod přišel ke stolu včas.',
    'Dám kuchyni vedieť, že hostia dojedli predjedlo, aby druhý chod prišiel k stolu načas.'
  ]
};

function menuSkillWhy(c, learner) {
  const serviceCopy = learner?.track === 'service' && SERVICE_SKILL_WHY[c.code];
  if (serviceCopy) return t(...serviceCopy);
  const row = MENU_SKILL_COPY[c.code];
  return row ? t(row[2], row[3]) : c.goal;
}
