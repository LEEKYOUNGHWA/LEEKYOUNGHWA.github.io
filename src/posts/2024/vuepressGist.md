---
title: vuepress 블로그에 gist 넣기
lang: ko-KR
date: 2024/01/03 16:37:00
lastUpdated: 2024/01/03 16:37:00
description: 뷰프레스에 gist 넣기 how to embed gist to vuepress blog with vue-jsonp. inspired by https://github.com/sudhanshu-15/vue-embed-gist vue-embed-gist를 사용하려고 하였으나 빌드 에러가 났다. 소스 자체는 문제가 없는거 같은데... vuepress 에서 빌드할때 원리를 모르겠어서 정확한 이유는 모르겠음. (추측상 watch 에 jsonp를 달아놔서 그런거 같긴함...) 소스 자체는 복잡해보이지 않으므로 필요한 부분만 가져와서 간단하게 만들어 줬다.
meta:
  - name: vuepress gist
    content: how to embed gist to vuepress blog
  - name: 뷰프레스 블로그에 Gist 넣기
    content: vue-embed-gist를 활용하여 뷰프레스 블로그에 gist 사용하기
tags: ["vuepress"]
---

# vuepress 블로그에 gist 넣기

Embed gist to vuepress blog. inspired by [https://github.com/sudhanshu-15/vue-embed-gist](https://github.com/sudhanshu-15/vue-embed-gist)

뷰 프레스에 gist를 넣고 싶다! gist 쓰면 소스 바꿀때마다 블로그 게시물 커밋 배포를 안해줘도 된다... 
누군가 만들어 놓았겠지 하고 폭풍 검색을 했다. 
vue에 gist embed 할수있는 npm 패키지 발견. 

vue-embed-gist를 설치해서 사용하려고 하였으나 빌드 에러가 났다. 소스 자체는 문제가 없는거 같은데... vuepress 에서 빌드할때 원리를 모르겠어서 정확한 이유는 모르겠음. (추측상 watch 에 jsonp를 달아놔서 그런거 같긴함...) 소스 자체는 복잡해보이지 않으므로 필요한 부분만 가져와서 간단하게 만들어 줬다.

## 1. install [vue-jsonp](https://www.npmjs.com/package/vue-jsonp)

```sh
npm i vue-jsonp
```

일단 블로그에 jsonp 깔아준다.  

[CORS와 JSONP에 대해서](https://simsimjae.medium.com/cors%EC%99%80-jsonp%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-aa3ec0456e97)

## 2. create a component `Gist.vue`

`src/.vuepress/components/Gist.vue`

뷰프레스 블로그 경로 .vuepress/components 아래 Gist.vue 파일을 하나 만들어 주자. 그리고 아래의 소스 코드 작성.

[여기서](https://github.com/sudhanshu-15/vue-embed-gist/blob/master/src/components/VueGist.vue) watch 에 있던 jsonp 소스를 mount로 옮겨주고 쓸데없는 변수들 정리해줬다. 그리고 스타일 덮어써줬음.

<Gist gistId="860bae50029004d949dece769637be0d" file="Gist.vue"/>

## 3. use at .md file

이제 마크다운에 태그 사용해주면 끝.

```md
이것은 마크다운 입니다.

<Gist gistId="860bae50029004d949dece769637be0d" file="Gist.vue"/>
```

