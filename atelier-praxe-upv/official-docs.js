'use strict';
window.IVP_DOCUMENTS = (() => {
  function material(folder, label, name) {
    return {label, url:'materialy/'+folder+'/'+name, kind:name.split('.').pop().toUpperCase()+' · 2026/2027'};
  }
  const method=(label,file)=>material('metodiky',label+' · studijní kopie',file);
  const annexes=[
    ['Záznam výukové jednotky · prázdný formulář','arch-naslechu.docx'],
    ['Vzor vyplněného záznamu z náslechu','vzor-naslechu.docx'],
    ['Manuál k rozboru vyučovací jednotky','manual-rozboru.docx'],
    ['Podklad pro cvičného učitele k rozboru hodiny','rozbor-cvicny-ucitel.docx']
  ].map(([label,file])=>material('prilohy',label,file));
  return {
    ivp:[method('Metodika 01 · Průběžná pedagogická praxe','01-ivp.docx')],
    group:[method('Metodika 02 · Skupinový náslech','02-skupinovy-naslech.docx'),...annexes],
    guided:[method('Metodika 03 · Řízená náslechová praxe','03-rizeny-naslech.docx'),...annexes],
    micro:[method('Metodika 04 · Microteaching','04-microteaching.docx'),...annexes.slice(2)],
    continuous:[method('Metodika 05 · Souvislá řízená pedagogická praxe','05-souvisla-praxe.pdf'),...annexes.slice(2)],
    reflection:[method('Metodika 06 · Reflexe pedagogické praxe','06-reflexe.docx')]
  };
})();
