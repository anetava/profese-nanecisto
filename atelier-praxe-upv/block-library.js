'use strict';
window.BLOCKS = (() => {
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const phaseTitles = new Map([...window.METHODS, window.FINAL_METHOD, window.REFLECTION_METHOD].map(m => [m.id, m.title]));
  const block = (id, title, sheet, detail, prompts, activities = []) => ({
    id, title, sheet, detail, prompts,
    file: 'materialy/' + id + '.docx',
    route: phaseTitles.has(id) ? 'praxe/' + id : id,
    activities: activities.map(([title, prompts], index) => ({id: String(index), title, prompts}))
  });
  const list = [
    block('ivp', phaseTitles.get('ivp'), 'Mapa školy a první pozorování',
      'Při exkurzi zachyťte, jak se žáci přesouvají od teorie k praktické práci. Jednu situaci si vezměte do diskuse na IVP.', [
        'Kde jste při návštěvě školy viděli propojení odborné teorie s činností žáků?',
        'Co jste přímo viděli nebo slyšeli a co si z toho zatím jen vyvozujete?',
        'Co byste si potřebovali ověřit při další návštěvě nebo v diskusi na IVP?'
      ]),
    block('group', phaseTitles.get('group'), 'Pozorovací arch ke skupinovému náslechu',
      'U jedné situace zaznamenejte vedle sebe jednání učitele a reakci žáků. Po hodině si označte detail, který váš závěr podporuje.', [
        'Kterou otázku, instrukci nebo ukázku učitel použil a co žáci udělali bezprostředně poté?',
        'Který detail v chování žáků podporuje vaše vysvětlení situace? Co si ještě potřebujete ověřit?',
        'Na jakou reakci žáků se při příštím náslechu zaměříte?'
      ]),
    block('guided', phaseTitles.get('guided'), 'Pozorovací arch k řízenému náslechu',
      'Zvolte jednu otázku k výuce vašeho oboru. Zapište rozhodnutí učitele, odezvu žáka a otázku pro společný rozbor.', [
        'V kterém okamžiku učitel upravil ukázku nebo zadání podle reakce žáka?',
        'Jaký žákův další pokus pomohl posoudit účinek změny? Co vám při rozboru objasnil učitel?',
        'Co konkrétně budete příště sledovat, abyste svůj závěr ověřili?'
      ]),
    block('micro', phaseTitles.get('micro'), 'Příprava a rozbor mikrovýstupu',
      'Připravte krátkou instruktáž. Po mikrovýstupu se vraťte k prvnímu samostatnému pokusu a k jedné věci, kterou chcete změnit.', [
        'Jak zněl váš první pokyn a co podle něj účastníci skutečně udělali?',
        'Která reakce po vašem pokynu vám ukázala, co ve vaší ukázce pomohlo a co potřebuje úpravu?',
        'Jak změníte jednu větu nebo jeden krok ukázky? Podle čeho poznáte rozdíl?'
      ]),
    block('continuous', phaseTitles.get('continuous'), 'Výukový výstup a rozbor hodiny',
      'Spojte cíl hodiny, jednu ukázku práce žáka a doporučení cvičného učitele. Zapište úpravu další výuky.', [
        'Který okamžik vaší výuky nejlépe ukazuje, jak žáci pracovali na cíli hodiny?',
        'Co v jejich odpovědi, postupu nebo výrobku dokládá učení? Jak se váš pohled shoduje s komentářem cvičného učitele?',
        'Co upravíte v další hodině a na jaké konkrétní práci žáků změnu vyhodnotíte?'
      ]),
    block('reflection', phaseTitles.get('reflection'), 'Srovnání dvou dokladů z portfolia',
      'Položte vedle sebe dva záznamy z různých období. Pojmenujte změnu ve svém uvažování o výuce a zvolte další profesní cíl.', [
        'Které dva srovnatelné okamžiky ze staršího a novějšího záznamu jste vybrali?',
        'V čem se změnilo vaše učitelské rozhodování a které pasáže obou záznamů to dokládají?',
        'Jakou dovednost chcete rozvíjet dál a při čem získáte další doklad o svém pokroku?'
      ]),
    block('nacvik', 'Praxe nanečisto', 'Rozhodnutí ve třech situacích z výuky',
      'Projděte zahájení instruktáže, podporu dvojic při práci a rozhovor po hodině. Vyberte si situaci, kterou chcete promyslet.', [
        'Ve které situaci jste se rozhodovali a jak by zněla vaše první věta ve třídě?',
        'Co vám zpětná vazba v modelové situaci ukázala o možné reakci žáků?',
        'Jak svou volbu ověříte ve skutečné výuce a čeho si budete všímat?'
      ], [
        ['Jak začít instruktáž?', [
          'Jakou první větou jste uvedli měření dvou vzorků?',
          'Co z této věty žák ví o svém úkolu a o tom, jak pozná správný výsledek?',
          'Jak při skutečné instruktáži ověříte, že zadání pochopil i žák bez předchozí zkušenosti?'
        ]],
        ['Dvě dvojice se zasekly', [
          'Jak jste reagovali na větu „Nevíme, co odečíst“?',
          'Co by vám pomohlo rozlišit potíž s odečtem od potíže s přiložením měřidla?',
          'Jak dvojici vrátíte samostatnost a na kterém dalším pokusu ji ověříte?'
        ]],
        ['Co říct při rozboru?', [
          'Který okamžik po slově „výborně“ jste zvolili jako začátek rozhovoru?',
          'Co o účinku slov učitele dokládá žákova práce a co vám zatím chybí?',
          'Na co přesně se učitele zeptáte, abyste porozuměli jeho hodnocení?'
        ]]
      ]),
    block('adaptio', 'Adaptio', 'Příprava rozhovoru s mentorem',
      'Pro první návštěvu, výstup nebo náročný okamžik si připravte otázku. Po setkání doplňte, na čem jste se domluvili.', [
        'Se kterou konkrétní situací přicházíte za mentorem?',
        'Co už o situaci víte a v čem by vám pomohl pohled druhého člověka?',
        'Jakou otázku položíte nebo jaký krok po domluvě vyzkoušíte?'
      ], [
        ['Přicházím do nové školy', [
          'Která věc před první návštěvou potřebuje domluvu s provázejícím učitelem?',
          'Jak by její vyjasnění ovlivnilo, čemu budete při návštěvě věnovat pozornost?',
          'Na co se zeptáte a kdy si ověříte, že máte potřebné informace?'
        ]],
        ['Připravuji první vlastní hodinu', [
          'Kterou část své plánované instruktáže chcete předem ukázat mentorovi?',
          'Proč právě zde očekáváte nejistotu u sebe nebo u žáků?',
          'Co má mentor během výstupu sledovat, aby vám po něm mohl dát konkrétní zpětnou vazbu?'
        ]],
        ['Hodina mě zaskočila', [
          'Co jste v jednom zlomovém okamžiku udělali a jak reagovali žáci?',
          'Co vám zpětně pomáhá situaci pochopit a kde potřebujete mentorovu pomoc?',
          'Co při další podobné situaci vyzkoušíte a jakou podporu si domluvíte?'
        ]]
      ]),
    block('ss', 'Praxe SŠ', 'Předání úkolu mezi školou a pracovištěm',
      'Projděte jeden pracovní úkol z pohledu školy, instruktora a žáka. Vyberte doklad o samostatné práci pro předání škole.', [
        'Co měl žák při druhém měření předvést bez pomoci a kdo to mohl pozorovat?',
        'Co ze zvoleného dokladu pozná škola o žákově postupu? Kterou informaci ještě potřebuje?',
        'Jak se při příštím pracovním úkolu domluvíte s instruktorem na zachycení pokroku?'
      ], [
        ['Pohled školy', [
          'Jaký výsledek byste před návštěvou pracoviště domluvili s instruktorem?',
          'Co škola potřebuje vědět o postupu žáka kromě výsledného rozměru součásti?',
          'Jaký krátký záznam si od instruktora vyžádáte pro další výuku?'
        ]],
        ['Pohled instruktora', [
          'Co byste u prvního vzorku ukázali a co už by u druhého vzorku dělal žák?',
          'Jak byste ze žákova jednání poznali, že zvolil měřidlo sám a rozumí své volbě?',
          'Který postřeh byste předali žákovi a který cvičné škole?'
        ]],
        ['Pohled žáka', [
          'Jak by žák mohl vysvětlit svou volbu měřidla pro druhý vzorek?',
          'Z čeho by sám poznal, že jeho měření odpovídá zadání?',
          'Jakou otázkou mu dáte prostor navrhnout další krok vlastními slovy?'
        ]]
      ]),
    block('kurzy', 'Kurzy ČZU', 'Plán využití poznatku při vedení žáka',
      'Vyberte si dovednost pro další vzdělávání. Naplánujte, při kterém úkolu na pracovišti ji využijete a jak poznáte její přínos.', [
        'Ve které situaci na pracovišti chcete použít zvolenou dovednost?',
        'Podle kterého projevu žáka poznáte, že vybraný postup pomohl?',
        'Co konkrétně vyzkoušíte a s kým svůj první pokus rozeberete?'
      ], [
        ['Předat úkol tak, aby mu žák rozuměl', [
          'Jak nyní žákovi předáváte vybraný úkol?',
          'Podle čeho během jeho prvního pokusu poznáte, jak pokynu rozuměl?',
          'Jak přeformulujete zadání a kdy si necháte výsledek popsat žákovými slovy?'
        ]],
        ['Poznat, kdy může žák pokračovat samostatně', [
          'Při kterém kroku obvykle přebíráte vedení za žáka?',
          'Jaký pozorovatelný výkon by vám ukázal, že už může pokračovat samostatně?',
          'Při jakém dalším pokusu mu předáte rozhodnutí a jak výsledek zachytíte?'
        ]],
        ['Dát užitečnou zpětnou vazbu', [
          'Který konkrétní krok žáka budete po úkolu společně rozebírat?',
          'Co by mohl žák díky vašemu komentáři při dalším pokusu sám změnit?',
          'Jak zpětnou vazbu zformulujete a kdy se společně vrátíte k jejímu účinku?'
        ]]
      ])
  ];
  const byId = new Map(list.map(item => [item.id, item]));
  const get = id => byId.get(id);
  const activity = (id, choice) => get(id)?.activities.find(item => item.id === String(choice));
  const prompts = (id, choice) => activity(id, choice)?.prompts || get(id)?.prompts || [];
  function sheetLink(item) {
    return '<a class="primary" href="' + item.file + '?v=dokumenty-bordo-20261123" download aria-label="Stáhnout pracovní list, ' + escape(item.sheet) + ', DOCX">Upravit ve Wordu · DOCX ↓</a><a class="secondary" href="materialy/' + item.id + '.pdf?v=dokumenty-bordo-20261123" download aria-label="Stáhnout pracovní list, ' + escape(item.sheet) + ', PDF">Vytisknout · PDF ↓</a>';
  }
  function sourceLinks(item) {
    const files = window.IVP_DOCUMENTS?.[item.id] || [];
    if (!files.length) return '';
    return '<details class="area-box document-sources"><summary>Metodika a přílohy <span class="document-count">' + files.length + '</span></summary><p>Jde o studijní průvodce a pracovní pomůcky Ateliéru, nikoli originály metodik IVP. Závazné zadání a termíny ověřte u předmětu v Moodlu; původ podkladů najdete v sekci Metodiky a zdroje.</p><ul>' +
      files.map(file => '<li><a href="' + escape(file.url) + '" target="_blank" rel="noopener">' +
        escape(file.label) + ' ↗</a>' + '<p><a href="'+escape(file.docxUrl)+'" download>Upravit ve Wordu · DOCX ↓</a> · <a href="'+escape(file.pdfUrl)+'" target="_blank" rel="noopener">Vytisknout · PDF ↗</a></p>' + (file.purpose ? '<p>' + escape(file.purpose) + '</p>' : '') + (file.use ? '<p class="document-use">' + escape(file.use) + '</p>' : '') + (file.kind ? '<small>' + escape(file.kind) + '</small>' : '') + '</li>').join('') + '</ul></details>';
  }
  const reflectionLink = (item, choice, label) => '<a href="#reflexe/nova/' + item.id +
    (choice ? '/' + choice.id : '') + '">' + escape(label) + '</a>';
  const outputs = {
    ivp:'Vyplněná mapa školy, záznam pozorované situace a vlastní reflexe.',
    group:'Záznam náslechu, konkrétní reakce žáků a rozbor s vlastním dalším krokem.',
    guided:'Pozorovací arch, podklad z hodiny, rozbor s cvičným učitelem a reflexe.',
    micro:'Příprava mikrovýstupu, záznam jeho průběhu a úprava pro další pokus.',
    continuous:'Přípravy vyučovacích jednotek, záznamy výstupů, rozbory a závěrečný souhrn.',
    reflection:'Dva porovnané doklady z portfolia, závěrečná sebereflexe a plán dalšího rozvoje.'
  };
  const blockRoute=(item,role)=>role==='student'||!phaseTitles.has(item.id)?item.route:'zadani/'+item.id;
  function submission(item, role = 'student', compact = false) {
    const text=outputs[item.id] || 'Vyplněný pracovní list, vlastní reflexe a konkrétní další krok.';
    const student = role === 'student';
    const actions = compact ? '' : '<div class="actions"><a class="primary" href="#'+blockRoute(item,role)+'">'+(student?'Otevřít blok a vyplnit':'Prohlédnout zadání bloku')+' →</a>'+(student?'<a class="secondary" href="#reflexe/nova/'+item.id+'">Vybrat odpovědi v reflexi →</a>':'')+'</div>';
    return '<div class="student-output'+(compact?' document-evidence':'')+'"><strong>'+(student?'Co si uložím do portfolia':'Co má student doložit')+'</strong><p>'+escape(text)+'</p>'+actions+(compact?'':'<p><small>Formulář slouží k vlastnímu záznamu, metodika vysvětluje postup. Rozsah odevzdání určuje zadání IVP.</small></p>')+'</div>';
  }
  function docs(id, role = 'student') {
    const item = get(id);
    if (!item) return '';
    return '<section class="panel stack block-document-kit" aria-label="Dokumenty k bloku"><div><small class="eyebrow">Dokumenty k bloku · Akademický rok 2026/2027</small>' +
      '<h2>' + escape(item.sheet) + '</h2><p>' + escape(item.detail) + '</p></div><div class="actions">' + sheetLink(item) +
      '<a class="secondary" href="#materialy">Všechny dokumenty</a></div><small class="muted">Zaškrtněte odpovídající volby, doplňte konkrétní situaci a vlastní reflexi. Word je k úpravám, PDF k tisku. Co se na vás nevztahuje, označte; nic si nedomýšlejte.</small>' +
      (['continuous','reflection'].includes(id)?'<a href="#materialy/vystupy">Závěrečný protokol a portfolia →</a>':'') + submission(item, role) + sourceLinks(item) + '</section>';
  }
  function indexItem(item, role) {
    const student = role === 'student';
    const canOpen = student || role === 'mentor' || role === 'ivp';
    const practiceLink = !canOpen ? '' : '<a class="primary" href="#' + blockRoute(item,role) + '">' + (student ? 'Otevřít blok a vyplnit' : 'Prohlédnout zadání bloku') + ' →</a>';
    const reflect = !student ? '' : item.activities.length ?
      '<details class="area-box"><summary>Začít reflexi k vybrané situaci</summary><ul>' +
        item.activities.map(choice => '<li>' + reflectionLink(item, choice, choice.title) + '</li>').join('') + '</ul></details>' :
      '<a class="secondary" href="#reflexe/nova/' + item.id + '">Vybrat odpovědi v reflexi →</a>';
    const photo={ivp:1,group:2,guided:3,micro:4,continuous:5,reflection:6,nacvik:4,adaptio:6,ss:5,kurzy:1}[item.id]||1;
    return '<article class="panel stack document-kit" id="dokumenty-'+item.id+'" tabindex="-1"><div class="sheet-cover"><img loading="lazy" src="phase-'+photo+'.webp?v=barevne" alt=""><div><small>Pracovní sada · 2026/2027</small><h3>' + escape(item.title) + '</h3><p>' + escape(item.sheet) + '</p></div></div>' +
      '<div class="document-downloads"><h4>'+(student?'Můj formulář k vyplnění':'Formulář pro studenta')+'</h4><p>'+escape(item.detail)+'</p><div class="document-format-note"><strong>Vyberte způsob práce</strong><span>DOCX: vyplňování ve Wordu · PDF: tisk a ruční poznámky.</span></div><div class="actions">' + sheetLink(item) + '</div></div>' + submission(item, role, true) +
      (practiceLink || reflect ? '<div class="document-work actions">' + practiceLink + reflect + '</div>' : '') + sourceLinks(item) + '</article>';
  }
  function catalog(role = 'student') {
    const section = (title, subset) => '<section class="stack document-section"><div class="document-section-heading"><div><small class="eyebrow">'+(title==='Studijní praxe IVP'?'FORMULÁŘE · METODIKA · REFLEXE':'DALŠÍ PRACOVNÍ SADY')+'</small><h2'+(title==='Studijní praxe IVP'?' id="pracovni-listy" tabindex="-1"':'')+'>' + title + '</h2></div><p>'+(title==='Studijní praxe IVP'?'Vyberte svůj blok. Dokumenty k vyplnění i postup najdete spolu v jedné kartě.':'Pomůcky pro nácvik výuky, rozhovor s mentorem a další profesní rozvoj.')+'</p></div><div class="grid study-downloads">' +
      subset.map(item => indexItem(item, role)).join('') + '</div></section>';
    return ATDOC.library(role, 'header')+'<div class="stack">' +
      section('Studijní praxe IVP', list.filter(item => phaseTitles.has(item.id))) +
      section('Nácvik a profesní rozvoj', list.filter(item => !phaseTitles.has(item.id))) + '</div>' + ATDOC.library(role, 'outputs');
  }
  return {list, get, activity, prompts, docs, catalog};
})();
