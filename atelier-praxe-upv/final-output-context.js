'use strict';
window.FINAL_OUTPUT_CONTEXT = (() => {
  const prefix = 'atelier-final-context.';
  function link(person) {
    if (!person) return 'zaverecny-vystup.html?template=1';
    if (typeof person.id !== 'string' || !person.id || typeof person.name !== 'string') {
      throw new Error('Nejprve vyberte pracovní náhled studenta.');
    }
    try {
      const token = crypto.randomUUID();
      sessionStorage.setItem(prefix + token, JSON.stringify({id:person.id, name:person.name}));
      return 'zaverecny-vystup.html?context=' + token;
    } catch {
      throw new Error('Profil se nepodařilo předat dokumentu. Povolte úložiště této karty a zkuste to znovu.');
    }
  }
  return {link};
})();
