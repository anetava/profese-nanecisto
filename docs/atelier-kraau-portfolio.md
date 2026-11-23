# KRAAU a portfolio praxí — pravidla přiřazování

Zdroj: uživatelkou přiložený Kompetenční rámec absolventa a absolventky učitelství, MŠMT, verze platná od října 2023. SHA-256 PDF: `569ee286c6765d4db72f660aa16b4bbe70c827112697f0f6b1e07a6370b1ca55`. Všech 18 názvů bylo porovnáno s textem přílohy. Akademický rok nástroje 2026/2027 nemění datum rámce.

Rámec obsahuje šest oblastí a 18 kompetencí (s. 17). Úroveň 1 je absolvent, úroveň 2 začínající učitel a úroveň 3 zkušený učitel (s. 13–14). Stavy dokladů nejsou tyto úrovně. Student buduje portfolio konkrétních situací; k uznání kompetence nestačí počet archů.

## Cesta dokladu

1. Otázka má předem určenou tematickou vazbu. Jméno, datum ani samotná volba nejsou důkaz.
2. Vyplněná konkrétní odpověď vytvoří vysvětlitelnou vazbu na KRAAU. Nástroj neprovádí jazykové posouzení pravdivosti či kvality textu.
3. Student vidí náhled přírůstku během psaní. Uložené portfolio se změní až úspěšným uložením.
4. Jedna zkušenost může mít více vazeb. Počet podkladů počítá dokumenty, nikoli vazby. Pokrytí x/18 neznamená zvládnutí x kompetencí.
5. Příprava, pozorování jiného učitele, vlastní výkon a reflexe mají odlišné stavy. Modelová situace zůstává modelem.
6. Pedagog posuzuje konkrétní doložený projev; potřebuje vlastní poznámku. Pozorování cizí výuky nelze potvrdit jako vlastní výukový výkon.
7. Po změně podkladu se předchozí posouzení nesmí přenést na nový text. Kontrolní otisk není elektronický podpis.

## Hlavní praxe

| Praxe | Činnosti a hlavní vazby |
|---|---|
| Průběžná praxe IVP | Orientace v oboru/ŠVP 1.1; pozorovaná návaznost teorie/praxe 1.2; vlastní výklad 2.5; otázka pro vlastní rozvoj 6.1 |
| Skupinový a řízený náslech | Cíl 2.1; metody 1.2; ověření porozumění 2.4; zpětná vazba 4.2; motivace 2.3; přizpůsobení podpory 2.2; prostředky/prostor 3.3; rozbor 2.5 a 5.1; další krok 6.1 |
| Microteaching | Cíl 2.1; předchozí zkušenosti 2.2; prostředky 3.3; instrukce 1.2; otázka pro ověření 2.4; rozbor 2.5; další pokus 6.1. Příprava sama nezískává stav vlastního výkonu. |
| Souvislá praxe | Cíl 2.1; příprava prostředí 3.3; spolupráce 5.1; vlastní reakce na průběh výuky s dokladem 2.4; reflexe 2.5; další pokus 6.1 |
| Závěrečná reflexe | Srovnání dvou podkladů 2.5; rozvojový plán navázaný na srovnání 6.1; společný rozbor 5.1 |

Přesná pravidla a požadované kombinace polí jsou v `sheet-competencies.js`. Náslechové volby hodnocení/motivace/podpory/prostředí vyžadují vlastní příklad. „Nepozorováno“ nepřidává příslušnou vazbu. Obecný popis prostředí není automaticky důkazem psychologického bezpečí 3.1. Reflexe studenta 2.5 není reflexe žáků 4.3.

Další konkrétní činnosti lze zaznamenat ve všech 18 kompetencích. Student vybírá činnost, její druh, popis situace a místo dokladu. Systém doplní příslušný kód. Oblasti 5.2, 6.2 a 6.3 se nepřidělují automaticky za absolvování praxe či BOZP. Nepřítomnost příležitosti není hodnocena jako neúspěch. Příklady činností jsou pomůckou Ateliéru; nejde o nové oficiální indikátory MŠMT.

## Ukládání a posouzení

Současný prototyp ukládá data v daném prohlížeči. Přepínač role není přihlášení a neposkytuje ověření identity pedagoga. Připravit k rozboru zpřístupní uložený podklad v pracovních rolích na stejném prohlížeči; nic neodesílá na jiný počítač ani do Moodle. Před skutečným institucionálním provozem je třeba přihlášení a sdílené úložiště. Tato změna je nezavádí.

Stažené celé i stručné portfolio používají stejná pravidla výpočtu jako obrazovka. Zůstávají uložené zdrojové odpovědi a stav dokladu. Existující archy se nepřepisují a neznámé starší zařazení do bloku se neodhaduje.

## Ověření

- `node scripts/test-kraau-portfolio.cjs`
- `node scripts/test-sheet-competencies.cjs`
- `node scripts/test-competency-evidence.cjs`

Testy pokrývají prázdné a pouze zaškrtnuté záznamy, všechny kódy, oddělení pozorování/výkonu, modelové situace, kombinace požadovaných polí, unikátní počítání dokumentů, rozpracovaný náhled, změněný podklad a escapování HTML.
