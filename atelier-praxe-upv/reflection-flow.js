'use strict';
window.IVPREF = (() => {
  const phaseIds = ['ivp','group','guided','micro','continuous','reflection'];
  const blockIds = [...phaseIds,'nacvik','adaptio','ss','kurzy'];
  const allowed = ['student','mentor','ivp'];
  const labels = {draft:'Rozepsáno',submitted:'Čeká na IVP',returned:'K doplnění',confirmed:'Uzavřeno s IVP'};
  const fallbackQuestions = ['Který okamžik si chcete zapamatovat?','Co jste se díky němu naučili?','Co konkrétně zkusíte příště?'];
  const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const id = () => 'rf-'+(globalThis.crypto?.randomUUID?.() || Date.now().toString(36)+'-'+Math.random().toString(36).slice(2));
  const localDate = (d=new Date()) => [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
  const displayDate = iso => {
    const date = new Date((iso || '').length===10?iso+'T12:00:00':iso);
    return Number.isNaN(date.getTime())?'':date.toLocaleDateString('cs-CZ');
  };
  const rows = (ctx,p) => ctx.db[p]?.reflections || [];
  const canSee = (ctx,p) => allowed.includes(ctx.role) && ctx.people.some(v=>v.id===p) && (ctx.role!=='student'||p===ctx.who) && (!ctx.canSee||ctx.canSee(p));
  const history = r => Array.isArray(r.history)?r.history:[];
  const statusBadge = s => '<span class="rf-status rf-'+esc(s)+'">'+esc(labels[s])+'</span>';
  const blockName = block => window.BLOCKS.get(block)?.title || block;
  const route = (block,rowId) => rowId?'reflexe/'+encodeURIComponent(rowId):phaseIds.includes(block)?'praxe/'+block:block;
  function readable(ctx,p,row) {
    if(!canSee(ctx,p) || !blockIds.includes(row.blockId) || !Object.hasOwn(labels,row.status))return null;
    if(ctx.role==='student')return row;
    if(row.status==='draft')return null;
    // A student may save a revised draft while the coordinator still sees the last submitted version.
    const sent=history(row).filter(event=>event.type==='submitted').at(-1);
    return sent?{...row,topic:sent.topic||row.topic,observation:sent.observation,meaning:sent.meaning,next:sent.next,sourceId:sent.sourceId??row.submittedReference??(row.status==='submitted'?row.sourceId:'')}:null;
  }
  function allVisible(ctx) {
    return ctx.people.flatMap(p=>rows(ctx,p.id).map(row=>({p,row:readable(ctx,p.id,row)})).filter(x=>x.row))
      .sort((a,b)=>String(lastAction(b.row,ctx.role)).localeCompare(String(lastAction(a.row,ctx.role))));
  }
  const lastAction = (r,role) => role==='student'?r.updatedAt:history(r).at(-1)?.at;
  function sourceChoices(ctx,p,block) {
    const user=ctx.db[p], records=phaseIds.includes(block)?(user.records||[]).filter(r=>r.moduleId===block):(user.tools?.[block]||[]);
    const options=[{value:'block',topic:blockName(block),sourceId:'',activityId:''}];
    (window.BLOCKS.get(block)?.activities||[]).forEach(a=>options.push({value:'a:'+a.id,topic:a.title,activityId:String(a.id),sourceId:''}));
    records.slice().reverse().forEach(r=>{
      const current=options.find(o=>o.activityId!==''&&String(r.title||'').includes(o.topic));
      options.push({value:'r:'+r.id,topic:String(r.title||'Záznam ze dne '+displayDate(r.date)).slice(0,220),sourceId:r.id,activityId:r.activityId??current?.activityId??'',record:r});
    });
    return options;
  }
  const questions = (block,activity) => {
    const metadata=window.BLOCKS.get(block);
    return metadata?.activities?.find(a=>String(a.id)===String(activity))?.prompts || metadata?.prompts || fallbackQuestions;
  };
  function option(value,label,current) {
    return '<option value="'+esc(value)+'"'+(String(value)===String(current)?' selected':'')+'>'+esc(label)+'</option>';
  }
  function selection(row,options,activity) {
    if(row?.sourceId) {
      const source=options.find(o=>o.sourceId===row.sourceId);
      if(source)return source;
    }
    return options.find(o=>o.value==='a:'+String(row?.activityId || activity)) || options[0];
  }
  const bodyLines = r => [
    ['Situace',r.observation],['Co mi ukázala',r.meaning],['Co udělám příště',r.next]
  ].filter(([,v])=>v).map(([k,v])=>'<div><dt>'+esc(k)+'</dt><dd>'+esc(v)+'</dd></div>').join('');
  function historyView(r) {
    if(!history(r).length)return '';
    return '<details class="rf-history"><summary>Průběh předání ('+history(r).length+')</summary><ol>'+history(r).map(event=>{
      const title={submitted:'Student předal reflexi',returned:'IVP požádalo o doplnění',confirmed:'IVP uzavřelo reflexi'}[event.type];
      const extra=event.type==='submitted'?'<details><summary>Předané znění</summary><dl class="rf-body">'+bodyLines(event)+'</dl></details>':'<p>'+esc(event.message)+'</p>';
      return '<li><strong>'+esc(title)+'</strong> · '+esc(displayDate(event.at))+extra+'</li>';
    }).join('')+'</ol></details>';
  }
  function sourcePreview(chosen) {
    const r=chosen?.record;
    if(!r)return '';
    const note=r.reflection || Object.values(r.fields||{}).filter(Boolean)[0] || '';
    return '<details class="rf-source"><summary>Nahlédnout do mého záznamu</summary><p>'+esc(note||r.title)+'</p>'+(r.nextStep?'<p><strong>Můj původní další krok</strong><br>'+esc(r.nextStep)+'</p>':'')+
      ((note||r.nextStep)?'<button type="button" class="secondary" data-rf-copy>Převzít do prázdných polí</button>':'')+'</details>';
  }
  function responseFields(block,selected,values) {
    const q=questions(block,selected.activityId),opts=Napovedy.reflection(block,selected.activityId);
    return ['observation','meaning','next'].map((k,i)=>Volba.field({label:q[i],name:k,value:values[k]||'',items:opts[i],required:true})).join('');
  }
  function form(ctx,p,block,row,activity,sourceId) {
    const choices=sourceChoices(ctx,p,block),selected=selection(row||{sourceId},choices,activity);
    return '<form class="fields rf-form" data-rf-compose data-source-key="'+esc(selected.value)+'" data-owner="'+esc(p)+'" data-block="'+esc(block)+'" data-id="'+esc(row?.id)+'"><label>Čeho se reflexe týká<select name="source">'+choices.map(o=>option(o.value,o.record?o.topic+' · '+displayDate(o.record.date):o.topic,selected.value)).join('')+'</select></label><div data-rf-source>'+sourcePreview(selected)+'</div>'+
      '<div class="rf-picks" data-rf-answers>'+responseFields(block,selected,row||{})+'</div>'+
      '<div class="actions"><button type="submit" class="primary" value="submit">'+(row?.status==='returned'?'Znovu předat koordinátorovi':'Předat koordinátorovi IVP')+'</button><button class="secondary" type="submit" value="draft" formnovalidate>Uložit rozepsané</button></div><small>Rozepsanou reflexi vidíte jen vy. Předání ji zpřístupní koordinátorovi v této místní pracovní kopii. E-mail se neposílá.</small><p class="notice" data-rf-error role="alert" hidden></p></form>';
  }
  function submittedSource(ctx,p,row) {
    if(ctx.role==='student'||!row.sourceId||!phaseIds.includes(row.blockId))return '';
    const source=(ctx.db[p]?.records||[]).find(r=>r.id===row.sourceId&&r.moduleId===row.blockId);
    const visible=window.PRACTICE?.readable(source,ctx.role);
    if(!visible)return '<p class="muted">Navazující záznam zatím není předaný k rozboru. Zde posuzujete předanou reflexi.</p>';
    return '<details class="rf-linked-source"><summary>Podklad k této reflexi · '+esc(visible.title)+'</summary>'+PRACTICE.recordBody(visible)+'<button type="button" class="secondary" data-rf-open-record data-owner="'+esc(p)+'" data-module="'+esc(row.blockId)+'" data-record="'+esc(source.id)+'">Otevřít záznam a jeho rozbor →</button></details>';
  }
  function thread(ctx,p,row) {
    const answer=history(row).filter(e=>['returned','confirmed'].includes(e.type)).at(-1);
    const editable=ctx.role==='student'&&['draft','returned'].includes(row.status);
    const exchange=window.RFX?.item(row,ctx.role,p)||'';
    return '<div class="rf-thread" data-rf-row="'+esc(row.id)+'">'+submittedSource(ctx,p,row)+
      (answer?'<div class="rf-answer"><strong>'+esc(answer.type==='returned'?(row.status==='returned'?'Koordinátor IVP žádá o doplnění':'Poslední podnět koordinátora k doplnění'):'Zpětná vazba koordinátora IVP')+'</strong><p>'+esc(answer.message)+'</p></div>':'')+
      (editable?form(ctx,p,row.blockId,row):'<dl class="rf-body">'+bodyLines(row)+'</dl>')+
      (ctx.role==='ivp'&&row.status==='submitted'?'<form class="fields rf-review" data-rf-review data-owner="'+esc(p)+'" data-id="'+esc(row.id)+'">'+Volba.field({label:'Moje odpověď studentovi',name:'message',items:Napovedy.feedback,required:true})+'<div class="actions"><button class="primary" value="confirmed">Uzavřít se zpětnou vazbou</button><button class="secondary" value="returned">Vrátit k doplnění</button></div><p class="notice" data-rf-error role="alert" hidden></p></form>':'')+
      historyView(row)+exchange+'</div>';
  }
  function rowCard(ctx,p,row,open) {
    return '<details class="rf-row" data-rf-card="'+esc(row.id)+'"'+(open?' open':'')+'><summary><span><strong>'+esc(row.topic||blockName(row.blockId))+'</strong><small>'+esc(p.name)+' · '+esc(blockName(row.blockId))+' · '+esc(displayDate(lastAction(row,ctx.role)))+'</small></span>'+statusBadge(row.status)+'</summary>'+thread(ctx,p.id,row)+'</details>';
  }
  function block(blockId,ctx,opts={}) {
    if(!canSee(ctx,ctx.who)||!blockIds.includes(blockId))return '';
    const peer=ctx.people.find(p=>p.id===ctx.who);
    const relevant=allVisible(ctx).filter(x=>x.p.id===peer.id&&x.row.blockId===blockId);
    const target=ctx.role==='student', composing=target&&opts.compose;
    return '<section class="rf-section" data-rf-widget="block" data-block="'+esc(blockId)+'"><div class="rf-heading"><div><small class="eyebrow">Student a koordinátor IVP</small><h2>Reflexe bloku</h2></div><a href="#reflexe" class="text-btn">'+(target?'Moje reflexe':'Přehled reflexí')+' →</a></div>'+
      (target?'<p>Vyberte situaci nebo svůj uložený zápis. Zvolte postřeh a další krok, případně je doplňte vlastními slovy. Odpověď koordinátora najdete u této reflexe.</p><details class="rf-new"'+(composing?' open':'')+'><summary>Vyplnit reflexi</summary>'+form(ctx,peer.id,blockId,null,opts.activityId,opts.sourceId)+'</details>':'')+
      (relevant.length?relevant.map(x=>rowCard(ctx,x.p,x.row,opts.focus===x.row.id)).join(''):target?'':'<p>Student zatím nepředal reflexi tohoto bloku.</p>')+'</section>';
  }
  function practiceHistory(ctx) {
    if(ctx.role!=='student')return [];
    return (ctx.practiceRecords?.()||[]).filter(r=>phaseIds.includes(r.moduleId)).map(r=>{
      const fields=Object.entries(r.fields||{}).filter(([k,v])=>typeof v==='string'&&v.trim()&&/rozbor|reflex|vysvětlení|příště|odnáším|změnilo|doporučení|další krok|vyzkoušet/i.test(k));
      if(r.reflection&&!fields.some(([,v])=>v===r.reflection))fields.push(['Moje reflexe',r.reflection]);
      if(r.nextStep)fields.push(['Další krok',r.nextStep]);
      return fields.length?{date:r.date,status:r.status||'draft',blockId:r.moduleId,html:'<article class="rf-row"><small>'+esc(blockName(r.moduleId))+' · '+esc(displayDate(r.date))+' · Reflexe v archu</small><h3>'+esc(r.title||'Záznam z praxe')+'</h3><dl class="rf-body">'+fields.map(([k,v])=>'<div><dt>'+esc(k.replace(/\s*\[f[^\]]+\]$/,''))+'</dt><dd>'+esc(v)+'</dd></div>').join('')+'</dl><a class="secondary" href="#'+esc(ctx.recordRoute(r))+'">Otevřít původní arch →</a></article>'}:null;
    }).filter(Boolean);
  }
  function studentStart(){return '<div class="rf-start"><h3>Po praxi otevřete svůj arch a doplňte reflexi</h3><p>Uložené reflexe z archů i samostatné reflexe najdete níže podle data. Stejnou zkušenost nemusíte zapisovat dvakrát.</p><div class="rf-practice-links">'+phaseIds.map((k,i)=>'<a href="#praxe/'+k+'"><strong>0'+(i+1)+'</strong> '+esc(blockName(k))+' →</a>').join('')+'</div><details><summary>Chci zapsat další samostatnou reflexi</summary><p>Například po rozhovoru s mentorem. Vyberte praxi:</p>'+phaseIds.map(k=>'<p><a href="#reflexe/nova/'+k+'">'+esc(blockName(k))+' →</a></p>').join('')+'</details><details><summary>Jak reflexi nadiktovat bez placeného přepisu</summary><p>Otevřete textové pole v archu. Ve Windows stiskněte Win + H; na telefonu použijte mikrofon klávesnice. Přepis zkontrolujte a arch uložte. Nástroj neúčtuje přepis ani neukládá zvuk.</p><p>Dostupnost závisí na zařízení a jazyku. Diktování může zpracovávat hlas online u poskytovatele systému. Neuvádějte jména ani citlivé údaje žáků.</p></details><aside class="empty"><strong>Kde se historie uchovává?</strong><p>Uložené záznamy zůstávají v tomto prohlížeči a profilu i po zavření stránky. Nejde o zálohu na serveru: smazání dat prohlížeče je odstraní a na jiném zařízení se samy neobjeví.</p><a href="#portfolio">Stáhnout portfolio pro vlastní archiv →</a></aside></div>';}
  function queue(ctx,opts={}) {
    if(!allowed.includes(ctx.role))return '';
    const picks=allVisible(ctx),student=ctx.role==='student', person=opts.person || '',state=opts.state || '', block=opts.block || '';
    const available=picks.filter(x=>(!person||x.p.id===person)&&(!state||x.row.status===state)&&(!block||x.row.blockId===block));
    const filters='<div class="rf-filters">'+(!student?'<label>Studující<select data-rf-filter="person">'+option('','Všichni',person)+ctx.people.filter(p=>canSee(ctx,p.id)).map(p=>option(p.id,p.name,person)).join('')+'</select></label>':'')+
      '<label>Blok<select data-rf-filter="block">'+option('','Všechny bloky',block)+blockIds.map(k=>option(k,blockName(k),block)).join('')+'</select></label><label>Stav<select data-rf-filter="state">'+option('','Všechny stavy',state)+Object.entries(labels).filter(([k])=>student||k!=='draft').map(([v,l])=>option(v,l,state)).join('')+'</select></label></div>';
    const focusExists=picks.some(x=>x.row.id===opts.focus);
    const combined=[...available.map(x=>({date:x.row.date,html:rowCard(ctx,x.p,x.row,x.row.id===opts.focus)})),...practiceHistory(ctx).filter(r=>(!block||r.blockId===block)&&(!state||r.status===state))].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
    return '<section class="rf-section" data-rf-widget="queue"><div class="rf-heading"><div><small class="eyebrow">'+(student?'Moje praxe':'Pedagogické praxe')+'</small><h2 tabindex="-1">'+(student?'Moje reflexe':ctx.role==='ivp'?'Reflexe pro koordinátora IVP':'Reflexe mých studentů')+'</h2></div></div><p>'+
      (student?'Historie vašich uložených reflexí ze všech praxí — z pracovních archů i samostatných zápisů.':ctx.role==='ivp'?'Otevřete předanou reflexi a napište studentovi, o co se může opřít při další praxi.':'Zde si můžete přečíst předané reflexe svých studentů a odpovědi koordinátora.')+'</p>'+
      (student?studentStart():'')+(opts.focus&&!focusExists?'<p class="notice">Tato reflexe není v tomto profilu dostupná.</p>':'')+filters+
      '<div class="rf-list">'+(combined.length?combined.map(x=>x.html).join(''):'<p class="empty">'+(picks.length?'Pro tento výběr tu žádná reflexe není.':'Zatím tu není žádná '+(student?'uložená':'předaná')+' reflexe.')+'</p>')+'</div>'+
      '<details class="rf-file-transfer"><summary>Předání souborem · odpověď od koordinátora</summary>'+(window.RFX?.inbox(ctx.role)||'')+'</details>'+'</section>';
  }
  function portfolio(ctx) {
    return allVisible(ctx).filter(x=>x.p.id===ctx.who).map(({row})=>{
      const exchanges=history(row).filter(e=>e.type!=='submitted');
      const fields={'Blok':blockName(row.blockId),'Pozorovaná situace':row.observation,'Stav reflexe':labels[row.status]};
      if(exchanges.length>1)fields['Dřívější zpětná vazba']=exchanges.slice(0,-1).map(e=>displayDate(e.at)+' · '+e.message).join('\n');
      return {id:row.id,isBlockReflection:true,sourceId:row.sourceId,blockId:row.blockId,title:'Reflexe · '+row.topic,status:row.status,date:row.date,fields,reflection:row.meaning,nextStep:row.next,feedback:exchanges.at(-1)?.message||'',timeline:[]};
    });
  }
  function bind(root,ctx) {
    if(!allowed.includes(ctx.role))return;
    for(const box of root.querySelectorAll('[data-rf-widget]')) {
      if(box.dataset.rfBound)continue;
      box.dataset.rfBound='true';
      function repaint(focus) {
        const options={focus};
        box.querySelectorAll('[data-rf-filter]').forEach(s=>options[s.dataset.rfFilter]=s.value);
        const view=box.dataset.rfWidget==='queue'?queue(ctx,options):block(box.dataset.block,ctx,options);
        const wrapper=document.createElement('div');
        wrapper.innerHTML=view;
        const replacement=wrapper.firstElementChild;
        if(!replacement)return;
        box.replaceWith(replacement);
        bind(root,ctx);
        if(focus) {
          const card=[...replacement.querySelectorAll('[data-rf-card]')].find(node=>node.dataset.rfCard===focus);
          if(card)card.querySelector('summary').focus();
          else replacement.querySelector('h2')?.focus();
        }else if(document.activeElement===document.body)replacement.querySelector('[data-rf-filter]')?.focus();
      }
      const draftsByForm=new WeakMap();
      function choicesFor(f) {
        if(ctx.role!=='student'||f.dataset.owner!==ctx.who||!canSee(ctx,ctx.who))return null;
        return sourceChoices(ctx,ctx.who,f.dataset.block).find(o=>o.value===f.elements.source.value);
      }
      box.addEventListener('change',event=>{
        if(event.target.matches('[data-rf-filter]')){repaint();return;}
        const f=event.target.closest('[data-rf-compose]');
        if(!f||event.target!==f.elements.source)return;
        const chosen=choicesFor(f);
        if(!chosen)return;
        const drafts=draftsByForm.get(f)||new Map();
        drafts.set(f.dataset.sourceKey,Object.fromEntries(['observation','meaning','next'].map(k=>[k,f.elements[k].value])));
        draftsByForm.set(f,drafts);f.dataset.sourceKey=chosen.value;
        const values=drafts.get(chosen.value)||{};
        f.querySelector('[data-rf-answers]').innerHTML=responseFields(f.dataset.block,chosen,values);
        f.querySelector('[data-rf-source]').innerHTML=sourcePreview(chosen);
      });
      box.addEventListener('click',event=>{
        const source=event.target.closest('[data-rf-open-record]');
        if(source){if(canSee(ctx,source.dataset.owner))ctx.openRecord?.(source.dataset.owner,source.dataset.module,source.dataset.record);return;}
        const b=event.target.closest('[data-rf-copy]');if(!b)return;
        const f=b.closest('[data-rf-compose]'), item=choicesFor(f)?.record;
        if(!item)return;
        const values={observation:f.elements.observation.value || String(item.reflection||Object.values(item.fields||{}).find(Boolean)||'').slice(0,1600),meaning:f.elements.meaning.value,next:f.elements.next.value||String(item.nextStep||'').slice(0,1600)};
        f.querySelector('[data-rf-answers]').innerHTML=responseFields(f.dataset.block,choicesFor(f),values);
        f.elements.meaning.closest('fieldset').querySelector('input[type=radio],select')?.focus();
      });
      box.addEventListener('submit',event=>{
        const f=event.target;
        if(!f.matches('[data-rf-compose],[data-rf-review]'))return;
        event.preventDefault();
        const owner=f.dataset.owner,action=event.submitter?.value, list=rows(ctx,owner);
        if(!canSee(ctx,owner))return;
        const old=list.find(r=>r.id===f.dataset.id), clock=new Date(),at=clock.toISOString();
        const val=name=>String(f.elements[name]?.value||'').trim().slice(0,1600);
        const error=msg=>{const node=f.querySelector('[data-rf-error]');node.hidden=false;node.textContent=msg;};
        let record,notice;
        if(f.hasAttribute('data-rf-compose')) {
          const blockId=f.dataset.block, chosen=choicesFor(f), submit=action==='submit';
          if(!chosen||!blockIds.includes(blockId)||(!submit&&action!=='draft')||(f.dataset.id&&!old)||(old&&(!['draft','returned'].includes(old.status)||old.blockId!==blockId)))return;
          const observation=val('observation'),meaning=val('meaning'),next=val('next');
          if(submit&&(!observation||!meaning||!next))return error('Před předáním doplňte odpověď na všechny tři otázky.');
          if(!observation&&!meaning&&!next)return error('Vyberte alespoň jednu možnost nebo přidejte vlastní poznámku.');
          const revision=(Number(old?.revision)||0)+(submit?1:0);
          const snapshot={topic:chosen.topic,observation,meaning,next,sourceId:chosen.sourceId,activityId:chosen.activityId};
          record={...old,...snapshot,id:old?.id||id(),blockId,sourceId:chosen.sourceId,activityId:chosen.activityId,status:submit?'submitted':(old?.status||'draft'),date:old?.date||localDate(clock),updatedAt:at,revision,
            history:submit?[...history(old||{}),{type:'submitted',at,author:'student',revision,...snapshot}]:history(old||{})};
          if(!submit&&old?.status==='returned')record.submittedReference=old.submittedReference??old.sourceId??'';
          notice=submit?'Reflexe je ve frontě koordinátora v tomto prohlížeči.':'Rozepsaná reflexe je uložená.';
        }else{
          if(ctx.role!=='ivp'||!old||old.status!=='submitted'||!['returned','confirmed'].includes(action))return;
          const message=val('message');
          if(!message)return error('Doplňte prosím krátkou zprávu pro studenta.');
          record={...old,status:action,updatedAt:at,history:[...history(old),{type:action,at,author:'ivp',message,revision:old.revision}]};
          notice=action==='returned'?'Student má reflexi k doplnění.':'Zpětná vazba je uložená u reflexe.';
        }
        const nextRows=old?list.map(r=>r.id===record.id?record:r):[...list,record];
        if(ctx.save(owner,nextRows)===false)return error('Změnu se nepodařilo uložit. Text zůstává ve formuláři.');
        repaint(record.id);ctx.toast?.(notice);
      });
    }
  }
  function seed(studentId) {
    const ema=studentId==='ema';
    if(!ema&&studentId!=='sam')return [];
    const topic=ema?'Instruktáž pro první samostatné měření':'Volba měřidla při druhém pokusu';
    const snapshot={topic,observation:ema?'Po ukázce začaly dvě dvojice měřit, třetí čekala na zopakování prvního kroku.':'Žák nejprve sáhl po pravítku. Když porovnal dva požadované rozměry, sám požádal o posuvné měřítko.',
      meaning:ema?'Teprve první pohyb žáka mi ukázal, jestli bylo zadání srozumitelné.':'Vysvětlení volby mi o porozumění řeklo víc než samotný výsledek měření.',
      next:ema?'Po další ukázce požádám dvojice, aby mi před měřením ukázaly, kde začnou.':'Po příštím měření nechám žáka pojmenovat situaci, kdy by si vybral jiné měřidlo.'};
    const date=ema?'2026-11-11':'2026-11-12', at=date+'T12:00:00.000Z', hist=[{type:'submitted',author:'student',at,revision:1,...snapshot}];
    if(!ema)hist.push({type:'confirmed',author:'ivp',revision:1,at:'2026-11-13T09:00:00.000Z',message:'Zachytil jste, na základě čeho žák změnil rozhodnutí. Do příštího rozboru přineste jeho vlastní vysvětlení volby měřidla.'});
    return [{id:'rf-demo-'+studentId,blockId:ema?'micro':'continuous',sourceId:'demo-'+studentId,activityId:'',date,updatedAt:hist.at(-1).at,status:ema?'submitted':'confirmed',revision:1,history:hist,...snapshot}];
  }
  return {block,queue,bind,portfolio,route,seed};
})();
