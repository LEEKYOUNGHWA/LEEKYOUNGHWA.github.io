---
title: "카프카 커넥트"
section: study
lastUpdated: "2024/10/15 12:14:00"
image: "https://velog.velcdn.com/images/gsun/post/64573b02-6890-4bf8-a50c-91210e6c9063/image.png"
tags: ["kafka"]
---

- kafka connect : 카프카 오픈소스에 포함된 툴 중 하나로 데이터 파이프라인 생성 시 작업 형태를 템플릿으로 만들어 반복 작업을 줄이고 효율적인 전송을 이루기 위한 애플리케이션. 
- 소스 커넥터(source connector) : 프로듀서 역할
- 싱크 커넥터(sink connector) : 컨슈머 역할

## 커넥트 실행
### 단일모드 커넥트

커넥트 파일 수정
```sh
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0$ cd config
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0/config$ vi connect-standalone.properties

bootstrap.servers=my-kafka:9092
key.converter=org.apache.kafka.connect.json.JsonConverter
value.converter=org.apache.kafka.connect.json.JsonConverter
key.converter.schemas.enable=false
value.converter.schemas.enable=false
offset.storage.file.filename=/tmp/connect.offsets
offset.flush.interval.ms=10000
plugin.path=/usr/local/share/java,/usr/local/share/kafka/plugins
```
단일모드 커넥트는 커넥스 설정파일 정의 실행해야 한다. 예시로 기본제공하는 파일소스커넥터 실행

```sh
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0/config$ vi connect-file-source.properties

name=local-file-source
connector.class=FileStreamSource
tasks.max=1
file=/tmp/test.txt
topic=connect-test
```
단일모드 커넥터 실행
```sh
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0$ bin/connect-standalone.sh config/connect-standalone.properties \
> config/connect-file-source.properties
```

동작확인! 

```sh
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0$ cd /tmp
lkh@DESKTOP-1L2VEPP:/tmp$ touch test.txt

# test.txt 수정

lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0$ bin/kafka-console-consumer.sh --bootstrap-server my-kafka:9092 --topic connect-test --from-beginning
"test"
"234567890"
"어디로 가니"
```

### 분산모드 커넥트

분산모드 설정파일

```sh
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0/config$ vi connect-distributed.properties

bootstrap.servers=my-kafka:9092
group.id=connect-cluster
key.converter=org.apache.kafka.connect.json.JsonConverter
value.converter=org.apache.kafka.connect.json.JsonConverter
key.converter.schemas.enable=false
value.converter.schemas.enable=false
offset.storage.topic=connect-offsets
offset.storage.replication.factor=1
config.storage.topic=connect-configs
config.storage.replication.factor=1
status.storage.topic=connect-status
status.storage.replication.factor=1
offset.flush.interval.ms=10000
plugin.path=/usr/local/share/java,/usr/local/share/kafka/plugins
```

실행

```sh
bin/connect-distributed.sh config/connect-distributed.properties
```

```sh
# 커넥트에 사용할수 있는 플러그인 조회
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0/config$ curl -X GET http://localhost:8083/connector-plugins
#########
[{"class":"org.apache.kafka.connect.file.FileStreamSinkConnector","type":"sink","version":"2.5.0"},{"class":"org.apache.kafka.connect.file.FileStreamSourceConnector","type":"source","version":"2.5.0"},{"class":"org.apache.kafka.connect.mirror.MirrorCheckpointConnector","type":"source","version":"1"},{"class":"org.apache.kafka.connect.mirror.MirrorHeartbeatConnector","type":"source","version":"1"},{"class":"org.apache.kafka.connect.mirror.MirrorSourceConnector","type":"source","version":"1"}]

# FileStreamSourceConnector 실행
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0/config$ curl -X POST -H "Content-Type: application/json" \
> --data '{
> "name":"local-file-source",
> "config":{
> "connector.class":"org.apache.kafka.connect.file.FileStreamSourceConnector",
> "file":"/tmp/test.txt",
> "tasks.max":"1",
> "topic":"connect-test"
> }
> }' \
> http://localhost:8083/connectors

# 실행확인
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0/config$ curl -X GET http://localhost:8083/connectors/local-file-source/status
# {"name":"local-file-source","connector":{"state":"RUNNING","worker_id":"127.0.1.1:8083"},"tasks":[{"id":0,"state":"RUNNING","worker_id":"127.0.1.1:8083"}],"type":"source"}

# 커넥터 종료
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0/config$ curl -X DELETE http://localhost:8083/connectors/local-file-source
```


## 소스 커넥터

### 파일소스 커넥터 구현
- 로컬에 저장된 파일을 토픽으로 한줄씩 읽어 토픽으로 보내는 파일소스 커넥터 작성
- build.gradle에 connect-api 라이브러리와 빌드된 파일을 jar로 압축하기 위한 스크립트 작성
- 카프카 커넥터를 직접 개발하고 플러그인으로 커넥트에 추가할 때 주의할점은 사용자가 직접 작성한 클래스뿐만 아니라 참조하는 라이브러리도 함께 빌드하여 jar로 압축

[소스](https://github.com/bjpublic/apache-kafka-with-java/tree/master/Chapter3/3.6%20kafka-connector/simple-source-connector)

### 실행

1. 자르 생성  

![17](/image/2024/kafka/17.png)

2. 커넥트 플러그인 디렉토리 생성 및 자르 넣기
```sh
sudo mkdir -p /usr/local/share/kafka/plugins
sudo cp /mnt/c/simple-source-connector-1.0.jar /usr/local/share/kafka/plugins
```

3. 분산모드 커넥터 실행
```sh
bin/connect-distributed.sh config/connect-distributed.properties # 분산모드 커넥터 실행
curl -X GET http://localhost:8083/connector-plugins # 실행가능 플러그인 조회
```
```
# 추가 된 것을 확인할 수 있다 !
[{"class":"com.example.SingleFileSourceConnector","type":"source","version":"1.0"}, 
{"class":"org.apache.kafka.connect.file.FileStreamSinkConnector","type":"sink","version":"2.5.0"}, 
{"class":"org.apache.kafka.connect.file.FileStreamSourceConnector","type":"source","version":"2.5.0"}, 
{"class":"org.apache.kafka.connect.mirror.MirrorCheckpointConnector","type":"source","version":"1"},{"class":"org.apache.kafka.connect.mirror.MirrorHeartbeatConnector","type":"source","version":"1"}, 
{"class":"org.apache.kafka.connect.mirror.MirrorSourceConnector","type":"source","version":"1"}]
```

```sh
# SingleFileSourceConnector 실행
curl -X POST -H "Content-Type: application/json" \
--data '{
"name":"single-file-source",
"config":{
"connector.class":"com.example.SingleFileSourceConnector",
"tasks.max":"1"
}
}' \
http://localhost:8083/connectors

# 실행확인
curl -X GET http://localhost:8083/connectors/single-file-source/status

# /tmp/kafka.txt 수정

# 조회
bin/kafka-console-consumer.sh --bootstrap-server my-kafka:9092 \
--topic test \
--from-beginning
```

## 싱크 커넥터
- 토픽의 데이터를 타깃 애플리케이션으로 저장
[소스](https://github.com/bjpublic/apache-kafka-with-java/tree/master/Chapter3/3.6%20kafka-connector/simple-sink-connector)

## 미러메이커2
- 두개의 카프카 클러스터간에 토픽을 복제하는 애플리케이션
