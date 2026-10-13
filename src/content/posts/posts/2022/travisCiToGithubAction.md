---
title: "vuepress 블로그 CD/CI"
section: posts
lastUpdated: "2022/11/10 00:00:0"
subTitle: "travis ci 유료화로 github action 으로 이사간 로그."
tags: ["vuepress"]
---

## travis ci 유료화

4개월만에 git블로그에 글을 쓰고 자동으로 배포가 되길 기다렸으나.. 요지부동 이었다. 이놈의 블로그는 참 손이 많이 간다.. (티스토리로 옮기고 싶은 마음이 굴뚝같지만 그동안 쓴 시간이 아깝고..)

### Builds have been temporarily disabled for private and public repositories due to a negative credit balance. Please go to the Plan page to replenish your credit balance.

travis ci에서 위와 같은 메시지를 뿜으며 아무런 동작을 안하길래 폭풍 구글링을 했다.

- 마이그를 해라 -> 이미 수개월전에 마이그함
- 토글을 켜라 -> 이미 켜져있음
- 크레딧??? (언제생겼지..) -> 남아있음

[https://dqdongg.com/blog/github/web/2021/05/04/Blog-github-action.html](https://dqdongg.com/blog/github/web/2021/05/04/Blog-github-action.html)

나와 비슷한 처지인 블로그가 있었다.. 결론: 30일 무료 평가판을 쓰고 나면 더이상 무료로 사용이 불가능 하다.

> ### 무료 평가판 플랜
>
> 모든 신규 사용자가 가입 시 선택할 수 있는 무료 '평가판' 플랜은 사용자 수에 제한이 없는 사용량 기반 플랜으로, 즉시 구축을 시작할 수 있는 10,000개의 평가판 크레딧 풀이 함께 제공됩니다. 이러한 크레딧이 소진되면 보충되지 않으며 사용자는 계속 구축하려면 더 높은 요금제에 가입해야 합니다. [OSS 크레딧 수당](https://docs.travis-ci.com/user/billing-faq/#what-if-i-am-building-open-source) 을 요청 하거나 사용 가능한 계획 중 하나를 고려하십시오.
> **_평가판 크레딧은 30일 동안만 유효합니다._**

## github Action 세팅

몇년동안 잘 쓴 travis ci를 뒤로하고.. github Action으로 옮기기로 마음 먹었다.

블로그 참고하여 진행하였다. [참고](https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-github-actions/#vuepress-github-actions%E1%84%85%E1%85%A9-%E1%84%8C%E1%85%A1%E1%84%83%E1%85%A9%E1%86%BC%E1%84%87%E1%85%A2%E1%84%91%E1%85%A9%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5)

기존의 travis ci yml 파일은 과감히 지우고 **_.github/workflows/main.yml_** yml 파일 다시 생성해 주었다

토큰 설정까지 완료하였으나 가상 머신에서 에러를 뿜으며 빌드가 되지 않았다.....

## The engine "node" is incompatible with this module

다시 폭풍 서치.....

[the engine node is incompatible with this module](https://stackoverflow.com/questions/56617209/the-engine-node-is-incompatible-with-this-module)

> **_yarn --ignore-engines_**
> 엔진 체크를 무시하는 명령어를 추가해 주었다.

```
// .github/workflows/main.yml

name: Build and Deploy
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: Deploy Build Files
      uses: jenkey2011/vuepress-deploy@1.0.1
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        BUILD_SCRIPT: yarn --ignore-engines && yarn docs:build
        TARGET_BRANCH: gh-pages
        BUILD_DIR: docs/.vuepress/dist
```

정상적으로 빌드 배포되는것 확인하였다
이전 완료!
