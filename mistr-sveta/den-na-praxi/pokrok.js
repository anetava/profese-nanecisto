'use strict';

// Observable outcomes are attached to the assigned competency and level, never inferred from a photo.
function learnerOutcome(s) {
  const c=competency(s.code);
  const examples={
    'K09.2':[
      t('Upravit porci podle vzoru a zkontrolovat talíř před výdejem.','Upraviť porciu podľa vzoru a skontrolovať tanier pred výdajom.'),
      t('Samostatně upravit pokrm a připravit jej k výdeji.','Samostatne upraviť pokrm a pripraviť ho na výdaj.'),
      t('Zachovat stejnou velikost a úpravu porcí i při změně zadání.','Zachovať rovnakú veľkosť a úpravu porcií aj pri zmene zadania.')],
    'K06.2':[
      t('Prostřít pro dva hosty a s podporou nabídnout vodu.','Prestrieť pre dvoch hostí a s podporou ponúknuť vodu.'),
      t('Samostatně připravit stůl, přivítat hosty a podat jim vodu.','Samostatne pripraviť stôl, privítať hostí a podať im vodu.'),
      t('Přizpůsobit obsluhu situaci u stolu a předejít chybě při servisu.','Prispôsobiť obsluhu situácii pri stole a predísť chybe pri servise.')]
  };
  return examples[s.code]?.[s.level-1] || c.levels[s.level-1];
}

function progressState(s) {
  if(s.phase===6)return t('Potvrzeno pedagogem','Potvrdené pedagógom');
  if(s.phase===5)return t('Čeká na potvrzení','Čaká na potvrdenie');
  if(s.phase===7)return t('K doplnění','Na doplnenie');
  if(s.phase===4)return t('Procvičeno na směně','Precvičené na zmene');
  if(s.phase>=3)return t('V nácviku','V nácviku');
  return t('Příprava','Príprava');
}

function personalEvidence(s){
  const p=person(), opts=options(p,s), rows=[];
  for(const moment of ['before','during','after']){
    const note=s.notes[moment];
    if(!note||!hasNote(note))continue;
    const words=[note.choice!==null?loc(opts[moment][note.choice]):'',loc(note.text)].filter(Boolean);
    rows.push('<li><span>'+period(moment)+'</span><div>'+words.map(w=>'<p>'+html(w)+'</p>').join('')+mediaMarkup(note)+'</div></li>');
  }
  return rows.length?'<ul class="evidence-log">'+rows.join('')+'</ul>':'';
}

function progressPanel(s){
  const c=competency(s.code);
  return '<section class="skill-strip"><div><span class="ey">'+t('Co se dnes učím','Čo sa dnes učím')+'</span><h2>'+html(learnerOutcome(s))+'</h2></div><div class="skill-strip-end"><span class="live-state">'+html(progressState(s))+'</span>'+action('detail',t('Moje kompetence','Moja kompetencia')+' →',c.code,'text-link')+'</div></section>';
}

function summaryPage(){
  const p=person(),m=data(),s=m.shift,c=competency(s.code);
  const approved=m.history.find(a=>a.id===s.id&&a.code===s.code);
  const result=approved?feedbackText(approved):s.phase===7?loc(s.feedback):'';
  const heroImage=scenes(p).at(-1);
  return back()+ '<div class="ride-title"><span class="ey">'+html(p.name)+' · '+html(relativeDate(s.day))+' · '+html(profession(p))+'</span><h1>'+t('Co si ze směny odnáším','Čo si zo zmeny odnášam')+'</h1></div>'+
    '<section class="ride-cover"><div class="ride-copy"><span class="ey">'+t('Moje dovednost','Moja zručnosť')+'</span><h2>'+html(learnerOutcome(s))+'</h2><p>'+html(c.name)+' · '+t('úroveň ')+s.level+'</p><strong class="live-state">'+html(progressState(s))+'</strong></div>'+photo(heroImage,p.name+' · '+period('after'))+'</section>'+
    '<div class="ride-grid"><section><h2>'+html(courseTitle(p,s))+'</h2>'+personalEvidence(s)+
      (s.notes.after.next!==null?'<p class="next-practice"><b>'+t('Příště','Nabudúce')+'</b> '+html(loc(options(p,s).next[s.notes.after.next]))+'</p>':'')+'</section>'+
    '<section class="ride-review"><span class="ey">'+t('Očima mistra','Očami majstra')+'</span><h2>'+html(progressState(s))+'</h2>'+
    (result?'<p>'+html(result)+'</p>':'')+mediaMarkup({audio:approved?.audio||s.reviews?.at(-1)?.audio})+
    (s.phase===5?'<p>'+t('Váš záznam už je u této kompetence. Pedagog teď podle pozorování v provozu posoudí úroveň. Zpětnou vazbu najdete tady.','Váš záznam už je pri tejto kompetencii. Pedagóg teraz podľa pozorovania v prevádzke posúdi úroveň. Spätnú väzbu nájdete tu.')+'</p>':'')+
    (approved?goBtn('portfolio',t('Zobrazit potvrzenou práci','Zobraziť potvrdenú prácu'),'button primary'):s.phase===4||s.phase===7?goBtn('reflect',t('Doplnit vlastní zápis','Doplniť vlastný zápis'),'button primary'):action('detail',t('Podívat se na dovednost','Pozrieť si zručnosť'),s.code,'button'))+'</section></div>';
}

function employerPage(){
  const p=person(),model=data();
  const sorted=[...model.history].sort((a,b)=>b.day.localeCompare(a.day)||b.level-a.level);
  const label=t('Portfolio pro zaměstnavatele','Portfólio pre zamestnávateľa');
  return back('portfolio')+title(t('MISTR SVĚTA · profesní portfolio','MISTR SVĚTA · profesijné portfólio'),p.name+' · '+profession(p),label)+
    '<div class="employer-intro"><p>'+t('Výběr nejvyšších potvrzených úrovní. U každé dovednosti je uvedena práce, kterou pedagog posoudil.','Výber najvyšších potvrdených úrovní. Pri každej zručnosti je uvedená práca, ktorú pedagóg posúdil.')+'</p><small>'+t('Ukázkové portfolio fiktivního žáka','Ukážkové portfólio fiktívneho žiaka')+'</small></div>'+
    '<div class="actions no-print">'+action('print-employer',t('Uložit jako PDF','Uložiť ako PDF'),'','button primary')+'</div>'+
    sorted.filter((a,i)=>a.level===maxLevel(model,a.code)&&sorted.findIndex(b=>b.code===a.code&&b.level===a.level)===i).map(a=>{
      const evidence=a.notes?.after?.photo;
      return '<article class="employer-entry"><div><span class="ey">'+html(competency(a.code).name)+'</span><h2>'+html(learnerOutcome(a))+'</h2><p>'+html(courseTitle(p,a))+'</p><p class="teacher-note">'+html(feedbackText(a))+'</p><small>'+t('Potvrdil pedagog','Potvrdil pedagóg')+' '+html(a.author)+' · '+html(a.day)+' · '+t('úroveň ')+a.level+' / 3</small></div>'+
      (evidence?mediaMarkup({photo:evidence}):a.examplePhoto?'<figure>'+photo(a.examplePhoto,t('Ilustrační fotografie práce','Ilustračná fotografia práce'))+'<figcaption>'+t('Modelový doklad','Modelový doklad')+'</figcaption></figure>':'')+'</article>';
    }).join('');
}
