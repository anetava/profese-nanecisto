'use strict';
window.WORK = (() => {
  const course = 'https://www.ivp.czu.cz/cs/r-6929-katedry-a-soucasti/r-7468-ostatni-pracoviste/r-19782-oddeleni-celozivotniho-vzdelavani/r-20526-instruktor-praktickeho-vyucovani';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const options = [
    {label:'Hotový díl má správný rozměr.', feedback:'Výrobek ukazuje výsledek. Zjistěte také, kdo volil měřidlo a kdo během práce pomáhal.'},
    {label:'Žák sám vybral měřidlo, zdůvodnil volbu a zopakoval měření.',feedback:'Tady vidíte konkrétní výkon i jeho zdůvodnění. Škole můžete předat, co přesně žák zvládl samostatně.'},
    {label:'Instruktor řekl, že žák pracoval dobře.',feedback:'Požádejte instruktora, aby popsal jediný pozorovatelný krok. Z něj pak žákovi nabídněte další konkrétní úkol.'}
  ];
  const roles = [
    ['Škola','Dohodne s instruktorem, že žák zvolí vhodné měřidlo a porovná výsledek s výkresem. Předem společně pojmenují znaky úspěchu.'],
    ['Instruktor','Připraví dva vzorky a ověří, že žák dokáže bezpečně pracovat s vybavením. U prvního vzorku předvede postup, u druhého sleduje samostatnou práci.'],
    ['Žák','Zvolí měřidlo pro druhý vzorek. Instruktorovi vysvětlí volbu, změří díl a podle výsledku navrhne další krok.']
  ];
  const goals = [
    ['Předat úkol tak, aby mu žák rozuměl','Na začátku požádám žáka, aby vlastními slovy popsal výsledek, kterého má dosáhnout.'],
    ['Poznat, kdy může žák pokračovat samostatně','Při druhém pokusu nechám žáka zvolit postup a zaznamenám, ve kterém kroku si vyžádal pomoc.'],
    ['Dát užitečnou zpětnou vazbu','Po práci popíšu jeden pozorovaný krok a s žákem domluvím, co při dalším pokusu ověří.']
  ];
  function section(label,title,body){return '<header class="subhead"><small class="eyebrow">'+label+'</small><h1>'+title+'</h1><p>'+body+'</p></header>';}
  function select(name,choices,placeholder){
    return '<select name="'+name+'" required><option value="">'+placeholder+'</option>'+choices.map((text,i)=>'<option value="'+i+'">'+esc(text)+'</option>').join('')+'</select>';
  }
  function log(notes){
    return notes.length?'<details class="area-box"><summary>Uložené podklady · '+notes.length+'</summary>'+notes.map(n=>'<p><strong>'+esc(n.title)+'</strong><br>'+esc(n.reflection)+'<br>'+esc(n.nextStep)+'</p>').join('')+'</details>':'';
  }
  function render(id,notes=[],role='student'){
    const writable=role==='student';
    if(id==='ss')return section('Praxe SŠ','Jak se domluví škola a pracoviště?','Projděte si předání praktického úkolu. Jako budoucí učitel sledujte, kdo žákovi pomáhá a podle čeho škola pozná jeho pokrok.')+
      '<div class="split"><section class="panel stack"><small class="eyebrow">Ukázka z dílny</small><h2>Dva vzorky, dvě měřidla</h2><p>Žák má podle výkresu ověřit rozměr součásti. V dílně má k dispozici pravítko a posuvné měřítko. Co si předem potřebují domluvit tři lidé?</p>'+
      roles.map(([k,v])=>'<details class="area-box"><summary>'+k+'</summary><p>'+v+'</p></details>').join('')+'</section>'+
      '<form class="panel stack" data-work-form><small class="eyebrow">Vaše pozorování</small><h2>Co předáte škole?</h2><label>Vyberte doklad o tom, co žák umí'+select('choice',options.map(o=>o.label),'Vyberte situaci z dílny')+'</label><p data-work-feedback class="notice" role="status" hidden></p>'+
      (writable?Volba.field({label:'Co byste příště ověřili?',name:'note',items:Napovedy.packs.ss[3]})+'<button class="primary" type="submit">Uložit ukázku do portfolia</button>':'')+
      '</form></div>'+log(notes);
    return section('Kurzy ČZU','Jak lépe vést žáka na pracovišti?','Vyberte si jednu dovednost pro další profesní rozvoj. K cíli si můžete poznamenat, při jaké příležitosti ho vyzkoušíte.')+
      '<div class="split"><article class="panel stack"><small class="eyebrow">Celoživotní vzdělávání IVP ČZU</small><h2>Instruktor praktického vyučování</h2><p>Podrobnosti, termíny a možnosti přihlášení ověřte přímo u poskytovatele.</p><p><a class="primary" href="'+course+'" target="_blank" rel="noopener">Oficiální nabídka IVP ↗</a></p></article>'+
      '<form class="panel stack" data-work-form><h2>Můj cíl</h2><label>Co chci při vedení žáka vyzkoušet?'+select('choice',goals.map(row=>row[0]),'Vyberte si jeden cíl')+'</label><p data-work-feedback class="notice" role="status" hidden></p>'+
      (writable?Volba.field({label:'Kde ho vyzkouším?',name:'note',items:['Při úvodní instruktáži v dílně','Při samostatné práci dvojice','Při rozboru výsledku na pracovišti'],required:true,max:220})+'<button class="primary" type="submit">Uložit cíl do portfolia</button>':'')+
      '</form></div>'+log(notes);
  }
  function bind(root,id,notes,role,save){
    const form=root.querySelector('[data-work-form]');
    if(!form)return;
    const choice=form.elements.choice, feedback=form.querySelector('[data-work-feedback]');
    function update(){
      const i=Number(choice.value);
      feedback.hidden=choice.value==='';
      feedback.textContent=choice.value===''?'':id==='ss'?options[i].feedback:goals[i][1];
    }
    choice.onchange=update;
    form.onsubmit=event=>{
      event.preventDefault();
      if(role!=='student'||!form.reportValidity())return;
      const i=Number(choice.value), note=form.elements.note.value.trim();
      const title=id==='ss'?'Předání výsledku z dílny škole':goals[i][0];
      const reflection=id==='ss'?options[i].label:goals[i][1];
      const nextStep=note||'';
      const d=new Date();
      const date=[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
      save([...notes,{id:crypto.randomUUID(),moduleId:'guided',date,title,reflection,nextStep,kind:'practice-tool',competency:id==='ss'?'5.2':'6.1',status:'draft',fields:id==='ss'?{'Typ podkladu':'Modelová situace z dílny','Rozbor důkazu':options[i].feedback}:{'Typ podkladu':'Plán profesního rozvoje','Příležitost k vyzkoušení':note},timeline:[]}]);
    };
  }
  return {render,bind};
})();
