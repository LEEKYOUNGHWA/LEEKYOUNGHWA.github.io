# stackedit github 로그인 400 error 
https://github.com/benweet/stackedit/issues/1755#issuecomment-918949789

![저 팝업이 떳을때 소스를 실행하는게 키포인트](https://photos.app.goo.gl/obuZhHyp6c3LR9jT6)

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
eyJoaXN0b3J5IjpbMTUwNzU3MzU5MSw1MDI5NzYzMjRdfQ==
-->