'use strict';
function careerPage() {
  const p = person(), scene = futureScene(p), model = data();
  const count = skillSet(p).filter(s => maxLevel(model,s.code)>0).length;
  const job = p.track==='cook' ? (p.girl?t('Šéfkuchařka','Šéfkuchárka'):t('Šéfkuchař','Šéfkuchár')) : (p.girl?t('Manažerka restaurace','Manažérka reštaurácie'):t('Manažer restaurace','Manažér reštaurácie'));
  const steps = [
    [t('Moje směna','Moja zmena'),scene.line,'day',t('Otevřít dnešní úkol','Otvoriť dnešnú úlohu')],
    [t('Co už umím','Čo už viem'),t('Dovednosti, u kterých vám pedagog potvrdil alespoň první úroveň','Zručnosti, pri ktorých vám pedagóg potvrdil aspoň prvú úroveň')+' · '+count+' / '+skillSet(p).length,'path',t('Moje dovednosti','Moje zručnosti')],
    [t('Moje portfolio','Moje portfólio'),scene.proof,'portfolio',t('Prohlédnout moje práce','Prezrieť moje práce')],
    [job,t('Možný směr po získání zkušeností. Při vedení týmu rozdělujete práci a hlídáte, aby kuchyně i obsluha zvládly výdej společně.','Možný smer po získaní skúseností. Pri vedení tímu rozdeľujete prácu a sledujete, aby kuchyňa aj obsluha zvládli výdaj spoločne.'),'future',t('Vybrat osobní cíl','Vybrať osobný cieľ')]
  ];
  return '<section class="career-atlas"><div class="atlas-copy"><small>'+html(p.name)+' / '+t('Kariérní mapa','Kariérna mapa')+'</small><h1>'+t('Kam mířím','Kam mierim')+'</h1><p>'+html(scene.ambition)+'</p><div class="atlas-stops">'+steps.map(([title,body,dest,label],i)=>'<details name="career-stop" '+(i===0?'open':'')+'><summary><i aria-hidden="true"></i><b>'+html(title)+'</b><span aria-hidden="true">＋</span></summary><article><p>'+html(body)+'</p>'+goBtn(dest,label+' →','atlas-link')+'</article></details>').join('')+'</div></div><figure>'+photo('photos/future-'+p.id+'.webp',scene.alt)+'<figcaption>'+html(scene.place)+'</figcaption></figure></section>';
}
if(view==='career')render(false);
