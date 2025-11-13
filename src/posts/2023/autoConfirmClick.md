---
title: GetSmart 자동 재생 V3
lang: ko-KR
date: 2023/11/20 10:00:00
lastUpdated: 2025/11/11 10:20:00
subTitle: Tampermonkey를 사용한 확실한 방법!! alert() 이나 confirm() 없애고 의무교육 동영상 자동재생
image: https://www.tampermonkey.net/images/ape.svg
description: GetSmart 자동 재생 알림창(alert/confirm) 제거, 동영상 끝으로 이동, 인프런 강의 자동 재생. 사내 의무교육 및 온라인 강의를 빠르게 완료
meta:
  - name: description
    content: "GetSmart 겟 스마트 자동 재생 Tampermonkey 활용 . 알림창(alert/confirm) 제거, 동영상 끝으로 이동, 인프런 강의 자동 재생까지. 사내 의무교육 및 온라인 강의를 빠르게 완료하세요."
  - name: keywords
    content: "겟스마트, 겟 스마트, GetSmart, Tampermonkey, 자동 재생, alert 제거, confirm 제거, 인프런, 온라인 강의, 사내 교육, 동영상 끝으로 이동, 교육 자동화"
tags: ["javascript"]
sidebar: false
---

# {{ $frontmatter.title }}

> ## 2025년 V3 업데이트
>
> 어느덧 3주년을 맞이한 getSmart 자동재생 입니다! 올해는 또 넘어가기가 안되는군용?ㅋㅋ  
> 소스상에서는 땡겨집니다(다행)  
> 그리고 브라우저 정책상 자동재생이 막혔더군요 깨알 상식 공유차원에서 한번 읽어보십숑  
> 밑에 [스크립트](#4-스크립트-작성후-ctrls-저장-상단-주석도-중요합니다용-전체-복사-후-붙여넣기-해주세요) 업데이트 했슴다 `video.muted = true; ` 한줄 추가했습니다.  
> 그대로 복붙하시면 됩니다~!
> ![tampermonkey](~@image/2025/11/11/mutevideo.png)

::: details History

> ## 2024년
>
> 아니 원래 넘어가기가 안됬었는데 넘어가지는군요?  
> 버튼을 100번 누르느냐 세팅해놓고 자동 재생 시키느냐는 여러분들의 선택...  
> ++ 영재M 의 스크립트 보완(감사감사) 에 제가 더 수정함  
> ++ 지현M 문의 보완

> ## 2023년
>
> getSmart 라는 사내 교육프로그램이 있는데 다음 차시로 넘어갈때마다 확인 누르는게 너무 귀찮다.  
> 다음 차시로 자동으로 넘어가게 alert(confirm)을 없애는 스크립트를 짜봤다.  
> 의무교육들을때 크롬 탭에서 한꺼번에 4개의 강좌를 동시에 돌리면 됨.  
> 다음 페이지로 넘어갈때 화면에서 발생하는 alert 이나 confirm 없애고 재생 위치를 뒤쪽으로 당겨 자동으로 재생시켜 줍니다
>
> - 참고 : [detect-if-an-alert-or-confirm-is-displayed-on-a-page](https://stackoverflow.com/questions/4866986/detect-if-an-alert-or-confirm-is-displayed-on-a-page)

:::

# 사내 자체 프로그램용

## 1. [Tampermonkey 크롬 확장 프로그램](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) 설치해 주세용. 한번 세팅해놓으면 두고두고 사용 가능

## 2. **_!!!확장 프로그램 개발자 모드 켜주세요!!!_** 안키면 파란 메시지 뜨면서 작동이 안됩니당 ㅠ

`크롬 더보기` > `확장 프로그램` > `확장 프로그램 관리` > 우측 상단 `개발자 모드` 활성화

![tampermonkey4](~@image/2025/11/11/tampermonkey4.png)

![tampermonkey2](~@image/2025/11/11/devon.png)
![tampermonkey2](~@image/2025/11/11/devonon.png)

![tampermonkey3](~@image/2025/11/11/tampermonkey3.png)

:::tip 개발자모드 활성화 먹지 않는다면
개발자 모드 활성화 했는데도 자꾸 파란 창 뜨면서 개발자 모드 활성화 해라 뜬다면  
아래와 같이 모든 토글 활성화 시켜 주세요
`thanks to siver joy`
![tampermonkey3](~@image/2025/11/11/tip.png)
:::

## 3. Tampermonkey 스크립트 어떻게 공유하는지 모르겠군용 하나 만들어 주세요

![tampermonkey2](~@image/2025/11/11/tampermonkey2.png)

## 4. 스크립트 작성후 `ctrl`+`s` 저장! (상단 주석도 중요합니다용 전체 복사 후 붙여넣기 해주세요)

```js
// ==UserScript==
// @name         getsmart 알럿 없애기 및 동영상 자동 재생, 끝으로 이동
// @namespace    https://leekyounghwa.github.io/posts/2023/autoConfirmClick.html
// @version      2025-11-11
// @description  getsmart 알럿 없애기, 동영상 자동 재생 및 끝으로 이동
// @match        https://gsitm.getsmart.co.kr/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  console.log("pageload");
  // 알림 창 자동 확인 설정
  var _old_confirm = window.confirm;
  window.confirm = function () {
    return true; // 자동 확인
    _old_confirm.apply(window, arguments);
  };

  setInterval(function () {
    // 동영상 요소 찾기
    var video = document.querySelector("video");
    video.muted = true; // 2025 업데이트 동영상 mute
    if (video && video.currentTime < video.duration - 5) {
      // 동영상 자동 재생
      video
        .play()
        .then(() => {
          console.log("동영상이 자동 재생되었습니다.");

          // 동영상을 끝으로 이동 (끝에서 5초 전)
          var videoDuration = video.duration;
          video.currentTime = videoDuration - 5;
          console.log("동영상이 끝부분으로 이동했습니다.");
        })
        .catch((error) => {
          console.log("자동 재생 실패:", error);
        });
    }
  }, 5000); // 5초마다 체크
})();
```

![tampermonkey1](~@image/2025/11/11/tampermonkey1.png)

## 5. 동영상 실행

실행하면 금방 끝납니다 5분안에 SSAP 가능

멈추면 다 종료된겁니다..!

문의사항 있으면 언제든지 팀즈주세용~

# 인프런용

```js
// ==UserScript==
// @name         인프런 건너뛰기
// @namespace    http://tampermonkey.net/
// @version      2025-11-11
// @description  인프런 강의 자동 건너뛰기
// @author       You
// @match        https://www.inflearn.com/courses/lecture?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=inflearn.com
// @grant        none
// ==/UserScript==
(function () {
  "use strict";

  console.log("인프런 건너뛰기 start");

  let clickingNext = false; // 중복 클릭 방지 플래그

  setInterval(async function () {
    const video = document.querySelector("video");

    if (video && video.currentTime != video.duration) {
      video.muted = true;
      if (video.currentTime < video.duration - 5) {
        try {
          await video.play();
          console.log("동영상이 자동 재생되었습니다.");
          video.currentTime = video.duration - 5;
          console.log("동영상이 끝부분으로 이동했습니다.");
        } catch (error) {
          console.log("자동 재생 실패:", error);
        }
      }
    } else {
      const nextBtn = Array.from(
        document.querySelectorAll(
          ".mantine-UnstyledButton-root.mantine-Button-root"
        )
      ).find((btn) => btn.textContent.includes("다음"));

      if (nextBtn && !clickingNext) {
        clickingNext = true; // 클릭 진행 중
        console.log("'다음' 버튼을 5초 후 클릭 예정...");
        await new Promise((resolve) => setTimeout(resolve, 5000)); // 10초 대기
        nextBtn.click();
        console.log("'다음' 버튼 클릭 완료!");
        clickingNext = false; // 클릭 완료 후 플래그 해제
      } else if (!nextBtn) {
        console.log("'다음' 버튼을 찾을 수 없습니다.");
      }
    }
  }, 5000);
})();
```
