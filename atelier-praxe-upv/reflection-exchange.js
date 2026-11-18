'use strict';
window.RFX = (() => {
  const format = 'atelier-praxi.reflexe';
  const maxBytes = 65536;
  const bindings = new WeakMap();
  const encoder = new TextEncoder();
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));

  function requireValue(ok, message) { if (!ok) throw new Error(message); }
  function keys(obj, allowed) {
    requireValue(obj && typeof obj === 'object' && !Array.isArray(obj)
      && Object.keys(obj).length === allowed.length && allowed.every(k=>Object.hasOwn(obj,k)),
      'Soubor má jiné položky, než vyžaduje předání reflexe.');
  }
  function field(value, limit, allowEmpty = false) {
    requireValue(typeof value === 'string' && value.length <= limit && (allowEmpty || value.trim())
      && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value),
      'Některé pole reflexe je prázdné, příliš dlouhé nebo nečitelné.');
  }
  function timestamp(value) {
    requireValue(typeof value==='string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(value)
      && Number.isFinite(Date.parse(value)) && new Date(value).toISOString()===value,
      'V souboru chybí platné datum předání.');
  }
  function validateSubject(packet, ctx) {
    requireValue(packet.format===format && packet.version===1, 'Vyberte soubor reflexe stažený z Ateliéru praxí.');
    requireValue(typeof packet.studentId==='string' && ctx.people.some(p=>p.id===packet.studentId),
      'Tento studentský profil v ukázkové skupině není.');
    requireValue(typeof packet.blockId==='string' && packet.blockId.length<=100 && ctx.validBlock(packet.blockId),
      'Tento blok v Ateliéru není k dispozici.');
    requireValue(typeof packet.id==='string' && /^rf-[a-zA-Z0-9][a-zA-Z0-9._-]{0,100}$/.test(packet.id),
      'Soubor nemá platné číslo reflexe.');
    requireValue(Number.isSafeInteger(packet.revision) && packet.revision>0 && packet.revision<=100000,
      'Soubor nemá platné číslo předání.');
  }
  function validate(packet, ctx) {
    const common=['format','version','kind','studentId','id','blockId','revision'];
    if(packet?.kind==='submission') {
      keys(packet,[...common,'submittedAt','topic','observation','meaning','next']);
      validateSubject(packet,ctx);
      timestamp(packet.submittedAt);
      field(packet.topic,220,true);
      for(const name of ['observation','meaning','next']) field(packet[name],1600);
    } else if(packet?.kind==='response') {
      keys(packet,[...common,'snapshot','status','reviewedAt','message']);
      validateSubject(packet,ctx);
      requireValue(/^[a-f0-9]{64}$/.test(packet.snapshot), 'Chybí vazba na předanou verzi reflexe.');
      requireValue(['returned','confirmed'].includes(packet.status), 'Soubor neobsahuje výsledek rozboru.');
      timestamp(packet.reviewedAt);
      field(packet.message,1600);
    } else throw new Error('Vyberte soubor reflexe nebo odpovědi z Ateliéru praxí.');
    return packet;
  }
  function latest(row, type) {
    return (row.history||[]).slice().reverse().find(h=>h.type===type && h.revision===row.revision);
  }
  function submission(row, studentId) {
    const event=latest(row,'submitted');
    requireValue(event && event.author==='student', 'U této verze chybí záznam o předání koordinátorovi.');
    return {format,version:1,kind:'submission',studentId,id:row.id,blockId:row.blockId,revision:row.revision,
      submittedAt:event.at,topic:event.topic ?? row.topic ?? '',observation:event.observation,
      meaning:event.meaning,next:event.next};
  }
  function signature(packet) {
    // Fixed order also supports files reserialized by a different JSON formatter.
    return JSON.stringify([packet.studentId,packet.id,packet.blockId,packet.revision,packet.submittedAt,
      packet.topic,packet.observation,packet.meaning,packet.next]);
  }
  async function digest(packet) {
    const buffer=await crypto.subtle.digest('SHA-256',encoder.encode(signature(packet)));
    return Array.from(new Uint8Array(buffer),byte=>byte.toString(16).padStart(2,'0')).join('');
  }
  async function make(row, studentId, ctx) {
    if(ctx.role==='student') {
      requireValue(ctx.who===studentId && row.status==='submitted',
        'Přenést lze vlastní reflexi předanou koordinátorovi.');
      return validate(submission(row,studentId),ctx);
    }
    requireValue(ctx.role==='ivp' && ['returned','confirmed'].includes(row.status),
      'Odpověď připraví koordinátor po rozboru reflexe.');
    const event=latest(row,row.status);
    requireValue(event && event.author==='ivp','U této verze chybí odpověď koordinátora.');
    return validate({format,version:1,kind:'response',studentId,id:row.id,blockId:row.blockId,
      revision:row.revision,snapshot:await digest(submission(row,studentId)),status:row.status,
      reviewedAt:event.at,message:event.message},ctx);
  }
  const rowsOf=(ctx,id)=>ctx.db[id]?.reflections||[];
  function makeSubmissionEvent(p) {
    return {type:'submitted',author:'student',at:p.submittedAt,revision:p.revision,
      topic:p.topic,observation:p.observation,meaning:p.meaning,next:p.next};
  }
  function previousRows(ctx,p) {
    requireValue(!ctx.people.some(other=>other.id!==p.studentId && rowsOf(ctx,other.id).some(row=>row.id===p.id)),
      'Toto číslo reflexe v prohlížeči patří jinému studentovi.');
    const rows=rowsOf(ctx,p.studentId);
    return {rows,local:rows.find(row=>row.id===p.id)};
  }
  async function plan(packet,ctx) {
    const p=validate(packet,ctx);
    if(p.kind==='submission') requireValue(ctx.role==='ivp','Tento soubor otevřete v roli Koordinátor IVP.');
    if(p.kind==='response') requireValue(ctx.role==='student' && ctx.who===p.studentId,
      'Odpověď patří jinému profilu. Otevřete ji v původním studentském profilu.');
    const {rows,local}=previousRows(ctx,p);
    requireValue(!local || local.blockId===p.blockId,'Toto číslo reflexe je spojeno s jiným blokem.');
    const update=row=>({rows:local?rows.map(item=>item===local?row:item):[...rows,row]});
    if(p.kind==='submission') {
      if(local && local.revision===p.revision && latest(local,'submitted')) {
        requireValue(signature(submission(local,p.studentId))===signature(p),
          'V této verzi už je uložen jiný obsah. Původní reflexe zůstává uložená.');
        return {notice:'Tuto verzi reflexe už máte ve svém přehledu.'};
      }
      if(local) {
        requireValue(local.status==='returned' && p.revision===local.revision+1,
          'Tuto verzi nelze připojit k dosavadnímu rozboru. Vyberte navazující předání po žádosti o doplnění.');
        const old=submission(local,p.studentId);
        requireValue(['topic','observation','meaning','next'].every(k=>(local[k]||'')===old[k]),
          'V tomto prohlížeči už máte vlastní rozepsané doplnění. Soubor je nepřepíše.');
      }
      const item={...local,id:p.id,blockId:p.blockId,sourceId:local?.sourceId||'',
        date:local?.date||p.submittedAt.slice(0,10),updatedAt:p.submittedAt,topic:p.topic,
        observation:p.observation,meaning:p.meaning,next:p.next,status:'submitted',revision:p.revision,
        history:[...(local?.history||[]),makeSubmissionEvent(p)]};
      return update(item);
    }
    requireValue(local && local.revision===p.revision, 'Tato odpověď nepatří k žádné aktuální předané verzi v tomto profilu.');
    requireValue(await digest(submission(local,p.studentId))===p.snapshot,
      'Odpověď neodpovídá obsahu předané reflexe. Vyberte odpověď k této verzi.');
    if(local.status!=='submitted') {
      const event=latest(local,p.status);
      if(event && event.author==='ivp' && event.at===p.reviewedAt && event.message===p.message)
        return {notice:'Tuto odpověď koordinátora už v reflexi máte.'};
      throw new Error('Tato verze už byla zpracována. Dosavadní odpověď zůstává uložená.');
    }
    return update({...local,status:p.status,updatedAt:p.reviewedAt,history:[...(local.history||[]),
      {type:p.status,author:'ivp',at:p.reviewedAt,message:p.message,revision:p.revision}]});
  }
  function item(row,role,studentId) {
    const isStudent=role==='student' && row.status==='submitted';
    const isReviewer=role==='ivp' && ['returned','confirmed'].includes(row.status);
    if(!(isStudent||isReviewer))return '';
    return '<button class="secondary" type="button" data-rfx-save="'+esc(row.id)+
      '" data-rfx-student="'+esc(studentId)+'">'+(isStudent?'Stáhnout pro koordinátora':'Stáhnout odpověď pro studenta')+'</button>';
  }
  function inbox(role) {
    if(!['student','ivp'].includes(role))return '';
    const student=role==='student';
    return '<details class="area-box" data-rfx-inbox><summary>'+
      (student?'Načíst odpověď koordinátora ze souboru':'Načíst reflexi studenta ze souboru')+
      '</summary><p>'+(student?'Dostal/a jste zpět soubor s odpovědí? Připojte ho ke své odevzdané reflexi.':
        'Pokud student pracuje na jiném zařízení, požádejte ho o soubor stažený z předané reflexe. Po rozboru mu můžete poslat soubor s odpovědí.')+
      '</p><label>Vyberte '+(student?'odpověď':'reflexi')+
      ' z Ateliéru (.json)<input type="file" accept=".json,application/json" data-rfx-file></label>'+
      '<div aria-live="polite" data-rfx-preview></div></details>';
  }
  function download(packet) {
    const url=URL.createObjectURL(new Blob([JSON.stringify(packet,null,2)],{type:'application/json'}));
    const a=document.createElement('a');
    a.href=url;
    a.download='atelier-2026-2027-'+(packet.kind==='submission'?'reflexe':'odpoved')+'-'+packet.studentId+'-'+packet.id+'-v'+packet.revision+'.json';
    document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
  }
  function bind(root,ctx) {
    bindings.get(root)?.abort();
    const controller=new AbortController();
    bindings.set(root,controller);
    const {signal}=controller;
    const incoming=new WeakMap();
    root.addEventListener('change',async event=>{
      const input=event.target.closest('[data-rfx-file]');
      if(!input)return;
      const box=input.closest('[data-rfx-inbox]'),preview=box.querySelector('[data-rfx-preview]'),file=input.files[0];
      const token={};incoming.set(box,token);preview.textContent='';
      if(!file)return;
      try {
        requireValue(file.size>0 && file.size<=maxBytes,'Vyberte soubor jedné reflexe o velikosti do 64 kB.');
        let packet;
        try{packet=JSON.parse(await file.text());}catch{throw new Error('Soubor není čitelný. Vyberte soubor .json stažený z Ateliéru.');}
        const result=await plan(packet,ctx);
        if(signal.aborted || incoming.get(box)!==token)return;
        if(result.notice){preview.textContent=result.notice;return;}
        token.packet=packet;
        const student=ctx.people.find(p=>p.id===packet.studentId);
        const subject=packet.kind==='submission'?packet.topic||packet.observation:
          (rowsOf(ctx,packet.studentId).find(r=>r.id===packet.id)?.topic || 'Odpověď k reflexi');
        preview.innerHTML='<p><strong>'+esc(student.name)+' · '+esc(subject.slice(0,150))+'</strong><br>Verze '+
          packet.revision+' · '+esc(packet.kind==='submission'?'Reflexe k rozboru':packet.status==='confirmed'?'Rozbor uzavřen':'K doplnění')+
          '</p><button type="button" class="primary" data-rfx-import>'+
          (packet.kind==='submission'?'Přidat mezi reflexe k rozboru':'Připojit odpověď k mé reflexi')+'</button>';
      }catch(error){if(!signal.aborted && incoming.get(box)===token)preview.textContent=error.message;}
    },{signal});
    root.addEventListener('click',async event=>{
      const button=event.target.closest('[data-rfx-save],[data-rfx-import]');
      if(!button)return;
      try {
        if(button.hasAttribute('data-rfx-save')) {
          const personId=button.dataset.rfxStudent;
          const row=rowsOf(ctx,personId).find(r=>r.id===button.dataset.rfxSave);
          requireValue(row,'Tato reflexe už není v přehledu.');
          const packet=await make(row,personId,ctx);if(signal.aborted)return;
          download(packet);
          ctx.toast(packet.kind==='submission'?'Stažený soubor předejte koordinátorovi IVP.':'Staženou odpověď předejte studentovi.');
          return;
        }
        const box=button.closest('[data-rfx-inbox]'),packet=incoming.get(box)?.packet;
        if(!packet)return;
        button.disabled=true;
        // Recheck the version immediately before committing; file previews may already be stale.
        const result=await plan(packet,ctx);if(signal.aborted)return;
        if(result.notice){box.querySelector('[data-rfx-preview]').textContent=result.notice;return;}
        const student=ctx.db[packet.studentId],old=student.reflections;
        student.reflections=result.rows;
        if(!ctx.persist()){if(old===undefined)delete student.reflections;else student.reflections=old;button.disabled=false;return;}
        ctx.render();ctx.toast(packet.kind==='submission'?'Reflexe je v přehledu koordinátora k rozboru.':'Odpověď je uložená u vaší reflexe.');
      }catch(error){button.disabled=false;ctx.toast(error.message);}
    },{signal});
  }
  return {item,inbox,bind,make,plan};
})();
