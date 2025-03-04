---
title: vuepress 블로그 마크다운
lang: ko-KR
date: 2022/01/01 00:00:00
lastUpdated: 2022/01/01 00:00:01
subTitle: 마크다운 문법 vuepress 블로그용 정리
meta:
  - name: 마크다운 블로그용
    content: 마크다운 블로그용 정리
tags: ["vuepress"]
---

# {{ $frontmatter.title }}

## 이탤릭체, 볼드, 취소선, 밑줄

```md
*이탤릭체*  
_이탤릭체_  
**볼드**  
__볼드__  
~~취소선~~  
<U>밑줄</U>  
<mark>형광펜</mark>
```

> *이탤릭체*  
> _이탤릭체_  
> **볼드**  
> __볼드__  
> ~~취소선~~  
> <U>밑줄</U>  
> <mark>형광펜</mark>

## 표
```md
|    |<center>right</center>|<center>left</center>|center                |
|----|---------------------:|:--------------------|:--------------------:|   # 차례로 오른쪽, 왼쪽, 가운데 정렬
|row1|data                  |data                 |data                  |
|row2|data2-1               |data2-2              |data2-3               |
|row3|data 3-1              |data 3-2             |data 3-3              |
```

|    |<center>right</center>|<center>left</center>|center                 |
|----|---------------------:|:--------------------|:---------------------:|
|row1|data                  |data                 |data                   |
|row2|data2-1               |data2-2              |data2-3                |
|row3|data 3-1              |data 3-2             |data 3-3               |

## escape

backslash(\\)를 사용

    const message = \`제 이름은 ${name}입니다\`;

const message = \`제 이름은 ${name}입니다\`;

## image

```md
![image](~@image/1.jpg)
```

![image](~@image/1.jpg)

## list(\*, +, -)

```md
- 1단계
  - 2단계
    - 3단계
      - 4단계
```

- 1단계
  - 2단계
    - 3단계
      - 4단계

## Links

```md
<!-- relative path -->

[Home](../README.md)  
[Config Reference](../reference/config.md)  
[Getting Started](./getting-started.md)

<!-- absolute path -->

[Guide](/guide/README.md)  
[Config Reference > markdown.links](/reference/config.md#links)

<!-- URL -->

[GitHub](https://github.com)
```

## Emoji :smiley:

```md
:tada:
```

:tada:

[emoji cheat sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md)

## Table of Contents

```md
[[toc]]
```

## Code Blocks

### Line Highlighting

````md
```ts{1,6-8}
import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: 'Hello, VuePress',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
  }),
})
```
````

- Line ranges: {5-8}
- Multiple single lines: {4,7,9}
- Combined: {4,7-13,16,23-27,40}

## Components

```md
<Badge text="demo" />
- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="error" text="v2" vertical="bottom" />
```

<Badge text="demo" />
- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="error" text="v2" vertical="bottom" />

## Code Groups and Code Blocks <Badge type="tip" text="1.6.0+" vertical="top" />

<code-group>
<code-block title="YARN">
```bash
yarn create vuepress-site [optionalDirectoryName]
```
</code-block>

<code-block title="NPM">
```bash
npx create-vuepress-site [optionalDirectoryName]
```
</code-block>
</code-group>

## Default Title

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block, which does not work in IE / Edge
:::

::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code

```js
console.log("Hello, VuePress!");
```

:::

````md
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block, which does not work in IE / Edge
:::

::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code

```js
console.log("Hello, VuePress!");
```

:::
````
