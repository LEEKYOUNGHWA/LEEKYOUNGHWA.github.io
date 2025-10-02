---
tags: ["java"]
lastUpdated: 2024/01/05 17:34:00
---

## 13. 제네릭

## 13.1 제네릭이란?

- 결정되지 않은 타입을 파라미터로 처리하고 실제 사용할 때 파라미터를 구체적인 타입으로 대체시키는 기능

```java
public class Box<T> {
	public T content;
}
public class GenericExample {
	public static void main(String[] args) {
		Box<String> box1 = new Box<>();
		box1.content = "안녕하세요";
		String str = box1.content;
		System.out.println(str);

		Box<Integer> box2 = new Box<>();
		box2.content = 100;
		int value = box2.content;
		System.out.println(value);
	}
}
```

## 13.2 제네릭 타입

- 제네릭 타입 :결정되지 않은 타입을 파라미터로 가지는 클래스와 인터페이스. 제네릭 타입은 선언부에 '<>' 부호가 붙고 그 사이에 타입 파라미터들이 위치한다.
