---
title: "oracle PL/SQL DECLARE PROCEDURE"
section: posts
lastUpdated: "2023/10/11 14:04:00"
tags: ["database"]
---

[https://pgnt.tistory.com/13](https://pgnt.tistory.com/13)

이력 관리를 위해 개발자가 직접 프로시저 수정 하지 말라고 할때, 이미 만들어진 프로시저를 조금 수정해서 간단히 돌려보고 싶을때, 프로시저 안이 BEGIN 지옥일때,,,,,,,

DECLARE 에서 프로시저를 선언할 수 있음

기존 프로시저의 CREATE OR REPLACE 를 DECLARE로 바꿔주고 BEGIN 에서 실행시켜준다

```sql
DECLARE
	PROCEDURE temp_procedure
	IS
	-- 프로시저 내용 적어주고
BEGIN
	temp_procedure(); -- 실행
END
```
