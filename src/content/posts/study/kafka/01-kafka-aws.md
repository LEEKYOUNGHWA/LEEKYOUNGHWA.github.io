---
title: "실습용 카프카 브로커 설치"
section: study
lastUpdated: "2024/10/07 14:56:00"
image: "https://velog.velcdn.com/images/gsun/post/64573b02-6890-4bf8-a50c-91210e6c9063/image.png"
tags: ["kafka"]
---

## AWS EC2 인스턴스 발급 및 보안 설정

aws에서 카프카를 구축할 수 있는 방법은 크게 두가지가 있다
 - MSK(Managed Service Kafka) : aws에서 지원하는 완전 관리형 카프카 서비스
 - EC2(Elastic Compute Cloud) 에서 인스턴스(가상서버)를 발급받아 설치 및 실행

카프카를 안전하게 서비스로 운영하기 위해서는 최소 3대의 서버로 카프카 클러스터를 구축해야 한다. 
카프카 클라이언트 개발 실습은 1대로 충분

1. aws 계정 생성
![1](/image/2024/kafka/1.png)  

2. EC2 대시보드 이동, 인스턴스 시작
![2](/image/2024/kafka/2.png)  

3. AMI 선택 : Amazon Linux 2 AMI (HVM), SSD Volume Type
![3](/image/2024/kafka/3.png)

4. 인스턴스 유형 선택 : t2.micro
![4](/image/2024/kafka/4.png)  

5. 키페어 설정
![5](/image/2024/kafka/5.png)

6. 보안그룹 규칙 추가
- 카프카 브로커의 기본 포트 : 9092
- 주키퍼 기본 포트 : 2181  

![6](/image/2024/kafka/6.png)

7. 인스턴스 시작


## 인스턴스 접속하기

1. test-kafka-server-key.pem 파일을 -i 명령어로 읽어오기 위해 유저 권한 변경

```sh
chmod 400 test-kafka-server-key.pem
```

2. 명령어 실행
```sh
ssh -i "test-kafka-server-key.pem" ec2-user@3.21.129.47
```
![7](/image/2024/kafka/7.png)

## 인스턴스에 자바 설치

```sh
sudo yum install -y java-1.8.0-openjdk-devel.x86_64
# java -version 으로 설치확인
```

## 주키퍼, 카프카 브로커 실행

### 카프카 바이너리 패키지 다운

```sh
wget https://archive.apache.org/dist/kafka/2.5.0/kafka_2.12-2.5.0.tgz # 카프카 패키지 다운
tar xvf kafka_2.12-2.5.0.tgz # 압축풀기
cd kafka_2.12-2.5.0
```

### 카프카 브로커 힙 메모리 설정
카프카 브로커는 레코드의 내용은 페이지 캐시로 시스템 메모리를 사용하고 나머지 객체들을 힙 메모리에 저장하여 사용. 카프카 브로커를 운영할때 힙 메모리를 5GB 이상으로 설정하지 않는 것이 일반적이다.

카프카 힙메모리는 카프카 브로커 1G, 주키퍼는 512MB로 기본 설정 되어 있다. 실습용으로 400, 400 으로 설정

```sh
export KAFKA_HEAP_OPTS="-Xmx400m -Xms400m"
echo $KAFKA_HEAP_OPTS
```
터미널 세션이 종료되면 KAFKA_HEAP_OPTS 환경변수 선언문 초기화 되므로 ~./bashrc 파일에 넣어준다

```sh
vi ~/.bashrc

# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
fi

# Uncomment the following line if you don't like systemctl's auto-paging feature:
# export SYSTEMD_PAGER=

# User specific aliases and functions
export KAFKA_HEAP_OPTS="-Xms400m -Xms400m" 
```
`esc` `:wq`

```sh
source ~/.bashrc # 실행
echo $KAFKA_HEAP_OPTS
```

#### kafka-server-start.sh
```sh
cat bin/kafka-server-start.sh
```
- KAFKA_HEAP_OPTS 이 환경변수로 설정되어 있지 않으면 기본 힙 메모리는 Xms 1G, Xms 1G로 설정된다
- -daemon 옵션을 사용하여 카프카 브로커가 실행될때 백그라운드로 실행될지 포어그라운드로 실행될지 설정할 수 있다. -daemon 옵션을 붙여 백그라운드로 실행하는 것이 일반적인 운영 방식이다.

### 카프카 브로커 실행 옵션 설정

config 폴더에 있는 server.properties 파일에는 카프카 브로커가 클러스터 운영에 필요한 옵션들을 지정할 수 있다.

advertised.listner는 카프카 클라이언트 또는 커맨드 라인 툴을 브로커와 연결할 때 사용. 현재 접속하고 있는 인스턴스의 퍼블릭 IP와 카프카 기본 포트인 9092를 PLAINTEXT://와 함께 붙여넣고 advertised.listners를 주석에서 해제한다.

```sh
vi config/server.properties
advertised.listeners=PLAINTEXT://3.21.129.47:9092
```

### 주키퍼 실행

주키퍼 : 분산 코디네이션 서비스 제공. 카프카 클러스터의 설정 리더 정보, 컨트롤러 정보를 담고 있다. 상용환경에서는 3대 이상의 서버로 구성하여 사용하지만 실습에서는 테스트용으로 1대만 실행(Quick-and-dirty single node)

```sh
bin/zookeeper-server-start.sh -daemon config/zookeeper.properties
jps -vm
```

### 카프카 브로커 실행 및 로그 확인

```sh
bin/kafka-server-start.sh -daemon config/server.properties
jps -m
tail -f logs/server.log
```

![9](/image/2024/kafka/8.png)

### 로컬 컴퓨터에서 카프카와 통신 확인

> 로컬컴퓨터 cmd
> ```
> wsl --install
> ```
> 우분투 실행


```sh
curl https://archive.apache.org/dist/kafka/2.5.0/kafka_2.12-2.5.0.tgz --output kafka.tgz
tar -xvf kafka.tgz
cd kafka_2.12-2.5.0
cd bin
ls # 카프카 커맨드 라인 툴 확인
./kafka-broker-api-versions.sh --bootstrap-server 3.21.129.47:9092
```

![8](/image/2024/kafka/8.png)
