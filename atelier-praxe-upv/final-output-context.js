'use strict';
window.FINAL_OUTPUT_CONTEXT = (() => {
  const prefix = 'atelier-final-context.';
  const draftPrefix = 'atelier-final-student-2627.profile.';
  const fields = new Set(['student','school','class','mentor','period','evidence','documents','progress','example','next','plan']);
  const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  function draftKey(id) {
    if (typeof id !== 'string' || !id || id.length > 500 || ['__proto__','constructor','prototype'].includes(id)) throw new Error('Neplatný profil závěrečného výstupu.');
    return draftPrefix + encodeURIComponent(id);
  }
  function validateDraft(value) {
    if (value === null) return value;
    if (!record(value) || Object.entries(value).some(([key,items]) => !fields.has(key) || !Array.isArray(items) || items.length > 20 || items.some(item => typeof item !== 'string' || item.length > 100000)) || JSON.stringify(value).length > 500000) {
      throw new Error('Koncept závěrečného výstupu nemá platný formát.');
    }
    return value;
  }
  function read(id) {
    const raw = localStorage.getItem(draftKey(id));
    if (raw === null) return null;
    try { return validateDraft(JSON.parse(raw)); }
    catch { throw new Error('Uložený závěrečný výstup nelze přečíst. Otevřete jej a stáhněte dokument před obnovou zálohy.'); }
  }
  function collect(people) {
    return Object.fromEntries(people.map(person => [person.id, read(person.id)]));
  }
  function validateDrafts(drafts, ids) {
    if (drafts === undefined) return;
    const allowed = new Set(ids);
    if (!record(drafts) || Object.keys(drafts).some(id => !allowed.has(id))) throw new Error('Záloha obsahuje závěrečný výstup jiného profilu.');
    for (const [id,value] of Object.entries(drafts)) { draftKey(id); validateDraft(value); }
  }
  function changes(drafts, ids) {
    validateDrafts(drafts, ids);
    return Object.entries(drafts || {}).map(([id,value]) => [draftKey(id), value === null ? null : JSON.stringify(value)]);
  }
  function applyStorage(changes, commit = () => true, watchKeys = []) {
    const before = [...new Set([...changes.map(([key]) => key), ...watchKeys])].map(key => [key, localStorage.getItem(key)]);
    const write = ([key,value]) => value === null ? localStorage.removeItem(key) : localStorage.setItem(key,value);
    try {
      changes.forEach(write);
      if (changes.some(([key,value]) => localStorage.getItem(key) !== value) || commit() === false) throw new Error();
      return true;
    } catch {
      let restored = true;
      for (const item of before) { try { write(item); if (localStorage.getItem(item[0]) !== item[1]) restored = false; } catch { restored = false; } }
      throw new Error(restored ? 'Obnova se nepodařila uložit. Původní údaje zůstaly zachované.' : 'Úložiště odmítlo obnovu i návrat původních údajů. Soubor zálohy zachovejte a obnovte jej v jiném prohlížeči.');
    }
  }
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
  return {link,read,collect,validateDrafts,changes,applyStorage};
})();
