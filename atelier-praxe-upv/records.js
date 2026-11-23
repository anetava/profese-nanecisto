'use strict';
window.PRACTICE = (() => {
  const statuses = { draft: 'Rozepsáno', submitted: 'Čeká na rozbor', returned: 'K doplnění', confirmed: 'Rozbor uzavřen' };
  const kinds = { theory: 'Teoretická výuka', practical: 'Praktické vyučování', activity: 'Záznam praxe', teaching: 'Vlastní výstup', final: 'Závěrečný výstup' };
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const statusLabel = value => statuses[value] || statuses.draft;
  const isObservation = m => m.id === 'group' || m.id === 'guided';
  const isTeaching = m => m.id === 'micro' || m.id === 'continuous';
  const dateToday = () => { const d = new Date(); return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-'); };
  const formatDate = v => /^\d{4}-\d{2}-\d{2}$/.test(v || '') ? v.split('-').reverse().join('. ') : v || '';
  const pick = (v, w) => v === w ? ' selected' : '';
  const section = (label, text) => text ? '<p><strong>'+esc(label)+'</strong><br>'+esc(text).replace(/\n/g,'<br>')+'</p>' : '';
  const canReview = role => ['mentor','ivp'].includes(role);
  const snapshot = r => Object.fromEntries(['title','date','kind','fields','timeline','reflection','nextStep','competency','competencyEvidence'].map(k=>[k,structuredClone(r[k]??(['fields'].includes(k)?{}:k==='timeline'?[]:''))]));
  function readable(r,role='student') {
    if(!r || !Object.hasOwn(statuses,r.status))return null;
    if(role==='student')return r;
    if(!canReview(role)||r.status==='draft')return null;
    return r.status==='returned'&&r.submittedVersion?{...r,...snapshot(r.submittedVersion)}:r;
  }
  function nextAction(r,context={}) {
    const reflection=(context.reflections||[]).find(x=>x.sourceId===r.id&&x.blockId===r.moduleId);
    const href=reflection?'reflexe/'+encodeURIComponent(reflection.id):'reflexe/nova/'+r.moduleId+'/zaznam/'+encodeURIComponent(r.id);
    const text={draft:'Záznam zatím vidíte jen vy. Až bude hotový, předejte jej k rozboru.',submitted:'Záznam čeká na rozbor. Zpětná vazba se objeví tady i ve vašem portfoliu.',returned:'Doplňte záznam podle zpětné vazby a znovu jej předejte k rozboru.',confirmed:'Rozbor tohoto záznamu je uzavřený. Doklad i zpětná vazba jsou ve vašem portfoliu.'}[r.status];
    return '<aside class="record-next record-next-'+r.status+'"><strong>'+esc(text)+'</strong>'+(['submitted','confirmed'].includes(r.status)?'<div class="actions"><a class="secondary" href="#'+esc(href)+'">'+(reflection?'Otevřít navazující reflexi':'Navázat reflexí pro IVP')+' →</a><a class="text-btn" href="#portfolio">Moje portfolio →</a></div>':'')+'</aside>';
  }

  function recordBody(r) {
    const skill=(window.AREAS||[]).flatMap(area=>area.skills||[]).find(item=>item.code===r.competency);
    const competency=skill?r.competency+' · '+skill.name:r.competency;
    const answers = Object.entries(r.fields || {}).map(([label,val])=>section(label,val)).join('');
    const timeline = (r.timeline || []).map(row=>'<li>'+[row.time,row.event,row.pupils,row.note].filter(Boolean).map(esc).join(' · ')+'</li>').join('');
    const review = Object.entries(r.review||{}).map(([label,val])=>section(label,val)).join('');
    return '<div class="record-body">'+section('Datum',formatDate(r.date))+section('Druh záznamu',kinds[r.kind])+answers+
      (timeline ? '<h4>Průběh hodiny</h4><ol>'+timeline+'</ol>' : '')+section('Moje reflexe',r.reflection)+
      section('Můj další krok',r.nextStep)+section('Vazba na kompetenci',competency)+review+section('Zpětná vazba',r.feedback)+COMPUI.record(r)+'</div>';
  }

  function progress(m, rows) {
    if (!isObservation(m) && m.id!=='continuous') return '';
    const completed = rows.filter(r=>['submitted','confirmed','returned'].includes(r.status));
    if (m.id==='continuous') return '<p class="muted">Zapsané výstupy · vlastní '+completed.filter(r=>r.kind==='teaching').length+' · závěrečné '+completed.filter(r=>r.kind==='final').length+'</p>';
    return '<p class="muted">Předané záznamy (nejde o potvrzení splnění praxe) · teoretická výuka '+completed.filter(r=>r.kind==='theory').length+' z '+m.observationTargets.theory+' · praktické vyučování '+completed.filter(r=>r.kind==='practical').length+' z '+m.observationTargets.practice+'</p>';
  }

  function render(m, records=[], role='student', context={}) {
    const student = role==='student';
    const recordsToShow = records.map(r=>readable(r,role)).filter(Boolean).sort((a,b)=>(b.date || '').localeCompare(a.date || ''));
    const rows = recordsToShow.map(r=>{
      const editable = student && ['draft','returned'].includes(r.status);
      return '<details class="panel" data-record-id="'+esc(r.id)+'"><summary><b>'+esc(r.title || 'Rozepsaný záznam')+'</b> · '+esc(formatDate(r.date))+' <span class="pill">'+esc(statusLabel(r.status))+'</span></summary>'+
        recordBody(r)+(student?nextAction(r,context):'')+(editable ? '<button class="secondary" type="button" data-rec-edit="'+esc(r.id)+'">'+(r.status==='returned'?'Doplnit podle zpětné vazby':'Pokračovat v záznamu')+'</button>' : '')+
        (canReview(role) && r.status==='submitted' ? reviewForm(m,r,role) : '')+(canReview(role)&&['submitted','confirmed'].includes(r.status)?COMPUI.review(r):'')+'</details>';
    }).join('');
    return '<section class="stack" data-practice-records><div class="section-head"><h2>'+ (student?'Moje záznamy':'Záznamy k rozboru')+'</h2>'+
      (student ? '<button class="primary" type="button" data-rec-new>'+ (isObservation(m)?'Zapsat náslech':isTeaching(m)?'Zapsat výstup':'Přidat záznam')+'</button>' : '')+'</div>'+
      progress(m, recordsToShow)+'<div data-rec-editor></div>'+(rows || '<p class="empty">'+(student?'Založte první záznam. Rozepsanou práci můžete uložit a vrátit se k ní.':'Student zatím nepředal záznam k rozboru.')+'</p>')+'</section>';
  }

  function timelineRow(row={}) {
    return '<fieldset data-time-row><legend>Okamžik z hodiny</legend><div class="fields">'+[
      ['time','Čas nebo minuta','např. 8:15'],['event','Činnost učitele','Jakou otázku učitel položil?'],['pupils','Činnost žáků','Co žáci udělali nebo řekli?'],['note','Poznámka k rozboru','Co pomohlo porozumění?']
    ].map(([key,title,hint])=>Volba.field({label:title,moment:key,items:Napovedy.moment[key],value:row[key]||'',hint:key==='time'?'Vyberte část hodiny nebo doplňte přesnou minutu.':''})).join('')+'</div></fieldset>';
  }

  function editor(m,r) {
    const observed = isObservation(m);
    const options = observed ? ['theory','practical'] : m.id==='continuous' ? ['teaching','final'] : ['activity'];
    const hints=Napovedy.packs[m.id];
    const fieldEditors=(m.fields||[]).map((f,i)=>Volba.field({label:f.label,answer:i,items:Array.isArray(m.schoolOptions)&&['Škola, obor a třída','Škola a její vedení'].includes(f.label)?m.schoolOptions:Napovedy.fields[f.label],value:r.fields?.[f.label]||'',hint:f.hint})).join('');
    const areas = (window.AREAS||[]).map(a=>'<optgroup label="'+esc(a.name)+'">'+(a.skills||[]).map(s=>'<option value="'+esc(s.code)+'"'+pick(r.competency,s.code)+'>'+esc(s.code+' · '+s.name)+'</option>').join('')+'</optgroup>').join('');
    return '<form class="panel stack" data-rec-form data-id="'+esc(r.id)+'"><h3>'+ (r.id?'Upravit záznam':'Nový záznam')+'</h3>'+
      (r.status==='returned' ? '<div class="notice">'+section('Co doplnit',r.feedback)+'</div>' : '')+
      '<p class="form-guide">Vyberte, co odpovídá vaší hodině. U každé volby můžete připsat vlastní detail.</p>'+
      '<div class="record-head-grid"><section class="record-basics"><h4>Údaje o hodině</h4>'+
      Volba.field({label:'Téma',name:'title',max:180,items:hints[0],value:r.title||'',required:true})+
      '<div class="record-date"><label>Datum<input name="date" type="date" value="'+esc(r.date||dateToday())+'"></label>'+
      (options.length>1?'<fieldset class="pick-field"><legend>Druh jednotky</legend><div class="pick-list">'+options.map(k=>'<label class="pick-tile"><input type="radio" name="kind" value="'+k+'" '+(k===(r.kind||options[0])?'checked':'')+'><span>'+kinds[k]+'</span></label>').join('')+'</div></fieldset>':'<input type="hidden" name="kind" value="'+options[0]+'">')+'</div></section>'+
      '<section class="record-ref"><h4>Co si odnáším</h4>'+Volba.field({label:'Moje reflexe',name:'reflection',items:hints[2],value:r.reflection||'',required:true})+
      Volba.field({label:'Můj další krok',name:'nextStep',items:hints[3],value:r.nextStep||''})+'</section></div>'+
      '<details open class="rec-evidence"><summary>Podklady z praxe</summary><p>Zaznamenejte skutečný průběh a vlastní rozbor. Krátké volby jsou nápověda; nenahrazují kompletní náslechový arch, přípravu na hodinu ani požadovaný rozsah závěrečné reflexe.</p><div class="fields">'+fieldEditors+'</div></details>'+
      (observed?'<details class="rec-timeline" '+(r.timeline?.length?'open':'')+'><summary>Časová osa náslechu</summary><p>Ke stejnému okamžiku zachyťte činnost učitele i reakci žáků.</p><div class="stack" data-time-rows>'+(r.timeline?.length?r.timeline:[{}]).map(timelineRow).join('')+'</div><button type="button" class="secondary" data-rec-moment>Přidat další okamžik</button></details>':'')+
      '<div class="fields">'+
      (areas?'<details class="competency-supplement"><summary>Doplnit další vlastní doklad · volitelné</summary><p>Hlavní vazby vznikají automaticky. Tady můžete doplnit zkušenost, kterou ostatní pole nezachytila. Popište vlastní činnost a její výsledek.</p><label>Další kompetence<select name="competency"><option value="">Bez dalšího přiřazení</option>'+areas+'</select></label><p data-competency-hint></p><label>Jak zkušenost vznikla<select name="competencyKind">'+[['plan','Zatím jen plán'],['observed','Pozoroval/a jsem učitele'],['practice','Sám/sama jsem činnost provedl/a'],['reflection','Vlastní analýza a reflexe']].map(([v,t])=>'<option value="'+v+'"'+pick(r.competencyEvidence?.kind||'plan',v)+'>'+t+'</option>').join('')+'</select></label><label>Konkrétní činnost a výsledek<textarea name="competencyText" placeholder="Co jste udělali, co následovalo a kde je doklad?">'+esc(r.competencyEvidence?.text||'')+'</textarea></label></details>':'')+'</div>'+
      '<div class="competency-preview" data-competency-preview></div><p class="notice" data-rec-msg role="status" hidden></p><div class="actions"><button type="submit" class="primary" value="submit">'+(r.status==='returned'?'Znovu předat k rozboru':'Předat k rozboru')+'</button><button type="submit" value="draft" class="secondary" formnovalidate>Uložit rozepsané</button><button type="button" class="secondary" data-rec-close>Zavřít formulář</button></div><small>Předání zpřístupní záznam v pracovním přehledu koordinátora v tomto prohlížeči. E-mail se neposílá.</small></form>';
  }

  function reviewForm(m,r,role) {
    const rubrics = ['Srozumitelnost cíle hodiny','Návaznost metod na cíl',...(r.kind==='theory'?['Otázky vedoucí k porozumění']:['Instruktáž a kontrola samostatné práce žáků']), 'Závěrečné vyhodnocení učení'];
    return '<form class="fields record-review" data-review="'+esc(r.id)+'"><h3>'+(role==='ivp'?'Rozbor záznamu s IVP':'Společný rozbor')+'</h3><p>Zachyťte zpětnou vazbu ke konkrétní práci. Uzavření tohoto záznamu nemění stav celé praxe.</p>'+
      (isTeaching(m)?'<details><summary>Pozorované projevy výuky</summary>'+rubrics.map(label=>'<label>'+esc(label)+'<select data-rubric="'+esc(label)+'">'+['Neposuzováno','Ano','Částečně','Ne'].map(v=>'<option'+pick(v,r.review?.[label])+'>'+v+'</option>').join('')+'</select></label>').join('')+'</details>':'')+
      Volba.field({label:'Zpětná vazba studujícímu',name:'feedback',items:Napovedy.feedback,value:r.feedback||'',required:true})+'<div class="actions"><button class="primary" value="confirm">Uzavřít rozbor</button><button class="secondary" value="return">Vrátit k doplnění</button></div><p class="notice" data-rec-msg role="alert" hidden></p><p class="muted">Splnění předmětu posuzuje IVP podle podmínek příslušné praxe.</p></form>';
  }

  function bind(root,m,records,callbacks) {
    const box = root?.matches?.('[data-practice-records]')?root:root?.querySelector('[data-practice-records]');
    if (!box) return;
    const editorBox = box.querySelector('[data-rec-editor]');
    const student = (callbacks.role || 'student')==='student';
    function formEvidence(f){
      const data=new FormData(f),val=name=>String(data.get(name)||'').trim();
      const r={moduleId:m.id,kind:val('kind'),fields:{},timeline:[],reflection:val('reflection'),nextStep:val('nextStep'),competency:val('competency'),status:'draft',competencyEvidence:{code:val('competency'),kind:val('competencyKind'),text:val('competencyText')}};
      f.querySelectorAll('[data-answer]').forEach(el=>{r.fields[m.fields[Number(el.dataset.answer)].label]=el.value.trim();});
      f.querySelectorAll('[data-time-row]').forEach(row=>{const item={};row.querySelectorAll('[data-moment]').forEach(el=>item[el.dataset.moment]=el.value.trim());r.timeline.push(item);});
      return r;
    }
    function updatePreview(f){const pane=f.querySelector('[data-competency-preview]');if(!pane)return;const r=formEvidence(f);pane.innerHTML=COMPUI.record(r);const hint=f.querySelector('[data-competency-hint]');if(hint)hint.textContent=KRAAU.get(r.competency)?.evidencePrompt||'';}
    box.addEventListener('input',ev=>{const f=ev.target.closest('[data-rec-form]');if(f)updatePreview(f);});
    box.addEventListener('change',ev=>{const f=ev.target.closest('[data-rec-form]');if(f)updatePreview(f);});
    box.onclick = e=>{
      const target = e.target.closest('button');
      if (!target || !student) return;
      if (target.hasAttribute('data-rec-moment')) {
        const rows = box.querySelector('[data-time-rows]');
        rows.insertAdjacentHTML('beforeend', timelineRow());rows.lastElementChild.querySelector('input[type=radio],select')?.focus();
      }
      if (target.hasAttribute('data-rec-close')) {editorBox.replaceChildren();box.querySelector('[data-rec-new]').focus();}
      if (target.hasAttribute('data-rec-new')||target.hasAttribute('data-rec-edit')) {
        const id=target.dataset.recEdit;
        const r=id?records.find(v=>v.id===id):{};
        if (!r || (id && !['draft','returned'].includes(r.status))) return;
        editorBox.innerHTML=editor(m,r);updatePreview(editorBox.querySelector('form'));
        editorBox.querySelector('[data-pick-options] input,select[data-pick-options]')?.focus({preventScroll:true});editorBox.scrollIntoView({block:'start'});
      }
    };
    box.onsubmit = e=>{
      e.preventDefault();
      const f=e.target, data=new FormData(f);
      const val=name=>String(data.get(name)||'').trim();
      const save=items=>{if(callbacks.save(items)===false){const msg=f.querySelector('[data-rec-msg]');if(msg){msg.hidden=false;msg.textContent='Změnu se nepodařilo uložit. Vyplněné údaje zůstávají ve formuláři.';}}};
      if (student && f.matches('[data-rec-form]')) {
        if(!['submit','draft'].includes(e.submitter?.value))return;
        const old=records.find(r=>r.id===f.dataset.id);
        if(f.dataset.id&&!old)return;
        if (old&&!['draft','returned'].includes(old.status))return;
        const submit=e.submitter?.value==='submit';
        const r={...old,id:old?.id || (globalThis.crypto?.randomUUID?.() || 'r'+Date.now().toString(36)+Math.random().toString(36).slice(2)),moduleId:m.id,date:val('date'),kind:val('kind'),title:val('title'),status:submit?'submitted':(old?.status==='returned'?'returned':'draft'),fields:{},timeline:[],reflection:val('reflection'),nextStep:val('nextStep'),competency:val('competency'),feedback:old?.feedback || ''};
        f.querySelectorAll('[data-answer]').forEach(el=>{r.fields[m.fields[Number(el.dataset.answer)].label]=el.value.trim();});
        f.querySelectorAll('[data-time-row]').forEach(row=>{const item={};row.querySelectorAll('[data-moment]').forEach(el=>{item[el.dataset.moment]=el.value.trim()});if(Object.values(item).some(Boolean))r.timeline.push(item);});
        if (submit && (!r.title || !r.date || !r.reflection || (!Object.values(r.fields).some(Boolean) && !r.timeline.length))) {
          const msg=f.querySelector('[data-rec-msg]');msg.hidden=false;msg.textContent='K rozboru doplňte téma, datum, vlastní reflexi a alespoň jeden konkrétní podklad nebo okamžik z hodiny.';msg.scrollIntoView({block:'nearest'});return;
        }
        r.competencyEvidence=formEvidence(f).competencyEvidence;
        r.competencyReview={};
        r.updatedAt=new Date().toISOString();
        if(submit){r.submittedAt=r.updatedAt;r.submittedVersion=snapshot(r);}
        else if(old?.status==='returned'&&!old.submittedVersion)r.submittedVersion=snapshot(old);
        save(old? records.map(v=>v.id===r.id?r:v):[...records,r]);return;
      }
      if(canReview(callbacks.role)&&f.matches('[data-competency-review]')){
        const r=records.find(v=>v.id===f.dataset.competencyReview);
        if(!r||!['submitted','confirmed'].includes(r.status))return;
        const competencyReview={};let invalid=false;
        const eligible=COMPETENCY.links(r).filter(l=>['practice','reflection'].includes(l.kind));
        for(const l of eligible){const verdict=f.querySelector('[data-competency-verdict="'+l.code+'"]')?.value;const note=f.querySelector('[data-competency-note="'+l.code+'"]')?.value.trim();if(!verdict)continue;if(!note){invalid=true;break;}competencyReview[l.code]={verdict,note,reviewerRole:callbacks.role,reviewedAt:new Date().toISOString(),evidenceSignature:COMPETENCY.signature(r,l)};}
        if(invalid){const msg=f.querySelector('[data-rec-msg]');msg.hidden=false;msg.textContent='U každého posouzeného projevu doplňte konkrétní doklad a doporučení.';return;}
        save(records.map(v=>v.id===r.id?{...v,competencyReview}:v));return;
      }
      if (canReview(callbacks.role) && f.matches('[data-review]')) {
        const r=records.find(v=>v.id===f.dataset.review);
        if(!r || r.status!=='submitted' || !val('feedback') || !['confirm','return'].includes(e.submitter?.value))return;
        const review={};f.querySelectorAll('[data-rubric]').forEach(el=>{review[el.dataset.rubric]=el.value});
        save(records.map(v=>v.id===r.id?{...v,submittedVersion:v.submittedVersion||snapshot(v),review,feedback:val('feedback'),reviewedBy:callbacks.role,reviewedAt:new Date().toISOString(),status:e.submitter?.value==='return'?'returned':'confirmed'}:v));
      }
    };
  }
  return { render,bind,recordBody,statusLabel,readable };
})();
