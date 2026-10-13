---
title: "oracle object 조회"
section: posts
lastUpdated: "2023/09/27 14:21:00"
tags: ["database"]
---

```sql
-- object 조회
select * from ALL_OBJECTS; -- 또는 dba_objects 환경에 맞게 조회
```

```sql
-- table 조회
select * from ALL_TABLES;
```

```sql
-- index 조회
select * from ALL_IND_COLUMNS;
```

```sql
-- column 조회
select * from ALL_TAB_COLUMNS;
```

```sql
-- comment 조회
select * from ALL_COL_COMMENTS;
```

```sql
-- dblink 조회
select * from ALL_DB_LINKS;
```

```sql
-- synonym 조회
SELECT * FROM ALL_SYNONYMS;
```

```sql
-- procedure, function 소스 조회(조건은 알아서)
SELECT *
FROM dba_SOURCE
WHERE owner NOT IN ( 'SYS', 'ORACLE_OCM', 'SYSTEM', 'DBSNMP','WMSYS','EXFSYS')
AND TEXT LIKE '%@DL_PRD%';
```

```sql
-- 오라클 버전 확인
select * from v$version;
```

```sql
-- 오라클 RAC 확인
select  *  From v$option  where parameter ='Real Application Clusters';
```

## synonym DBlink

[http://www.gurubee.net/lecture/1560](http://www.gurubee.net/lecture/1560)  
[https://myjamong.tistory.com/179](https://myjamong.tistory.com/179)

dblink를 synonym 으로 감싸서 사용하기도 한다. 예전에 유행하던 스타일이라고 한다.. 아무튼 요즘은 걷어내는 추세!

## 시퀀스

### 시퀀스 조정

1. 드롭하고 새로 생성
2. 증분값 조정

```sql
ALTER SEQUENCE [변경 대상 시퀀스] INCREMENT BY  289462;
```

블로그 검색해보니 대부분 증분값 변경해서 조절하는거 같다.
하지만 일개 개발자에게는 권한이 없음

3. select 시퀀스.nextval connect by level

select 문에 connect by level 써서 올려줘도 되긴 하는데 툴에서 200번 돌고 멈춰버림

4. using pl/sql loop

[Best way to reset an Oracle sequence to the next value in an existing column](https://stackoverflow.com/a/6099259)

```sql
DECLARE
v_seq NUMBER(10) := 0;
	BEGIN
		FOR i IN 1 .. 10 LOOP
		SELECT GS_SCM_BRAND_REQ_SEQ.nextval INTO v_seq FROM dual;
	END LOOP;
END;
```

야매로 조절하기 최고의 방법인듯 만번도 거뜬함.

### [ORACLE] Sequence 증가 이상 - Cache (Last Number와 Currval 값 차이)

[https://doughman.tistory.com/11](https://doughman.tistory.com/11)  
[https://bae9086.tistory.com/297](https://bae9086.tistory.com/297)  
[https://subbak2.tistory.com/16](https://subbak2.tistory.com/16)

CACHE 옵션은 원래 그 용도가 순차적으로 시퀀스를 증가시키는 것에 중점을 둔 기능이 아니라, 성능을 위해 미리 숫자만큼 캐시해놓는다라는 의미가 강한 옵션이다. LAST NUMBER 조회하면 CACHE 만큼 메모리에 할당된 시퀀스 넘버가 보임.

## ORACLE RAC

- 여러 개의 Instance가 하나의 Database를 엑세스  
  [https://myalpaca.tistory.com/17](https://myalpaca.tistory.com/17)

## [[SQL] 프로시저(procedure)와 declare 차이

[링크 (tistory.com)](https://pgnt.tistory.com/13)
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTgwNTE0Njg5XX0=
-->
