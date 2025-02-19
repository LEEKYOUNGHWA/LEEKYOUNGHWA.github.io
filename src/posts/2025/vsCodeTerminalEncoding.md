---
lastUpdated: 2025/02/19 17:15:00
subTitle: settings.json에 설정 추가
---

# 윈도우 VSCode 터미널 한글 깨짐

## settings.json

> C:\Users\사용자명\AppData\Roaming\Code\User\settings.json

1. Ctrl + Shift + P (Cmd + Shift + P on Mac)를 눌러 Command Palette 열기
2. "Preferences: Open Settings (JSON)"을 입력하고 선택
3. 아래 내용 추가
```json
"terminal.integrated.profiles.windows": {
    "mPowerShell": {
        "source": "PowerShell",
        "args": ["-NoExit", "-Command ", "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; [Console]::InputEncoding = [System.Text.Encoding]::UTF8"],
    }
},
"terminal.integrated.defaultProfile.windows": "mPowerShell",
```

- [출처](https://segelache.tistory.com/entry/%EC%9C%88%EB%8F%84%EC%9A%B0-VSCode-%ED%84%B0%EB%AF%B8%EB%84%90-%ED%95%9C%EA%B8%80-%EC%9D%B8%EC%BD%94%EB%94%A9-%EB%AC%B8%EC%A0%9C)