const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const window={BLOCKS:{get:id=>({title:id})}};vm.runInNewContext(fs.readFileSync('atelier-praxe-upv/reflection-flow.js','utf8'),{window,globalThis:{}});
const ctx={role:'student',who:'a',people:[{id:'a',name:'A'}],db:{a:{reflections:[]}},recordRoute:r=>'arch/'+r.id,practiceRecords:()=>[{id:'one',moduleId:'guided',date:'2026-11-20',fields:{'Co jsme si vysvětlili při rozboru [f19]':'<script>example</script>'}},{id:'empty',moduleId:'guided',fields:{Jméno:'A'}}]};
let html=window.IVPREF.queue(ctx);assert(html.includes('arch/one'));assert(!html.includes('arch/empty'));assert(html.includes('&lt;script&gt;'));assert(!html.includes('<script>example'));assert.equal((html.match(/href="#praxe\//g)||[]).length,6);
assert(!window.IVPREF.queue(ctx,{block:'micro'}).includes('arch/one'));
assert(!window.IVPREF.queue(ctx,{state:'confirmed'}).includes('arch/one'));
assert(!window.IVPREF.queue({...ctx,role:'mentor'}).includes('arch/one'));
console.log('Reflection archive: worksheet entries, escaping, six direct practice links, filters and role isolation passed.');
