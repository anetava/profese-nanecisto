import {kpvCases,kpvStages,kpvSources} from './kpv-cases.js';
import {upvCases,upvStages,upvSources} from './upv-cases.js';
import {probeCases,probeSources} from './probe-cases.js';
import {kpvRevisions,upvRevisions} from './practice-revisions.js';
export const contentVersion='2026-10-16.2';
export const rubricVersion='author-draft-1';
export const tracks={
 kpv:{id:'kpv',title:'Kariérové poradenství a vzdělávání',short:'Kariérové poradenství',tag:'KPV · ČLOVĚK A JEHO DALŠÍ KROK',lead:'Naslouchat. Ověřit. Pomoci rozhodnout.',description:'Příprava na Odbornou praxi I–IV: od orientace v pracovišti přes rozhovor a práci se skupinou po samostatný projekt pod odborným vedením.',stages:kpvStages},
 upv:{id:'upv',title:'Učitelství praktického vyučování',short:'Praktické vyučování',tag:'UPV · OD POZOROVÁNÍ K VLASTNÍ VÝUCE',lead:'Všimnout si. Vysvětlit. Nechat zkusit.',description:'Od rozboru výuky a náslechů přes microteaching po souvislou praxi a reflexi. Případy trénují pedagogické rozhodování, nenahrazují odborný výcvik.',stages:upvStages}
};
export const trainingCases=[...kpvCases,...upvCases].map(c => ({...c,...(c.track==='kpv'?kpvRevisions[c.id]:upvRevisions[c.id])}));
export const allCases=[...trainingCases,...probeCases];
export {probeCases};
export const sources={...kpvSources,...upvSources,...probeSources};
export function findCase(id){return allCases.find(c=>c.id===id);}
export function findStage(id){return [...kpvStages,...upvStages].find(s=>s.id===id);}
