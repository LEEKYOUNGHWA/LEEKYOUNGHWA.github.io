---
title: "06.스프링이 사랑한 디자인 패턴"
section: study
lastUpdated: "2024/01/24 04:57:49"
tags: ["java"]
---

- 디자인 패턴 : 프로그램을 작성하다 보면 비슷비슷한 상황에 직명하게 되는 경우가 많은데, 그러한 상황에서 이전의 많은 개발자들이 고민하고 정제한 사실상의 표준 설계 패턴이 있다. design은 설계라는 뜻.

- 요리와 oop 비교  

|요리|객체지향프로그래밍(OOP)|
|--|--|
|요리도구|4대원칙(캡상추다)|
|요리도구사용법|설계원칙(SOLID)|
|레시피|디자인패턴|

- 스프링(=OOP프레임워크!)은 객체 지향의 특성과 설계원칙을 극한까지 적용한 프레임워크.
- 스프링을 공부하다보면 자연스럽게 객체지향 설계의 베스트 프랙티스 즉, 디자인 패턴을 만날 수 있다.
- 디자인 패턴은 객체지향의 특성 중 상속(extends), 인터페이스(interface/implements), 합성(객체를 속성으로 사용)을 이용한다. 이 세가지 방식 외에 다른 방식은 없다.

## 어댑터 패턴(Adapter Pattern)

- 어댑터 : 변환기(converter) 
- 서로 다른 두 인터페이스 사이에 통신이 가능하게 하는 것.
- ex. 휴대폰 충전기. 휴대폰을 직접 전원 콘센트에 연결할 수 없기 때문에 충전기가 핸드폰과 전원 콘센트 사이에서 둘을 연결해주는 변환기의 역할을 수행해 준다.
- ex2. odbc/jdbc. 어댑터 패턴을 이용해 다양한 데이터베이스 시스템을 단일한 인터페이스로 조작할 수 있게 해준다.
- ex3. 자바 언어의 플랫폼별 jre.
- jdbc와 jre는 SOLID에서 개방폐쇄원칙(OCP)를 설명할 때도 예를 들었던 내용이다. 결국 어댑터 패턴은 개방 폐쇄 원칙을 활용한 설계 패턴이라고 할 수 있다.

```java
// adapter pattern 적용 전 : 각 메서드가 비슷한 일을 하지만 메서드 명이 다름
public class ClientWithNoAdapter {
    public static void main(String[] args) {
        ServiceA sa1 = new ServiceA();
        ServiceB sb1 = new ServiceB();

        sa1.runServiceA();
        sb1.runServiceB();
    }
}

// adapter pattern 적용 후 : 메서드명 통일
public class ClientWithAdapter {
    public static void main(String[] args) {
        AdapterServiceA asa1 = new AdapterServiceA();
        AdapterServiceB asb1 = new AdapterServiceB();

        asa1.runService();
        asb1.runService();
    }
}
```
- 클라이언트가 변환기를 통해 runService()라는 동일한 메서드명으로 두 객체의 메서드를 호출하는 것을 볼 수 있다.
- 어댑터 패턴 : 합성, 즉 객체를 속성으로 만들어서 참조하는 디자인 패턴. 호출당하는 쪽의 메소드를 호출하는 쪽의 코드에 대응하도록 중간에 변환기를 통해 호출하는 패턴.

## 프록시 패턴(Proxy Pattern)

- 프록시 : 대리자, 대변인 이라는 뜻
- 프록시 패턴이 적용되지 않은 구조 : 대리자를 호출하지 않고 직접 호출하는 구조
    ```java
    public class Service {
        public String runSomething() {
            return "서비스짱!!!";
        }
    }

    public class ClientWithNoProxy {
        public static void main(String[] args){
            // 프록시를 이용하지 않은 호출
            Service service = new Service();
            System.out.println(service.runSomething());
        }
    }
    ```
- 프록시패턴 : 실제 서비스 객체가 가진 메서드와 같은 이름의 메서드를 사용. 이를 위해 인터페이스를 사용한다.
- 프록시 패턴이 적용된 구조
    ```java
    public interface IService {
        String runSomething();
    }

    public class Service implements IService {
        public String runSomething() {
            return "서비스짱!!!";
        }
    }

    public class Proxy implements IService {
        IService service1;
        
        public String runSomething() {
            System.out.println("호출에 대한 흐름 제어가 주목적, 반환 결과를 그대로 전달");
            service1 = new Service();
            return service1.runSomething();
        }
    }

    public class ClientWithProxy {
        public static void main(String[] args) {
            // 프록시를 이용한 호출
            IService proxy = new Proxy();
            System.out.println(proxy.runSomething());
        }
    }
    ```
- 프록시 패턴의 중요 포인트
    - 대리자는 실제 서비스와 같은 이름의 메서드를 구현한다. 이때 인터페이스를 사용한다
    - 대리자는 실제 서비스에 대한 참조 변수를 갖는다(합성)
    - 대리자는 실제 서비스의 같은 이름을 가진 메서드를 호출하고 그 값을 클라이언트에게 돌려준다
    - 대리자는 실제 서비스의 메서드 호출 전후에 별도의 로직을 수행할 수도 있다.
- 프록시 패턴은 실제 서비스 메서드의 반환 값에 가감하는 것을 목적으로 하지 않고 제어의 흐름을 변경하거나 다른 로직을 수행하기 위해 사용한다.
- 프록시 패턴을 한 문장으로 : 제어 흐름을 조정하기 위한 목적으로 중간에 대리자를 두는 패턴
- 프록시 패턴 : 개방 폐쇄원칙(OCP)과 의존 역전 원칙 (DIP) 이 적용된 설계 패턴.

## 데코레이터 패턴(Decorator Pattern)

- 데코레이터 : 도장/도배업자 의미.
- 원본에 장식을 더하는 패턴
- 프록시 패턴과 구현방법이 같으나 클라이언트가 받는 반환값에 장식을 덧입힌다.    

```java
public interface IService {
    public abstract String runSomething();
}

// IService 인터페이스를 구현한 Service
public class Service implements IService {
    public String runSomething() {
        return "서비스짱";
    }
}

// IService 인터페이스를 구현한 Decorator
public class Decorator implements IService {
    IService service;

    public String runSomething() {
        System.out.println("호출에 대한 장식 주목적, 클라이언트에게 반환 결과에 장식을 더하여 전달");
        service = new Service();
        return "정말" + service.runSomething();
    }
}

// 데코레이터를 사용하는 ClientWithDecorator
public class ClientWithDecorator {
    public static void main(String[] args) {
        IService decorator = new Decorator();
        System.out.println(decorator.runSomething());
    }
}
```
- 데코레이터 패턴의 중요 포인트 : 반환값에 장식을 더한다는 것을 빼면 프록시 패턴과 동일하다
    - 장식자는 실제 서비스와 같은 이름의 메서드를 구현한다. 이때 인터페이스를 사용한다.
    - 장식자는 실제 서비스에 대한 참조 변수를 갖는다(합성)
    - 장식자는 실제 서비스의 같은 이름을 가진 메서드를 호출하고, 그 반환값에 장식을 더해 클라이언트에게 돌려준다
    - 장식자는 실제 서비스의 메서드 호출 전후에 별도의 로직을 수행할 수 있다.
- 데코레이터 패턴의 중요 포인트 : 메서드 호출의 반환값에 변화를 주기 위해 중간에 장식자를 두는 패턴. 개방폐쇄원칙(OCP) 과 의존역전 원칙(DIP) 이 적용된 설계 패턴임을 알 수 있다.

## 싱글턴 패턴(Singleton Pattern)

- 클래스의 인스턴스를, 즉 객체를 하나만 만들어 사용하기 위한 패턴.
- 커넥션 풀, 스레드 풀, 디바이스 설정 객체 등과 같은 경우 인스턴스를 여러개 만들게 되면 불필요한 자원을 사용하게되고, 또 프로그램이 예상치 못한 결과를 낳을 수 있다.
- 싱글턴 패턴은 오직 인스턴스를 하나만 만들고 그것을 계속해서 재사용 한다.
- new를 실행할 수 없도록 생성자에 private 접근 제어자를 지정한다.
- 유일한 단일 객체를 반환할 수 있는 정적 메서드가 필요하다
- 유일한 단일 객체를 참조할 수 있는 정적 참조 변수가 필요하다.

```java
public class Singleton {
    static Singleton singletonObject; // 정적 참조 변수

    private Singleton() {}; // private 생성자

    // 객체 변환 정적 메서드
    public static Singleton getInstance() {
        if ( singletonObject == null ) {
            singletonObject = new Singleton();
        }
        return singletonObject;
    }
}
```

- 싱글턴 패턴의 특징
    - private 생성자를 갖는다
    - 단일 객체 참조 변수를 정적 속성으로 갖는다
    - 단일 객체 참조 변수가 참조하는 단일 객체를 반환하는 getInstance() 정적 메소드를 갖는다
    - 단일 객체는 쓰기 가능한 속성을 갖지 않는 것이 정석이다.


## 템플릿 메서드 패턴(Template Method Pattern)

- 상위 클래스의 견본 메서드에서 하위 클래스가 오버라이딩 한 메서드를 호출하는 패턴.
- 의존역전원칙(DIP) 활용.
- 템플릿 메서드 패턴 적용 전
```java
public class Dog {
    public void palyWithOwner() {
        System.out.println("귀염둥이 이리온...");
        System.out.println("멍! 멍!");
        System.out.println("꼬리 살랑 살랑~");
        System.out.println("잘했어");
    }
}

public class Cat {
    public void palyWithOwner() {
        System.out.println("귀염둥이 이리온...");
        System.out.println("야옹~ 야옹~");
        System.out.println("꼬리 살랑 살랑~");
        System.out.println("잘했어");
    }
}
```

- 템플릿 메서드 적용 후
```java
public abstract class Animal {
    public void palyWithOwner() {
        System.out.println("귀염둥이 이리온...");
        play();
        runSomething();
        System.out.println("잘했어");
    }

    // 추상메서드
    abstract void play();

    // Hook(갈고리)메서드
    void runSomething() {
        System.out.println("꼬리 살랑 살랑~");
    }
}

// 하위 클래스를 포함하는 Dog
public class Dog extends Animal {
    @Override
    // 추상 메서드 오버라이딩
    void play() {
        System.out.println("멍! 멍!");
    }

    @Override
    //Hook(갈고리) 메서드 오버라이딩
    void runSomething() {
        System.out.println("멍! 멍! 꼬리 살랑 살랑~");
    }
}
```
- 상위 클래스인 Animal 에는 템플릿을 제공하는 palyWithOwner() 메서드와 하위 클래스에게 구현을 강제하는 play() 추상메서드, 하위 클래스가 선택적으로 오버라이딩 할 수 있는 runSomething() 메서드가 있다.
- 상위 클래스에 공통 로직을 수행하는 템플릿 메서드와 하위 클래스에 오버라이딩을 강제하는 추상 메서드 또는 선택적으로 오버라이딩 할 수 있는 훅 메서드를 두는 패턴을 템플릿 메서드 패턴 이라고 한다.

## 팩터리 메서드 패턴 (Factory Method Pattern)

- 공장은 물건을 생산, 객체지향에서 팩터리라는 객체 생성. 팩터리메서드는 객체를 생성 반환하는 메서드를 말한다.
- 팩터리 메서드 패턴은 하위 클래스에서 팩터리 메서드를 오버라이딩해서 객체를 반환하게 하는 것을 의미.
- 팩터리 메서드 패턴 : 오버라이드된 메서드가 객체를 반환하는 패턴
- 의존 역전 원칙 (DIP) 활용.

```java
public abstract class Animal {
    //추상 팩토리 메서드
    abstract AnimalToy getToy();
}

// 팩터리 메서드가 생성할 객체의 상위 클래스
public abstract class AnimalToy {
    abstract void identify();
}

public class Dog extends Animal {
    //추상 팩터리 메서드 오버라이딩
    @Override
    AnimalToy getToy() {
        return new DogToy();
    }
}

// 팩터리 메서드가 생성할 객체
public class DogToy extends AnimalToy {
    public void identify(){
        System.out.println("나는 테니스공! 강아지의 친구");
    }
}

public class Cat extends Animal {
    //추상 팩터리 메서드 오버라이딩
    @Override
    AnimalToy getToy() {
        return new CatToy();
    }
}

public class CatToy extends AnimalToy {
    @Override
    public void identify() {
        System.out.println("나는 캣타워! 고양이의 친구!");
    }
}

public class Driver {
    public static void main(String[] args) {
        //팩터리 메서드를 보유한 객체를 생성
        Animal bolt = new Dog();
        Animal kitty = new Cat();

        //팩터리 메서드가 반환하는 객체들
        AnimalToy boltBall = bolt.getToy();
        AnimalToy kittyTower = kitty.getToy();

        // 팩터리 메서드가 반환한 객체들을 사용
        boltBall.identify();
        kittyTower.identify();
    }
}
```

## 전략 패턴(Strategy Pattern) 

- 전략 패턴을 구성하는 세 요소
    - 전략 메서드를 가진 전략 객체
    - 전략 객체를 사용하는 컨텍스트(전략 객체의 사용자/소비자)
    - 전략 객체를 생성해 컨텍스트에 주입하는 클라이언트(제3자, 전략 객체의 공급자)
- ex. 보급 장교가 무기를 군인에게 지급해주면 군인은 주어진 무기에 따라 전투를 수행하게 된다. 무기 - 전략, 군인 - 컨텍스트, 보급장교 - 제3자(클라이언트)

```java
public interface Strategy {
    public abstract void runStrategy();
}

public class StrategyGun implements Strategy {
    @Override
    public void runStrategy(){
        System.out.println("탕, 타당, 타다당");
    }
}

public class StrategySword implements Strategy {
    @Override
    public void runStrategy() {
        System.out.println("챙... 채쟁챙 챙챙");
    }
}

public class StrategyBow implements Strategy {
    @Override
    public void runStrategy() {
        System.out.println("슝.. 쐐액.. 쉑, 최종병기");
    }
}

public class Soilder {
    void runContext(Strategy strategy) {
        System.out.println("전투시작");
        strategy.runStrategy();
        System.out.println("전투종료");
    }
}

public class Client {
    public static void main(String[] args){
        Strategy strategy = null;
        Soilder rambo = new Soilder();

        // 총을 람보에게 전달해서 전투를 수행하게 한다
        strategy = new StrategyGun();
        rambo.runContext(strategy);

        System.out.println();

        //검을 람보에게 전달해서 전투를 수행하게 한다
        strategy = new StrategySword();
        rambo.runContext(strategy);

        System.out.println();

        //활을 람보에게 전달해서 전투를 수행하게 한다
        strategy = new StrategyBow();
        rambo.runContext(strategy);
    }
}
```

- 위 코드처럼 전략을 다양하게 변경하면서 컨텍스트를 실행할 수 있다.
- 전략 패턴은 디자인 패턴의 꽃이라고 할 정도로 다양한 곳에서 문제 상황의 해결책으로 사용.
- 같은 문제의 해결책으로 상속을 이용하는 템플릿 메서드 패턴과 객체 주입을 통한 전략 패턴중에서 선택/적용 할 수 있다.
- 단일 상속만이 가능한 자바에서는 상속이라는 제한이 있는 템플릿 메서드 패턴보다는 전략패턴을 더 많이 사용.
- 전략패턴 : 클라이언트가 전략을 생성해 전략을 실행한 컨텍스트에 주입하는 패턴
- 개방 폐쇄 원칙과 의존 역전 원칙 적용

## 템플릿 콜백 패턴(Template Callback Pattern - 견본/회신 패턴)

- 템플릿 콜백 패턴은 전략 패턴의 변형으로, 스프링의 3대 프로그래밍 모델 중 하나인 DI(의존성 주입)에서 사용하는 특별한 형태의 전략 패턴 이다.
- 전략패턴과 모든것이 동일한데 전략을 익명 내부 클래스로 정의해서 사용.
- 전략을 익명 내부 클래스로 구현한 전략 패턴
- 개방 폐쇄원칙과 의존 역전 원칙 적용

```java
public interface Strategy {
    public abstract void runStrategy();
}

public class Soilder {
    void runContext(String weaponSound) {
        System.out.println("전투시작");
        executeWeapon(weaponSound).runStrategy();
        System.out.println("전투종료");  
    }

    private Strategy executeWeapon(final String weaponSound) {
        return new Strategy() {
            @Override
            public void runStrategy(){
                System.out.println(weaponsound);
            }
        };
    }
}

public class Client {
    public static void main(String[] args) {
        Soilder rambo = new Soilder();
        rambo.runContext("총! 총초종총 총 ! 총!");
        rambo.runContext("칼! 카가갈 칼! 칼!");
        rambo.runContext("도끼! 독독...도도독 독끼!");
    }
}
```
