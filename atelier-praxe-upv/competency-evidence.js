'use strict';
// Local evidence routing, not an automated assessment of a student's competence.
// Field names are the existing form's structured questions. No keyword scoring.
window.COMPETENCY = (() => {
  const codes = ['1.1','1.2','2.1','2.2','2.3','2.4','2.5','3.1','3.2','3.3','4.1','4.2','4.3','5.1','5.2','6.1','6.2','6.3'];
  const labels = {
    observed:'Pozorováno u učitele', practice:'Vlastní pokus · čeká na posouzení',
    reflection:'Vlastní reflexe · čeká na posouzení', plan:'Příprava nebo modelová situace',
    manual:'Vlastní přiřazení · čeká na doložení',
    demonstrated:'Projev potvrzen pedagogem', partial:'Projev částečně doložen', notyet:'Projev zatím nedoložen'
  };
  const text = value => typeof value === 'string' ? value.trim() : '';
  const validCode = code => codes.includes(code);
  const fieldsOf = r => r.fields && typeof r.fields==='object' && !Array.isArray(r.fields) ? r.fields : {};
  function links(record) {
    const r=record||{}, fields=fieldsOf(r), out=new Map();
    const add=(code,sourceField,value,kind,reason)=>{
      const excerpt=text(value);
      if(!validCode(code)||!excerpt||out.has(code))return;
      out.set(code,{code,sourceField,excerpt,kind,reason});
    };
    const field=(code,name,kind,reason)=>add(code,name,fields[name],kind,reason);
    const explicit=r.competencyEvidence;
    if(explicit && validCode(explicit.code) && ['practice','observed','reflection','plan'].includes(explicit.kind) && text(explicit.text)) {
      const kind=(r.tool || r.kind==='practice-tool') ? 'plan' : explicit.kind;
      add(explicit.code,'Konkrétní doklad ke kompetenci',explicit.text,kind,
        kind==='practice'?'Student výslovně popisuje vlastní provedení; pedagog ověří tento konkrétní projev.':
        kind==='observed'?'Student označil pozorování výkonu jiného učitele; nejde o jeho vlastní výuku.':
        kind==='reflection'?'Student výslovně dokládá vlastní reflexi; pedagog ověří její obsah.':
        'Student označil přípravu nebo model; uskutečnění ve výuce není doloženo.');
    }
    if(r.isSheet && window.SHEET_COMP) for(const l of SHEET_COMP.links(r)) add(l.code,l.sourceField,l.excerpt,l.kind,l.reason);
    const observation=['ivp','group','guided'].includes(r.moduleId);
    const teaching=['micro','continuous'].includes(r.moduleId);
    // A simulation or plan remains a plan even if its legacy moduleId says teaching.
    if(r.tool || r.kind==='practice-tool') {
      const own=text(fields['Moje volba'])||text(fields['Příležitost k vyzkoušení'])||text(r.reflection);
      if(own) add(r.competency,'Moje volba / vlastní poznámka',own,'plan','Model nebo plán se vztahuje k tématu kompetence; nedokládá provedení v reálné výuce.');
      if(text(r.nextStep)&&own)add('6.1','Můj další krok',r.nextStep,'plan','Zapsaný vlastní plán profesního rozvoje.');
    } else if(r.isRetry) {
      // Legacy retry field deliberately combines observed and own action, so it cannot prove own teaching.
      if(text(fields['Co jsem zkusil/a nebo pozoroval/a'])&&text(r.reflection))add('2.5','Co se stalo',r.reflection,'reflection','Vlastní srovnání druhé zkušenosti; formulář nerozlišuje pozorování a vlastní výuku.');
      if(text(r.nextStep)&&text(r.reflection))add('6.1','Můj další krok',r.nextStep,'plan','Další krok navazuje na popsanou zkušenost.');
    } else if(r.isBlockReflection || (r.blockId && 'meaning' in r)) {
      const situation=text(r.observation)||text(fields['Pozorovaná situace']);
      const meaning=text(r.meaning)||text(r.reflection), next=text(r.next)||text(r.nextStep);
      if(situation&&meaning)add('2.5','Význam pozorované situace',meaning,'reflection','Vlastní vysvětlení navázané na popsanou situaci.');
      if(situation&&meaning&&next)add('6.1','Další profesní krok',next,'reflection','Konkrétní další krok navazuje na vlastní reflexi.');
    } else {
      if(observation) {
        field('2.1','Cíl a jeho naplnění','observed','Záznam cíle a jeho naplnění v pozorované hodině.');
        field('1.2','Metody, pomůcky a technika','observed','Záznam o zprostředkování obsahu pozorovaným učitelem.');
        field('3.1','Zapojení žáků a atmosféra','observed','Podklad k rozboru prostředí pro učení v pozorované hodině.');
        field('2.4','Ověření učení a zpětná vazba','observed','Podklad o ověřování porozumění pozorovaným učitelem.');
        field('4.2','Ověření učení a zpětná vazba','observed','Podklad o zpětné vazbě v pozorované hodině.');
        field('2.5','Rozbor a vlastní závěr','reflection','Studentův vlastní rozbor pozorované výuky.');
        field('1.1','Obory a ŠVP','plan','Orientace v oboru a kurikulu; sama nedokládá odbornost při výuce.');
      }
      if(teaching) {
        field('2.1','Téma a cíl výstupu','plan','Příprava cíle vlastního mikrovýstupu.');
        field('3.3','Příprava a organizace','plan','Příprava organizace a prostředků; uskutečnění je třeba doložit.');
        field('1.2','Jak povedu instruktáž','plan','Popsaný záměr instruktáže, nikoli doklad jejího uskutečnění.');
        field('2.5','Moje sebereflexe','reflection','Vlastní sebereflexe mikrovýstupu.');
        field('2.5','Zpětná vazba a další pokus','reflection','Studentův rozbor zpětné vazby a dalšího pokusu; samotné přijetí připomínky nedokládá celou kompetenci zpětné vazby.');
        field('2.1','Cíl mé výuky','plan','Stanovený cíl vlastní výuky; o jeho uskutečnění rozhoduje doklad.');
        field('2.5','Rozbor výstupu','reflection','Vlastní rozbor uskutečněné výuky.');
        // The structured result supplies the evidence absent from a preparation-only record.
        if(text(fields['Cíl mé výuky'])&&text(fields['Doklad o učení'])) {
          if(explicit?.code!=='2.1'||!text(explicit.text)||!['practice','observed','reflection','plan'].includes(explicit.kind))out.set('2.1',{code:'2.1',sourceField:'Cíl mé výuky + Doklad o učení',excerpt:text(fields['Cíl mé výuky'])+' / '+text(fields['Doklad o učení']),kind:'practice',reason:'Cíl je propojen s popsaným výsledkem vlastních žáků; pedagog posoudí, co doklad skutečně ukazuje.'});
          field('2.5','Doklad o učení','reflection','Vyhodnocení výsledku vůči uvedenému cíli vlastní výuky.');
        }
      }
      if(r.moduleId==='reflection') {
        const comparison=text(fields['Co ukazují mé dvě ukázky?']);
        const reasoning=text(fields['Co se změnilo v mém rozhodování?']);
        if(comparison&&reasoning)add('2.5','Co se změnilo v mém rozhodování?',reasoning,'reflection','Vlastní reflexe doložená srovnáním dvou ukázek.');
        if(comparison&&reasoning)field('6.1','Na co se zaměřím dál?','reflection','Další rozvoj navazuje na srovnané vlastní doklady.');
      }
      // This generic reflection is meaningful only with a concrete structured account.
      const concrete=Object.entries(fields).some(([name,value])=>text(value)&&!['Škola, obor a třída','Škola a její vedení','Obory a ŠVP','Typ podkladu'].includes(name)) || (Array.isArray(r.timeline)&&r.timeline.some(row=>text(row?.event)&&text(row?.pupils)));
      if(concrete && text(r.reflection))add('2.5','Moje reflexe',r.reflection,'reflection','Vlastní reflexe navazuje na konkrétní vyplněný podklad.');
      if(concrete && text(r.reflection)&&text(r.nextStep))add('6.1','Můj další krok',r.nextStep,'plan','Plán rozvoje navazuje na konkrétní zkušenost a její reflexi.');
    }
    // Retain legacy/manual choices, but never reinterpret them as a demonstrated performance.
    if(validCode(r.competency))add(r.competency,'Vlastní přiřazení',r.competency,'manual','Původní přiřazení studentem; potřebuje konkrétní doklad a posouzení.');
    return [...out.values()];
  }
  function signature(record,link) {
    const r=record||{}, actual=links(r).find(item=>item.code===link?.code);
    if(!actual)return '';
    // Change detector only, not authentication or a digital signature.
    const payload=JSON.stringify([r.id||'',r.moduleId||r.blockId||'',r.date||'',r.kind||'',r.title||r.topic||'',
      Object.entries(fieldsOf(r)).sort(([a],[b])=>a.localeCompare(b)),r.timeline||[],
      r.observation||'',r.meaning||r.reflection||'',r.next||r.nextStep||'',r.sourceId||'',r.competencyEvidence||null,actual]);
    let hash=2166136261;for(let i=0;i<payload.length;i++)hash=Math.imul(hash^payload.charCodeAt(i),16777619);
    return 'evidence-v1-'+(hash>>>0).toString(16);
  }
  function state(record,link) {
    const r=record||{}, actual=links(r).find(item=>item.code===link?.code);
    const kind=actual?.kind||'manual';
    const base={key:kind,label:labels[kind],review:null};
    const review=r.competencyReview?.[actual?.code];
    // A closed record, a checked checklist or a selected competence alone never confirms a performance.
    if(!actual || !['practice','reflection'].includes(kind) || r.status!=='confirmed' || !review ||
       !['demonstrated','partial','notyet'].includes(review.verdict) ||
       !['mentor','ivp'].includes(review.reviewerRole) || !text(review.note) ||
       review.evidenceSignature!==signature(r,actual) ||
       !/^\d{4}-\d{2}-\d{2}T/.test(text(review.reviewedAt)) || !Number.isFinite(Date.parse(review.reviewedAt)))return base;
    return {key:review.verdict,label:labels[review.verdict],review};
  }
  return {codes,labels,links,state,signature};
})();
