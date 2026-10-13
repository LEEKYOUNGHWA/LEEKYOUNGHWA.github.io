# BLOG

## [LEEKYOUNGHWA.github.io](https://LEEKYOUNGHWA.github.io)

[Astro](https://astro.build)로 만든 블로그. 2026년 10월 VuePress 1에서 이전함.

## 실행

Node 22.12 이상 필요 (`.nvmrc` 기준 24)

```
nvm install
nvm use
npm i
npm run dev
```

http://localhost:4321

## 글 쓰기

`src/content/posts/` 아래에 마크다운 파일 추가

| 폴더 | 메뉴 |
|---|---|
| `posts/연도/` | TIL |
| `study/주제/` | Study |
| `blog/분류/` | Journal |
| `trash/` | 개인 아카이브 (메뉴·검색 노출 X) |

```md
---
title: "글 제목"
section: posts            # posts | study | blog | etc | trash
lastUpdated: "2026/10/14 10:00:00"
subTitle: "목록과 검색 결과에 나오는 설명"
image: "https://..."      # 목록 썸네일 (선택)
tags: ["태그"]             # 선택
---

본문
```

Youtube, Gist, Music 같은 컴포넌트를 쓰려면 `.mdx` 파일로 만들고 `src/components`에서 import.

## 배포

`main`에 push하면 GitHub Actions가 빌드해서 `gh-pages` 브랜치로 배포.
