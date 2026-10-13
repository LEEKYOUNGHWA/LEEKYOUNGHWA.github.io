---
title: "DB2 DBeaver에서 FOR 반복문(loop) 실행하는 법"
subTitle: "DB2에서 BEGIN FOR 문으로 DBeaver 에디터에서 바로 반복문 실행하기"
section: posts
lastUpdated: "2025/11/13 16:15:00"
description: "DB2 Dbeaver loop"
tags: ["database"]
---

DB2 디비버에서 loop를 돌릴 수 있다(에디터에서 바로 실행 가능) 오라클이랑 약간 다르지만 안되는건 아님.!

이 사실만 알고 있으면 나머지는 지피티 가 해결 해 줄거시다.

```sql
BEGIN
	FOR v AS
		SELECT USER_ID, USER_NM
		FROM TB_SY_USER_TMP
		WHERE USER_ID IN ('00502986','JSW1')
    DO
        UPDATE TB_SY_USER_TMP
           SET USER_NM = 'LOOP TEST2'
         WHERE USER_ID = v.USER_ID;
    END FOR;
END

SELECT * FROM TB_SY_USER_TMP WHERE USER_ID IN ('00502986','JSW1');
```

- 출처 : [https://mukom-park.tistory.com/123](https://mukom-park.tistory.com/123)
