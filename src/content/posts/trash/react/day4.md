---
title: "Sass"
section: trash
lastUpdated: "2023/12/12 10:00:00"
description: "Sass"
---

- [리액트 환경설정](./day1.md)
- [라이프사이클 메서드](./day2.md)
- [Hooks](./day3.md)
- `컴포넌트 스타일링`
- [todo실습 - 환경구성, 불변성, react-virtualized](./day5.md)
- [라우터](./day6.md)
- [axios](./day7.md)


## sass 사용

```sh
yarn add node-sass
```

## 세부설정 커스터마이징 yarn eject

sass-loader 설정 커스터 마이징 할 수 있다. create-react-app으로 만든 프로젝트는 세부 설정이 모두 숨겨져 있음.  
`yarn eject` 로 설정 하기 전에 git 커밋 해야 진행 가능함.

```sh
git add .
git commit -m'yarn eject'
yarn eject
```

명령어 실행하면 config라는 디렉토리 생성됨.

`webpack.config.js` 에 sassRegex 검색하여 옵션 변경

교재 소스는 옛날 버전이어서 [블로그](https://steadily-worked.tistory.com/405) 참고하였음.

```js
{
    test: sassRegex,
    exclude: sassModuleRegex,
    use: getStyleLoaders({
    importLoaders: 2,
    sourceMap: isEnvProduction && shouldUseSourceMap,
    }).concat({
        loader: require.resolve("sass-loader"),
        options: {
            additionalData: `@import 'utils';`,
            sassOptions: {
            includePaths: [paths.appSrc + "/styles"],
            sourceMap: isEnvProduction && shouldUseSourceMap,
        },
    },
}),
```

제대로 되지 않는다면 저장후 node_modules 디렉터리를 삭제한 후, yarn install

SassComponent.scss 파일에서
includePaths 설정으로 @import 'utils.scss'; 처럼 경로 지정 안해줘도 되고,  
additionalData 설정으로 모든 scss파일에서 utils.scss를 자동으로 불러오므로 import 구문 없어도 정상 동작함.

## ~물결문자

물결 문자를 사용하면 자동으로 node_modules에서 라이브러리 디렉터리를 탐지하여 스타일을 불러올 수 있다.

```sh
yarn add open-color include-media
```

include-media 에서 오류 계속 나서 버전 낮춰서 설치해봤더니 정상 동작 했다. 책이랑 좀 안맞음.

```sh
npm uninstall include-media
npm i include-media@1.4.10
```

- [npmjs.com/include-media@1.4.10](https://www.npmjs.com/package/include-media/v/1.4.10)

노드 모듈을 다음과 같이 사용할 수 있다.

```css
@import "~include-media/dist/include-media";
@import "~open-color/open-color";
```

## CSS Module

CSS Module은 CSS를 불러와서 사용할 때 클래스 이름을 고유한 값, 즉 [파일 이름]\_[클래스 이름]\_\_[해시값] 형태로 자동으로 만들어서 컴포넌트 스타일 클래스 이름이 중첩되는 현상을 방지해 주는 기술

> ### ES6 문법 템플릿 리터럴(Template Literal)
>
> 자바스크립트 레퍼런스를 쉽게 넣어 줄 수 있다.  
>  const name = '리액트';  
>  // const message = '제 이름은 ' + name + '입니다.'  
>  const message = \`제 이름은 ${name}입니다.\`;

## classnames

CSS 클래스를 조건부로 설정할 때 유용한 라이브러리

```js
const MyComponent = ({ highlighted, theme }) => (
  <div className={classNames("MyComponent", { highlighted }, theme)}>Hello</div>
);
```

highlighted 값이 true이면 highlighted 클래스가 적용되고, false이면 적용되지 않는다.  
theme으로 전달받는 문자열은 내용 그대로 클래스에 적용

```js
import React from "react";
import classNames from "classnames/bind";
import styles from "./CSSModule.module.css";

// classnames에 내장되어 있는 bind 함수
// 미리 styles에서 클래스를 받아 오도록 설정하고
const cx = classNames.bind(styles);

//사전에 미리 styles에서 받아 온 후 사용하게끔 설정해 두고
// cx('클래스 이름', '클래스 이름2') 형태로 사용
const CSSModule = () => {
  return (
    <div className={cx("wrapper", "inverted")}>
      안녕하세요, 저는 <span className="something">CSS Module!</span>
    </div>
  );
};

export default CSSModule;
```

## styled-components

styled-components를 사용하면 자바스크립트 파일 하나에 스타일까지 작성할 수 있기 때문에 .css 또는 .scss 확장자를 가진 스타일 파일을 따로 만들지 않아도 된다

> - CSS-in-JS : 자바스크립트 파일 안에 스타일을 선언하는 방식
>   [관련 라이브러리](https://github.com/MicheleBertoli/css-in-js)

```sh
yarn add styled-components
```

> 코드 신택스 하이라이팅을 위해 VS Code 확장프로그램 `vscode-styled-components` 설치.

## Tagged 템플릿 리터럴

템플릿 안에 자바스크립트 객체나 함수를 전달할 때 온전히 추출

```js
`hello ${{ foo: "bar" }} ${() => "world"}!`;
// 결과: "hello [object Object] () => 'world'!"
```

```js
function tagged(...args) {
  console.log(args);
}
tagged`hello ${{ foo: "bar" }} ${() => "world"}!`;
```

```
(3) [Array(3), {…}, ƒ]
0: (3) ['hello ', ' ', '!', raw: Array(3)]
1: {foo: 'bar'}
2: () => 'world'
length: 3
[[Prototype]]: Array(0)
```
