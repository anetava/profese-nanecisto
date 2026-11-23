"""Rebuild the burgundy practice pack from the previous git revision. Run with the bundled Python."""
from pathlib import Path
from io import BytesIO
import subprocess
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
ROOT=Path(__file__).resolve().parents[1]
BASE='79425445a6cd8ad65503adf706cbc402d63b1eec'
DIR=ROOT/'atelier-praxe-upv/materialy'
BURG='762B46'; PALE='F3E8ED'; INK='30252A'
def shade(p,color):
 pr=p._p.get_or_add_pPr(); e=pr.find(qn('w:shd'))
 if e is None: e=OxmlElement('w:shd');pr.append(e)
 e.set(qn('w:fill'),color)
def settext(p,t):
 p.clear();p.add_run(t)
def paras(d):
 yield from d.paragraphs
 for t in d.tables:
  for r in t.rows:
   for c in r.cells: yield from c.paragraphs

def style(d,label):
 for name in ['Normal','Title','Subtitle','Heading 1','Heading 2','Heading 3']:
  s=d.styles[name];s.font.name='Liberation Sans';s.font.color.rgb=RGBColor.from_string(INK)
 d.styles['Normal'].font.size=Pt(10.5)
 d.styles['Normal'].paragraph_format.space_after=Pt(4)
 d.styles['Normal'].paragraph_format.line_spacing=1.05
 d.styles['Title'].font.color.rgb=RGBColor(0,0,0)
 d.styles['Title'].font.size=Pt(24)
 d.styles['Title'].font.bold=True
 for st in d.styles:
  for elem in list(st.element.iter(qn('w:pBdr'))):elem.getparent().remove(elem)
 for root in [d._element]+[s.header._element for s in d.sections]+[s.footer._element for s in d.sections]:
  for elem in root.iter(qn('w:drawing')):elem.getparent().remove(elem)
  for elem in root.iter(qn('w:shd')):elem.set(qn('w:fill'),PALE)
  for elem in root.iter(qn('w:rFonts')):
   for attr in list(elem.attrib):del elem.attrib[attr]
   elem.set(qn('w:ascii'),'Liberation Sans');elem.set(qn('w:hAnsi'),'Liberation Sans')
 for p in paras(d):
  for r in p.runs:
   if r.font.color.rgb: r.font.color.rgb=RGBColor.from_string(INK)
  if p.style.name.startswith('Heading'):
   shade(p,PALE)
   for r in p.runs:r.font.color.rgb=RGBColor.from_string(BURG)
  if p.text.startswith(('K čemu','Kdy jej','Jak postupovat','01  ','02  ','03  ','04  ','Co udělám dál')):
   if p.runs:
    if len(p.runs)==1 and '  ' in p.text:
     lead,body=p.text.split('  ',1);p.clear();p.add_run(lead+'  ').bold=True;p.add_run(body)
    p.runs[0].bold=True;p.runs[0].font.color.rgb=RGBColor.from_string(BURG)
  if p.text.strip() and ('Vyberte jednu možnost.' in p.text or 'Označte vše, co platí.' in p.text):
   if p.runs:p.runs[0].font.color.rgb=RGBColor.from_string(BURG)
 for t in d.tables:
  for ri,row in enumerate(t.rows):
   for cell in row.cells:
    tcpr=cell._tc.get_or_add_tcPr();sh=tcpr.find(qn('w:shd'))
    if sh is None:sh=OxmlElement('w:shd');tcpr.append(sh)
    sh.set(qn('w:fill'),BURG if ri==0 else ('FAF5F7' if ri%2 else 'FFFFFF'))
    for p in cell.paragraphs:
     for r in p.runs:r.font.color.rgb=RGBColor.from_string('FFFFFF' if ri==0 else INK)
   if ri==0:
    e=OxmlElement('w:tblHeader');row._tr.get_or_add_trPr().append(e)
 for sec in d.sections:
  for p in sec.header.paragraphs:
   for r in p.runs:r.font.color.rgb=RGBColor.from_string(BURG)
  for p in sec.footer.paragraphs:
   for r in p.runs:r.font.color.rgb=RGBColor.from_string(BURG)
 d.core_properties.author='Ateliér praxí IVP';d.core_properties.last_modified_by='Ateliér praxí IVP'
 d.core_properties.subject='Průvodce a pracovní podklady pro pedagogické praxe UPV 2026/2027'

for path in DIR.rglob('*.docx'):
 rel=str(path.relative_to(ROOT))
 src=subprocess.run(['git','show',BASE+':'+rel],cwd=ROOT,capture_output=True)
 if src.returncode:continue
 d=Document(BytesIO(src.stdout));key=path.stem
 for p in list(paras(d)):
  t=p.text
  if key=='03-rizeny-naslech':
   if t=='Nejdříve potvrďte rozsah':settext(p,'Stanovený rozsah praxe')
   elif t.startswith('Podklady se v počtech liší.'):settext(p,'Absolvujte 10 náslechů teoretické výuky a 2 náslechy praktického vyučování. Pro tento Ateliér platí rozsah podle metodiky 03. Připravte si 12 samostatných záznamů; rozsah si student nevolí.')
   elif t.startswith(('Rozsah potvrzený garantem','  4 teoretické','Potvrdil/a a datum','Dohodnutý rozsah při jiné')):p._element.getparent().remove(p._element);continue
   elif 'Počet archů odvoďte' in t:settext(p,t.replace('Počet archů odvoďte od potvrzeného rozsahu.','Celkem vyplňte 12 archů: 10 teoretických a 2 praktické.'))
   elif t.startswith('Zkontrolujte počty vůči'):settext(p,t.replace('Zkontrolujte počty vůči potvrzenému plánu.','Zkontrolujte 10 teoretických a 2 praktické záznamy.'))
  if key=='guided' and t.startswith('Dva týdny na předem'):settext(p,'Rozsah: 10 teoretických + 2 praktické náslechy během dvou týdnů na předem schválené škole. Pro každou jednotku vyplňte vlastní arch; student rozsah nepřepíná.')
  if key in ['group','guided']:
   if t.startswith('Kdy jej vyplnit'):settext(p,'Kdy jej vyplnit  Před hodinou doplňte údaje a zaměření. Během celé jednotky zapisujte průběh. Po ní doplňte rozbor.')
   elif t.startswith('Jak postupovat'):settext(p,'Jak postupovat  Volby jsou pomůcka. Ke každému závěru doplňte konkrétní situaci, reakci žáků a vlastní vysvětlení.')
   elif 'Volitelně: metoda' in t:settext(p,'Moje vysvětlení souvislosti\nVysvětlete: metoda pomohla tím, že… Dokládá to… Jiným vysvětlením může být…')
   elif 'Volitelně doplňte jeho pohled' in t:settext(p,'Domluva s cvičným učitelem nebo vyučujícím IVP\nPo rozboru doplňte pohled učitele a co jste si ověřili. Pokud rozbor neproběhl, uveďte to.')
   elif t.startswith('Zapište skutečný čas'):settext(p,'Zachyťte začátek, hlavní činnosti i závěr celé jednotky. Např. 10. min: učitel předvedl krok; dva žáci jej zopakovali bez pomoci.')
  if key=='02-skupinovy-naslech' and 'Jednotky nemusí odpovídat' in t:settext(p,t.replace('Jednotky nemusí odpovídat jeho odbornému zaměření.','Oborové zaměření jednotek ověřte s garantem; původní metodika a aktuální sylabus se v této podmínce liší.'))
  if key in ['micro','04-microteaching']:
   if t.startswith('Kdy jej vyplnit'):settext(p,'Kdy jej vyplnit  Přípravu před výstupem, rozbor po něm. Videomonitoring a práci se záznamem domluvte s vyučujícím podle sylabu.')
   if t.startswith('Při mikrovýstupu'):settext(p,'Při mikrovýstupu a videomonitoringu')
   if t.startswith('Pracujte s jasnou strukturou'):settext(p,t+' Sylabus zahrnuje videomonitoring; pořízení a použití záznamu předem domluvte s vyučujícím. Při rozboru označte konkrétní čas sledované situace.')
  if key=='continuous':
   if t.startswith('Rozvrh výstupů') or 'Rozvrh výstupů předáváte' in t:settext(p,t.replace('Rozvrh výstupů předáváte koordinátorovi a pedagogovi IVP.','Rozvrh výstupů předejte koordinátorovi a pedagogovi IVP do 3 dnů od zahájení praxe.'))
   if t.startswith('Kdy jej vyplnit'):settext(p,'Kdy jej vyplnit  Běžnou přípravu konzultujte předem; závěrečný výstup připravte samostatně. Rozbor doplňte po odučení.')
  if key=='06-reflexe':
   if t.startswith('Komplexní hodnocení praxe'):settext(p,'Dodaná metodika 06 uvádí souvislé zhodnocení nejméně 3 stran do Moodle. Aktuální sylabus odkazuje závazný formát, rozsah a kritéria na Moodle předmětu. Zkontrolujte je před psaním. Prázdná šablona ani samotné zaškrtnutí voleb požadavek nesplňují.')
   if 'materiál nejméně 3 stran a orientace' in t:settext(p,t.replace('materiál nejméně 3 stran a orientace','materiál podle aktuálního zadání v Moodle a orientace'))
  if key=='arch-naslechu' and t.startswith('Jak postupovat'):settext(p,'Jak postupovat  Jeden arch = jedna jednotka. Pro blok 02 i 03 připravte 10 teoretických a 2 praktické záznamy. Zaškrtnutí vždy doplňte příkladem.')
  if key=='ivp' and t.startswith('Kdy jej vyplnit'):settext(p,'Kdy jej vyplnit  Mapu při exkurzi, záznam při sledování zadané AV výuky. Mapu i rozbor pozorování připravte do diskuse na IVP.')
  if key=='adaptio' and t.startswith('Jak postupovat'):settext(p,'Jak postupovat  Vyberte situaci a napište vlastní otázku. Po rozhovoru doplňte kdo, co a do kdy udělá. Nejde o další povinný blok praxe.')
 style(d,key);d.save(path)

# Editable companion to the existing guide 05, with explicit page structure.
d=Document();sec=d.sections[0];sec.top_margin=sec.bottom_margin=Cm(1.7);sec.left_margin=sec.right_margin=Cm(2)
d.styles['Normal'].font.size=Pt(11);d.styles['Normal'].paragraph_format.space_after=Pt(7)
def p(t):d.add_paragraph(t)
def h(t):d.add_heading(t,2)
def page(t):d.add_page_break();d.add_heading(t,1)
p('ATELIÉR PRAXÍ  •  2026/2027');d.add_paragraph('Souvislá řízená pedagogická praxe','Title');p('Průvodce přípravou výuky a portfoliem podle metodiky 05')
p('Převezmete přípravu a vedení skutečné výuky. Každý výstup propojte s cílem žáků, doloženým výsledkem a doporučením cvičného učitele. Tak poznáte, co ve své výuce zlepšit.')
h('Rozsah a schválení')
t=d.add_table(rows=1, cols=3);t.style='Table Grid'
for c,x in zip(t.rows[0].cells,['Povinnost','Plná praxe','Schválená zkrácená']):c.text=x
for vals in [('Délka','4 týdny','2 týdny'),('Běžné výstupy','14','8'),('Závěrečný výstup','1 navíc','1 navíc')]:
 for c,x in zip(t.add_row().cells,vals):c.text=x
p('Dvouleté pedagogické působení na odborné škole samo praxi nezkracuje. Podejte doloženou žádost; zkrácení schvaluje ředitel IVP. Termín žádosti ověřte v aktuálním harmonogramu.')
p('Jednotku v délce 6 a více vyučovacích hodin lze podle metodiky započítat jako dva výstupy. Uveďte skutečnou délku a započtení ověřte s pedagogem IVP; počet záznamů v aplikaci tuto váhu neověřuje.')
h('Kde a v čem budete vyučovat')
p('Praxe probíhá převážně na cvičných odborných školách. Obor a výstupy zvolte podle svého předchozího vzdělání a specializace po dohodě s IVP. Pověřený pedagog IVP řídí praxi přidělených studentů.')
d.add_heading('Před nástupem a při každém výstupu',1)
h('01 Domluvte nástup a plán')
p('Přijďte optimálně první den před výukou. Jiný nástup předem oznamte pedagogovi IVP. S koordinátorem a cvičným učitelem sestavte rozvrh včetně závěrečného výstupu. Do 3 dnů od zahájení jej předejte koordinátorovi školy a pověřenému pedagogovi IVP.')
h('02 Poznejte školu a žáky')
p('Prostudujte ŠVP, tematické plány a učebnice. Seznamte se s vybavením, BOZP, hygienou, prací třídního učitele a předmětových komisí. Podle možností poznejte další pracoviště a aktivity školy; účast na poradách domluvte s koordinátorem. Náslechy cvičného učitele absolvujte podle jeho doporučení.')
h('03 Připravte a veďte běžnou jednotku')
p('S cvičným učitelem předem proberte cíl, činnosti žáků, metody, motivaci, komunikaci, organizaci, bezpečnost a pomůcky. Výstupy rozložte podle možností školy rovnoměrně. Použijte list Příprava vlastní výuky.')
p('Příklad cíle: Žák samostatně změří vzorek, zapíše výsledek a vysvětlí postup. Předem si určete, jak tento výkon ověříte u jednotlivých žáků.')
h('04 Rozeberte výsledek a upravte další hodinu')
p('Po každé jednotce proveďte rozbor s cvičným učitelem. Do přípravy doplňte vlastní sebereflexi i jeho doporučení. Napište konkrétně co žáci udělali, co to dokládá a co příště změníte. Doporučení za učitele nevymýšlejte.')
page('Portfolio a závěrečný výstup')
h('Co musí být dohledatelné v portfoliu')
p('Informace o škole; individuální plán se skutečně absolvovanými výstupy; všechny přípravy; u každé jednotky rozbor, vlastní sebereflexe a doporučení cvičného učitele. Přílohy očíslujte a propojte s příslušnou jednotkou. Žáky v ukázkách označujte anonymně.')
h('Závěrečný výstup připravujete samostatně')
p('Závěrečný výstup je navíc k 14 nebo 8 běžným výstupům. Přípravu zpracujte bez pomoci cvičného učitele. Jde o kombinovanou jednotku se všemi fázemi výuky včetně zkoušení 1 až 2 žáků na začátku hodiny.')
p('Termín musí potvrdit pedagog IVP jako předseda komise. Změny konzultujte s ním a cvičným učitelem. Dalšími členy komise jsou koordinátor nebo ředitel školy a cvičný učitel. Podle metodiky jde o komisionální zkoušku zahrnutou do hodnocení součásti státní bakalářské zkoušky.')
h('Před předložením zkontrolujte')
for x in ['Mám požadovaný rozsah a případné schválení zkrácení.','Každý výstup má přípravu, sebereflexi a doporučení učitele.','Mám potvrzený termín samostatného závěrečného výstupu.','V den závěrečného výstupu mám portfolio k předložení.','Portfolio předložím pedagogovi IVP v tisku a vložím do Moodle.']:p('☐ '+x)
p('Zápočet a závěrečná zkouška jsou odlišné povinnosti. Uložení v Ateliéru není odevzdání do Moodle ani potvrzení jejich splnění. Zkontrolujte skutečné vložení souboru do správného úkolu.')
d.add_heading('Kdo vám pomůže a podle čeho postupovat',1)
for title,txt in [('Ředitel cvičné školy','Řídí organizaci praxe ve škole a přiděluje cvičné učitele podle odbornosti.'),('Koordinátor školy','Koordinuje plán a podmínky praxe; spolupracuje s garantem a pedagogem IVP.'),('Cvičný učitel','Vymezuje učivo, konzultuje běžné přípravy a rozebírá každou jednotku. Pomoc postupně omezuje.'),('Pedagog IVP','Kontroluje a hodnotí práci studenta, spolupracuje se školou a vede závěrečnou komisi. Při zápočtu přihlíží k hodnocení školy.'),('Student','Plní plán, připravuje a vede výuku, vyhodnocuje zpětnou vazbu, vede portfolio a dodržuje pokyny školy.')]:h(title);p(txt)
h('Zdroj a navazující dokumenty');p('Studijní průvodce Ateliéru podle metodiky IVP 05 aktualizované 7. 10. 2024. Originál: https://www.ivp.czu.cz/dl/135149?lang=cs');p('Použijte pracovní list Příprava vlastní výuky a Podklad pro cvičného učitele k rozboru. Aktuální termíny a místo odevzdání zjistěte v zadání předmětu.')
style(d,'05');d.save(DIR/'metodiky/05-souvisla-praxe.docx')

# A short orientation sheet shared by all six practice blocks.
d=Document();sec=d.sections[0];sec.top_margin=sec.bottom_margin=Cm(1.5);sec.left_margin=sec.right_margin=Cm(1.8)
d.add_paragraph('Jak pracovat s dokumenty k praxi','Title')
p('Začněte svým blokem praxe. Průvodce vysvětluje požadavky, pracovní arch slouží k vlastnímu zápisu a vyplněný vzor ukazuje způsob uvažování. Nemusíte vyplňovat všechny soubory z katalogu.')
for title,txt in [('01 Před praxí zjistěte proč a co sledujete','Přečtěte průvodce svého bloku. Do archu zapište školu, datum, téma a cíl žáka. Vyberte jednu otázku pro podrobnější rozbor, ale zachyťte průběh celé jednotky.'),('02 Během výuky zapisujte skutečné dění','Pište čas, jednání učitele a reakci žáků. Například: V 10. minutě učitel předvedl měření; dva žáci poté správně přiložili měřidlo. To je pozorování. Věta Výuka byla dobrá neříká, co se stalo.'),('03 Po hodině vysvětlete svůj závěr','Napište: Myslím si…, protože jsem viděl/a… Ještě potřebuji ověřit… Oddělte domněnku od skutečnosti. Pokud něco nebylo vidět, přiznejte to; nevymýšlejte výsledek.'),('04 Při rozboru doplňte pohled učitele','Položte konkrétní otázku: Podle čeho jste poznal/a, že žáci mohou pokračovat sami? Zapište odpověď a zda se vaše vysvětlení změnilo. Hodnocení za učitele nevyplňujte.'),('05 Naplánujte jeden další krok','Uveďte, co zkusíte, kdy a jak poznáte účinek. Například: Po další ukázce nechám každého žáka vysvětlit první krok a podle odpovědí upravím podporu.'),('06 Zkontrolujte a odevzdejte','Doplňte všechny povinné části, anonymizujte žáky a pojmenujte soubor podle zadání. Uložení v Ateliéru není odevzdání do Moodle. Ověřte, že jste soubor vložili do správného úkolu.')]:h(title);p(txt)
h('Náslechy mají rozsah 10 plus 2');p('Pro skupinový i řízený náslech připravte 10 záznamů teoretické výuky a 2 praktického vyučování. Jeden arch odpovídá jedné jednotce. Vzor a manuál se neodevzdávají místo vašich záznamů. Přehled počtů nenahrazuje posouzení kvality.')
p('Bordó nadpisy vedou mezi kroky. Světlé plochy obsahují volby; prázdná pole jsou pro vlastní zkušenost. Zaškrtnutí nenahrazuje konkrétní příklad. Ve Wordu můžete prostor rozšířit, v tisku připojit označenou přílohu.')
style(d,'zacnete');d.save(DIR/'zacnete-zde.docx')
