---
title: "Kafka broker + Spring boot kafka producer + Spring Kafka batch listner"
section: study
lastUpdated: "2024/10/28 09:22:00"
image: "https://velog.velcdn.com/images/gsun/post/64573b02-6890-4bf8-a50c-91210e6c9063/image.png"
tags: ["kafka"]
---

## 박M 저번 시간 피드백

1. 공통고민
2. 왜 를 고민하는 과정
3. java util화 component 화
4. 시나리오 타겟 우리 환경에서 이렇게 이렇게 그래서 나는 이걸 컴포넌트로 만들었다
5. 스토리 라인

## 시나리오 

1. 스프링 부트 카프카 프로듀서 사용하여 사용자가 인사정보 생성(localhost:8081)  
    
    1-1. api로 인사정보 1000건 전송 가정 하였을때 1000건 모두 직렬화 하여 한번에 카프카 전송  
    1-2. api로 인사정보 1000건 전송, 서버에서 루프 돌려서 인사정보 1건씩 카프카 전송  
    1-3. api로 단건 전송 1000번 실행, 카프카로 단건전송  

2. 카프카 브로커 전송(aws) 
3. 배치에서 실시간 전송 받음

## spring boot + kafka producer

```javascript
// arr
var arr = [];
for(var i=0;i<userCnt;i++){
    arr.push({"name":"이름"+i, "no":i}); // 갯수만큼 임의 더미 유저 생성
}
$.ajax({
    url: 'http://localhost:8081/sendKafka'
    , type: 'post'
    , dataType: 'json' // 데이터 타입을 Json으로 변경
    , contentType: 'application/json' // Content-Type을 Json으로 변경
    , data: JSON.stringify(arr) // JSON String으로 전환하여 보낸다.
    , success: function(response) {
    }
});

function sendDatasingle() {
    var userCnt = Number($("#user_name").val());
    alert("sendData");
    for(var i=0;i<userCnt;i++){
        var arr = {"name":"이름"+i, "no":i};
        $.ajax({
        url: 'http://localhost:8081/sendKafkasingle'
        , type: 'post'
        , contentType: 'application/json' // 데이터 타입을 Json으로 변경
        , data: JSON.stringify(arr) // JSON String으로 전환하여 보낸다.
        , success: function(response) {
        }
    });
    }
}
```

현재 gw api가 스프링 부트 이므로 스프링 부트에 카프카 프로듀서를 붙인다 가정

```
dependencies {
    implementation 'org.springframework.kafka:spring-kafka:2.5.10.RELEASE'
    implementation 'org.springframework.boot:spring-boot-starter-web:2.3.4.RELEASE'
    implementation 'com.google.code.gson:gson:2.8.6'
}
```

### 공통 모듈화

- common 패키지 아래 클래스 생성 `com.example.common.KafkaProducer.java`
- 템플릿 화 시켜서 클래스와 List클래스 둘다 한 함수로 전송 가능

```java
@Service
public class KafkaProducer {

    private final Logger logger = LoggerFactory.getLogger(KafkaProducer.class);

    private final KafkaTemplate<String, String> kafkaTemplate;

    public KafkaProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public <T> void send(String topic, T data) {
        Gson gson = new Gson();
        String jsonColorLog = gson.toJson(data);
        kafkaTemplate.send(topic, jsonColorLog).addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
            @Override
            public void onSuccess(SendResult<String, String> result) {
                logger.info("success"+result.toString());
            }

            @Override
            public void onFailure(Throwable ex) {
                logger.error(ex.getMessage(), ex);
            }
        });
    }
}
```


컨트롤러단에서 호출

```java
// 시나리오 1. 리스트 전송
@PostMapping("/sendKafka")
public void url(@RequestBody List<MemberVO> members) {
    this.kafkaProducer.send("select-color", members); 
}

// 시나리오 2. 인스턴스 하나 전송
@PostMapping("/sendKafka2")
public void sendKafka2(@RequestBody List<MemberVO> members) {
    members.forEach( memberVO -> this.kafkaProducer.send("select-color", memberVO)); 
}

// 시나리오 3. api 단건 전송
@PostMapping("/sendKafkasingle")
public void url(@RequestBody MemberVO member) {
    this.kafkaProducer.send("select-color", member);
}
```

## kafka batch listner

배치 리스너에서 실시간 전송 받음

```
dependencies {
    implementation 'org.springframework.kafka:spring-kafka:2.5.10.RELEASE'
    implementation 'org.springframework.boot:spring-boot-starter:2.4.0'
}
```

```java
@KafkaListener(topics = "select-color", groupId = "test-group-01")
public void batchListener(ConsumerRecords<String, String> records) { 
    records.forEach(record -> logger.info(record.toString()));
}
```

### +++ 오늘의 피드백

<div class="custom-block warning">
<p class="custom-block-title">feedback</p>

- 키값, 라스트 원, 내가 원하는값만 가져오고 싶을때, 옮긴 데이터만 알고 싶을때
- 변화된 데이터를 어떻게 판단? 뭘로? (레거시 에서 요청했을대 한사람꺼 변한거 전체 다)
- 식별할 수 있는 키값 정의! 
- 수명주기 & 키 값 건드리면 안되 자동으로 없어지라고 그래서 이중에서 최근걸 찾을수 있어야 
- 전문정의서 : json 항목 파라미터는 뭔지 url은 뭔지 타입 
- 레디스 & 카우치베이스 거의 똑같다
- 다음주중으로 키값 고민

</div>
- [카프카 메시지 Key의 역할](https://jinyes-tistory.tistory.com/328)
