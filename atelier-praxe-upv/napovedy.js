'use strict';
window.Napovedy=(()=>{
  const packs={
    ivp:[
      ['Jak škola propojuje teorii s praxí','Jak je uspořádaná školní dílna','Co žák potřebuje před prvním úkolem'],
      ['Žáci předvedli postup po společné ukázce.','Učitel propojil zadání s příkladem ze školní dílny.','Při exkurzi se chci k této situaci ještě vrátit.'],
      ['Samotný popis organizace školy mi k vysvětlení učení nestačí.','Příklad z dílny mi pomohl pochopit návaznost předmětů.','Chybí mi pohled žáka.'],
      ['Při dalším náslechu zachytím první samostatný krok žáka.','Proberu s učitelem návaznost teorie na práci v dílně.','Vyhledám odpovídající výstup v ŠVP.']],
    group:[
      ['Jak učitel ověřil pochopení pracovního postupu','Co udělali žáci po první ukázce','Jak se do práce zapojila dvojice'],
      ['Učitel předvedl první krok a předal pomůcku žákům.','Žáci si ve dvojici porovnali výsledky.','Po zadání zazněl dotaz na postup.'],
      ['Vysvětlení žáka mi ukázalo, jak pokynu porozuměl.','Ze samotného hotového výrobku nepoznám, kdo postup provedl.','Zatím nemám dost podkladů pro závěr.'],
      ['Zachytím, co žák udělá po zpětné vazbě.','Zeptám se učitele, proč ukázku v tomto místě zastavil.','Při dalším náslechu porovnám první pokus dvou dvojic.']],
    guided:[
      ['Kdy učitel změní svůj pokyn','Co žák upraví při druhém pokusu','Podle čeho poznáme samostatnou práci'],
      ['Učitel po dotazu ukázal část postupu znovu.','Žák po ukázce opravil jeden krok.','Žák požádal o pomoc ještě před prvním pokusem.'],
      ['Druhý pokus ukázal, zda žák změnu pochopil.','Potřebuji odlišit vlastní dojem od toho, co žák udělal.','Bez vysvětlení žáka neznám důvod jeho volby.'],
      ['Příště zaznamenám první i druhý pokus.','Při rozboru ověřím, podle čeho učitel změnil pokyn.','Položím žákovi otázku na důvod volby.']],
    micro:[
      ['První pokyn k samostatné práci','Předání pomůcky po ukázce','Jak ověřím srozumitelnost instruktáže'],
      ['Po pokynu se skupina pustila do práce.','Účastníci požádali o zopakování prvního kroku.','Po ukázce zazněla dvě různá vysvětlení úkolu.'],
      ['Reakce na první pokyn odhalila, co je třeba upřesnit.','Ukázka byla užitečná až ve spojení s vlastním pokusem.','Potřebuji získat zpětnou vazbu od skupiny.'],
      ['Zkrátím první pokyn na jednu činnost.','Po ukázce nechám účastníky zopakovat postup.','Požádám pozorovatele, aby si zapsal první reakci skupiny.']],
    continuous:[
      ['Jak žáci využili zpětnou vazbu','Volba pomůcky při samostatné práci','Ověření cíle na závěr hodiny'],
      ['Žák vysvětlil, proč zvolil právě tuto pomůcku.','Po zpětné vazbě žák upravil výsledek.','Žák čekal na doplnění zadání.'],
      ['Zdůvodnění volby mi ukázalo víc než samotný výsledek.','Z jednoho pokusu zatím nemohu posoudit samostatnost.','Potřebuji porovnat záměr hodiny s prací žáka.'],
      ['Při příští hodině si vyžádám zdůvodnění volby.','Porovnám první a opravený výrobek.','Domluvím s učitelem jeden projev žáka, který budeme sledovat.']],
    reflection:[
      ['Co se změnilo mezi dvěma výstupy','Jak se vyvíjí moje zadávání úkolů','Jak dnes pracuji se zpětnou vazbou'],
      ['Porovnávám pokyn ve dvou přípravách.','Vracím se ke dvěma ukázkám práce žáků.','Porovnávám vlastní postřeh s komentářem učitele.'],
      ['V novějším zápisu umím uvést konkrétní reakci žáka.','Rozdíl mezi ukázkami zatím neumím doložit.','Zpětná vazba mě přivedla k jiné otázce.'],
      ['Vyberu další ukázku stejné kompetence.','Při příští výuce ověřím změněný pokyn.','Na rozbor přinesu dvojici dokladů.']],
    nacvik:[
      [],['Zkouším první větu instruktáže.','Vybírám způsob pomoci dvojici.','Připravuji otázku pro rozbor.'],
      ['Pojmenování úkolu pomůže žákovi začít.','Otázka na postup může ukázat místo nejistoty.','K posouzení potřebuji i vlastní vysvětlení žáka.'],
      ['Nechám žáka ukázat první krok.','Zkusím jinou formulaci a porovnám zpětnou vazbu.','Přinesu situaci na rozbor s učitelem.']],
    adaptio:[
      [],['Potřebuji si domluvit první návštěvu školy.','Připravuji si vlastní výstup.','Chci rozebrat obtížný okamžik z výuky.'],
      ['Pomůže mi dopředu domluvené zaměření náslechu.','Potřebuji druhý pohled na reakci žáků.','Mohu přesněji pojmenovat, s čím potřebuji podporu.'],
      ['Domluvím si konkrétní otázku pro mentora.','Přinesu na konzultaci jeden záznam.','Ověřím si termín společného rozboru.']],
    ss:[
      [],['Předem domlouvám výsledek práce žáka.','Sleduji druhý pokus bez ukázky.','Zajímá mě zdůvodnění výběru měřidla.'],
      ['Hotový rozměr sám neukazuje samostatnost.','Vysvětlení volby doplňuje výsledek měření.','Potřebuji zaznamenat i poskytnutou pomoc.'],
      ['Vyžádám si popis jednoho samostatného kroku.','Domluvím kritérium před začátkem úkolu.','Porovnám první a druhý pokus.']],
    kurzy:[
      [],['Chci upravit zadání praktického úkolu.','Chci lépe rozpoznat, kdy mohu ustoupit do pozadí.','Procvičuji zpětnou vazbu po výkonu.'],
      ['Samostatný první krok ukáže, jak žák porozuměl.','Další pokus pomůže posoudit přínos zpětné vazby.','Užitečným dokladem bude vysvětlení žákovy volby.'],
      ['Vyzkouším to při příští instruktáži.','Při další praxi si zachytím první samostatný krok žáka.','V rozboru porovnám dva pokusy.']]
  };
  const fields={
    'Škola, obor a třída':['Modelová SOŠ technická · strojírenství','Modelové učiliště řemesel · truhlářství','Modelová SOŠ služeb · gastronomie'],
    'Předmět, téma a organizace':['Odborný předmět · společná ukázka','Odborný výcvik · práce ve dvojicích','Odborná praxe · samostatná práce'],
    'Cíl a jeho naplnění':['Žák vlastními slovy vysvětlil postup.','Žák vybral pomůcku a zdůvodnil volbu.','Naplnění cíle jsem v tomto úseku nezachytil/a.'],
    'Metody, pomůcky a technika':['Názorná ukázka s pomůckou','Porovnání dvou vzorků','Rozhovor nad výsledkem práce'],
    'Zapojení žáků a atmosféra':['Ve dvojici se oba žáci při práci vystřídali.','Po výzvě odpovídal jeden žák.','Žáci si vzájemně vysvětlovali postup.'],
    'Ověření učení a zpětná vazba':['Učitel požádal žáka o vysvětlení volby.','Žák po zpětné vazbě vyzkoušel další postup.','Ověření učení jsem v této části nezaznamenal/a.'],
    'Rozbor a vlastní závěr':['Pro rozbor vybírám první pokus žáka.','Chci se zeptat na načasování zpětné vazby.','Potřebuji ověřit svůj výklad s učitelem.'],
    'Škola a její vedení':['Modelová SOŠ technická','Modelové učiliště řemesel','Modelová SOŠ služeb'],
    'Obory a ŠVP':['Strojírenství','Truhlářství','Gastronomie'],
    'Jak škola organizuje výuku':['Praxe probíhá ve školní dílně.','Výuka probíhá na smluvním pracovišti.','Žáci střídají učebnu a dílnu.'],
    'Co vás při návštěvě zaujalo':['Předání úkolu z učebny do dílny','Způsob přípravy pracovního místa','Domluva učitele s instruktorem'],
    'Otázka pro řízenou diskusi':['Jak škola propojuje teorii s prací v dílně?','Co rozhoduje o náročnosti prvního úkolu?','Jak se k učiteli dostane zpětná vazba z pracoviště?'],
    'Téma a cíl výstupu':['Žák předvede první krok bez nápovědy.','Žák správně zvolí pomůcku.','Žák vysvětlí rozdíl mezi dvěma výsledky.'],
    'Příprava a organizace':['Ukázka následovaná samostatným pokusem','Práce ve dvojici se střídáním rolí','Porovnání dvou vzorků na závěr'],
    'Jak povedu instruktáž':['Předvedu krok a předám pomůcku.','Nechám dvojici navrhnout první krok.','Ukážu dva výsledky a požádám o porovnání.'],
    'Moje sebereflexe':packs.micro[2], 'Zpětná vazba a další pokus':packs.micro[3],
    'Cíl mé výuky': ['Žák zdůvodní volbu postupu.','Žák provede úkol samostatně.','Žák porovná výsledek s kritériem.'],
    'Doklad o učení':['První a druhý pokus žáka','Vysvětlení žáka při volbě pomůcky','Pracovní list s opravou postupu'],
    'Rozbor výstupu':packs.continuous[3],
    'Co ukazují mé dvě ukázky?':packs.reflection[1], 'Co se změnilo v mém rozhodování?':packs.reflection[2], 'Na co se zaměřím dál?':packs.reflection[3]
  };
  const moment={time:['Na začátku hodiny','Při prvním pokusu','Při závěrečném rozboru'],event:['Učitel předvedl první krok.','Učitel položil doplňující otázku.','Učitel požádal o porovnání výsledků.'],pupils:['Žák zopakoval postup samostatně.','Dvojice si vyžádala upřesnění.','Žák vysvětlil důvod své volby.'],note:['Ověřit, proč učitel vyčkal.','Porovnat s druhým pokusem.','Zeptat se žáka, co mu pomohlo.']};
  const feedback=['Závěr je podložený konkrétní situací z hodiny. Pokračujte navrženým dalším krokem.','V záznamu je zřetelná vazba mezi postupem učitele a reakcí žáka.','Doplňte, co konkrétně udělal žák po vašem pokynu.','Při dalším pokusu porovnejte dvě reakce žáků.','U příštího výstupu se vraťme ke stejnému cíli.'];
  // Each set follows the three questions in the block's reflection sheet.
  const specific={
    nacvik:[
      [
        ['„Každý změří oba vzorky a vysvětlí rozdíl.“','„Jak byste začali měřit první vzorek?“','„Dnes si ukážeme posuvné měřítko.“'],
        ['Ví, co má předvést a vysvětlit.','Zná téma, ale ještě neví, podle čeho posoudí výsledek.'],
        ['Požádám žáka, aby zadání shrnul vlastními slovy.','Nechám každého předvést první krok ve dvojici.']
      ],[
        ['Požádám dvojici, aby ukázala místo, kde se zastavila.','Předvedu odečet a předám měřidlo zpět.'],
        ['Nechám žáka nejprve přiložit měřidlo.','Požádám žáka, aby ukázal místo odečtu.'],
        ['Při druhém vzorku nechám oba členy dvojice měřit bez mé ukázky.','Předám dvojici měřidlo a sleduji, jak začne další měření.']
      ],[
        ['Vyberu okamžik, kdy žák po pochvale upravil výrobek.','Vyberu okamžik, kdy žák po pochvale požádal o vysvětlení.'],
        ['Vidím změnu na výrobku, důvod změny zatím neznám.','Chybí mi vyjádření žáka k tomu, co mu pomohlo.'],
        ['„Co přesně jste u této práce ocenil/a?“','„Které kritérium žák znal už před začátkem práce?“']
      ]],
    adaptio:[
      [
        ['Místo a čas prvního setkání','Zaměření pozorování','Pravidla pracoviště'],
        ['Budu vědět, kde mohu při nácviku stát a co odtud uvidím.','Předem si vyberu jeden projev žáka, kterého si budu všímat.'],
        ['Před návštěvou si potvrdím místo a čas setkání.','Před začátkem hodiny si s učitelem domluvím otázku pro rozbor.']
      ],[
        ['První větu svého zadání','Přechod od ukázky k samostatné práci'],
        ['Nevím, s čím už skupina pracovala.','Chci si ověřit, zda z mého pokynu vyplývá první krok.'],
        ['Požádám mentora, aby zachytil první otázku žáků.','Mentor bude sledovat, kdo po ukázce začne bez dalšího pobídnutí.']
      ],[
        ['Zopakoval/a jsem pokyn a dvojice si vyžádala upřesnění.','Předal/a jsem pomůcku a žák předvedl první krok.'],
        ['Chci porovnat svůj dojem s tím, co viděl mentor.','Potřebuji vědět, jak situaci pochopili žáci.'],
        ['Příště počkám na první pokus a s mentorem porovnám reakci.','Domluvím si předem, kdy požádám mentora o podporu.']
      ]],
    ss:[
      [
        ['Žák samostatně zvolí měřidlo pro druhý vzorek.','Žák porovná oba naměřené výsledky.'],
        ['Který krok zvládl bez pomoci.','Proč zvolil právě toto měřidlo.'],
        ['Vyžádám si jeden příklad samostatného rozhodnutí.','Domluvím zápis toho, kdy žák potřeboval nápovědu.']
      ],[
        ['U prvního vzorku ukážu přiložení, u druhého rozhoduje žák.','Předvedu odečet a další vzorek nechám změřit žákovi.'],
        ['Žák vysvětlí, proč zvolil právě toto měřidlo.','Žák porovná dvě možnosti a zdůvodní svou volbu.'],
        ['Se žákem proberu první samostatný krok a tentýž krok popíšu škole.','Žákovi popíšu, co opravil, a škole předám oba výsledky.']
      ],[
        ['„Zvolil/a jsem ho podle rozměru vzorku.“','„Potřebuji takovou přesnost, aby šly oba výsledky porovnat.“'],
        ['Porovná výsledek s předem daným kritériem.','Zopakuje měření a vysvětlí případný rozdíl.'],
        ['„Co příště zkusíte sami jako první?“','„Podle čeho si svůj výsledek ověříte?“']
      ]],
    kurzy:[
      [
        ['Nejprve řeknu účel práce a předvedu první krok.','Ukážu dva výsledky a nechám žáka pojmenovat rozdíl.'],
        ['Žák vlastními slovy vysvětlí první krok.','Žák samostatně vybere vhodnou pomůcku.'],
        ['Na začátku příští instruktáže uvedu konkrétní činnost.','Před zahájením práce požádám žáka, aby shrnul zadání.']
      ],[
        ['Při výběru pomůcky','Při kontrole prvního výsledku'],
        ['Žák zdůvodní vlastní volbu.','Žák najde a opraví odchylku bez mého zásahu.'],
        ['U dalšího vzorku předám volbu žákovi a zapíšu jeho zdůvodnění.','Po změně zadání zachytím, který krok žák zvládl bez pomoci.']
      ],[
        ['První přiložení měřidla','Kontrolu výsledku podle kritéria'],
        ['Příště sám zkontroluje první krok.','Porovná výsledek s kritériem dříve, než požádá o pomoc.'],
        ['Pojmenuji jeden viditelný krok a po dalším pokusu se k němu vrátím.','Zeptám se žáka, co upraví, a druhý pokus společně porovnáme s prvním.']
      ]]
  };
  const phaseReflection={
    ivp:[['V dílně žáci použili výkres z odborného předmětu.','Učitel při výkladu ukázal výrobek z dílny.'],['Viděl/a jsem práci s výkresem. Nevím ještě, jak si žák poradil poprvé.','Slyšel/a jsem zadání, vlastní pokus žáka jsem nezachytil/a.'],packs.ivp[3]],
    group:[['Učitel předal měřidlo a žák ukázal první krok.','Po zadání se dvojice zeptala, kterou hodnotu má odečíst.','Učitel požádal o porovnání a žáci si vyměnili výrobky.'],['Po prvním pokynu se žák zeptal, odkud začít.','U jedné dvojice učitel zopakoval ukázku, druhá začala sama.','Z jednoho pozorování zatím závěr neudělám.'],['Zachytím první krok žáka po předání pomůcky.','Porovnám reakci dvou dvojic na stejný pokyn.','Zaměřím se na to, co žák po zpětné vazbě změní.']],
    guided:[['Po otázce žáka učitel znovu předvedl přiložení měřidla.','Když dvojice váhala, učitel rozdělil zadání na dva kroky.'],['Žák opravil přiložení a další vzorek změřil samostatně.','Další pokus jsem neviděl/a. Výklad ověřím s učitelem.'],packs.guided[3]],
    micro:[['Po pokynu „Porovnejte oba vzorky“ dvojice hledaly rozdíl.','Po větě „Začněte měřit“ se skupina zeptala, který vzorek použít.'],['Dvě různé první reakce ukázaly, že první krok nebyl jasný.','Pozorovatel si všiml, že účastníci začali samostatně až po ukázce.'],['Určím první vzorek a budu sledovat, zda dvojice začne bez dalšího dotazu.','Předám pomůcku dřív a porovnám první samostatný pokus.']],
    continuous:[packs.continuous[1],['Učitel i já jsme zaznamenali samostatnou opravu žáka.','Žák zdůvodnil volbu. Zpětnou vazbu učitele potřebuji doplnit.'],['Příště ukážu kritérium předem a porovnám dvě žákovské práce.','Zkrátím ukázku a zaznamenám první samostatné rozhodnutí.']],
    reflection:[['První pokyn ze skupinového náslechu a první pokyn z vlastní výuky.','Zpětnou vazbu po mikrovýstupu a po hodině na cvičné škole.'],['V dřívějším zápisu uvádím dojem. V novějším dokládám, co žák změnil.','Při novějším výstupu ponechávám žákovi víc času na vlastní opravu.','Mezi ukázkami zatím neumím doložit změnu.'],['Budu rozvíjet zadávání úkolů. Uchovám první reakci žáků na nové zadání.','Zaměřím se na zpětnou vazbu a vyberu dvě verze žákovské práce.']]
  };
  function reflection(block,id){
    if (id != null && id !== '' && specific[block]?.[id]) return specific[block][id];
    return phaseReflection[block] || packs[block].slice(1);
  }
  return {packs,fields,moment,feedback,reflection};
})();
