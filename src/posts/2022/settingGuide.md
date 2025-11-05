---
title: vuepress 블로그 세팅 가이드
date: 2022/01/01 00:00:00
lastUpdated: 2025/11/95 13:34:00
subTitle: For me 뷰프레스 블로그 세팅하기
meta:
  - name: vuepress 블로그 세팅 가이드
    content: vuepress 블로그 세팅 가이드
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

1. node 설치
   ```
   nvm install 20
   nvm use 20
   ```
1. VsCode 확장프로그램 Vue, Git Graph 설치
1. git clone `https://github.com/LEEKYOUNGHWA/LEEKYOUNGHWA.github.io.git`
1. 블로그 실행
   ```
   npm i
   npm start
   ```
