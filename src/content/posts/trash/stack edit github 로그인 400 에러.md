---
title: "stackedit github 연동 400 error 해결"
section: trash
---

[https://github.com/benweet/stackedit/issues/1755#issuecomment-918949789](https://github.com/benweet/stackedit/issues/1755#issuecomment-918949789)

![image](/image/1.jpg)
`저 팝업이 떳을때 소스를 실행하는게 키포인트 ㅜㅜ 바보같이 이걸 헤멨다`

소스 실행하고 체크박스 체크하고 ok 클릭.
토큰은 깃헙에서 새로 발급 받았다. 예전이랑 방식이 바뀐듯

```js
window.XMLHttpRequest =  class MyXMLHttpRequest extends window.XMLHttpRequest {
  open(...args){
    if(args[1].startsWith("https://api.github.com/user?access_token=")) {
      // apply fix as described by github
      // https://developer.github.com/changes/2020-02-10-deprecating-auth-through-query-param/#changes-to-make
  
      const segments = args[1].split("?");
      args[1] = segments[0]; // remove query params from url
      const token = segments[1].split("=")[1]; // save the token
      
      const ret = super.open(...args);
      
      this.setRequestHeader("Authorization", `token ${token}`); // set required header
      
      return ret;
    }
    else {
      return super.open(...args);
    }
  }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTgyNDg0NTY0M119
-->
