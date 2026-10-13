---
title: "Hooks"
section: trash
lastUpdated: "2023/12/11 10:00:00"
description: "Hooks"
---

- [리액트 환경설정](./day1.md)
- [라이프사이클 메서드](./day2.md)
- `Hooks`
- [컴포넌트 스타일링](./day4.md)
- [todo실습 - 환경구성, 불변성, react-virtualized](./day5.md)
- [라우터](./day6.md)
- [axios](./day7.md)


함수형 컴포넌트에서도 상태관리를 할 수 있게하는 Hooks.  
리액트 메뉴얼에서 함수형 컴포넌트와 Hooks를 사용할 것을 권장함.

## 1. useState

```js
const [value, setValue] = useState(0);
```

useState함수의 파라미터에는 상태의 기본값을 넣어준다.  
value 기본값을 0으로 설정하겠다는 의미
useState()는 첫번째 원소는 상태값, 두번째 원소는 상태를 설정하는 함수인 배열 반환

```js
const [name, setName] = useState("");
const [nickname, setNickname] = useState("");
```

다음과 같이 여러개 사용 가능

## 2. useEffect

리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hooks

```js
/**
 * 리액트컴포넌트가 렌더링 될때마다 작업 수행
 */
useEffect(() => {
  console.log("렌더링이 완료되었습니다");
  console.log({ name, nickname });
});

/**
 * useEffect 화면에 맨 처음 렌더링 될 때만 실행하고 싶을때
 * 함수의 두번째 파라미터로 비어있는 배열 넣어주기
 */
useEffect(() => {
  console.log("useEffect 화면에 맨 처음 렌더링 될 때만 실행");
}, []);

/**
 * useEffect 특정값 업데이트 될 때만 실행
 */
useEffect(() => {
  console.log("useEffect name 업데이트 될 때만 실행");
}, [name]);

/**
 * useEffect 뒷정리 함수 반환
 */
useEffect(() => {
  console.log("effect");
  console.log(name);
  return () => {
    console.log("cleanup");
    console.log(name);
  };
});

/**
 * useEffect 언마운트 될때만 뒷정리 함수 반환
 */
useEffect(() => {
  console.log("effect");
  console.log(name);
  return () => {
    console.log("cleanup");
    console.log(name);
  };
}, [name]);
```

## 3. useReducer

`useReducer(리듀서 함수, 리듀서의 기본값)`  
 = `[state(현재 가리키고 있는 상태), dispatch(액션을 발생시키는 함수)]`  
컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다

```js
function reducer(state, action) {
  // action.type에 따라 다른 작업 수행
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}
const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
};
```

```js
function reducer(state, action) {
  // 3. action 에 e.target 들어옴
  return {
    // state 초기값에 새로 들어온 요소 덮어씀.
    ...state,
    [action.name]: action.value,
  };
}

const Info = () => {
  // 1. useReducer 사용. 파라미터로 리듀서 함수와 state 초기값을 넣어주면 state와 dispatch 함수 반환

  const [state, dispatch] = useReducer(reducer, {
    name: "",
    nickname: "",
  });
  const { name, nickname } = state;
  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    dispatch(e.target); // 2. dispatch 함수에 element 넣어줌.dispatch 함수는 reducer 함수를 호출해줌.
  };

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};
```

## 4. useMemo

```js
const avg = useMemo(() => getAverage(list), [list]);
```

list 배열의 내용이 바뀔 때만 getAverage 함수가 호출

## 5. useCallback

렌더링 될때마다 함수를 새로 생성하는것을 방지. 어떤 값이 바뀌었을때만 함수 생성하기 원할때 사용.  
비어있는 배열을 넣으면 렌더링 될 때 한번만 생성됨.

- useMemo : 숫자, 문자열, 객체 처럼 일반 값을 재사용
- useCallback : 함수 재사용

```js
import React, { useState, useMemo, useCallback } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성
  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  }, [number, list]); // number 혹은 list가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```

## 6. useRef

```js
const getAverage = (numbers) => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const inputEl = useRef(null);

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성
  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    inputEl.current.focus();
  }, [number, list]); // number 혹은 list가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};
```

## 7. 커스텀 Hooks 만들기

컴포넌트에서 비슷한 기능을 공유할 경우, 이를 Hook으로 작성하여 로직을 재사용할 수 있다.  
useReducer 포함 로직 포함 하여 useInputs로 감싸서 커스텀 Hooks 작성.

```js
import { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = (e) => {
    dispatch(e.target);
  };
  return [state, onChange];
}
```

```js
const Info = () => {
  const [state, onChange] = useInputs({
    name: "",
    nickname: "",
  });
  const { name, nickname } = state;

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};
```
