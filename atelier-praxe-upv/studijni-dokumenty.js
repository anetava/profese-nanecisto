'use strict';
window.ATDOC = (() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const mark = '<svg aria-hidden="true" viewBox="0 0 64 64" width="38" height="38" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="15" fill="#162d32"/><path d="M8 47 28 13h8L19 47z" fill="#55d9c3"/><path d="M35 18 57 47H44L30 28z" fill="#f492ae"/><circle cx="30" cy="44" r="5" fill="#f9dfaa"/></svg>';
  const base='materialy/foxy/FOXY-STUDIO-protokol-';
  const documents=[
    ['Koncept protokolu','Vyplňte údaje k závěrečnému výstupu. Koncept můžete uložit a později se k němu vrátit.','Vyplnit koncept',base+'koncept.html'],
    ['Vzor vyplněného protokolu','Podívejte se, kam patří hodnocení, složení komise a podpisy. Ukázka obsahuje fiktivní údaje.','Prohlédnout vzor',base+'UKAZKA-IVP-PX-2026-000001.html']
  ];
  function fileCard(item) {
    const [title,desc,open,url]=item;
    return '<article class="file-card"><small>Protokol FOXY STUDIO</small><h3>'+title+'</h3><p>'+desc+'</p><div><a class="primary" href="'+url+'?v=rok2627" target="_blank" rel="noopener">'+open+' ↗</a><a class="text-btn" href="'+url+'?v=rok2627" download>Stáhnout HTML ↓</a></div></article>';
  }
  const expo=(kind,label)=>'<button type="button" class="secondary" data-exp-kind="'+kind+'">'+label+'</button>';
  function exportCards(role='student') {
    const variants=[
      ['full','Do archivu','Celé portfolio','Všechny záznamy podle praxí, kompetenční mapa, vlastní poznámky a přijatá zpětná vazba.','portfolio-praxi-ukazka.html'],
      ['brief','K rozhovoru','Stručné portfolio','Čtyři strany A4 k rozboru. Mapa kompetencí, až tři doklady a další krok do výuky.','portfolio-praxi-strucne-ukazka.html']
    ];
    return variants.map(([kind,badge,title,desc,file])=>{
      const demo='<a href="materialy/foxy/'+file+'?v=rok2627" target="_blank" rel="noopener">Ukázka s fiktivními údaji ↗</a>';
      const actions=role==='student'?'<div><a class="primary" href="#nahled/'+kind+'">Prohlédnout moje portfolio</a>'+expo(kind,'Stáhnout HTML ↓')+'</div><p class="sample-link">'+demo+'</p>':
        '<div>'+demo+'<a href="materialy/foxy/'+file+'?v=rok2627" download>Stáhnout vzor ↓</a></div>';
      return '<article class="file-card"><small>'+badge+'</small><h3>'+title+'</h3><p>'+desc+'</p>'+actions+'</article>';
    }).join('');
  }
  function library(role) {
    return '<header class="document-hero"><div><small class="eyebrow">Akademický rok 2026/2027</small><h1>Dokumenty k praxím</h1><p>Do školy si vezměte pracovní list. K závěrečnému výstupu otevřete protokol.'+(role==='student'?' Své portfolio si stáhnete i pro práci bez internetu.':'')+'</p><a href="#pracovni-listy" data-worksheets>Vybrat pracovní list ↓</a></div><img src="phase-6.webp" alt=""></header><section class="file-grid" aria-label="Protokoly a portfolia">'+documents.map(fileCard).join('')+exportCards(role)+'</section>';
  }
  const css=`
*{box-sizing:border-box}body{margin:0;background:#eaf1ee;color:#162f31;font:15px/1.55 system-ui,Arial,sans-serif;overflow-wrap:anywhere}main,nav{max-width:210mm;margin:0 auto}nav{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:16px}button{font:inherit;font-weight:700;border:0;border-radius:7px;padding:9px 16px;background:#17393a;color:#fff;cursor:pointer}.sheet{background:white;margin:0 0 18px;padding:clamp(20px,6vw,15mm);min-height:230mm}.top{display:flex;align-items:center;gap:10px;border-bottom:2px solid #287c72;padding-bottom:10px;font-weight:750}.top small{margin-left:auto}small,.k{color:#395b58}.k{letter-spacing:.095em;text-transform:uppercase;font-weight:750;font-size:12px}h1,h2,h3{line-height:1.12;letter-spacing:-.03em;text-wrap:balance}h1{font-size:clamp(38px,8vw,62px);margin:.35em 0}h2{font-size:30px;margin:1.1em 0 .55em}h3{font-size:20px}p{margin:8px 0 12px}.band,.excerpt{padding:12px 16px;background:#dff5ee;border-left:4px solid #25988b;margin:14px 0}.excerpt:nth-of-type(even){background:#fbe4ec;border-color:#c4658a}.sheet article{border-top:1px solid #c7d9d3;padding:8px 0}.sheet article p{white-space:pre-line}.excerpt h3{margin:4px 0}.map{display:grid;grid-template-columns:1fr 1fr;gap:9px 16px}.area{border-top:2px solid #63b6aa;padding-top:5px}.area strong{font-size:14px}.area ul{margin:4px 0;padding:0;list-style:none}.area li{font-size:12px;margin:4px 0;line-height:1.25}.folio{font-size:12px;color:#45615d;border-top:1px solid #bfd2ce;padding-top:7px;margin-top:16px}h4{margin:10px 0 0}.record-export{overflow-wrap:anywhere}@media(max-width:540px){.map{grid-template-columns:1fr}.sheet{min-height:0}.top small{font-size:10px}}@page{size:A4;margin:13mm}@media print{body{background:white;font:10pt/1.38 Arial,sans-serif}nav{display:none}main{max-width:none}.sheet{padding:0;margin:0;min-height:0}.sheet+.sheet{break-before:page}.top,h2,h3,h4{break-after:avoid}.area,.excerpt{break-inside:avoid}.map{grid-template-columns:1fr 1fr}.area li{font-size:9pt}.sheet *{print-color-adjust:exact;-webkit-print-color-adjust:exact}}
`;
  function today(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
  const short=(s,n=220)=>{s=String(s||'').trim();return esc(s.length>n?s.slice(0,n-1).trimEnd()+'…':s);};
  const label=r=>r.isRetry?'Osobní druhý pokus':r.isBlockReflection?(r.fields?.['Stav reflexe']||'Reflexe pro IVP'):r.tool?'Vlastní poznámka':PRACTICE.statusLabel(r.status);
  const moduleOf=r=>r.blockId||r.tool||r.moduleId;
  const titleOf=id=>BLOCKS.get(id)?.title||'Další záznamy';
  function competencyMap(rows){
    return '<p>U každé kompetence je počet dokladů s uzavřeným rozborem a počet všech přiřazených dokladů.</p><div class="map">'+AREAS.map(area=>'<div class="area"><strong>'+esc(area.name)+'</strong><ul>'+area.skills.map(s=>{const linked=rows.filter(r=>r.competency===s.code&&!r.isRetry);return '<li>'+esc(s.code)+' '+esc(s.name)+' <b>('+linked.filter(r=>r.status==='confirmed').length+'/'+linked.length+')</b></li>';}).join('')+'</ul></div>').join('')+'</div>';
  }
  function portfolioBody(record) {
    // Personal entries retain their dates in the journal. The document has a single academic-year heading.
    const fields={...record.fields};
    if(record.isRetry && fields['Původní záznam'])fields['Původní záznam']=fields['Původní záznam'].replace(/ · \d{4}-\d{2}-\d{2}$/, '');
    if(record.isBlockReflection && fields['Dřívější zpětná vazba'])fields['Dřívější zpětná vazba']=fields['Dřívější zpětná vazba'].replace(/^\d{1,2}\.\s*\d{1,2}\.\s*\d{4} · /gm,'');
    return PRACTICE.recordBody({...record,fields,date:''});
  }
  function exportHtml(kind,person,records) {
    const rows=records.slice().sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));
    const latest=rows.slice().reverse(), reviewed=rows.filter(r=>r.status==='confirmed'&&!r.isBlockReflection&&!r.tool&&!r.isRetry);
    const brief=kind==='brief', heading=brief?'Stručné portfolio pedagogických praxí':'Portfolio pedagogických praxí';
    const sheet=(section,body,footer)=>'<section class="sheet"><div class="top">'+mark+' Ateliér praxí <small>Akademický rok 2026/2027</small></div><p class="k">'+esc(section)+'</p>'+body+'<p class="folio">'+esc(person.name)+' · '+esc(footer)+'</p></section>';
    const counts=BLOCKS.list.filter(item=>rows.some(r=>moduleOf(r)===item.id)).map(b=>'<li>'+esc(b.title)+' · '+rows.filter(r=>moduleOf(r)===b.id).length+'</li>').join('');
    let body=sheet('Studium učitelství praktického vyučování','<h1>'+heading+'</h1><p><strong>'+esc(person.name)+'</strong> · ukázkový profil</p><div class="band"><b>'+rows.length+'</b> záznamů v portfoliu · <b>'+reviewed.length+'</b> záznamů z praxe s uzavřeným rozborem</div><h2>Moje praxe</h2>'+(counts?'<ul>'+counts+'</ul>':'<p>V tomto profilu zatím nejsou záznamy.</p>'),brief?'1 / 4':'Přehled');
    body+=sheet('Pedagogická praxe','<h2>Moje kompetenční mapa</h2>'+competencyMap(rows),brief?'2 / 4':'Kompetence');
    if(brief){
      const evidence=[...reviewed.slice().reverse(),...latest.filter(r=>!reviewed.includes(r))].slice(0,3);
      const boxes=evidence.map(r=>'<div class="excerpt"><small>'+esc(label(r))+'</small><h3>'+short(r.title||'Záznam',85)+'</h3><p>'+short(r.reflection||Object.values(r.fields||{}).find(Boolean)||r.nextStep||'K tomuto záznamu zatím chybí poznámka.')+'</p></div>').join('');
      body+=sheet('Doklady z výuky','<h2>Zkušenosti, o které se opírám</h2><p>Přednost mají záznamy s uzavřeným rozborem, potom nejnovější zkušenosti.</p>'+(boxes||'<p>Zatím bez dokladů.</p>'),'3 / 4');
      const fromRecord=(r,text)=>r?'<p>'+short(text,350)+'</p><small>'+short(r.title,85)+'</small>':'<p>Zatím bez záznamu.</p>';
      const reflection=latest.find(r=>r.reflection), feedback=latest.find(r=>r.feedback), next=latest.find(r=>r.nextStep);
      body+=sheet('Příští hodina','<h2>Co si odnáším do výuky</h2><div class="excerpt"><h3>Moje poslední reflexe</h3>'+fromRecord(reflection,reflection?.reflection)+'</div><div class="excerpt"><h3>Zpětná vazba z praxe</h3>'+fromRecord(feedback,feedback?.feedback)+'</div><div class="excerpt"><h3>Můj další profesní krok</h3>'+fromRecord(next,next?.nextStep)+'</div>','4 / 4');
    } else {
      const ids=[...new Set([...BLOCKS.list.map(b=>b.id),...rows.map(moduleOf)])];
      for(const id of ids){
        const subset=rows.filter(r=>moduleOf(r)===id);
        if(subset.length)body+=sheet('Doklady a reflexe','<h2>'+esc(titleOf(id))+'</h2>'+subset.map(r=>'<article><small>'+esc(label(r))+'</small><h3>'+esc(r.title||'Záznam z praxe')+'</h3>'+portfolioBody(r)+'</article>').join(''),titleOf(id));
      }
    }
    return '<!doctype html><html lang="cs"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+heading+' · '+esc(person.name)+'</title><style>'+css+'</style><body><nav><b>Ateliér praxí</b><button onclick="window.print()">Tisk / uložit PDF</button></nav><main>'+body+'</main></body></html>';
  }
  function save(content,type,name){
    const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');
    a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),15000);
  }
  function download(kind,p,records){
    save(exportHtml(kind,p,records),'text/html;charset=utf-8','portfolio-praxi-'+(kind==='brief'?'strucne-':'')+'2026-2027.html');
  }
  function calendar(person,events) {
    const escape=s=>String(s??'').replace(/\\/g,'\\\\').replace(/\r\n|\r|\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
    const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Atelier praxi//IVP//CS','CALSCALE:GREGORIAN'];
    events.filter(ev=>/^\d{4}-\d{2}-\d{2}$/.test(ev.date)).forEach(ev=>{
      const end=new Date(ev.date+'T12:00:00Z');end.setUTCDate(end.getUTCDate()+1);
      lines.push('BEGIN:VEVENT','UID:'+encodeURIComponent(person.id)+'-'+encodeURIComponent(ev.id)+'@atelier-praxi','DTSTAMP:'+stamp,'DTSTART;VALUE=DATE:'+ev.date.replace(/-/g,''),'DTEND;VALUE=DATE:'+end.toISOString().slice(0,10).replace(/-/g,''),'SUMMARY:'+escape(ev.title),'DESCRIPTION:'+escape(titleOf(ev.moduleId)+(ev.note?'\n'+ev.note:'')),'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    const bytes=new TextEncoder();const fold=line=>{let output='',length=0;for(const char of line){const size=bytes.encode(char).length;if(length+size>74){output+='\r\n ';length=1;}output+=char;length+=size;}return output;};
    save(lines.map(fold).join('\r\n')+'\r\n','text/calendar;charset=utf-8','moje-praxe-'+today()+'.ics');
  }
  return {library,exportCards,download,calendar,exportHtml,today};
})();
