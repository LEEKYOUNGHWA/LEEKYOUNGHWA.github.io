---
title: "02. 자바의 절차적/구조적 프로그래밍"
section: study
lastUpdated: "2024/01/24 04:53:49"
tags: ["java"]
---

- 프로그램이 실행될 때 프로그램이 메모리를 사용하는 방식  
  ![프로그램이 메모리를 사용하는 방식](/image/oopInSpring/chap02/002.jpg)
- 객체 지향 프로그램에서는 데이터 저장 영역을 다시 세개의 영역으로 분할해서 사용  
  ![객체지향프로그램의 메모리 사용 방식](/image/oopInSpring/chap02/003.jpg)
- T메모리 구조 - 책에서 데이터 저장 영역을 T메모리로 지칭함. (T처럼 보여서..)
  ![T메모리 구조](/image/oopInSpring/chap02/004.jpg)

## 다시보는 main() 메서드: 메서드 스택 프레임

```java
public class Start {
	public static void main(String[] args) {
		System.out.println("Hello OOP!!!");
	}
}
```

- JRE는 먼저 프로그램안에 main() 메서드가 있는지 확인한다. -> Start 클래스에서 main() 메서드 발견
- main() 메서드의 존재가 확인되면 JRE는 프로그램 실행을 위한 사전 준비에 착수한다 (가상의 기계인 JVM에 전원을 넣어 부팅)
- 부팅된 JVM은 목적파일을 받아 그 목적 파일을 실행한다.
- 전처리 진행 : JVM은 가장 먼저 java.lang 패키지를 T메모리의 스태틱 영역에 가져다 놓는다.

  > **java.lang**
  >
  > - 모든 자바 프로그램이 반드시 포함하게 되는 패키지
  > - java.lang 패키지가 있기에 System.out.pringln() 같은 메서드를 쓸 수 있게 됨.

  - 메서드 실행준비 1단계 : java.lang 패키지를 T 메모리 스태틱 영역에 배치
    ![메서드 실행준비 1단계 : java.lang 패키지를 T 메모리 스태틱 영역에 배치](/image/oopInSpring/chap02/005.jpg)
  - 메서드 실행준비 2단계 : 클래스와 임포트 패키지를 T 메모리 스태틱 영역에 배치  
    ![메서드 실행준비 2단계 : 클래스와 임포트 패키지를 T 메모리 스태틱 영역에 배치](/image/oopInSpring/chap02/006.jpg)

- main() 메서드가 놀기 위해 스택프레임(stack frame)이 스택(메서드들의 놀이터) 영역에 할당된다. (클래스 정의를 시작하는 여는 중괄호 빼고 여는 중괄호를 만날 때 마다 스택 프레임이 하나씩 생긴다.)
  ![main() 메서드 스택 프레임](/image/oopInSpring/chap02/007.jpg)
- 메서드의 인자 args를 저장할 변수 공간을 스택 프레임의 맨 밑에 확보
  ![메서드의 인자 args를 저장할 변수 공간을 스택 프레임의 맨 밑에 확보](/image/oopInSpring/chap02/008.jpg)
- main() 메서드 안의 첫 명령문 실행
  : System.out.prinln("Hello OOP!!!") 구문 실행 되도 T메모리에는 변화 없음. 메모리에서 코드 실행 공간을 별도로 있기 때문.  
  ![System.out.println구문을 실행한 후](/image/oopInSpring/chap02/009.jpg)
- main() 메서드의 끝을 나타내는 닫는 중괄호를 만나면 스택 프레임이 소멸된다.  
  ![main()메서드 종료 이후의 T메모리 상태](/image/oopInSpring/chap02/010.jpg)
- main() 메서드가 끝나면 JRE는 JVM을 종료하고 JRE 자체도 운영체제 상의 메모리에서 사라지고 T메모리도 사라짐.
- IDE에서 T메모리 구조를 엿볼 수 있는 방법 : 상단 좌측 main() 메서드의 스택프레임이 생성되어 있고, 상단 우측 main() 메서드 스택프레임 내부의 지역변수 확인 할 수 있다.
  ![IDE에서 T메모리 구조를 엿볼 수 있는 방법](/image/oopInSpring/chap02/011.jpg)

## 변수와 메모리: 변수! 너 어디 있니?

```java
public class Start2 {
	public static void main(String[] args) {
		int i;
		i = 10;

		double d = 20.0;
	}
}
```

- 2번째 줄 실행한 후 T 메모리의 상태  
  ![2번째 줄 실행한 후 T 메모리의 상태](/image/oopInSpring/chap02/012.jpg)
- 3번째 줄 실행한 후 T 메모리의 상태  
  ![3번째 줄 실행한 후 T 메모리의 상태](/image/oopInSpring/chap02/013.jpg)
- 4번째 줄 실행한 후 T 메모리의 상태  
  ![4번째 줄 실행한 후 T 메모리의 상태](/image/oopInSpring/chap02/014.jpg)
- 6번째 줄 실행한 후 T 메모리의 상태  
  ![6번째 줄 실행한 후 T 메모리의 상태](/image/oopInSpring/chap02/015.jpg)
- 7번째 줄의 닫는 중괄호로 main()메서드 스택 프레임이 스택 영역에서 사라진다. 즉 프로그램이 종료된다

## 블록 구문과 메모리: 블록 스택 프레임

```java
public class Start3 {
	public static void main(String[] args) {
		int i = 10;
		int k = 20;

		if(i == 10) {
			int m = k + 5;
			k = m;
		} else {
			int p = k + 10;
			k = p;
		}

		//k = m + p;
	}
}
```

- 5번째 줄을 실행한 후 T 메모리  
  ![5번째 줄 실행한 후 T 메모리의 상태](/image/oopInSpring/chap02/017.jpg)
- 6번째 줄의 if문 조건을 판단한 후, if 블록 스택 프레임을 생성  
  ![6번째 줄의 if문 조건을 판단한 후, if 블록 스택 프레임을 생성](/image/oopInSpring/chap02/018.jpg)
- 7번째 줄을 분할하고 int m을 실행한 후의 T 메모리  
  ![7번째 줄을 분할하고 int m을 실행한 후의 T 메모리](/image/oopInSpring/chap02/019.jpg)
- 7번째 줄을 실행한 후 T메모리  
  ![7번째 줄을 실행한 후 T메모리](/image/oopInSpring/chap02/020.jpg)
- 8번째 줄을 실행한 후 T메모리  
  ![8번째 줄을 실행한 후 T메모리](/image/oopInSpring/chap02/022.jpg)
- 9번째 줄의 닫는 중괄호를 실행한 후 T메모리  
  ![9번째 줄의 닫는 중괄호를 실행한 후 T메모리](/image/oopInSpring/chap02/023.jpg)
- 15번째 줄 실행한 후 스택프레임 소멸, T메모리 소멸, JVM 가동중지, JRE가 사용했던 시스템 자원 원영체제에 반납

## 지역 변수와 메모리: 스택 프레임에 갇혔어요!

- 지역변수 : 스택 영역안, 스택 프레임 안. 스택프레임이 사라지면 함께 사라진다
- 클래스 멤버 변수 : 스태틱 영역. 스태틱 영역에 한번 자리잡으면 JVM이 종료될 때 까지 고정된(static) 상태로 그 자리를 지킨다.
- 객체 멤버 변수 : 힙 안. 객체 멤버 변수들은 객체와 함께 가비지 컬렉터라고 하는 힙 메모리 회수기에 의해 일생을 마치게 된다.

## 메서드 호출과 메모리: 메서드 스택 프레임 2

```java
public class Start4 {
	public static void main(String[] args) {
		int k = 5;
		int m;

		m = square(k);
	}

	private static int square(int k) {
		int result;

		k = 25;

		result = k;

		return result;
	}
}
```

- 5번째 줄이 끝났을때 T 메모리 스냅샷  
  ![5번째 줄이 끝났을때 T 메모리 스냅샷](/image/oopInSpring/chap02/027.jpg)
- 6번째 줄에서 square() 호출, 제어흐름이 square() 메서드가 선언된 9번째 줄로 이동
- 11번째 줄을 실행한 후 T 메모리 : 메서드 호출이 일어나면 스택 프레임이 T메모리 스택 영역에 새로 생성된다. square() 메서드 스택프레임에는 반환값(square() 메서드가 종료되면셔 반환해줄 값을 가지고 있는 가상의 변수)을 저장할 변수 공간이 맨 아래, 그다음 인자를 저장할 변수공간, 마지막으로 메서드의 지역 변수가 자리 잡는다.  
  ![11번째 줄을 실행한 후 T 메모리](/image/oopInSpring/chap02/028.jpg)
- 12번째 줄을 실행한 후 T 메모리  
  ![12번째 줄을 실행한 후 T 메모리](/image/oopInSpring/chap02/029.jpg)
- 14번째 줄을 실행하고 나면 result 변수에 25 저장
- 16번째 줄을 실행한 후 T 메모리  
  ![16번째 줄을 실행한 후 T 메모리](/image/oopInSpring/chap02/030.jpg)
- 17번째 줄에서 square() 메서드의 끝을 알리는 닫는 중괄호를 만나면 square() 메서드 스택 프레임은 스택에서 사라진다. 그런데 반환값이 있으니 그 값을 돌려주면서 스택에서 사라진다.
- 6번째 줄을 실행한 후 T 메모리  
  ![6번째 줄을 실행한 후 T 메모리](/image/oopInSpring/chap02/031.jpg)
- 7번째 줄의 닫는 중괄호를 만나면 역시 스택프레임 하나가 또 사라진다. 그리고 프로그램 종료

> **매서드 블랙박스화**  
> 입력값들 (인자 리스트) 와 반환값에 의해서나 메서드 사이에서 값이 전달될 뿐 서로 내부의 지역 변수를 볼 수 없다.  
> ![메서드 스택 프레임에서 다른 메서드 스택 프레임의 내부 변수는 접근 불가](/image/oopInSpring/chap02/032.jpg)

- 메서드를 호출할 때마다 해당 메서드의 스택프레임이 생김.
- call by value : 메서드를 호출하면서 인자로 전달되는것은 변수 자체가 아니라 값만 복제해서 전달
- 메서드 사이에 값을 전달하거나 반환하는 방법은 메서드의 인자와 반환값으로만 가능. 전역변수(공유변수) 는 가급적 사용하지 않는 것이 좋다.

## 전역 변수와 메모리: 전역 변수 쓰지 말라니까요!

```java
public class Start5 {
	static int share;

	public static void main(String[] args) {
		share = 55;

		int k = fun(5, 7);

		System.out.println(share);
	}

	private static int fun(int m, int p) {
		share = m + p;

		return m - p;
	}
}
```

- 4번째 줄을 실행하기 전 T 메모리  
  ![4번째 줄을 실행하기 전 T 메모리](/image/oopInSpring/chap02/033.jpg)
  - share 변수에 static 키워드가 붙어있다. 그래서 share 변수는 T메모리의 스태틱 영역에 변수공간이 할당된다. Start5 클래스가 T 메모리 스태틱 영역에 배치될 때 그 안에 share 변수가 클래스의 멤버로 공간을 만들어 저장된다.
- 4번째 줄을 실행하고 나면 T메모리에 main()메서드 스택 프레임이 만들어진다.
- 5번째 줄을 실행한 후 T메모리  
  ![5번째 줄을 실행한 후 T 메모리](/image/oopInSpring/chap02/034.jpg)
- 7번째 줄을 실행하기 위해 main() 메서드 스택프레임에 k 변수 공간이 만들어진다. 이어서 제어는 fun()메서드가 있는 12번째 줄로 넘어간다. 그럼 fun()메서드 스택프레임이 생성되고 인자값들과 반환값을 저장할 변수 공간도 생긴다.
- 12번째 줄을 실행한 후 T메모리  
  ![12번째 줄을 실행한 후 T메모리](/image/oopInSpring/chap02/035.jpg)
- 13번째 줄을 실행한 후 T메모리  
  ![13번째 줄을 실행한 후 T메모리](/image/oopInSpring/chap02/036.jpg)
- 15번째 줄을 실행한 후 T메모리  
  ![13번째 줄을 실행한 후 T메모리](/image/oopInSpring/chap02/038.jpg)
- 16번째 줄의 닫는 중괄호를 만나면 fun() 메서드 스택프레임이 사라지면서 호출된 곳으로 반환값을 돌려준다. 이때 제어는 fun()메서드를 호출했던 7번째 줄로 이동한다.
  ![7번째 줄을 실행한 후 T메모리](/image/oopInSpring/chap02/039.jpg)
- 8번째 줄의 닫는 중괄호를 만나면 main()메서드 스택프레임이 사라지고 main() 메서드 종료, T메모리 반납

> 지역변수 : 스택프레임에 종속적  
> 전역변수 : 스택프레임에 독립적  
> 프로젝트 규모가 커질수록 전역 변수에 저장된 값 파악하기 쉽지 않음.
> 읽기 전용으로 값을 공유해서 전역상수로 쓰는것은 추천

## 멀티 스레드/ 멀티 프로세스의 이해

- 멀티 스레드(Multi Thread) 의 T 메모리 모델은 스택 영역을 스레드 개수만큼 분할해서 쓰는 것.
  ![멀티 스레드는 스택 영역을 스레드 개수만큼 분할해서 사용](/image/oopInSpring/chap02/040.jpg)
- 멀티 프로세스(Multi Process)는 다수의 데이터 저장 영역, 즉 다수의 T 메모리를 갖는 구조
  ![멀티 프로세스(Multi Process)는 다수의 T메모리를 사용](/image/oopInSpring/chap02/041.jpg)
- 멀티 프로세스는 프로세스마다 각자의 T메모리가 있고 각자 고유의 공간이므로 서로 참조할 수없다. 멀티 프로세스는 하나의 프로세스가 다른 프로세스의 T메모리 영역을 절대 침범할 수 없는 메모리 안전한 구조 이지만 메모리 사용량은 그만큼 크다.
- 멀티 스레드는 하나의 T메모리만 사용하는데 스택 영역만 분할해서 사용하는 구조다. 멀티 스레드는 하나의 T메모리 안에서 스택 영역만 분할한 것이기 때문에 하나의 스레드에서 다른 스레드의 스택 영역에는 접근할 수 있지만 스태틱 영역과 힙 영역은 공유해서 사용하는 구조. 멀티 프로세스 대비 메모리 적게 사용
- 멀티 스레드의 전역 변수 문제 : 스레드1 에서 전역변수 A에 10 할당하고 스레드2 에서 전역변수 A에 20 할당 후 스레드1 에서 전역변수 A 값을 출력하면 20이 출력된다.

```java
public class Start6 extends Thread {
	static int share;

	public static void main(String[] args) {
		Start6 t1 = new Start6();
		Start6 t2 = new Start6();

		t1.start();
		t2.start();
	}

	public void run() {
		for (int count = 0; count < 10; count++) {
			System.out.println(Thread.currentThread().getName());
			System.out.println(share++);

			try {
				sleep(10000);
			} catch (InterruptedException e) {
			}
		}
	}
}
```
