// Original pilot probes. Forms are not yet calibrated or validated.
export const probeSources={
  "probe-ethics": {
    "title": "IAEVG · Ethical Guidelines (2025)",
    "url": "https://www.iaevg.com/Ethical-guidelines",
    "note": "Profesní etický rámec; konkrétní situace a hodnoticí klíče jsou autorským návrhem."
  },
  "probe-nsk": {
    "title": "NSK · Kariérový poradce / kariérová poradkyně 75-004-R",
    "url": "https://www.narodnikvalifikace.cz/kvalifikace-1538-Karierovy_poradce_karierova_poradkyne/kvalifikacni-standard",
    "note": "Oblasti práce poradce. Nejde o oficiální zkoušku této kvalifikace."
  },
  "probe-kraau": {
    "title": "MŠMT · Oborově specifický rámec pro odborné předměty, praktické vyučování a odborný výcvik",
    "url": "https://edu.gov.cz/wp-content/uploads/2026/07/OSKR_Ucitelstvi-odbornych-predmetu-praktickeho-vyucovani-a-odborneho-vycviku_final_prosinec-2025.pdf",
    "note": "Rámec profesní přípravy; naše klíče nejsou standardizovaným nástrojem MŠMT."
  }
};
export const probeCases=[
  {
    "id": "probe-kpv-a-zakazka",
    "track": "kpv",
    "form": "A",
    "construct": "zakazka",
    "stage": "probe",
    "title": "Dvě nabídky, jiná otázka",
    "setting": "Nová modelová situace",
    "role": "Student/ka kariérového poradenství pod odborným vedením",
    "goal": "Vyjasnit zakázku před doporučením.",
    "scene": "Dospělá klientka přinese dvě nabídky práce. Ptá se, která je lepší. O platu víte vše, ale o jejích prioritách nic. Máte dvacet minut.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "zakazka",
    "options": [
      {
        "label": "Dohodnout kritéria klientky a podle nich porovnat nabídky.",
        "score": 2,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "V zadání chybí klientčina kritéria. Nabídky lze zodpovědně porovnat teprve vůči nim."
      },
      {
        "label": "Popsat podmínky obou míst a ponechat klientce čas na vlastní srovnání.",
        "score": 1,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "V zadání chybí klientčina kritéria. Nabídky lze zodpovědně porovnat teprve vůči nim."
      },
      {
        "label": "Doporučit vyšší plat; zbývající rozdíly probrat, pokud klientka nebude souhlasit.",
        "score": 0,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "V zadání chybí klientčina kritéria. Nabídky lze zodpovědně porovnat teprve vůči nim."
      }
    ],
    "principle": "V zadání chybí klientčina kritéria. Nabídky lze zodpovědně porovnat teprve vůči nim.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-ethics"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-kpv-a-informace",
    "track": "kpv",
    "form": "A",
    "construct": "informace",
    "stage": "probe",
    "title": "Kurz se dvěma termíny",
    "setting": "Nová modelová situace",
    "role": "Student/ka kariérového poradenství pod odborným vedením",
    "goal": "Ověřit rozpor v kariérové informaci.",
    "scene": "Klient našel začátek kurzu 8. dubna na reklamním portálu. Poskytovatel má u téhož běhu datum 22. dubna. Oba weby jsou dostupné; nevíte, kdy byly aktualizovány.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "informace",
    "options": [
      {
        "label": "Předat oba odkazy s upozorněním na rozpor; ověření ponechat na klientovi.",
        "score": 1,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Rozpor nelze vyřešit volbou data, které působí opatrněji. Je potřeba ověřit platnost údaje pro daný běh."
      },
      {
        "label": "Použít dřívější datum jako rezervu a podle něj společně sestavit plán.",
        "score": 0,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Rozpor nelze vyřešit volbou data, které působí opatrněji. Je potřeba ověřit platnost údaje pro daný běh."
      },
      {
        "label": "Ověřit u poskytovatele termín konkrétního běhu a klientovi rozpor zatím označit.",
        "score": 2,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Rozpor nelze vyřešit volbou data, které působí opatrněji. Je potřeba ověřit platnost údaje pro daný běh."
      }
    ],
    "principle": "Rozpor nelze vyřešit volbou data, které působí opatrněji. Je potřeba ověřit platnost údaje pro daný běh.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-nsk"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-kpv-a-hranice",
    "track": "kpv",
    "form": "A",
    "construct": "hranice",
    "stage": "probe",
    "title": "Nahrávka pro spolužáky",
    "setting": "Nová modelová situace",
    "role": "Student/ka kariérového poradenství pod odborným vedením",
    "goal": "Udržet hranice dohodnutého využití materiálu.",
    "scene": "Na praxi máte svolení pozorovat rozhovor a udělat stručný studijní zápis. Spolužák žádá zvukovou nahrávku, aby lépe pochopil postup. Nahrávání ani sdílení nebylo dohodnuto.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "hranice",
    "options": [
      {
        "label": "Nahrát jen krátkou část a sdílet ji ve skupině s požadavkem dalšího nešíření.",
        "score": 0,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Svolení k pozorování neznamená svolení k nahrávce nebo k přepisu pro další lidi. Modelová ukázka může naplnit vzdělávací cíl."
      },
      {
        "label": "Nahrávku odmítnout; s mentorem připravit smyšlenou ukázku postupu.",
        "score": 2,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Svolení k pozorování neznamená svolení k nahrávce nebo k přepisu pro další lidi. Modelová ukázka může naplnit vzdělávací cíl."
      },
      {
        "label": "Nahrávku odmítnout a vysvětlit hranici svolení, bez nabídky další studijní možnosti.",
        "score": 1,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Svolení k pozorování neznamená svolení k nahrávce nebo k přepisu pro další lidi. Modelová ukázka může naplnit vzdělávací cíl."
      }
    ],
    "principle": "Svolení k pozorování neznamená svolení k nahrávce nebo k přepisu pro další lidi. Modelová ukázka může naplnit vzdělávací cíl.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-ethics"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-kpv-a-navaznost",
    "track": "kpv",
    "form": "A",
    "construct": "navaznost",
    "stage": "probe",
    "title": "Plán zní dobře. Co dál?",
    "setting": "Nová modelová situace",
    "role": "Student/ka kariérového poradenství pod odborným vedením",
    "goal": "Převést obecný záměr na ověřitelný další krok.",
    "scene": "Klient chce zjistit, zda by mu vyhovovala logistika. Na konci rozhovoru řekne: „Tak se na to někdy podívám.“ Neví, koho může oslovit.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "navaznost",
    "options": [
      {
        "label": "Dohodnout s klientem jednu aktivitu, termín i otázku, kterou si pomocí ní chce ověřit.",
        "score": 2,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Další krok musí být klientův a uskutečnitelný. Seznam může pomoci, ale bez dohody o jeho využití se postup hůře vyhodnotí."
      },
      {
        "label": "Poslat mu přehled logistických profesí, aby si mohl zvolit, co ho zaujme.",
        "score": 1,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Další krok musí být klientův a uskutečnitelný. Seznam může pomoci, ale bez dohody o jeho využití se postup hůře vyhodnotí."
      },
      {
        "label": "Uzavřít rozhovor; klient se znovu ozve, jakmile si vybere konkrétní profesi.",
        "score": 0,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Další krok musí být klientův a uskutečnitelný. Seznam může pomoci, ale bez dohody o jeho využití se postup hůře vyhodnotí."
      }
    ],
    "principle": "Další krok musí být klientův a uskutečnitelný. Seznam může pomoci, ale bez dohody o jeho využití se postup hůře vyhodnotí.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-nsk"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-kpv-b-zakazka",
    "track": "kpv",
    "form": "B",
    "construct": "zakazka",
    "stage": "probe",
    "title": "Změna oboru pod tlakem",
    "setting": "Nová modelová situace",
    "role": "Student/ka kariérového poradenství pod odborným vedením",
    "goal": "Odlišit zakázku klienta od očekávání okolí.",
    "scene": "Dospělý student uvažuje o změně oboru. Vedoucí skupiny vám předem řekl, ať ho přesvědčíte zůstat. Student zatím pouze požádal o rozhovor.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "zakazka",
    "options": [
      {
        "label": "Popsat možnosti přestupu a nabídnout další setkání, pokud se v nich nezorientuje.",
        "score": 1,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Cíl rozhovoru nelze převzít od jiné osoby bez vyjasnění studentovy potřeby. Informace přicházejí až do srozumitelného rámce."
      },
      {
        "label": "Probrat nejprve výhody dokončení oboru; změnu řešit až při trvajícím zájmu.",
        "score": 0,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Cíl rozhovoru nelze převzít od jiné osoby bez vyjasnění studentovy potřeby. Informace přicházejí až do srozumitelného rámce."
      },
      {
        "label": "Vyjasnit studentovu potřebu a dohodnout vlastní cíl rozhovoru.",
        "score": 2,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Cíl rozhovoru nelze převzít od jiné osoby bez vyjasnění studentovy potřeby. Informace přicházejí až do srozumitelného rámce."
      }
    ],
    "principle": "Cíl rozhovoru nelze převzít od jiné osoby bez vyjasnění studentovy potřeby. Informace přicházejí až do srozumitelného rámce.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-ethics"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-kpv-b-informace",
    "track": "kpv",
    "form": "B",
    "construct": "informace",
    "stage": "probe",
    "title": "Povolání podle videa",
    "setting": "Nová modelová situace",
    "role": "Student/ka kariérového poradenství pod odborným vedením",
    "goal": "Rozlišit příklad od reprezentativní informace.",
    "scene": "Klient ukazuje video tvůrce, který tvrdí, že každý junior v dané profesi pracuje z domu. Klient potřebuje práci slučitelnou s péčí o blízkého.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "informace",
    "options": [
      {
        "label": "Zařadit profesi mezi vhodné a hledat v ní nabídky bez dalšího ověřování režimu.",
        "score": 0,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Jeden zkušenostní příběh neověřuje podmínky jiných míst. Rozhodnutí zde závisí na konkrétních pracovních režimech."
      },
      {
        "label": "Prověřit režim u více konkrétních nabídek a porovnat jej s klientovými potřebami péče.",
        "score": 2,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Jeden zkušenostní příběh neověřuje podmínky jiných míst. Rozhodnutí zde závisí na konkrétních pracovních režimech."
      },
      {
        "label": "Porovnat zkušenost tvůrce s dalším videem a upozornit na rozdílné zkušenosti.",
        "score": 1,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Jeden zkušenostní příběh neověřuje podmínky jiných míst. Rozhodnutí zde závisí na konkrétních pracovních režimech."
      }
    ],
    "principle": "Jeden zkušenostní příběh neověřuje podmínky jiných míst. Rozhodnutí zde závisí na konkrétních pracovních režimech.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-nsk"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-kpv-b-hranice",
    "track": "kpv",
    "form": "B",
    "construct": "hranice",
    "stage": "probe",
    "title": "Test bez přípravy",
    "setting": "Nová modelová situace",
    "role": "Student/ka kariérového poradenství pod odborným vedením",
    "goal": "Pracovat v hranicích vlastní přípravy.",
    "scene": "Mentor je dostupný. Kolega vám nabízí interpretaci diagnostického nástroje, se kterým jste dosud nepracovali, a chce, abyste výsledek vysvětlili klientovi sami.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "hranice",
    "options": [
      {
        "label": "Samostatný výklad odložit; s mentorem vyjasnit oprávnění i potřebnou přípravu.",
        "score": 2,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Hotový výstup nenahrazuje schopnost posoudit jeho význam a limity. Odborné vedení umožní bezpečné předání klienta i plán vlastní přípravy."
      },
      {
        "label": "Samostatný výklad odmítnout; odkázat klienta na mentora bez rozboru vlastní přípravy.",
        "score": 1,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Hotový výstup nenahrazuje schopnost posoudit jeho význam a limity. Odborné vedení umožní bezpečné předání klienta i plán vlastní přípravy."
      },
      {
        "label": "Předat kolegův výklad a klientovi přiznat, že s nástrojem teprve začínáte.",
        "score": 0,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Hotový výstup nenahrazuje schopnost posoudit jeho význam a limity. Odborné vedení umožní bezpečné předání klienta i plán vlastní přípravy."
      }
    ],
    "principle": "Hotový výstup nenahrazuje schopnost posoudit jeho význam a limity. Odborné vedení umožní bezpečné předání klienta i plán vlastní přípravy.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-ethics"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-kpv-b-navaznost",
    "track": "kpv",
    "form": "B",
    "construct": "navaznost",
    "stage": "probe",
    "title": "Nabídka čeká na odpověď",
    "setting": "Nová modelová situace",
    "role": "Student/ka kariérového poradenství pod odborným vedením",
    "goal": "Dohodnout uskutečnitelný další krok a jeho ověření.",
    "scene": "Klient si vybral pracovní nabídku, ale na konci setkání říká: „Nevím, jestli jsem už připravený odpovědět.“ Návrh odpovědi má rozepsaný. Nezjišťovali jste, co mu v odeslání brání.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "navaznost",
    "options": [
      {
        "label": "Nabídnout klientovi obecnou příručku k reakcím na pracovní nabídky.",
        "score": 1,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Dohoda má navázat na konkrétní překážku a obsahovat krok i způsob ověření. Příručka sama nevyjasní, co klient nyní potřebuje."
      },
      {
        "label": "Doporučit poslat odpověď ještě dnes; jeho přání změnit práci už jste probrali.",
        "score": 0,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Dohoda má navázat na konkrétní překážku a obsahovat krok i způsob ověření. Příručka sama nevyjasní, co klient nyní potřebuje."
      },
      {
        "label": "Probrat, co mu chybí k odeslání, a dohodnout krok i termín dalšího ověření.",
        "score": 2,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Dohoda má navázat na konkrétní překážku a obsahovat krok i způsob ověření. Příručka sama nevyjasní, co klient nyní potřebuje."
      }
    ],
    "principle": "Dohoda má navázat na konkrétní překážku a obsahovat krok i způsob ověření. Příručka sama nevyjasní, co klient nyní potřebuje.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-nsk"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-kpv-c-zakazka",
    "track": "kpv",
    "form": "C",
    "construct": "zakazka",
    "stage": "probe",
    "title": "Klient chce hotový verdikt",
    "setting": "Nová modelová situace",
    "role": "Student/ka kariérového poradenství pod odborným vedením",
    "goal": "Podpořit klientovo rozhodování.",
    "scene": "Klient chce, abyste za něj vybrali mezi studiem a okamžitým nástupem do práce. Obě možnosti jsou dostupné. Jeho finanční situaci a priority zatím neznáte.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "zakazka",
    "options": [
      {
        "label": "Doporučit studium a společně hledat způsob, jak jeho náklady časově rozložit.",
        "score": 0,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "V zadání nejsou podklady pro výběr za klienta. Smyslem je pomoci mu porovnat jeho uskutečnitelné možnosti."
      },
      {
        "label": "Vyjasnit potřeby i omezení a společně sestavit kritéria volby.",
        "score": 2,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "V zadání nejsou podklady pro výběr za klienta. Smyslem je pomoci mu porovnat jeho uskutečnitelné možnosti."
      },
      {
        "label": "Předat srovnávací tabulku studia a práce; vlastní kritéria nechat na klientovi.",
        "score": 1,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "V zadání nejsou podklady pro výběr za klienta. Smyslem je pomoci mu porovnat jeho uskutečnitelné možnosti."
      }
    ],
    "principle": "V zadání nejsou podklady pro výběr za klienta. Smyslem je pomoci mu porovnat jeho uskutečnitelné možnosti.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-ethics"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-kpv-c-informace",
    "track": "kpv",
    "form": "C",
    "construct": "informace",
    "stage": "probe",
    "title": "AI našla dokonalý program",
    "setting": "Nová modelová situace",
    "role": "Student/ka kariérového poradenství pod odborným vedením",
    "goal": "Prověřit doporučení digitálního nástroje.",
    "scene": "AI navrhla vzdělávací program odpovídající zájmům klienta. Odkaz vede na obecnou stránku školy; konkrétní běh ani podmínky přijetí tam zatím nevidíte.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "informace",
    "options": [
      {
        "label": "Ověřit existenci běhu a aktuální přijímací podmínky u školy.",
        "score": 2,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Shoda dvou generovaných odpovědí není potvrzením nabídky. Ověření musí dojít ke zdroji, který program skutečně poskytuje."
      },
      {
        "label": "Porovnat návrh s odpovědí druhého chatbota a předat oba jako neověřené tipy.",
        "score": 1,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Shoda dvou generovaných odpovědí není potvrzením nabídky. Ověření musí dojít ke zdroji, který program skutečně poskytuje."
      },
      {
        "label": "Doporučit zahájit přihlášku podle návrhu; podmínky lze doplnit během procesu.",
        "score": 0,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Shoda dvou generovaných odpovědí není potvrzením nabídky. Ověření musí dojít ke zdroji, který program skutečně poskytuje."
      }
    ],
    "principle": "Shoda dvou generovaných odpovědí není potvrzením nabídky. Ověření musí dojít ke zdroji, který program skutečně poskytuje.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-nsk"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-kpv-c-hranice",
    "track": "kpv",
    "form": "C",
    "construct": "hranice",
    "stage": "probe",
    "title": "Příběh na poradě",
    "setting": "Nová modelová situace",
    "role": "Student/ka kariérového poradenství pod odborným vedením",
    "goal": "Sdílet jen přiměřené podklady pro konzultaci.",
    "scene": "Na intervizi potřebujete probrat svoji otázku k vedení rozhovoru. Účastníci klienta neznají. Máte rozsáhlý zápis s osobními okolnostmi, které s vaší otázkou nesouvisejí.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "hranice",
    "options": [
      {
        "label": "Zápis nesdílet a odložit celou konzultaci, dokud mentor nebude mít volný čas.",
        "score": 1,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Pro konzultaci stačí nezbytný kontext podle pravidel pracoviště. Samotné odstranění jména nestačí; úplný odklad je bezpečný, ale nevyužívá možnost přiměřené odborné reflexe."
      },
      {
        "label": "Odstranit jméno a přečíst zápis celý, aby ostatním nechyběly okolnosti případu.",
        "score": 0,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Pro konzultaci stačí nezbytný kontext podle pravidel pracoviště. Samotné odstranění jména nestačí; úplný odklad je bezpečný, ale nevyužívá možnost přiměřené odborné reflexe."
      },
      {
        "label": "Vymezit profesní otázku a podle pravidel pracoviště sdílet jen potřebný odosobněný kontext.",
        "score": 2,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Pro konzultaci stačí nezbytný kontext podle pravidel pracoviště. Samotné odstranění jména nestačí; úplný odklad je bezpečný, ale nevyužívá možnost přiměřené odborné reflexe."
      }
    ],
    "principle": "Pro konzultaci stačí nezbytný kontext podle pravidel pracoviště. Samotné odstranění jména nestačí; úplný odklad je bezpečný, ale nevyužívá možnost přiměřené odborné reflexe.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-ethics"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-kpv-c-navaznost",
    "track": "kpv",
    "form": "C",
    "construct": "navaznost",
    "stage": "probe",
    "title": "Úkol se nepovedl",
    "setting": "Nová modelová situace",
    "role": "Student/ka kariérového poradenství pod odborným vedením",
    "goal": "Upravit plán podle zjištěné překážky.",
    "scene": "Klient nesplnil dohodu oslovit zaměstnavatele. Vysvětluje, že ve formuláři nerozuměl dvěma položkám. Na rozhovor přišel a chce pokračovat.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "navaznost",
    "options": [
      {
        "label": "Požádat klienta, aby se ozval, až bude připraven převzít za plán odpovědnost.",
        "score": 0,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Z popisu vyplývá konkrétní překážka, nikoli doložený nedostatek motivace. Úprava plánu má reagovat na tuto informaci."
      },
      {
        "label": "Probrat nejasné položky a dohodnout zvládnutelný krok s termínem ověření.",
        "score": 2,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Z popisu vyplývá konkrétní překážka, nikoli doložený nedostatek motivace. Úprava plánu má reagovat na tuto informaci."
      },
      {
        "label": "Připomenout dohodu a nabídnout více času na stejné zadání.",
        "score": 1,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Z popisu vyplývá konkrétní překážka, nikoli doložený nedostatek motivace. Úprava plánu má reagovat na tuto informaci."
      }
    ],
    "principle": "Z popisu vyplývá konkrétní překážka, nikoli doložený nedostatek motivace. Úprava plánu má reagovat na tuto informaci.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-nsk"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-upv-a-dukaz",
    "track": "upv",
    "form": "A",
    "construct": "dukaz",
    "stage": "probe",
    "title": "Všichni přikyvují",
    "setting": "Nová modelová situace",
    "role": "Student/ka učitelství praktického vyučování",
    "goal": "Získat důkaz porozumění.",
    "scene": "Při krátké výuce vysvětlíte, jak číst jednoduchý pracovní výkres. Na otázku „Je to jasné?“ třída přikyvuje. Za chvíli mají žáci samostatně určit rozměr podle výkresu.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "dukaz",
    "options": [
      {
        "label": "Zadat každému krátký příklad, nechat určit rozměr a ukázat, odkud ve výkresu údaj vzal.",
        "score": 2,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Přikyvování nedokládá práci s výkresem. Krátký úkol ukáže, co zvládnou i ti, kteří se sami nehlásí."
      },
      {
        "label": "Vyzvat dobrovolníka k zopakování postupu a dát ostatním prostor k doplnění.",
        "score": 1,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Přikyvování nedokládá práci s výkresem. Krátký úkol ukáže, co zvládnou i ti, kteří se sami nehlásí."
      },
      {
        "label": "Zahájit samostatnou práci; případné nejasnosti řešit podle zvednutých rukou.",
        "score": 0,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Přikyvování nedokládá práci s výkresem. Krátký úkol ukáže, co zvládnou i ti, kteří se sami nehlásí."
      }
    ],
    "principle": "Přikyvování nedokládá práci s výkresem. Krátký úkol ukáže, co zvládnou i ti, kteří se sami nehlásí.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-kraau"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-upv-a-pristup",
    "track": "upv",
    "form": "A",
    "construct": "pristup",
    "stage": "probe",
    "title": "Stejný cíl, jiný vstup",
    "setting": "Nová modelová situace",
    "role": "Student/ka učitelství praktického vyučování",
    "goal": "Zachovat cíl při úpravě přístupu.",
    "scene": "Cílem je seřadit kroky modelového pracovního postupu. Jeden žák se ztrácí v dlouhém textu, ale ústnímu vysvětlení rozumí. Nejde o hodnocení čtení.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "pristup",
    "options": [
      {
        "label": "Prodloužit mu čas se stejným textem a nabídnout možnost označit nejasná slova.",
        "score": 1,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Změna formy zadání může zpřístupnit stejnou schopnost. Není důvod měnit cíl jen kvůli obtížnému textu."
      },
      {
        "label": "Zadat mu místo řazení kroků překreslení výsledku podle hotového vzoru.",
        "score": 0,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Změna formy zadání může zpřístupnit stejnou schopnost. Není důvod měnit cíl jen kvůli obtížnému textu."
      },
      {
        "label": "Nabídnout obrázkové karty a ověřit stejné pořadí kroků.",
        "score": 2,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Změna formy zadání může zpřístupnit stejnou schopnost. Není důvod měnit cíl jen kvůli obtížnému textu."
      }
    ],
    "principle": "Změna formy zadání může zpřístupnit stejnou schopnost. Není důvod měnit cíl jen kvůli obtížnému textu.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-kraau"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-upv-a-zpetna",
    "track": "upv",
    "form": "A",
    "construct": "zpetna",
    "stage": "probe",
    "title": "Výrobek téměř sedí",
    "setting": "Nová modelová situace",
    "role": "Student/ka učitelství praktického vyučování",
    "goal": "Dát použitelnou zpětnou vazbu.",
    "scene": "Modelový výrobek splňuje dvě ze tří předem dohodnutých kritérií. Jedna hrana není podle zadání zarovnaná. Žák má čas výsledek upravit.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "zpetna",
    "options": [
      {
        "label": "Upravit hranu za žáka, aby si mohl správný tvar porovnat se svým původním.",
        "score": 0,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Žák potřebuje vědět, co konkrétně měnit, a příležitost změnu provést. Oprava učitelem jeho další postup neověří."
      },
      {
        "label": "Pojmenovat splněná kritéria a nechat žáka navrhnout opravu nevyhovující hrany.",
        "score": 2,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Žák potřebuje vědět, co konkrétně měnit, a příležitost změnu provést. Oprava učitelem jeho další postup neověří."
      },
      {
        "label": "Ukázat nesplněné kritérium a nadiktovat opravu bez žákova návrhu.",
        "score": 1,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Žák potřebuje vědět, co konkrétně měnit, a příležitost změnu provést. Oprava učitelem jeho další postup neověří."
      }
    ],
    "principle": "Žák potřebuje vědět, co konkrétně měnit, a příležitost změnu provést. Oprava učitelem jeho další postup neověří.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-kraau"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-upv-a-adaptace",
    "track": "upv",
    "form": "A",
    "construct": "adaptace",
    "stage": "probe",
    "title": "Plán ztrácí půdu",
    "setting": "Nová modelová situace",
    "role": "Student/ka učitelství praktického vyučování",
    "goal": "Upravit výuku podle průběžného ověření.",
    "scene": "Po první části lekce zjistíte, že polovina skupiny zaměňuje dva základní symboly. Druhá část na jejich rozlišení přímo staví. Další skupina čeká až zítra.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "adaptace",
    "options": [
      {
        "label": "Porovnat symboly na novém příkladu a znovu ověřit jejich rozlišení.",
        "score": 2,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Navazující úkol předpokládá rozlišení, které zatím chybí. Krátká cílená úprava má větší smysl než pouhé zpomalení."
      },
      {
        "label": "Pokračovat pomaleji a při každém použití znovu pojmenovat oba symboly.",
        "score": 1,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Navazující úkol předpokládá rozlišení, které zatím chybí. Krátká cílená úprava má větší smysl než pouhé zpomalení."
      },
      {
        "label": "Dokončit druhou část; rozdíl symbolů zadat na příští hodinu k zopakování.",
        "score": 0,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Navazující úkol předpokládá rozlišení, které zatím chybí. Krátká cílená úprava má větší smysl než pouhé zpomalení."
      }
    ],
    "principle": "Navazující úkol předpokládá rozlišení, které zatím chybí. Krátká cílená úprava má větší smysl než pouhé zpomalení.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-kraau"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-upv-b-dukaz",
    "track": "upv",
    "form": "B",
    "construct": "dukaz",
    "stage": "probe",
    "title": "Hezká prezentace",
    "setting": "Nová modelová situace",
    "role": "Student/ka učitelství praktického vyučování",
    "goal": "Odlišit aktivitu od výsledku učení.",
    "scene": "Žáci společně vytvořili pěkný plakát pracovního postupu. Cílem bylo, aby každý vysvětlil, proč na pořadí dvou kroků záleží. Někteří jen kreslili.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "dukaz",
    "options": [
      {
        "label": "Požádat mluvčího o vysvětlení a ostatní členy skupiny vyzvat k doplnění.",
        "score": 1,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Společný výstup neukazuje porozumění každého člena. Nová ukázka ověří právě důvod pořadí."
      },
      {
        "label": "Přijmout správný plakát jako doklad splnění cíle všemi členy skupiny.",
        "score": 0,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Společný výstup neukazuje porozumění každého člena. Nová ukázka ověří právě důvod pořadí."
      },
      {
        "label": "Nechat každého zdůvodnit pořadí na nové ukázce.",
        "score": 2,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Společný výstup neukazuje porozumění každého člena. Nová ukázka ověří právě důvod pořadí."
      }
    ],
    "principle": "Společný výstup neukazuje porozumění každého člena. Nová ukázka ověří právě důvod pořadí.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-kraau"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-upv-b-pristup",
    "track": "upv",
    "form": "B",
    "construct": "pristup",
    "stage": "probe",
    "title": "Odborný jazyk stojí v cestě",
    "setting": "Nová modelová situace",
    "role": "Student/ka učitelství praktického vyučování",
    "goal": "Podpořit porozumění bez snížení cíle.",
    "scene": "Žák správně předvede nenáročný modelový postup, ale tápe ve dvou českých odborných názvech. Cílem je postup popsat a správně použít tyto pojmy.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "pristup",
    "options": [
      {
        "label": "Uznat cíl podle předvedení; odborné pojmy může postupně převzít od spolužáků.",
        "score": 0,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Cíl obsahuje i odborné pojmenování. Opora má propojit význam a činnost a postupně vést k vlastnímu popisu."
      },
      {
        "label": "Propojit pojmy s konkrétní ukázkou, nechat žáka popis nacvičit a samostatný popis znovu ověřit.",
        "score": 2,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Cíl obsahuje i odborné pojmenování. Opora má propojit význam a činnost a postupně vést k vlastnímu popisu."
      },
      {
        "label": "Dát mu stručný slovníček, více času a možnost vrátit se ke konkrétním definicím.",
        "score": 1,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Cíl obsahuje i odborné pojmenování. Opora má propojit význam a činnost a postupně vést k vlastnímu popisu."
      }
    ],
    "principle": "Cíl obsahuje i odborné pojmenování. Opora má propojit význam a činnost a postupně vést k vlastnímu popisu.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-kraau"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-upv-b-zpetna",
    "track": "upv",
    "form": "B",
    "construct": "zpetna",
    "stage": "probe",
    "title": "Značka nestačí",
    "setting": "Nová modelová situace",
    "role": "Student/ka učitelství praktického vyučování",
    "goal": "Navázat zpětnou vazbu na kritérium.",
    "scene": "V krátké přípravě žák nesprávně určil vhodný nástroj pro modelový materiál. Výběr je zatím pouze na papíře, žádná práce nezačala.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "zpetna",
    "options": [
      {
        "label": "Odkázat na vlastnosti materiálu a nechat žáka výběr znovu zdůvodnit.",
        "score": 2,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "V této fázi lze chybu využít k porozumění pravidlu výběru. Pouhý správný název neukáže, zda žák pravidlo použije příště."
      },
      {
        "label": "Připsat správný nástroj i jeho vlastnost a zadat přepsání opravy.",
        "score": 1,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "V této fázi lze chybu využít k porozumění pravidlu výběru. Pouhý správný název neukáže, zda žák pravidlo použije příště."
      },
      {
        "label": "Označit chybu body; pravidlo výběru probrat až při závěrečném opakování.",
        "score": 0,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "V této fázi lze chybu využít k porozumění pravidlu výběru. Pouhý správný název neukáže, zda žák pravidlo použije příště."
      }
    ],
    "principle": "V této fázi lze chybu využít k porozumění pravidlu výběru. Pouhý správný název neukáže, zda žák pravidlo použije příště.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-kraau"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-upv-b-adaptace",
    "track": "upv",
    "form": "B",
    "construct": "adaptace",
    "stage": "probe",
    "title": "Rychlejší a pomalejší",
    "setting": "Nová modelová situace",
    "role": "Student/ka učitelství praktického vyučování",
    "goal": "Organizovat rozdílné tempo smysluplně.",
    "scene": "Část skupiny už zvládla základní bezpečný modelový úkol, část potřebuje další procvičení. Všichni pracují s papírovými podklady; společný cíl je stejný.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "adaptace",
    "options": [
      {
        "label": "Hotovým nechat opakovat stejný základ a věnovat podporu pomalejší skupině.",
        "score": 1,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Hotoví mohou použít schopnost v nové situaci, zatímco ostatní cíleně procvičují základ. Opakování už zvládnutého úkolu skupinu zaměstná, ale méně rozvíjí."
      },
      {
        "label": "Zadat všem další obtížnější úlohu s tím, že si pomalejší doplní základ doma.",
        "score": 0,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Hotoví mohou použít schopnost v nové situaci, zatímco ostatní cíleně procvičují základ. Opakování už zvládnutého úkolu skupinu zaměstná, ale méně rozvíjí."
      },
      {
        "label": "Hotovým zadat přenosový úkol, ostatním nabídnout cílené procvičení.",
        "score": 2,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Hotoví mohou použít schopnost v nové situaci, zatímco ostatní cíleně procvičují základ. Opakování už zvládnutého úkolu skupinu zaměstná, ale méně rozvíjí."
      }
    ],
    "principle": "Hotoví mohou použít schopnost v nové situaci, zatímco ostatní cíleně procvičují základ. Opakování už zvládnutého úkolu skupinu zaměstná, ale méně rozvíjí.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-kraau"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-upv-c-dukaz",
    "track": "upv",
    "form": "C",
    "construct": "dukaz",
    "stage": "probe",
    "title": "Učení podle ticha",
    "setting": "Nová modelová situace",
    "role": "Student/ka učitelství praktického vyučování",
    "goal": "Zaznamenat pozorovatelné důkazy.",
    "scene": "Při náslechu je ve třídě ticho a žáci něco zapisují. V deníku chcete vyhodnotit, zda splnili cíl „zdůvodnit volbu materiálu“. Jejich odpovědi jste ještě neviděli.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "dukaz",
    "options": [
      {
        "label": "Zapsat, že klidná samostatná práce ukazuje na pravděpodobné splnění cíle.",
        "score": 0,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Ticho je pozorování, porozumění je závěr vyžadující další podklad. Ponechat závěr otevřený je poctivé; vyžádání výstupů navíc posune ověření cíle."
      },
      {
        "label": "Oddělit pozorování od závěru a domluvit se s učitelem na ověření zdůvodnění ve výstupech žáků.",
        "score": 2,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Ticho je pozorování, porozumění je závěr vyžadující další podklad. Ponechat závěr otevřený je poctivé; vyžádání výstupů navíc posune ověření cíle."
      },
      {
        "label": "Zapsat pouze ticho a pracovní tempo; hodnocení cíle zatím ponechat otevřené.",
        "score": 1,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Ticho je pozorování, porozumění je závěr vyžadující další podklad. Ponechat závěr otevřený je poctivé; vyžádání výstupů navíc posune ověření cíle."
      }
    ],
    "principle": "Ticho je pozorování, porozumění je závěr vyžadující další podklad. Ponechat závěr otevřený je poctivé; vyžádání výstupů navíc posune ověření cíle.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-kraau"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-upv-c-pristup",
    "track": "upv",
    "form": "C",
    "construct": "pristup",
    "stage": "probe",
    "title": "Kdo je na řadě",
    "setting": "Nová modelová situace",
    "role": "Student/ka učitelství praktického vyučování",
    "goal": "Zpřístupnit účast bez veřejného nálepkování.",
    "scene": "Ve dvojici vždy odpovídá zkušenější žák. Druhý po soukromém dotazu prokáže část porozumění, ale do společné práce se téměř nezapojuje.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "pristup",
    "options": [
      {
        "label": "Rozdělit role a dát oběma vlastní výstup s časem na přípravu.",
        "score": 2,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Struktura spolupráce může otevřít prostor pro vlastní výkon obou. Vedlejší práce by žáka od cíle vzdálila."
      },
      {
        "label": "Požádat zkušenějšího, aby postup vysvětloval, a sledovat práci dvojice.",
        "score": 1,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Struktura spolupráce může otevřít prostor pro vlastní výkon obou. Vedlejší práce by žáka od cíle vzdálila."
      },
      {
        "label": "Nechat druhého žáka připravovat podklady; odborné odpovědi svěříte zkušenějšímu.",
        "score": 0,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Struktura spolupráce může otevřít prostor pro vlastní výkon obou. Vedlejší práce by žáka od cíle vzdálila."
      }
    ],
    "principle": "Struktura spolupráce může otevřít prostor pro vlastní výkon obou. Vedlejší práce by žáka od cíle vzdálila.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-kraau"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-upv-c-zpetna",
    "track": "upv",
    "form": "C",
    "construct": "zpetna",
    "stage": "probe",
    "title": "Správné kroky, jiné pořadí",
    "setting": "Nová modelová situace",
    "role": "Student/ka učitelství praktického vyučování",
    "goal": "Propojit zpětnou vazbu s kritériem a vlastní opravou žáka.",
    "scene": "Žák na papíře sestavil všechny kroky modelového postupu, ale dva prohodil. Kritériem je pořadí i zdůvodnění návaznosti. Na opravu ještě máte čas; žádná praktická činnost neprobíhá.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "zpetna",
    "options": [
      {
        "label": "Ukázat chybný krok a sdělit správné pořadí k samostatnému přepsání.",
        "score": 1,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Konkrétní odkaz na kritérium a vlastní zdůvodněná oprava rozvíjejí porozumění. Přepsání hotové odpovědi samo neukáže, zda žák návaznost chápe."
      },
      {
        "label": "Označit pořadí jako nesprávné a zadat další pokus bez bližšího rozboru.",
        "score": 0,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Konkrétní odkaz na kritérium a vlastní zdůvodněná oprava rozvíjejí porozumění. Přepsání hotové odpovědi samo neukáže, zda žák návaznost chápe."
      },
      {
        "label": "Popsat nesoulad s kritériem a nechat žáka odůvodnit i provést změnu.",
        "score": 2,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Konkrétní odkaz na kritérium a vlastní zdůvodněná oprava rozvíjejí porozumění. Přepsání hotové odpovědi samo neukáže, zda žák návaznost chápe."
      }
    ],
    "principle": "Konkrétní odkaz na kritérium a vlastní zdůvodněná oprava rozvíjejí porozumění. Přepsání hotové odpovědi samo neukáže, zda žák návaznost chápe.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-kraau"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  },
  {
    "id": "probe-upv-c-adaptace",
    "track": "upv",
    "form": "C",
    "construct": "adaptace",
    "stage": "probe",
    "title": "Dva materiály se pletou",
    "setting": "Nová modelová situace",
    "role": "Student/ka učitelství praktického vyučování",
    "goal": "Upravit další výuku podle zjištěné obtíže.",
    "scene": "Krátké třídění papírových ukázek ukázalo, že většina žáků zaměňuje dvě vlastnosti materiálů. Plánovaný další úkol vyžaduje jejich rozlišení. Na cílenou změnu výuky zbývá dost času.",
    "prompt": "Který další krok je v popsané situaci nejlépe odůvodněný?",
    "skill": "adaptace",
    "options": [
      {
        "label": "Dát skupině plánovaný přenosový úkol a rozlišení ponechat na domácí přípravu.",
        "score": 0,
        "id": "a",
        "detail": "",
        "consequence": "",
        "explanation": "Další úkol předpokládá rozlišení, které zatím není spolehlivé. Cílené procvičení a nové ověření řeší konkrétní obtíž; samotné zpomalení celé lekce neposkytne nový důkaz."
      },
      {
        "label": "Vrátit se k obtížnému rozdílu, cíleně ho procvičit a pak znovu ověřit.",
        "score": 2,
        "id": "b",
        "detail": "",
        "consequence": "",
        "explanation": "Další úkol předpokládá rozlišení, které zatím není spolehlivé. Cílené procvičení a nové ověření řeší konkrétní obtíž; samotné zpomalení celé lekce neposkytne nový důkaz."
      },
      {
        "label": "Zopakovat celé vysvětlení pomaleji a poté pokračovat podle původního plánu.",
        "score": 1,
        "id": "c",
        "detail": "",
        "consequence": "",
        "explanation": "Další úkol předpokládá rozlišení, které zatím není spolehlivé. Cílené procvičení a nové ověření řeší konkrétní obtíž; samotné zpomalení celé lekce neposkytne nový důkaz."
      }
    ],
    "principle": "Další úkol předpokládá rozlišení, které zatím není spolehlivé. Cílené procvičení a nové ověření řeší konkrétní obtíž; samotné zpomalení celé lekce neposkytne nový důkaz.",
    "transfer": "Porovnejte své zdůvodnění s tím, jak byste postup vysvětlili mentorovi.",
    "sourceIds": [
      "probe-kraau"
    ],
    "sourceNote": "Autorská sonda opřená o profesní rámec. Obtížnost a srovnatelnost forem zatím nebyly ověřeny."
  }
];
