'use strict';

let menuFilter = 'all';
let menuOpenCode = '';

function resetMenu() {
  menuFilter = 'all';
  menuOpenCode = '';
}

function commonSkill(c) {
  return c.branch === t('Společný základ', 'Spoločný základ');
}

function menuAccepts(c, model) {
  if (menuFilter === 'confirmed') return maxLevel(model, c.code) > 0;
  if (menuFilter === 'specialty') return !commonSkill(c);
  if (menuFilter === 'shared') return commonSkill(c);
  return true;
}

function menuState(c, model) {
  const s = model.shift;
  const confirmed = maxLevel(model, c.code);
  if (s.code === c.code && s.phase !== 6) {
    const tone = s.phase === 7 ? 'revision' : s.phase === 5 ? 'pending' : 'current';
    return {tone, label: s.phase === 5 || s.phase === 7 ? progressState(s) : t('Cíl směny', 'Cieľ zmeny')};
  }
  if (!confirmed && model.menuStudy?.[c.code]?.length) return {tone:'current', label:t('Vlastní nácvik', 'Vlastný nácvik')};
  return confirmed
    ? {tone:'approved', label:t('Potvrzeno ', 'Potvrdené ') + confirmed + '/3'}
    : {tone:'neutral', label:t('K nácviku', 'Na nácvik')};
}

function menuAssignmentAction(s) {
  if (s.phase === 6) return action('menu-proof', t('Ukázat v portfoliu', 'Ukázať v portfóliu'), s.code, 'button primary');
  if (s.phase === 7 || s.phase === 4) return goBtn('reflect', t('Otevřít mou reflexi', 'Otvoriť moju reflexiu'), 'button primary');
  if (s.phase === 5) return goBtn('summary', t('Zobrazit odevzdanou práci', 'Zobraziť odovzdanú prácu'), 'button primary');
  return goBtn('day', s.phase === 0 ? t('Přejít k přípravě na směnu', 'Prejsť k príprave na zmenu') : t('Pokračovat na směně', 'Pokračovať na zmene'), 'button primary');
}

function menuLevelList(c, confirmed, target) {
  return '<ol class="menu-levels">' + c.levels.map((description, i) => {
    const level = i + 1;
    const state = level <= confirmed ? 'done' : level === target ? 'current' : 'next';
    const label = state === 'done' ? t(' · potvrzeno', ' · potvrdené') : level === target ? t(' · váš cíl', ' · váš cieľ') : '';
    return '<li data-state="' + state + '"><strong>' + t('Úroveň ') + level + label + '</strong><p>' + html(description) + '</p></li>';
  }).join('') + '</ol>';
}

function menuSkillBody(c, p, model) {
  const s = model.shift;
  const assigned = s.code === c.code;
  const confirmed = maxLevel(model, c.code);
  const level = assigned ? s.level : Math.min(3, confirmed + 1);
  const mod = moduleInfo(c.code);
  const history = model.history.filter(h => h.code === c.code);
  const latest = history.filter(h => h.level === confirmed).sort((a, b) => b.day.localeCompare(a.day))[0];
  const related = skillSet(p).filter(other => other.code !== c.code &&
    (other.module === c.module || other.code.split('.')[0] === c.code.split('.')[0])).slice(0, 2);
  const station = stationCase(c.code, p.track === 'cook');
  const studyLabel = station ? station.title : confirmed === 3 ? t('Zopakovat si nácvik', 'Zopakovať si nácvik') : t('Vyzkoušet si nácvik', 'Vyskúšať si nácvik');
  const situation = assigned ? learnerOutcome(s) : station?.question || loc(studySituations[c.code][0]);
  const workCheck = station ? '' : '<div class="menu-work-check"><h3>' +
    t('Čeho si při práci všimnout', 'Čo si pri práci všimnúť') +
    '</h3><p>' + html(loc(studySituations[c.code][1])) + '</p></div>';
  const actions = (assigned ? menuAssignmentAction(s) : '') +
    action('menu-study', studyLabel, c.code, assigned ? 'button' : 'button primary') +
    (latest && !(assigned && s.phase === 6) ? action('menu-proof', t('Moje práce v portfoliu', 'Moja práca v portfóliu'), c.code, 'text-link') : '');
  const ownNote = assigned && ['after','during'].map(k => loc(s.notes[k]?.text).trim()).find(Boolean);
  const personalObservation = ownNote
    ? '<div class="menu-evidence"><b>' + t('Můj postřeh z této směny', 'Môj postreh z tejto zmeny') +
      '</b><p>„' + html(ownNote) + '“</p></div>' : '';
  return '<div class="menu-body"><div class="menu-target"><span class="ey">' + t('Kompetence', 'Kompetencia') +
    ' · ' + html(c.name) + '</span><h3>' +
    (assigned ? t('Úkol této směny', 'Úloha tejto zmeny') : t('Situace k nácviku', 'Situácia na nácvik')) +
    '</h3><p>' + html(situation) + '</p></div>' + workCheck + '<div class="menu-actions">' + actions + '</div>' +
    personalObservation +
    '<details class="menu-detail-fold"><summary>' + t('Co posuzuje pedagog a jaké jsou úrovně', 'Čo posudzuje pedagóg a aké sú úrovne') +
    '</summary><p>' + html(c.goal) + '</p><ul>' +
    c.checks.map(check => '<li>' + html(check) + '</li>').join('') + '</ul>' +
    menuLevelList(c, confirmed, level) + '<p><b>' + t('Doklad práce', 'Doklad práce') + '</b> · ' + html(c.evidence) + '</p></details>' +
    '<details class="menu-detail-fold"><summary>' + t('Výukový modul a související dovednosti', 'Výučbový modul a súvisiace zručnosti') +
    '</summary><h3>' + html(mod.title) + '</h3><p>' + html(mod.description) + '</p>' +
    related.map(other => action('detail', menuSkillName(other) + ' →', other.code, 'text-link')).join(' ') + '</details>' +
    (latest ? '<div class="menu-evidence"><b>' + t('Pedagog potvrdil úroveň ', 'Pedagóg potvrdil úroveň ') + latest.level +
      '</b> · ' + html(dateLabel(latest.day)) + '<p>' + html(feedbackText(latest)) + '</p></div>' : '') +
    menuStudyRecord(model, c.code) + '</div>';
}

function menuRow(c, p, model) {
  const state = menuState(c, model);
  const expanded = menuOpenCode === c.code;
  const caption = menuSkillWhy(c, p);
  const level = maxLevel(model, c.code);
  return '<details class="menu-item" name="competency-menu" data-code="' + html(c.code) + '" data-level="' + level + '"' + (expanded ? ' open' : '') +
    '><summary><span class="menu-item-title"><strong class="menu-item-name">' + html(menuSkillName(c)) +
    '</strong><span class="menu-item-caption">' + html(caption) + '</span></span><span class="menu-item-status" data-tone="' +
    state.tone + '">' + html(state.label) + (level ? '<i class="row-level level-' + level + '" aria-hidden="true"></i>' : '') + '</span><span class="menu-plus" aria-hidden="true"></span></summary>' +
    (expanded ? menuSkillBody(c, p, model) : '') + '</details>';
}

function pathPage() {
  const p = person(), model = data(), all = skillSet(p);
  const skills = all.filter(c => menuAccepts(c, model));
  const current = model.shift.code, cook = p.track === 'cook';
  const specialty = cook ? t('Kuchyně', 'Kuchyňa') : t('Obsluha');
  const groups = [
    ['shift', t('Co se při tom učím', 'Čo sa pri tom učím'), '', c => c.code === current],
    ...skillChapters(p).map(chapter => [chapter.id, chapter.name, chapter.photo, chapter.accepts])
  ];
  let remaining = skills;
  const sections = groups.map(([chapter, heading, image, accepts], i) => {
    const rows = remaining.filter(accepts);
    if (!rows.length) return '';
    remaining = remaining.filter(c => !accepts(c));
    return '<section class="menu-section' + (i === 0 ? ' menu-featured' : '') + '" data-chapter="' + chapter + '"><header class="menu-section-head">' +
      (image ? '<img class="menu-section-image" src="' + html(image) + '" alt="" decoding="async" loading="lazy">' : '') + '<h2>' + html(heading) + '</h2>' + (i === 0 ? goBtn('day', t('Moje směna →', 'Moja zmena →'), 'text-link') : '<small>' + rows.length + '</small>') +
      '</header><div class="menu-rows">' + rows.map(c => menuRow(c, p, model)).join('') + '</div></section>';
  }).join('');
  const filters = [['all', t('Vše', 'Všetko')], ['specialty', specialty], ['shared', t('Společný základ', 'Spoločný základ')], ['confirmed', t('Potvrzené', 'Potvrdené')]];
  return '<div class="menu-page">' + passportIntro(p, model) + portfolioMap(p, model) +
    '<div class="menu-controls"><h2>' + t('Můj lístek dovedností', 'Môj lístok zručností') + '</h2><div class="menu-filters" role="group" aria-label="' + t('Zobrazit dovednosti', 'Zobraziť zručnosti') + '">' +
    filters.map(([key, label]) => action('menu-filter', label, key, 'choice', 'aria-pressed="' + (menuFilter === key) + '"')).join('') +
    '</div></div>' + (sections || '<p>' + t('Zatím tu není potvrzená dovednost. První přibude po hodnocení pedagogem.', 'Zatiaľ tu nie je potvrdená zručnosť. Prvá pribudne po hodnotení pedagógom.') + '</p>') +
    '<details class="menu-detail-fold menu-program"><summary>' + t('Profil absolventa a výukové moduly', 'Profil absolventa a výučbové moduly') +
    '</summary><p>' + html(cook ? t('Od přípravy surovin k samostatnému výdeji.', 'Od prípravy surovín k samostatnému výdaju.') :
      t('Od prvního prostření k samostatné obsluze hostů.', 'Od prvého prestretia k samostatnej obsluhe hostí.')) +
    ' ' + t('Pracovní mapa oboru Kuchař–číšník. Přiřazení ke svému vzdělávacímu programu ověřuje škola.', 'Pracovná mapa odboru kuchár–čašník. Priradenie k svojmu vzdelávaciemu programu overuje škola.') +
    '</p>' + cat().modules.filter(mod => all.some(c => c.module === mod.id)).map(mod =>
      '<details><summary>' + html(mod.title) + '</summary><p>' + html(mod.description) + '</p>' +
      all.filter(c => c.module === mod.id).map(c => action('detail', menuSkillName(c) + ' →', c.code, 'text-link')).join(' ') + '</details>'
    ).join('') + '<a href="archiv.html">' + t('Další aktivity původní akademie', 'Ďalšie aktivity pôvodnej akadémie') + ' ↗</a></details></div>';
}

function openMenuSkill(code) {
  guard(role === 'student' && skillSet(person()).some(c => c.code === code));
  if (!menuAccepts(competency(code), data())) menuFilter = 'all';
  menuOpenCode = code;
  go('path');
  focusMenuRow(code);
}

function focusMenuRow(code) {
  const summary = [...document.querySelectorAll('.menu-item')].find(el => el.dataset.code === code)?.querySelector('summary');
  if (summary) { summary.focus({preventScroll:true}); summary.scrollIntoView({block:'start'}); }
}

function menuFilterAction(key) {
  guard(role === 'student' && view === 'path' && ['all','specialty','shared','confirmed'].includes(key));
  menuFilter = key;
  if (menuOpenCode && !menuAccepts(competency(menuOpenCode), data())) menuOpenCode = '';
  render();
  document.querySelector('[data-do="menu-filter"][data-value="' + key + '"]')?.focus({preventScroll:true});
}

// Mount only the expanded skill. Long lists stay light even when the learner has years of evidence.
document.addEventListener('toggle', event => {
  const row = event.target;
  if (role !== 'student' || view !== 'path' || !row.matches?.('.menu-item') || !row.isConnected) return;
  const code = row.dataset.code;
  if (row.open) {
    menuOpenCode = code;
    if (!row.querySelector('.menu-body')) row.insertAdjacentHTML('beforeend', menuSkillBody(competency(code), person(), data()));
  } else {
    if (menuOpenCode === code) menuOpenCode = '';
    row.querySelector('.menu-body')?.remove();
  }
}, true);
