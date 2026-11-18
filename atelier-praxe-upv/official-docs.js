'use strict';
window.IVP_DOCUMENTS = (() => {
  function material(folder, label, name, purpose, use) {
    return {label, url:'materialy/'+folder+'/'+name+'?v=atelier-identita1', kind:name.split('.').pop().toUpperCase()+' · 2026/2027', purpose, use};
  }
  const method=(label,file,purpose)=>material('metodiky',label+' · studijní průvodce',file,purpose,'Přečtěte před blokem. K požadavkům se vraťte před odevzdáním.');
  const annexes=[
    ['Záznam výukové jednotky · k vyplnění','arch-naslechu.docx','Zachytíte průběh jedné hodiny: co udělal učitel, jak reagovali žáci a co z toho vyvozujete.','Vyplňuje student při náslechu a doplňuje po rozboru.'],
    ['Vzor vyplněného záznamu z náslechu','vzor-naslechu.docx','Ukazuje rozdíl mezi pozorováním, vlastním výkladem a dalším krokem. Obsahuje modelovou situaci.','Prohlédněte před prvním záznamem. Do svého archu pište vlastní zkušenost.'],
    ['Manuál k rozboru vyučovací jednotky','manual-rozboru.docx','Pomůže připravit rozhovor o jedné situaci a dojít ke konkrétní úpravě výuky.','Používá student s cvičným učitelem po hodině.'],
    ['Podklad pro cvičného učitele k rozboru','rozbor-cvicny-ucitel.docx','Učitel zapíše pozorovaný výkon, zpětnou vazbu a doporučení pro další pokus.','Předejte cvičnému učiteli. Jeho hodnocení za něj nevyplňujte.']
  ].map(([label,file,purpose,use])=>material('prilohy',label,file,purpose,use));
  return {
    ivp:[method('Metodika 01 · Průběžná pedagogická praxe','01-ivp.docx','Vysvětluje přípravu na návštěvu školy, pozorování a výstupy z exkurze.')],
    group:[method('Metodika 02 · Skupinový náslech','02-skupinovy-naslech.docx','Vede od přípravy pozorování přes záznam hodiny ke společnému rozboru.'),...annexes],
    guided:[method('Metodika 03 · Řízená náslechová praxe','03-rizeny-naslech.docx','Pomůže zvolit pozorovací otázku, doložit průběh výuky a ověřit rozsah praxe s garantem.'),...annexes],
    micro:[method('Metodika 04 · Microteaching','04-microteaching.docx','Provede přípravou krátkého výstupu, jeho rozborem a úpravou dalšího pokusu.'),...annexes.slice(2)],
    continuous:[method('Metodika 05 · Souvislá řízená pedagogická praxe','05-souvisla-praxe.pdf','Ujasní přípravu na školu, vlastní výuku, doklady a závěrečné odevzdání.'),...annexes.slice(2)],
    reflection:[method('Metodika 06 · Reflexe pedagogické praxe','06-reflexe.docx','Vysvětluje, jak porovnat vlastní doklady a zpracovat závěrečnou profesní reflexi.')]
  };
})();
