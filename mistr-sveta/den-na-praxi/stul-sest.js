'use strict';

const lunchWords = (cs, sk) => language === 'sk' ? sk : cs;
const lunchTitle = () => lunchWords('Stůl 6 · Oběd před odjezdem', 'Stôl 6 · Obed pred odchodom');
const lunchPhoto = key => 'photos/stul-6-' + key + '.webp';

function lunchDraft(model) {
  return model.guestLunch?.draft || {step:'table', greeting:'', kitchen:'', quick:false, outcome:'', reflection:''};
}

function lunchInvitation(model) {
  const d = model.guestLunch?.draft;
  const label = !d ? lunchWords('Obsloužit stůl 6', 'Obslúžiť stôl 6') :
    d.step === 'saved' ? lunchWords('Otevřít výsledek', 'Otvoriť výsledok') : lunchWords('Pokračovat u stolu 6', 'Pokračovať pri stole 6');
  return '<section class="lunch-invite"><img src="'+lunchPhoto('hostka')+'" alt="" loading="lazy"><div><span class="ticket-kicker">'+
    lunchWords('Nácvik v telefonu · obsluha', 'Nácvik v telefóne · obsluha')+'</span><h2>'+lunchTitle()+'</h2><p>'+
    lunchWords('Hostka dostala řízek místo rizota. Za deset minut musí odejít.', 'Hostka dostala rezeň namiesto rizota. O desať minút musí odísť.')+'</p>'+
    action('lunch-open',label+' →','','ticket-primary')+'</div></section>';
}

function lunchFeedback(d) {
  const l = lunchWords;
  return [
    d.greeting === 'check' ? l('Před odnesením talíře jste požádali o souhlas a nabídli ověření času.', 'Pred odnesením taniera ste požiadali o súhlas a ponúkli overenie času.') :
      l('O odnesení talíře jste se domluvili. Pětiminutový slib ale kuchař dosud nepotvrdil.', 'Na odnesení taniera ste sa dohodli. Päťminútový sľub však kuchár ešte nepotvrdil.'),
    d.kitchen === 'ask' ? l('U výdeje jste zjistili čas rizota i rychlejší alternativu.', 'Pri výdaji ste zistili čas rizota aj rýchlejšiu alternatívu.') :
      d.quick ? l('Po žádosti o přednostní přípravu jste se doptali i na rychlejší jídlo.', 'Po žiadosti o prednostnú prípravu ste sa spýtali aj na rýchlejšie jedlo.') :
      l('Zjistili jste, kdy bude rizoto. Na rychlejší jídlo jste se nezeptali.', 'Zistili ste, kedy bude rizoto. Na rýchlejšie jedlo ste sa nespýtali.'),
    d.outcome === 'soup' ? l('Hostka znala čekací dobu a sama si vybrala polévku.', 'Hosťka poznala čas čakania a sama si vybrala polievku.') :
      d.outcome === 'cancel' ? l('Hostka znala čekací dobu a souhlasila se zrušením hlavního chodu.', 'Hosťka poznala čas čakania a súhlasila so zrušením hlavného jedla.') :
      l('Hostka musela znovu upozornit na odchod. Příště jí řekněte čas a nechte ji vybrat.', 'Hosťka musela znova upozorniť na odchod. Nabudúce jej povedzte čas a nechajte ju vybrať.')
  ];
}

function lunchRecord(d) {
  return '<ul>'+lunchFeedback(d).map(s=>'<li>'+html(s)+'</li>').join('')+'</ul>'+
    (d.reflection ? '<p><b>'+lunchWords('Moje poznámka','Moja poznámka')+'</b> · '+html(d.reflection)+'</p>' : '');
}
function lunchPortfolio(model) {
  const records = model.guestLunch?.records || [];
  if(!records.length)return '';
  return '<section class="lunch-records"><h2>'+lunchWords('Nácvik v telefonu','Nácvik v telefóne')+'</h2>'+
    '<p>'+lunchWords('Samostatná simulace · K08.3 · praktický výkon ověřuje pedagog.', 'Samostatná simulácia · K08.3 · praktický výkon overuje pedagóg.')+'</p>'+
    records.slice().reverse().map((r,i)=>'<details'+(i===0?' open':'')+'><summary>'+html(dateLabel(r.day)+' · '+lunchTitle())+'</summary>'+
    lunchRecord(r)+'</details>').join('')+'</section>';
}

function lunchScene(d) {
  const l = lunchWords;
  const guest=l('Hostka', 'Hosťka'),chef=l('Kuchař', 'Kuchár');
  const atTable=l('U stolu', 'Pri stole'),atPass=l('U výdeje', 'Pri výdaji');
  const correction=d.greeting==='promise' ? l('Omlouvám se za nepřesný čas. ', 'Ospravedlňujem sa za nepresný čas. ') : '';
  const scene=(part, place, image, speaker, quote, prompt, options, note='')=>({part,place,image,speaker,quote,prompt,options,note});
  switch(d.step) {
  case 'table': return scene(1,atTable,'hostka',guest,
    l('Promiňte, objednala jsem si houbové rizoto. Ve tři čtvrtě na jednu musím odejít na vlak. Co s tím uděláme?',
      'Prepáčte, objednala som si hubové rizoto. O trištvrte na jednu musím odísť na vlak. Ako to vyriešime?'),
    l('Je 12.35. Co hostce řeknete?', 'Je 12.35. Čo hosťke poviete?'),[
      ['check',l('Omlouvám se za záměnu. Mohu řízek odnést? Zjistím, co ještě stihneme.', 'Ospravedlňujem sa za zámenu. Môžem rezeň odniesť? Zistím, čo ešte stihneme.')],
      ['promise',l('Omlouvám se. Mohu řízek odnést? Rizoto Vám přinesu do pěti minut.', 'Ospravedlňujem sa. Môžem rezeň odniesť? Rizoto Vám prinesiem do piatich minút.')]
    ]);
  case 'handoff': return scene(1,atTable,'hostka',guest,d.greeting==='check'?
    l('Ano, děkuji. Řekněte mi prosím, kolik času to opravdu zabere.', 'Áno, ďakujem. Povedzte mi, prosím, koľko času to naozaj zaberie.'):
    l('Ano, odneste ho. Za pět minut tedy přinesete rizoto? To ještě stihnu.', 'Áno, odneste ho. O päť minút teda prinesiete rizoto? To ešte stihnem.'),
    l('Hostka souhlasila. Odnášíte řízek do zázemí a jdete ověřit objednávku.', 'Hosťka súhlasila. Odnášate rezeň do zázemia a idete overiť objednávku.'),
    [['pass',l('Zkontrolovat objednávku u výdeje', 'Skontrolovať objednávku pri výdaji')]]);
  case 'pass': return scene(2,atPass,'vydej',chef,
    l('Při výdeji jsme zaměnili talíře. Mám dát dělat nové rizoto?', 'Pri výdaji sme zamenili taniere. Mám dať pripraviť nové rizoto?'),
    l('Co teď domluvíte s kuchařem?', 'Čo teraz dohodnete s kuchárom?'),[
      ['rush',l('Dejte prosím rizoto přednostně do přípravy.', 'Dajte, prosím, rizoto pripraviť prednostne.')],
      ['ask',l('Kdy bude rizoto? A které jídlo můžete podat dřív?', 'Kedy bude rizoto? A ktoré jedlo môžete podať skôr?')]
    ],l('Objednávkový lístek · Stůl 6 · 1× houbové rizoto', 'Objednávkový lístok · Stôl 6 · 1× hubové rizoto'));
  case 'kitchen': return scene(2,atPass,'vydej',chef,d.quick?
    l('Rizoto za čtrnáct minut. Dýňovou polévku s pečivem můžu vydat za dvě. Co si paní přeje?', 'Rizoto o štrnásť minút. Tekvicovú polievku s pečivom môžem vydať o dve. Čo si pani želá?'):
    l('I přednostně mi rizoto zabere čtrnáct minut. Mám s ním začít?', 'Aj prednostne mi rizoto zaberie štrnásť minút. Mám s ním začať?'),
    l('Hostka musí odejít ve 12.45.', 'Hosťka musí odísť o 12.45.'),
    [...(d.quick?[]:[['quick',l('Doptat se, co lze vydat dřív', 'Spýtať sa, čo možno vydať skôr')]]),
     ['return',l('Vrátit se k hostce', 'Vrátiť sa k hosťke')]]);
  case 'offer': return scene(3,atTable,'hostka',guest,d.greeting==='promise'?
    l('Platí těch pět minut, které jste mi slíbili?', 'Platí tých päť minút, ktoré ste mi sľúbili?'):
    l('Co jste zjistili? Stihnu se ještě najíst?', 'Čo ste zistili? Stihnem sa ešte najesť?'),
    l('Jak se s hostkou domluvíte?', 'Ako sa s hosťkou dohodnete?'),[
      ...(d.quick?[['soup',correction+l('Rizoto bude za čtrnáct minut, polévka za dvě. Dáte si polévku, nebo si přejete hlavní chod zrušit?',
      'Rizoto bude o štrnásť minút, polievka o dve. Dáte si polievku, alebo si želáte hlavné jedlo zrušiť?')]]:[]),
      ['cancel',correction+l('Rizoto bude za čtrnáct minut. Přejete si hlavní chod zrušit a účet jen za vodu?', 'Rizoto bude o štrnásť minút. Želáte si hlavné jedlo zrušiť a účet len za vodu?')],
      ['wait',l('Nechám Vám připravit nové rizoto. Prosím, ještě vydržte.', 'Dám Vám pripraviť nové rizoto. Prosím, ešte vydržte.')]
    ]);
  case 'result': case 'saved': {
    const outcomes={
      soup:[l('Polévku si dám. A účet, prosím, rovnou s ní.', 'Dám si polievku. A účet, prosím, rovno s ňou.'),l('Předáte změnu do kuchyně. Hostka dostane polévku s pečivem a účet za polévku a vodu.', 'Zmenu oznámite kuchyni. Hosťka dostane polievku s pečivom a účet za polievku a vodu.')],
      cancel:[l('Ano, jen vodu. Děkuji, že jste mi to řekli včas.', 'Áno, len vodu. Ďakujem, že ste mi to povedali včas.'),l('Zrušíte hlavní chod a vystavíte účet jen za objednanou vodu.', 'Zrušíte hlavné jedlo a vystavíte účet len za objednanú vodu.')],
      wait:[l('Jak dlouho ještě? Já opravdu musím jít. Zrušte to, prosím.', 'Ako dlho ešte? Naozaj musím ísť. Zrušte to, prosím.'),l('Hostka musela připomenout čas odchodu a požádat o zrušení. Zastavíte přípravu a vyúčtujete jen vodu.', 'Hosťka musela pripomenúť čas odchodu a požiadať o zrušenie. Zastavíte prípravu a naúčtujete len vodu.')]
    };
    const [quote,consequence]=outcomes[d.outcome];
    return scene(4,l('Výsledek obsluhy','Výsledok obsluhy'),d.outcome==='soup'?'polevka':'hostka',guest,quote,consequence,[]);
  }}
}

function lunchPage() {
  const l=lunchWords, d=lunchDraft(data()), s=lunchScene(d), final=s.part===4, saved=d.step==='saved';
  const options=s.options.map(([id,label])=>action('lunch-pick',label,d.step+'|'+id,'lunch-choice')).join('');
  const outcome=final?'<div class="lunch-review"><h2>'+l('Zpětná vazba k Vašim volbám','Spätná väzba k Vašim voľbám')+
    '</h2><ul>'+lunchFeedback(d).map(f=>'<li>'+html(f)+'</li>').join('')+'</ul>'+
    (saved?'<p role="status">'+l('Zapsáno do Vašeho deníku a portfolia jako samostatný nácvik.','Zapísané do Vášho denníka a portfólia ako samostatný nácvik.')+'</p>'+
      (d.reflection?'<p>'+html(d.reflection)+'</p>':'')+goBtn('portfolio',l('Otevřít moje portfolio','Otvoriť moje portfólio'),'ticket-primary')+
      action('lunch-retry',l('Zkusit jiný postup','Vyskúšať iný postup'),'','lunch-quiet'):
      '<label for="lunch-reflection">'+l('Co příště řeknete hostovi? (nepovinné)','Čo nabudúce poviete hosťovi? (nepovinné)')+'</label><textarea id="lunch-reflection" rows="2" maxlength="320">'+html(d.reflection)+'</textarea>'+
      action('lunch-save',l('Uložit nácvik do mého portfolia','Uložiť nácvik do môjho portfólia'),'','ticket-primary'))+'</div>':'';
  const alt={hostka:l('Hostka u stolu s řízkem ukazuje na hodinky.','Hosťka pri stole s rezňom ukazuje na hodinky.'),vydej:l('Kuchař u výdeje s miskou polévky.','Kuchár pri výdaji s miskou polievky.'),polevka:l('Hostka u stolu s polévkou a pečivem.','Hosťka pri stole s polievkou a pečivom.')}[s.image];
  return '<article class="lunch-page">'+goBtn('path','← '+t('Moje cesta','Moja cesta'),'back')+
    '<header><p class="ticket-kicker">'+html(person().name)+' · '+l('Nácvik obsluhy','Nácvik obsluhy')+'</p><h1>'+lunchTitle()+'</h1>'+
    (studentStyle?'<p class="peer-line">'+l('Tenhle stůl máte v rukou.','Tento stôl máte v rukách.')+'</p>':'')+'</header>'+
    '<div class="lunch-stage" aria-label="'+l('Průběh nácviku','Priebeh nácviku')+'"><b>'+s.part+' / 4</b> · '+html(s.place)+'</div>'+
    '<div class="lunch-frame"><img src="'+lunchPhoto(s.image)+'" alt="'+html(alt)+'"><div class="lunch-dialog"><span>'+html(s.speaker)+'</span><blockquote>„'+html(s.quote)+'“</blockquote>'+
    action('lunch-voice',l('Přehrát repliku','Prehrať repliku'),'','lunch-quiet')+'</div></div>'+
    (s.note?'<p class="lunch-slip">'+html(s.note)+'</p>':'')+'<div class="lunch-decision"><h2>'+html(s.prompt)+'</h2>'+
    options+'</div>'+outcome+'</article>';
}

function handleLunch(cmd, val) {
  guard(role==='student');
  if(cmd==='lunch-open'){go('lunch');window.history.replaceState(null,'','#stul-6');return}
  guard(view==='lunch');
  if(cmd==='lunch-voice'){
    const synth=window.speechSynthesis;
    if(synth?.speaking){synth.cancel();return}
    const v=synth?.getVoices().find(v=>v.localService&&v.lang.toLowerCase().startsWith(language));
    if(!v){tell(lunchWords('V telefonu není k dispozici místní český hlas. Replika je pod fotografií.','V telefóne nie je k dispozícii miestny slovenský hlas. Replika je pod fotografiou.'));return}
    const u=new SpeechSynthesisUtterance(lunchScene(lunchDraft(data())).quote);u.voice=v;u.lang=v.lang;synth.speak(u);return
  }
  window.speechSynthesis?.cancel();
  mutate(m=>{
    const group=m.guestLunch ||= {records:[]};
    const d=group.draft ||= lunchDraft(m);
    if(cmd==='lunch-save'){
      guard(d.step==='result');const input=document.querySelector('#lunch-reflection');
      if(input)d.reflection=input.value.trim().slice(0,320);
      group.records.push({day:dayStamp(),greeting:d.greeting,kitchen:d.kitchen,quick:d.quick,outcome:d.outcome,reflection:d.reflection});
      d.step='saved';return
    }
    if(cmd==='lunch-retry'){guard(d.step==='saved');delete group.draft;return}
    guard(cmd==='lunch-pick');
    const [step,id]=val.split('|');guard(step===d.step&&lunchScene(d).options.some(([key])=>key===id));
    switch(step){
    case 'table': d.greeting=id;d.step='handoff';break;
    case 'handoff': d.step='pass';break;
    case 'pass': d.kitchen=id;d.quick=id==='ask';d.step='kitchen';break;
    case 'kitchen': if(id==='quick')d.quick=true;else d.step='offer';break;
    case 'offer': d.outcome=id;d.step='result';break;
    }
  });
  render(true);
}
