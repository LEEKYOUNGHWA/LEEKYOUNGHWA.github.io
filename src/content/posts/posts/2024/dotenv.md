---
title: "Flutter에 config 설정 파일 만들어서 go router, flutter dotenv 적용"
section: study
lastUpdated: "2024/12/09 16:50:00"
subTitle: "원하는 스타일에 맞춰서 리팩토링 고고씽"
image: "https://img.icons8.com/color/512/flutter.png"
tags: ["flutter"]
---

챗 지피티가 판은 다 만들어준다. 원하는 스타일에 맞춰서 리팩토링 하는거 부터가 시작인듯   
고고씽

## pubspec.yaml dependency 추가
```yml
dependencies:
  flutter:
    sdk: flutter
  .
  .
  .
  go_router: ^6.0.0
  flutter_dotenv: ^5.0.2
```

## .env 파일 작성
루트/assets/.env 파일 만들어 준다

```
# .env 파일
BASE_URL_DEV=localhost:8080/dev/api/v1
BASE_URL_PROD=https://il3yh0ax0h.execute-api.ap-northeast-2.amazonaws.com/dev/api/v1
```
개발, 운영 주소 적어주자 

## config.dart 만들어서 설정 몰아넣자 

> 처음에 dart.vm.product 썼으나 개발하기 불편... 지피티 무시 ㄱ  
> 그리고 Url 굳이 상태관리 까지나 해야하나...? 지피티 무시 하고 걍 전역 ㄱ

```dart
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:go_router/go_router.dart';
import 'package:todo/screens/create_screen.dart';
import 'package:todo/screens/done_screen.dart';
import 'package:todo/screens/login_page.dart';
import 'package:todo/screens/main_screen.dart';
import 'package:todo/screens/search_screen.dart';
import '../utils/storage_helper.dart';

class Config {
  // URL 선택 로직
  static Future<String> get apiUrl async {
    // 실행 환경에 따라 운영 또는 개발 URL 반환
    await dotenv.load();
    const profile = String.fromEnvironment('PROFILE', defaultValue: 'local');

    if (profile == 'env') {
      return dotenv.env['BASE_URL_PROD'] ?? ''; // 운영 환경
    } else {
      return dotenv.env['BASE_URL_DEV'] ?? ''; // 개발 환경
    }
  }

  static GoRouter router = GoRouter(
    initialLocation: '/',
    redirect: (context, state) async {
      final token = await StorageHelper.getToken();
      if (token == null || token.isEmpty) {
        if (state.location != '/login') {
          return '/login';
        }
      } else if (state.location == '/login') {
        return '/';
      }
      return null;
    },
    routes: [
      GoRoute(
        path: '/',
        name: 'main',
        builder: (context, state) => const MainScreen(),
      ),
      GoRoute(
        path: '/login',
        name: 'login',
        builder: (context, state) => const LoginPage(),
      ),
      GoRoute(
        path: '/create',
        name: 'create',
        builder: (context, state) => const CreateTaskScreen(),
      ),
      GoRoute(
        path: '/search',
        name: 'search',
        builder: (context, state) => const SearchScreen(),
      ),
      GoRoute(
        path: '/done',
        name: 'done',
        builder: (context, state) => const DoneScreen(),
      ),
    ],
  );
}
```
## main.. 정리하자...
깔끔해졌다,,,
```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:todo/config/config.dart';

void main() async {
  runApp(
    ProviderScope(
      child: MaterialApp.router(
        debugShowCheckedModeBanner: false,
        routerConfig: Config.router, // 반드시 GoRouter와 연결
      ),
    ),
  );
}
```

## service 단 수정

간헐적으로 오류 나서 `final url = await Config.apiUrl;` await 붙였다
```dart
import 'package:dio/dio.dart';
import 'package:todo/config/config.dart';

class UserService {
  final Dio _dio = Dio();

  Future<Map<String, dynamic>?> fetchUserInfo(String token) async {
    try {
      final url = await Config.apiUrl;
      final response = await _dio.get(
        '$url/users',
        options: Options(
          headers: {
            'Authorization': token,
          },
        ),
      );
      if (response.statusCode == 200) {
        return response.data; // JSON 데이터 반환
      } else {
        Exception('Failed to fetch user info: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      Exception('Error fetching user info: $e');
      return null;
    }
  }
}
```

## 이제 실행 ㄱ
```sh
# 로컬에서 실행
flutter run --debug --dart-define=PROFILE=env # 운영
flutter run --debug --dart-define=PROFILE=local # 로컬
```

### launch.json 설정해서 vscode에서 실행..
바보는 명령어를 외우지 못한다...
```json
{
    "version": "0.2.0",
    "configurations": [
        {   
            "name": "todo (debug - local)",
            "request": "launch",
            "type": "dart",
            "toolArgs": ["--dart-define=PROFILE=local"]
        },
        {   
            "name": "todo (debug - production)",
            "request": "launch",
            "type": "dart",
            "toolArgs": ["--dart-define=PROFILE=env"]
        }
    ]
}
```

## 배포
마찬가지로 --dart-define 붙여준다

```cmd
flutter build web --web-renderer html --dart-define=PROFILE=env
```
wsl
```sh
aws s3 cp build/web/ s3://sherryflutter/ --recursive 
aws cloudfront create-invalidation --distribution-id E1JH0EGOJGN6Q3 --paths '/*'
```
