'use strict';

const tableNumbers = ['12', '7'];
let tableNumber = '12';

function tableCase(number, p) {
  const cook = p.track === 'cook';
  if (number === '12') {
    return {
      title:t('Oběd před vlakem','Obed pred vlakom'),
      guest:t('„Ve 12.35 musíme odejít na nádraží. Co si ještě stihneme dát?“','„O 12.35 musíme odísť na stanicu. Čo si ešte stihneme dať?“'),
      image:'photos/stul-12.webp',
      alt:t('Dva cestující v bistru mluví s číšníkem, jeden ukazuje na hodinky.','Dvaja cestujúci v bistre hovoria s čašníkom, jeden ukazuje na hodinky.'),
      brief:cook ? t('Je 12.10. Zeleninovou polévku můžete vydat ve 12.12. Obě hlavní jídla budou připravená nejdřív ve 12.30. Obsluha se vrací k hostům.',
        'Je 12.10. Zeleninovú polievku môžete vydať o 12.12. Obe hlavné jedlá budú pripravené najskôr o 12.30. Obsluha sa vracia k hosťom.')
        : t('Je 12.10. Oba hosté by si dali hlavní jídlo. Kdyby na něj měli jen pár minut, raději si objednají polévku.',
          'Je 12.10. Obaja hostia by si dali hlavné jedlo. Keby naň mali len pár minút, radšej si objednajú polievku.'),
      parts:cook ? [
        t('Polévka může na stůl ve 12.12.','Polievka môže ísť na stôl o 12.12.'),
        t('Dnes je v polévce pečená mrkev.','Dnes je v polievke pečená mrkva.'),
        t('Oba hlavní chody až ve 12.30.','Obe hlavné jedlá až o 12.30.'),
        t('Misky na polévku už jsou na výdeji.','Misky na polievku sú už pri výdaji.')
      ] : [
        t('Hosté sedí u okna.','Hostia sedia pri okne.'),
        t('Hosté musí odejít ve 12.35.','Hostia musia odísť o 12.35.'),
        t('Vodu už mají na stole.','Vodu už majú na stole.'),
        t('Za jak dlouho vydáte dvě hlavní jídla a kdy by byla polévka?','O koľkej vydáte dve hlavné jedlá a kedy by bola polievka?')
      ],
      needed:cook ? [0,2] : [1,3],
      questions:cook ? [
        t('Které jídlo můžu nabídnout hned a v kolik ho vydáte?','Ktoré jedlo môžem ponúknuť hneď a o koľkej ho vydáte?'),
        t('A kdy by hosté dostali hlavní jídlo? Potřebují si vybrat.','A kedy by hostia dostali hlavné jedlo? Potrebujú si vybrať.')
      ] : [
        t('V kolik musí hosté odejít? Bez toho vám nedoporučím chod.','O koľkej musia hostia odísť? Bez toho vám neodporučím jedlo.'),
        t('Která jídla a pro kolik hostů mám časově porovnat?','Ktoré jedlá a pre koľkých hostí mám časovo porovnať?')
      ],
      reply:cook ? t('Mám oba časy. Hosté teď mohou sami zvážit, jestli jim pět minut na hlavní jídlo stačí.','Mám oba časy. Hostia teraz môžu sami zvážiť, či im päť minút na hlavné jedlo stačí.')
        : t('Pro dva máme polévku ve 12.12, hlavní jídla až ve 12.30. Můžete jim dát na výběr.','Pre dvoch máme polievku o 12.12, hlavné jedlá až o 12.30. Môžete im dať na výber.'),
      outcome:t('„Dáme si tedy dvě polévky. Na vlak můžeme vyrazit v klidu.“','„Dáme si teda dve polievky. Na vlak môžeme vyraziť v pokoji.“'),
      plan:cook ? t('Při příštím dotazu na čekání řeknu obsluze konkrétní čas výdeje a nabídnu rychlejší možnost.','Pri najbližšej otázke o čakaní poviem obsluhe konkrétny čas výdaja a ponúknem rýchlejšiu možnosť.')
        : t('Než hostovi slíbím čas, zjistím, kdy potřebuje odejít, a ověřím možnosti v kuchyni.','Skôr než hosťovi sľúbim čas, zistím, kedy potrebuje odísť, a overím možnosti v kuchyni.'),
      observe:cook ? t('Sdělil žák obsluze čas výdeje a použitelnou alternativu?','Povedal žiak obsluhe čas výdaja a ponúkol použiteľnú alternatívu?')
        : t('Ověřil žák s kuchyní, co stihne vydat do odchodu hosta?','Overil žiak s kuchyňou, čo stihne vydať pred odchodom hosťa?')
    };
  }
  return {
    title:t('Narozeninové překvapení','Narodeninové prekvapenie'),
    guest:t('„Kamarádka má narozeniny. Přinesete dezert, až na vás kývnu?“','„Kamarátka má narodeniny. Prinesiete dezert, až keď vám kývnem?“'),
    image:'photos/stul-7.webp',
    alt:t('Obsluha u výdeje domlouvá s kuchařem chvíli pro přinesení narozeninového dezertu.','Obsluha sa pri výdaji dohaduje s kuchárom, kedy priniesť narodeninový dezert.'),
    brief:cook ? t('Čokoládový dezert se svíčkou už máte připravený. Od stolu na vás není vidět. Obsluha zachytí kývnutí hosta a přijde si pro talíř.',
      'Čokoládový dezert so sviečkou už máte pripravený. Od stola vás nevidno. Obsluha zachytí kývnutie hosťa a príde si po tanier.')
      : t('Host si přeje jeden čokoládový dezert se svíčkou. Podá se až na jeho kývnutí. Z kuchyně není ke stolu vidět, signál předáte vy.',
        'Hosť si želá jeden čokoládový dezert so sviečkou. Podá sa až na jeho kývnutie. Z kuchyne nevidno na stôl, signál odovzdáte vy.'),
    parts:cook ? [
      t('Na talíři je i čokoládová ozdoba.','Na tanieri je aj čokoládová ozdoba.'),
      t('Dezert se svíčkou je připravený.','Dezert so sviečkou je pripravený.'),
      t('Dezert je na bílém talíři.','Dezert je na bielom tanieri.'),
      t('Po kývnutí hosta si pro něj přijďte na výdej.','Po kývnutí hosťa si poň príďte k výdaju.')
    ] : [
      t('Jeden čokoládový dezert se svíčkou.','Jeden čokoládový dezert so sviečkou.'),
      t('Hosté už dojedli hlavní chod.','Hostia už dojedli hlavné jedlo.'),
      t('Vydat až na můj pokyn, host mi kývne.','Vydať až na môj pokyn, hosť mi kývne.'),
      t('Dezertní lžičky už jsou na stole.','Dezertné lyžičky sú už na stole.')
    ],
    needed:cook ? [1,3] : [0,2],
    questions:cook ? [
      t('Mám čekat na přípravu, nebo už je dezert se svíčkou hotový?','Mám čakať na prípravu alebo už je dezert so sviečkou hotový?'),
      t('Kdo hlídá kývnutí hosta a kdy si mám talíř převzít?','Kto sleduje kývnutie hosťa a kedy si mám tanier prevziať?')
    ] : [
      t('Co přesně máme připravit a kolik porcí?','Čo presne máme pripraviť a koľko porcií?'),
      t('Mohu dezert vydat hned? Od výdeje na hosta nevidím.','Môžem dezert vydať hneď? Od výdaja na hosťa nevidím.')
    ],
    reply:cook ? t('Vidím na hosta. Počkám, až kývne, a pak si u vás dezert převezmu.','Vidím na hosťa. Počkám, kým kývne, a potom si od vás dezert prevezmem.')
      : t('Připravím jeden dezert se svíčkou. Talíř vám předám až na váš pokyn.','Pripravím jeden dezert so sviečkou. Tanier vám odovzdám až na váš pokyn.'),
    outcome:t('„Děkuju, přesně v tu chvíli! Vůbec to nečekala.“','„Ďakujem, presne v tej chvíli! Vôbec to nečakala.“'),
    plan:cook ? t('Když má talíř na něco počkat, domluvím s obsluhou, kdo dá pokyn k výdeji.','Keď má tanier na niečo počkať, dohodnem sa s obsluhou, kto dá pokyn na výdaj.')
      : t('U zvláštního přání předám kuchyni dvě věci. Co host chce a kdy to má dostat.','Pri osobitnom želaní odovzdám kuchyni dve veci. Čo hosť chce a kedy to má dostať.'),
    observe:cook ? t('Domluvil se žák s obsluhou, kdo dá pokyn k výdeji?','Dohodol sa žiak s obsluhou, kto dá pokyn na výdaj?')
      : t('Předal žák obsah přání i dohodnutý okamžik podávání?','Odovzdal žiak obsah želania aj dohodnutý okamih podávania?')
  };
}

function tableWord(number) { return t('Stůl ', 'Stôl ') + number; }
function tableDraft(model, number) {
  return model.tablePractice?.[number] || {parts:[], stage:'write', paired:false};
}
function nextTable(model) {
  return tableNumbers.find(n => model.tablePractice?.[n] && !model.tableNotes?.[n])
    || tableNumbers.find(n => !model.tableNotes?.[n]) || '12';
}
function tableInvitation(p, model) {
  const n = nextTable(model), story = tableCase(n,p);
  const done = tableNumbers.every(k => model.tableNotes?.[k]);
  if (done) return '<div class="table-invite-done">' + goBtn('journal',t('Oba stoly jsou v mém deníku','Oba stoly sú v mojom denníku')+' →','text-link') +
    action('table-open',t('Znovu k hostům','Znova k hosťom'),n,'text-link') + '</div>';
  const label = model.tablePractice?.[n] ? t('Pokračovat u stolu ','Pokračovať pri stole ') : t('Převzít stůl ','Prevziať stôl ');
  return '<section class="table-invite"><img src="'+story.image+'" alt="" decoding="async"><div><span class="ticket-kicker">'+
    t('Nácvik před praxí','Nácvik pred praxou')+' · '+tableWord(n)+'</span><h2>'+html(story.guest)+'</h2></div>'+
    action('table-open',label+n+' →',n,'ticket-primary')+'</section>';
}
function openTable(number) {
  guard(role==='student' && tableNumbers.includes(number));
  tableNumber=number;
  go('table');
  window.history.replaceState(null,'',window.location.pathname+window.location.search+'#stul-'+number+'-'+studentId);
}
function tableLocations(p) {
  const kitchen=t('Kuchyně','Kuchyňa'), service=t('Obsluha');
  return p.track==='cook' ? [kitchen,service] : [service,kitchen];
}
function tableMessage(story, parts) {
  return parts.map(i=>'<li>'+html(story.parts[i])+'</li>').join('');
}
function sameTableNote(note, draft) {
  return note && note.day===dayStamp() && note.parts.join(',')===draft.parts.join(',') &&
    (note.answer || '')===(draft.paired ? (draft.answer || '').trim() : '');
}
function tablePaper(p, story, parts, answer='') {
  const [from,to]=tableLocations(p);
  return '<div class="table-paper"><div class="receipt-head"><b>'+html(tableWord(tableNumber))+'</b><span>'+html(from)+' → '+html(to)+'</span></div>'+
    (parts.length ? '<ul>'+tableMessage(story,parts)+'</ul>' : '<p data-table-placeholder '+(answer?'hidden':'')+'>'+t('Sem přibude váš vzkaz.','Sem pribudne váš odkaz.')+'</p>')+
    '<p class="table-own-answer" '+(answer?'':'hidden')+'>'+html(answer)+'</p></div>';
}
function tableCompose(p, story, draft) {
  const question=p.track==='cook'?t('Co vzkážete obsluze?','Čo odkážete obsluhe?'):t('Co vzkážete kuchyni?','Čo odkážete kuchyni?');
  const picks=story.parts.map((part,i)=>{
    const selected=draft.parts.includes(i), full=draft.parts.length===2;
    return action('table-part',part,String(i),'table-part','aria-pressed="'+selected+'" '+(full&&!selected?'disabled':''));
  }).join('');
  const handoff=p.track==='cook'?t('Předat obsluze','Odovzdať obsluhe'):t('Předat kuchyni','Odovzdať kuchyni');
  const answer=draft.paired ? draft.answer || '' : '';
  const writeBack=draft.paired ? '<details class="table-writeback" '+(draft.followUp || answer?'open':'')+'><summary>'+
    (draft.followUp?t('Odpovědět kolegovi vlastními slovy','Odpovedať kolegovi vlastnými slovami'):t('Napsat vlastní vzkaz','Napísať vlastný odkaz'))+'</summary>'+
    (draft.question?'<p>'+t('Dotaz kolegy','Otázka kolegu')+' · „'+html(draft.question)+'“</p>':'')+
    '<label>'+t('Co má kolega vědět?','Čo má kolega vedieť?')+
    '<textarea data-table-answer rows="2" maxlength="160">'+html(answer)+'</textarea></label></details>':'';
  return '<section class="table-desk"><div class="table-write"><span class="ticket-kicker">'+html(p.name)+' · '+html(tableLocations(p)[0])+'</span><h2>'+
    html(question)+'</h2><p>'+html(story.brief)+'</p><fieldset class="table-parts"><legend>'+
    (draft.paired?t('Vyberte nejvýš dvě věty nebo napište vlastní vzkaz.','Vyberte najviac dve vety alebo napíšte vlastný odkaz.'):
      t('Vyberte nejvýš dvě věty. Číslo stolu už kolega má.','Vyberte najviac dve vety. Číslo stola už kolega má.'))+
    '</legend>'+picks+'</fieldset>'+writeBack+'</div><aside class="table-send"><span class="ticket-kicker">'+t('Co si přečte kolega','Čo si prečíta kolega')+'</span>'+
    tablePaper(p,story,draft.parts,answer)+action('table-pair',t('Ve dvojici na jednom telefonu','Vo dvojici na jednom telefóne'),'','table-mode','aria-pressed="'+draft.paired+'"')+
    '<small>'+ (draft.paired?t('Po předání si vyměňte telefon. Druhý člověk uvidí jen váš vzkaz.','Po odovzdaní si vymeňte telefón. Druhý človek uvidí len váš odkaz.'):
    t('Teď hrajete sami. Odpoví vám simulovaný kolega.','Teraz hráte sami. Odpovie vám simulovaný kolega.'))+'</small>'+
    action('table-send',handoff+' →','','ticket-primary',draft.parts.length || answer.trim()?'':'disabled')+'</aside></section>';
}
function tableResponse(p, story, draft) {
  const [,to]=tableLocations(p), missing=story.needed.findIndex(i=>!draft.parts.includes(i));
  const peer=draft.stage==='receive';
  const complete=draft.stage==='end';
  const question=draft.question || (missing<0 ? t('Zopakujte mi prosím, na čem jsme domluvení.','Zopakujte mi, prosím, na čom sme sa dohodli.') : story.questions[missing]);
  const peerTitle=t('Předejte telefon kolegovi','Odovzdajte telefón kolegovi');
  const header=peer?peerTitle:complete?(draft.peerSolution?t('Vaše domluva u stolu','Vaša dohoda pri stole'):t('Co zažil host','Čo zažil hosť')):draft.accepted?t('Co zůstalo nejasné?','Čo zostalo nejasné?'):t('Kolega se doptává','Kolega sa pýta');
  let content='';
  if(peer) {
    content='<p>'+t('Přečtěte si vzkaz. Dokázali byste podle něj převzít svůj díl práce?','Prečítajte si odkaz. Dokázali by ste podľa neho prevziať svoj diel práce?')+'</p>'+
      '<div class="table-actions">'+action('table-peer',t('Vím, co mám udělat','Viem, čo mám urobiť'),'ready','ticket-primary')+
      action('table-peer',t('Potřebuji upřesnění','Potrebujem spresnenie'),'ask','ticket-secondary')+'</div>'+
      '<details class="table-peer-note"><summary>'+t('Zeptat se vlastními slovy','Opýtať sa vlastnými slovami')+'</summary><label>'+
      t('Co vám ve vzkazu chybí?','Čo vám v odkaze chýba?')+'<textarea data-table-question maxlength="160" rows="2"></textarea></label>'+
      action('table-peer',t('Předat můj dotaz','Odovzdať moju otázku'),'question','ticket-secondary')+'</details>';
  } else if(!complete) {
    content=(draft.accepted?'<p>'+t('Kolega by pokračoval. Zkuste si ale vyměnit místa. Jak byste bez další informace odpověděli na tuto otázku?','Kolega by pokračoval. Skúste si však vymeniť miesta. Ako by ste bez ďalšej informácie odpovedali na túto otázku?')+'</p>':'')+'<blockquote>„'+html(question)+'“</blockquote>'+
      (draft.paired?'<p>'+t('Vraťte telefon autorovi vzkazu.','Vráťte telefón autorovi odkazu.')+'</p>':'')+
      action('table-revise',t('Upřesnit vzkaz','Spresniť odkaz')+' →','','ticket-primary');
  } else {
    const note=data().tableNotes?.[tableNumber];
    const example='<blockquote>'+html(story.outcome)+'</blockquote><p><strong>'+html(to)+'</strong> · '+html(story.reply)+'</p>';
    const conclusion=draft.peerSolution?'<p>'+t('Kolega si přečetl váš vlastní vzkaz a potvrdil, že ví, jak pokračovat.','Kolega si prečítal váš vlastný odkaz a potvrdil, že vie, ako pokračovať.')+
      '</p><details class="table-recap"><summary>'+t('Jak by mohl reagovat host?','Ako by mohol reagovať hosť?')+'</summary>'+example+'</details>':example;
    content=conclusion+'<div class="table-next"><span class="ticket-kicker">'+
      t('Na skutečné směně zkusím','Na skutočnej zmene skúsim')+'</span><p>'+html(story.plan)+'</p>'+
      action('table-save',sameTableNote(note,draft)?t('Otevřít můj zápis','Otvoriť môj zápis'):note?t('Uložit nový vzkaz do deníku','Uložiť nový odkaz do denníka'):t('Vzít si to na směnu','Vziať si to na zmenu')+' →','','ticket-primary')+'</div>'+
      action('detail',t('Dovednost z mého lístku','Zručnosť z môjho lístka')+' · '+menuSkillName(competency('K11.2')),'K11.2','table-underlink');
  }
  return '<section class="table-result"><div class="table-received"><span class="ticket-kicker">'+
    (peer?t('Váš jediný podklad','Váš jediný podklad'):t('Předaný vzkaz','Odovzdaný odkaz'))+'</span>'+tablePaper(p,story,draft.parts,draft.paired?draft.answer:'')+'</div>'+
    '<div class="table-reaction"><span class="ticket-kicker">'+(complete?t('Výsledek nácviku','Výsledok nácviku'):html(to))+
    '</span><h1>'+html(header)+'</h1>'+content+'</div></section>';
}

function tablePage() {
  const p=person(), model=data(), story=tableCase(tableNumber,p), draft=tableDraft(model,tableNumber);
  const peer=draft.stage==='receive', writing=draft.stage==='write', both=tableNumbers;
  const top='<div class="table-toolbar">'+goBtn('path','← '+t('Moje cesta','Moja cesta'),'back')+
    (!peer?'<details class="table-switch"><summary>'+t('Změnit stůl','Zmeniť stôl')+'</summary><div>'+
      both.map(n=>action('table-open',tableWord(n)+' · '+tableCase(n,p).title,n,'table-underlink',n===tableNumber?'aria-current="true"':'')).join('')+'</div></details>':'')+'</div>';
  const hero=writing?'<header class="table-hero"><div class="table-intro"><div class="ticket-kicker">'+t('Nácvik · přání hosta','Nácvik · želanie hosťa')+
    '</div><h1>'+html(story.title)+'</h1><blockquote>'+html(story.guest)+'</blockquote></div><figure>'+photo(story.image,story.alt)+
    '<figcaption>'+html(tableWord(tableNumber))+'</figcaption></figure></header>':'';
  return '<div class="table-page">'+top+hero+(writing?tableCompose(p,story,draft):tableResponse(p,story,draft))+
    (draft.stage==='end' ? '<div class="table-further">'+action('table-open',t('Vyzkoušet druhý stůl','Vyskúšať druhý stôl')+' →',both.find(n=>n!==tableNumber),'table-underlink')+
     action('table-again',t('Zopakovat tuto situaci','Zopakovať túto situáciu'),'','table-underlink')+'</div>':'')+'</div>';
}

function tableReflections() {
  return [
    t('Kolega mohl rovnou pokračovat.','Kolega mohol hneď pokračovať.'),
    t('Kolega se doptal. Vzkaz jsme upřesnili.','Kolega sa opýtal. Odkaz sme spresnili.'),
    t('Taková situace zatím nenastala.','Taká situácia zatiaľ nenastala.')
  ];
}

function tableJournal(p, model, teacher=false) {
  const notes=model.tableNotes || {};
  const recorded=tableNumbers.filter(n=>notes[n]);
  if (!recorded.length) return '';
  return '<section class="table-journal"><h2>'+t('Od stolu do praxe','Od stola do praxe')+'</h2>'+recorded.map(n=>{
    const entry=notes[n], story=tableCase(n,p), reflection=tableReflections();
    const heading=tableWord(n)+' · '+story.title;
    const recap='<details class="table-recap"><summary>'+t('Vzkaz z nácviku','Odkaz z nácviku')+'</summary>'+(entry.parts.length?'<ul>'+tableMessage(story,entry.parts)+'</ul>':'')+
      (entry.answer?'<p>„'+html(entry.answer)+'“</p>':'')+'</details>';
    const field=Number.isInteger(entry.field)?'<p class="table-observed"><b>'+t('Žákovská reflexe','Žiacka reflexia')+'</b> · '+html(dateLabel(entry.fieldDay))+'<br>'+html(reflection[entry.field])+'</p>':'';
    const earlier=entry.earlier?.length?'<details class="table-recap"><summary>'+t('Předchozí zápisy u tohoto stolu','Predchádzajúce zápisy pri tomto stole')+'</summary>'+
      entry.earlier.slice().reverse().map(old=>'<p><b>'+html(dateLabel(old.day))+'</b></p>'+(old.parts.length?'<ul>'+tableMessage(story,old.parts)+'</ul>':'')+
        (old.answer?'<p>„'+html(old.answer)+'“</p>':'')+(Number.isInteger(old.field)?'<p>'+html(reflection[old.field])+'</p>':'')).join('')+'</details>':'';
    let controls='';
    if(teacher) {
      controls='<p><strong>'+t('Čeho si všimnout při práci','Čo si všimnúť pri práci')+'</strong><br>'+html(story.observe)+'</p>';
      if(model.shift.phase===6 && maxLevel(model,'K11.2')<3) controls+=action('table-assign',t('Připravit zadání k ověření této dovednosti','Pripraviť zadanie na overenie tejto zručnosti'),n,'table-underlink');
    } else {
      const options=reflection.map((word,i)=>action('table-field',word,n+'|'+i,'table-field','aria-pressed="'+(entry.field===i)+'"')).join('');
      const form='<fieldset class="table-fieldset"><legend>'+t('Jak to dopadlo na pracovišti?','Ako to dopadlo na pracovisku?')+'</legend>'+options+'</fieldset>';
      controls=Number.isInteger(entry.field)?'<details class="table-recap"><summary>'+t('Upravit reflexi','Upraviť reflexiu')+'</summary>'+form+'</details>':form;
      controls+=action('detail',menuSkillName(competency('K11.2'))+' →','K11.2','table-underlink');
    }
    return '<article id="table-note-'+n+'" tabindex="-1"><div class="ticket-kicker">'+t('Nácvik')+' · '+html(dateLabel(entry.day))+'</div><h3>'+html(heading)+'</h3>'+recap+
      '<p><b>'+t('Můj záměr na směnu','Môj zámer na zmenu')+'</b><br>'+html(story.plan)+'</p>'+field+controls+earlier+'</article>';
  }).join('')+'</section>';
}

function tableShiftPlan(p, model) {
  const n=tableNumbers.find(k=>model.tableNotes?.[k] && (model.tableNotes[k].field==null || model.tableNotes[k].field===2));
  if(!n) return '';
  return '<section class="table-plan"><div><span class="ticket-kicker">'+t('Z mého nácviku','Z môjho nácviku')+' · '+tableWord(n)+
    '</span><p>'+html(tableCase(n,p).plan)+'</p></div>'+action('table-note',t('Jak to dopadlo?','Ako to dopadlo?'),n,'ticket-secondary')+'</section>';
}
function focusTableNote(number) {
  const note=document.getElementById('table-note-'+number);
  if(note){note.focus({preventScroll:true});note.scrollIntoView({block:'center'});}
}
function handleTable(act, value) {
  if(act==='table-assign') {
    guard(role==='teacher' && view==='inspect' && tableNumbers.includes(value) && data().tableNotes?.[value] && data().shift.phase===6 && maxLevel(data(),'K11.2')<3);
    const form=document.getElementById('assignForm');
    if(form){form.closest('details').open=true;form.elements.code.value='K11.2';form.elements.date.focus();}
    return;
  }
  guard(role==='student');
  if(act==='table-open') {openTable(value);return;}
  if(act==='table-note') {
    guard(tableNumbers.includes(value) && data().tableNotes?.[value]);
    go('journal');focusTableNote(value);return;
  }
  if(act==='table-field') {
    guard(view==='journal');
    const match=/^(12|7)\|([012])$/.exec(value);
    guard(match && data().tableNotes?.[match[1]]);
    const number=match[1], field=Number(match[2]);
    mutate(model=>{const note=model.tableNotes[number];note.field=field;note.fieldDay=dayStamp();});
    render();focusTableNote(number);
    tell(t('Reflexe je v deníku pro vás i pedagoga.','Reflexia je v denníku pre vás aj pedagóga.'));
    return;
  }
  guard(view==='table' && tableNumbers.includes(tableNumber));
  const number=tableNumber, story=tableCase(number,person());
  if(act==='table-save') {
    const state=tableDraft(data(),number);
    guard(state.stage==='end' && (story.needed.every(i=>state.parts.includes(i)) || state.paired && state.peerSolution && state.answer?.trim()));
    if(!sameTableNote(data().tableNotes?.[number],state)) mutate(model=>{
      if(!model.tableNotes)model.tableNotes={};
      const last=model.tableNotes[number];
      if(sameTableNote(last,state))return;
      const earlier=last ? [...(last.earlier || []), {day:last.day,parts:last.parts,answer:last.answer,field:last.field,fieldDay:last.fieldDay}] : [];
      model.tableNotes[number]={day:dayStamp(),parts:[...state.parts],answer:state.paired?(state.answer || '').trim():'',field:null,earlier};
    });
    go('journal');focusTableNote(number);return;
  }
  let peerQuestion='';
  if(act==='table-peer' && value==='question'){
    const input=document.querySelector('textarea[data-table-question]');
    peerQuestion=(input?.value || '').trim().slice(0,160);
    if(!peerQuestion){tell(t('Napište krátký dotaz nebo klepněte na předvolenou odpověď.','Napíšte krátku otázku alebo klepnite na pripravenú odpoveď.'));input?.focus();return;}
  }
  mutate(model=>{
    if(!model.tablePractice)model.tablePractice={};
    const draft=model.tablePractice[number] || (model.tablePractice[number]=tableDraft(model,number));
    const enough=story.needed.every(i=>draft.parts.includes(i));
    switch(act) {
      case 'table-part': {
        guard(draft.stage==='write' && /^[0-3]$/.test(value));
        const i=Number(value), index=draft.parts.indexOf(i);
        if(index>=0)draft.parts.splice(index,1);
        else {guard(draft.parts.length<2);draft.parts.push(i);}
        break;
      }
      case 'table-pair':
        guard(draft.stage==='write');draft.paired=!draft.paired;break;
      case 'table-send':
        guard(draft.stage==='write' && (draft.parts.length || draft.paired && draft.answer?.trim()));
        delete draft.question;delete draft.accepted;delete draft.peerSolution;
        draft.stage=draft.paired?'receive':enough?'end':'clarify';break;
      case 'table-peer':
        guard(draft.paired && draft.stage==='receive' && ['ask','ready','question'].includes(value));
        draft.peerSolution=value==='ready' && !enough && Boolean(draft.answer?.trim());
        draft.question=peerQuestion;draft.accepted=value==='ready' && !enough && !draft.peerSolution;draft.followUp=value!=='ready';
        draft.stage=value==='ready' && (enough || draft.peerSolution)?'end':'clarify';break;
      case 'table-revise':
        guard(draft.stage==='clarify');draft.stage='write';break;
      case 'table-again':
        guard(draft.stage==='end');model.tablePractice[number]={parts:[],stage:'write',paired:draft.paired};break;
      default: guard(false);
    }
  });
  const inline=act==='table-part' || act==='table-pair';
  render(!inline);
  if(inline) document.querySelector('[data-do="'+act+'"][data-value="'+value+'"]')?.focus({preventScroll:true});
}

document.addEventListener('input',event=>{
  const input=event.target;
  if(!input.matches('textarea[data-table-answer]') || role!=='student' || view!=='table')return;
  const state=tableDraft(data(),tableNumber);
  if(state.stage!=='write' || !state.paired)return;
  const answer=input.value.slice(0,160);
  try {
    mutate(model=>{model.tablePractice[tableNumber].answer=answer;});
    const preview=document.querySelector('.table-send .table-own-answer');
    preview.textContent=answer;preview.hidden=!answer.trim();
    const placeholder=document.querySelector('.table-send [data-table-placeholder]');
    if(placeholder)placeholder.hidden=Boolean(answer.trim());
    document.querySelector('[data-do="table-send"]').disabled=!state.parts.length && !answer.trim();
  }
  catch(error){problem(error);}
});

function tableSources() {
  const sources=[
    ['DECA · Virtual Business Challenge, USA','https://www.deca.org/compete/virtual-business-challenge-restaurant',t('Středoškoláci v simulaci řídí restauraci a sledují důsledky svých rozhodnutí.','Stredoškoláci v simulácii riadia reštauráciu a sledujú dôsledky svojich rozhodnutí.')],
    ['Room 251 · Diman, USA','https://www.dimanregional.org/our-programs/vocational/culinary-arts',t('Žáci střídají práci kuchaře, obsluhy a cukráře ve školní restauraci otevřené veřejnosti.','Žiaci striedajú prácu kuchára, obsluhy a cukrára v školskej reštaurácii otvorenej verejnosti.')],
    ['Crema West · ITE, Singapur','https://www.ite.edu.sg/about-ite/colleges/college-west/facilities/school-of-hospitality/',t('V jedné kavárně zajišťuje obsluhu studentský tým a kuchyni podporují žáci kuchařského a cukrářského programu.','V jednej kaviarni zabezpečuje obsluhu študentský tím a kuchyňu podporujú žiaci kuchárskeho a cukrárskeho programu.')],
    ['Ohka High School · Japonsko','https://www.mofa.go.jp/files/000159781.pdf',t('Studenti kulinářského klubu odpovídají za přípravu jídla i za obsluhu hostů.','Študenti kulinárskeho klubu zodpovedajú za prípravu jedla aj za obsluhu hostí.')],
    [t('Finská agentura pro vzdělávání','Fínska agentúra pre vzdelávanie'),'https://www.oph.fi/en/education-and-qualifications/vocational-qualifications-finland',t('Žáci v odborném vzdělávání předvádějí své dovednosti při skutečných pracovních úkolech.','Žiaci v odbornom vzdelávaní predvádzajú svoje zručnosti pri skutočných pracovných úlohách.')]
  ];
  return '<details><summary>'+t('Čím se inspiroval nácvik u stolu','Čím sa inšpiroval nácvik pri stole')+'</summary>'+
    sources.map(([name,url,detail])=>'<p>'+html(detail)+' <a href="'+url+'" target="_blank" rel="noopener noreferrer">'+html(name)+' ↗</a></p>').join('')+'</details>';
}
