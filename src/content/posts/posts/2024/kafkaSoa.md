---
title: "kafka vs reddis vs couchbase"
section: posts
lastUpdated: "2024/11/05 15:46:00"
image: "https://velog.velcdn.com/images/gsun/post/64573b02-6890-4bf8-a50c-91210e6c9063/image.png"
tags: ["kafka"]
---

2000년대 초에 등장했던 SOA 의 핵심 구성요소중 하나인 ESB 를 쉽게 구현할 수 있다. 
지금으로 비교하면 SOA (=MSA) + ESB (=Kafka) 구조가 이와 유사하다.

- [SOA(service-oriented architecture)](https://www.ibm.com/kr-ko/topics/soa) : 애플리케이션 간의 종속성을 줄여주는 느슨한 결합을 제공
- [ESB (Enterprise Service Bus)](https://www.ibm.com/kr-ko/topics/esb) : ESB는 물리적으로 분산된 서비스 component 들을 통합여여 연동할 수 있도록 표준화된 메시지 버스와 프로토콜을 이용해서 서로 연동할 수 있는 시스템

# kafka vs reddis vs couchbase
- [https://aws.amazon.com/ko/compare/the-difference-between-kafka-and-redis/](https://aws.amazon.com/ko/compare/the-difference-between-kafka-and-redis/)

***Kafka와 Redis는 다르게 작동합니다.***
|kafka|redis|
|--|--|
|서로 독립적으로 데이터를 스트리밍할 수 있게 해주는 이벤트 스트리밍 플랫폼|Redis는 애플리케이션 간 지연 시간이 짧은 데이터 전송을 지원하는 인 메모리 데이터베이스|
|Apache Kafka는 컴퓨팅 클러스터를 통해 생산자와 소비자를 연결합니다.|Redis는 클라이언트-서버 아키텍처를 사용하여 NoSQL 데이터베이스 시스템으로 실행됩니다. |

- [Couchbase vs Kafka: What are the differences?](https://stackshare.io/stackups/couchbase-vs-kafka)

|kafka|Couchbase|
|--|--|
|실시간 데이터 스트리밍, 처리 및 분석을 위해 설계된 분산 스트리밍 플랫폼|Couchbase는 데이터 저장, 검색 및 관리에 중점을 둔 NoSQL 데이터베이스로|
|고처리량 데이터 스트리밍과 최종 일관성을 우선시|강력한 일관성을 제공|
|데이터 스트림의 실시간 처리를 가능하게 하여 분산 방식으로 데이터 변환, 필터링 및 분석|데이터 검색, 저장 및 쿼리 기능을 제공하는 데 중점|
|Kafka는 데이터를 디스크에 지속하지만 장기 데이터 저장에 초점을 맞추지 않습니다|Couchbase는 데이터를 디스크에 지속적으로 저장|

# 카프카 키?

- [kafka-search-record-with-a-given-key](https://community.zenduty.com/t/kafka-search-record-with-a-given-key/550)
![kafkakey?](/image/2024/kafka/19.png)

- [카프카 메시지 Key의 역할](https://jinyes-tistory.tistory.com/328)
> Key는 메시지의 종류를 나타날 때 사용하고, 데이터의 처리 순서와 밀접한 관련이 있다. 동일한 키를 동일한 파티션으로 보내는 것이 주요한 목적이다. 간단한 예시로, 토픽의 파티션 개수가 2개 이상이 되는 순간 오프셋의 순서를 보장할 수가 없다. 따라서 트랜잭션 데이터의 순서가 뒤바뀔 수 있는 위험이 존재한다. 이때 레코드의 Primary와 같은 고유값을 키로 이용한다면 동일한 파티션으로만 전송하게 되므로 특정 파티션의 바틀넥 현상에 의해서 순서가 역전되는 문제를 회피할 수 있다.  uuid를 Key로 주어서 user_data 토픽에 전송하는 경우 동일한 Key를 가진 데이터는 지정된 하나의 파티션에만 전송이 되므로 데이터의 순서를 보장할 수 있게 된다.  

> 카프카 메시지 키를 사용할 때 주의할 점은 잘못 사용하는 하는 경우 파티션 하나에 트래픽이 과도하게 몰리게 된다. 경우에 따라서 프로듀서가 제공하는 오토 로드 밸런싱을 사용하는 것이 더 나은 선택지가 될 수 있다. 오토 로드 밸런싱을 사용하고자 하는 경우 키 값을 "null" 로 사용하면 된다.

# esb eai
- [ESB-Enterprise-Service-Bus](https://iuna.tistory.com/entry/ESB-Enterprise-Service-Bus-%EA%B0%9C%EB%85%90-EAI%EC%99%80-%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%97%90-%EB%8C%80%ED%95%B4)
- [모듈연계](https://ee-22-joo.tistory.com/3)
- [MCI, EAI, ESB, FEP](https://velog.io/@wmc1205/IT%EC%9A%A9%EC%96%B4-MCI-EAI-ESB-FEP)
- [인터페이스 모듈 연계 방식 EAI와 ESB](https://devpanda.tistory.com/70)


- [https://www.confluent.io/en-gb/kafka-vs-pulsar/](https://www.confluent.io/en-gb/kafka-vs-pulsar/)
- [event-streaming-vs-related-trends](https://developer.confluent.io/learn/event-streaming-vs-related-trends/)
