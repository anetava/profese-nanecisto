'use strict';
window.RoleDesk = (() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch =>
    ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[ch]));
  const schoolRoles = new Map(PREP.schools.map(school => ['school-'+school.id, school]));
  const profiles = [...schoolRoles].map(([id,school]) => [id,'Škola · '+school.name.replace(/^Modelov[áé] /,'')]);
  profiles.push(['method','Metodik IVP']);
  const titles = new Map(profiles);
  const title = role => schoolRoles.has(role) ? schoolRoles.get(role).name : titles.get(role) || '';
  const isSpecial = role => titles.has(role);
  const intro = role => role==='method'
    ? 'Sledujte, ve kterých fázích studenti odevzdávají práci a kde ještě čekají na rozbor. Ke každému bloku máte jeho pracovní list.'
    : 'Projděte žádosti předané vaší škole. Student i koordinátor IVP uvidí, zda ho můžete přijmout, a co si má na první návštěvu připravit.';
  const caption = role => role==='method'?'Otevřít metodický přehled →':'Otevřít žádosti naší školy →';
  const links = '<nav class="practice-links" aria-label="Metodická podpora"><a href="#materialy" class="secondary">Pracovní listy ke stažení</a><a href="#sources" class="secondary">Metodiky a sylaby</a></nav>';
  const heading = (label,text,description) => '<header class="subhead"><small class="eyebrow">'+esc(label)+'</small><h1>'+esc(text)+'</h1><p>'+esc(description)+'</p></header>';

  function initialPrep(personId) {
    if(personId==='alex')return {status:'draft'};
    const primary='technika', backup='remesla', schoolName=PREP.schoolName(primary);
    if(personId==='ema')return {status:'coordinator',primary,backup,
      focus:'Chci vyzkoušet krátkou instruktáž a ověřit, jak žáci porozuměli postupu.',history:['Student předal volbu IVP.']};
    if(personId==='sam')return {status:'school',primary,backup,current:primary,
      focus:'Rád povedu část odborné hodiny, při které žáci vybírají vhodné měřidlo.',
      history:['Student předal volbu IVP.','IVP schválilo předání žádosti škole '+schoolName+'.']};
    return {status:'draft'};
  }

  function schoolDashboard(role,db,people) {
    const school=schoolRoles.get(role);
    const waiting=[], accepted=[], declined=[];
    for(const person of people) {
      const prep=db[person.id]?.prep;
      if(!prep)continue;
      if(prep.current===school.id) {
        if(prep.status==='school')waiting.push({person,prep});
        if(prep.status==='confirmed')accepted.push({person,prep});
      }
      const lastReply=(prep.schoolReplies||[]).filter(item=>item.schoolId===school.id).at(-1);
      if(lastReply?.decision==='decline' && (prep.current!==school.id || !['school','confirmed'].includes(prep.status)))declined.push({person,note:lastReply.note});
    }
    const forms=waiting.map(({person,prep})=>'<form class="panel" data-school-request="'+esc(person.id)+'"><small class="eyebrow">Žádost IVP</small><h3>'+esc(person.name)+'</h3>'+
      (prep.focus?'<p><b>Zaměření praxe</b><br>'+esc(prep.focus)+'</p>':'')+
      '<label>Vzkaz studentovi a koordinátorovi <small>(nepovinný)</small><textarea rows="2" name="message" maxlength="600" placeholder="Např. koho se zeptat po příchodu do školy."></textarea></label>'+
      '<div class="actions"><button type="submit" value="accept" class="primary">Přijmout studenta</button><button type="submit" value="decline" class="secondary">Oznámit, že není místo</button></div></form>').join('');
    const acceptedRows=accepted.map(({person,prep})=>{
      const answer=(prep.schoolReplies||[]).filter(item=>item.schoolId===school.id && item.decision==='accept').at(-1);
      return '<div class="overview-row"><div><strong>'+esc(person.name)+'</strong><small>'+esc(prep.focus||'Praxe potvrzena')+'</small>'+
        (answer?.note?'<p>Vzkaz školy · '+esc(answer.note)+'</p>':'')+'</div></div>';
    }).join('');
    return heading('Zástupce cvičné školy',school.name,'Na této stránce vyřídíte přijetí na vaše pracoviště. Vaše odpověď se objeví u žádosti studenta i v přehledu koordinátora IVP.')+
      '<section class="stack" data-school-desk><div class="section-head"><h2>Čeká na odpověď · '+waiting.length+'</h2></div>'+
      (forms||'<p class="empty">Z IVP teď nemáte žádnou žádost k vyřízení.</p>')+
      '<details class="area-box"'+(accepted.length?' open':'')+'><summary>Přijatí na naše pracoviště · '+accepted.length+'</summary>'+
      (acceptedRows||'<p>Sem se zařadí student po vašem potvrzení přijetí.</p>')+'</details>'+
      (declined.length?'<details class="area-box"><summary>Žádosti bez volného místa · '+declined.length+'</summary>'+declined.map(item=>'<p><strong>'+esc(item.person.name)+'</strong>'+ (item.note?' · '+esc(item.note):'')+'</p>').join('')+'</details>':'')+
      '</section>'+links;
  }

  function bind(root,role,db,people,save) {
    const school=schoolRoles.get(role);
    const desk=root.querySelector('[data-school-desk]');
    if(!school || !desk)return;
    desk.onsubmit=event=>{
      const form=event.target;
      if(!form.matches('[data-school-request]'))return;
      event.preventDefault();
      const person=people.find(item=>item.id===form.dataset.schoolRequest);
      if(!person)return;
      const updated=PREP.schoolReply(db[person.id]?.prep,school.id,event.submitter?.value,new FormData(form).get('message'));
      if(updated)save(person.id,updated);
    };
  }

  function coordination(db,people) {
    const requests=people.filter(person=>db[person.id]?.prep?.status==='coordinator');
    return '<section class="panel" data-stafftools><small class="eyebrow">Volba cvičné školy</small><h2>Čeká na rozhodnutí IVP · '+requests.length+'</h2>'+
      (requests.length?requests.map(person=>{
        const request=db[person.id].prep;
        const available=[request.primary,request.backup].filter(id=>id && !(request.declined||[]).includes(id));
        return '<div class="overview-row"><div><strong>'+esc(person.name)+'</strong><small>'+esc(available.map(PREP.schoolName).join(' / '))+'</small>'+
          ((request.declined||[]).length?'<p>Oslovená škola nemá místo. Posuďte další volbu.</p>':'')+'</div><button type="button" class="secondary" data-staff-person="'+esc(person.id)+'" data-staff-route="skola">Posoudit volbu</button></div>';
      }).join(''):'<p>Všechny předané volby škol jsou vyřízené.</p>')+'</section>';
  }

  function methodology(db,people,modules) {
    const submittedStatuses=new Set(['submitted','returned','confirmed']);
    const records=people.flatMap(person=>db[person.id]?.records||[]).filter(item=>submittedStatuses.has(item.status));
    const reflections=people.flatMap(person=>db[person.id]?.reflections||[]).filter(item=>submittedStatuses.has(item.status));
    const countLabel=n=>n+' '+ (n===1?'reflexe':n>=2&&n<=4?'reflexe':'reflexí');
    const rows=[...modules.map(module=>[module.id,module.title]),
      ['nacvik','Praxe nanečisto'],['adaptio','Adaptio'],['ss','Praxe SŠ'],['kurzy','Kurzy ČZU']];
    const awaiting=reflections.filter(r=>r.status==='submitted').length;
    return heading('Metodik IVP','Jak probíhají praxe ve skupině?', 'Počty ukazují odevzdané práce a stav reflexí jednotlivých bloků. Podle nich zvolte téma společného rozboru.')+
      '<section class="panel"><h2>Odevzdané reflexe</h2><p><strong>'+awaiting+'</strong> čeká na zpětnou vazbu · <strong>'+
      reflections.filter(r=>r.status==='returned').length+'</strong> k doplnění · <strong>'+reflections.filter(r=>r.status==='confirmed').length+'</strong> uzavřeno</p></section>'+
      '<section class="stack"><div class="section-head"><h2>Přehled podle bloků</h2></div>'+rows.map(([id,name])=>{
        const groupRecords=records.filter(r=>r.moduleId===id);
        const blockReflections=reflections.filter(r=>r.blockId===id);
        return '<details class="area-box"><summary>'+esc(name)+' <small class="skill-count">'+countLabel(blockReflections.length)+'</small></summary>'+
          (modules.some(m=>m.id===id)?'<p>Předané záznamy z praxe · '+groupRecords.length+'<br>Záznamy po společném rozboru · '+groupRecords.filter(r=>r.status==='confirmed').length+'</p>':'')+
          '<p>Reflexe čekající na odpověď · '+blockReflections.filter(r=>r.status==='submitted').length+'<br>Reflexe vrácené k doplnění · '+blockReflections.filter(r=>r.status==='returned').length+'<br>Uzavřené reflexe · '+blockReflections.filter(r=>r.status==='confirmed').length+'</p></details>';
      }).join('')+'</section>'+links;
  }

  function render(role,db,people,modules) {
    if(schoolRoles.has(role))return schoolDashboard(role,db,people);
    if(role==='method')return methodology(db,people,modules);
    return '';
  }
  return {profiles,isSpecial,title,intro,caption,initialPrep,render,bind,coordination};
})();
