---
title: 02. node.js
subTitle: 해마다 학습능력이.. 퇴화되는거 같다....
lastUpdated: 2025/09/30 10:19:00
tags: ["react"]
image: https://images.icon-icons.com/2415/PNG/512/react_original_wordmark_logo_icon_146375.png
---

# node.js

node.js는 웹 브라우저가 아닌 환경에서도 자바스크립트 코드를 실행시켜주는 자바스크립트의 런타임, 자바스크립트의 실행환경(구동기)

> node.js는 `Chrome V8 Javascript` 엔진으로 빌드된 Javascript 런타임 입니다

## npm

```sh
npm init
```

폴더안에 package.json 생성됨  
index.js 파일 생성후 소스 작성

```js
console.log("안녕 node js");
```

node로 실행

```sh
node index.js
```

### 패키지 스크립트

```json
"scripts": {
    "start": "node src/index.js"
}
```

스크립트 작성 후 실행 가능

```sh
npm run start
```

## 모듈 시스템

모듈을 생성하고, 불러오고, 사용하는 등의 모듈을 다루는 다양한 기능을 제공하는 시스템

- Common Js (CJS)
- ES Module (ESM)
- AMD
- UMD

### Common Js (CJS)

`math.js`

```js
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

module.exports = {
  add,
  sub,
};
```

`index.js`

```js
const moduleData = require("./math.js");

console.log(moduleData);

console.log(moduleData.add(1, 2));
console.log(moduleData.sub(1, 2));

// 구조분해할당 가능
const { add, sub } = require("./math.js");
console.log(add(1, 2));
console.log(sub(1, 2));
```

### ES Module (ESM)

package.js 에

```js
"type": "module"
```

추가

`math.js`

```js
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

export { add, sub };
```

`index.js`

```js
import { add, sub } from "./math.js";

console.log(add(1, 2));
console.log(sub(1, 2));
```

함수 앞에 export를 적어줘도 동일하다

```js
export function add(a, b) {
  return a + b;
}

export function sub(a, b) {
  return a - b;
}

export default function multiply(a, b) {
  return a * b;
}
```

불러오기

```js
import multiply from "./math.js";
// 이름 변경도 가능
import mul from "./math.js";
// 합치는것도 가능
import mul, { add, sub } from "./math.js";
```

## node.js 라이브러리 사용하기

- 라이브러리 : 프로그램을 개발할때 필요한 다양한 기능들을 미리 만들어 모듈화 해놓은것

```sh
npm i randomcolor
```

`package.json`

```json
"dependencies": {
    "randomcolor": "^0.6.2" // ^0 : 0점대 에서 1점대 버전 이전까지의 버전 중에 최신 버전으로 설치하겠다
  }
```

라이브러리 불러오기

```js
import randomColor from "randomcolor";
```

라이브러리에서 어떠한 값을 가져올 때는 경로를 명시하는게 아니라 from 뒤에 라이브러리의 이름만 명시하면 된다.

```js
const color = randomColor();
console.log(color);
```

### npm i

```sh
npm install
npm i
```

package.json 의 dependencies의 정보를 기준으로 모든 패키지, 모든 라이브러리를 다시 다 설치해준다.
