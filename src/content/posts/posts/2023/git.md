---
title: "git 명령어 정리"
section: posts
lastUpdated: "2023/11/20 10:00:00"
subTitle: "git 명령어 정리"
tags: ["git"]
---

```sh

git reset --hard 0f16a57a[되돌아가고싶은커밋]
git push -f origin develop # 강제 푸쉬
```
```sh
# Repository 생성
# 새로운 로컬 저장소를 생성하기
git init [project_name]
# 이미 있는 저장소로 부터 다운로드 하기
git clone [url]

# Local Repository 살펴보기
# 아직 commit 되지 않은 새파일 혹은 변경된 파일 목록 보기
git status
# unstage 파일들의 변경 보기
git diff
# staged 파일들의 변경 보기
git diff --cached
# 모든 staged와 unstage 파일들의 변경 보기
git diff HEAD
# 두 commit id들 사이의 변화 보기
git diff commit1 commit2
# 파일의 변경일과 작성자의 변화 목록
git blame [file]
# commit와/또는 파일의 변화 보기
git show [commit]:[file]
# 변경 이력 보기
git log
# file/directory의 변경 이력 보기
git log -p [file/directory]

# 브랜치 작업
# 모든 로컬 브랜치 목록
git branch
# 모든 로컬과 원격 브랜치 보기
git branch -av
# <branch>로 변경하고 작업 디렉토리를 업데이트
git checkout <branch>
# 브랜치 생성하기
git branch <new-branch>
# 브랜치 삭제하기
git branch -d <branch>
# branch_a를 branch_b로 머지
git checkout branch_b
git merge branch_a
# 현재 커밋에 태그 달기
git tag <tag-name>

# 변경하기
# 파일을 stage함
git add [file]
#변경된 모든 파일을 stage함
git add .
# 모든 staged 파일들을 메시지와 함께 commit
git commit -m "commit message"
# 모든 변경 사항을 반영하여 메시지와 함께 commit
git commit -am "commit message"
# 파일을 unstage함
git reset [file]
# 최근 commit의 모든것을 revert함
git reset --hard

# 동기화하기
# 원격 저장소의 변경사항 가져오기
git fetch
# 원격 저장소의 변경사항을 가져오고 머지하기
git pull
# 원격 저장소의 변경사항을 가져오고 rebase하기
git pull --rebase
# 원격 저장소에 로컬 저장소의 변경사항 넣기
git push
# git 도움말
git command --help
```

## pull request

1. [github] Fork
1. clone, remote설정
1. branch 생성
1. 수정 작업 후 add, commit, push
1. [github] Pull Request 생성
1. [github] 코드리뷰, Merge Pull Reqest
1. Merge 이후 branch 삭제 및 동기화
