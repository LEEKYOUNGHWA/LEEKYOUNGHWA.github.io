---
title: "DBeaver Public Key Retrieval is not allowed 에러 해결 (MySQL·MariaDB 접속)"
subTitle: "DBeaver Driver properties에서 allowPublicKeyRetrieval을 TRUE로 바꿔 해결"
section: posts
lastUpdated: "2024/09/11 17:31:00"
---

1. 접속하고자 하는 connection을 클릭하고 우클릭한 뒤, Edit Connection을 클릭한다.
![allowPublicKeyRetrieval](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTiNGe%2FbtrMcPswAu5%2F3cVFwtpwMrtBRcl06KTm41%2Fimg.png)

2. 클릭 후 나오는 창에서 Driver properties 탭에 들어가서 allowPublicKeyRetrieval의 값을 TRUE로 변경해준뒤 확인 버튼을 누르면 해결된다!
![allowPublicKeyRetrieval](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcrthFm%2FbtrMbxlgyUU%2Fgr5ighdyy38wB65hqMRmBk%2Fimg.png)
