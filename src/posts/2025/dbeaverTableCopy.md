---
lastUpdated: 2025/04/02 09:22:00
subTitle: 테이블 카피 뜨기 손목이 아프다..
description: 디비버 테이블 카피 뜨기
image: https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/DBeaver_logo.svg/120px-DBeaver_logo.svg.png
tags: ["database"]
---

# 디비버 테이블 카피

인사 데이터가 db에 꽂히는걸 일자별로 비교 검증 하기 위해 했던 과정 기록

> [1. 로컬 마리아디비 설치](./localMariaDBSetting.md)  
> [2. 디비버 테이블 카피](./dbeaverTableCopy.md)  
> [3. 파이썬 DB 조회 후 엑셀로 다운로드](./pythonExcelDownByGPT.md)  
> [4. 파이썬 A DB에 있는 테이블을 B DB로 복사](./pythonDBtableCopyByGPT.md)  

## 디비버 기본 기능 사용

- [https://yummiyummy.tistory.com/113](https://yummiyummy.tistory.com/113)

1. 복사하고싶은 (A테이블) 테이블에서 마우스 우측버튼 > SQL생성 >DDL
2. 생성된 SQL문에서 copy
3. B테이블 스크립트에서 붙여넣기후 실행
4. 가져올 테이블 (B테이블) 에서 마우스 우측버튼 > 데이터 가져오기
5. 가져올 테이블 선택
6. 끝