---
title: "리액트 환경설정"
section: trash
lastUpdated: "2023/12/11 10:00:00"
description: "리액트 환경 설정. yarn, vscode, node, Prettier, ESLint, Reactjs Code Snippet, 디버깅"
---

- `리액트 환경설정`
- [라이프사이클 메서드](./day2.md)
- [Hooks](./day3.md)
- [컴포넌트 스타일링](./day4.md)
- [todo실습 - 환경구성, 불변성, react-virtualized](./day5.md)
- [라우터](./day6.md)
- [axios](./day7.md)


## 교재

- [리액트를 다루는 기술](https://thebook.io/080203/)

## 설치

- 교재에서 yarn 쓰고 있어서 설치. 난 초코라티 쓰고 있으므로 choco 사용해서 설치해줬음.

```sh
choco install yarn
```

- self signed certificate in certificate chain' 에러 발생시 (회사 방화벽 문제일듯) 둘다 실행해줘야 정상동작 했음.

```sh
npm config set strict-ssl false
yarn config set "strict-ssl" false
```

- 리액트 프로젝트 만들고 실행

```sh
yarn create react-app hello-react
cd hello-react
yarn start
```

- VS Code 마켓플레이스: `ESLint`, `Prettier`, `Reactjs Code Snippet` `vscode-styled-components` 설치
- Reactjs Code Snippet 기본 소스 자동생성 : rsc(함수형 컴포넌트 생성), rcc(클래스형 컴포넌트 생성) + `enter`
- 문제 탭: VS Code의 상단 메뉴에서 보기 > 문제
- 초록색 줄이 그어진 코드는 고치기 싫다면 그냥 무시해도 되지만 빨간색 줄이 그어진 코드는 반드시 고쳐야함.
- Prettier : VS Code에서 F1을 누르고 format이라고 입력한 다음 Enter
- 저장할 때 자동으로 코드 정리하기 : 파일 > 기본 설정 > 설정 메뉴 format on save를 검색 > 체크 박스에 체크

# 디버깅

vscode 디버깅 사용 (크롬 디버깅 사용해도 됨)  
`vscode` -> `구성추가` -> `크롬 시작` -> 이름 원하는걸로 변경 -> url 포트 3000번으로 변경 -> yarn start 한 상태에서 디버깅 시작해주면 된다.

[블로그 참고 하였음.](https://kwonkyo.tistory.com/564#gsc.tab=0)

`launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "크롬디버깅3000",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```
