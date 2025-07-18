# 깃블로그

## [LEEKYOUNGHWA.github.io](https://LEEKYOUNGHWA.github.io)

## 세팅 가이드

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