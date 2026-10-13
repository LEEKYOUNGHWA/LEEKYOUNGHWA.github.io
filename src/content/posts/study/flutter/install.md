---
title: "Flutter 설치"
section: study
lastUpdated: "2024/11/28 16:55:00"
subTitle: "설치, 소스"
image: "https://img.icons8.com/color/512/flutter.png"
tags: ["flutter"]
---

## 설치

1. flutter 설치 
    ```sh
    choco install Flutter # window: 초코라티 알아서 설치
    flutter # 설치확인
    ```
1. Vscode 확장프로그램 설치 - Flutter, Error Lens 
1. Android Studio 설치 [링크](https://developer.android.com/studio)  
1. Android Studio 실행해서 sdk 다운   
1. 오류 발생시...  

        Intel® HAXM installation failed. To install Intel® HAXM follow the instructions found at: 
        https://github.com/intel/haxm/wiki/Installation-Instructions-on-Windows

    - Windows 기능 켜기/끄기 -> Hyper - V, Windows 하이퍼바이저 플랫폼, 가상 머신 플랫폼 활성화
1. vscode >Flutter: Run Flutter Doctor

1. Flutter Doctor : `Error: Unable to find git in your PATH.` 오류 발생시  
    - 관리자모드 powershell
    ```sh
    git config --global --add safe.directory '*'
    ```
1. Flutter Doctor : `cmdline-tools component is missing` 오류 발생시  
    - Android studio -> Settings -> Languages & Frameworks -> Android SDK -> SDK Tools -> Android SDK Command-line Tools 체크한 후 apply  

1. Flutter Doctor : `Some Android licenses not accepted. To resolve this, run: flutter doctor --android-licenses` 오류 발생시
    ```
    flutter doctor --android-licenses
    ```

1. Error: Unable to find suitable Visual Studio toolchain.
```sh
flutter config --android-studio-dir="C:\Program Files\Android\Android Studio"
```

1. vsCode 설정  
`Ctrl` + `shift` + `p` -> settings.json
    ```json
    "editor.codeActionsOnSave": {
        "source.fixAll": true
    },
    "dart.previewFlutterUiGuides": true,
    ```

> 단축키
> - `ctrl`+`.` : Code Action 열기
