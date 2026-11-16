'use strict';
window.DRUHY = (() => {
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const groups={
    observation:[
      ['Co jste tentokrát sledovali?',['První krok žáka po zadání.','Reakci žáků na přeformulovanou otázku.','Okamžik, kdy si žák opravil vlastní postup.']],
      ['Čeho jste si všimli?',['Žák popsal další krok vlastními slovy.','Stejnou otázku položilo více žáků.','Při této návštěvě se situace neopakovala.']]
    ],
    teaching:[
      ['Co jste při výuce zkusili jinak?',['Před ukázkou jsem pojmenoval/a výsledek práce.','Po zadání jsem ponechal/a delší čas na odpověď.','Nechal/a jsem žáka ukázat první krok.']],
      ['Co následovalo?',['Žák začal samostatně.','Žák požádal o upřesnění pokynu.','Rozdíl zatím nedokážu posoudit.']]
    ]
  };
  const last=['Stejný postup ověřím v příští hodině.','Změním jednu větu zadání a znovu se podívám na reakci.','Vezmu oba pokusy na konzultaci s cvičným učitelem.'];
  function render(records,retries,id) {
    const saved=retries.find(r=>r.id===id);
    const start='<a class="text-btn" href="#ivp">← Moje pedagogická praxe</a><header class="subhead"><small class="eyebrow">Samostatná práce mezi návštěvami školy</small><h1>Můj druhý pokus</h1></header>';
    if(saved)return start+'<div class="retry-grid"><section class="retry-before"><small class="eyebrow">Minule</small><h2>'+esc(saved.fields['Původní záznam'])+'</h2><blockquote>'+esc(saved.fields['Původní záměr'])+'</blockquote></section><section class="panel stack"><small class="eyebrow">Druhý pokus</small><h2>'+esc(saved.date.split('-').reverse().map(Number).join('. '))+'</h2><p><strong>Co jsem zkusil/a nebo pozoroval/a</strong><br>'+esc(saved.fields['Co jsem zkusil/a nebo pozoroval/a'])+'</p><p><strong>Co se stalo</strong><br>'+esc(saved.reflection)+'</p><p><strong>Příště</strong><br>'+esc(saved.nextStep)+'</p><a class="secondary" href="#portfolio">Moje portfolio →</a></section></div>';
    const choices=records.filter(r=>r.nextStep&&!r.isRetry).sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));
    if(!choices.length)return start+'<p>Do záznamu z praxe nejprve uložte, co chcete příště ověřit. Tady pak oba pokusy porovnáte.</p><a href="#ivp" class="primary">Otevřít moji praxi</a>';
    const active=choices.find(r=>r.id===id)||choices.at(-1);
    const observation=['group','guided','ivp'].includes(active.moduleId||active.blockId);
    const questions=groups[observation?'observation':'teaching'];
    const field=(name,q)=>Volba.field({label:q[0],name,items:q[1],required:true});
    return start+'<p class="retry-intro">Vraťte se k jedné věci, kterou jste chtěli zkusit. Na další praxi zachyťte, co se skutečně stalo.</p><div class="retry-grid"><section class="retry-before"><small class="eyebrow">Minule</small><h2>Co jsem chtěl/a ověřit</h2><label>Navázat na záznam<select id="retry-base">'+choices.map(r=>'<option value="'+esc(r.id)+'" '+(r.id===active.id?'selected':'')+'>'+esc(r.date)+' · '+esc(r.title)+'</option>').join('')+'</select></label><blockquote>'+esc(active.nextStep)+'</blockquote>'+(active.feedback?'<p><strong>Zpětná vazba</strong><br>'+esc(active.feedback)+'</p>':'')+'</section><form id="retry-form" class="panel stack" data-origin="'+esc(active.id)+'"><div><small class="eyebrow">Tentokrát</small><h2>Co se změnilo?</h2></div><label>Datum druhého pokusu<input type="date" name="date" required value="'+ATDOC.today()+'"></label>'+field('action',questions[0])+field('effect',questions[1])+field('next',['Co uděláte příště?',last])+'<p class="muted">Tento zápis uvidíte ve svém portfoliu. Počet povinných náslechů se tím nemění.</p><button class="primary">Uložit oba pokusy vedle sebe</button></form></div>';
  }
  function bind(root,records,save,go) {
    const form=root.querySelector('#retry-form');if(!form)return;
    root.querySelector('#retry-base').onchange=ev=>go('druhy-pokus/'+encodeURIComponent(ev.target.value));
    form.onsubmit=ev=>{
      ev.preventDefault();const first=records.find(r=>r.id===form.dataset.origin);if(!first)return;
      const val=n=>form.elements.namedItem(n).value.trim();
      const row={id:crypto.randomUUID(),sourceId:first.id,isRetry:true,status:'draft',moduleId:first.moduleId||first.blockId||first.tool,date:val('date'),title:'Druhý pokus · '+first.title,fields:{'Původní záznam':first.title+' · '+first.date,'Původní záměr':first.nextStep,'Co jsem zkusil/a nebo pozoroval/a':val('action')},reflection:val('effect'),nextStep:val('next')};
      if(row.date&&row.reflection&&row.nextStep&&save(row))go('druhy-pokus/'+encodeURIComponent(row.id));
    };
  }
  return {render,bind};
})();
