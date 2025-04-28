---
lastUpdated: 2025/04/01 10:42:00
subTitle: 오라클짱
description: 마리아 디비 로컬
image: https://opencourse.kr/content/images/2024/04/img-132.png
tags: ["database"]
---

# 로컬 마리아디비 설치

인사 데이터가 db에 꽂히는걸 일자별로 비교 검증 하기 위해 했던 과정 기록

> [1. 로컬 마리아디비 설치](./localMariaDBSetting.md)  
> [2. 디비버 테이블 카피](./dbeaverTableCopy.md)  
> [3. 파이썬 DB 조회 후 엑셀로 다운로드](./pythonExcelDownByGPT.md)  
> [4. 파이썬 A DB에 있는 테이블을 B DB로 복사](./pythonDBtableCopyByGPT.md)  

## 설치

링크 참고
- [https://turtlewalk.tistory.com/28](https://turtlewalk.tistory.com/28)
- [https://saakmiso.tistory.com/81](https://saakmiso.tistory.com/81)

## 캐릭터셋

- [https://blog.honeybomb.kr/10](https://blog.honeybomb.kr/10)

## 대소문자 구분
- [https://mangkyu.tistory.com/418](https://mangkyu.tistory.com/418)

## ini 파일 수정

- [https://saakmiso.tistory.com/128](https://saakmiso.tistory.com/128)

## 마리아 DB 권한 부여

```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '0000';
FLUSH PRIVILEGES;
```

## 테이블 COLLATE 변경

테이블의 모든 VARCHAR 및 CHAR 컬럼을 **대소문자 구분하는 utf8mb4_bin**으로 변경

```sql
ALTER TABLE MNblahblahRT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
```
