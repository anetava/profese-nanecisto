import {trainingCases,probeCases,contentVersion,rubricVersion} from './practice-data.js?v=20261016-3';
import {appendEvent,switchRecording} from './practice-core.js';
export const V4_PROJECT_ID='v4-gen-nanecisto-2027';
export const V4_PROTOCOL_VERSION='v4-pilot-draft-4';
export const V4_RECORD_PURPOSE='demo';
export const V4_TRAINING_IDS={
 kpv:['kpv-01','kpv-02','kpv-07','kpv-15','kpv-12','kpv-24'],
 upv:['upv-01','upv-02','upv-09','upv-15','upv-10','upv-24']
};
export const V4_WINDOWS={T0:['2027-04-05','2027-04-11'],T1:['2027-04-22','2027-04-22']};
export function validV4Context(c,recording){return Boolean(c&&c.projectId===V4_PROJECT_ID&&c.protocolVersion===V4_PROTOCOL_VERSION&&c.purpose===V4_RECORD_PURPOSE&&['kpv','upv'].includes(c.track)&&['CZ','SK'].includes(c.country)&&['none','observed','guided'].includes(c.priorPractice)&&c.code===recording?.code&&typeof c.code==='string'&&typeof c.active==='boolean');}
export function v4Meta(state,track){const c=state.v4;if(!validV4Context(c,state.recording)||!c.active||c.track!==track)return {};return {study_project_id:c.projectId,project_protocol_version:c.protocolVersion,record_purpose:c.purpose,country_group:c.country,enrolled_track:c.track,prior_practice:c.priorPractice,training_before_enrolment_count:c.trainingBefore,probe_before_enrolment_count:c.probesBefore,selected_training_before_enrolment_count:c.selectedBefore,target_age_group:'18-30',ai_policy_version:'available-ai-same-policy-v1'};}
export function configureV4(state,{track,country,priorPractice,ageConfirmed,localConfirmed}){
 if(!['kpv','upv'].includes(track)||!['CZ','SK'].includes(country)||!['none','observed','guided'].includes(priorPractice))throw new Error('Vyberte profesní cestu, partnerskou skupinu a zkušenost s praxí.');
 if(!ageConfirmed||!localConfirmed)throw new Error('Potvrďte věkovou skupinu a nastavení místního záznamu.');
 if(validV4Context(state.v4,state.recording))throw new Error('Kontext už je nastaven. Pro změnu skupiny smažte podrobný záznam v nabídce Moje data.');
 switchRecording(state,true);
 const trainingBefore=trainingCases.filter(c=>c.track===track&&state.progress[c.id]).length;
 const selectedBefore=V4_TRAINING_IDS[track].filter(id=>state.progress[id]).length;
 const probesBefore=Object.values(state.probes).flatMap(p=>p.answers||[]).filter(a=>a.id?.startsWith('probe-'+track+'-')).length;
 state.v4={projectId:V4_PROJECT_ID,protocolVersion:V4_PROTOCOL_VERSION,purpose:V4_RECORD_PURPOSE,code:state.recording.code,track,country,priorPractice,trainingBefore,selectedBefore,probesBefore,active:true};
 appendEvent(state,{...v4Meta(state,track),event_type:'project_context',mode:'project_context',track,practice_stage:'setup',scenario_id:'v4-context',scenario_version:contentVersion,rubric_version:rubricVersion,completion_status:'local_demo_setup'});
 return state.v4;
}
export function activeV4(state,track){return validV4Context(state.v4,state.recording)&&state.v4.active&&(!track||state.v4.track===track);}
export function assessmentKey(state,track,wave){return activeV4(state,track)?`v4-${state.v4.code}@${V4_PROTOCOL_VERSION}:${track}-${wave}`:`${track}-${wave}`;}
export function previousProbeAnswers(state,caseId){return Object.values(state.probes).flatMap(p=>p.answers||[]).filter(a=>a.id===caseId).length;}
export function v4Stats(events,purpose='demo'){
 const rows=events.filter(e=>e.study_project_id===V4_PROJECT_ID&&e.project_protocol_version===V4_PROTOCOL_VERSION&&e.record_purpose===purpose&&(e.mode!=='pilot_assessment'||['T0','T1'].includes(e.wave)));
 const codes=new Set(rows.map(e=>e.participant_code));const groups=[];
 for(const track of ['kpv','upv'])for(const country of ['CZ','SK']){
  const subset=rows.filter(e=>e.track===track&&e.country_group===country),members=new Set(subset.map(e=>e.participant_code));
  const waves={};let outside=0,priorExposure=0;
  for(const wave of Object.keys(V4_WINDOWS)){
   const candidates=subset.filter(e=>e.event_type==='decision'&&e.mode==='pilot_assessment'&&e.wave===wave);const sessions=new Map();
   for(const e of candidates){const key=e.participant_code+'|'+e.assessment_session_id;if(!sessions.has(key))sessions.set(key,[]);sessions.get(key).push(e);}
   const complete=[];
   for(const rs of sessions.values()){const first=rs[0],expected=probeCases.filter(c=>c.track===track&&c.form===first.form);if(rs.length!==4||new Set(rs.map(e=>e.scenario_id)).size!==4||!first.assessment_session_id||expected.length!==4||!['A-B-C','B-A-C'].includes(first.form_sequence)||first.form!==first.form_sequence.split('-')[Number(wave[1])]||rs.some(e=>e.form!==first.form||e.form_sequence!==first.form_sequence||!expected.some(c=>c.id===e.scenario_id)))continue;complete.push(rs);const [from,to]=V4_WINDOWS[wave];if(rs.some(e=>e.day<from||e.day>to))outside++;if(rs.some(e=>e.first_exposure_to_scenario===false||wave==='T0'&&(e.prior_training_count>0||e.probe_before_enrolment_count>0)))priorExposure++;}
   waves[wave]={codes:new Set(complete.map(rs=>rs[0].participant_code)),sets:complete.length};
  }
  const completedTraining=[...members].filter(code=>V4_TRAINING_IDS[track].every(id=>subset.some(e=>e.participant_code===code&&e.scenario_id===id&&e.event_type==='decision'&&e.mode==='training'))).length;
  groups.push({track,country,codes:members.size,training:completedTraining,trainingTarget:V4_TRAINING_IDS[track].length,T0:waves.T0.codes.size,T1:waves.T1.codes.size,paired01:[...waves.T0.codes].filter(c=>waves.T1.codes.has(c)).length,outside,priorExposure});
 }
 return {purpose,codes:codes.size,events:rows.length,groups,rows};
}
