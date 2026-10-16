import {kpvCases,kpvStages,kpvSources} from './kpv-cases.js?v=20261016-3';
import {upvCases,upvStages,upvSources} from './upv-cases.js?v=20261016-3';
import {probeCases,probeSources} from './probe-cases.js';
import {kpvRevisions,upvRevisions} from './practice-revisions.js';
import {localizeCase,skStages} from './sk-cases.js?v=20261016-5';
export const locale=new URLSearchParams(location.search).get('lang')==='sk'?'sk':'cs';
export const contentVersion='2026-10-16.5';
export const rubricVersion='author-draft-1';
const stages=list=>locale==='sk'?list.map(s=>({...s,name:skStages[s.id][0],short:skStages[s.id][1],description:skStages[s.id][2]})):list;
export const tracks={
 kpv:{id:'kpv',title:locale==='sk'?'Kariérové poradenstvo a vzdelávanie':'Kariérové poradenství a vzdělávání',short:locale==='sk'?'Kariérové poradenstvo':'Kariérové poradenství',tag:locale==='sk'?'KPV · ČLOVEK A JEHO ĎALŠÍ KROK':'KPV · ČLOVĚK A JEHO DALŠÍ KROK',lead:locale==='sk'?'Počúvať. Overiť. Pomôcť rozhodnúť.':'Naslouchat. Ověřit. Pomoci rozhodnout.',description:locale==='sk'?'Príprava na odbornú prax I–IV: od orientácie na pracovisku cez rozhovor a skupinu po samostatný projekt pod odborným vedením. Názvy fáz vychádzajú z českého sylabu IVP ČZU.':'Příprava na Odbornou praxi I–IV: od orientace v pracovišti přes rozhovor a práci se skupinou po samostatný projekt pod odborným vedením.',stages:stages(kpvStages)},
 upv:{id:'upv',title:locale==='sk'?'Učiteľstvo praktického vyučovania':'Učitelství praktického vyučování',short:locale==='sk'?'Praktické vyučovanie':'Praktické vyučování',tag:locale==='sk'?'UPV · OD POZOROVANIA K VLASTNEJ VÝUČBE':'UPV · OD POZOROVÁNÍ K VLASTNÍ VÝUCE',lead:locale==='sk'?'Všimnúť si. Vysvetliť. Nechať vyskúšať.':'Všimnout si. Vysvětlit. Nechat zkusit.',description:locale==='sk'?'Od rozboru výučby a náčuvov cez microteaching po súvislú prax a reflexiu. Prípady trénujú pedagogické rozhodovanie; nenahrádzajú odborný výcvik.':'Od rozboru výuky a náslechů přes microteaching po souvislou praxi a reflexi. Případy trénují pedagogické rozhodování, nenahrazují odborný výcvik.',stages:stages(upvStages)}
};
export const trainingCases=[...kpvCases,...upvCases].map(c => {const item={...c,...(c.track==='kpv'?kpvRevisions[c.id]:upvRevisions[c.id])};return locale==='sk'?localizeCase(item):item;});
export const allCases=[...trainingCases,...probeCases];
export {probeCases};
export const sources={...kpvSources,...upvSources,...probeSources};
export function findCase(id){return allCases.find(c=>c.id===id);}
export function findStage(id){return [...tracks.kpv.stages,...tracks.upv.stages].find(s=>s.id===id);}
