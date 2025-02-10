---
lastUpdated: 2025/02/10 17:01:00
subTitle: NVM
description: NVM 명령어 정리
---

# NVM

## NVM (Node Version Manager) 명령어 정리

### 0. **NVM 설치**
관리자 powershell
```sh
choco install nvm
```

### 1. **NVM 설치 확인**  
```sh
nvm --version
```

### 2. **설치 가능한 Node.js 버전 목록 보기**  
```sh
nvm ls-remote
```

### 3. **특정 버전의 Node.js 설치**  
```sh
nvm install <버전>
```
예:  
```sh
nvm install 18.17.1
```

### 4. **설치된 Node.js 버전 목록 보기**  
```sh
nvm ls
```

### 5. **특정 버전으로 전환**  
```sh
nvm use <버전>
```
예:  
```sh
nvm use 16.20.2
nvm use 18.18.2
```

### 6. **기본 Node.js 버전 설정 (새로운 터미널에서도 유지됨)**  
```sh
nvm alias default <버전>
```
예:  
```sh
nvm alias default 18.17.1
```

### 7. **현재 사용 중인 Node.js 버전 확인**  
```sh
nvm current
```

### 8. **Node.js 최신 LTS 버전 설치 및 사용**  
```sh
nvm install --lts
nvm use --lts
```

### 9. **Node.js 버전 삭제**  
```sh
nvm uninstall <버전>
```
예:  
```sh
nvm uninstall 16.20.0
```

### 10. **nvm 사용 일시 정지 (Node.js 시스템 버전 사용)**  
```sh
nvm deactivate
```
