// Five authored, situation-specific next steps. Scores are formative, not grades.
const data={
'kpv-a':{
 cs:{question:'Jak začnete rozhovor, aniž byste rozhodli za klientku?',options:[
 ['a',1,'Nejprve stručně popíšu rozdíly obou nabídek a pak se zeptám, který jí připadá důležitější.','Rozdíly pomohou, ale bez klientčina cíle ještě nevíte, které informace jsou podstatné.'],
 ['b',0,'Položím otázku na požadovanou mzdu a nabídnu lépe placené místo jako výchozí volbu.','Mzda může být důležitá, ale jedna neověřená priorita nestačí k doporučení.'],
 ['c',2,'Zeptám se, co má změna práce vyřešit a podle čeho chce obě nabídky porovnat; její cíl pak shrnu.','Vyjasníte zakázku, ověříte porozumění a rozhodnutí necháte klientce.'],
 ['d',1,'Požádám klientku, aby si výhody obou míst sepsala, a k jejímu seznamu se vrátíme na konci.','Vlastní seznam je užitečný, ale nejprve je vhodné vyjasnit, co klientka potřebuje vyřešit.'],
 ['e',0,'Pošlu klientku domů zvážit nabídky, protože za ni nesmím rozhodovat.','Nepřebírat rozhodnutí je správná hranice, rozhovor však může nabídnout strukturu pro její vlastní volbu.']]},
 sk:{question:'Ako začnete rozhovor bez rozhodovania za klientku?',options:[
 ['a',1,'Najprv stručne opíšem rozdiely oboch ponúk a potom sa spýtam, ktorý sa jej zdá dôležitejší.','Rozdiely pomôžu, ale bez klientkinho cieľa ešte neviete, ktoré informácie sú podstatné.'],
 ['b',0,'Spýtam sa na požadovanú mzdu a lepšie platené miesto ponúknem ako východiskovú voľbu.','Mzda môže byť dôležitá, ale jedna neoverená priorita nestačí na odporúčanie.'],
 ['c',2,'Spýtam sa, čo má zmena práce vyriešiť a podľa čoho chce ponuky porovnať; jej cieľ potom zhrniem.','Vyjasníte potrebu, overíte porozumenie a rozhodnutie necháte klientke.'],
 ['d',1,'Požiadam klientku, aby si spísala výhody oboch miest, a k jej zoznamu sa vrátime na konci.','Vlastný zoznam je užitočný, ale najprv treba vyjasniť, čo klientka potrebuje vyriešiť.'],
 ['e',0,'Pošlem klientku domov zvážiť ponuky, pretože za ňu nesmiem rozhodovať.','Nepreberať rozhodnutie je správna hranica, rozhovor však môže ponúknuť štruktúru pre jej voľbu.']]}
},
'kpv-b':{
 cs:{question:'Jak ověříte termín a co mezitím řeknete klientovi?',options:[
 ['a',2,'U poskytovatele ověřím konkrétní běh, den, čas, místa i uzávěrku. Klientovi řeknu, že zdroje se liší a výsledek mu potvrdím.','Ověřujete u původního zdroje a nejistotu klientovi poctivě pojmenujete.'],
 ['b',1,'Podívám se na web znovu den před uzávěrkou a zatím klientovi pošlu oba odkazy.','Změna webu nemusí spor vyřešit. Přímé potvrzení u poskytovatele je spolehlivější.'],
 ['c',0,'Použiji středu z webu poskytovatele; jeho stránka bude nejspíš aktuálnější než leták.','Bez data aktualizace nemáte podklad, že údaj na webu platí pro tento běh.'],
 ['d',1,'Požádám klienta, aby poskytovateli zavolal, a při další schůzce se na výsledek zeptám.','Klienta můžete zapojit, ale při blízké uzávěrce potřebujete jasný termín a dohodu, kdo informaci ověří.'],
 ['e',0,'Pro jistotu uvedu úterý jako dřívější termín a doporučím připravit se na něj.','Opatrně vypadající odhad je pořád neověřený údaj.']]},
 sk:{question:'Ako overíte termín a čo zatiaľ poviete klientovi?',options:[
 ['a',2,'U poskytovateľa overím konkrétny kurz, deň, čas, voľné miesta aj uzávierku. Klientovi poviem, že zdroje sa líšia a výsledok mu potvrdím.','Overujete pri pôvodnom zdroji a neistotu klientovi poctivo pomenujete.'],
 ['b',1,'Pozriem sa na web znovu deň pred uzávierkou a zatiaľ klientovi pošlem oba odkazy.','Zmena webu nemusí spor vyriešiť. Priame potvrdenie u poskytovateľa je spoľahlivejšie.'],
 ['c',0,'Použijem stredu z webu poskytovateľa; jeho stránka bude asi aktuálnejšia než leták.','Bez dátumu aktualizácie neviete, či údaj na webe platí pre tento kurz.'],
 ['d',1,'Požiadam klienta, aby poskytovateľovi zavolal, a pri ďalšom stretnutí sa na výsledok spýtam.','Klienta môžete zapojiť, ale pri blízkej uzávierke treba jasný termín a dohodu, kto informáciu overí.'],
 ['e',0,'Pre istotu uvediem utorok ako skorší termín a odporučím pripraviť sa naň.','Opatrne vyzerajúci odhad je stále neoverený údaj.']]}
},
'kpv-c':{
 cs:{question:'Jak odpovíte rodiči na chodbě?',options:[
 ['a',1,'Řeknu, že obsah nyní sdílet nemohu, a rodiče odkážu na vedení školy.','Chráníte informace, ale bez konzultace s mentorkou může být odkaz příliš obecný.'],
 ['b',0,'Sdělím jen obecné oblasti, o nichž žákyně mluvila; konkrétní výroky si nechám pro sebe.','I obecný obsah rozhovoru může být v tomto kontextu citlivý. Pravidla sdílení neznáte.'],
 ['c',1,'Navrhnu společné setkání s rodičem a žákyní, podrobnosti s mentorkou vyřeším později.','Zapojení žákyně dává smysl, ale termín a způsob sdílení domluvte nejdřív s mentorkou.'],
 ['d',0,'Doporučím rodiči konkrétní školu, aby dostal praktickou odpověď, a rozhovor tím uzavřu.','Nemáte podklad pro výběr školy ani oprávnění převzít rozhodování za žákyni.'],
 ['e',2,'Uznám zájem rodiče, obsah na chodbě nesdělím a přizvu mentorku; s ní ověřím pravidla sdílení a zapojení žákyně.','Respektujete hranice studentské role a hledáte přiměřený další postup.']]},
 sk:{question:'Ako odpoviete rodičovi na chodbe?',options:[
 ['a',1,'Poviem, že obsah teraz nemôžem zdieľať, a rodiča odkážem na vedenie školy.','Chránite informácie, ale bez konzultácie s mentorkou môže byť odkaz príliš všeobecný.'],
 ['b',0,'Poviem iba všeobecné oblasti, o ktorých žiačka hovorila; konkrétne výroky si nechám pre seba.','Aj všeobecný obsah rozhovoru môže byť v tomto kontexte citlivý. Pravidlá zdieľania nepoznáte.'],
 ['c',1,'Navrhnem spoločné stretnutie s rodičom a žiačkou, podrobnosti s mentorkou vyriešim neskôr.','Zapojenie žiačky dáva zmysel, ale termín a spôsob zdieľania najprv dohodnite s mentorkou.'],
 ['d',0,'Odporučím rodičovi konkrétnu školu, aby dostal praktickú odpoveď, a rozhovor uzavriem.','Nemáte podklad na výber školy ani oprávnenie prevziať rozhodovanie za žiačku.'],
 ['e',2,'Uznám záujem rodiča, obsah na chodbe neprezradím a prizvem mentorku; s ňou overím pravidlá zdieľania a zapojenie žiačky.','Rešpektujete hranice študentskej roly a hľadáte primeraný ďalší postup.']]}
},
'kpv-d':{
 cs:{question:'Jak upravíte plán pro příští týden?',options:[
 ['a',0,'Připomenu klientovi původní dohodu a posunu termín o týden, aby měl víc času.','Čas sám neodstraní překážku v dostupnosti zaměstnavatelů.'],
 ['b',2,'Nejprve ověříme dopravu a směny, klient vybere jednu dosažitelnou nabídku k prověření a domluvíme kontrolní termín.','Plán reaguje na skutečnou překážku, ponechává volbu klientovi a má ověřitelný krok.'],
 ['c',1,'Vyhledám více nabídek v oboru a pošlu mu seznam míst, která jsou blíže bydlišti.','Vzdálenost je relevantní, ale dostupnost závisí i na směně a spojích; chybí klientův krok a kontrola.'],
 ['d',0,'Místo tří žádostí zadám jednu, aby byl plán snazší, a další detaily vyřešíme později.','Menší počet neřeší to, že doporučená práce nemusí být dopravně dostupná.'],
 ['e',1,'Požádám klienta, aby si sám zjistil autobusové spoje; potom mu doporučím novou nabídku.','Zjištění spojů pomůže, ale plán potřebuje společně vyjasnit podmínky konkrétní práce a termín kontroly.']]},
 sk:{question:'Ako upravíte plán na budúci týždeň?',options:[
 ['a',0,'Pripomeniem klientovi pôvodnú dohodu a posuniem termín o týždeň, aby mal viac času.','Čas sám neodstráni prekážku v dostupnosti zamestnávateľov.'],
 ['b',2,'Najprv overíme dopravu a smeny, klient vyberie jednu dostupnú ponuku na preverenie a dohodneme termín kontroly.','Plán reaguje na skutočnú prekážku, ponecháva voľbu klientovi a má overiteľný krok.'],
 ['c',1,'Vyhľadám viac ponúk v odbore a pošlem mu zoznam miest bližšie k bydlisku.','Vzdialenosť je dôležitá, ale dostupnosť závisí aj od smeny a spojov; chýba klientov krok a kontrola.'],
 ['d',0,'Namiesto troch žiadostí zadám jednu, aby bol plán ľahší, a ďalšie podrobnosti vyriešime neskôr.','Menší počet nerieši to, že odporúčaná práca nemusí byť dopravne dostupná.'],
 ['e',1,'Požiadam klienta, aby si sám zistil autobusové spoje; potom mu odporučím novú ponuku.','Zistenie spojov pomôže, ale plán potrebuje spoločne vyjasniť podmienky konkrétnej práce a termín kontroly.']]}
},
'upv-a':{
 cs:{question:'Co zapíšete do reflexe po náslechu?',options:[
 ['a',1,'Zapíšu počty odpovědí a mlčících žáků; o porozumění zatím neudělám závěr.','Pozorování oddělujete od závěru. Ještě chybí návrh, jak porozumění ověřit.'],
 ['b',0,'Poznamenám, že šest mlčících žáků látce nejspíš nerozumělo, a požádám učitele o pomalejší výklad.','Mlčení samo nedokazuje neporozumění a doporučení výkladu z něj předčasně vyvozuje příčinu.'],
 ['c',1,'Sleduji dva žáky, kteří nahlíželi do sešitu, a příště se jich cíleně zeptám na postup.','Konkrétní pozorování je užitečné, ale ověření jen u dvou neřekne dost o celé skupině.'],
 ['d',2,'Zapíšu tři odpovědi a šest mlčících bez nálepky; navrhnu krátký samostatný příklad pro všechny.','Oddělíte důkaz od domněnky a navrhnete ověření u celé skupiny.'],
 ['e',0,'Napíšu, že výuka proběhla klidně, a hodnocení porozumění ponechám cvičnému učiteli.','Klid není důkaz učení a reflexe studenta má popsat, co pozoroval a co potřebuje ověřit.']]},
 sk:{question:'Čo zapíšete do reflexie po náčuve?',options:[
 ['a',1,'Zapíšem počty odpovedí a mlčiacich žiakov; o porozumení zatiaľ neurobím záver.','Pozorovanie oddeľujete od záveru. Chýba ešte návrh, ako porozumenie overiť.'],
 ['b',0,'Poznačím, že šiesti mlčiaci žiaci učivu asi nerozumeli, a požiadam učiteľa o pomalší výklad.','Mlčanie samo nedokazuje neporozumenie a odporúčanie výkladu z neho predčasne vyvodzuje príčinu.'],
 ['c',1,'Sledujem dvoch žiakov, ktorí nahliadali do zošita, a nabudúce sa ich cielene spýtam na postup.','Konkrétne pozorovanie je užitočné, ale overenie len u dvoch nepovie dosť o celej skupine.'],
 ['d',2,'Zapíšem tri odpovede a šesť mlčiacich bez nálepky; navrhnem krátky samostatný príklad pre všetkých.','Oddelíte dôkaz od domnienky a navrhnete overenie u celej skupiny.'],
 ['e',0,'Napíšem, že výučba prebehla pokojne, a hodnotenie porozumenia nechám cvičnému učiteľovi.','Pokoj nie je dôkaz učenia a reflexia študenta má opísať, čo pozoroval a čo potrebuje overiť.']]}
},
'upv-b':{
 cs:{question:'Který desetiminutový postup nejlépe ověří cíl?',options:[
 ['a',1,'Předvedu dva rozměry na tabuli a jednoho dobrovolníka požádám, aby určil třetí.','Ukázka a dobrovolník pomohou, ale neověří samostatný výkon všech.'],
 ['b',0,'Promítnu správně popsaný výkres; na konci se zeptám, jestli je postup jasný.','Souhlas žáků neukáže, zda sami údaj najdou a doloží jeho zdroj.'],
 ['c',1,'Nechám všechny určit rozměr na list, ale místo ve výkresu vysvětlím až po kontrole.','Zapojíte všechny, ale cíl zahrnuje i doložení, odkud údaj pochází.'],
 ['d',0,'Vysvětlím pravidla technického kreslení a správné rozměry rozdám k domácímu prostudování.','Cíl je konkrétní samostatná práce s výkresem, ne převzetí hotového výsledku.'],
 ['e',2,'Žáci najdou označenou součást, zapíší rozměr a označí místo výkresu; zkontroluji odpovědi všech.','Cíl, úloha i ověření míří na stejný pozorovatelný výkon.']]},
 sk:{question:'Ktorý desaťminútový postup najlepšie overí cieľ?',options:[
 ['a',1,'Predvediem dva rozmery na tabuli a jedného dobrovoľníka požiadam, aby určil tretí.','Ukážka a dobrovoľník pomôžu, ale neoveria samostatný výkon všetkých.'],
 ['b',0,'Premietnem správne opísaný výkres; na konci sa spýtam, či je postup jasný.','Súhlas žiakov neukáže, či sami údaj nájdu a doložia jeho zdroj.'],
 ['c',1,'Nechám všetkých určiť rozmer na list, ale miesto vo výkrese vysvetlím až po kontrole.','Zapojíte všetkých, ale cieľ zahŕňa aj doloženie, odkiaľ údaj pochádza.'],
 ['d',0,'Vysvetlím pravidlá technického kreslenia a správne rozmery rozdám na domáce štúdium.','Cieľom je konkrétna samostatná práca s výkresom, nie prevzatie hotového výsledku.'],
 ['e',2,'Žiaci nájdu označenú súčiastku, zapíšu rozmer a označia miesto výkresu; skontrolujem odpovede všetkých.','Cieľ, úloha aj overenie smerujú k rovnakému pozorovateľnému výkonu.']]}
},
'upv-c':{
 cs:{question:'Co uděláte jako první a jak bude žák pokračovat?',options:[
 ['a',0,'Nechám žáka postup dokončit, pak na chybu upozorním v závěrečné reflexi.','Bezpečnostní krok nemůže čekat až na konec úkonu.'],
 ['b',1,'Úkon zastavím a požádám žáka, aby si pomůcky zkontroloval; potom může pokračovat.','Okamžité zastavení je správné, ale postup musí odpovídat pravidlům školy a roli cvičného učitele.'],
 ['c',2,'Úkon bezpečně přeruším, přizvu cvičného učitele, ověřím místní postup a teprve pak nechám žáka zkusit krok pod dohledem.','Riziko řešíte hned, respektujete místní pravidla a vytváříte bezpečný další pokus.'],
 ['d',0,'Nástroj žákovi odeberu a práci mu pro dnešek zakážu, aby si chybu zapamatoval.','Zastavení rizika je nutné, ale automatický trest bez dalšího bezpečného učení není podložený.'],
 ['e',1,'Žáka požádám, aby přestal, a předám celou situaci cvičnému učiteli bez dalšího zapojení.','Předání učiteli je bezpečné, ale podle domluvené role se můžete pod jeho vedením podílet i na vysvětlení a novém pokusu.']]},
 sk:{question:'Čo urobíte najprv a ako bude žiak pokračovať?',options:[
 ['a',0,'Nechám žiaka postup dokončiť, potom na chybu upozorním v záverečnej reflexii.','Bezpečnostný krok nemôže čakať až na koniec úkonu.'],
 ['b',1,'Úkon zastavím a požiadam žiaka, aby si pomôcky skontroloval; potom môže pokračovať.','Okamžité zastavenie je správne, ale postup musí rešpektovať pravidlá školy a rolu cvičného učiteľa.'],
 ['c',2,'Úkon bezpečne preruším, prizvem cvičného učiteľa, overím miestny postup a až potom nechám žiaka skúsiť krok pod dohľadom.','Riziko riešite hneď, rešpektujete miestne pravidlá a vytvárate bezpečný ďalší pokus.'],
 ['d',0,'Nástroj žiakovi odoberiem a prácu mu na dnes zakážem, aby si chybu zapamätal.','Zastavenie rizika je nutné, ale automatický trest bez ďalšieho bezpečného učenia nie je podložený.'],
 ['e',1,'Žiaka požiadam, aby prestal, a celú situáciu odovzdám cvičnému učiteľovi bez ďalšieho zapojenia.','Odovzdanie učiteľovi je bezpečné, ale podľa dohodnutej roly sa môžete pod jeho vedením podieľať aj na vysvetlení a novom pokuse.']]}
},
'upv-d':{
 cs:{question:'Co z listů vyvodíte a co změníte příště?',options:[
 ['a',1,'Ve čtyřech listech chybí vysvětlení; s cvičným učitelem ověřím, zda bylo zadání jasné.','Opatrný závěr i otázka jsou na místě; ještě chybí konkrétní ověření v další hodině.'],
 ['b',0,'Protože třída byla klidná, cíl považuji za splněný; čtyři listy jsou výjimka.','Klid nedokládá splnění cíle a čtyři listy nejde takto bez ověření odložit.'],
 ['c',1,'Příště stejný krok znovu vysvětlím všem a požádám dobrovolníka o ukázku.','Další vysvětlení může pomoci, ale potřebujete ověřit výkon všech, ne pouze jednoho žáka.'],
 ['d',2,'Popíšu pouze čtyři dostupné listy, vyslovím opatrnou hypotézu a příště nechám všechny krok provést i zdůvodnit.','Závěr nepřesahuje důkazy a nová úloha ověří účinek úpravy u všech.'],
 ['e',0,'Usoudím, že žáci kritériu nerozuměli, a do příště jim připravím správné odpovědi k opsání.','Ze čtyř listů nevíte, proč vysvětlení chybí; opis navíc neověří porozumění.']]},
 sk:{question:'Čo z listov vyvodíte a čo zmeníte nabudúce?',options:[
 ['a',1,'Na štyroch listoch chýba vysvetlenie; s cvičným učiteľom overím, či bolo zadanie jasné.','Opatrný záver aj otázka sú na mieste; chýba ešte konkrétne overenie na ďalšej hodine.'],
 ['b',0,'Keďže trieda bola pokojná, cieľ považujem za splnený; štyri listy sú výnimka.','Pokoj nedokladá splnenie cieľa a štyri listy nemožno takto bez overenia odložiť.'],
 ['c',1,'Nabudúce rovnaký krok znovu vysvetlím všetkým a požiadam dobrovoľníka o ukážku.','Ďalšie vysvetlenie môže pomôcť, ale treba overiť výkon všetkých, nie iba jedného žiaka.'],
 ['d',2,'Opíšem iba štyri dostupné listy, vyslovím opatrnú hypotézu a nabudúce nechám všetkých krok vykonať aj zdôvodniť.','Záver nepresahuje dôkazy a nová úloha overí účinok úpravy u všetkých.'],
 ['e',0,'Usúdim, že žiaci kritériu nerozumeli, a nabudúce im pripravím správne odpovede na prepísanie.','Zo štyroch listov neviete, prečo vysvetlenie chýba; opis navyše neoverí porozumenie.']]}
}};
export const simChoices=Object.fromEntries(Object.entries(data).map(([id,locales])=>[id,Object.fromEntries(Object.entries(locales).map(([l,item])=>[l,{question:item.question,options:item.options.map(([id,score,label,feedback])=>({id,score,label,feedback}))}]))]));
