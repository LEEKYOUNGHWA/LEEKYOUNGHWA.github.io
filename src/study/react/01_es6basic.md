---
title: 01. javascript 기초
subTitle: 도배란 무엇인가
lastUpdated: 2025/09/10 16:28:00
tags: ["react"]
image: https://images.icon-icons.com/2415/PNG/512/react_original_wordmark_logo_icon_146375.png
---

# javascript 기초

## 연산자 (operator)

### null 병합 연산자 (nullish coalescing operator)

```js
// -> 존재하는 값을 추려내는 기능
// -> null, undefined가 아닌 값을 찾아내는 연산자

let var1;
let var2 = 10;
let var3 = 20;

let var4 = var1 ?? var2;
let var5 = var1 ?? var3;
let var6 = var3 ?? var2;

let userName;
let userNickName = "Winterlood";

let displayName = userName ?? userNickName;
```

### typeof 연산자

```js
// -> 값의 타입을 문자열로 반환하는 기능을 하는 연산자

let var7 = 1;
var7 = "hello";
var7 = true;

let t1 = typeof var7;
console.log(t1);
```

### 함수

- Hoist : 감아 올리기
- Hoisting (호이스팅) : 자바스크립트 인터프리터가 코드를 실행하기 전 변수 선언과 함수 선언을 해당 범위의 최상단으로 끌어올려 미리 메모리에 할당

```js
// 함수
let area1 = getArea(10, 20);
console.log(area1);

let area2 = getArea(30, 20);
console.log(area2);

getArea(120, 200);
// 호이스팅
function getArea(width, height) {
  function another() {
    // 중첩 함수
    console.log("another");
  }

  another();
  let area = width * height;

  return area;
}
```

## 화살표 함수 (Arrow function expressions)

### 함수 선언식

```js
function funcA() {
  //   console.log("funcA");
}

let varA = funcA;
varA();
```

### 함수 표현식

함수 표현식 : 표현식으로 만든 함수들은 호이스팅의 대상이 되지 않는다.

```js
let varB = function funcB() {
  // console.log("funcB");
};

// funcB(); 호풀 불가
```

funcB 이름 생략 가능

### 익명함수

이름이 없는 함수

```js
let varB = function () {
  // console.log("funcB");
};

varB();
```

### 화살표 함수

익명함수에서 function 을 지워버리고 => 화살표를 적는다

```js
let varC = () => {
  return 1;
};
```

값을 반환하기만 한다면 중괄호와 return 생략 가능

```js
let varC = () => 1;
```

매개변수가 필요하다면 소괄호 안에 적어준다

```js
let varC = (value) => value + 1;
console.log(varC(10));
```

추가적인 작업이 필요하다면 중괄호로 열어주고 return 문 작성

```js
let varC = (value) => {
  console.log(value);
  return value + 1;
};

console.log(varC(10));
```

## 콜백 함수 (callback function)

자신이 아닌 다른 함수에 인수로서 전달된 함수

```js
function main(value) {
  value();
}

function sub() {
  console.log("i am sub");
}
main(sub); // sub : 콜백(나중에 실행되는)함수
```

```js
// main 안에 sub인수 함수 그대로 적어줘도 된다.
main(function sub() {
  console.log("i am sub");
});

// 함수 표현식에서는 익명함수로 써도 된다.
main(function () {
  console.log("i am sub");
});

// 화살표 함수로 만들어서 써도 된다
main(() => {
  console.log("i am sub");
});
```

```js
// callback 함수를 count 횟수만큼 실행
function repeat(count, callback) {
  for (let idx = 1; idx <= count; idx++) {
    callback(idx);
  }
}

repeat(5, function (idx) {
  console.log(idx);
});

repeat(5, (idx) => {
  console.log(idx);
});

repeat(5, (idx) => {
  console.log(idx * 2);
});

repeat(5, (idx) => {
  console.log(idx * 3);
});
```

## 객체 (Object)

- 원시 타입이 아닌 객체 타입의 자료형
- 여러가지 값을 동시에 저장할 수 있는 자료형을 의미

### 객체 생성

```js
let object1 = new object(); // 객체 생성자
let object2 = {}; // 객체 리터럴
```

### 객체 프로퍼티

```js
let person = {
  // 객체 프로퍼티 (객체 속성) key : value
  // 프로퍼티 갯수 제한 없음
  // value 에 타입 제한 없음 (함수, 객체 등 모두 가능)
  // key 에는 문자나 숫자만 가능
  name: "이경화", // name 프로퍼티
  age: 32, // age 프로퍼티
  hobby: "crossfit", // hobby 프로퍼티
  "like cat": true, // key에 따옴표를 안붙여도 되지만 띄어쓰기가 있을때는 붙여줘야 한다
};
```

### 프로퍼티 접근방법

#### 특정 프로퍼티에 접근 (점 표기법, 괄호 표기법)

```js
let name = person.name;
let age = person["age2"];

let property = "hobby";
let hobby = person[property];
```

#### 새로운 프로퍼티 추가

```js
person.job = "fe developer";
person["favoriteFood"] = "떡볶이";
```

#### 프로퍼티 수정

```js
person.job = "educator";
person["favoriteFood"] = "초콜릿";
```

#### 프로퍼티 삭제

```js
delete person.job;
delete person["favoriteFood"];
```

#### 프로퍼티의 존재 유무를 확인하는 방법 (in 연산자)

````js
let result1 = "name" in person;
let result2 = "cat" in person;
console.log(result2);```
````

#### 상수 객체

```js
const animal = {
  type: "고양이",
  name: "나비",
  color: "black",
};

animal.age = 2; // 추가
animal.name = "까망이"; // 수정
delete animal.color; // 삭제
```

#### 메서드 -> 값이 함수인 프로퍼티를 말함

```js
const person = {
  name: "이정환",
  // 메서드 선언
  sayHi() {
    console.log("안녕!");
  },
};

person.sayHi();
person["sayHi"]();
```

## 배열

### 배열 생성

```js
let arrA = new Array(); // 배열 생성자
let arrB = []; // 배열 리터럴(대부분 사용)

let arrC = [1, 2, 3];
```

```js
// 어떤 타입의 값도 다 저장할 수 있다. 길이의 제한도 없다.
let arrC = [1, 2, 3, true, "hello", null, undefined, () => {}, {}, []];
```

```js
// 배열 요소 접근
let item1 = arrC[0];
let item2 = arrC[1];

arrC[0] = "hello";
console.log(arrC);
```

## Trythy Falsy

```js
// 1. Falsy한 값
let f1 = undefined;
let f2 = null;
let f3 = 0;
let f4 = -0;
let f5 = NaN;
let f6 = "";
let f7 = 0n;

// 2. Truthy 한 값
// -> 7가지 Falsy 한 값들 제외한 나머지 모든 값
let t1 = "hello";
let t2 = 123;
let t3 = [];
let t4 = {};
let t5 = () => {};

// 3. 활용 사례
function printName(person) {
  if (!person) {
    console.log("person의 값이 없음");
    return;
  }
  console.log(person.name);
}

let person = { name: "이정환" };
printName(person);
```

## 단락평가(Short-circuit Evaluation)

첫번째 피연산자의 값만으로도 해당 연산의 결과를 확정할 수 있다면 두번째 피 연산자의 값에는 아예 접근하지 않음

```js
let varA = false;
let varB = true;

console.log(varA && varB);
console.log(varB || varA);
```

```js
function printName(person) {
  const name = person && person.name;
  console.log(name || "person의 값이 없음");
}

printName();
printName({ name: "이정환" });
```

## 구조분해할당

배열이나 객체에 저장된 여러개의 값을들 분해해서 각각 다른 변수에 할당

### 배열의 구조분해 할당

```js

```
