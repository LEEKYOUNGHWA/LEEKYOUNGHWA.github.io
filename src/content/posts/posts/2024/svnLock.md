---
title: "svn E155004 There are unfinished work items 에러 해결 (svn cleanup)"
subTitle: "svn E155004 LOCK 에러가 날 때 svn cleanup으로 해결하는 방법"
section: posts
lastUpdated: "2024/09/11 17:30:00"
tags: ["tool"]
---

![svn Lock img](https://velog.velcdn.com/images/allsilver94/post/71e6998d-6190-4fa9-9583-90a61f84d018/image.png)

## svn: E155004: There are unfinished work items in '프로젝트'; run 'svn cleanup' first.
 
1. 프로젝트 경로 내부의 .svn 폴더를 확인. 만약 폴더가 보이지 않으면, 보기 > 숨김 항목을 체크.
2. SQLite 프로그램을 다운 [SQLite](https://sqlitebrowser.org/)
3. 최신 버전 선택.
4. 본인의 사용 환경에 맞는 SQLite를 다운.
5. 다운받은 SQLite를 실행.
6. 데이터베이스 열기(O) 메뉴를 선택.
7. LOCK이 걸린 해당 프로젝트 .svn 폴더 안에 있는 wc.db 파일을 선택.
8. QL 실행 메뉴를 선택.
9. 아래의 SQL문을 실행.

```sql
DELETE FROM WC_LOCK;
DELETE FROM WORK_QUEUE;
```

10. 에러 없이 실행이 완료되면, 변경사항 저장하기(W)를 선택하여 변경사항을 저장.
11. LOCK이 걸린 프로젝트를 Team > Cleanup 한 뒤, 업데이트(Update) 및 커밋(Commit).
