---
title: "리액트 라우터 (SPA)"
section: trash
lastUpdated: "2023/12/18 10:00:00"
description: "리액트 라우터 (SPA)"
---

- [리액트 환경설정](./day1.md)
- [라이프사이클 메서드](./day2.md)
- [Hooks](./day3.md)
- [컴포넌트 스타일링](./day4.md)
- [todo실습 - 환경구성, 불변성, react-virtualized](./day5.md)
- `라우터`
- [axios](./day7.md)


> ## SPA(Single Page Application)
>
> - SPA는 웹 앱에 필요한 모든 정적 리소스를 처음에 한번 다운로드한다.
> - 페이지 간 이동 시, 페이지 갱신에 필요한 데이터만을 JSON으로 전달받아 변경되는 부분만을 갱신
> - React에서 SPA를 구현하기 위해서 가장 많이 사용하는 라이브러리가 React Router

## 리액트 라우터 (SPA)

생각없이 설치하니까 6이 깔렸다 책에 버전좀 적어줬으면 좋겠다  
리액트 라우터 5랑 6이 문법이 좀 다르다.  
교재 예시 소스는 5지만 깔린김에 6으로 해봤음.

```sh
yarn add react-router-dom
```

```js
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </div>
  );
};
```

```js
const { username } = useParams();
```

## 쿼리 문자열을 객체로 (qs 라이브러리 사용)

```sh
yarn add qs
```

```js
const About = () => {
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true, // 이 설정을 통해 문자열 맨 앞의 ?를 생략합니다.
  });
  const showDetail = query.detail === "true"; // 쿼리의 파싱 결과 값은 문자열입니다.
  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
      {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
    </div>
  );
};
```

## 5 : history ==> 6 : useNavigate()

```js
const navigate = useNavigate();

// 뒤로가기
// 인덱스로 처리, 두번 뒤로 가고싶으면 -2
const handleGoBack = () => {
  navigate(-1);
};

// 홈으로 가기
const handleGoHome = () => {
  navigate("/");
};
```

## 5: withRouter ==> 6: useParams, useLocation, useNavigate

```js
const WithRouterSample = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <h4>Location</h4>
      <textarea value={JSON.stringify(location, null, 2)} readOnly />

      <h4>Params</h4>
      <textarea value={JSON.stringify(params)} readOnly />

      <button onClick={() => navigate("/")}>홈으로</button>
    </>
  );
};
```

## 5 : Switch ==> 6 : Routes

```js
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/register" element={<Register />} />
</Routes>
```
