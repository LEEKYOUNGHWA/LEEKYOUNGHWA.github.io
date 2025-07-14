---
lastUpdated: 2025/07/11 13:12:00
subTitle: 내가보는용 Chocolatey
description: Chocolatey 설치 및 프로그램 개발 주요 프로그램 설치
image: https://chocolatey.org/assets/images/global-shared/logo-square.svg
tags: ["tool"]
---

# Chocolatey

## 설치

관리자용 powershell

```sh
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

## 주요 설치 프로그램

```
choco install git
choco install vscode
choco install dbeaver
choco install nvm
```


