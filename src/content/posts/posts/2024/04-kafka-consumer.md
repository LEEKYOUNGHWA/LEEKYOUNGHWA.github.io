---
title: "컨슈머 API"
section: study
lastUpdated: "2024/10/08 14:43:00"
image: "https://velog.velcdn.com/images/gsun/post/64573b02-6890-4bf8-a50c-91210e6c9063/image.png"
tags: ["kafka"]
---

## 카프카 컨슈머 프로젝트 생성

클라이언트와 동일하게 프로젝트 생성

```java
public class SimpleConsumer {
    private final static Logger logger = LoggerFactory.getLogger(SimpleConsumer.class);
    private final static String TOPIC_NAME = "test";
    private final static String BOOTSTRAP_SERVICES = "my-kafka:9092";
    private final static String GROUP_ID = "test-group";

    public static void main(String[] args) {
        Properties configs = new Properties();
        configs.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVICES);
        configs.put(ConsumerConfig.GROUP_ID_CONFIG,GROUP_ID);
        configs.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        configs.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,StringDeserializer.class.getName());

        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(configs);
        consumer.subscribe(Arrays.asList(TOPIC_NAME));

        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(1));
            for(ConsumerRecord<String, String> record : records) {
                logger.info("{}",record);
            }
        }
    }
}
```

test에 데이터를 넣어주자

```sh
bin/kafka-console-producer.sh --bootstrap-server my-kafka:9092 --topic test
testMessage
```

출력확인
![16](/image/2024/kafka/16.png)


## 동기 오프셋 커밋
poll() 메서드 호출 이후 commitSync() 메서드를 호출하여 오프셋 커밋을 명시적으로 수행할 수 있다.

가장 마지막 레코드의 오프셋 기준으로 커밋
```java
// 명시적으로 오프셋 커밋 수행
configs.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false); 

KafkaConsumer<String, String> consumer = new KafkaConsumer<>(configs);
consumer.subscribe(Arrays.asList(TOPIC_NAME));

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(1));
    for(ConsumerRecord<String, String> record : records) {
        logger.info("{}",record);
    }
    consumer.commitSync(); // 파라미터가 들어가지 않으면 poll 메서드로 받은 가장 마지막 레코드의 오프셋을 기준으로 커밋
}
```

개별 레코드 단위로 매번 오프셋 커밋
```java
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(1));
    Map<TopicPartition, OffsetAndMetadata> currentOffset = new HashMap<>();

    for(ConsumerRecord<String, String> record : records) {
        logger.info("{}",record);
        currentOffset.put(new TopicPartition(record.topic(), record.partition()), new OffsetAndMetadata(record.offset() + 1, null));
    }
    consumer.commitSync(currentOffset); // poll 메서드로 받은 가장 마지막 레코드의 오프셋을 기준으로 커밋
```

## 비동기 오프셋 커밋
```java
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(1));
    Map<TopicPartition, OffsetAndMetadata> currentOffset = new HashMap<>();

    for(ConsumerRecord<String, String> record : records) {
        logger.info("{}",record);
    }
    consumer.commitAsync(
        new OffsetCommitCallback() {
            @Override
            public void onComplete(Map<TopicPartition, OffsetAndMetadata> offsets, Exception e) {
                if(e!=null){
                    System.err.println("Commit failed");
                } else {
                    System.err.print("Commit suceded");
                }
                if(e!=null){
                    logger.error("commit failed for offsets {}", offsets, e);
                }
            }
        }
    );
}
```

## 리밸런스 리스너를 가지는 컨슈머
- 리밸런스 : 컨슈머 그룹에서 컨슈머가 추가 또는 제거되면 파티션을 컨슈머에 재할당하는 과정
```java
public static void main(String[] args) {
    Properties configs = new Properties();
    configs.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVICES);
    configs.put(ConsumerConfig.GROUP_ID_CONFIG,GROUP_ID);
    configs.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
    configs.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,StringDeserializer.class.getName());
    configs.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);

    KafkaConsumer<String, String> consumer = new KafkaConsumer<>(configs);
    consumer.subscribe(Arrays.asList(TOPIC_NAME), new RebalanceListner());

    while (true) {
        ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(1));
        for(ConsumerRecord<String, String> record : records) {
            logger.info("{}",record);
            currentOffsets.put(new TopicPartition(record.topic(), record.partition()), new OffsetAndMetadata(record.offset() + 1, null));
            consumer.commitSync();
        }
    }
}

public static class RebalanceListner implements ConsumerRebalanceListener {

    @Override
    public void onPartitionsAssigned(Collection<TopicPartition> collection) {
        logger.warn("Partitions are assigned");
    }

    @Override
    public void onPartitionsRevoked(Collection<TopicPartition> collection) {
        logger.warn("partitions are revoked");
        consumer.commitSync(currentOffsets);
    }
}
```

## 컨슈머의 안전한 종료
```java
Runtime.getRuntime().addShutdownHook(new ShutDownThread());
.
.
.
try {
    while (true) {
        ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(1));

        for (ConsumerRecord<String, String> record : records) {
            logger.info("{}", record);
            currentOffsets.put(new TopicPartition(record.topic(), record.partition()), new OffsetAndMetadata(record.offset() + 1, null));
            consumer.commitSync();
        }
    }
} catch (WakeupException e) {
    logger.warn("wakeup consumer");
} finally {
    consumer.close(); // 카프카 컨슈머가 안전하게 종료되었음.
}

.
.
.
static class ShutdownThread extends Thread {
    public void run(){
        logger.info("shutdown hook");
        consumer.wakeup();
    }
}
```
