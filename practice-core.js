export const SCHEMA='nanecisto-research-1';
export const STORAGE_KEY='nanecisto-practice-v1';
export const MAX_RECORDS=5000;
export const csvCell=value=>'"'+String(value??'').replace(/^[=+@\-\t\r]/,"'$&").replace(/"/g,'""')+'"';
export function csv(rows,columns){return '\ufeff'+[columns.map(csvCell).join(';'),...rows.map(r=>columns.map(c=>csvCell(r[c])).join(';'))].join('\r\n');}
export function freshState(){return {version:1,progress:{},transfers:{},probes:{},v4:null,recording:{enabled:false,code:null,startedDay:null,events:[],full:false}};}
export function uid(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;}
export function confidenceValue(value){return [0,25,50,75,100].includes(Number(value))&&value!==null&&value!==''?Number(value):null;}
export function responseFor(item,choiceId){const option=item.options.find(o=>o.id===choiceId);if(!option)throw new Error('Vyberte platnou odpověď.');return option;}
export function orderedOptions(item,seed){let h=0;for(const c of seed+item.id)h=(h*31+c.charCodeAt(0))>>>0;const a=[...item.options];for(let i=a.length-1;i>0;i--){h=(h*1664525+1013904223)>>>0;const j=h%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
export function appendEvent(state,event,day=new Date().toISOString().slice(0,10)){
 if(!state.recording.enabled)return false;
 if(state.recording.events.length>=MAX_RECORDS){state.recording.full=true;return false;}
 state.recording.events.push({...event,event_id:uid(),event_order:state.recording.events.length+1,participant_code:state.recording.code,day,recording_setting_version:'local-opt-in-v1'});return true;
}
export function switchRecording(state,on){state.recording.enabled=Boolean(on);if(on&&!state.recording.code){state.recording.code='N-'+uid();state.recording.startedDay=new Date().toISOString().slice(0,10);}return state;}
export function probeForm(code,wave){if(wave==='T2')return 'C';let n=0;for(const c of code)n+=c.charCodeAt(0);return wave==='T0'?(n%2?'A':'B'):(n%2?'B':'A');}
export function commitTraining(state,item,choiceId,meta){
 const option=responseFor(item,choiceId);const prior=state.progress[item.id];
 const response={choiceId,score:option.score,confidence:confidenceValue(meta.confidence),hint:Boolean(meta.hint),activeSeconds:Math.round(Math.max(0,Math.min(1800,meta.activeSeconds||0))),version:meta.contentVersion};
 const attempt=(prior?.attempts||0)+1;
 state.progress[item.id]={first:prior?.first??response,last:response,attempts:attempt};
 appendEvent(state,{...meta,event_type:'decision',mode:'training',track:item.track,practice_stage:item.stage,scenario_id:item.id,choice_id:choiceId,score:option.score,confidence_before_feedback:response.confidence,hint_requested:response.hint,elapsed_active_seconds:response.activeSeconds,attempt_index:attempt,first_exposure_to_scenario:!prior,first_choice_id:prior?.first?.choiceId??choiceId,completion_status:'answered'});
 return option;
}
export const exportColumns=['participant_code','session_id','event_id','event_order','day','event_type','mode','track','practice_stage','scenario_id','scenario_version','rubric_version','recording_setting_version','study_project_id','project_protocol_version','record_purpose','country_group','enrolled_track','prior_practice','training_before_enrolment_count','selected_training_before_enrolment_count','probe_before_enrolment_count','target_age_group','ai_policy_version','assessment_session_id','form_sequence','wave','form','construct','display_option_order','attempt_index','first_exposure_to_scenario','previous_probe_exposure_count','first_choice_id','choice_id','score','confidence_before_feedback','hint_requested','source_before_choice','elapsed_active_seconds','feedback_variant','prior_training_count','prior_training_count_at_start','self_reported_ai_use','ai_tool_category','ai_verification_action','clarity','relevance','technical_issue','effort','answer_length','transfer_status','reason','completion_status'];
export function makeExport(state,version){return {schema:SCHEMA,app_version:version,exported_at:new Date().toISOString(),data_scope:'voluntary_local_recording_not_institutional_study',participant_code:state.recording.code,recording_enabled:state.recording.enabled,events:state.recording.events.map(e=>Object.fromEntries(exportColumns.filter(k=>k in e).map(k=>[k,e[k]])))};}
export function validEvent(e){return Boolean(e&&typeof e.event_id==='string'&&e.event_id.length>0&&e.event_id.length<150&&typeof e.participant_code==='string'&&e.participant_code.length>0&&e.participant_code.length<150&&['kpv','upv'].includes(e.track)&&['training','pilot_assessment','project_context','job_simulation'].includes(e.mode)&&typeof e.scenario_id==='string'&&e.scenario_id.length<150&&['decision','reflection','transfer','project_context','pilot_feedback','work_submission'].includes(e.event_type)&&Number.isInteger(e.event_order)&&e.event_order>0&&/^\d{4}-\d{2}-\d{2}$/.test(e.day)&&
 (e.mode!=='project_context'||e.study_project_id&&(e.event_type==='project_context'&&e.scenario_id==='v4-context'||e.event_type==='pilot_feedback'&&e.scenario_id==='v4-feedback'&&[1,2,3,4,5].includes(e.clarity)&&[1,2,3,4,5].includes(e.relevance)))&&
 (!e.study_project_id||e.study_project_id==='v4-gen-nanecisto-2027'&&['v4-pilot-draft-1','v4-pilot-draft-2','v4-pilot-draft-3','v4-pilot-draft-4'].includes(e.project_protocol_version)&&['demo','prepilot','institutional_pilot'].includes(e.record_purpose)&&['CZ','SK'].includes(e.country_group)&&e.enrolled_track===e.track&&['none','observed','guided'].includes(e.prior_practice))&&
 (e.event_type!=='decision'||(['a','b','c'].includes(e.choice_id)&&[0,1,2].includes(e.score)&&Number.isInteger(e.attempt_index)&&e.attempt_index>0&&Number.isFinite(e.elapsed_active_seconds)&&e.elapsed_active_seconds>=0&&e.elapsed_active_seconds<=1800&&(e.confidence_before_feedback===null||[0,25,50,75,100].includes(e.confidence_before_feedback))))&&
 (e.effort==null||[1,2,3,4,5].includes(e.effort))&&(e.event_type!=='work_submission'||e.mode==='job_simulation'&&Number.isInteger(e.answer_length)&&e.answer_length>=20&&e.answer_length<=1800&&/^(kpv|upv)-[a-d]$/.test(e.scenario_id))&&
 (e.reason==null||typeof e.reason==='string'&&e.reason.length<=700));}
export function importExport(text){
 if(text.length>8_000_000)throw new Error('Soubor je příliš velký (limit 8 MB).');
 let data;try{data=JSON.parse(text);}catch{throw new Error('Soubor není platný JSON.');}
 if(data?.schema!==SCHEMA||!Array.isArray(data.events)||data.events.length>MAX_RECORDS)throw new Error('Nejde o podporovaný export Nanečisto.');
 if(data.events.some(e=>!validEvent(e)||e.participant_code!==data.participant_code))throw new Error('Export obsahuje neplatné nebo nesourodé záznamy.');
 return data.events.map(e=>Object.fromEntries(exportColumns.filter(k=>k in e).map(k=>[k,typeof e[k]==='string'?e[k].slice(0,1500):['number','boolean'].includes(typeof e[k])?e[k]:null])));
}
export function mergeEvents(existing,incoming){const map=new Map(existing.map(e=>[e.event_id,e]));for(const e of incoming){const prior=map.get(e.event_id);if(prior&&exportColumns.some(k=>JSON.stringify(prior[k]??null)!==JSON.stringify(e[k]??null)))throw new Error('Stejné ID události má rozdílný obsah. Soubor nebyl přidán; ověřte původ exportů.');if(!prior)map.set(e.event_id,e);}return [...map.values()];}
export function summarizeEvents(events){
 const decisions=events.filter(e=>e.event_type==='decision'&&[0,1,2].includes(e.score));
 const groups=['kpv','upv'].map(track=>{
  const rows=decisions.filter(e=>e.track===track&&e.mode==='training'&&e.attempt_index===1);
  const confident=rows.filter(e=>typeof e.confidence_before_feedback==='number');
  return {track,n:rows.length,codes:new Set(rows.map(e=>e.participant_code)).size,mean:rows.length?rows.reduce((s,e)=>s+e.score,0)/rows.length:null,hints:rows.filter(e=>e.hint_requested).length,confidenceN:confident.length,meanConfidence:confident.length?confident.reduce((s,e)=>s+e.confidence_before_feedback,0)/confident.length:null};
 });
 return {codes:new Set(events.map(e=>e.participant_code)).size,decisions:decisions.length,revisions:decisions.filter(e=>e.mode==='training'&&e.attempt_index>1).length,probes:decisions.filter(e=>e.mode==='pilot_assessment').length,groups};
}
