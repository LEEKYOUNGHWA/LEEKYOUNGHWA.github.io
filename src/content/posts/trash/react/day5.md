---
title: "todo app 실습, immer"
section: trash
lastUpdated: "2023/12/12 10:00:00"
description: "todo app 실습"
---

- [리액트 환경설정](./day1.md)
- [라이프사이클 메서드](./day2.md)
- [Hooks](./day3.md)
- [컴포넌트 스타일링](./day4.md)
- `todo실습 - 환경구성, 불변성, react-virtualized`
- [라우터](./day6.md)
- [axios](./day7.md)


## todo app

### 설치

```sh
yarn add node-sass classnames react-icons
```

### prettier 설정

`.prettierrc`

```
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}

```

### flex

- [display 속성 flex](http://flexboxfroggy.com/#ko)

### react-icons

- [react-icons](https://react-icons.github.io/react-icons/#/icons/md)

```js
import { 아이콘 이름 } from 'react-icons/md';
```

### 리액트 개발자 도구 설치

크롬 확장프로그램

- [React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

### 성능측정

`크롬 개발자도구` -> `Performance 탭` -> `녹화 버튼` 누르고 ‘할 일 1’ 항목을 체크한 다음, 화면에 변화가 반영되면 `Stop` 버튼

### eslint 빠른수정

`ctrl` + `.`

## 프로덕션 모드에서 구동해 보고 싶다면?

```sh
yarn build
yarn global add serve
serve -s build
```

## 불변성

- 불변성을 지킨다 : 기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어냄.
- 불변성이 지켜지지 않으면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못함.
- 얕은 복사(shallow copy) : 전개 연산자(... 문법)를 사용하여 객체나 배열 내부의 값을 복사할 때 내부의 값이 완전히 새로 복사되는 것이 아니라 가장 바깥쪽에 있는 값만 복사됨.
- [블로그](https://hsp0418.tistory.com/171) : 참조한 링크들이 도움이 많이 됬음
- 객체의 구조가 복잡해지면 불변성 유지하면서 업데이트 하기 까다로워짐. immer 라이브러리 사용하여 해결할 수 있음.

```js
const array = [1, 2, 3, 4, 5];

const nextArrayBad = array; // 배열을 복사하는 것이 아니라 똑같은 배열을 가리킵니다.
nextArrayBad[0] = 100;
console.log(array === nextArrayBad); // 완전히 같은 배열이기 때문에 true

const nextArrayGood = [...array]; // 배열 내부의 값을 모두 복사합니다.
nextArrayGood[0] = 100;
console.log(array === nextArrayGood); // 다른 배열이기 때문에 false

const object = {
  foo: "bar",
  value: 1,
};

const nextObjectBad = object; // 객체가 복사되지 않고, 똑같은 객체를 가리킵니다.
nextObjectBad.value = nextObjectBad.value + 1;
console.log(object === nextObjectBad); // 같은 객체이기 때문에 true

const nextObjectGood = {
  ...object, // 기존에 있던 내용을 모두 복사해서 넣습니다.
  value: object.value + 1, // 새로운 값을 덮어 씁니다.
};
console.log(object === nextObjectGood); // 다른 객체이기 때문에 false

const nextComplexObject = {
  ...complexObject,
  objectInside: {
    ...complexObject.objectInside, //내부의 값이 객체 혹은 배열이라면 내부의 값 또한 따로 복사
    enabled: false,
  },
};
console.log(complexObject === nextComplexObject); // false
console.log(complexObject.objectInside === nextComplexObject.objectInside); // false
```

## react-virtualized

react-virtualized를 사용하면 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않음.  
스크롤되면 해당 스크롤 위치에서 보여 주어야 할 컴포넌트를 자연스럽게 렌더링

```sh
yarn add react-virtualized
```

```js
const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos]
  );
  return (
    <List
      className="TodoList"
      width={512} // 전체 크기
      height={513} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{ outline: "none" }} // List에 기본 적용되는 outline 스타일 제거
    />
  );
};
```

- rowRenderer : react-virtualized의 List 컴포넌트에서 각 TodoItem을 렌더링할 때 사용하며, 이 함수를 List 컴포넌트의 props로 설정. 이 함수는 파라미터에 index, key, style 값을 객체 타입으로 받아 와서 사용.

- List 컴포넌트 : 해당 리스트의 전체 크기와 각 항목의 높이, 각 항목을 렌더링할 때 사용해야 하는 함수, 그리고 배열을 props로 넣어 주면 자동으로 최적화해줌.

## immer

불변성에 신경쓰지 않는 것 처럼 코드를 작성하되 불변성 관리는 제대로 해주는 것.

## immer 설치

```sh
yarn add immer
```

```js
import { produce } from "immer";
.
.
.
// input 수정을 위한 함수
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm(
        produce(form, (draft) => {
          draft[name] = value;
        })
      );
    },
    [form]
  );
```
