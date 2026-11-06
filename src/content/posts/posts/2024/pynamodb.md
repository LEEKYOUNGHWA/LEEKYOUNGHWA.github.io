---
title: "pynamodb 삽질기..."
section: study
lastUpdated: "2024/11/17 20:30:00"
subTitle: "바보는 이걸 이해하는데 상당히 오랜 시간이 걸렸다"
image: "https://img.icons8.com/?size=512&id=TtXEs5SeYLG8&format=png"
tags: ["flask"]
---

## 들어가며...

- 일단 nosql DB이다 RDB적인 마인드셋을 바꿔야한다
- hash키랑 partition 키는 동일하다.
- 정렬이 지랄맞... 정렬 키를 잘 잡아줘야 한다. hash키랑 range키, LSI는 한번 잡으면 수정이 불가한데 크나큰 복병이다 설계를 잘 해줘야 한다
- GSI는 돈도 더 내고 많이 쓰면 성능상 좋지 않다고 하니 가급적이면 안쓰는 쪽이 좋다고는 하지만 쓸 수 밖에 없는 구조인거 같긴 하다. (그래.. 모든것은 다 돈이다..!) 
근데 삽질 하다 보니 안쓰면서 원하는 방향으로 개발이 가능하다?! 잘 몰라서 gsi 범벅으로 개발을 했었다 조금만 더 생각해보면 답이 나온다
- Partition Key가 동일한 데이터는 같은 파티션에 저장되나 in-out 순서가 보장되거나 하지 않는다(카프카 적인 마인드 셋도 버리자!) 이것도 또 염두해 둬야 한다....
- 시퀀스라는 개념은 버리자 그딴건 없다..
- **최종 일관성(Eventual Consistency)** : 분산 시스템에서 데이터를 여러 노드에 분산하여 저장할 때, 시스템이 일시적으로 일관성이 없을 수 있지만 
결국에는 모든 복제본이 일관된 상태에 도달한다는 일관성 모델을 의미. 
이 모델은 고가용성과 성능을 우선시하는 시스템에서 사용됩니다. 카프카에서 봤다. 타임스탬프를 쓰는게 하나의 방안이다
- `정렬 필요없이 빠르게 pk로 조회하고 싶은 경우` : hash 키만 유니크 하게 사용
- `정렬, 질의 필요한 경우` :  hash + range 키 잡고 질의나 order 필요한 항목들을 LSI로 잡아주자

## 키랑 인덱스

- 해시키 (Partition Key): 
    테이블의 기본 키를 구성하는 첫 번째 부분으로, 항목을 고유하게 식별(Range 키가 있다면 중복 가능). 
    해시키는 데이터를 여러 파티션에 **분배**하는 데 사용됩니다.
- Range 키 (Sort Key): 
    해시키와 결합되어 항목을 고유하게 식별하는 두 번째 키(있어도 되고 없어도 된다).
    같은 해시키를 가진 항목들을 정렬하는 데 사용되며, 범위 기반 검색을 가능.
    예를 들어, timestamp가 Range 키라면, 특정 user_id에 대해 시간 순으로 데이터를 정렬할 수 있다.
    ***해시키와 레인지 키의 조합은 유니크 해야 한다! 같은 데이터가 또 들어온다면 덮어쓴다.*** 레인지키는 타임스탬프로 하는 것을 추천
- GSI (Global Secondary Index):
    기본 테이블의 키와 다른 방식으로 데이터를 조회할 수 있도록 하는 보조 인덱스.
    GSI는 해시키와 Range 키를 자유롭게 설정할 수 있어 다양한 조회 패턴을 지원.
    테이블 생성 이후에도 만들 수 있다.
    예를 들어, GSI로 email을 해시키로, created_at을 Range 키로 설정하여 이메일을 기준으로 데이터를 빠르게 조회할 수 있다.
- LSI (Local Secondary Index):
    테이블의 기본 키와 동일한 해시키를 사용하지만, 다른 Range 키를 사용하여 데이터를 조회하는 보조 인덱스.
    LSI는 테이블 생성 시에만 정의할 수 있으며, 같은 파티션 내에서만 검색할 수 있는 제한이 있다.
    예를 들어, user_id를 해시키로 사용하고, timestamp와 rating을 Range 키로 설정하여 특정 사용자의 다양한 데이터 범위를 조회할 수 있다. 한 테이블 안에 LSI 를 여러개 만들 수 있다 그런데 최대 5개 까지 가능.... (gsi로 유도하기 위한...계략인가..?)

> range키는 테이블 전체 정렬기준, LSI는 Partition Key 내에서 여러 다른 정렬 기준을 사용해 다양한 방식으로 쿼리..!

## 조회 방법
ORM 쓸때 cud는 뭐 어찌저찌 하면 되는데 R이 지랄맞...  
일단 batch operation은 버리자. 기능이 제한적이라 실 사용할 일이 없을거 같다.  
바보는 [이걸](https://pynamodb.readthedocs.io/en/stable/indexes.html#pagination-and-last-evaluated-key) 이해하는데 상당한 오랜 시간이 걸렸다. 
그도 그럴것이 위에 개념을 뒤늦게 깨달았기 때문...  
정렬 하면서 페이징 하기 위해서는 반드시 해시키와 레인지 키를 잡아주어야 한다.  

챗 지피티... 파이나모 디비 소스는 더럽게 못짠다 알려주는거 거진 다 틀린듯.. 안된다고 하면 그제서야 사과하는 x....   
살면서 죄송하다는 소리를 가장 많이 들은 일주일 이었다. 공식문서 보자.. 

```python
if last_evaluated_key is not None:
    last_evaluated_key=json.loads(last_evaluated_key.replace("'", '"'))
if limit is not None:
    limit = int(limit)
if done is not None:
    filter_condition = TodoModel.done == done

todos = TodoModel.query(email, filter_condition=filter_condition, limit=limit, last_evaluated_key=last_evaluated_key)

todos_iterator = list(todos)
last_evaluated_key = todos.last_evaluated_key
return {'todos': todos_iterator, 'last_index': last_evaluated_key}
```
***삽질 포인트..***
1. TodoModel.query() 첫번째 파라미터는 hash키임... 걍 키만 넣으면 된다 이것도 잘못 알려줘서 진짜 삽질을 얼마나 했는지
1. last_evaluated_key는 맨 마지막 항목 키임. 이걸 넣어주면 이 다음부터 조회 가능 limit 와 last_evaluated_key 를 사용해서 페이징 가능.
1. last_evaluated_key 조회해서 나온 값 그으대로 아무리 길고 괄호가 여러개 중첩되어도(처음 봤을때 이게 맞나 싶을거다 공식 문서 맨 밑에 적혀 있는데 바보라서 처음에 이해를 못함)따옴표만 빼고 그대로 넘겨서 json으로 변환해서 넘겨주어야 한다
1. last_evaluated_key 조회하기 위해서는 iterator 한번 돌려야 한다. list()든 for문이든 한번 돌려줘야함
1. limit로 조회 개수 정할 수 있다. (뭔가 페이징에 쓰는거 같이 생긴 다른 항목이 있었는데 걔는 사이즈였다 limit가 맞음...) limit 에는 int가 들어가야한다... int로 타입 캐스팅 무조건 해주자
1. filter_condition 을 넣을 수 있다. 여기서 필터링 하자 gsi 안쓰고 어지간한거 필터링 가능 여러개도 된다
