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

1. 관리자 권한 powershell 에서 chocolatey 설치
   ```sh
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```
   
1. VsCode, git, nvm 설치
   ```
   choco install vscode
   choco install git
   choco install nvm
   ```

1. 깃 이름, 이메일 설정
   ```
   git config --global user.name "leekyounghwa"
   git config --global user.email "rudghk5220@gmail.com"
   ```

1. choco 사용 nvm 설치, node 16 설치
   ```
   nvm install 16
   nvm use 16.20.2
   ```
1. VsCode 확장프로그램 Vue, Git Graph 설치  
1. git clone `https://github.com/LEEKYOUNGHWA/LEEKYOUNGHWA.github.io.git`
1. 블로그 실행
   ```
   npm i
   npm run build
   npm run dev
   ```

::: danger
* 블로그 만든지 오래되어 node 16 이하에서 동작합니다
* [https://stackoverflow.com/a/69699772/10222566](https://stackoverflow.com/a/69699772/10222566)
:::



