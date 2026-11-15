'use strict';

window.IVP_DOCUMENTS = (() => {
  const campus = 'https://foxy-studio-campus-pilot.web.app/metodiky/';

  function campusMethod(title, filename) {
    return { label: title + ' · dokument IVP v kampusu Foxy', url: campus + filename, kind: 'DOCX' };
  }

  return {
    ivp: [campusMethod('Metodika 01 · Průběžná pedagogická praxe', '01-prubezna-praxe.docx')],
    group: [campusMethod('Metodika 02 · Skupinový náslech', '02-skupinovy-naslech.docx')],
    guided: [campusMethod('Metodika 03 · Řízená náslechová praxe', '03-rizeny-naslech.docx')],
    micro: [campusMethod('Metodika 04 · Microteaching', '04-microteaching.docx')],
    continuous: [{
      label: 'Metodika 05 · Souvislá řízená pedagogická praxe · IVP ČZU',
      url: 'https://www.ivp.czu.cz/dl/135149?lang=cs',
      kind: 'PDF'
    }],
    reflection: [campusMethod('Metodika 06 · Reflexe pedagogické praxe', '06-reflexe.docx')]
  };
})();
