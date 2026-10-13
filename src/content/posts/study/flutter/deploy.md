---
title: "Flutter 배포"
section: study
lastUpdated: "2024/11/28 16:55:00"
subTitle: "window 환경에서 aws coludfront로 flutter 배포"
image: "https://img.icons8.com/color/512/flutter.png"
tags: ["flutter"]
---

[김진한M 블로그 ㄱ](https://meotlog.tistory.com/73)  

마지막 쉘 스크립트 전까지 따라해 준다

나는 맥 환경이 아니므로.. 걍 손수 돌려줬다...(챗 지피티가 배포까지 해주면 얼마나 좋을까)
둘다 flutter 루트 경로에서 실행한다.

1. cmd 켜서 플러터 빌드..
```cmd
flutter build web --web-renderer html --dart-define=PROFILE=env
```
2. wsl 켜서 aws 명령어 실행
```sh
# aws s3 website s3://sherryflutter/ --index-document index.html --error-document error.html
# aws s3 sync ./build/web s3://sherryflutter/ # 차이가 있는 파일만 업로드하거나 삭제
aws s3 cp build/web/ s3://sherryflutter/ --recursive # 디렉토리 내부의 모든 파일과 하위 디렉토리까지 복사
aws cloudfront create-invalidation --distribution-id E1JH0EGOJGN6Q3 --paths '/*' # 캐시를 무효화
```

[todo 최종 구현](https://d36q53cigyqtai.cloudfront.net/)
- test 계정 : test@email.com / 1234
