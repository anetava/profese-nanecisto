'use strict';

window.STAFFTOOLS = (() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch =>
    ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[ch]));
  const labels = {
    submitted:'Předáno k rozboru', returned:'Vráceno k doplnění', confirmed:'Rozbor uzavřen'
  };
  const when = value => new Intl.DateTimeFormat('cs-CZ', {
    day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit', timeZone:'Europe/Prague'
  }).format(new Date(value));
  const ask = (person, record, caption) =>
    '<button type="button" class="secondary" data-staff-person="'+esc(person.id)+'" data-staff-route="'+
    esc('praxe/'+record.moduleId+'/zaznam/'+encodeURIComponent(record.id))+'">'+esc(caption)+'</button>';

  function logChanges(oldRecords, newRecords, priorLog=[]) {
    const old = new Map(oldRecords.map(record => [record.id, record.status]));
    const additions = newRecords
      .filter(record => Object.hasOwn(labels,record.status) && old.get(record.id)!==record.status)
      .map(record => ({at:new Date().toISOString(), id:record.id, moduleId:record.moduleId,
        title:record.title, status:record.status}));
    return priorLog.concat(additions);
  }

  function reportRows(db, people) {
    return people.map(person => {
      const visible=(db[person.id]?.records||[]).filter(record => Object.hasOwn(labels,record.status));
      const count = status => visible.filter(record => record.status===status).length;
      return [person.name, count('submitted'), count('returned'), count('confirmed'), visible.length];
    });
  }

  const headers = ['Studující','Čeká na rozbor','K doplnění','Po rozboru','Předané záznamy celkem'];
  function rowList(rows) {
    return rows.map(([name,submitted,returned,confirmed,total]) =>
      '<div class="overview-row"><div><strong>'+esc(name)+'</strong><small>'+submitted+' k rozboru · '+
      returned+' k doplnění · '+confirmed+' po rozboru</small></div><span class="pill">'+total+
      ' celkem</span></div>').join('');
  }

  function render(db,people,role) {
    if (!['ivp','mentor'].includes(role)) return '';
    const coordinator=role==='ivp';
    const all=people.flatMap(person=>(db[person.id]?.records||[])
      .filter(r=>Object.hasOwn(labels,r.status)).map(record=>({person,record})));
    const returned=all.filter(x=>x.record.status==='returned');
    const log=people.flatMap(person=>(db[person.id]?.reviewLog||[]).map(entry=>({person,entry})))
      .filter(x=>Object.hasOwn(labels,x.entry.status)&&Number.isFinite(Date.parse(x.entry.at)))
      .sort((a,b)=>b.entry.at.localeCompare(a.entry.at));
    const logText=log.length ? log.map(({person,entry})=>'<div class="overview-row"><div><strong>'+
      esc(labels[entry.status])+' · '+esc(person.name)+'</strong><small>'+esc(entry.title)+' · '+
      esc(when(entry.at))+'</small></div>'+ask(person,entry,'Záznam')+'</div>').join('')
      :'<p>Po prvním předání, vrácení nebo uzavření nového rozboru tu uvidíte datum změny a odkaz na příslušný záznam.</p>';
    const reviews=returned.length ? returned.map(({person,record})=>'<div class="overview-row"><div><strong>'+
      esc(record.title)+'</strong><small>'+esc(person.name)+' · '+esc(record.feedback||'K doplnění')+
      '</small></div>'+ask(person,record,'Otevřít')+'</div>').join('')
      :'<p>Žádný předaný záznam nyní nečeká na doplnění studentem.</p>';
    const rows=reportRows(db,people);
    const requests=people.filter(p=>{
      const status=db[p.id]?.prep?.status;
      return coordinator ? !!status && status!=='draft' : ['school','confirmed'].includes(status);
    });
    const schools=requests.map(p=>{
      const request=db[p.id].prep;
      return '<div class="overview-row"><div><strong>'+esc(window.PREP.schoolName(request.current||request.primary))+
        '</strong><small>'+esc(p.name)+' · '+esc(window.PREP.statusLabel(request.status))+
        '</small></div><button class="secondary" type="button" data-staff-person="'+esc(p.id)+
        '" data-staff-route="skola">Otevřít žádost</button></div>';
    }).join('')||'<p>Jakmile bude předaná žádost dostupná vaší roli, objeví se zde škola, studující a stav přijetí.</p>';
    return '<section class="stack" data-stafftools'+(coordinator?' data-report="'+esc(JSON.stringify(rows))+'"':'')+'><div class="section-head"><h2>'+
      (coordinator?'Koordinace skupiny':'Podklady pro vedení praxe')+'</h2></div>'+
      '<details class="area-box"><summary>Školy a přijetí · '+requests.length+'</summary>'+schools+'</details>'+
      '<details class="area-box"><summary>Vrácené práce · '+returned.length+'</summary>'+reviews+'</details>'+
      '<details class="area-box"><summary>Historie rozborů · '+log.length+'</summary>'+logText+'</details>'+
      (coordinator ? '<details class="area-box"><summary>Souhrn za skupinu</summary>'+rowList(rows)+
        '<button type="button" class="secondary" data-staff-export>Stáhnout přehled CSV</button></details>':'')+
      '<details class="area-box"><summary>'+ (coordinator?'Profily a přístupy v ukázce':'Které podklady mám při rozboru sledovat?')+
      '</summary><p>'+(coordinator?'Studující zpracuje vlastní podklady, cvičný učitel vede rozbor a koordinátor IVP předává volbu cvičné škole. Každý ze čtyř školních profilů vyřizuje žádosti svého pracoviště. Metodik sleduje souhrny za skupinu. Profily v ukázce pracují s údaji v tomto prohlížeči.':
        'Nechte studenta popsat jeden konkrétní okamžik. Porovnejte jeho záměr s reakcí žáků a domluvte pozorovatelný krok pro další výuku.')+
      '</p><button class="secondary" type="button" data-staff-help>Metodiky a sylaby</button></details></section>';
  }

  function download(rows) {
    const protect = v => {
      const s=String(v);
      return '"'+(/^[=+@\-\t\r]/.test(s)?"'":'')+s.replace(/"/g,'""')+'"';
    };
    const csv='\ufeff'+[['Akademický rok',...headers],...rows.map(row=>['2026/2027',...row])].map(row=>row.map(protect).join(';')).join('\r\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
    const link=document.createElement('a');
    link.href=url;link.download='atelier-praxi-prehled-skupiny-2026-2027.csv';
    document.body.append(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  function bind(root,callbacks) {
    const boxes=root.matches?.('[data-stafftools]')?[root]:[...root.querySelectorAll('[data-stafftools]')];
    for (const box of boxes) box.addEventListener('click',event=>{
      const button=event.target.closest('button');
      if(!button)return;
      if(button.dataset.staffPerson)callbacks.openStudent(button.dataset.staffPerson,button.dataset.staffRoute);
      if(button.hasAttribute('data-staff-help'))callbacks.go('sources');
      if(button.hasAttribute('data-staff-export')) {
        const rows=JSON.parse(box.dataset.report||'[]');
        download(rows);
      }
    });
  }

  return {render,bind,logChanges};
})();
