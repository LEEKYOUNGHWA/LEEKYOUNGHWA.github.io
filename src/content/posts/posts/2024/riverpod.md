---
title: "Flutter 에 Riverpod 적용해서 리팩토링 해보자"
section: study
lastUpdated: "2024/12/06 17:16:00"
subTitle: "바보는 이걸 이해하는데 상당히 오랜 시간이 걸렸다"
image: "https://img.icons8.com/color/512/flutter.png"
tags: ["flutter"]
---

- Riverpod : Flutter에서 상태 관리(State Management)를 위한 라이브러리
- [https://riverpod.dev/ko/docs/introduction/getting_started](https://riverpod.dev/ko/docs/introduction/getting_started)

## 설정
### `pubspec.yaml` dependency 추가

```yaml
dependencies:
  flutter:
    sdk: flutter

  shared_preferences: ^2.0.8
  flutter_secure_storage: ^5.0.2
  dio: ^5.0.0
  flutter_riverpod: ^2.0.0
  go_router: ^6.0.0
```

### `main.dart` runApp() ProviderScope로 감싸자

```dart
runApp(
    const ProviderScope(
      child: TaskApp(),
    ),
  );
```

### 폴더 구조 분리 해주자
챗 지피티의 추천대로 고
```
|__config
   |__config.dart
|__models
   |__task.dart
|__providers
   |__task_provider.dart
|__screens
   |__create_screen.dart
   |__done_screen.dart
   |__login_screen.dart
   |__main_screen.dart
   |__search_screen.dart
|__services
   |__task_service.dart
|__utils
   |__storage_helper.dart
|__widgets
   |__bottom_nav_bar.dart
main.dart
```
## 소스 작성 
### service 작성
```dart
class TaskService {
  final Dio _dio = Dio();
  static const _baseUrl =
      'https://il3yh0ax0h.execute-api.ap-northeast-2.amazonaws.com/dev/api/v1';

  Future<List<dynamic>> fetchTasks(String token, String done) async {
    try {
      final queryParameters = done == 'A' ? null : {'done': done};
      final response = await _dio.get(
        '$_baseUrl/todos',
        queryParameters: queryParameters,
        options: Options(headers: {'Authorization': token}),
      );
      return response.data['data']['todos'];
    } catch (e) {
      throw Exception('Failed to fetch tasks: $e');
    }
  }
}
```

### provider 작성
```dart
class TaskNotifier extends StateNotifier<List<Task>> {
  final TaskService _taskService;

  TaskNotifier(this._taskService) : super([]);

  Future<void> loadTasks(String token, String done) async {
    try {
      print('TaskNotifier loadTasks');
      final tasksData = await _taskService.fetchTasks(token, done);
      state = tasksData.map((data) => Task.fromJson(data)).toList();
    } catch (e) {
      print('Error loading tasks: $e');
    }
  }
}
```

### Main 리팩토링
### import 추가
```dart
import '../providers/task_provider.dart';
import '../utils/storage_helper.dart';
```

#### ConsumerStatefulWidget 상속받는다
```dart
class MainScreen extends ConsumerStatefulWidget {
  const MainScreen({super.key});

  @override
  ConsumerState createState() => _MainScreenState();
}

class _MainScreenState extends ConsumerState<MainScreen> {
  String userName = "";

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      final token = await StorageHelper.getToken();
      // Token 가져와서 loadTasks 호출
      ref.read(taskProvider.notifier).loadTasks(token!, 'N');
      _initializeUser();
    });
```

### build 에 상태변경 감지 연결
```dart
@override
  Widget build(BuildContext context, WidgetRef ref) {
    final tasks = ref.watch(taskProvider); // 상태변경 감지
    .
    .
    .
    return TaskItem(
        task: tasks[index],
        onCheck: () async {
            final token = await StorageHelper.getToken();
            if (token != null) {
            // 상태 업데이트를 인라인으로 처리
            ref.read(taskProvider.notifier).updateTask(token,
                task.copyWith(isChecked: !task.isChecked), 'Todo');
            } else {
            print('Error: Token is null');
            }
        },
    .
    .
    .
```
