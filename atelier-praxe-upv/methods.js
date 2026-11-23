'use strict';
(() => {
  const field = (label, hint) => ({label, hint});
  const observation = [
    field('Škola, obor a třída', 'Uveďte pracoviště, obor vzdělání, označení třídy nebo skupiny a počet přítomných žáků.'),
    field('Předmět, téma a organizace', 'Jaká jednotka proběhla? Kterou část společně vedl učitel a kdy žáci pracovali samostatně nebo ve skupinách?'),
    field('Cíl a jeho naplnění', 'Co měli žáci na konci vysvětlit, vykonat nebo posoudit? Jak učitel cíl sdělil a na čem bylo vidět jeho naplnění?'),
    field('Metody, pomůcky a technika', 'Vyberte konkrétní úsek. Jak použitý postup a pomůcka podpořily učení? Co byste změnili?'),
    field('Zapojení žáků a atmosféra', 'Zachyťte jednu interakci. Jak učitel žáky oslovil? Co žáci následně dělali nebo řekli?'),
    field('Ověření učení a zpětná vazba', 'Jak učitel zjistil, kdo potřebuje další pomoc? Co žák udělal po zpětné vazbě?'),
    field('Rozbor a vlastní závěr', 'Zaznamenejte postřeh z rozhovoru s pedagogem, vlastní výklad situace a jednu věc, kterou využijete ve své výuce.')
  ];
  const supplements = ['Formulář Záznam výukové jednotky z náslechové praxe', 'Manuál k vyplnění formuláře – rozbor vyučovací jednotky', 'Vzor – Záznam z náslechové vyučovací jednotky'];
  window.METHODS = [
    {
      id:'ivp', title:'Průběžná pedagogická praxe na IVP', short:'Pozorování výuky a mapa školy', place:'Výuka na IVP a pedagogická exkurze',
      goal:'Zachytíte, co učitel udělal, jak reagovali žáci a co to vypovídá o jejich učení.',
      steps:['Při sledování výukového záznamu zachyťte konkrétní situaci. Oddělte činnost učitele a žáků od vlastní interpretace.', 'Při exkurzi zmapujte obory školy, její ŠVP, organizaci výuky, kontakty na vedení a zvláštnosti pracoviště.', 'Připravte záznam k řízené diskusi s garantem nebo pověřeným vyučujícím IVP. Zdůvodněte, jak použitá metoda souvisela s cílem hodiny.'],
      evidence:['Záznam o zadané cvičné škole', 'Podklady z pozorování k řízené diskusi na IVP'],
      source:['Metodika UPV 01 – Průběžná pedagogická praxe v rámci výuky na IVP'],
      fields:[field('Škola a její vedení', 'Kterou školu jste navštívili? Připojte veřejný pracovní kontakt na vedení a web školy.'),field('Obory a ŠVP', 'Jmenujte obor a uveďte, kde lze dohledat příslušný školní vzdělávací program.'),field('Jak škola organizuje výuku', 'Kde probíhá praktické vyučování a jak navazuje na teoretickou přípravu?'),field('Co vás při návštěvě zaujalo', 'Popište jeden postup, který jste ve škole viděli, a vysvětlete jeho přínos.'),field('Otázka pro řízenou diskusi', 'Kterou situaci z pozorování chcete rozebrat s vyučujícím IVP?')],
      credit:'IVP posuzuje účast, předložený záznam a orientaci v didaktice při řízené diskusi.'
    },
    {
      id:'group', title:'Skupinový náslech', short:'10 teoretických a 2 praktické náslechy', place:'Dva týdny na cvičné škole ve skupině nejvýše pěti studentů',
      goal:'Na různých hodinách porovnáte práci učitele a činnosti žáků. U každé jednotky získáte vlastní doklad o pozorování.',
      steps:['Garant IVP určí skupinu a školu. Seznamte se s obory, ŠVP a rozvrhem. Připravte si 12 vytištěných formulářů.', 'Absolvujte deset ukázkových jednotek teoretických předmětů a dva náslechy na odborném výcviku nebo odborné praxi. Dodaná metodika připouští i jednotky mimo vaše zaměření, aktuální sylabus je váže na vaše zaměření. Výběr jednotek proto předem potvrďte s garantem.', 'Zapište konkrétní činnosti učitele a žáků s časem. Po náslechu rozeberte jednotku s vyučujícím cvičné školy.', 'Převeďte poznámky do elektronických formulářů, nahrajte je do Moodle a připravte se na řízenou diskusi na IVP.'],
      evidence:['10 elektronicky vyplněných záznamů z teoretické výuky', '2 elektronicky vyplněné záznamy z odborného výcviku nebo odborné praxe'],
      source:['Metodika UPV 02 – Průběžná pedagogická praxe – skupinový náslech',...supplements],
      observationTargets:{theory:10,practice:2},timeline:true,fields:observation,
      credit:'Pedagog IVP hodnotí splnění rozsahu, kvalitu záznamů a rozbor navštívené výuky.'
    },
    {
      id:'guided', title:'Řízená náslechová pedagogická praxe', short:'Individuální náslechy ve vašem oboru', place:'Dva týdny na cvičné nebo garantem předem schválené odborné škole',
      goal:'V odborné výuce vysvětlíte vztah mezi cílem, zvolenou metodou a tím, co konkrétně zvládli žáci.',
      steps:['Podle zaměření si vyberte školu, kontaktujte ji a výběr konzultujte s garantem IVP. S vedením nebo koordinátorem dohodněte náslechy přednostně ve svém oboru.', 'Projděte obory, ŠVP a rozvrh. Absolvujte domluvené teoretické a praktické náslechy podle rozsahu potvrzeného garantem.', 'Za každou jednotku zachyťte časový průběh, činnost učitele a žáků, metody, pomůcky a zpětnou vazbu.', 'Předložte záznamy garantovi IVP. Pro řízenou diskusi vyberte situaci, ve které reakce žáků vedla učitele ke změně postupu.'],
      evidence:['Samostatný záznam z každé domluvené teoretické i praktické jednotky', 'Rozbor navštívené výuky při diskusi na IVP'],
      source:['Metodika UPV 03 – Řízená náslechová pedagogická praxe',...supplements],observationTargets:{theory:10,practice:2},timeline:true,fields:observation,
      credit:'Zápočet uděluje garant IVP po splnění předepsaného rozsahu a posouzení záznamů a didaktického rozboru.'
    },
    {
      id:'micro',title:'Microteaching',short:'Vlastní pedagogický mikrovýstup',place:'Nácvik modelové situace ve výuce na IVP',
      goal:'Vyzkoušíte si, jak předvést odborný postup a zjistit, zda ostatní podle vaší instruktáže dokážou samostatně pracovat.',
      steps:['Ze zadané situace připravte praktickou vyučovací jednotku. Určete cíl, pořadí činností, způsob aktivizace a ověření výsledku.', 'Zajistěte oborové pomůcky a předveďte vybranou situaci ve skupině. Při instruktáži sledujte srozumitelnost pokynů, hlas, gesta a reakce účastníků.', 'Podle aktuálního sylabu je mikrovýstup spojen s videomonitoringem; způsob pořízení a využití záznamu domluvte s vyučujícím. Po mikrovýstupu nejprve zhodnoťte vlastní rozhodnutí. Ve skupině porovnejte své pozorování se zpětnou vazbou ostatních.', 'Vzorovou přípravu v rozsahu nejméně dvou stran nahrajte do Moodle.'],
      evidence:['Vzorová příprava na praktickou vyučovací jednotku v rozsahu nejméně dvou stran do Moodle', 'Předvedený mikrovýstup, sebereflexe a skupinový rozbor'],
      source:['Metodika UPV 04 – Průběžná pedagogická praxe – Microteaching', 'Podklad pro cvičné učitele – rozbor teoretické a praktické vyučovací jednotky', 'Manuál k vyplnění formuláře – rozbor vyučovací jednotky'],
      fields:[field('Téma a cíl výstupu', 'Co má žák po vaší instruktáži samostatně předvést? Podle čeho to poznáte?'),field('Příprava a organizace', 'Uveďte pomůcky, fáze hodiny, formu práce, časový plán a způsob ověření výsledku.'),field('Jak povedu instruktáž', 'Popište názornou ukázku, klíčovou otázku a první samostatný pokus žáků.'),field('Moje sebereflexe', 'Kde účastníci jednali podle vašeho očekávání? Kdy potřebovali vysvětlení navíc?'),field('Zpětná vazba a další pokus', 'Zapište konkrétní postřeh skupiny a jednu úpravu, kterou ověříte příště.')],
      credit:'Garant praxe uděluje zápočet podle splnění praxe, předložené přípravy a didaktické orientace při mikrovýstupu.'
    }
  ];
})();
