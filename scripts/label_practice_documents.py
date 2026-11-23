"""Add study year/semester to the existing practice documents, preserving their content."""
from pathlib import Path
from docx import Document
from docx.shared import Pt
ROOT=Path(__file__).resolve().parents[1]/'atelier-praxe-upv/materialy'
labels={
'ivp':'1. ročník · 2. semestr (letní)', '01-ivp':'1. ročník · 2. semestr (letní)',
'group':'2. ročník · 3. semestr (zimní)', '02-skupinovy-naslech':'2. ročník · 3. semestr (zimní)',
'guided':'2. ročník · 4. semestr (letní)', '03-rizeny-naslech':'2. ročník · 4. semestr (letní)',
'micro':'3. ročník · 5. semestr (zimní)', '04-microteaching':'3. ročník · 5. semestr (zimní)',
'continuous':'3. ročník · 6. semestr (letní)', '05-souvisla-praxe':'3. ročník · 6. semestr (letní)',
'reflection':'3. ročník · 6. semestr (letní)', '06-reflexe':'3. ročník · 6. semestr (letní)'}
for path in ROOT.rglob('*.docx'):
 if path.stem not in labels:continue
 d=Document(path)
 text='UPV · 2026/2027 · '+labels[path.stem]
 target=next((p for p in d.paragraphs if p.text.startswith(('AKADEMICKÝ ROK','UPV · 2026/2027'))),None)
 if target is None:target=d.paragraphs[0].insert_paragraph_before()
 target.clear();r=target.add_run(text);r.bold=True;r.font.size=Pt(10)
 d.save(path)
 print(path.name)
