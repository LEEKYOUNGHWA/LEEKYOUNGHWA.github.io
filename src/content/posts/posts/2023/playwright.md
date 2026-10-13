---
title: "playwright"
section: posts
lastUpdated: "2023/12/22 00:00:00"
subTitle: "playwright Microsoft에서 출시한 브라우저 테스트 및 웹 스크래핑을 위한 오픈 소스 자동화 라이브러리 브라우저 동작을 자동화 해줌... 신기하다....playwright에 코드를 자동으로 써주는?? 녹화해주는 codegen 이라는 기능이 있음. 귀찮게 요소 하나하나 찾아서 소스를 안짜줘도 되는게 젤 좋은거 같다.  녹화버튼 누르고 원하는 액션 하면 소스가 자동으로 생성됨.  녹화한 소스 그대로 돌리면 자동화 완성이다."
tags: ["python"]
---

오늘 엄청 신기한걸 알게 되었음.

- playwright : 2020년에 Microsoft에서 출시한 브라우저 테스트 및 웹 스크래핑을 위한 오픈 소스 자동화 라이브러리.

브라우저 동작을 자동화 해줌... 신기하다....

[설치 공식문서](https://playwright.dev/python/docs/intro)

```sh
conda config --add channels conda-forge
conda config --add channels microsoft
conda install playwright
playwright install
```

> 처음에 pip으로 설치 해서 삭제하고 다시 conda로 깔아줬음  
> pip 으로 설치 하면 python -m playwright install

## codegen

- [codegen 링크](https://playwright.dev/python/docs/codegen)

playwright에 코드를 자동으로 써주는?? 녹화해주는 codegen 이라는 기능이 있음.
귀찮게 요소 하나하나 찾아서 소스를 안짜줘도 되는게 젤 좋은거 같다.  
녹화버튼 누르고 원하는 액션 하면 소스가 자동으로 생성됨.  
녹화한 소스 그대로 돌리면 자동화 완성이다.

> ++ 코딩을 완벽하게 해주지 않음 요소 선택하는 정도로만 활용 가능...

```sh
playwright codegen demo.playwright.dev/todomvc
```

![image](/image/16.jpg)

## 페이지 캡처 자동화

전자책 캡처 자동화 소스를 짜봤다...  
codegen으로 소스 어느정도는 만들어주는데 비동기 처리는 해주지 않음.. 좀 번거롭긴 하다.  
걍 원하는 폴더에 .py 파일 넣고 idle 에서 실행.

```py
import asyncio
from playwright.async_api import Playwright, async_playwright
import time

async def run(playwright: Playwright) -> None:
    browser = await playwright.chromium.launch(headless=False) # 크롬 사용
    context = await browser.new_context()  # 새 콘텍스트 생성
    page = await context.new_page()  # 새 페이지 열기
    await page.set_viewport_size({"width": 1900, "height": 950}) # 브라우저 사이즈 설정
    await page.goto("https://e-lib.sen.go.kr/member/login.php")  # 홈페이지로 이동

    await page.get_by_role("link", name="로그인").click()
    # 홈페이지 자체에서 한번에 로그인이 안되는 버그가 있음 걍 두번 로그인 해줬음.
    await page.get_by_placeholder("아이디").click()
    await page.get_by_placeholder("아이디").fill("아이디넣으세요")
    await page.get_by_placeholder("아이디").press("Tab")
    await page.get_by_placeholder("비밀번호").fill("비번넣으세요")
    await page.get_by_role("button", name="로그인").click()
    await page.get_by_placeholder("아이디").click()
    await page.get_by_placeholder("아이디").fill("아이디넣으세요")
    await page.get_by_placeholder("아이디").press("Tab")
    await page.get_by_placeholder("비밀번호").fill("비번넣으세요")
    await page.get_by_role("button", name="로그인").click()

    await page.get_by_role("link", name="구독형전자책", exact=True).click()
    async with page.expect_popup() as page3_info:
        await page.get_by_role("link", name="구독형 서비스 바로가기").click()
    page3 = await page3_info.value
    await page3.get_by_role("link", name="내서재").click()

    await page3.get_by_role("listitem").filter(has_text="바로 읽기 독서 토론 가기 삭제 바로 읽기 상세 보기 현장에서 바로 써먹는 리액트 with 타입스크립트 김정헌").locator("img").nth(1).click()
    async with page3.expect_popup() as page4_info:
        await page3.get_by_text("바로 읽기").first.click()
    page4 = await page4_info.value
    await page4.set_viewport_size({"width": 1900, "height": 950})
    await page4.get_by_role("button", name="다음 버튼").click()

    for i in range(288):
        _path = str(i) + '.png'
        time.sleep(2) # 백화현상때문에 걍 2초 딜레이 줬음
        await page4.locator("#viewer").screenshot(path=_path);
        time.sleep(2)
        await page4.get_by_role("button", name="다음 버튼").click()

async def main() -> None:
    async with async_playwright() as playwright:
    	await run(playwright)

asyncio.run(main()) # 실행
```

![image](/image/19.jpg)
