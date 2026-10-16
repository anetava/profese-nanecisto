import {allCases,contentVersion,rubricVersion} from './practice-data.js?v=20261016-3';
import {SCHEMA,importExport,exportColumns} from './practice-core.js';
import {V4_PROJECT_ID,V4_PROTOCOL_VERSION} from './v4-pilot-core.js?v=20261016-3';
export const BUNDLE_SCHEMA='nanecisto-research-bundle-1';
export function importResearch(text){
 if(text.length>8_000_000)throw new Error('Limit jednoho souboru je 8 MB.');
 let data;try{data=JSON.parse(text);}catch{throw new Error('Soubor není platný JSON.');}
 if(data?.schema===BUNDLE_SCHEMA){if(!Array.isArray(data.exports)||data.exports.length>1000)throw new Error('Neplatný společný export.');const rows=data.exports.flatMap(d=>importExport(JSON.stringify(d)));if(rows.length>50_000)throw new Error('Limit pracovního souboru je 50 000 záznamů.');return rows;}
 return importExport(text);
}
export function researchBundle(events){const groups=new Map();for(const e of events){if(!groups.has(e.participant_code))groups.set(e.participant_code,[]);groups.get(e.participant_code).push(e);}return {schema:BUNDLE_SCHEMA,exported_at:new Date().toISOString(),note:'Pseudonymous local exports; not verified participant identities or consent.',exports:[...groups].map(([code,rows])=>({schema:SCHEMA,participant_code:code,events:rows.map(e=>Object.fromEntries(exportColumns.filter(k=>k in e).map(k=>[k,e[k]])))}))};}
export function auditEvents(events){
 const accepted=[],flagged=[];
 for(const e of events){const c=allCases.find(c=>c.id===e.scenario_id);let problem='';
  if(e.mode==='project_context'&&['v4-context','v4-feedback'].includes(e.scenario_id)){if(e.study_project_id!==V4_PROJECT_ID||e.project_protocol_version!==V4_PROTOCOL_VERSION)problem='Neplatný projektový kontext';else if(e.scenario_version!==contentVersion||e.rubric_version!==rubricVersion)problem='Jiná či chybějící verze obsahu/klíče';if(problem)flagged.push({event:e,problem});else accepted.push(e);continue;}
  if(!c||c.track!==e.track)problem='Neznámá situace nebo nesoulad programu';
  else if(e.scenario_version!==contentVersion||e.rubric_version!==rubricVersion)problem='Jiná či chybějící verze obsahu/klíče';
  else if(e.event_type==='decision'&&(c.options.find(o=>o.id===e.choice_id)?.score!==e.score))problem='Skóre neodpovídá klíči';
  else if(e.event_type==='decision'&&(!['a,b,c','a,c,b','b,a,c','b,c,a','c,a,b','c,b,a'].includes(e.display_option_order)))problem='Chybí platné pořadí možností';
  else if((c.stage==='probe')!==(e.mode==='pilot_assessment'))problem='Nesoulad tréninku a sondy';
  if(problem)flagged.push({event:e,problem});else accepted.push(e);
 }
 // Duplicate "first attempts" cannot silently inflate the summary.
 const firstKeys=new Set(),clean=[];
 for(const e of accepted){if(e.event_type==='decision'&&e.mode==='training'&&e.attempt_index===1){const key=[e.participant_code,e.scenario_id].join('|');if(firstKeys.has(key)){flagged.push({event:e,problem:'Více prvních pokusů stejného kódu a situace'});continue;}firstKeys.add(key);}clean.push(e);}
 return {accepted:clean,flagged};
}
export function assessmentSummary(events){
 const groups=new Map();let missingSession=0;
 for(const e of events.filter(e=>e.event_type==='decision'&&e.mode==='pilot_assessment')){if(!e.assessment_session_id){missingSession++;continue;}const key=[e.participant_code,e.assessment_session_id].join('|');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(e);}
 const complete=[],incomplete=[];
 for(const rows of groups.values()){
  const r=rows[0], expected=allCases.filter(c=>c.stage==='probe'&&c.track===r.track&&c.form===r.form);
  const valid=rows.length===4&&expected.length===4&&new Set(rows.map(e=>e.scenario_id)).size===4&&rows.every(e=>e.track===r.track&&e.wave===r.wave&&e.form===r.form&&e.form_sequence===r.form_sequence&&expected.some(c=>c.id===e.scenario_id)&&e.first_exposure_to_scenario===true&&[0,25,50,75,100].includes(e.confidence_before_feedback)&&e.attempt_index===1)&&['T0','T1','T2'].includes(r.wave)&&['A-B-C','B-A-C'].includes(r.form_sequence)&&r.form===r.form_sequence.split('-')[Number(r.wave[1])];
  if(!valid){incomplete.push(rows);continue;}
  complete.push({code:r.participant_code,track:r.track,wave:r.wave,form:r.form,sequence:r.form_sequence,day:rows.map(e=>e.day).sort().at(-1),priorTraining:Math.max(...rows.map(e=>Number.isInteger(e.prior_training_count)?e.prior_training_count:0)),score:rows.reduce((s,e)=>s+e.score,0),confidence:rows.reduce((s,e)=>s+e.confidence_before_feedback,0)/4});
 }
 const aggregate=[];
 for(const track of ['kpv','upv'])for(const wave of ['T0','T1','T2']){const rows=complete.filter(r=>r.track===track&&r.wave===wave);aggregate.push({track,wave,n:rows.length,mean:rows.length?rows.reduce((s,r)=>s+r.score,0)/rows.length:null});}
 const pairs=[];let ambiguous=0;
 for(const track of ['kpv','upv'])for(const code of new Set(complete.filter(r=>r.track===track).map(r=>r.code))){const rows=complete.filter(r=>r.track===track&&r.code===code),a=rows.filter(r=>r.wave==='T0'),b=rows.filter(r=>r.wave==='T1'),c=rows.filter(r=>r.wave==='T2');if(a.length!==1||b.length!==1){if(a.length>1||b.length>1)ambiguous++;continue;}if(a[0].sequence!==b[0].sequence||a[0].day>b[0].day){ambiguous++;continue;}const delayed=c.length===1&&c[0].sequence===a[0].sequence&&c[0].day>=b[0].day?c[0]:null;pairs.push({track,code,delta:b[0].score-a[0].score,T2:delayed?.score??null,baselineTrained:a[0].priorTraining>0,sameDay:a[0].day===b[0].day});}
 return {complete,aggregate,pairs,incomplete:incomplete.length,missingSession,ambiguous};
}
