'use strict';
window.PREP = (() => {
  const schools = [
    ['technika','Modelová SOŠ technická','Strojírenství a elektrotechnika'],
    ['remesla','Modelové učiliště řemesel','Truhlářství a stavební obory'],
    ['sluzby','Modelová SOŠ služeb','Gastronomie a služby'],
    ['zahrada','Modelová zahradnická škola','Pěstitelství a krajinná tvorba']
  ];
  const labels = {
    draft:'Výběr školy', coordinator:'Čeká na IVP', returned:'K doplnění', school:'Čeká na školu',
    confirmed:'Škola potvrzena', exhausted:'Obě školy bez místa'
  };
  const checks = [
    ['arrival','Znám místo a čas příchodu.'],
    ['contact','Vím, na koho se ve škole obrátit.'],
    ['plan','Mám domluvený účel návštěvy a co budu sledovat.'],
    ['forms','Mám připravené podklady k zápisu a rozboru.']
  ];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const school = id => schools.find(s=>s[0]===id);
  function state(value){
    const s=value||{};
    return {...s,status:Object.hasOwn(labels,s.status)?s.status:'draft',checks:s.checks||{},declined:Array.isArray(s.declined)?s.declined:[],history:Array.isArray(s.history)?s.history:[]};
  }
  const pick=(val,other)=>val===other?' selected':'';
  const schoolOptions=(value,alternate=false)=>'<option value="">'+(alternate?'Zatím bez náhradní volby':'Vyberte školu')+'</option>'+schools.map(([id,name,field])=>'<option value="'+id+'"'+pick(id,value)+'>'+escape(name+' · '+field)+'</option>').join('');
  const titleOf=id=>school(id)?.[1]||'Nevybráno';
  function preference(s){
    return '<form data-prep="choice" class="panel"><h2>Kde chcete učit?</h2><p>Vyberte pracoviště pro řízenou praxi a napište, čemu se tam chcete věnovat.</p><div class="fields"><label>První volba<select required name="primary">'+schoolOptions(s.primary)+'</select></label><label>Náhradní volba<select name="backup">'+schoolOptions(s.backup,true)+'</select></label><label>Co potřebuji na praxi vyzkoušet<textarea name="focus" rows="2" maxlength="600" placeholder="Např. vedení krátké instruktáže v dílně">'+escape(s.focus)+'</textarea></label></div>'+
      '<p data-error hidden role="status" class="notice"></p><div class="actions"><button class="primary" value="send">Předat volbu koordinátorovi</button><button class="secondary" value="draft" formnovalidate>Uložit rozepsané</button></div></form>';
  }
  function checklist(s){
    const total=checks.filter(([key])=>s.checks[key]).length;
    return '<details class="panel"><summary><strong>Před první návštěvou</strong> · '+total+' ze '+checks.length+'</summary><form data-prep="checklist"><div class="fields"><label>Domluvený den návštěvy<input type="date" name="date" value="'+escape(s.date)+'"></label>'+checks.map(([key,label])=>'<label><input type="checkbox" name="'+key+'"'+(s.checks[key]?' checked':'')+' style="width:auto;min-height:0;margin:0 .5em 0 0"> '+label+'</label>').join('')+'</div><button class="secondary">Uložit přípravu</button></form></details>';
  }
  function summary(s){
    const description={
      draft:'Vyberte školu, která odpovídá vašemu oboru.',
      coordinator:'Koordinátor posoudí volbu pracoviště.',
      returned:'Upravte volbu podle poznámky koordinátora a předejte ji znovu.',
      school:'O přijetí nyní rozhoduje '+titleOf(s.current)+'.',
      confirmed:'Pro tuto praxi vás přijímá '+titleOf(s.current)+'. Domluvte si první návštěvu.',
      exhausted:'Seznamte se s odpověďmi škol a zvolte další pracoviště.'
    };
    const note=s.status==='returned'&&s.comment?'<p><b>Poznámka z IVP</b><br>'+escape(s.comment)+'</p>':'';
    const selection=s.primary?'<p>První volba · '+escape(titleOf(s.primary))+(s.backup?'<br>Náhradní volba · '+escape(titleOf(s.backup)):'')+'</p>':'';
    return '<article class="panel"><span class="tag">'+escape(labels[s.status])+'</span><h2>'+escape(s.status==='confirmed'?titleOf(s.current):'Moje škola')+'</h2><p>'+escape(description[s.status])+'</p>'+selection+(s.focus?'<p><b>Zaměření praxe</b><br>'+escape(s.focus)+'</p>':'')+note+'</article>';
  }
  function coordinator(s){
    if(s.status!=='coordinator')return '';
    const available=[s.primary,s.backup].filter(id=>school(id)&&!s.declined.includes(id));
    return '<form class="panel" data-prep="review"><h3>Posouzení volby IVP</h3><div class="fields"><label>Škola k potvrzení<select name="school">'+available.map(id=>'<option value="'+escape(id)+'">'+escape(titleOf(id))+'</option>').join('')+'</select></label><label>Zpráva studentovi<textarea rows="2" maxlength="600" name="note" placeholder="Při vrácení uveďte, co je třeba upravit."></textarea></label></div><p data-error class="notice" role="status" hidden></p><div class="actions"><button value="approve" class="primary">Schválit volbu a předat škole</button><button value="return" class="secondary">Vrátit s poznámkou</button></div></form>';
  }
  function schoolDecision(s){
    if(s.status!=='school')return '';
    return '<form data-prep="school" class="panel"><h3>Je ve škole místo?</h3><p>'+escape(titleOf(s.current))+' · stanovisko pracoviště k přijetí studenta.</p><label>Poznámka pro studenta a IVP<textarea name="note" rows="2" maxlength="600"></textarea></label><div class="actions"><button value="accept" class="primary">Ano, přijímáme</button><button value="decline" class="secondary">Ne, nemáme místo</button></div></form>';
  }
  function render(value,role='student'){
    const s=state(value);
    const editing=role==='student'&&['draft','returned','exhausted'].includes(s.status);
    const log=s.history.length?'<details class="panel"><summary>Průběh žádosti</summary><ol>'+s.history.map(row=>'<li>'+escape(row)+'</li>').join('')+'</ol></details>':'';
    return '<div class="stack" data-preparation>'+((!editing||s.status!=='draft')?summary(s):'')+(editing?preference(s):'')+(role==='ivp'?coordinator(s):'')+(role==='mentor'?schoolDecision(s):'')+
      (role==='student'&&!editing?checklist(s):'')+log+'<small class="muted">Modelové školy · volbu a odpovědi si vyzkoušíte v rolích tohoto prohlížeče.</small></div>';
  }
  function bind(root,value,role,save){
    const box=root.matches?.('[data-preparation]')?root:root.querySelector('[data-preparation]');
    if(!box)return;
    const s=state(value);
    box.onsubmit=event=>{
      event.preventDefault();
      const f=event.target,action=event.submitter?.value,data=new FormData(f),get=name=>String(data.get(name)||'').trim().slice(0,600);
      const error=msg=>{const node=f.querySelector('[data-error]');if(node){node.hidden=false;node.textContent=msg}};
      const commit=(changes,log)=>save({...s,...changes,history:log?[...s.history,log]:s.history});
      if(f.dataset.prep==='choice'&&role==='student'&&['draft','returned','exhausted'].includes(s.status)){
        const primary=get('primary'),backup=get('backup'),focus=get('focus');
        if(primary&&!school(primary)||backup&&!school(backup)||!primary&&action!=='draft')return error('Vyberte první školu.');
        if(primary&&primary===backup)return error('Pro náhradní volbu vyberte jinou školu.');
        const sending=action==='send';
        commit({primary,backup,focus,current:'',declined:[],status:sending?'coordinator':'draft',comment:''},sending?'Student předal volbu IVP.':null);
      }else if(f.dataset.prep==='review'&&role==='ivp'&&s.status==='coordinator'){
        const note=get('note'),id=get('school');
        if(action==='return'){
          if(!note)return error('Napište, co má student ve volbě změnit.');
          commit({status:'returned',comment:note},'IVP vrátilo žádost k doplnění. '+note);
        }else if(action==='approve'&&school(id)&&[s.primary,s.backup].includes(id)&&!s.declined.includes(id)){
          commit({status:'school',current:id,comment:note},'IVP schválilo předání žádosti škole '+titleOf(id)+'. '+note);
        }
      }else if(f.dataset.prep==='school'&&role==='mentor'&&s.status==='school'){
        const note=get('note');
        if(action==='accept')commit({status:'confirmed'},titleOf(s.current)+' přijímá studenta. '+note);
        else if(action==='decline'){
          const declined=[...s.declined,s.current],other=[s.primary,s.backup].some(id=>school(id)&&!declined.includes(id));
          commit({status:other?'coordinator':'exhausted',current:'',declined},titleOf(s.current)+' nemá volné místo. '+note);
        }
      }else if(f.dataset.prep==='checklist'&&role==='student'){
        commit({date:get('date'),checks:Object.fromEntries(checks.map(([key])=>[key,data.has(key)]))});
      }
    };
  }
  return {render,bind,schoolName:titleOf,statusLabel:id=>labels[id]||labels.draft};
})();
