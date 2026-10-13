---
title: "vuepress 블로그 배포 오류"
section: posts
lastUpdated: "2024/12/10 23:10:00"
subTitle: "쒸익"
tags: ["vuepress"]
---

## 배보다 배꼽이 더 큰 블로그 되시겠다

걍 갑자기 배포가 안된다 ?! 4일전에는 말짱했는데? @..@??

후 이놈의 블로그는 진짜 배꼽이 너무 크다....ㅋㅋㅋ  
(그래 한때 블로그 이름이 배보다 배꼽이 더 크다 였다!!)

아니 난 진짜 건드린게 없다 커밋 목록을 보면 알겠지만 머 딱히 수정한게 없다 

node... 자기 주장이 너무 강한거 아니니? 

물논 로컬에서는 아무런 문제가 없다 컄 

## 첫번쨰 빌드 오류
```
(undefined) ./node_modules/@vuepress/core/lib/client/clientEntry.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
Error: [BABEL] /github/workspace/node_modules/@vuepress/core/lib/client/clientEntry.js: Cannot find module '@jridgewell/gen-mapping'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:581:15)
    at Function.Module._load (internal/modules/cjs/loader.js:507:25)
    at Module.require (internal/modules/cjs/loader.js:637:17)
    at require (internal/modules/cjs/helpers.js:22:18)
    at Object.<anonymous> (/github/workspace/node_modules/@babel/generator/lib/source-map.js:7:19)
    at Module._compile (internal/modules/cjs/loader.js:689:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
    at Function.Module._load (internal/modules/cjs/loader.js:530:3)
    at Module.require (internal/modules/cjs/loader.js:637:17)
```

아니 이게 뭐냐고 난 건드린게 없다고 

> @jridgewell/gen-mapping은 JavaScript 프로젝트에서 소스 맵(Source Map)을 생성하고 조작하기 위한 패키지입니다. 이 패키지는 주로 Babel, Webpack, Terser와 같은 도구들이 내부적으로 사용하는 라이브러리입니다.

ㅎ...저게...뭐냐고....javascript 프로젝트..? 너무 심연 아닌가...나같은 노가다꾼이 저런거 까지 신경써야함? ㅎㅅㅎ = = 

일단 node_modules 날리고 `npm i` 다시 설치.... 다시 배포함

## 두번째 빌드 오류

```
(undefined) ./node_modules/@vuepress/core/lib/client/clientEntry.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
/github/workspace/node_modules/@jridgewell/gen-mapping/dist/gen-mapping.umd.js:1328
            const originalLine = originalSource[sourceLine] ||= [];
                                                              ^

SyntaxError: Unexpected token =
    at new Script (vm.js:79:7)
    at createScript (vm.js:251:10)
    at Object.runInThisContext (vm.js:303:10)
    at Module._compile (internal/modules/cjs/loader.js:657:28)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
    at Function.Module._load (internal/modules/cjs/loader.js:530:3)
    at Module.require (internal/modules/cjs/loader.js:637:17)
    at require (internal/modules/cjs/helpers.js:22:18)
    at Object.<anonymous> (/github/workspace/node_modules/@babel/generator/lib/source-map.js:7:19)
```
음? 

> **chatGPT** : 이 오류는 Node.js의 구 버전과 호환되지 않는 최신 JavaScript 구문(예: ||= 논리 할당 연산자)으로 인해 발생합니다. 문제를 해결하려면 아래 단계를 따르세요  
>   
> Node.js 버전 확인 및 업그레이드  :  최신 JavaScript 문법을 지원하지 않는 오래된 Node.js 버전을 사용하고 있을 가능성이 높습니다.  
> .  
> .  
> .  
> **나의 말** : 나 16.20.2 쓰고 있거든 이 버전 쓸 수 있게 해줘..  
> **ChatGPT** : Node.js 16.20.2를 GitHub Actions에서 사용할 수 있도록 워크플로우를 수정하려면, actions/setup-node를 사용하여 특정 버전을 명시해야 합니다. 아래는 수정된 workflow.yml입니다.

챗 지피티가 짜준 변경된 yml 되시겠다.

```yml
name: Build and Deploy
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    # 1. 코드 체크아웃
    - name: Checkout
      uses: actions/checkout@v3

    # 2. Node.js 16.20.2 설정
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16.20.2'

    # 3. 의존성 설치 및 VuePress 빌드
    - name: Install Dependencies and Build
      run: |
        yarn install --ignore-engines
        yarn build
      env:
        CI: true # CI 환경 설정

    # 4. 빌드 결과 배포
    - name: Deploy Build Files
      uses: jenkey2011/vuepress-deploy@1.0.1
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        TARGET_BRANCH: gh-pages
        BUILD_DIR: src/.vuepress/dist/
```

덕분에 그래도 빨리 해결 할 수 있었다... 챗지피티 아니었음 yml 만드는데 엄청 삽질 했을듯.. 생각만해도 끔쮝
