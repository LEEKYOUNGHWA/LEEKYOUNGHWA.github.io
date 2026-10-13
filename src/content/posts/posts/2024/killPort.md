---
title: "윈도우·리눅스 사용 중인 포트 찾아서 프로세스 종료 (netstat, taskkill, fuser)"
subTitle: "포트가 이미 사용 중일 때 윈도우 netstat·taskkill, 리눅스 fuser로 프로세스 종료하기"
section: posts
lastUpdated: "2024/11/05 11:54:00"
tags: ["cmd"]
---

3번이상 검색한거 같다.. 바보
## Window
```sh
netstat -a -o | findstr 포트번호
taskkill /f /pid <PID>
```

## Linux
```sh
fuser -k <포트 번호>/tcp
```
