---
title: vuepress 블로그에 tui.grid 넣기
lang: ko-KR
date: 2024/08/29 11:23:00
lastUpdated: 2024/08/29 11:23:00
subTitle: vuepress toast-ui grid
meta:
  - name: vuepress toast-ui grid
    content: vuepress toast-ui grid
tags: ["vuepress"]
image2: /img/logo2.jpg
---

# {{ $frontmatter.title }}

vuepress 블로그에 tui.grid 삽입 삽질기를 기록해 본다.

<toastGrid/>

- [toast-ui.vue-grid](https://github.com/nhn/tui.grid/blob/master/packages/toast-ui.vue-grid/docs/getting-started.md)
- [tui.grid](https://nhn.github.io/tui.grid/latest/)

## 1. 설치

```sh
npm install --save @toast-ui/vue-grid
```

일단 패키지 설치해 준다.

## 2. vue 파일 생성

`.components` 아래 toastGrid.vue 파일 생성하고 소스 코드 작성해 준다.

## 3. 오류 해결 

오류 해결을 위해 조치했던 것들을 남겨 본다..

### render function or template not defined in component

본인은 SPA 기반 개발을 했었어서 SSR에 대해서 잘 알지 못했다... 이번에 삽질 하면서 많은것을 알게 되었다.... 그간의 의문이 약간 풀리는 느낌.. 

- [공식문서](https://v1.vuepress.vuejs.org/guide/using-vue.html#browser-api-access-restrictions)
- [stackOverflow - function or template not defined](https://stackoverflow.com/questions/54341251/render-function-or-template-not-defined-in-component-anonymous)
- [SSR](https://vuejs.org/guide/scaling-up/ssr)
- [SSR vs SPA](https://velog.io/@ru_bryunak/SPA-%EC%82%AC%EC%9A%A9%EC%97%90%EC%84%9C%EC%9D%98-SSR%EA%B3%BC-CSR)

공식문서에 친절하게 가이드가 나와있다. 뷰프레스는 ssr 기반이므로 component를 mounted 에서 임포트 해주도록 바꾸어준다.

```js
mounted() {
    import('../../../node_modules/@toast-ui/vue-grid').then(module => {
        this.dynamicComponent = module.Grid
    })
}
```

그리고 컴포넌트를 마운트 되고 난 후 임포트 할 수 있도록 template 소스도 수정해 준다.

```js
<template>
  <component
    v-if="dynamicComponent" 
    :is="dynamicComponent"
  />
</template>
```

### ReferenceError: global is not defined

- [stackOverflow - global is not defined](https://stackoverflow.com/a/73208485/10222566)

vite용 해결책이긴 한데 둘다 SSR이라 원리는 같을거 같아 적용해 보았더니 해결되었다. tui-grid 에서 글로벌 필드를 사용하는데 vuepress에서 정의 되어 있지 않은것으로 추측 된다. 

mounted 제일 처음에 소스 추가해 준다.

```js
window.global ||= window;
```

### CSS!!!!!!!!!!!

그리드에 글자가 나오지 않아 또 한참 해멨다...하.. 그리드 공식 문서 대로 css를 임포트 하면 글자가 사라지는 것이다...?! 거의 없다시피 한 css 지식을 쥐어 짜내어 가로 폭을 결정하는 css 위치를 찾아 내었다.

- [toast-ui.grid/src/css/grid.css](https://github.com/nhn/tui.grid/blob/master/packages/toast-ui.grid/src/css/grid.css)

.tui-grid-table 클래스를 보면 `width: 1px;` 로 되어 있는 것을 볼 수 있다. 이게 분명히 어디서 상속을 받던 스크립트로 조절을 해주던 조절을 해줄거 같은데
뷰프레스 css랑 어디서 충돌이 나는건지 .... 크롬 개발자 도구에서 소스를 보면 걍 1px로 고정되어 있었다. 나의 짧은 지식으로는 도저히 찾지 못하겠어서 내 컴포넌트 소스 상에서 제어해 주기로 결정했다.

그리고 또다시 시작된 css 삽질기... 그러던중 빛과 같은 해결책 발견... 

- [easiest way to make your parent div inherit it's child width.](https://stackoverflow.com/a/70394225)

` width:max-content;`

상위 div가 하위 div 의 너비를 상속받게 만드는 방법이다.

```css
.tui-grid-table {
  margin: 0;
  width:max-content;
  box-sizing: border-box;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px hidden transparent;
  border-bottom: none;
  color: black;
}
```

> 이렇게 쓰면 안될거 같긴한데..... 뭐 내블로그니까 ^^

그리드 임포트 완료!

<toastGrid 
    v-bind:data = "[
        { 
            name: '그리드',
            artist: '테스트'
        },
        { 
            name: '마크다운에서',
            artist: '내용작성가능'
        }
    ]"
    v-bind:columns = "[
        {
            header: 'title',
            name: 'name',
        },
        {
            header: 'desc',
            name: 'artist',
            width: 400
        }
    ]"
    v-bind:options = "{
        scrollX: false,
        scrollY: false,
        draggable: false,
    }"
/>

`markdown.md`

<Gist gistId="ad76ab3dc136bb5720b91f2510696238" file="markdown.md"/>

`src\.vuepress\components\toastGrid.vue`

<Gist gistId="ad76ab3dc136bb5720b91f2510696238" file="toastGrid.vue"/>