---
title: "git reset --hard 되돌리기와 여러 커밋 하나로 합치기"
subTitle: "git reset --hard 사용법과 여러 커밋(commit)을 하나로 합치는 방법"
section: posts
lastUpdated: "2024/06/24 14:57:00"
---

## git reset hard

```sh
git reset --hard c8b0119a11479eb5c7baba0e7c385ba91775354f 
git push origin HEAD --force
```

## 여러 커밋(commit) 하나로 합치기

3개의 커밋을 하나로 합칠 수 있다. 숫자 변경해서 원하는 커밋 갯수 만큼 하나로 합치기 가능.

```sh
git rebase -i HEAD~3
```

2,3을 1로 합치고 싶으면 vi 창에서 커밋 메시지 2, 3의 pick => s 로 바꾸고 :wq 를 눌러 저장,종료 해준다.

그러면 합쳐서 보여줄 커밋 메세지를 수정할 수 있다. 원하는 메세지로 변경해서 다시 :wq 를 눌러 저장, 종료.

repository로 push 해준다.

```sh
git push -f origin master
```
