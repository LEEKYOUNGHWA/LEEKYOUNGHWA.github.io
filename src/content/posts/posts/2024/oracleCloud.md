---
title: "오라클 클라우드 무료 티어에 spring boot 배포하기"
section: posts
lastUpdated: "2024/04/21 19:37:00"
subTitle: "오라클 클라우드 무료 티어에 spring boot 배포하기"
tags: ["oracle cloud"]
---

aws와는 다르게 오라클 클라우드는 평생 무료로 사용 가능하다. 
오라클 클라우드에 초 간단하게 배포하는 방법을 기록해 본다.

### 1. 일단 오라클 클라우드에 회원가입을 해준다

### 2. 무료 vm 생성 클릭

- [블로그](https://velog.io/@dldhk97/%EC%98%A4%EB%9D%BC%ED%81%B4-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%ED%94%84%EB%A6%AC%ED%8B%B0%EC%96%B4-%EC%82%AC%EC%9A%A9%EA%B8%B0)

![image](/image/2024/oracleCloud/1.png)

![image](/image/2024/oracleCloud/2.png)

![image](/image/2024/oracleCloud/3.png)

### 3. ip 고정

- [블로그](https://www.wsgvet.com/cloud/5)

### 4. cmd 실행해서 ssh 접속
귀찮으니까 ssh 다운받은 경로에서 바로 cmd 실행해서 명령어 입력해줬다. 
뒤에 ip주소는 고정한 내 ip 주소다. 각자 고정한 ip에 맞게 수정

![image](/image/2024/oracleCloud/4.png)

```bash
# 내가 보는용임
ssh -i ssh-key-2024-04-21.key ubuntu@158.180.66.250 
```

### 5. sudo su

명령어 실행하다보면 관리자 권한 필요하다. 아묻따 관리자 권한 획득해준다.

```bash
sudo su
```
### 6. git 클론 받기

```bash
git clone https://github.com/LEEKYOUNGHWA/threadCloneCoding.git
```


### 7. java 설치

```bash
$ sudo apt-get update
$ sudo apt-get upgrade

# JAVA11 설치
$ sudo apt-get install openjdk-11-jdk
```

### 8. JAVA_HOME 설정하기
[블로그](https://m.blog.naver.com/seek316/222034123157)

### 9. 빌드하기

<div class="custom-block danger">
<p class="custom-block-title">처음에 20분이 넘도록 빌드가 안되길래 재부팅 해줬다...</p>

free tier라서 메모리가 모자라서 그런가 해서 한참 기다렸는데... 걍 재부팅 하니까 금방 해결됬음.

</div>
```bash
chmod +x gradlew # 권한 없을때 실행
sudo chown 777 ./gradlew
./gradlew build
```

### 10. 방화벽 열어주기
[블로그](https://velog.io/@s2moon98/Oracle-Cloud%EC%99%80-%ED%8F%AC%ED%8A%B8-%ED%8F%AC%EC%9B%8C%EB%94%A9)

instance에 Ingress Rules 추가해주고, 명령어 실행해 준다.

```bash
sudo apt install firewalld
firewall-cmd --permanent --zone=public --add-port=80/tcp
firewall-cmd --permanent --zone=public --add-port=8787/tcp
firewall-cmd --permanent --zone=public --add-port=443/tcp
firewall-cmd --reload
firewall-cmd --zone=public --add-forward-port=port=80:proto=tcp:toport=8787 --permanent #80 -> 8787으로 포트 포워딩
firewall-cmd --reload
firewall-cmd --zone=public --list-all #확인
```
### 11. 빌드 파일 실행하기

```bash
cd build/libs
java -jar ThreadCloneCoding-0.0.1-SNAPSHOT.jar # ssh 붙어있을때만 서버 실행. 백그라운드에서 실행되려면 nohup
```

### 12. 접속 확인


![image](/image/2024/oracleCloud/5.png)


### 13. 수동 배포

```cmd
ssh -i ssh-key-2024-04-21.key ubuntu@158.180.66.250
git pull
chmod +x gradlew
./gradlew build -x test 
cd build/libs
nohup java -jar ThreadCloneCoding-0.0.1-SNAPSHOT.jar & > /dev/null
```

[블로그](https://suyeoniii.tistory.com/52)
