(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const two = n => String(n).padStart(2,'0');
  const iso = d => d.getFullYear()+'-'+two(d.getMonth()+1)+'-'+two(d.getDate());
  const read = key => {const [y,m,d] = key.split('-').map(Number); return new Date(y,m-1,d,12);};
  const local = (key,options) => read(key).toLocaleDateString('cs-CZ',options);
  const ym = key => key.slice(0,7);
  const academic = d => d.getMonth() >= 8 ? d.getFullYear() : d.getFullYear()-1;
  const today = iso(new Date());
  const choices = ['Příprava','Náslech','Výukový výstup','Rozbor','Odevzdání portfolia'];
  const sampleDay = day => ym(today)+'-'+two(day);
  let selected = today, month = ym(today), editId = null, editor = false, focus = null;
  const samples = [
    ['pp-demo-1',3,'group','Domluva se školou a příprava pozorování'],
    ['pp-demo-2',11,'group','Skupinový náslech odborného předmětu'],
    ['pp-demo-3',19,'group','Pozorování instruktáže v odborném výcviku'],
    ['pp-demo-4',23,'group','Společný rozbor zápisů s pedagogem IVP']
  ].map(([id,day,moduleId,title]) => ({id,date:sampleDay(day),moduleId,title}));
  function stepMonth(amount) {
    const d = read(month+'-01'); d.setMonth(d.getMonth()+amount);
    selected = iso(d); month = ym(selected); editId = null; editor = false;
  }
  function render(events,modules) {
    const sorted = events.slice().sort((a,b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title,'cs'));
    const moduleById = id => modules.find(m => m.id===id);
    const modName = id => moduleById(id)?.title || 'Praxe';
    const byDate = new Map();
    sorted.forEach(e => {if(!byDate.has(e.date)) byDate.set(e.date,[]); byDate.get(e.date).push(e);});
    const first = read(month+'-01');
    const end = new Date(first.getFullYear(),first.getMonth()+1,0,12).getDate();
    const weekdays = ['Po','Út','St','Čt','Pá','So','Ne'];
    const pad = (first.getDay()+6)%7;
    const cells = Array.from({length:end},(_,i) => {
      const key = month+'-'+two(i+1), items = byDate.get(key)||[];
      const dots = items.slice(0,3).map(it => '<i data-kind="'+esc(it.moduleId)+'"></i>').join('');
      return '<button class="pp-day" type="button" data-date="'+key+'" aria-pressed="'+(key===selected)+'" '+(key===today?'aria-current="date"':'')+' aria-label="'+esc(local(key,{weekday:'long',day:'numeric',month:'long'})+(items.length?', počet termínů '+items.length:''))+'"><b>'+(i+1)+'</b><span aria-hidden="true">'+dots+'</span></button>';
    }).join('');
    const rangeYear = academic(first);
    const currentYear = academic(new Date());
    const years = [...new Set([currentYear-1,currentYear,currentYear+1,rangeYear,...events.map(e=>academic(read(e.date)))])].sort((a,b)=>a-b);
    const monthList = sorted.filter(e => ym(e.date)===month);
    const selectedItems = byDate.get(selected)||[];
    const ed = events.find(e => e.id===editId);
    const panel = editor ? '<form class="pp-form" data-pp-form>'+Volba.field({label:'Název termínu',name:'title',required:true,items:choices,value:ed?.title||'',max:160})+'<label>Datum<input name="date" type="date" required min="2000-01-01" max="2100-12-31" value="'+esc(ed?.date || selected)+'"></label><label>Praxe<select name="moduleId" required>'+modules.map(m=>'<option value="'+esc(m.id)+'" '+(ed?.moduleId===m.id?'selected':'')+'>'+esc(m.title)+'</option>').join('')+'</select></label><div class="actions"><button type="submit" class="primary">Uložit termín</button><button type="button" class="secondary" data-pp="cancel">Zrušit úpravu</button></div></form>' :
      (selectedItems.length ? selectedItems.map(e=>'<article class="pp-item" draggable="true" data-drag="'+esc(e.id)+'"><small>'+esc(modName(e.moduleId))+'</small><h3>'+esc(e.title)+'</h3><div class="actions"><button class="primary" data-module="'+esc(e.moduleId)+'" type="button">Otevřít praxi</button><button class="secondary" data-edit="'+esc(e.id)+'" type="button">Upravit termín</button></div></article>').join('') : '<p>Na tento den zatím nemáte žádný termín.</p>')+'<button type="button" class="secondary" data-pp="add">Přidat termín</button>';
    return '<div class="pp-planner"><div class="section-head"><div><small class="eyebrow">Moje organizace praxí</small><h1>Plán praxí</h1></div><label>Akademický rok<select data-pp-year>'+years.map(y=>'<option value="'+y+'" '+(y===rangeYear?'selected':'')+'>'+y+' / '+(y+1)+'</option>').join('')+'</select></label></div><div class="pp-split"><section class="panel pp-calendar"><div class="pp-toolbar"><button type="button" class="secondary" data-pp="prev" aria-label="Předchozí měsíc">←</button><h2>'+esc(local(month+'-01',{month:'long',year:'numeric'}))+'</h2><button type="button" class="secondary" data-pp="next" aria-label="Následující měsíc">→</button></div><div class="pp-grid">'+weekdays.map(d=>'<small>'+d+'</small>').join('')+'<i aria-hidden="true" class="pp-spacer pp-pad-'+pad+'"></i>'+cells+'</div><footer class="pp-calfoot"><small>Tečka označuje naplánovanou praxi.</small><button type="button" class="secondary" data-pp="today">Dnes</button></footer></section><section class="panel pp-detail"><small class="eyebrow">'+(editor?'Úprava plánu':'Vybraný den')+'</small><h2>'+esc(local(selected,{weekday:'long',day:'numeric',month:'long'}))+'</h2>'+panel+'</section></div><section class="panel pp-month"><h2>Termíny v tomto měsíci</h2>'+(monthList.length ? '<p>Vyberte termín pro podrobnosti. Na počítači jej můžete přesunout přetažením na den v kalendáři.</p>'+monthList.map(e=>'<button type="button" draggable="true" data-drag="'+esc(e.id)+'" data-pick="'+esc(e.date)+'" class="pp-row"><b>'+esc(local(e.date,{day:'numeric',month:'numeric'}))+'</b><span>'+esc(e.title)+'<small>'+esc(modName(e.moduleId))+'</small></span><i aria-hidden="true">↗</i></button>').join(''):'<p>Vyberte v kalendáři den a přidejte první termín.</p>')+'</section></div>';
  }
  function bind(root,events,modules,cb) {
    const wrap = root.querySelector('.pp-planner'); if(!wrap) return;
    const refresh = (selector) => {
      const host = wrap.parentNode;
      const anchor = document.createElement('div'); anchor.innerHTML = render(events,modules);
      wrap.replaceWith(anchor.firstElementChild); focus = selector; bind(host,events,modules,cb);
    };
    if(focus){const el=wrap.querySelector(focus);focus=null;el?.focus({preventScroll:true});}
    function choose(date) {selected=date;month=ym(date);editor=false;editId=null;}
    wrap.onclick = event => {
      const b = event.target.closest('button'); if(!b || !wrap.contains(b))return;
      const {pp,date,pick,module,edit} = b.dataset;
      if(module){cb.open(module);return;}
      if(date||pick){choose(date||pick);refresh(pick?'.pp-detail button':'[data-date="'+date+'"]');return;}
      if(edit){editId=edit;editor=true;refresh('[name="date"]');return;}
      if(!pp)return;
      if(pp==='next'||pp==='prev')stepMonth(pp==='next'?1:-1);
      if(pp==='today')choose(today);
      if(pp==='cancel'){editor=false;editId=null;}
      if(pp==='add'){editId=null;editor=true;}
      refresh(pp==='add'?'[data-pp-form] select[data-pick-options]':pp==='cancel'?'[data-pp="add"]':'[data-pp="'+pp+'"]');
    };
    wrap.querySelector('[data-pp-year]').onchange=e=>{const d=read(month+'-01');d.setFullYear(+e.target.value+(d.getMonth()<8?1:0));choose(iso(d));refresh('[data-pp-year]');};
    wrap.onsubmit = e => {
      if(!e.target.matches('[data-pp-form]'))return; e.preventDefault();
      const f=e.target, title=f.elements.title.value.trim(), date=f.elements.date.value, moduleId=f.elements.moduleId.value;
      if(!title){f.elements.title.setCustomValidity('Doplňte název termínu.');f.elements.title.reportValidity();f.elements.title.oninput=()=>f.elements.title.setCustomValidity('');return;}
      if(!f.reportValidity()||!modules.some(m=>m.id===moduleId))return;
      const id=editId || (globalThis.crypto?.randomUUID?.() || 'pp-'+Date.now()+'-'+Math.random().toString(36).slice(2));
      const record={id,date,moduleId,title}; const next=editId ? events.map(x=>x.id===id?record:x) : [...events,record];
      choose(date);focus='[data-pp="add"]';cb.save(next);
    };
    wrap.ondragstart = e=>{const src=e.target.closest('[data-drag]');if(src){e.dataTransfer.setData('application/x-ivp-plan',src.dataset.drag);e.dataTransfer.effectAllowed='move';}};
    wrap.ondragover=e=>{if(e.target.closest('[data-date]')&&e.dataTransfer.types.includes('application/x-ivp-plan')){e.preventDefault();e.dataTransfer.dropEffect='move';}};
    wrap.ondrop=e=>{const date=e.target.closest('[data-date]')?.dataset.date;const id=e.dataTransfer.getData('application/x-ivp-plan');if(!date||!events.some(x=>x.id===id))return;e.preventDefault();choose(date);focus='[data-date="'+date+'"]';cb.save(events.map(x=>x.id===id?{...x,date}:x));};
  }
  window.PLAN={render,bind,sample:samples};
})();
