'use strict';
window.ATDOC = (() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const mark = '';
  const base='materialy/foxy/FOXY-STUDIO-protokol-';
  const documents=[
    ['Závěrečný protokol · k hodnocení','Student připraví své údaje a podklady. Hodnocení, rozhodnutí a podpisy doplňuje oprávněný pedagog nebo komise. Koncept není potvrzením praxe.','Vyplnit koncept',base+'koncept.html'],
    ['Vzor vyplněného protokolu','Podívejte se, kam patří hodnocení, složení komise a podpisy. Ukázka obsahuje fiktivní údaje.','Prohlédnout vzor',base+'UKAZKA-IVP-PX-2026-000001.html']
  ];
  function fileCard(item) {
    const [title,desc,open,url]=item;
    return '<article class="file-card"><small class="document-kind">Hodnocení pedagoga · 2026/2027</small><h3>'+title+'</h3><p>'+desc+'</p><div><a class="primary" href="'+url+'?v=komplet-202627" target="_blank" rel="noopener">'+open+' ↗</a><a class="text-btn" href="'+url+'?v=komplet-202627" download>Stáhnout HTML ↓</a></div></article>';
  }
  const expo=(kind,label)=>'<button type="button" class="secondary" data-exp-kind="'+kind+'">'+label+'</button>';
  function exportCards(role='student') {
    const variants=[
      ['full','Moje doklady · 2026/2027','Celé portfolio','Přehled vlastních záznamů, reflexí a zpětné vazby. Stáhněte jej pro archiv a před odevzdáním zkontrolujte úplnost.','portfolio-praxi-ukazka.html'],
      ['brief','K rozboru · 2026/2027','Stručné portfolio','Stručný podklad k rozhovoru: mapa kompetencí, až tři doklady a další krok. Úplné záznamy zůstávají v celém portfoliu.','portfolio-praxi-strucne-ukazka.html']
    ];
    return variants.map(([kind,badge,title,desc,file])=>{
      const demo='<a href="materialy/foxy/'+file+'?v=komplet-202627" target="_blank" rel="noopener">Ukázka s fiktivními údaji ↗</a>';
      const actions=role==='student'?'<div><a class="primary" href="#nahled/'+kind+'">Prohlédnout moje portfolio</a>'+expo(kind,'Stáhnout HTML ↓')+'</div><p class="sample-link">'+demo+'</p>':
        '<div>'+demo+'<a href="materialy/foxy/'+file+'?v=komplet-202627" download>Stáhnout vzor ↓</a></div>';
      return '<article class="file-card"><small class="document-kind">'+badge+'</small><h3>'+title+'</h3><p>'+desc+'</p>'+actions+'</article>';
    }).join('');
  }
  function library(role = 'student', section = 'all') {
    const student = role === 'student';
    const header = '<header class="document-hero"><div><small class="eyebrow">Akademický rok 2026/2027</small><h1>Všechno k praxi.<br>Na jednom místě.</h1><p>'+(student?'Vyberte svůj blok. Stáhněte formulář, otevřete metodiku nebo vyberte odpovědi v reflexi.':'U každého bloku jsou pohromadě formuláře pro studenta, metodika i požadované výstupy.')+'</p><div class="document-jumps"><a href="#pracovni-listy" data-worksheets>Formuláře k praxi ↓</a><a href="#materialy/vystupy">Závěrečné výstupy a portfolio ↓</a></div></div><img src="phase-6.webp?v=atelier-foto1" alt=""></header>';
    const start = '<section class="document-start" aria-label="Jak pracovat s dokumenty"><div><b>01 · PŘED PRAXÍ</b><h2>Vím, co mě čeká</h2><p>Vyberte blok a otevřete jeho metodiku. Zjistíte rozsah praxe, co sledovat a co budete dokládat.</p></div><div><b>02 · PŘI PRAXI A PO NÍ</b><h2>Vyplním vlastní záznam</h2><p>Ve formuláři vyberte odpovědi a doplňte konkrétní situaci. Po rozboru přidejte reflexi a svůj další krok.</p></div><div><b>03 · PŘED ODEVZDÁNÍM</b><h2>Zkontroluji své podklady</h2><p>Projděte kontrolní seznam v dokumentu. Portfolio připravte podle zadání IVP; hodnocení doplní pedagog.</p></div></section>';
    const guide = '<section class="panel"><h2>Začněte krátkým návodem</h2><p>Šest kroků vysvětluje, proč záznam vedete, jak jej vyplnit a co zkontrolovat před odevzdáním. Pro náslechy platí 10 teoretických a 2 praktické jednotky.</p><div class="actions"><a class="primary" href="materialy/zacnete-zde.pdf?v=komplet-202627" target="_blank" rel="noopener">Jak pracovat s dokumenty · PDF ↗</a><a class="secondary" href="materialy/zacnete-zde.docx?v=komplet-202627" download>Návod ve Wordu ↓</a></div></section>';
    const outputs = '<section class="document-section" id="dokumenty-vystupy" tabindex="-1" aria-label="Závěrečné dokumenty a portfolio"><div class="document-section-heading"><div><small class="eyebrow">UZAVŘENÍ PRAXE · 2026/2027</small><h2>Závěrečné dokumenty a portfolio</h2></div><p>Výstupní formulář shrnuje praxi. Portfolio uchovává záznamy. Protokol slouží k závěrečnému hodnocení.</p></div><section class="student-output final-output"><small>VÝSTUP STUDENTA · 2026/2027</small><h3>Závěrečný souhrn praxe</h3><p>'+(student?'Vyberte, co dokládáte, zhodnoťte svůj posun a připravte podklad k závěrečnému rozboru.':'Student vybírá své doklady, hodnotí profesní posun a připravuje podklad k závěrečnému rozboru.')+' Hodnocení pedagoga a podpisy zůstávají v protokolu.</p><div class="actions"><a class="primary" href="zaverecny-vystup.html">'+(student?'Vyplnit závěrečný výstup':'Prohlédnout výstupní formulář')+' →</a><a class="secondary" href="zaverecny-vystup.html" download>Stáhnout vyplnitelný formulář ↓</a>'+(student?'<a class="secondary" href="#nahled/full">Moje portfolio →</a>':'')+'</div></section><div class="file-grid" aria-label="Protokoly a portfolia">'+documents.map(fileCard).join('')+exportCards(role)+'</div></section>';
    return section === 'header' ? header + guide + start : section === 'outputs' ? outputs : header + guide + start + outputs;
  }
  const css=`
*{box-sizing:border-box}body{margin:0;background:#f3e8ec;color:#27171d;font:15px/1.55 system-ui,Arial,sans-serif;overflow-wrap:anywhere}main,nav{max-width:210mm;margin:0 auto}nav{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:16px}button{font:inherit;font-weight:700;border:0;border-radius:7px;padding:9px 16px;background:#27171d;color:#fff;cursor:pointer}.sheet{background:white;margin:0 0 18px;padding:clamp(20px,6vw,15mm);min-height:230mm}.top{display:flex;align-items:center;gap:10px;border-bottom:2px solid #772d48;padding-bottom:10px;font-weight:750}.top small{margin-left:auto}small,.k{color:#5b3945}.k{letter-spacing:.095em;text-transform:uppercase;font-weight:750;font-size:12px}h1,h2,h3{line-height:1.12;letter-spacing:-.03em;text-wrap:balance}h1{font-size:clamp(38px,8vw,62px);margin:.35em 0}h2{font-size:30px;margin:1.1em 0 .55em}h3{font-size:20px}p{margin:8px 0 12px}.band,.excerpt{padding:12px 16px;background:#f4e5ea;border-left:4px solid #893453;margin:14px 0}.excerpt:nth-of-type(even){background:#f1dbe3;border-color:#95395a}.sheet article{border-top:1px solid #d9c7cd;padding:8px 0}.sheet article p{white-space:pre-line}.excerpt h3{margin:4px 0}.map{display:grid;grid-template-columns:1fr 1fr;gap:9px 16px}.area{border-top:2px solid #b66381;padding-top:5px}.area strong{font-size:14px}.area ul{margin:4px 0;padding:0;list-style:none}.area li{font-size:12px;margin:4px 0;line-height:1.25}.folio{font-size:12px;color:#61454f;border-top:1px solid #d2bfc6;padding-top:7px;margin-top:16px}h4{margin:10px 0 0}.record-export{overflow-wrap:anywhere}@media(max-width:540px){.map{grid-template-columns:1fr}.sheet{min-height:0}.top small{font-size:10px}}button{border-radius:0;background:#27171d}.top{border-bottom:3px solid #c6688a;padding-bottom:12px;color:#27171d}.top svg{flex:0 0 38px}.top small{color:#27171d;font-size:11px}.sheet{border-top:7px solid #c6688a}.sheet:nth-child(even){border-top-color:#d38aa4}h1,h2,h3{color:#27171d}.purpose{background:#f1dbe3;padding:15px 18px;border-left:4px solid #d38aa4;margin:18px 0}.purpose h2{font-size:20px;margin:0 0 7px}.purpose p{font-size:13px;line-height:1.5}.band{background:#f4e5ea;border-color:#c6688a}.band p{font-size:13px;margin:5px 0 0}.area{padding:10px;background:#f7eff2;border-color:#c6688a}.area:nth-child(even){background:#f6e9ee;border-color:#d38aa4}.folio{color:#482733}.sheet article{border-top:2px solid #d4b0bd;margin-top:18px}.record-body h4{color:#5c2337;font-size:13px}.record-body p{margin:4px 0 9px}.record-body table{width:100%;border-collapse:collapse;font-size:12px}.record-body th,.record-body td{border:1px solid #c9aeb8;padding:7px;text-align:left;vertical-align:top}.record-body th{background:#f4e5ea}@media print{.sheet{border-top:4px solid #c6688a;padding-top:4mm!important}.sheet:nth-child(even){border-top-color:#d38aa4}.purpose{padding:3mm 4mm}.purpose p,.band p{font-size:9pt}.purpose h2{font-size:13pt}.top small{font-size:8pt}.area{padding:2mm}.record-body table{font-size:9pt}.record-body h4{font-size:10pt}.folio{font-size:8pt}}
@page{size:A4;margin:13mm}@media print{body{background:white;font:10pt/1.38 Arial,sans-serif}nav{display:none}main{max-width:none}.sheet{padding:0;margin:0;min-height:0}.sheet+.sheet{break-before:page}.top,h2,h3,h4{break-after:avoid}.area,.excerpt{break-inside:avoid}.map{grid-template-columns:1fr 1fr}.area li{font-size:9pt}.sheet *{print-color-adjust:exact;-webkit-print-color-adjust:exact}}
`;
  function today(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
  const short=(s,n=220)=>{s=String(s||'').trim();return esc(s.length>n?s.slice(0,n-1).trimEnd()+'…':s);};
  const label=r=>r.isRetry?'Osobní druhý pokus':r.isBlockReflection?(r.fields?.['Stav reflexe']||'Reflexe pro IVP'):r.tool?'Vlastní poznámka':PRACTICE.statusLabel(r.status);
  const moduleOf=r=>r.blockId||r.tool||r.moduleId;
  const titleOf=id=>BLOCKS.get(id)?.title||'Další záznamy';
  function competencyMap(rows){
    return '<div class="band"><strong>Jak mapu číst</strong><p>Například <b>2 / 3</b> znamená: dva doklady mají uzavřený rozbor, celkem jsou ke kompetenci přiřazeny tři. Počet dokladů není známka ani automatické potvrzení zvládnutí kompetence.</p></div><div class="map">'+AREAS.map(area=>'<div class="area"><strong>'+esc(area.name)+'</strong><ul>'+area.skills.map(s=>{const linked=rows.filter(r=>r.competency===s.code&&!r.isRetry);return '<li>'+esc(s.code)+' '+esc(s.name)+' <b>('+linked.filter(r=>r.status==='confirmed').length+'/'+linked.length+')</b></li>';}).join('')+'</ul></div>').join('')+'</div>';
  }
  function portfolioBody(record) {
    return PRACTICE.recordBody(record);
  }
  const recordCount=n=>n+' '+(n===1?'záznam':n>=2&&n<=4?'záznamy':'záznamů');
  const displayDate=value=>/^\d{4}-\d{2}-\d{2}$/.test(value||'')?value.split('-').reverse().map(Number).join('. '):String(value||'');
  function exportHtml(kind,person,records) {
    const rows=records.slice().sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));
    const latest=rows.slice().reverse(), reviewed=rows.filter(r=>r.status==='confirmed'&&!r.isBlockReflection&&!r.tool&&!r.isRetry);
    const brief=kind==='brief', heading=brief?'Stručné portfolio pedagogických praxí':'Portfolio pedagogických praxí';
    const sheet=(section,body,footer)=>'<section class="sheet"><div class="top">'+mark+' Ateliér praxí <small>Akademický rok 2026/2027</small></div><p class="k">'+esc(section)+'</p>'+body+'<p class="folio">'+esc(person.name)+' · 2026/2027 · '+esc(footer)+'</p></section>';
    const counts=BLOCKS.list.filter(item=>rows.some(r=>moduleOf(r)===item.id)).map(b=>'<li>'+esc(b.title)+' · '+recordCount(rows.filter(r=>moduleOf(r)===b.id).length)+'</li>').join('');
    let body=sheet('Studium učitelství praktického vyučování','<h1>'+heading+'</h1><p><strong>'+esc(person.name)+'</strong>'+(window.IVP_ROSTER?'':' · ukázkový profil')+'</p><div class="band"><b>'+recordCount(rows.length)+'</b> v portfoliu · <b>'+recordCount(reviewed.length)+'</b> z praxe s uzavřeným rozborem</div><div class="purpose"><h2>K čemu portfolio slouží</h2><p>Na konkrétních záznamech ukazuje, jak přemýšlím o výuce a co měním ve své praxi. Slouží k rozboru s pedagogem a k uchování mého profesního pokroku.</p><p><strong>Před odevzdáním:</strong> ověřím správný profil, doklady ze všech požadovaných bloků, vlastní reflexe a zpětnou vazbu. Tento přehled sám nepotvrzuje splnění praxe.</p></div><h2>Moje praxe</h2>'+(counts?'<ul>'+counts+'</ul>':'<p>V tomto profilu zatím nejsou záznamy. V Ateliéru otevřete svůj blok, vyplňte první záznam a připojte reflexi. Potom portfolio stáhněte znovu.</p>'),brief?'1 / 4':'Přehled');
    body+=sheet('Pedagogická praxe','<h2>Moje kompetenční mapa</h2>'+competencyMap(rows),brief?'2 / 4':'Kompetence');
    if(brief){
      const evidence=[...reviewed.slice().reverse(),...latest.filter(r=>!reviewed.includes(r))].slice(0,3);
      const boxes=evidence.map(r=>'<div class="excerpt"><small>'+esc(label(r))+(r.date?' · '+esc(r.date):'')+'</small><h3>'+short(r.title||'Záznam',85)+'</h3><p>'+short(r.reflection||Object.values(r.fields||{}).find(Boolean)||r.nextStep||'K tomuto záznamu zatím chybí poznámka.')+'</p></div>').join('');
      body+=sheet('Doklady z výuky','<h2>Zkušenosti, o které se opírám</h2><p>Výběr nejvýše tří dokladů pro rozhovor. Přednost mají záznamy s uzavřeným rozborem, potom nejnovější zkušenosti. Podrobnosti ověřte v celém portfoliu.</p>'+(boxes||'<p>Zatím bez dokladů.</p>'),'3 / 4');
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
    return '<!doctype html><html lang="cs"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+heading+' · '+esc(person.name)+' · 2026/2027</title><style>'+css+'</style><body><nav><b>Ateliér praxí</b><button onclick="window.print()">Tisk / uložit PDF</button></nav><main>'+body+'</main></body></html>';
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
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Atelier praxi//IVP//CS','CALSCALE:GREGORIAN','X-WR-CALNAME:Ateliér praxí 2026/2027'];
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
