---
title: 마크다운 블로그용
lang: ko-KR
date: 2023/12/07 00:00:00
lastUpdated: 2022/01/01 00:00:00
description: 마크다운 블로그용
meta:
  - name: 마크다운 블로그용
    content: 마크다운 블로그용
tags: ["vuepress"]
---

# 마크다운 블로그용

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
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />
```

<Badge text="demo" />
- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />

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
