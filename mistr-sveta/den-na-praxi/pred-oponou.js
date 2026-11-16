'use strict';

const bonText = (cs, sk = cs) => language === 'sk' ? sk : cs;
let bonReviewId = '';
const bonTitle = () => bonText('Stihne host večeři?', 'Stihne hosť večeru?');
const bonTime = minutes => {
  const value = ((minutes % 1440) + 1440) % 1440;
  const clock = String(Math.floor(value / 60)).padStart(2, '0') + ':' + String(value % 60).padStart(2, '0');
  const offset = Math.floor(minutes / 1440);
  return offset ? clock + ' (' + (offset > 0 ? '+' : '−') + Math.abs(offset) + ' d)' : clock;
};
function bonDefault(mode = 'case') {
  const sample = mode === 'case';
  return {mode, table:sample ? '4' : '', start:sample ? '18:34' : '', event:sample ? '19:00' : '',
    walk:sample ? '8' : '', meal:sample ? '12' : '', nextDay:false, verified:false,
    dish:sample ? 'risotto' : 'custom', ownDish:'', ownPrep:'', saved:''};
}
function bonMinutes(clock) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(clock)) return null;
  const [h,m] = clock.split(':').map(Number);
  return h*60+m;
}
function bonNumber(value) {
  return /^\d{1,4}$/.test(String(value)) && Number(value) <= 1440 ? Number(value) : null;
}
function bonFood(d) {
  if(d.mode === 'own') return d.ownDish.trim();
  return d.dish==='soup' ? bonText('Rajčatová polévka','Paradajková polievka') : bonText('Houbové rizoto','Hubové rizoto');
}
function bonMath(d, actual) {
  const start=bonMinutes(d.start), event=bonMinutes(d.event), walk=bonNumber(d.walk), meal=bonNumber(d.meal);
  if ([start,event,walk,meal].includes(null)) return null;
  const deadline=event+(d.nextDay?1440:0);
  if(deadline<start || deadline-start>1440) return null;
  const leave=deadline-walk;
  const prep=actual!==undefined ? bonNumber(actual) : d.mode==='own' ? bonNumber(d.ownPrep) : d.verified ? (d.dish==='soup'?5:18) : null;
  if(prep===null)return {start,leave};
  const serve=start+prep, finish=serve+meal;
  return {start,leave,prep,serve,finish,margin:leave-finish};
}
function bonSummary(c){
  if(c.margin===0)return bonText('Přesně na čas, bez rezervy.','Presne načas, bez rezervy.');
  return c.margin>0 ? bonText('Rezerva ','Rezerva ')+c.margin+' min.' :
    bonText('Chybí ','Chýba ')+Math.abs(c.margin)+' min.';
}
function bonInvitation() {
  return '<section class="bon-invite">'+
    '<div><span class="ticket-kicker">'+bonText('Pomůcka na směnu','Pomôcka na zmenu')+'</span><h2>'+bonTitle()+'</h2>'+
    '<p>'+bonText('Spočítejte výdej, domluvte objednávku a zapište skutečný čas.','Vypočítajte výdaj, dohodnite objednávku a zapíšte skutočný čas.')+'</p></div>'+
    action('bon-open',bonText('Otevřít pracovní bon','Otvoriť pracovný bon')+' →','','ticket-primary')+'</section>';
}
function bonInput(name,label,type,value,extra='') {
  return '<label><span>'+html(label)+'</span><input data-bon-field="'+name+'" name="'+name+'" type="'+type+'" value="'+html(value)+'" '+extra+'></label>';
}
function bonRecord(r) {
  const d=r.order,c=bonMath(d);
  if(!c||c.margin===undefined)return '';
  const tr=bonText;
  let display='<p><b>'+html(bonFood(d))+'</b> · '+tr('stůl ','stôl ')+html(d.table)+'</p>'+
    '<p>'+tr('Objednávka','Objednávka')+' '+html(d.start)+' · '+tr('plánovaný výdej','plánovaný výdaj')+' '+bonTime(c.serve)+' · '+tr('odchod','odchod')+' '+bonTime(c.leave)+'</p>'+
    '<p>'+tr('Čas na jídlo a placení','Čas na jedlo a platenie')+' '+html(d.meal)+' min · '+bonSummary(c)+'</p>';
  if(r.actual!==undefined && r.actual!==''){
    const real=bonMath(d,r.actual),diff=real.prep-c.prep;
    display+='<p><b>'+tr('Zapsaný výdej','Zapísaný výdaj')+' '+bonTime(real.serve)+'</b> · '+
      (diff===0?tr('podle plánu','podľa plánu'):Math.abs(diff)+' min '+(diff>0?tr('později','neskôr'):tr('dříve','skôr')))+' · '+bonSummary(real)+'</p>';
  }
  return display;
}
function bonRecords(model){return model.serviceBon?.records || [];}
function bonSource(d){return d.mode==='own'?bonText('Zápis ze směny','Zápis zo zmeny'):bonText('Modelová objednávka','Modelová objednávka');}
function bonPortfolio(model){
  const rs=bonRecords(model);
  if(!rs.length)return '';
  return '<section class="bon-portfolio"><h2>'+bonText('Moje pracovní bony','Moje pracovné bony')+'</h2>'+
    rs.slice().reverse().map(r=>'<details><summary>'+html(dateLabel(r.day)+' · '+bonSource(r.order)+' · '+bonFood(r.order))+'</summary>'+bonRecord(r)+(role==='student'?action('bon-record',bonText('Otevřít bon','Otvoriť bon'),r.id,'button no-print'):'')+'</details>').join('')+'</section>';
}
function bonExport(model){
  return bonRecords(model).map(r=>({id:r.id,day:r.day,source:r.order.mode,order:{...r.order},dish:bonFood(r.order),
    planned:bonMath(r.order),actualPrepMinutes:r.actual===''?null:Number(r.actual),
    observed:r.actual===''?null:bonMath(r.order,r.actual)}));
}
function bonPreview(d){
  const l=bonText,c=bonMath(d);
  if(!c)return '<p class="bon-neutral">'+l('Doplňte platné časy a minuty. Pokud událost začíná zítra, označte následující den.','Doplňte platné časy a minúty. Ak udalosť začína zajtra, označte nasledujúci deň.')+'</p>';
  const leave='<div><small>'+l('Nejpozdější odchod','Najneskorší odchod')+'</small><b>'+bonTime(c.leave)+'</b></div>';
  if(c.margin===undefined)return '<div class="bon-times">'+leave+'</div><p>'+l('Po doplnění času z kuchyně uvidíte i výdej a rezervu.','Po doplnení času z kuchyne uvidíte aj výdaj a rezervu.')+'</p>';
  const assess = c.margin<0? 'bon-late':'bon-ok';
  return '<div class="bon-times">'+leave+'<div><small>'+l('Výdej jídla','Výdaj jedla')+'</small><b>'+bonTime(c.serve)+'</b></div></div>'+
    '<p class="'+assess+'"><strong>'+bonSummary(c)+'</strong> '+l('Jídlo a placení skončí v ','Jedlo a platenie sa skončí o ')+bonTime(c.finish)+'.</p>';
}
function bonPage(){
  const l=bonText,m=data(),draft=m.serviceBon?.draft||bonDefault(),r=bonRecords(m).find(row=>row.id===(bonReviewId||draft.saved));
  const d=r?r.order:draft,own=d.mode==='own';
  let page='<article class="bon-page">'+goBtn('path','← '+t('Moje cesta','Moja cesta'),'back')+
    '<header><span class="ticket-kicker">'+html(person().name)+' · '+l('Obsluha','Obsluha')+'</span><h1>'+bonTitle()+'</h1></header>';
  if(r){
    const hasActual = r.actual!=='' && r.actual!==undefined;
    return page+'<section class="bon-card"><div class="bon-ey">'+bonSource(d)+'</div><h2>'+l('Uložený pracovní bon','Uložený pracovný bon')+'</h2>'+bonRecord(r)+
      '<p class="bon-muted">'+l('Bon najdete také v deníku a portfoliu tohoto profilu.','Bon nájdete aj v denníku a portfóliu tohto profilu.')+'</p></section>'+
      '<section class="bon-card"><h2>'+l('Po výdeji','Po výdaji')+'</h2><label><span>'+l('Kolik minut skutečně uplynulo od objednání do výdeje?','Koľko minút skutočne uplynulo od objednania do výdaja?')+
      '</span><input id="bon-actual" type="number" inputmode="numeric" min="0" max="1440" step="1" value="'+(hasActual?html(r.actual):'')+'"></label>'+
      action('bon-actual',l('Uložit skutečný výdej','Uložiť skutočný výdaj'),r.id,'ticket-primary')+'</section>'+
      '<div class="bon-nav">'+(bonReviewId?action('bon-resume',l('Zpět na pracovní bon','Späť na pracovný bon'),'','button'):action('bon-new',l('Nový bon','Nový bon'),'','button'))+
      goBtn('portfolio',l('Otevřít moje portfolio','Otvoriť moje portfólio'),'button')+'</div></article>';
  }
  const num='min="0" max="1440" step="1" inputmode="numeric"';
  page+='<div class="bon-modes" role="group" aria-label="'+l('Zdroj údajů','Zdroj údajov')+'">'+
    [['case',l('Před divadlem','Pred divadlom')],['own',l('Vlastní směna','Vlastná zmena')]].map(([v,label])=>action('bon-mode',label,v,'button','aria-pressed="'+(d.mode===v)+'"')).join('')+'</div>';
  if(!own)page+='<div class="bon-guest"><img src="photos/pred-oponou.webp" alt=""><div><span class="bon-ey">'+l('Hostka u stolu','Hosťka pri stole')+'</span><p>„'+
    l('Dala bych si rizoto. V sedm mi začíná divadlo, je to osm minut pěšky. Na večeři a zaplacení bych chtěla aspoň dvanáct minut.','Dala by som si rizoto. O siedmej mi začína divadlo, je to osem minút pešo. Na večeru a zaplatenie by som chcela aspoň dvanásť minút.')+'“</p></div></div>';
  page+='<section class="bon-card"><h2>'+l('Požadavek hosta','Požiadavka hosťa')+'</h2><div class="bon-fields">'+
    bonInput('table',l('Označení stolu','Označenie stola'),'text',d.table,'maxlength="30" placeholder="4"')+
    bonInput('start',l('Přijetí objednávky','Prijatie objednávky'),'time',d.start)+
    bonInput('event',l('Začátek představení / schůzky','Začiatok predstavenia / stretnutia'),'time',d.event)+
    bonInput('walk',l('Cesta po odchodu (min)','Cesta po odchode (min)'),'number',d.walk,num)+
    bonInput('meal',l('Jídlo a placení (min)','Jedlo a platenie (min)'),'number',d.meal,num)+
    '<label class="bon-check"><input type="checkbox" data-bon-field="nextDay" '+(d.nextDay?'checked':'')+'>'+l('Událost je až následující den','Udalosť je až nasledujúci deň')+'</label></div></section>';
  page+='<section class="bon-card"><h2>'+l('Objednávka a výdej','Objednávka a výdaj')+'</h2>';
  if(own)page+='<div class="bon-fields">'+bonInput('ownDish',l('Objednané jídlo','Objednané jedlo'),'text',d.ownDish,'maxlength="80"')+bonInput('ownPrep',l('Čas sdělený kuchyní (min)','Čas oznámený kuchyňou (min)'),'number',d.ownPrep,num)+'</div>';
  else {
    page+=(d.verified?'<p class="bon-slip"><b>'+l('Kuchyně potvrdila','Kuchyňa potvrdila')+'</b> · '+l('rizoto za 18 min, polévka za 5 min.','rizoto o 18 min, polievka o 5 min.')+'</p>':action('bon-kitchen',l('Zjistit časy u výdeje','Zistiť časy pri výdaji'),'','ticket-primary'))+
    '<div class="bon-dishes" role="group" aria-label="'+l('Objednané jídlo','Objednané jedlo')+'">'+
    [['risotto',l('Houbové rizoto','Hubové rizoto')],['soup',l('Rajčatová polévka','Paradajková polievka')]].map(([id,name])=>
      action('bon-dish',name,id,'button','aria-pressed="'+(id===d.dish)+'"')).join('')+'</div>';
  }
  return page+'</section><section class="bon-card bon-result"><h2>'+l('Lze objednávku stihnout?','Dá sa objednávka stihnúť?')+'</h2>'+
    '<div id="bon-preview" aria-live="polite">'+bonPreview(d)+'</div><p class="bon-status" id="bon-status" role="status"></p>'+
    action('bon-save',l('Uložit pracovní bon','Uložiť pracovný bon'),'','ticket-primary')+'</section></article>';
}
function bonGroup(m){
  if(!m.serviceBon)m.serviceBon={draft:bonDefault(),records:[],drafts:{}};
  return m.serviceBon;
}
function bonField(el){
  if(role!=='student'||view!=='bon'||!el.matches('[data-bon-field]'))return;
  const key=el.dataset.bonField;
  if(!['table','start','event','walk','meal','nextDay','ownDish','ownPrep'].includes(key))return;
  const model=mutate(m=>{
    const d=bonGroup(m).draft;guard(!d.saved);
    d[key]=key==='nextDay'?el.checked:el.value.slice(0,key==='ownDish'?80:30);
  });
  document.querySelector('#bon-preview').innerHTML=bonPreview(model.serviceBon.draft);
  document.querySelector('#bon-status').textContent='';
}
function handleBon(cmd,val){
  guard(role==='student');
  if(cmd==='bon-record'){guard(view==='portfolio'&&bonRecords(data()).some(r=>r.id===val));bonReviewId=val;go('bon');return;}
  if(cmd==='bon-resume'){bonReviewId='';go('bon');return;}
  if(cmd==='bon-open'){bonReviewId='';go('bon');history.replaceState(null,'','#stul-pred-oponou');return;}
  guard(view==='bon');
  const l=bonText;
  if(cmd==='bon-save'){
    const d=data().serviceBon?.draft||bonDefault(),c=bonMath(d);
    if(d.saved)return;
    const issue=!d.table.trim()?l('Doplňte označení stolu.','Doplňte označenie stola.'):!c?l('Zkontrolujte časy hosta.','Skontrolujte časy hosťa.'):
      !bonFood(d)?l('Doplňte název jídla.','Doplňte názov jedla.'):c.margin===undefined?l('Nejdřív zjistěte, za kolik minut kuchyně jídlo vydá.','Najprv zistite, o koľko minút kuchyňa jedlo vydá.'):'';
    if(issue){document.querySelector('#bon-status').textContent=issue;return;}
  }
  if(cmd==='bon-actual'){
    const el=document.querySelector('#bon-actual');
    if(!el||bonNumber(el.value)===null){tell(l('Zadejte počet minut od 0 do 1440.','Zadajte počet minút od 0 do 1440.'));el?.focus();return;}
  }
  mutate(m=>{
    const g=bonGroup(m),d=g.draft;
    if(cmd==='bon-mode'){
      guard(['case','own'].includes(val)&&!d.saved);
      if(val===d.mode)return;
      g.drafts ||= {};g.drafts[d.mode]={...d};g.draft=g.drafts[val]||bonDefault(val);delete g.drafts[val];return;
    }
    if(cmd==='bon-new'){guard(d.saved);g.draft=bonDefault(d.mode);return;}
    if(cmd==='bon-actual'){
      const r=g.records.find(row=>row.id===val);guard(r && val===(bonReviewId||d.saved));
      r.actual=document.querySelector('#bon-actual').value;return;
    }
    guard(!d.saved);
    if(cmd==='bon-kitchen'){guard(d.mode==='case');d.verified=true;return;}
    if(cmd==='bon-dish'){guard(d.mode==='case'&&['soup','risotto'].includes(val));d.dish=val;return;}
    guard(cmd==='bon-save');
    const id=crypto.randomUUID();
    g.records.push({id,day:dayStamp(),order:{...d},actual:''});d.saved=id;
  });
  render(cmd==='bon-save'||cmd==='bon-new');
  if(cmd==='bon-actual')tell(l('Skutečný výdej je zapsaný.','Skutočný výdaj je zapísaný.'));
}
