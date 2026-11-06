---
title: "카프카 스트림즈"
section: study
lastUpdated: "2024/10/11 11:24:00"
image: "https://velog.velcdn.com/images/gsun/post/64573b02-6890-4bf8-a50c-91210e6c9063/image.png"
tags: ["kafka"]
---

## 스트림즈DSL - stream(), to()

```java
public class SimpleStreamsApplication {
    private static String APPLICATION_NAME = "streams-application"; // 스트림즈 애플리케이션의 애플리케이션 아이디 지정
    private static String BOOTSTRAP_SERVICES = "my-kafka:9092"; // 스트림즈 애플리케이션과 연동할 카프카 클러스터 정보
    private static String STREAM_LOG = "stream_log";
    private static String STREAM_LOG_FILTER = "stream_log_filter";

    public static void main(String[] args) {

        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, APPLICATION_NAME);
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVICES);
        // 스트림 처리를 위해 메시지 키와 메시지 값의 역직렬화, 직렬화 방식을 지정
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        StreamsBuilder builder = new StreamsBuilder(); // 스트림 토폴로지 정의
        KStream<String, String> streamLog = builder.stream(STREAM_LOG); // KStream 객체 생성
        streamLog.filter((key,value) -> value.length() >5).to(STREAM_LOG_FILTER);

        KafkaStreams streams = new KafkaStreams(builder.build(), props); // KafkaStreams 인스턴스 생성.
        streams.start(); // 인스턴스 실행. stream_log 토픽의 데이터를 stream_log_copy 토픽으로 전달한다
    }
}
```

```sh
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0$ bin/kafka-console-producer.sh --bootstrap-server my-kafka:9092 \
> --topic stream_log
>weet
>hellohello
>streams

lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0$ bin/kafka-console-consumer.sh --bootstrap-server my-kafka:9092 \
> --topic stream_log_filter --from-beginning
hellohello
streams
```

## 스트림즈DSL - KTable과 KStream을 join()

토픽 생성

```sh
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0$ bin/kafka-topics.sh --create --bootstrap-server my-kafka:9092 --partitions 3 --topic address
Created topic address.
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0$ bin/kafka-topics.sh --create --bootstrap-server my-kafka:9092 --partitions 3 --topic order
Created topic order.
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0$ bin/kafka-topics.sh --create --bootstrap-server my-kafka:9092 --partitions 3 --topic order_join
Created topic order_join.
```

```java
public class KStreamJoinTable {
    private static String APLICATION_NAME = "order-join-application";
    private static String BOOTSTRAP_SERVICES = "my-kafka:9092";
    private static String ADDRESS_TABLE = "address";
    private static String ORDER_STREAM = "order";
    private static String ORDER_JOIN_STREAM = "order_join";

    public static void main(String[] args) {

        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, APLICATION_NAME);
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVICES);
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        StreamsBuilder builder = new StreamsBuilder();
        KTable<String, String> addressTable = builder.table(ADDRESS_TABLE);
        KStream<String, String> orderStream = builder.stream(ORDER_STREAM);

        orderStream.join(addressTable, (order, address) -> order + " send to " + address).to(ORDER_JOIN_STREAM);

        KafkaStreams streams = new KafkaStreams(builder.build(), props);
        streams.start();
    }
}
```

```sh
bin/kafka-console-producer.sh --bootstrap-server my-kafka:9092 \
> --topic address \
> --property "parse.key=true" \
> --property "key.separator=:"
>wonyoung:jeju
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0$ bin/kafka-console-producer.sh --bootstrap-server my-kafka:9092 \
> --topic order \
> --property "parse.key=true" \
> --property "key.separator=:"
>wonyoung:Tesla
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0$ bin/kafka-console-consumer.sh --bootstrap-server my-kafka:9092 \
--topic order_join --property print.key=true --property key.separator=":" --from-beginning
wonyoung:Teslasend to jeju
```

## 스트림즈DSL - GlobalKTable과 KStream을 join()
파티션 개수가 다른 2개의 토픽을 조인
```sh
# 파티션 2개인 토픽 생성
bin/kafka-topics.sh --create --bootstrap-server my-kafka:9092 --partitions 2 --topic address_v2
```

```java
public class KStreamJoinGlobalKTable {
    private static String APPLICATION_NAME = "glbal-table-join-application";
    private static String BOOTSTRAP_SERVERS = "my-kafka:9092";
    private static String ADDRESS_GLOBAL_TABLE = "address_v2";
    private static String ORDER_STREAM = "order";
    private static String ORDER_JOIN_STREAM = "order-join";

    public static void main(String[] args) {

        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, APPLICATION_NAME);
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        StreamsBuilder builder = new StreamsBuilder();
        GlobalKTable<String,String> addressGlobalTable = builder.globalTable(ADDRESS_GLOBAL_TABLE);
        KStream<String, String> orderStream = builder.stream(ORDER_STREAM);

        orderStream.join(addressGlobalTable,
                (orderKey, orderValue) -> orderKey, // GlobalKTable은 레코드를 매칭할 때 KStream의 메시지 키와 메시지 값 둘 다 사용할 수 있다. 여기서는 키와 매칭하도록 설정
                (order,address) -> order + " send to " + address)
                .to(ORDER_JOIN_STREAM);

        KafkaStreams streams;
        streams = new KafkaStreams(builder.build(), props);
        streams.start();
    }
}
```

```sh
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0$ bin/kafka-console-producer.sh --bootstrap-server my-kafka:9092 \
> --topic address_v2 \
> --property "parse.key=true" \
> --property "key.separator=:"
>wonyoung:Seoul
>somin:Busan
lkh@DESKTOP-1L2VEPP:~/kafka_2.12-2.5.0$ bin/kafka-console-producer.sh --bootstrap-server my-kafka:9092 --topic order --prope
rty "parse.key=true" --property "key.separator=:"
>somin:Porsche
>wonyoung:BMW
```

## 프로세서 API

토폴로지 기준으로 데이터를 처리한다는 관점에서 스트림즈DSL과 동일한 역할. 상세 로직의 구현이 필요하다면 프로세서 API를 활용한다. 프로세서 API에는 KStream, KTable, GlobalKTable 개념이 없다.

```java
public class FilterProcessor implements Processor<String, String> {

    private ProcessorContext context;

    @Override
    public void init(ProcessorContext context) {
        this.context = context;
    }

    @Override
    public void process(String key, String value) {
        if(value.length()>5) {
            context.forward(key,value);
        }
        context.commit();
    }

    @Override
    public void close() {

    }
}
```
```java
public class SimpleKafkaProcessor {

    private static String APPLICATION_NAME = "processor-application";
    private static String BOOTSTRAP_SERVERS = "my-kafka:9092";
    private static String STREAM_LOG = "stream_log";
    private static String STREAM_LOG_FILTER = "stream_log_filter";

    public static void main(String[] args) {
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, APPLICATION_NAME);
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        Topology topology = new Topology();
        topology.addSource("Source", STREAM_LOG)
                .addProcessor("Process", () -> new FilterProcessor(),"Source")
                .addSink("Sink", STREAM_LOG_FILTER, "Process");

        KafkaStreams streaming = new KafkaStreams(topology,props);
        streaming.start();

    }
}
```
