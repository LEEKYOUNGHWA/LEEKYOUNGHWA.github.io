
# [ORACLE] object

```sql 
-- object 조회
select * from ALL_OBJECTS;
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

# synonym DBlink

[http://www.gurubee.net/lecture/1560](http://www.gurubee.net/lecture/1560)
[https://myjamong.tistory.com/179](https://myjamong.tistory.com/179)

dblink를 synonym 으로 감싸서 사용하기도 한다. 예전에 유행하던 스타일이라고 한다.. 아무튼 요즘은 걷어내는 추세!

# Alter sequence useing pl/sql
**1. 드롭하고 새로 생성**
**2. 증분값 조정**
```sql
ALTER SEQUENCE [변경 대상 시퀀스] INCREMENT BY  289462; 
```
블로그 검색해보니 대부분 증분값 변경해서 조절하는거 같다.
하지만 일개 개발자에게는 권한이 없음

**3. select 시퀀스.nextval connect by level**
  select 문에 connect by level 써서 올려줘도 되긴 하는데 툴에서 200번 돌고 멈춰버림

**4. using pl/sql loop**
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





<!--stackedit_data:
eyJoaXN0b3J5IjpbNjQwMzk0NzAsMjExMTk4MzExOSwtNDY2Nj
AzMjcxLC05NjcxMjE4MSwxNDc1MDEzOTIwLC0xNDMwMzI0NDQ4
LC0xOTA5ODE0OTU3LDIwODE0NzMzNTldfQ==
-->