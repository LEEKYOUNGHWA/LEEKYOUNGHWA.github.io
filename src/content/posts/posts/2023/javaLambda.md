---
title: "java lambda cheet sheet"
section: posts
lastUpdated: "2023/12/01 10:00:00"
subTitle: "java lambda cheet sheet"
tags: ["java"]
---

## filter map collect
```java
List<Integer> ilist = new ArrayList<>();
		int s = 0;
		for (int i=1;i<=10;i++) ilist.add(i);
		//stream filter map collect
		ilist = ilist.stream()
				.filter(i->i%2==1) // 조건에 맞는 수 찾기
				.map(i->i*i) // 찾은 수 처리하기
				.collect(Collectors.toList()); // 해당 수의 값을 새로운 리스트에 저장
		ilist.forEach(i->System.out.printf(i+ "\t"));
		System.out.println();
		s=ilist.stream().reduce(0, Integer::sum);
		System.out.println("1~10 사이의 홀수에 대한 제곱합" + s);
```
## stream
```java
List<Integer> ilist = new ArrayList<>();
int s=0;
for(int i=1;i<=100;i++) ilist.add(i);
// stream.reduce(accumulator) : stream의 요소를 하나의 데이터로 만듦.
// 초기값을 0으로하여 1과 100 사이 정수의 합을 구한다.
s=ilist.stream().reduce(0, Integer::sum); 
System.out.println("1~100의 합 " + s);
// 1~100 사이 홀수의 합
s=ilist.stream().filter(i->i%2==1).reduce(0, Integer::sum);
System.out.println("1~100 사이 홀수의 합 " + s);
s=ilist.stream().filter(i->i%2==1).reduce(0, (x,y)->x+y);
System.out.println("1~100 사이 홀수의 합 " + s);
s=ilist.stream().filter(i->i%2==1).reduce(0, 
    new BinaryOperator<Integer>() {
      @Override
      public Integer apply(Integer t, Integer u){
        return t+u;
      }
    });
System.out.println("1~100 사이 홀수의 합 " + s);
```
## enum
```java
public class enumtest {
	public enum PEI {
		PHYSICAL(23), EMOTIONAL(28), INTELLECTUAL(33);
		private final int peiValue;
		PEI(int pie){
			this.peiValue=pie;
		}
		public int getPei(){
			return peiValue;
		}
	}
	public static String textInFor(PEI index, double value){
		String result = "";
		switch (index) {
			case PHYSICAL : result = "신체지수" ; break;
			case EMOTIONAL : result = "감정지수"; break;
			case INTELLECTUAL : result = "지성지수"; break;
			default : result = "미결정"; break;
		}
		return result + (value*100);
		
	}
	public static void main(String[] args){
		PEI index = PEI.PHYSICAL;
		double value =0.86;
		System.out.println("신체지수수기값 " + index.getPei());
		String st = textInFor(index, value);
		System.out.println("st " + st);
		System.out.println("ordinal "+index.ordinal()); // 순서출력, 0번째이다.
		System.out.println("index name " + index.name());
		System.out.println("index " + index);
		System.out.println("index getPei "+index.getPei());
	}
}
```

## lambda
```java
List<Integer> mmlists = Arrays.asList(1,6,16,22,23,33);
mmlists.forEach(
  m-> {System.out.println(m+"\t");}
);
System.out.println();
Consumer<Integer> consume = (Integer m) -> {System.out.println(m+"\t");};
mmlists.forEach(consume);
```
