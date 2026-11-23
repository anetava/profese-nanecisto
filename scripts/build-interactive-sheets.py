from pathlib import Path
from docx import Document
from docx.text.paragraph import Paragraph
from docx.table import Table
import json
root=Path('atelier-praxe-upv/materialy');out={}
for p in list(root.glob('*.docx'))+list((root/'prilohy').glob('*.docx')):
 if p.stem in ['zacnete-zde','manual-rozboru','vzor-naslechu']:continue
 d=Document(p);items=[];last='';choice=None
 for el in d.element.body:
  if el.tag.endswith('}p'):
   par=Paragraph(el,d);text=par.text
   if text.strip():
    if text.startswith('  ') and '\n' in text and choice:
     items.append({'type':'choice','label':choice,'multi':'Označte vše' in choice,'options':[s.strip() for s in text.splitlines() if s.strip()]});choice=None;continue
    if 'Vyberte jednu možnost' in text or 'Označte vše' in text:choice=text;last=text;continue
    if '.....' in text:items.append({'type':'input','label':text.split('..')[0].strip()});last='';continue
    items.append({'type':'text','text':text,'heading':par.style.name.startswith('Heading') or par.style.name=='Title'});last=text
   elif text==' ' and last:
    if items and items[-1].get('text')==last:items.pop()
    items.append({'type':'textarea','label':last});last=''
  elif el.tag.endswith('}tbl'):
   t=Table(el,d);rows=[[c.text for c in r.cells] for r in t.rows];items.append({'type':'table','label':last or 'Pracovní tabulka','rows':rows})
 out[p.stem]={'id':p.stem,'title':d.paragraphs[1].text if len(d.paragraphs)>1 else p.stem,'items':items}
Path('atelier-praxe-upv/interactive-sheets-data.js').write_text('window.SHEET_DATA = '+json.dumps(out,ensure_ascii=False)+';')
print(list(out))
