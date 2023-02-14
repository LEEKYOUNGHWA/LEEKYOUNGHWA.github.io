
# sidebar 자동 생성

[https://techformist.com/automatic-dynamic-sidebar-vuepress/](https://techformist.com/automatic-dynamic-sidebar-vuepress/)

vuepress는 다 괜찮은데 게시글을 하나 생성할때마다 설정 파일에 경로를 지정해 줘야 하는게 상당히 귀찮다. 

여러 블로그랑 npm package를 봤는데 내가 원하는 모양새는 아니었다.  
vuepress에서 기본으로 제공하는 `sidebar: 'auto'` 는 한 페이지만 나오는 거였다 ㅠㅠ  
여러 폴더를 자동으로 읽지 못함..  
위 블로그에서 마지막 솔루션으로 직접 개발하는것에 아이디어를 얻어서 약간 변경해보았다.

내 폴더 구조

![2](~@image/2.png)

```js
themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: true,
    sidebar: {
      '/': getSideBar()
    }
    /*
    sidebar: {
      '/': [
        { 
          title: 'spring',
          collapsable: false,
          children: [ 
            'posts/spring/one',
            'posts/spring/two' 
          ] 
        },
        { 
          title: 'tools',
          collapsable: false,
          children: [ 
            'posts/tools/one', 
            'posts/tools/two' 
          ] 
        },       
        { 
          title: 'vue',
          collapsable: false,
          children: [ 
            'posts/vue/one', 
            'posts/vue/two' 
          ] 
        } 
      ]
    */
```

```javascript
function getSideBar() {
  const src = './src/';
  const posts = 'posts'
  const fs = require('fs');
  const fileList = [];  
  fs.readdirSync(src+posts).forEach(file => {   
    const childrenList = [];
    fs.readdirSync(src+posts+'/'+file).forEach(fileName => {
      childrenList.push((posts+'/'+file+'/'+fileName).replace('.md',''))
    });
    fileList.push({'title' : file, 'collapsable' : false, 'children' : childrenList});
  }); 
  return fileList;
}
```
이제 마크다운 파일만 생성해주면 사이드바에 자동으로 추가된다!

> Written with [StackEdit](https://stackedit.io/).
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc3MDExNzY4MSw3MzA0MjY1MjNdfQ==
-->