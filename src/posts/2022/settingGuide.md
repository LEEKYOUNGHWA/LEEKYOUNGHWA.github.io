---
title: vuepress 블로그 세팅 가이드
lang: ko-KR
date: 2022/01/01 00:00:00
lastUpdated: 2025/07/09 13:53:43
subTitle: 플젝 철수 컴터 포맷 기념 업데이트! For me 뷰프레스 블로그 세팅하기
meta:
  - name: vuepress setting guide
    content: easiest fatest way to setting vuepress blog using chocolatey, vsCode
  - name: vuepress1
    content: setting vuepress blog in 10 minutes
tags: ["vuepress"]
description: 뷰프레스 블로그 세팅 가이드
image: https://vuepress.vuejs.org/images/hero.png
---

# {{ $frontmatter.title }}

:tada: 노트북 포맷기념 수정 :tada:

1. VsCode 설치 [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. 관리자 권한 powershell 에서 명령어 입력 : git 설치
   `winget install --id Git.Git -e --source winget`
3.
   ```
   git config --global user.name "leekyounghwa"
   git config --global user.email "rudghk5220@gmail.com"
   ```

4. chocolatey 설치
   ```
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

5. choco 사용 nvm 설치, node 16 설치
   ```
   choco install nvm
   nvm install 16
   nvm use 16.20.2
   ```
6. powershell, vscode 껏다 키기  
7. VsCode 확장프로그램 Vue, Git Graph 설치  
8. git clone `https://github.com/LEEKYOUNGHWA/LEEKYOUNGHWA.github.io.git`
9. `npm i`
10. `npm run build` `npm run dev`


::: danger

* 블로그 만든지 오래되어 node 16 이하에서 동작합니다
* [https://stackoverflow.com/a/69699772/10222566](https://stackoverflow.com/a/69699772/10222566)
:::



