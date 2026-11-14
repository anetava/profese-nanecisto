// One fictional cohort. Approved examples always include an observation by a teacher.
const PEOPLE = [
 {id:'ema',name:'Ema',track:'cook',girl:true,year:1,phase:0,level:1,photo:'ema',full:true},
 {id:'matej',name:'Matěj',track:'service',girl:false,year:1,phase:1,level:1,photo:'matej'},
 {id:'dan',name:'Dan',track:'cook',girl:false,year:2,phase:2,level:2,photo:'cook',full:true},
 {id:'nora',name:'Nora',track:'service',girl:true,year:2,phase:3,level:2,photo:'nora'},
 {id:'tomas',name:'Tomáš',track:'service',girl:false,year:2,phase:5,level:2,photo:'service',full:true},
 {id:'lea',name:'Lea',track:'cook',girl:true,year:3,phase:6,level:3,photo:'lea'}
];
const DEFAULT_CODE = {cook:'K09.2',service:'K06.2'};
const localized=(cs,sk=cs)=>[cs,sk];
const CHOICES={
 cook:{
 before:[localized('Rozložení na talíři','Rozloženie na tanieri'),localized('Stejná velikost porcí','Rovnaká veľkosť porcií'),localized('Čistý okraj','Čistý okraj')],
 during:[localized('Porovnávám oba talíře','Porovnávam oba taniere'),localized('Zkouším jiné rozložení','Skúšam iné rozloženie'),localized('Potřebuji ukázku','Potrebujem ukážku')],
 after:[localized('Porce se shodují','Porcie sa zhodujú'),localized('Druhou porci bylo potřeba upravit','Druhú porciu bolo treba upraviť'),localized('Chci si to zkusit znovu','Chcem si to skúsiť znova')],
 next:[localized('Položím talíře vedle sebe','Položím taniere vedľa seba'),localized('Zkontroluji okraj','Skontrolujem okraj'),localized('Požádám o zpětnou vazbu','Požiadam o spätnú väzbu')]
 },
 service:{
 before:[localized('Uspořádání stolu','Usporiadanie stola'),localized('Přístup k hostovi','Prístup k hosťovi'),localized('Podání vody','Podanie vody')],
 during:[localized('Kontroluji obě místa','Kontrolujem obe miesta'),localized('Upravuji přístup ke stolu','Upravujem prístup k stolu'),localized('Potřebuji ukázku','Potrebujem ukážku')],
 after:[localized('Obě místa byla připravená','Obe miesta boli pripravené'),localized('Upravil se prostor pro servis','Upravil sa priestor na servis'),localized('Chci si servis zopakovat','Chcem si servis zopakovať')],
 next:[localized('Porovnám obě prostření','Porovnám obe prestierania'),localized('Předem projdu cestu ke stolu','Vopred prejdem cestu k stolu'),localized('Vyzkouším si oslovení hosta','Vyskúšam si oslovenie hosťa')]
 },
 general:{
 before:[localized('Pořadí kroků','Poradie krokov'),localized('Kvalita výsledku','Kvalita výsledku'),localized('Samostatná práce','Samostatná práca')],
 during:[localized('Držím se postupu','Držím sa postupu'),localized('Upravuji postup','Upravujem postup'),localized('Potřebuji ukázku','Potrebujem ukážku')],
 after:[localized('Výsledek odpovídá zadání','Výsledok zodpovedá zadaniu'),localized('Postup jsem upravil/a','Postup bolo treba upraviť'),localized('Potřebuji další nácvik','Potrebujem ďalší nácvik')],
 next:[localized('Ověřím výsledek podle vzoru','Overím výsledok podľa vzoru'),localized('Vyzkouším postup samostatně','Vyskúšam postup samostatne'),localized('Požádám o ukázku','Požiadam o ukážku')]
 }};
const TIMES = {before:'07:35',during:'09:15',after:'12:10'};
function blankNote(){return {choice:null,text:'',audio:'',time:'',photo:'',next:null};}
function newShift(code,level,day,serial=1){return {id:day+'-'+serial,day,code,level,phase:0,notes:{before:blankNote(),during:blankNote(),after:blankNote()},quiz:false,feedback:'',reviews:[],hint:'',checks:[],safe:false};}
function dayStamp(offset=0){const d=new Date();d.setDate(d.getDate()+offset);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
function approval(s,comment){
 return {id:s.id,code:s.code,level:s.level,day:s.day,author:'PED-01',criteria:[true,true,true],safe:true,comment,notes:JSON.parse(JSON.stringify(s.notes))};
}
function suggestedNotes(s){
 s.notes.before={...blankNote(),choice:1,time:TIMES.before};
 s.notes.during={...blankNote(),choice:0,time:TIMES.during};
 s.notes.after={...blankNote(),choice:1,next:0,time:TIMES.after};
}
function seed(p){
 const code=DEFAULT_CODE[p.track],s=newShift(code,p.level,dayStamp()),history=[];
 const basic=p.track==='cook'?'K05.1':'K06.1';
 const basics=newShift(basic,1,dayStamp(-8));suggestedNotes(basics);
 basics.notes.before.choice=0;basics.notes.during.choice=0;basics.notes.after.choice=0;basics.notes.after.next=0;
 const baseComment=p.track==='cook'?localized('Stanoviště bylo připravené v pořadí práce.','Stanovište bolo pripravené v poradí práce.'):localized('Inventář byl kompletní a před servisem zkontrolovaný.','Inventár bol kompletný a pred servisom skontrolovaný.');
 history.push(approval(basics,baseComment));
 for(let level=1;level<p.level;level++){const prior=newShift(code,level,dayStamp(-6+level));suggestedNotes(prior);history.push(approval(prior,localized('Při praktické ukázce byla splněna všechna tři kritéria.','Pri praktickej ukážke boli splnené všetky tri kritériá.')));}
 s.phase=p.phase;
 if(p.phase>0){suggestedNotes(s);s.quiz=true;if(p.phase<4)s.notes.after=blankNote();if(p.phase<3)s.notes.during=blankNote();}
 if(p.id==='nora'){s.notes.during.choice=2;s.notes.during.text=localized('Chci ještě jednou vidět, odkud mám přistoupit s vodou.','Chcem ešte raz vidieť, odkiaľ mám pristúpiť s vodou.');}
 if(p.id==='tomas'){s.notes.after.text=localized('Když si host sedl, posunul jsem karafu, abych měl při podání vody volnou cestu.','Keď si hosť sadol, posunul som karafu, aby som mal pri podaní vody voľnú cestu.');}
 if(p.phase===6){const a=approval(s,localized('Obě porce měly stejnou kompozici. Při změně zadání jste zachovala čistý okraj i velikost porce.','Obe porcie mali rovnakú kompozíciu. Pri zmene zadania ste zachovali čistý okraj aj veľkosť porcie.'));a.examplePhoto='photos/plate.webp';s.reviews.push({...a,result:'approved'});history.push(a);}
 if(p.track==='service'&&history.length>1)history[1].examplePhoto='photos/table.webp';
 return {version:1,revision:0,shift:s,history,finished:[],log:[]};
}
