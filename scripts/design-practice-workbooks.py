"""Build readable A4 practice workbooks from the stable interactive-form schema."""
import json, math, re, subprocess, tempfile
from pathlib import Path
from docx import Document
from docx.shared import Pt, Mm, RGBColor, Inches
from docx.enum.text import WD_BREAK
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
data=json.loads(subprocess.check_output(['node','-e',"global.window={};require('./atelier-praxe-upv/interactive-sheets-data.js');process.stdout.write(JSON.stringify(window.SHEET_DATA))"],cwd=ROOT,text=True))
INK='172722'; ACC='78364E'; COLORS=['BCEBE1','D9EAED','F2E7C7','F3DFE1']
water=Path(tempfile.gettempdir())/'ivp-workbook-watermark.png'
im=Image.new('RGBA',(1500,700),(255,255,255,0));ImageDraw.Draw(im).text((200,20),'IVP',font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',480),fill=(238,243,240,255));im.save(water)
def shade(p,color):
 pr=p._p.get_or_add_pPr();x=OxmlElement('w:shd');x.set(qn('w:fill'),color);pr.append(x)
def borders(p,color='A8BDB6'):
 pr=p._p.get_or_add_pPr();x=OxmlElement('w:pBdr');b=OxmlElement('w:bottom');b.set(qn('w:val'),'single');b.set(qn('w:sz'),'5');b.set(qn('w:color'),color);b.set(qn('w:space'),'4');x.append(b);between=OxmlElement('w:between');between.set(qn('w:val'),'single');between.set(qn('w:sz'),'5');between.set(qn('w:color'),color);x.append(between);pr.append(x)
def text(p,s,size=12,bold=False,color=INK):
 r=p.add_run(s);r.bold=bold;r.font.size=Pt(size);r.font.color.rgb=RGBColor.from_string(color);return r
def paragraph(d,s='',size=12,bold=False,color=INK,after=8):
 p=d.add_paragraph();p.paragraph_format.space_after=Pt(after);text(p,s,size,bold,color);return p
def lines(s,width=88):return sum(max(1,math.ceil(len(x)/width)) for x in s.split('\n'))
def height(x):
 typ=x['type']
 if typ=='input':return 47
 if typ=='textarea':return 92+max(0,lines(x['label'])-2)*15
 if typ=='choice':return 35+sum(max(1,lines(o,80))*19 for o in x['options'])+8
 if typ=='table':
  cols=len(x['rows'][0]);return 15+sum(max(32,max(lines(c,max(14,int(88/cols)))*13+12 for c in row)) for row in x['rows'])
 return lines(x['text'])*15+12

def make(key,src):
 d=Document();sec=d.sections[0];sec.page_width=Mm(210);sec.page_height=Mm(297);sec.top_margin=Mm(22);sec.bottom_margin=Mm(18);sec.left_margin=sec.right_margin=Mm(18);sec.header_distance=Mm(8);sec.footer_distance=Mm(8)
 for st in ['Normal','Title','Heading 1','Heading 2']:
  d.styles[st].font.name='Calibri';d.styles[st].font.color.rgb=RGBColor.from_string(INK)
 
 for style in d.styles:
  for node in list(style.element.iter(qn('w:pBdr'))):node.getparent().remove(node)
 d.styles['Normal'].font.size=Pt(12);d.styles['Normal'].paragraph_format.line_spacing=1.1
 p=sec.header.paragraphs[0];text(p,'FOXY',18,True,ACC);text(p,' STUDIO',10,True);text(p,'     /     IVP ČZU',12,True);text(p,'                       ATELIÉR PRAXÍ',9,True)
 pic=p.add_run().add_picture(str(water),width=Inches(6));a=pic._inline;a.tag=qn('wp:anchor')
 for k,v in {'distT':'0','distB':'0','distL':'0','distR':'0','simplePos':'0','relativeHeight':'0','behindDoc':'1','locked':'0','layoutInCell':'1','allowOverlap':'1'}.items():a.set(k,v)
 sp=OxmlElement('wp:simplePos');sp.set('x','0');sp.set('y','0');a.insert(0,sp)
 for axis in ['H','V']:
  pos=OxmlElement('wp:position'+axis);pos.set('relativeFrom','page');al=OxmlElement('wp:align');al.text='center';pos.append(al);a.insert(1 if axis=='H' else 2,pos)
 a.insert(4,OxmlElement('wp:wrapNone'))
 p=sec.footer.paragraphs[0];text(p,'IVP ČZU  /  2026–2027',9,True,ACC);text(p,'      PRACOVNÍ SEŠIT                                      ',9);fld=OxmlElement('w:fldSimple');fld.set(qn('w:instr'),'PAGE');p._p.append(fld)
 page=0;used=0;current='Údaje a příprava';count=0
 def start(title,first=False):
  nonlocal page,used
  if page:d.add_page_break()
  page+=1
  p=paragraph(d,f'{page:02d}   /   '+('PŘED PRAXÍ' if first else 'PRACOVNÍ ARCH'),11,True,ACC,10)
  p=paragraph(d,src['title'] if first else title,36 if first else 29,True,after=14);p.style=d.styles['Title']
  p.paragraph_format.space_before=Pt(10);p.paragraph_format.space_after=Pt(15);shade(p,COLORS[(page-1)%4]);p.paragraph_format.left_indent=Mm(4);p.paragraph_format.right_indent=Mm(3)
  pr=p._p.get_or_add_pPr();bs=OxmlElement('w:pBdr')
  for side in ['top','bottom','left','right']:
   b=OxmlElement('w:'+side);b.set(qn('w:val'),'single');b.set(qn('w:sz'),'90');b.set(qn('w:space'),'8');b.set(qn('w:color'),COLORS[(page-1)%4]);bs.append(b)
  pr.append(bs)
  used=180 if first else 110
  if not first:paragraph(d,src['title']+'  /  Pokračujte vlastním záznamem',10,False,ACC,12)
 start(current,True)
 items=src['items'];tail=[]
 if key=='rozbor-cvicny-ucitel':
  expanded=[];section_title='Rozbor výuky'
  for item in items:
   if item.get('heading'):section_title=item['text']
   if item['type']=='table' and len(item['rows'])>5:
    expanded.append(dict(item,rows=item['rows'][:5]))
    expanded.append({'type':'text','heading':True,'text':section_title+' — pokračování','forcePage':True})
    expanded.append(dict(item,rows=[item['rows'][0]]+item['rows'][5:]))
   else:expanded.append(item)
  items=expanded
 if key in ['continuous','micro']:
  cut=next((i for i,x in enumerate(items) if x.get('heading') and x.get('text')=='Co udělám dál'),len(items));tail=items[cut+1:];items=items[:cut]
 for ix,x in enumerate(items):
  if x['type']=='text' and x.get('heading'):
   if x['text']==src['title']:continue
   current=x['text'];cost=55
   if x.get('forcePage') or (key=='rozbor-cvicny-ucitel' and current=='Společný závěr rozboru'):start(current);continue
   following=items[ix+1:ix+3];needed=sum(height(y) for y in following)
   if used+cost+min(needed,400)>(720 if current=='Co udělám dál' else 665):start(current);continue
   p=paragraph(d,current,21,True,after=10);shade(p,COLORS[(page-1)%4]);p.paragraph_format.space_before=Pt(12);used+=cost;continue
  if ix==0: # year / programme metadata
   paragraph(d,x['text'],10,True,ACC,10);used+=24;continue
  h=height(x)
  if key=='rozbor-cvicny-ucitel' and x.get('label','').startswith('Rozbor proběhl'):start('Uzavření rozboru')
  if (key=='micro' and ix==19) or (key=='arch-naslechu' and ix==32):start(current)
  if used+h>(720 if current=='Co udělám dál' else 665) and not (x['type']=='table' and used<180):start(current)
  typ=x['type']
  if typ=='text':
   content=x['text'].replace('První stranu před setkáním, druhou po rozhovoru a při ověření domluvy.','Přípravu před setkáním, reflexi po rozhovoru a při ověření domluvy.').replace('Druhou stranu až po skutečném vyzkoušení.','Reflexi až po skutečném vyzkoušení.').replace('Po zobrazení odezvy vyplňte druhou stranu.','Po zobrazení odezvy vyplňte reflexi.').replace('Tato třístránková osnova','Tato osnova').replace('Strany 1 a 2 tvoří osnovu přípravy; třetí strana slouží k následnému rozboru.','První část sešitu vede přípravou; navazující část slouží k následnému rozboru.')
   p=paragraph(d,content,11,False,after=10)
   for lead in ['K čemu list slouží','Kdy jej vyplnit','Jak postupovat']:
    if content.startswith(lead):
     p.clear();text(p,lead.upper()+'\n',10,True,ACC);text(p,content[len(lead):].strip(),11);break
  elif typ in ['input','textarea']:
   count+=1;label=x['label'].split('\n');p=paragraph(d,f'{count:02d}  '+label[0],13,True,after=4)
   if len(label)>1:paragraph(d,' '.join(label[1:]),10,False,after=5)
   for _ in range(1 if typ=='input' else 3):
    p=paragraph(d,' ',12,after=5);p.paragraph_format.line_spacing=1;borders(p)
  elif typ=='choice':
   count+=1;label=x['label'].replace('Vyberte jednu možnost.','').replace('Označte vše, co platí.','').strip()
   paragraph(d,(label if re.match(r'^\d+\s+',label) else f'{count:02d}  '+label),13,True,after=4)
   paragraph(d,'Označte vše, co platí.' if x.get('multi') else 'Vyberte jednu možnost.',10,False,after=5)
   for o in x['options']:
    p=paragraph(d,'☐  '+o,12,after=3);shade(p,COLORS[(page-1)%4]);p.paragraph_format.left_indent=Mm(3)
  elif typ=='table':
   rows=x['rows'];t=d.add_table(rows=0,cols=len(rows[0]));t.autofit=False;t.alignment=WD_TABLE_ALIGNMENT.CENTER
   for ri,row in enumerate(rows):
    cells=t.add_row().cells
    for ci,s in enumerate(row):
     cell=cells[ci];cell.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
     pr=cell._tc.get_or_add_tcPr();m=OxmlElement('w:tcMar')
     for side in ['top','left','bottom','right']:
      v=OxmlElement('w:'+side);v.set(qn('w:w'),'110');v.set(qn('w:type'),'dxa');m.append(v)
     pr.append(m);sh=OxmlElement('w:shd');sh.set(qn('w:fill'),COLORS[(page-1)%4] if ri==0 else 'FFFFFF');pr.append(sh)
     bs=OxmlElement('w:tcBorders')
     for side in ['top','left','bottom','right']:
      b=OxmlElement('w:'+side);b.set(qn('w:val'),'single');b.set(qn('w:sz'),'4');b.set(qn('w:color'),'BACDC7');bs.append(b)
     pr.append(bs);p=cell.paragraphs[0];p.paragraph_format.space_after=Pt(4);text(p,('\n'.join('☐ '+o for o in s.split('\n')) if 'Neposuzováno' in s and ri>0 else s) or '\n',11,ri==0)
    trpr=t.rows[-1]._tr.get_or_add_trPr();trpr.append(OxmlElement('w:cantSplit'))
    if ri==0:trpr.append(OxmlElement('w:tblHeader'))
   paragraph(d,'',after=4)
  used+=h
 if key in ['ivp','group','guided','micro','continuous','reflection']:
  start('Co dokládám v KRAAU')
  paragraph(d,'MOJE KOMPETENCE  /  RÁMEC MŠMT',11,True,ACC)
  paragraph(d,'Vyberte kompetenci v mapě Ateliéru. Připojte konkrétní situaci, podle které je patrné, co jste pozorovali nebo sami udělali.',13)
  for label in ['Kód a název kompetence','Co se stalo a čím to dokládám','Co vyzkouším příště a kdy']:
   paragraph(d,label,16,True,after=9)
   for _ in range(3):p=paragraph(d,' ',after=8);borders(p)
  paragraph(d,'☐ Pozoroval/a jsem učitele     ☐ Sám/sama jsem provedl/a\n☐ Reflektuji zkušenost            ☐ Teprve plánuji',12,True)
  paragraph(d,'Přiřazení dokladu ke kompetenci není hodnocením pedagoga ani potvrzením splnění praxe.',11,False,ACC)
 if tail:
  paragraph(d,'PŘED ULOŽENÍM A ODEVZDÁNÍM',11,True,ACC)
  for x in tail:paragraph(d,x.get('text',''),10,False)
 path=ROOT/'atelier-praxe-upv/materialy'/('prilohy' if key in ['arch-naslechu','rozbor-cvicny-ucitel'] else '')/(key+'.docx');d.save(path);print(key,page,flush=True)
if __name__=='__main__':
 import sys
 for k,v in data.items():
  if len(sys.argv)==1 or k in sys.argv[1:]:make(k,v)
