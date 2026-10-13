---
title: "파이썬으로 doc→docx, ppt→pptx 일괄 변환하고 ppt 텍스트 추출하기"
subTitle: "파이썬으로 마이바티스 쿼리 엑셀 정리, doc·ppt 파일 일괄 변환, ppt 글 읽기"
section: posts
lastUpdated: "2023/11/20 10:00:00"
tags: ["python"]
---

올 한해는 문서만 작성하다가 끝났다....  
그래도 sap 프로젝트때 파이썬으로 한번 문서 정리 하고 나니까 이번 탈오라클 프로젝트에서는 수월하게 작업했던거 같다.  
좀 지저분하긴 한데 다음에 또 쓸일 있으면 정리 되겠지....  
프로젝트 하면서 5000개 문서 분류 및 rename, 1000개 쿼리 엑셀로 정리한 파이썬 소스.  
해당 소스는 anaconda3 jupyter notebook 에서 실행하였다.


## python으로 마이바티스 쿼리 엑셀로 작성

`xmltodict.parse(data)` 이게 키포인트 였음.

```python
#anaconda prompt> pip install xmltodict
import xmltodict
import json
from openpyxl import Workbook
from pathlib import Path
from openpyxl import load_workbook
wb = load_workbook(filename = '쿼리조사.xlsx')
smtc = wb['커넥션  조사']
#newwb = Workbook()
#newwb = load_workbook(filename = 'smtcServer쿼리조사.xlsx')
#ws1 = newwb.active
#ws1 = newwb['persist-impl']
#ws1.append(['번호','ecdDataSource','impl'])

i=1
for row in smtc.iter_rows(min_col=2, min_row=53 ,max_col=2 ,max_row=83):
    for cell in row:
        print(cell.value, end=" ")
        my_file = Path('C:\\workspace\\smart4c_mip_all\\resource\\spring\\persists\\'+cell.value)
        if my_file.is_file() == False:
            continue
        with open('C:\\workspace\\smart4c_mip_all\\resource\\spring\\persists\\'+cell.value, 'r',encoding='utf-8') as f:
            data = f.read()
        doc = xmltodict.parse(data)
        doc = doc['beans']['bean']
#print(json.dumps(doc, indent=4))
        if len(doc)==2 :
            for bean in doc:
                if '.incrementer.' not in bean['@class']:
#print(cell.value, ' ', bean['@class'])
                    classid = bean['@class']
                    print(i, cell.value, classid.split('.')[-1]+'.java')
                    smtc['C'+str(i)] = classid.split('.')[-1]+'.java'
#ws1.append([i,cell.value,classid.split('.')[-1]+'.java'])
        else :
#print(cell.value, ' ',doc['@class'])
            classid = doc['@class']
            print(i, cell.value, classid.split('.')[-1]+'.java')
            smtc['C'+str(i)] = classid.split('.')[-1]+'.java'
#ws1.append([i,cell.value,classid.split('.')[-1]+'.java'])
        i = i+1
#if 'impl' in bean['@class']:
#print(bean['@class'])
#print(doc)
#doc = doc['@class'].split('.')[-1]+'.java'
#print(doc)
#print(json.dumps(doc, indent=4))

#newwb.save('smtcServer쿼리조사.xlsx')
#newwb.save('smtcServer쿼리조사.xlsx')
#print(smtc['a1'].value)
#smtc['a1'].value = 'ttttttttttttttttttttt\ntttttttt\nttttttt\nttt'

wb.save('쿼리조사.xlsx')

#sheet['A1'] = 1
#sheet.cell(row=2, column=2).value = 2

#book.save('write2cell.xlsx')
```

```python
import re
from pathlib import Path
import glob
from openpyxl import load_workbook
newwb = load_workbook(filename = '쿼리조사.xlsx')
ws1 = newwb['커넥션  조사']
ws2 = newwb.create_sheet("상품이외2")
ws2.append(['번호','ecdDataSource','impl','queryid'])

i=1
for row in ws1.iter_rows(min_col=1, min_row=53 ,max_col=4 ,max_row=53):
    print(row[0].value, row[1].value, row[2].value)

    my_file = glob.glob('C:\\workspace\\smart4c_mip_all\\src\\smart4c\\modules\\**/*'+row[2].value, recursive=True)
    my_file = Path(my_file[0])
    with open(my_file, 'r',encoding='utf-8') as f:
        data = f.read()
    all = re.findall('getSqlFromXml\(\"(.*)\"', data)
#print(cell.value, all)
    for sqlid in all:
        print(row[0].value, row[1].value, row[2].value, sqlid)
        ws2.append([row[0].value, row[1].value, row[2].value, sqlid])
#with open('C:\\Users\\lkh\\smtc\\smart4c_mip_all\\resource\\spring\\persists\\'+cell.value, 'r',encoding='utf-8') as f:
#data = f.read()
#doc = xmltodict.parse(data)
#newwb.save('쿼리조사.xlsx')
#with open('C:\\Users\\lkh\\smtc\\smart4c_mip_all\\src\\smart4c\\modules\\prd\\dao\\impl\\DlvInfoEntDaoImpl.java', 'r',encoding='utf-8') as f:
#data = f.read()
#print(data)
#all = re.findall(r"getSqlFromXml(\w+[\w\.]*)",data)
#all = re.findall('getSqlFromXml\(\"(.*)\"', data)
#print(all)
newwb.save('쿼리조사.xlsx')
```

```python
import re
from pathlib import Path
import glob
import xmltodict

wb = load_workbook(filename = '쿼리조사.xlsx')
ws1 = wb["상품이외2"]
i=2
for row in ws1.iter_rows(min_col=1, min_row=2):
    print(i,row[0].value, row[1].value, row[2].value, row[3].value)
    queryfile = row[3].value.split('.')[0]
#my_file = Path('C:\\Users\\lkh\\smtc\\smart4c_mip_all\\src\\smart4c\\modules\\prd\\dao\\impl\\'+cell.value)
    my_file = Path('C:\\workspace\\smart4c_mip_all\\resource\\spring\\query\\prd' + queryfile + '.xml')
    if my_file.is_file():
        with open(my_file,'r',encoding='utf-8') as f:
            data = f.read()
            doc = xmltodict.parse(data)
            doc = doc['properties']['entry']
#print("lendoc",len(doc))
#print(isinstance(doc, (list, tuple)))
            if isinstance(doc, (list, tuple)):
                for query in doc:
                    if query['@key'] == row[3].value:
                        print(query['#text'])
#query.get('#text')
                        ws1['E'+str(i)] = query.get('#text')
            else :
#print(doc)
                if doc['@key'] == row[3].value:
                        print(doc['#text'])
                        ws1['E'+str(i)] = query.get('#text')
    i+=1
#if my_file.is_file():
#print(i, cell.value,my_file)
#else :
#print(i, cell.value,"false")

#wb.save('smtcServer쿼리조사.xlsx')
```

```python
import re
from pathlib import Path
import glob

newwb = load_workbook(filename = '쿼리조사.xlsx')
ws1 = newwb["상품이외2"]
#sharews = newwb["쉐어플렉스테이블"]
i=1
for row in ws1.iter_rows(min_col=1, min_row=2):
#print(i,row[4].value)
    i+=1
#shtables=''
    if row[5].value==None:
        continue
    if 'SELECT ' in row[5].value:
        ws1['H'+str(i)] = 'Y'
    if 'INSERT ' in row[5].value:
        ws1['I'+str(i)] = 'Y'
    if 'UPDATE ' in row[5].value:
        ws1['J'+str(i)] = 'Y'
    if 'DELETE ' in row[5].value:
        ws1['K'+str(i)] = 'Y'
    if '{0}' in row[5].value:
        ws1['L'+str(i)] = 'Y'
    if '/*+' in row[5].value:
        ws1['M'+str(i)] = 'Y'
    if '@' in row[5].value:
        ws1['N'+str(i)] = 'Y'
    if 'TB_BB002' in row[5].value:
        ws1['N'+str(i)] = 'TB_BB002'
#for sharetable in sharews.iter_rows(min_col=1, min_row=2):
#if sharetable[0].value in row[4].value:
#shtables+=sharetable[0].value + ', '
#ws1['M'+str(i)] = shtables
newwb.save('쿼리조사.xlsx')
```

## python으로 .doc 파일 .docx 파일로 저장

```python
from glob import glob
import re
import os
import win32com.client as win32
from win32com.client import constants


paths = glob('C:\\Users\\lkh\\Documents\\01.편의점가맹지원\\프로그램설계서_doc\\*.doc', recursive=True)

def save_as_docx(path):
    # Opening MS Word
    word = win32.gencache.EnsureDispatch('Word.Application')
    doc = word.Documents.Open(path)
    doc.Activate ()

    # Rename path with .docx
    new_file_abs = os.path.abspath(path)
    new_file_abs = re.sub(r'\.\w+$', '.docx', new_file_abs)

    # Save and Close
    word.ActiveDocument.SaveAs(
        new_file_abs, FileFormat=constants.wdFormatXMLDocument
    )
    doc.Close(False)

count=0
for path in paths:
#     print(path.replace("\\프로그램설계서\\","\\프로그램설계서_doc\\"))
    save_as_docx(path)
#     os.renames(path, path.replace("\\프로그램설계서\\","\\프로그램설계서_doc\\"))
    count+=1

print(count)
```

## python으로 .ppt 파일 .pptx로 저장

[https://stackoverflow.com/questions/45670024/convert-ppt-file-to-pptx-in-python](https://stackoverflow.com/questions/45670024/convert-ppt-file-to-pptx-in-python)

python3에서 안된다고 되어 있는데.. 아나콘다 에서는 잘 동작함

문서 5000개 정리하면서 사용했던 파이썬 소스

```python
from glob import glob
import re
import os
import win32com.client

# Create list of paths to .doc files
paths = glob('C:\\Users\\lkh\\Documents\\01.편의점가맹지원\\보고서설계서\\*.ppt', recursive=True)

def save_as_pptx(path):
    PptApp = win32com.client.Dispatch("Powerpoint.Application")
    PptApp.Visible = True
    PPtPresentation = PptApp.Presentations.Open(path)
    PPtPresentation.SaveAs(path+'x', 24)
    PPtPresentation.close()
    PptApp.Quit()

for path in paths:
    print(path.replace("\\보고서설계서\\", "\\보고서설계서_ppt\\"))
    save_as_pptx(path)
```

## python으로 ppt 모든 글 읽기

```python
prs = Presentation(file)
for slide in prs.slides:
    for shape in slide.shapes:
        if shape.has_text_frame:
		    print(shape.text_frame.text)
    for paragraph in shape.text_frame.paragraphs:
        print(paragraph.text)

    for idx in range(0,len(shape.text_frame.paragraphs)-1):
        for ridx in range(0,len(shape.text_frame.paragraphs[idx].runs)):
            print(shape.text_frame.paragraphs[idx].runs[ridx].text)
```

## python으로 ppt 테이블의 모든 셀 읽기

```python
import os
from pptx import Presentation
import glob
import sys

path = "C:\\Users\\lkh\\Documents\\01.편의점가맹지원\\보고서설계서"
files = glob.glob(path + '/*')

for file in files:
    prs = Presentation(file)
    for slide in prs.slides:
        for shape in slide.shapes:
            if shape.has_table:
                for i in range(0,len(shape.table.rows)-1):
                    for j in range(0,len(shape.table.rows[i].cells)-1):
                        cell = shape.table.rows[i].cells[j].text
                        print(cell)
```
