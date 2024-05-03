---
tags: ["tool"]
---

# Eclipse 기능 정리. 내가 보는용

## [이클립스 Java development user guide](https://help.eclipse.org/latest/index.jsp?nav=/1)

## SVN comment log 수정하기

History -> 자신이 바꾸고싶은 comment가 있는 부분을 선택하여
**[마우스 우클릭] - [Show Revision Properties]**
그러면 **Revision Properties** 라는 **탭**이 생기고
![enter image description here](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https://blog.kakaocdn.net/dn/bRSuz7/btqw6o3mHlx/SBM1kayg9ogGxyESnHlPY1/img.png)
**svn:log** **부분**에서
**[마우스 우클릭] - [Edit...]**
이제 log을 변경하고싶은 comment를 작성하고 OK를 눌러주면 끝
권한이 없다면 관리자에게 연락

## 이클립스 디버깅

- breakpoints
- variables
- expressions
  [https://spoqa.github.io/2012/03/05/eclipse-debugger.html](https://spoqa.github.io/2012/03/05/eclipse-debugger.html)

## 이클립스 svn 특정 이전 버전으로 되돌리기

간만에 쓰는 svn.. 혼란스럽다...

![](https://t1.daumcdn.net/cfile/tistory/99A4AD4B5A3FBA6D29)

1. 선택파일 > 마우스 우클릭 > Team > Update To Revision

2. Revison 선택 > Browse 버튼 클릭하여 파일 이전 버전을 선택

## Compare with Other Resource – The Easy Way using Eclipse (no additional plugin required)

`Ctrl+3 (for Quick Access)` -> search for `Compare with Other Resource`

![Compare with Other Resource](https://i.stack.imgur.com/5Rfmi.png)

> 이클립스 기본기능.
>
> 다른 워크스페이스에 있는 소스와 비교하고 싶을때 유용하게 사용. 외부 파일끼리도 비교 가능.
>
> 폴더 지정해서 여러파일을 한꺼번에 비교 가능하다.
>
> 근데 폴더 뎁스가 2 넘어가면 안되는거 같음.
>
> workspace 에는 현재 워크스페이스에서 비교하고 싶은 소스나 폴더 끌어다 놓아서 설정도 가능

[https://stackoverflow.com/questions/4623564/how-do-i-compare-two-files-using-eclipse-is-there-any-option-provided-by-eclips](https://stackoverflow.com/questions/4623564/how-do-i-compare-two-files-using-eclipse-is-there-any-option-provided-by-eclips)

## 단축키

내 머리는 왜이렇게 나쁜걸까... 죽어도 안외워 지는데 이번에 프로젝트하면서 call hierarchy 단축키는 한 500번 이상 누른거 같다 이거만 외워짐 ㅎㅅㅎ

`Ctrl` + `Shift` + `L` : 단축키 표시가 나온다  
`Ctrl` + `Alt` + `H` : Call Hierarchy
