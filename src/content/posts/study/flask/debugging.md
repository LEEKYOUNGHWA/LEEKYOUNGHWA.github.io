---
title: "Flask VSCode Debugging"
section: study
lastUpdated: "2024/11/05 14:47:00"
subTitle: "Flask VSCode 디버깅 설정"
image: "https://img.icons8.com/?size=512&id=TtXEs5SeYLG8&format=png"
tags: ["flask"]
---

일단 난 플라스크 환경을 wsl에 세팅 했다.  

## vscode flask 디버깅 설정
1. wsl 에서 python 가상환경 flask 로컬 서버 띄우는거까지 했다고 가정하고 스타트
1. vsCode 제일 왼쪽 하단에 원격창 열기 -> wsl 연결 (이걸 안해줘서 삽질 꽤나함)
1. 파이썬 확장 프로그램 다시 설치해주자
    :::danger  couldn't find a debug adapter descriptor for debug type 'debugpy' 
    검색해보니 확장 프로그램 버전 문제가 있다고 함. 파이썬 확장프로그램 설치 창에서 제거버튼의 오른쪽 아래 화살표 누르고 특정 버전 설치 클릭 한 다음 한달쯤 전걸로 설치해주니 해결되었음.
    :::
1. 파이썬 인터프리터 설정 확인해 주자 `>Python: 인터프리터 선택` 가상환경의 파이썬 선택.. ***파이썬 버전 확인!!!!!***
    > 가상환경 인터프리터 안뜨면 가상환경 폴더 열고 선택..  
    
    ![python interpretor](/image/2024/flask.png)
1. 좌측 네번째 아이콘 실행 및 디버그 클릭
1. launch.json 없으면 만들어 주자
1. `"FLASK_APP": "wsgi.py",` 프로젝트에서 진입점이 될 파이썬 파일 적어주자
    ```json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Python 디버거: Flask",
                "type": "debugpy",
                "request": "launch",
                "module": "flask",
                "env": {
                    "FLASK_APP": "wsgi.py",
                    "FLASK_DEBUG": "1"
                },
                "args": [
                    "run",
                    "--no-debugger",
                    "--no-reload"
                ],
                "jinja": true,
                "autoStartBrowser": false
            }
        ]
    }
    ```
1. 실행및 디버그 -> 디버깅 시작 (F5) 눌러주면 디버깅 환경에서 실행 완료. 중단점 찍어주고 평소와 같이 디버깅~,,~

> **참고 링크**  
> - [selecting-python-interpreter-from-wsl](https://stackoverflow.com/questions/62514756/selecting-python-interpreter-from-wsl)  
> - [visualstudio python/debugging](https://code.visualstudio.com/docs/python/debugging)
