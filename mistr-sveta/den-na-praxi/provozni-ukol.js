'use strict';

// These are deliberately small, independent cases. They stay outside the assessment record.
function stationCase(code, cook) {
  if (code === 'K10.1') {
    return cook ? {
      title:t('Přepočítat mrkev pro 25 hostů', 'Prepočítať mrkvu pre 25 hostí'),
      question:t('Do přílohy pro 10 hostů patří 800 g očištěné mrkve. Na oběd přijde 25 hostů. Kolik mrkve připravíte pro stejně velké porce?', 'Do prílohy pre 10 hostí patrí 800 g očistenej mrkvy. Na obed príde 25 hostí. Koľko mrkvy pripravíte na rovnako veľké porcie?'),
      answers:['800 g', '2 000 g', '2 500 g'], correct:1,
      feedback:[
        t('Toto množství vystačí na původních 10 porcí. Nejprve zjistěte, kolik váží jedna porce.', 'Toto množstvo vystačí na pôvodných 10 porcií. Najprv zistite, koľko váži jedna porcia.'),
        t('800 ÷ 10 = 80 g na porci. Pro 25 hostů odvážíte 25 × 80 = 2 000 g. Přílohu tak dostane i poslední host.', '800 ÷ 10 = 80 g na porciu. Pre 25 hostí odvážite 25 × 80 = 2 000 g. Prílohu tak dostane aj posledný hosť.'),
        t('Tím by na hosta vyšlo 100 g. Porovnejte to s původními 800 g na 10 hostů.', 'Takto by na hosťa vyšlo 100 g. Porovnajte to s pôvodnými 800 g na 10 hostí.')
      ]
    } : {
      title:t('Připravit limonádu pro 25 hostů', 'Pripraviť limonádu pre 25 hostí'),
      question:t('Ze dvou litrů limonády nalijete 10 stejných sklenic. Na uvítání přijde 25 hostů. Kolik litrů nachystáte?', 'Z dvoch litrov limonády nalejete 10 rovnakých pohárov. Na privítanie príde 25 hostí. Koľko litrov nachystáte?'),
      answers:['2 l', '2,5 l', '5 l'], correct:2,
      feedback:[
        t('Dva litry už máte odměřené pro deset hostů. Použijte stejný objem na sklenici i pro dalších patnáct.', 'Dva litre už máte odmerané pre desať hostí. Použite rovnaký objem na pohár aj pre ďalších pätnásť.'),
        t('Pro 25 hostů potřebujete dvě a půl dávky. Každá dávka má dva litry.', 'Pre 25 hostí potrebujete dve a pol dávky. Každá dávka má dva litre.'),
        t('2 l ÷ 10 = 0,2 l na sklenici. Pro 25 sklenic připravíte 25 × 0,2 = 5 l a můžete obsloužit celý stůl najednou.', '2 l ÷ 10 = 0,2 l na pohár. Pre 25 pohárov pripravíte 25 × 0,2 = 5 l a môžete obslúžiť celý stôl naraz.')
      ]
    };
  }
  if (code === 'K10.2') {
    return cook ? {
      title:t('Rozlišit suroviny a cenu oběda', 'Rozlíšiť suroviny a cenu obeda'),
      question:t('V modelové kalkulaci stojí suroviny na 12 porcí rizota celkem 360 Kč. Host platí za jednu porci 95 Kč. Kterou částku zapíšete jako náklad na suroviny jedné porce?', 'V modelovej kalkulácii stoja suroviny na 12 porcií rizota spolu 18 €. Hosť platí za jednu porciu 5,50 €. Ktorú sumu zapíšete ako náklad na suroviny jednej porcie?'),
      answers:[t('30 Kč', '1,50 €'), t('65 Kč', '4,00 €'), t('95 Kč', '5,50 €')], correct:0,
      feedback:[
        t('360 Kč ÷ 12 = 30 Kč za suroviny na porci. Z ceny 95 Kč tak na další náklady provozu a případný zisk zbývá 65 Kč.', '18 € ÷ 12 = 1,50 € za suroviny na porciu. Z ceny 5,50 € tak na ďalšie náklady prevádzky a prípadný zisk zostávajú 4 €.'),
        t('65 Kč je rozdíl mezi cenou oběda a surovinami. Náklad na jednu porci získáte rozdělením 360 Kč mezi 12 porcí.', '4 € sú rozdiel medzi cenou obeda a surovinami. Náklad na jednu porciu získate rozdelením 18 € medzi 12 porcií.'),
        t('95 Kč zaplatí host. V řádku pro suroviny pracujete s jejich celkovou cenou a počtem porcí.', '5,50 € zaplatí hosť. V riadku pre suroviny pracujete s ich celkovou cenou a počtom porcií.')
      ]
    } : {
      title:t('Spočítat suroviny na jednu sklenici', 'Spočítať suroviny na jeden pohár'),
      question:t('Suroviny na 12 sklenic domácí limonády v modelové nabídce stojí 240 Kč. Host platí za sklenici 65 Kč. Kolik stojí suroviny na jednu sklenici?', 'Suroviny na 12 pohárov domácej limonády v modelovej ponuke stoja 12 €. Hosť platí za pohár 3,50 €. Koľko stoja suroviny na jeden pohár?'),
      answers:[t('65 Kč', '3,50 €'),t('20 Kč', '1,00 €'),t('45 Kč', '2,50 €')], correct:1,
      feedback:[
        t('To je částka z nápojového lístku. Pro kontrolu receptury potřebujete cenu celé dávky a počet sklenic.', 'To je suma z nápojového lístka. Na kontrolu receptúry potrebujete cenu celej dávky a počet pohárov.'),
        t('240 Kč ÷ 12 = 20 Kč za suroviny na sklenici. Když změníte recepturu, právě tuto částku v kalkulaci přepočítáte.', '12 € ÷ 12 = 1 € za suroviny na pohár. Keď zmeníte receptúru, práve túto sumu v kalkulácii prepočítate.'),
        t('45 Kč z ceny zůstane po odečtení surovin. Náklad na jednu sklenici spočítejte ze 240 Kč za celou dávku.', '2,50 € z ceny zostane po odpočítaní surovín. Náklad na jeden pohár vypočítajte z 12 € za celú dávku.')
      ]
    };
  }
  if (code === 'K11.2') {
    return cook ? {
      title:t('Předat objednávku u výdeje', 'Odovzdať objednávku pri výdaji'),
      question:t('Stůl 4 čeká na dvě stejná jídla. Obě hlavní porce jsou hotové, druhá příloha bude v 18.15. Co řeknete kolegovi, který přebírá výdej?', 'Stôl 4 čaká na dve rovnaké jedlá. Obe hlavné porcie sú hotové, druhá príloha bude o 18.15. Čo poviete kolegovi, ktorý preberá výdaj?'),
      answers:[
        t('Stůl 4 má dvě jídla. Můžete je hned vydat.', 'Stôl 4 má dve jedlá. Môžete ich hneď vydať.'),
        t('Ještě chybí příloha. Pokračujte, až bude hotová.', 'Ešte chýba príloha. Pokračujte, keď bude hotová.'),
        t('Stůl 4, dvě hlavní porce hotové. V 18.15 doplňte druhou přílohu a vydejte oba talíře.', 'Stôl 4, dve hlavné porcie hotové. O 18.15 doplňte druhú prílohu a vydajte oba taniere.')
      ], correct:2,
      feedback:[
        t('Druhý talíř ještě čeká na přílohu. Kolega potřebuje znát i tento krok.', 'Druhý tanier ešte čaká na prílohu. Kolega potrebuje poznať aj tento krok.'),
        t('Kolega by musel dohledat stůl a čas. Zkuste zprávu, podle které může rovnou pokračovat.', 'Kolega by musel dohľadať stôl a čas. Skúste správu, podľa ktorej môže rovno pokračovať.'),
        t('Kolega zná číslo stolu, stav obou porcí i čas dalšího kroku. Oba hosté tak mohou dostat kompletní jídlo společně.', 'Kolega pozná číslo stola, stav oboch porcií aj čas ďalšieho kroku. Obaja hostia tak môžu dostať kompletné jedlo spoločne.')
      ]
    } : {
      title:t('Předat stůl další obsluze', 'Odovzdať stôl ďalšej obsluhe'),
      question:t('Dvě espressa pro stůl 4 jste už zadali u baru. Hosté je zatím nedostali. Kterou zprávou předáte stůl kolegyni?', 'Dve espressá pre stôl 4 ste už zadali pri bare. Hostia ich zatiaľ nedostali. Ktorou správou odovzdáte stôl kolegyni?'),
      answers:[
        t('Stůl 4 má dvě espressa zadaná u baru. Zbývá je donést hostům.', 'Stôl 4 má dve espressá zadané pri bare. Zostáva ich doniesť hosťom.'),
        t('Stůl 4 chce dvě espressa. Zadejte je prosím u baru.', 'Stôl 4 chce dve espressá. Zadajte ich prosím pri bare.'),
        t('Stůl 4 už má kávy vyřízené. Pokračujte u dalšího stolu.', 'Stôl 4 už má kávy vybavené. Pokračujte pri ďalšom stole.')
      ], correct:0,
      feedback:[
        t('Kolegyně ví, co už je objednané i kam nápoje donést. Bar tak připraví dvě espressa a obě se dostanou k hostům.', 'Kolegyňa vie, čo už je objednané aj kam nápoje doniesť. Bar tak pripraví dve espressá a obe sa dostanú k hosťom.'),
        t('Objednávka už je u baru. Při dalším zadání by bar mohl připravit čtyři kávy.', 'Objednávka už je pri bare. Pri ďalšom zadaní by bar mohol pripraviť štyri kávy.'),
        t('Hosté stále čekají na nápoje. Při předání pojmenujte i práci, která zbývá.', 'Hostia stále čakajú na nápoje. Pri odovzdaní pomenujte aj prácu, ktorá zostáva.')
      ]
    };
  }
  return null;
}

function stationChallenge(code, learner) {
  const item = stationCase(code, learner.track === 'cook');
  if (!item || menuStudyDraft?.code !== code || menuStudyDraft.student !== learner.id) return '';
  const selected = menuStudyDraft.stationChoice;
  const answered = Number.isInteger(selected);
  const controls = item.answers.map((answer, index) =>
    action('station-try', answer, code + '|' + index, 'choice', 'aria-pressed="' + (selected === index) + '"')
  ).join('');
  const result = answered ? '<div class="station-feedback" tabindex="-1" data-result="' +
    (selected === item.correct ? 'correct' : 'retry') + '"><strong>' +
    t(selected === item.correct ? 'Co to znamená v provozu' : 'Zkuste to ještě jednou',
      selected === item.correct ? 'Čo to znamená v prevádzke' : 'Skúste to ešte raz') +
    '</strong><p>' + html(item.feedback[selected]) + '</p></div>' : '';
  return '<details class="station-challenge" open><summary>' +
    html(item.title) + '</summary><p class="station-scenario">' + html(item.question) +
    '</p><div class="station-options">' + controls + '</div>' + result + '</details>';
}

function handleStationTry(value) {
  guard(role === 'student' && view === 'menu-study');
  const match = /^(K10\.[12]|K11\.2)\|([012])$/.exec(value);
  guard(match);
  const [, code, choice] = match;
  const learner = person();
  const draft = menuStudyDraft;
  guard(draft?.student === learner.id && draft.code === code);
  guard(skillSet(learner).some(c => c.code === code) && stationCase(code, learner.track === 'cook'));
  draft.stationChoice = Number(choice);
  render();
  document.querySelector('.station-feedback')?.focus();
}
