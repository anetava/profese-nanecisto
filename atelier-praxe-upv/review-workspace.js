'use strict';
window.REVIEW = (() => {
  const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const array = value => Array.isArray(value) ? value : [];
  const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('cs');
  const labels = {submitted:'Čeká na rozbor', returned:'K doplnění', confirmed:'Rozbor uzavřen'};
  const order = {submitted:0, returned:1, confirmed:2};
  const stateNames = {all:'Všechny podklady', submitted:'K rozboru', returned:'Vrácené studentům', confirmed:'Uzavřené'};
  const typeNames = {all:'Záznamy i reflexe', record:'Záznamy z praxe', reflection:'Reflexe bloků'};
  let filter = {state:'all', type:'all', query:''};
  let items = [];
  const blockName = id => window.BLOCKS?.get(id)?.title || 'Blok praxe';
  const shorten = (value, limit = 190) => {
    const text = String(value ?? '').trim();
    return text.length > limit ? text.slice(0, limit - 1).trimEnd() + '…' : text;
  };
  function dateLabel(value) {
    if (!value) return '';
    const date = new Date(String(value).length === 10 ? value + 'T12:00:00' : value);
    return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('cs-CZ', {day:'numeric', month:'long', year:'numeric'});
  }
  function collect(people, db) {
    const result = [];
    for (const person of array(people)) {
      const entry = db?.[person.id];
      if (!entry) continue;
      for (const raw of array(entry.records)) {
        if (!Object.hasOwn(labels, raw?.status)) continue;
        const record = window.PRACTICE?.readable?.(raw, 'ivp');
        if (!record) continue;
        result.push({
          type:'record', owner:person.id, person:person.name, id:raw.id, block:record.moduleId,
          title:record.title || 'Záznam z praxe', status:raw.status,
          date:[raw.reviewedAt,raw.submittedAt,record.date].filter(Boolean).sort().at(-1)||'',
          situation:record.reflection || Object.values(record.fields || {}).find(Boolean) || '',
          meaning:'', next:record.nextStep || '', feedback:raw.feedback || '',
          competency:record.competency || ''
        });
      }
      for (const raw of array(entry.reflections)) {
        if (!Object.hasOwn(labels, raw?.status)) continue;
        const events = array(raw.history);
        const sent = events.filter(event => event?.type === 'submitted').at(-1);
        // Returned drafts can be amended. Show only the last explicitly submitted version.
        if (!sent) continue;
        const reply = events.filter(event => ['returned','confirmed'].includes(event?.type)).at(-1);
        result.push({
          type:'reflection', owner:person.id, person:person.name, id:raw.id, block:raw.blockId,
          title:sent.topic || blockName(raw.blockId), status:raw.status,
          date:events.at(-1)?.at || raw.date || '',
          situation:sent.observation || '', meaning:sent.meaning || '', next:sent.next || '',
          feedback:reply?.message || '', competency:''
        });
      }
    }
    return result.sort((a,b) => order[a.status] - order[b.status] || String(b.date).localeCompare(String(a.date)) || String(a.person).localeCompare(String(b.person), 'cs'));
  }
  function matching() {
    const query = normalize(filter.query).trim();
    return items.filter(item => (filter.state === 'all' || item.status === filter.state) &&
      (filter.type === 'all' || item.type === filter.type) &&
      (!query || normalize([item.person,item.title,item.date,dateLabel(item.date),blockName(item.block),item.situation,item.meaning,item.next,item.feedback,item.competency].join(' ')).includes(query)));
  }
  const icon = type => type === 'record'
    ? '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6"/></svg>'
    : '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 4h16v12H9l-5 5zM8 8h8M8 12h5"/></svg>';
  function preview(item) {
    const fields = item.type === 'reflection'
      ? [['Situace',item.situation],['Co mi ukázala',item.meaning],['Další krok',item.next]]
      : [['Reflexe u záznamu',item.situation],['Další krok',item.next],['Přiřazená kompetence',item.competency]];
    return '<details class="rv-preview"><summary>Nahlédnout do předané verze</summary><dl>' + fields.filter(([,text]) => text).map(([label,text]) => '<div><dt>' + escape(label) + '</dt><dd>' + escape(text) + '</dd></div>').join('') + '</dl></details>';
  }
  function card(item) {
    const button = item.status === 'submitted' ? 'Otevřít a dát zpětnou vazbu' : item.status === 'returned' ? 'Zobrazit vrácenou práci' : 'Prohlédnout uzavřený rozbor';
    return '<article class="rv-card" data-status="' + item.status + '" data-kind="' + item.type + '"><div class="rv-card-top"><span class="rv-kind">' + icon(item.type) + (item.type === 'record' ? 'Záznam z praxe' : 'Reflexe bloku') + '</span><span class="rv-state">' + labels[item.status] + '</span></div>' +
      '<div class="rv-person">' + escape(item.person) + '</div><h2>' + escape(item.title) + '</h2><p class="rv-block">' + escape(blockName(item.block)) + '</p>' +
      '<p class="rv-excerpt">' + escape(shorten(item.situation) || 'Předaný podklad je připravený k otevření.') + '</p>' +
      (item.feedback ? '<div class="rv-feedback"><strong>Poslední zpětná vazba</strong><p>' + escape(shorten(item.feedback, 170)) + '</p></div>' : '') + preview(item) +
      '<div class="rv-card-bottom"><small>' + escape(dateLabel(item.date)) + '</small><button type="button" class="primary" data-review-open="' + items.indexOf(item) + '">' + button + ' →</button></div></article>';
  }
  function cards() {
    const visible = matching();
    return visible.length ? visible.map(card).join('') : '<div class="rv-empty"><h2>' + (items.length ? 'Tomuto výběru nic neodpovídá.' : 'Zatím tu není předaný podklad.') + '</h2><p>' +
      (items.length ? 'Změňte stav, typ podkladu nebo hledaný text.' : 'Jakmile student předá záznam nebo reflexi, objeví se zde. Rozepsanou práci sem nezařazujeme.') + '</p>' +
      (items.length ? '<button type="button" class="secondary" data-review-reset>Zrušit filtry</button>' : '<a class="secondary" href="#umisteni">Přehled studentů →</a>') + '</div>';
  }
  const resultLabel = () => 'Zobrazené podklady: ' + matching().length + ' z ' + items.length;
  function render({people = [], db = {}} = {}) {
    items = collect(people, db);
    return '<section class="review-workspace" data-review-queue><header class="rv-hero"><div><small>KOORDINÁTOR IVP · 2026/2027</small><h1>Předané práce<br>studentů.</h1><p>Záznamy z praxe i reflexe na jednom místě. Nejdřív uvidíte práce, které čekají na vaši odpověď.</p></div><aside><details class="rv-guide"><summary>Jak probíhá rozbor?</summary><p>Otevřete předanou práci. Připojte zpětnou vazbu a rozbor uzavřete, nebo jej vraťte studentovi k doplnění.</p></details><a href="#umisteni">Zpět na přehled studentů →</a></aside></header>' +
      '<nav class="rv-statuses" aria-label="Stav podkladů">' + Object.entries(stateNames).map(([state,label]) => '<button type="button" data-review-state="' + state + '" aria-pressed="' + (filter.state === state) + '"><strong>' + (state === 'all' ? items.length : items.filter(item => item.status === state).length) + '</strong><span>' + label + '</span></button>').join('') + '</nav>' +
      '<form class="rv-filters" aria-label="Hledání v podkladech"><label>Student, téma nebo blok<input type="search" data-review-query value="' + escape(filter.query) + '" placeholder="Začněte jménem nebo tématem…"></label><label>Typ podkladu<select data-review-type>' + Object.entries(typeNames).map(([type,label]) => '<option value="' + type + '"' + (filter.type === type ? ' selected' : '') + '>' + label + '</option>').join('') + '</select></label><button type="button" class="secondary" data-review-reset>Zrušit filtry</button></form>' +
      '<div class="rv-results"><p role="status" aria-live="polite" data-review-count>' + resultLabel() + '</p><small>Čekající → vrácené → uzavřené</small></div><div class="rv-grid" data-review-cards>' + cards() + '</div><p class="rv-local-note">Pracovní přehled v tomto prohlížeči. Uzavření jednotlivého rozboru samo neuzavírá celou praxi.</p></section>';
  }
  function bind(root, {openRecord, openReflection} = {}) {
    const box = root?.matches?.('[data-review-queue]') ? root : root?.querySelector?.('[data-review-queue]');
    if (!box || box.dataset.reviewBound) return;
    box.dataset.reviewBound = 'true';
    function repaint() {
      box.querySelector('[data-review-cards]').innerHTML = cards();
      box.querySelector('[data-review-count]').textContent = resultLabel();
      box.querySelectorAll('[data-review-state]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.reviewState === filter.state)));
    }
    box.addEventListener('submit', event => event.preventDefault());
    box.addEventListener('input', event => {
      if (!event.target.matches('[data-review-query]')) return;
      filter.query = event.target.value;
      repaint();
    });
    box.addEventListener('change', event => {
      if (!event.target.matches('[data-review-type]')) return;
      const type = event.target.value;
      if (!Object.hasOwn(typeNames, type)) return;
      filter.type = type;
      repaint();
    });
    box.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button || !box.contains(button)) return;
      if (Object.hasOwn(stateNames, button.dataset.reviewState)) {
        filter.state = button.dataset.reviewState;
        repaint();
      }
      if (button.hasAttribute('data-review-reset')) {
        filter = {state:'all', type:'all', query:''};
        box.querySelector('[data-review-query]').value = '';
        box.querySelector('[data-review-type]').value = 'all';
        repaint();
      }
      if (button.hasAttribute('data-review-open')) {
        const item = items[Number(button.dataset.reviewOpen)];
        if (!item) return;
        if (item.type === 'record') openRecord?.(item.owner, item.block, item.id);
        else openReflection?.(item.id);
      }
    });
  }
  return {render, bind};
})();
