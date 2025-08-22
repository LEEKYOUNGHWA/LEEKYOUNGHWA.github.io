---
title: Window 에 SDKman 설치
date: 2024/01/26 14:05:00
lastUpdated: 2025/08/21 14:03:00
subTitle: window 에 SDKman 설치
description: window 에 SDKman 설치
meta:
  - name: window 에 SDKman 설치 Chocolatey
    content: window 에 SDKman 설치 Chocolatey
  - name: SDKman으로 java 설치
    content: SDKman으로 java 17 설치
tags: ["tool"]
image: https://sdkman.io/assets/img/sdk-man-small-pattern.svg
---

# SDKman

sdkman 이란? sdkman 은 Java , Scala , Groovy , Kotlin 등의 SDK를 관리하는 오픈소스 도구이다.  
sdk 명령어를 이용하여 SDK를 설치/관리 할 수 있다.

## Window 에 SDKman 설치

구글에 Window SDKman 설치를 검색하면 몇몇 국내 블로그가 뜨는데  
대부분 설치하는 방법이 좀 불편(?) 하다.  
choco 를 이용해서 설치하는 해외 [블로그](https://walterteng.com/using-sdkman-on-windows) 발견. 참고해서 설치 해줬다.

1. Install [Chocolatey](https://docs.chocolatey.org/en-us/choco/setup)
2. Install Git for Windows `choco install git`
   > 위 두개는 어지간하면 다 있지 않나 싶다
3. Install Zip `choco install Zip`
   > 블로그에 git 이라고 되어 있는데 오타인거 같다.  
   > 관리자용 powershell 에서 명령어 실행해서 설치해줬다.
4. Install SDKMAN in a custom project folder in C drive.

   git bash 에서 실행. 블로그랑 똑같이 디렉토리 설정해서 설치했다.

   ```sh
   curl -s "https://get.sdkman.io" | bash
   ```

5. 초기화 명령어를 실행시켜 준다

   git bash 에서 실행

   설치하고 나면 다음에 실행할 명령어가 뜬다
   ```sh
   Please open a new terminal, or run the following in the existing one:
   source "/c/Users/lkh/.sdkman/bin/sdkman-init.sh"
   ```

   복사해서 그대로 실행해주자
   ```sh
   source "/c/Users/lkh/.sdkman/bin/sdkman-init.sh" # 본인의 sdkman 경로
   ```

6. 환경변수 설정

   시스템 환경변수 편집 -> 시스템 변수 -> 새로 만들기
   JAVA_HOME  `C:\Users\lkh\.sdkman\candidates\java\current` 
   CLASSPATH  `%JAVA_HOME%\lib`

   시스템 변수 -> Path 편집
   Path `%JAVA_HOME%\bin` 추가

7. 설치 확인
```sh
sdk version
```
```
SDKMAN!
script: 5.20.0
native: 0.7.4 (windows x86_64)
```
SDKman 설치 완료 !

## SDK 설치 명령어

```sh
sdk list # 사용 가능한 SDK 목록
sdk list java # 사용 가능한 java 목록
sdk install <sdk> <version> # 특정 버전의 SDK 설치
sdk use <sdk> <version> # 특정 버전의 SDK 사용
sdk default <sdk> <version> # 특정 버전의 SDK를 기본으로 설정 새로운 터미널 세션에서도 해당 버전의 SDK가 자동으로 선택
sdk uninstall <sdk> <version> # 특정 버전의 SDK를 제거
```

### JAVA 17 설치
```sh
sdk list java
sdk install java 17.0.16-tem # list java로 버전 확인하고 적어주기
sdk default java 17.0.16-tem
java -version # 환경변수를 올바르게 설정했으면 cmd에서도 버전이 잘 나온다
```
## 로컬 SDK 설치

기존에 사용하고 있던 SDK를 SDKman에 연결해서 사용할 수 있다.

```sh
# HWA@DESKTOP-1L2VEPP MINGW64 /c/Program Files # 경로 유의
$ sdk install java oracle-1.8 Java/jdk-1.8 # 로컬 SDK 설치 명령어
# Linking java oracle-1.8 to /c/Program Files/Java/jdk-1.8
# Done installing! # 성공!
```

sdk list java 명령어 실행하면 맨 아래에 Unclassified로 새로 등록 된 것이 보인다.

```sh
sdk list java # 사용 가능한 java 목록
.
.
.
 Unclassified  |     | oracle       | none    | local only | oracle-1.8
.
.
.

sdk use java oracle-1.8 # 로컬 SDK 사용

# Using java version oracle-1.8 in this shell. # 설정 성공!
```

## 설치후 제대로 동작하지 않을때

git bash 와 cmd 에서 java -version 실행해 버전 확인해 본다.  
버전이 제대로 바뀌지 않았다면 한번더 해줘야 할 작업이 있다.

[https://superuser.com/questions/237737/why-is-java-version-returning-a-different-version-to-the-one-defined-in-java-ho](https://superuser.com/questions/237737/why-is-java-version-returning-a-different-version-to-the-one-defined-in-java-ho)

cmd 에서 `where java`를 입력하면 정말 unexpected 했던 경로가 나온다.  
과거 openjdk 설치하면서 자동으로 세팅된거 같다.

`C:\Program Files\Common Files\Oracle`  
`C:\Program Files (x86)\Common Files\Oracle`  
안에 java 폴더를 지워준다.

그리고...
[https://blog.naver.com/siren258/220429528361](https://blog.naver.com/siren258/220429528361)  
이클립스 ini 파일 수정해주면 진짜로 끝
