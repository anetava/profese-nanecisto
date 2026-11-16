'use strict';
window.ATools = (() => {
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const scenarios = {
    nacvik: [
      {title:'Jak začít instruktáž?',phase:'Před výukou',photo:'phase-4.webp',moduleId:'micro',code:'2.1',
        scene:'Máte sedm minut na ukázku měření posuvným měřítkem. Na stole leží dva téměř stejné vzorky. Co řeknete skupině jako první?',
        choices:[
          ['„Dnes si ukážeme posuvné měřítko.“','Skupina zná téma. Zatím chybí představa, co má každý na konci samostatně udělat.','Řeknu, co mají žáci udělat a podle čeho poznají výsledek.'],
          ['„Na konci každý změří oba vzorky a vysvětlí rozdíl.“','Žáci dostali úkol i způsob, jak poznat výsledek. Krátká otázka teď odhalí, kdo už měřidlo používal.','Před ukázkou zjistím, jak by žáci začali měřit.'],
          ['„Kdo z vás už někdy měřil takový díl?“','Zjistíte výchozí zkušenost části skupiny. Jak zapojíte i ty, kteří se nepřihlásí?','Nechám nejprve každého navrhnout první krok ve dvojici.']]},
      {title:'Dvě dvojice se zasekly',phase:'Během výuky',photo:'phase-5.webp',moduleId:'continuous',code:'2.4',
        scene:'Po vaší ukázce dvě dvojice čekají. Ostatní už zapisují výsledek. Jedna žákyně říká: „Nevíme, co odečíst.“ Jak zareagujete?',
        choices:[
          ['Zeptám se, které místo na stupnici je mate.','Konkrétní odpověď ukáže, zda je potíž v odečtu, nebo už v přiložení měřidla. Můžete nabídnout krátkou oporu.','Ověřím porozumění na druhém vzorku bez nápovědy.'],
          ['Ukážu oběma dvojicím celý postup znovu.','Opakování může pomoci. Sledujte, při kterém kroku žáci přestávají pracovat sami.','Po prvním kroku předám měřidlo zpět dvojici.'],
          ['Nechám zkušenějšího spolužáka předvést odečet.','Vrstevnická ukázka zpřístupní další vysvětlení. Oba členové dvojice potřebují vlastní pokus.','Po ukázce si dvojice vystřídá role a zdůvodní výsledek.']]},
      {title:'Co říct při rozboru?',phase:'Po výuce',photo:'phase-6.webp',moduleId:'guided',code:'4.2',
        scene:'Při náslechu zaznělo „výborně“ u tří různých výrobků. Cvičný učitel se vás po hodině ptá, čeho jste si všimli. Čím zahájíte rozhovor?',
        choices:[
          ['Zmíním, že hodina měla dobrou atmosféru.','Zachytili jste dojem ze třídy. Pro rozbor jeho účinku vyhledejte konkrétní reakci žáka.','Do zápisu připojím jednu přesnou situaci.'],
          ['Popíšu, co učitel řekl a co žák pak na výrobku upravil.','Rozhovor stojí na pozorovatelném ději. Učitel může doplnit, podle čeho práci posuzoval.','Zeptám se, jaká kritéria žáci znali předem.'],
          ['Zeptám se, jak poznal, co žáci potřebovali slyšet.','Otázka otevírá učitelovo uvažování. Připomeňte okamžik, o kterém chcete mluvit.','K otázce připojím čas a stručný popis situace.']]}
    ],
    adaptio: [
      {title:'Přicházím do nové školy',phase:'Před nástupem',photo:'phase-1.webp',moduleId:'guided',code:'5.1',
        scene:'Za pár dní máte první náslech. Co potřebujete s provázejícím učitelem vyjasnit jako první?',
        choices:[
          ['Kde a kdy se potkáme','Zapište si jedno místo setkání a čas. Předejdete hledání učebny během předávání skupiny.','Před návštěvou si potvrdím místo, čas a způsob spojení.'],
          ['Čeho si mám při náslechu všímat','Společná otázka vám pomůže soustředit se na učení konkrétní skupiny.','Domluvím si jednu pozorovací otázku a čas na rozbor.'],
          ['Jaká pravidla platí na pracovišti','Požádejte o seznámení s místním režimem a vybavením před příchodem žáků.','Před hodinou projdu s učitelem pracoviště a jeho pravidla.']]},
      {title:'Připravuji první vlastní hodinu',phase:'Před výstupem',photo:'phase-4.webp',moduleId:'micro',code:'5.1',
        scene:'Máte připravenou krátkou instruktáž. Kterou část chcete s mentorem projít ještě před výukou?',
        choices:[
          ['Co už skupina umí','Vyžádejte si příklad předchozí práce. Lépe zvolíte náročnost prvního samostatného úkolu.','Zjistím, na který zvládnutý postup mohu navázat.'],
          ['Kdy předám činnost žákům','Zkuste si nahlas poslední větu ukázky a úplně první pokyn pro práci ve dvojicích.','Nacvičím přechod od předvedení k samostatné práci.'],
          ['Na co se má mentor zaměřit','Jedna přesná zakázka usnadní následnou zpětnou vazbu.','Požádám mentora, aby sledoval reakce na první pokyn.']]},
      {title:'Hodina mě zaskočila',phase:'Po výstupu',photo:'phase-6.webp',moduleId:'continuous',code:'6.1',
        scene:'Po výstupu máte pocit, že hodina dopadla jinak, než jste čekali. Co si vezmete do rozhovoru s učitelem?',
        choices:[
          ['Okamžik, kdy se mi podařilo žáka zapojit','Vraťte se k jedné větě nebo ukázce. Pojmenujte reakci žáka, kterou jste skutečně viděli.','S mentorem najdu jeden postup, který zopakuji.'],
          ['Chvíli, kdy jsem potřeboval/a podporu','Sepište, co v dané chvíli probíhalo a jaká pomoc by vám usnadnila rozhodnutí.','Domluvím se, jak o podporu požádám při příštím výstupu.'],
          ['Jednu změnu, kterou chci příště vyzkoušet','Zmenšete plán na jeden pozorovatelný krok. Příště jej můžete s mentorem vyhodnotit.','Určím, podle jaké reakce žáků změnu vyhodnotíme.']]}
    ]
  };
  const intro = {
    nacvik:['Praxe nanečisto','Vyberte si okamžik z hodiny. Vyzkoušejte vlastní rozhodnutí a podívejte se, co může znamenat pro žáky.'],
    adaptio:['Adaptio','Připravte si rozhovor s provázejícím učitelem. Z konkrétní situace si odneste jeden krok pro příští návštěvu školy.']
  };
  function render(id,notes=[]) {
    const config = scenarios[id];
    if (!config) return '';
    const past = notes.filter(n=>n.kind==='practice-tool' && n.tool===id);
    return '<section class="stack" data-atelier-tool="'+id+'"><header class="subhead"><h1>'+intro[id][0]+'</h1><p>'+intro[id][1]+'</p></header><div class="grid">'+config.map((s,i)=>
      '<article class="tile phase-tile"><img class="phase-photo" src="'+s.photo+'" alt=""><small class="eyebrow">'+escape(s.phase)+'</small><h2>'+escape(s.title)+'</h2><button type="button" class="secondary" data-scenario="'+i+'">'+(id==='adaptio'?'Připravit rozhovor':'Vyzkoušet situaci')+' →</button></article>'
    ).join('')+'</div><div data-working></div>'+(past.length?'<details class="panel"><summary>Moje uložené zápisy · '+past.length+'</summary>'+past.slice().reverse().map(n=>'<p><b>'+escape(n.title)+'</b> · '+escape(n.date)+'<br>'+escape(n.nextStep)+'</p>').join('')+'</details>':'')+'</section>';
  }
  const takeaways={
    nacvik:[
      ['Žák potřebuje znát svůj úkol.','Otázka odkryje předchozí zkušenost.','Úspěch musí jít poznat na výsledku.'],
      ['Nejdřív zjistím, kde se práce zastavila.','Po nápovědě má přijít vlastní pokus.','Oba ve dvojici potřebují prostor.'],
      ['Popíšu reakci žáka.','Zeptám se na kritérium.','Odliším svůj dojem od pozorování.']
    ],
    adaptio:[
      ['Potřebuji znát způsob spojení.','Na návštěvu si vezmu jednu otázku.','Pravidla pracoviště projdu předem.'],
      ['Zjistím, na čem mohu stavět.','Předání práce žákovi si nacvičím.','Mentor má vědět, čeho si všímat.'],
      ['Pro rozbor stačí konkrétní okamžik.','Mohu si předem domluvit podporu.','Změnu poznám podle reakce žáka.']
    ]
  };
  function bind(root,id,notes,save,role='student'){
    const container=root.querySelector('[data-atelier-tool]'), panel=container?.querySelector('[data-working]');
    if(!panel)return;
    const attempts=new Map(); let active;
    const state=()=>attempts.get(active);
    const scenario=()=>scenarios[id][active];
    const remember=()=>{
      const f=panel.querySelector('[data-save]');
      if(!f || active===undefined)return;
      const st=state(),values=new FormData(f);
      st.notes.set(st.choice,{reflection:values.get('reflection')||'',next:values.get('next')||''});
      if(st.choice==='own')st.words=f.elements.words?.value||'';
    };
    function show(){
      const s=scenario(),st=state(),other=st.choice==='own',hasChoice=st.choice!==null;
      const answer=hasChoice&&!other?s.choices[st.choice]:null;
      const values=st.notes.get(st.choice)||{};
      const outcome=other?'Představte si první reakci žáka. Podle čeho poznáte, že vaše věta splnila účel?':answer?.[1];
      const actions=s.choices.map((c,i)=>'<button class="reaction" type="button" data-choice="'+i+'" aria-pressed="'+(st.choice===i)+'"><span aria-hidden="true">'+String.fromCharCode(65+i)+'</span>'+escape(c[0])+'</button>').join('');
      panel.innerHTML='<article class="studio-case"><div class="case-situation"><small class="eyebrow">'+escape(s.phase)+'</small><h2 tabindex="-1">'+escape(s.title)+'</h2><p>'+escape(s.scene)+'</p><div class="case-options">'+actions+'<button class="reaction own-reaction" type="button" data-choice="own" aria-pressed="'+other+'"><span aria-hidden="true">+</span>Moje vlastní reakce</button></div></div><div class="case-response">'+
        (!hasChoice?'<img src="'+s.photo+'" alt=""><p>Vyberte, jak zareagujete. Tady uvidíte, na co vaše volba může mít vliv.</p>':
        '<div class="case-feedback" role="status"><small>'+(other?'Otázka k vlastní reakci':id==='adaptio'?'Podnět k rozhovoru':'Co může následovat')+'</small><p>'+escape(outcome)+'</p></div>'+
        (role!=='student'?'':'<form data-save class="case-form">'+(other?'<label>Jak by zněla vaše reakce?<textarea name="words" rows="2" maxlength="400" required>'+escape(st.words)+'</textarea></label>':'')+
        Volba.field({label:'Co si chci zapamatovat (volitelné)',name:'reflection',items:takeaways[id][active],value:values.reflection||'',tiles:true})+
        Volba.field({label:'Můj další krok',name:'next',items:s.choices.map(c=>c[2]),value:values.next||'',required:true,max:1200})+
        '<div><button class="primary" type="submit">Uložit do portfolia</button></div></form>'))+'</div></article>';
    }
    container.onclick=ev=>{
      const b=ev.target.closest('button');
      if(!b)return;
      if(b.hasAttribute('data-scenario')){
        remember(); active=Number(b.dataset.scenario);
        if(!attempts.has(active))attempts.set(active,{choice:null,notes:new Map(),words:''});
        show();panel.querySelector('h2').focus();
      }else if(b.hasAttribute('data-choice')&&active!==undefined){
        remember(); const key=b.dataset.choice;state().choice=key==='own'?key:Number(key);show();
        panel.querySelector('[data-choice="'+key+'"]').focus({preventScroll:true});
      }
    };
    container.onsubmit=ev=>{
      if(!ev.target.matches('[data-save]'))return;
      ev.preventDefault();if(role!=='student'||active===undefined)return;
      const st=state(),s=scenario(),own=st.choice==='own',data=new FormData(ev.target);
      const words=String(data.get('words')||'').trim();
      if(own&&!words){ev.target.elements.words.focus();return;}
      const now=new Date(), date=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
      const choice=own?words:s.choices[st.choice][0],next=String(data.get('next')||'').trim();
      if(!next)return;
      const fields={'Typ podkladu':id==='adaptio'?'Příprava na rozhovor':'Modelová situace','Moje volba':choice};
      if(!own)fields['Podnět']=s.choices[st.choice][1];
      save([...notes,{id:'tool-'+(globalThis.crypto?.randomUUID?.()||Math.random().toString(36).slice(2)),moduleId:s.moduleId,date,title:intro[id][0]+' · '+s.title,activityId:String(active),
        reflection:String(data.get('reflection')||'').trim(),nextStep:next,kind:'practice-tool',tool:id,competency:s.code,status:'draft',fields,timeline:[]}]);
    };
  }
  return {render,bind};
})();
