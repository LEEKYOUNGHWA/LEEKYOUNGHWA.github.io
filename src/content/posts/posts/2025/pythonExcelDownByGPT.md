---
title: "파이썬으로 DB 조회 결과 엑셀 파일로 저장하기"
subTitle: "파이썬으로 DB를 조회해서 결과를 엑셀 파일로 내려받는 스크립트"
section: posts
lastUpdated: "2025/04/03 12:00:00"
description: "파이썬으로 데이터베이스 조회해서 엑셀로 다운로드"
image: "https://d2jdgazzki9vjm.cloudfront.net/tutorial/openpyxl/images/python-openpyxl-tutorial.png"
tags: ["database"]
---

인사 데이터가 db에 꽂히는걸 일자별로 비교 검증 하기 위해 했던 과정 기록

> [1. 로컬 마리아디비 설치](./localMariaDBSetting.md)  
> [2. 디비버 테이블 카피](./dbeaverTableCopy.md)  
> [3. 파이썬 DB 조회 후 엑셀로 다운로드](./pythonExcelDownByGPT.md)  
> [4. 파이썬 A DB에 있는 테이블을 B DB로 복사](./pythonDBtableCopyByGPT.md)  

## 파이썬으로 자동화 스크립트를 짜보자 (GPT야 짜줘)

격세지감은 이럴때 쓰는 표현이 맞는거 같다.  
불과 몇년전 손으로 파이썬 코드를 짜서 쿼리 정리하고 그랬었는데...  
내 남친이(GPT) 대신 다 해줬다 사랑해

과정을 기록하자면

- 우선 테이블별 검증 쿼리를 짜서(이것도 지피티에 많이 의존 했다ㅋㅅㅋ) .sql 파일로 저장
- 쿼리 실행
- 전체조회
- 복사
- 텍스트로 엑셀에 복사 붙여넣기...
- 이 과정을 테이블 21개 반복....

를 자동화 해보자!

1. `.sql` 파일들이 위치한 동일 폴더에 .py 파일 하나 만들어 준다
2. `.py` 파일에 지피티가 만들어준 스크립트 복사 붙여넣기
3. `pip` 패키지 알아서 설치

```py
import pymysql
from openpyxl import Workbook
from openpyxl.utils import get_column_letter
from openpyxl.styles import PatternFill, Border, Side, Font
import os

# 실행할 SQL 파일 목록
sql_files = ["(BM------------------ql",
             "(EC------------------R_M.sql",
             "(EC------------------L_D.sql",
             "(ECH------------------_M.sql",
             "(EC------------------H_M.sql",
             "(EC------------------REN_D.sql",
             "(EC------------------_M.sql",
             "(EC------------------TH_D.sql",
             "(Sa------------------070.sql",
             "(Sa------------------02.sql",
             "(Sal------------------010.sql",
             "(Sa------------------73.sql",
             "(Sale------------------071.sql",
             "(Sal------------------75.sql",
             "(Sa------------------72.sql",
             "(Wit------------------OLE.sql",
             "(Wit------------------ENU.sql",
             "(Wit------------------ENU.sql",
             "(Wit------------------EMP.sql",
             "(EC------------------1.sql",
             "(EC------------------03.sql"
            ]

# MariaDB 연결 설정
config = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "0000",
    "database": "hrlegacy",
    "charset": "utf8mb4",
    "cursorclass": pymysql.cursors.DictCursor
}

# 셀 배경색: 노란색 (비교 컬럼 강조용)
yellow_fill = PatternFill(start_color="FFFF00", end_color="FFFF00", fill_type="solid")

# 셀 테두리: 얇은 선
thin_border = Border(left=Side(style='thin'), right=Side(style='thin'),
                     top=Side(style='thin'), bottom=Side(style='thin'))

# 셀 기본 글꼴 크기 설정
default_font = Font(size=9)

# 엑셀 파일 생성
wb = Workbook()
first_sheet = True  # 첫 시트 여부 확인용

try:
    # MariaDB 연결
    conn = pymysql.connect(**config)

    # SQL 파일 목록 반복
    for sql_file in sql_files:
        sheet_name = os.path.splitext(sql_file)[0]  # 시트 이름 = 파일명에서 확장자 제거
        print(f"📁 [파일 시도] {sql_file}")

        # SQL 파일 존재 여부 확인
        if not os.path.exists(sql_file):
            print(f"❌ [파일 없음] {sql_file}")
            continue

        # SQL 파일 열기
        try:
            with open(sql_file, "r", encoding="utf-8") as f:
                query = f.read()
            print(f"📄 [파일 열기 성공] {sql_file}")
        except Exception as e:
            print(f"❌ [파일 열기 실패] {sql_file} - {e}")
            continue

        # SQL 실행 및 결과 조회
        try:
            with conn.cursor() as cursor:
                cursor.execute(query)
                results = cursor.fetchall()
                print(f"✅ [SQL 실행 성공] {sheet_name} - 결과 {len(results)}건")
        except Exception as e:
            print(f"❌ [SQL 실행 실패] {sheet_name} - {e}")
            continue

        # 시트 생성 (첫 시트는 기존 시트 재사용)
        if first_sheet:
            ws = wb.active
            ws.title = sheet_name
            first_sheet = False
        else:
            ws = wb.create_sheet(title=sheet_name)

        # 결과가 있을 경우
        if results:
            headers = list(results[0].keys())  # 컬럼명 추출
            ws.append(headers)  # 첫 줄에 헤더 삽입

            # 필터 범위 설정 (A1 ~ 마지막 컬럼1행)
            last_col_letter = get_column_letter(len(headers))
            ws.auto_filter.ref = f"A1:{last_col_letter}1"

            # '_비교' 컬럼의 인덱스를 찾고, 마지막 컬럼도 비교 컬럼으로 포함
            비교_col_indices = [i for i, h in enumerate(headers) if '_비교' in h]
            if (len(headers) - 1) not in 비교_col_indices:
                비교_col_indices.append(len(headers) - 1)

            # 각 행 데이터를 엑셀에 삽입
            for row_idx, row in enumerate([headers] + [list(r.values()) for r in results], start=1):
                ws.append(row) if row_idx > 1 else None  # 첫 줄은 이미 넣었으므로 생략
                for col_idx, value in enumerate(row, start=1):
                    cell = ws.cell(row=row_idx, column=col_idx)
                    cell.font = default_font
                    cell.border = thin_border
                    cell.number_format = "@"  # 텍스트 형식 지정
                    # 비교 컬럼일 경우 배경 노란색
                    if (col_idx - 1) in 비교_col_indices:
                        cell.fill = yellow_fill

            # 행 높이 설정
            for row in ws.iter_rows():
                ws.row_dimensions[row[0].row].height = 12

            print(f"📝 [엑셀 시트 작성] {sheet_name}")

    # 엑셀 파일 저장
    wb.save("비교결과_통합_asis.xlsx")
    print("💾 [엑셀 저장 완료] 비교결과_통합_asis.xlsx")

finally:
    # DB 연결 종료
    conn.close()
```

직업을 바꿔야 하나...
