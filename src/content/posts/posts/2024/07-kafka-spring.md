---
title: "스프링 카프카"
section: study
lastUpdated: "2024/10/17 14:43:00"
image: "https://velog.velcdn.com/images/gsun/post/64573b02-6890-4bf8-a50c-91210e6c9063/image.png"
tags: ["kafka"]
---

## 스프링 카프카 프로듀서
```
dependencies {
    implementation 'org.springframework.kafka:spring-kafka:2.5.10.RELEASE'
    implementation 'org.springframework.boot:spring-boot-starter:2.4.0'
}
```

```java
@SpringBootApplication
public class SpringProducerApplication implements CommandLineRunner {

    private static String TOPIC_NAME = "test";

    // 스프링 카프카에서 제공하는 KafkaTemplate 객체 자동 주입. application.yml 에서 선언한 옵션값 자동 주입
    @Autowired
    private KafkaTemplate<Integer, String> template;

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(SpringProducerApplication.class);
        application.run(args);
    }

    @Override
    public void run(String... args) {
        for (int i = 0; i < 10; i++) {
            template.send(TOPIC_NAME, "test" + i); // 토픽 이름과 메시지 이름을 넣어 전송
        }
        System.exit(0); // 전송이 완료되면 종료
    }
}
```
### 커스텀 카프카 템플릿
[소스](https://github.com/bjpublic/apache-kafka-with-java/tree/master/Chapter4/4.4%20spring-kafka/spring-kafka-template-producer)
특별한건 없어보임

## 스프링 카프카 컨슈머 

### 레코드 리스너 활용
![18](/image/2024/kafka/18.png)
```java
@SpringBootApplication
public class SpringConsumerApplication {
    public static Logger logger = LoggerFactory.getLogger(SpringConsumerApplication.class);

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(SpringConsumerApplication.class);
        application.run(args);
    }

    // 가장 기본적인 리스너 선언
    @KafkaListener(topics = "test", groupId = "test-group-00")
    public void recordListener(ConsumerRecord<String, String> record) {
        logger.info(record.toString());
    }

    // 메시지 값을 파라미터로 받는 리스너
    @KafkaListener(topics = "test", groupId = "test-group-01")
    public void singleTopicListener(String messageValue) {
        logger.info(messageValue);
    }

    // 컨슈머 옵션 부여
    @KafkaListener(topics = "test", groupId = "test-group-02", properties = {"max.poll.interval.ms:60000", "auto.offset.reset:earliest"})
    public void singleTopicWithPropertiesListener(String messageValue) {
        logger.info(messageValue);
    }

    // 컨슈머 스레드 실행
    @KafkaListener(topics = "test", groupId = "test-group-03", concurrency = "3")
    public void concurrentTopicListener(String messageValue) {
        logger.info(messageValue);
    }

    // 특정 토픽의 특정 파티션만 구독
    @KafkaListener(topicPartitions = {@TopicPartition(topic = "test01", partitions = {"0", "1"}), @TopicPartition(topic = "test02", partitionOffsets = @PartitionOffset(partition = "0", initialOffset = "3"))}, groupId = "test-group-04")
    public void listenSpecificPartition(ConsumerRecord<String, String> record) {
        logger.info(record.toString());
    }
}
```

### 배치 리스너 활용

```java
@SpringBootApplication
public class SpringConsumerApplication {
    public static Logger logger = LoggerFactory.getLogger(SpringConsumerApplication.class);

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(SpringConsumerApplication.class);
        application.run(args);
    }
    // 1. ConsumerRecords 파라미터로 받음
    @KafkaListener(topics = "test", groupId = "test-group-01")
    public void batchListener(ConsumerRecords<String, String> records) { 
        records.forEach(record -> logger.info(record.toString()));
    }

    // 2. List 자료구조로 받음
    @KafkaListener(topics = "test", groupId = "test-group-02")
    public void batchListener(List<String> list) {
        list.forEach(recordValue -> logger.info(recordValue));
    } 
    
    // 3. 2개 이상의 컨슈머 스레드로 배치 리스너 운영
    @KafkaListener(topics = "test", groupId = "test-group-03", concurrency = "3")
    public void concurrentBatchListener(ConsumerRecords<String, String> records) { //3
        records.forEach(record -> logger.info(record.toString()));
    }
}
```

### 배치 커밋 리스너, 배치 컨슈머 리스너
```java
@SpringBootApplication
public class SpringConsumerApplication {
    public static Logger logger = LoggerFactory.getLogger(SpringConsumerApplication.class);


    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(SpringConsumerApplication.class);
        application.run(args);
    }

    // AckMode를 MANUAL 또는 MANUAL_IMMEDIATE로 사용할 경우에는 수동 커밋을 하기 위해 파라미터로 Acknowledgment 인스턴스를 받아야 한다.
    @KafkaListener(topics = "test", groupId = "test-group-01")
    public void commitListener(ConsumerRecords<String, String> records, Acknowledgment ack) {
        records.forEach(record -> logger.info(record.toString()));
        ack.acknowledge(); // 커밋 수행
    }

    // 
    @KafkaListener(topics = "test", groupId = "test-group-02")
    public void consumerCommitListener(ConsumerRecords<String, String> records, Consumer<String, String> consumer) {
        records.forEach(record -> logger.info(record.toString()));
        consumer.commitSync(); // 원하는 타이밍에 커밋 가능 (commitSync, commitAsync)
    }
}
```
