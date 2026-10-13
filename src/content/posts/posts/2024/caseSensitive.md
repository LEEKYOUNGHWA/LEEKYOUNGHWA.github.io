---
title: "리눅스는 대소문자 구분하고 윈도우는 대소문자 구분 못한다"
section: posts
lastUpdated: "2024/09/12 09:29:00"
---

윈도우는 case sensitive가 없다,하지만 리눅스는 case sensitive가 있다.

예를 들어 cd abcd란 명령이 있다고 할때,

윈도우 : 

```cmd
cd abcd (O)            
CD abcd (O)
```

리눅스 : 
```cmd
cd abcd (O)            
CD abcd (X)
```
이렇게 된다. 즉 동일한 커맨드일 때, 오타가 아닌 대소문자 문제라면 윈도우에선 정상작동, 리눅스에선 오작동이 일어난다.

이유를 들자면, 리눅스 : 유닉스에서 나온것이고, 유닉스는 C에서 출발한 것이며, C는 case sensitive가 된다. 

윈도우 : 도스엔 to_upper()만 지원했다. 즉 파일이름은 무조건 대문자였고, 이 전통이 이어져 내려왔기 때문에 case sensitive가 없다.

참고 : [Why is linux case sensitive?](http://www.linuxquestions.org/questions/linux-general-1/why-is-linux-case-sensitive-125995/) 

출처 : [lemeraldl.tistory.com/entry/리눅스는-대소문자-구분하고-윈도우는-대소문자-구분-못한다](https://lemeraldl.tistory.com/entry/%EB%A6%AC%EB%88%85%EC%8A%A4%EB%8A%94-%EB%8C%80%EC%86%8C%EB%AC%B8%EC%9E%90-%EA%B5%AC%EB%B6%84%ED%95%98%EA%B3%A0-%EC%9C%88%EB%8F%84%EC%9A%B0%EB%8A%94-%EB%8C%80%EC%86%8C%EB%AC%B8%EC%9E%90-%EA%B5%AC%EB%B6%84-%EB%AA%BB%ED%95%9C%EB%8B%A4)
