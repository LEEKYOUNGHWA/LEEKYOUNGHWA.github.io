---
tags: ["java"]
lastUpdated: 2024/01/05 17:32:00
---

# 9. 중첩클래스

## 9.1 중첩클래스

- 중첩클래스(Nested Class) : 내부에 선언된 클래스. 중첩 클래스를 사용하면 클래스의 멤버를 쉽게 사용할 수 있고 외부에는 중첩 관계 클래스를 감춤으로써 코드의 복잡성을 줄일 수 있음.

| 선언 위치에 따른 분류 | 선언위치                                                                                    | 객체생성조건                                     |
| --------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| 인스턴스멤버클래스    | class A { <br> &nbsp; class B {...} <br>}                                                   | A 객체를 생성해야만 B 객체를 생성할 수 있음      |
| 정적멤버클래스        | class A { <br> &nbsp; static class B {...} <br>}                                            | A 객체를 생성하지 않아도 B 객체를 생성할 수 있음 |
| 로컬클래스            | class A { <br> &nbsp; void method() { <br> &nbsp; &nbsp; class B {...} <br> &nbsp; } <br> } | method가 실행할 때만 B 객체를 생성할 수 있음     |

- 중첩 클래스도 하나의 클래스이기 때문에 컴파일하면 바이트코드 파일(.class)이 별도로 생성된다. 멤버 클래스일 경우 바이트코드 파일의 이름은 다음과 같이 결정된다

<br>

    A (바깥클래스) $ B (멤버클래스) .class

- 로컬 클래스일 경우에는 다음과 같이 $1 이 포함된 바이트코드 파일이 생성된다

<br>

    A(바깥클래스) $1 B(로컬클래스) .class

## 9.2 인스턴스 멤버 클래스

    [public] class A {
        [public|private] class B { // 인스턴스 멤버 클래스

        }
    }

| 구분              | 접근범위                                     |
| ----------------- | -------------------------------------------- |
| public class B {} | 다른 패키지에서 B클래스를 사용할 수 있다     |
| class B {}        | 같은 패키지에서만 B클래스를 사용할 수 있다   |
| private class B{} | A 클래스 내부에서만 B클래스를 사용할 수 있다 |

- 인스턴스 멤버 클래스B 는 주로 A 클래스 내부에서 사용되므로 private 접근 제한을 갖는 것이 일반적이다
- B 객체는 A 클래스 내부 어디에서나 생성할 수는 없고, 인스턴스 필드값, 생성자, 인스턴스 메소드에서 생성할 수 있다. A 객체가 있어야 B 객체도 있기 때문

```java
public class A {
    class B {} // 인스턴스 멤버 클래스
    B field = new B(); // 인스턴스 필드 값으로 B 객체 대임
    A () {
        B b = new B(); // 생성자
    }
    void method() {
        B b = new B(); // 인스턴스 메소드
    }
}
```

- B 객체를 A 클래스 외부에서 생성하려면 default 또는 public 접근 제한을 가져야 하고, A 객체르 먼저 생성한 다음 B 객체를 생성해야 한다.

        A a = new A();
        A.b b = a.new B();

- 인스턴스 멤버 클래스 B 내부에는 일반 클래스와 같이 필드, 생성자, 메소드 선언이 올 수 있다. 정적 필드와 정적 메소드는 Java 17부터 선언 가능

## 9.3 정적 멤버 클래스

- 정적 멤버 클래스 : static 키워드와 함께 A 클래스의 멤버로 선언된 B 클래스

<br>

    [public] class A {
        [public | private] static class B { // 정적 멤버 클래스
        }
    }

- 정적 멤버 클래스 B 는 A 클래스 내부에서 사용되기도 하지만 A 클래스 외부에서 A와 함께 사용되는 경우가 많기 때문에 주로 default 또는 public 접근 제한을 가진다.
- 정적 멤버 클래스 B 는 A 클래스 내부 어디든 객체를 생성할 수 있다
- A 클래스 외부에서 B 객체를 생성하려면 A 객체 생성 없이 A 클래스로 접근해서 B 객체를 생성할 수 있다.

<br>

    A.B b = new A.B();

- 정적 멤버 클래스 B 내부에는 일반 클래스와 같이 필드, 생성자, 메소드 선언이 올 수 있다.

## 9.4 로컬 클래스

- 로컬(local) 클래스 : 생성자 또는 메소드 내부에서 선언된 클래스

<br>

    [public] class A {
        // 생성자
        public A() {
            class B {} // 로컬 클래스
            B b = new B(); // 로컬 객체 생성
        }
        //메소드
        public void method() {
            class B {} // 로컬 클래스
            B b = new B(); // 로컬 객체 생성
        }
    }

- 로컬 클래스는 생성자와 메소드가 실행될 동안에만 객체를 생성할 수 있다.
- 로컬 클래스 내부에는 일반 클래스와 같이 필드, 생성자, 메소드 선언이 올 수 있다. 정적 필드와 정적 메소드는 Java 17 부터 선언할 수 있다.
- 로컬 클래스 내 로컬 변수(생성자 또는 메소드의 매개변수 또는 내부에서 선언된 변수)
  - 로컬 변수는 final 특성을 갖게 되므로 값을 읽을 수만 있고 수정할 수 없게 된다.
  - 로컬 클래스 내부에서 값을 변경하지 못하도록 제한하기 때문.
  - Java8 이후부터는 명시적으로 final 키워드를 붙이지 않아도 되지만, 로컬 변수에 final 키워드를 추가해서 final 변수임을 명확히 할 수도 있다.
  - Java7 이전에는 final 키워드를 반드시 붙여야 했다.

## 9.5 바깥 멤버 접근

- 중첩 클래스는 바깥 클래스의 멤버(필드, 메소드)에 접근할 수 있다. 중첩 클래스가 어떻게 선언되었냐에 따라 접근 제한이 있을 수 있음.

### 바깥 클래스의 멤버 접근 제한

| 구분                 | 바깥 클래스의 사용 가능한 멤버        |
| -------------------- | ------------------------------------- |
| 인스턴스 멤버 클래스 | 바깥 클래스의 모든 필드와 메소드      |
| 정적 멤버 클래스     | 바깥 클래스의 정적 필드와 정적 메소드 |

### 바깥 클래스의 객체 접근

- 중첩 클래스 내부에서 this 는 해당 중첩 클래스의 객체를 말한다.
- 바깥 클래스의 객체를 얻으려면 바깥클래스 이름에 this를 붙여준다

        바깥클래스이름.this -> 바깥객체

## 9.6 중첩 인터페이스

- 중첩 인터페이스 : 클래스의 멤버로 선언된 인터페이스. 인터페이스를 클래스 내부에 선언하는 이유는 해당 클래스와 긴밀한 관계를 맺는 구현 객체를 만들기 위해서다.

        class A {
            [public|private] [static] interface B { // 중첩 인터페이스
                //상수필드
                //추상 메소드
                //디폴트 메소드
                //정적 메소드
            }
        }

```java
public class Button {
    public static interface ClickListener { // 정적 멤버 인터페이스
        void onClick(); // 추상 메소드
    }
    private ClickListener clickListner; // 필드
    public void setClickListner(ClickListener clickListener) { // 메소드
        this.clickListener = clickListener;
    }
    public void click() {
        this.clickListner.onClick(); // 버튼이 클릭되었을때 실행하는 메소드 선언
    }
}

public class ButtonExample {
    public static void main(String[] args){
        Button btnOk = new Button();
        // Ok 버튼 클릭 이벤트를 처리할 ClickListner 구현 클래스(로컬 클래스)
        class OkListener implements Button.ClickListner {
            @Override
            public void onClick() {
                system.out.println("ok 버튼을 클릭했습니다");
            }
        }
        btnOk.setClickListner(new OkListner());
        btnOk.click();
    }
}
```

## 9.7 익명 객체

- 익명(anonymous) 객체 : 이름이 없는 객체. 명시적으로 클래스를 선언하지 않기 때문에 쉽게 객체를 생성할 수 있다는 장점이 있다. 익명 객체는 필드값, 로컬 변수값, 매개변수값으로 주로 사용된다.
- 익명 객체는 클래스를 상속하거나 인터페이스를 구현해야만 생성할 수 있다.
- 익명 자식 객체 : 클래스를 상속해서 만듦.
- 익명 구현 객체 : 인터페이스를 구현해서 만듦.

### 익명 자식 객체

- 부모 클래스를 상속받아 생성
- 부모타입의 필드, 로컬변수, 매개변수의 값으로 대입할 수 있다.

<br>

    new 부모생성자(매개값,...) {
        //필드
        //메소드
    }

- 중괄호 블록 안의 필드와 메소드는 익명 자식 객체가 가져야할 멤버로, 중괄호 블록 안에서만 사용할 수 있다.
- 익명 자식 객체는 부모 타입에 대입되므로 부모 타입에 선언된 멤버만 접근할 수 있기 때문
- 중괄호 블록 안에는 주로 부모 메소드를 재정의 하는 코드가 온다.

```java
public class Tire {
    public void roll() {
        System.out.println("일반 타이어가 굴러갑니다");
    }
}

public class Car {
    // 필드에 Tire 객체 타입
    private Tire tire = new Tire();
    // 필드에 익명 자식 객체 대입
    private Tire tire2 = new Tire() {
        @Override
        public void roll() {
            System.out.println("익명 자식 Tire에 객체 1 이 굴러갑니다");
        }
    }
}
```

- 익명 자식 객체가 부모 타입에 대입되면 부모 메소드 roll()을 호출할 경우, 재 정의된 익명 자식 객체의 roll() 메소드가 실행되는 것을 볼 수 있다 (다형성)

### 익명 구현 객체

- 인터페이스를 구현해서 생성. 이렇게 생성된 객체는 인터페이스 타입의 필드, 로컬변수, 매개변수의 값으로 대입할 수 있다.

<br>

    new 인터페이스() {
        //필드
        //메소드
    }

- 중괄호 블록 안의 필드와 메소드는 익명 구현 객체가 가져야 할 멤버로, 중괄호 블록 안에서만 사용할 수 있다.
- 익명 구현 객체는 인터페이스 타입에 대입되르모 인터페이스 타입에 선언된 멤버만 접근할 수 있기 때문.
- 중괄호 블록 안에는 주로 인터페이스의 추상 메소드를 재정의하는 코드가 온다.

```java
public interface RemoteControl {
    //추상메소드
    void turnOn();
    void turnOff();
}

public class Home {
    // 필드에 익명 구현 객체 대입
    private RemoteControl rc = new RemoteControl(){
        @Override
        public void turnOn(){
            System.out.println("Tv를 켭니다");
        }
        @Override
        public void turnOff() {
            System.out.println("Tv를 끕니다");
        }
    };
    public void use1(){
        rc.turnOn();
        rc.turnOff();
    }
    // 메소드 (로컬 변수 이용)
    public void use2() {
        // 로컬 변수에 익명 구현 객체 대입
        RemoteControl rc = new RemoteControl() {
            @Override
            public void turnOn(){
                System.out.println("에어컨을 켭니다");
            }
            @Override
            public void turnOff(){
                System.out.println("에어컨을 끕니다");
            }
        };
        rc.turnOn();
        rc.turnOff();
    }
}

public Class HomeExample {
    public static void main(String[] args){
        Home home = new Home();
        // 익명 구현객체가 대입된 매개변수 사용
        home.use3(new RemoteControl() {
            @Override
            public void turnOn() {
                System.out.println("난방을 켭니다");
            }
            @Override
            public void turnOff(){
                System.out.println("난방을 끕니다");
            }
        })
    }
}
```

```java
public class Button {
    public static interface ClickListener { // 정적 멤버 인터페이스
        void onClick(); // 추상 메소드
    }
    private ClickListener clickListner; // 필드
    public void setClickListner(ClickListener clickListener) { // 메소드
        this.clickListener = clickListener;
    }
    public void click() {
        this.clickListner.onClick(); // 버튼이 클릭되었을때 실행하는 메소드 선언
    }
}

public class ButtonExample {
    public static void main(String[] args){
        Button btnOk = new Button();
        // Ok 버튼 클릭 이벤트를 처리할 ClickListner 구현 클래스(로컬 클래스)
        class OkListener implements Button.ClickListner {
            @Override
            public void onClick() {
                system.out.println("ok 버튼을 클릭했습니다");
            }
        }
        btnOk.setClickListner(new OkListner());
        btnOk.click();

        Button btnCancel = new Button();
        btnCancle.setClickListner(new Button.ClickListner(){
            @Override
            public void onClick() {
                System.out.println("Cancle 버튼을 클릭했습니다");
            }
        });
        btnCancel.click();
    }
}
```
