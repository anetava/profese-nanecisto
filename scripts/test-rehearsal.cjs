const assert=require('node:assert/strict');global.window=global;require('../atelier-praxe-upv/atelier-tools.js');
global.FormData=class{constructor(f){this.f=f}get(k){return this.f[k]||''}};
for(let scenario=0;scenario<3;scenario++)for(const choice of ['0','1','2','own']){
 let output;const panel={innerHTML:'',querySelector:()=>({focus(){}})};
 const container={querySelector:()=>panel};const root={querySelector:()=>container};
 ATools.bind(root,'nacvik',[],rows=>output=rows,'student',scenario);
 container.onclick({target:{closest:()=>({hasAttribute:k=>k==='data-choice',dataset:{choice}})}});
 assert.equal((panel.innerHTML.match(/<textarea/g)||[]).length,1);
 assert(!panel.innerHTML.includes('Co si chci zapamatovat'));assert(panel.innerHTML.includes('Uložit přípravu'));
 container.onsubmit({target:{matches:()=>true,next:'Vlastní konkrétní příprava'},preventDefault(){}});
 assert.equal(output[0].kind,'practice-tool');assert.equal(output[0].nextStep,'Vlastní konkrétní příprava');assert.equal(output[0].fields['Moje příprava pro vlastní obor'],'Vlastní konkrétní příprava');
 if(choice==='own')assert.equal(output[0].fields['Moje volba'],'Vlastní konkrétní příprava');
}
console.log('Three rehearsals: all choices and own response render one field and save as model preparation.');
