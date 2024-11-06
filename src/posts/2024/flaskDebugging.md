---
title: Flask VS Code Debugging
lang: ko-KR
date: 2024/11/05 14:47:00
lastUpdated: 2024/11/05 14:47:00
description: Flask VSCode 디버깅 설정
meta:
  - name: Flask wsl VSCode Debugging
    content: Flask wsl VSCode Debugging
tags: ["flask"]
---

# Flask + wsl + VSCode Debugging

일단 난 플라스크 환경을 wsl에 설정했다(...zappa 윈도우 아나콘다 배포 실패했음ㅜ).  

## vscode flask 디버깅 설정
1. wsl 에서 python 가상환경 flask 로컬 서버 띄우는거까지 했다고 가정하고 스타트
1. vsCode 제일 왼쪽 하단에 원격창 열기 -> wsl 연결 (이걸 안해줘서 삽질 꽤나함)
1. 파이썬 확장 프로그램 다시 설치해주자
    :::danger  couldn't find a debug adapter descriptor for debug type 'debugpy' 
    검색해보니 확장 프로그램 버전 문제가 있다고 함. 파이썬 확장프로그램 설치 창에서 제거버튼의 오른쪽 아래 화살표 누르고 특정 버전 설치 클릭 한 다음 한달쯤 전걸로 설치해주니 해결되었음.
    :::
1. 파이썬 인터프리터 설정 확인해 주자 `>Python: 인터프리터 선택` 가상환경의 파이썬 선택.. ***파이썬 버전 확인!!!!!***
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