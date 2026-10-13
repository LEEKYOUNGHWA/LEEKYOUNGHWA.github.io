---
title: "vuepress 블로그 google analytics"
section: posts
lastUpdated: "2022/01/01 13:46:26"
subTitle: "vuepress google analytics"
tags: ["vuepress"]
---

[https://github.com/vuejs/vuepress/issues/2713](https://github.com/vuejs/vuepress/issues/2713)

[https://stackoverflow.com/questions/62563531/how-can-i-add-google-analytics-to-my-vuepress-website-in-accordance-with-gdpr](https://stackoverflow.com/questions/62563531/how-can-i-add-google-analytics-to-my-vuepress-website-in-accordance-with-gdpr)

위 두 사이트 참고해서 적용하였다. 줄바꿈이랑 콤마 지저분해서 깔끔하게 'script' 두줄로 만들어 줬다.

`config.js`

```js {20,21}
module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'BLOG',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-672PNZBWWP'}],
    ['script', {}, ["window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-672PNZBWWP');"]],
  ],
```

F12 개발자도구 콘솔에서 아래와 같이 뜨면 성공

```
> gtag
< ƒ gtag(){dataLayer.push(arguments);}
```

애널리틱스 홈에들어가면 바로 성공이라고 뜬다
[https://analytics.google.com/](https://analytics.google.com/)

> ### 데이터 수집이 활성화되었습니다.
>
> 🎉 애널리틱스 계정에 표시되기까지 최대 24시간이 소요될 수 있습니다.

![ga](/image/2024/ga.png)
