---
lastUpdated: 2025/08/21 14:47:00
subTitle: 능지이슈로 나 자신에게 빡이 칠때 블로그를 쓰게 된다
description: 도커 설치
image: https://cdn-icons-png.flaticon.com/512/919/919853.png
tags: ["tool"]
---

# Docker 설치

## 설치

멍청아 너는 이걸 처음 설치하는게 아니다. 그런데...  

하... 능지 이슈로 시간을 썼다. 난 왜이렇게 멍청한것인가 

### 능지이슈 1. bios 진입

멍청이가 블루투스 키보드로 f1키를 연타를 했다. 켜지는 동안 블루투스 키보드는 먹지 않는다 바보야

멍청이는 바이오스키는법도 까먹음.

노트북 키패드로 누르셈.

bios에서 security -> virtulization 메뉴 진입 -> inter virtulization technology, intel VD-T feture 켜기

### 능지이슈 2. AMD, ARM

아니 안다...! 안다고!!!! 두개 뭔지 안다고

ARM 다운해놓고 안된다고 한참 구글링하는 빠가사리야

- x86 (인텔/AMD 기반) <-- 멍청아 너는 AMD다
- ARM (모바일/저전력 기반)

### 능지이슈 3. 초콜라티로 설치 가능

```sh
choco install docker-desktop
```

### 능지이슈 4. 계정 있음

멍청아 넌 계정이 이미 있다. 근데 구글 이메일로 가입을 해놨는데

구글 버튼 눌러서 oAuth로 하면 안된다. 과거의 너는 일반으로 가입했다.

이메일을 쳐라 

바  
보  
야  

### 설치 확인

```sh
docker --version
docker compose version
```


------------------------------

.  
.  
.  
머리에 새겨라.....


