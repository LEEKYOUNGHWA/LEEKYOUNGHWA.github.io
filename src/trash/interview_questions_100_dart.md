---
lastUpdated: 2024/12/10 16:22:00
description: 챗 지피티가 뽑아준
---

# Dart interview 예상 질문 100개

<TTSButton/>

## 1. Dart의 주요 특징은 무엇인가요?
- Dart는 객체 지향 언어로, JIT(Just-In-Time) 및 AOT(Ahead-Of-Time) 컴파일을 지원합니다. 강력한 타입 시스템을 제공하며, Flutter에서 주로 사용됩니다.

## 2. Dart에서 `var`와 `dynamic`의 차이점은 무엇인가요?
- `var`는 타입 추론을 통해 변수를 선언하며, 한번 지정된 타입을 변경할 수 없습니다.
- `dynamic`은 런타임에 타입을 결정하며, 타입 변경이 가능합니다.

## 3. Dart에서 `final`과 `const`의 차이점은 무엇인가요?
- `final`은 변수에 한 번만 값을 할당할 수 있으며, 런타임에 값이 결정됩니다.
- `const`는 컴파일 타임에 값이 결정되며, 불변의 상수 값을 나타냅니다.

## 4. Dart에서 `Future`는 무엇이고 어떻게 사용하나요?
- `Future`는 비동기 작업의 결과를 나타내는 객체로, 비동기 코드에서 값이 나중에 반환될 것을 나타냅니다. `async`/`await` 키워드를 통해 비동기 작업을 처리할 수 있습니다.

## 5. Dart에서 `Stream`과 `Future`의 차이점은 무엇인가요?
- `Future`는 하나의 값이 비동기적으로 반환되는 경우에 사용됩니다.
- `Stream`은 여러 개의 값이 비동기적으로 발생하는 경우에 사용됩니다. `await for`를 사용하여 스트림의 값을 처리할 수 있습니다.

## 6. Dart에서 `async`와 `await`의 역할은 무엇인가요?
- `async`는 비동기 함수를 정의하며, `await`는 비동기 함수의 결과가 반환될 때까지 기다립니다. 이를 통해 비동기 작업을 동기처럼 작성할 수 있습니다.

## 7. Dart에서 `null safety`란 무엇인가요?
- `null safety`는 변수에 `null` 값이 할당되지 않도록 보장하는 기능입니다. 이를 통해 `null`로 인한 런타임 오류를 예방할 수 있습니다.

## 8. Dart에서 `cascade notation`을 설명해주세요.
- Cascade notation(`..`)은 객체의 여러 속성이나 메서드를 체이닝하여 호출할 수 있는 기능입니다. 이를 통해 코드의 가독성과 간결성을 높일 수 있습니다.

## 9. Dart에서 `mixin`을 사용하는 이유와 예시를 보여주세요.
- `mixin`은 클래스에 다른 기능을 추가할 수 있는 기능입니다. 다중 상속이 불가능한 Dart에서 재사용 가능한 코드를 클래스에 결합할 수 있도록 합니다.

## 10. Dart에서 `is` 연산자와 `as` 연산자의 차이점은 무엇인가요?
- `is`는 객체가 특정 타입인지 확인하는 데 사용됩니다.
- `as`는 객체를 특정 타입으로 강제 형변환할 때 사용됩니다.

## 11. Dart에서 `Set`과 `List`의 차이점은 무엇인가요?
- `Set`은 중복된 값을 허용하지 않는 컬렉션입니다.
- `List`는 순서가 있는 컬렉션으로, 중복된 값을 허용합니다.

## 12. Dart에서 `factory constructor`란 무엇인가요?
- `factory constructor`는 클래스의 인스턴스를 반환하는 생성자로, 새로운 인스턴스를 생성하지 않고 기존 객체를 반환하거나 다른 생성자를 호출할 수 있습니다.

## 13. Dart에서 `StreamController`는 무엇인가요?
- `StreamController`는 `Stream`을 생성하고 이벤트를 추가하는 역할을 합니다. 이벤트를 `sink`에 추가하여 스트림에 데이터를 전달할 수 있습니다.

## 14. Dart에서 `late` 키워드의 역할은 무엇인가요?
- `late`는 변수가 나중에 초기화될 것임을 나타내는 키워드입니다. `null safety`와 함께 사용되어, 변수 초기화가 지연됨을 컴파일러에게 알립니다.

## 15. Dart에서 `typedef`의 용도는 무엇인가요?
- `typedef`는 함수 타입을 별칭으로 정의할 때 사용됩니다. 이를 통해 함수 타입의 이름을 정의하고, 함수 타입을 간결하게 표현할 수 있습니다.

## 16. Dart에서 `extension`을 사용하여 클래스에 기능을 추가하는 방법은 무엇인가요?
- `extension`을 사용하면 기존 클래스에 새로운 메서드를 추가할 수 있습니다. 이를 통해 클래스를 수정하지 않고도 새로운 기능을 확장할 수 있습니다.

## 17. Dart에서 `null-aware operator`는 어떻게 사용되나요?
- `null-aware operator`(`?.`, `??`)는 `null` 값일 수 있는 객체를 안전하게 처리할 수 있도록 도와줍니다. `?.`는 객체가 `null`이 아닌 경우에만 메서드를 호출하고, `??`는 `null`일 경우 기본값을 제공할 수 있습니다.

## 18. Dart에서 `int`와 `double`의 차이점은 무엇인가요?
- `int`는 정수 값을 나타내며, 소수점이 없는 숫자를 다룹니다.
- `double`은 실수 값을 나타내며, 소수점을 포함한 숫자를 다룹니다.

## 19. Dart에서 `async*`와 `await*`는 무엇인가요?
- `async*`는 비동기 제너레이터로, `Stream`을 반환하는 비동기 함수를 정의합니다.
- `await*`는 비동기 제너레이터에서 값을 순차적으로 기다리며 처리할 때 사용됩니다.

## 20. Dart에서 `assert`는 무엇인가요?
- `assert`는 디버깅 목적으로 조건이 참인지 확인하는 데 사용됩니다. 조건이 거짓일 경우 `AssertionError`가 발생합니다.

## 21. Dart에서 `num` 타입은 무엇을 의미하나요?
- `num`은 `int`와 `double`의 상위 타입으로, 숫자형 데이터를 다룰 때 사용됩니다. `num`은 정수와 실수를 모두 처리할 수 있습니다.

## 22. Dart에서 `const`와 `final` 객체의 차이점은 무엇인가요?
- `final` 객체는 런타임에 한 번만 값을 할당할 수 있으며, 값이 변경되지 않습니다.
- `const` 객체는 컴파일 타임에 정의된 상수 값이어야 하며, 불변입니다.

## 23. Dart에서 `async` 함수 내에서 `return`을 사용하면 무엇이 반환되나요?
- `async` 함수 내에서 `return`은 `Future`를 반환합니다. 반환값은 `Future`의 결과로 포장됩니다.

## 24. Dart에서 `await`와 `yield`의 차이점은 무엇인가요?
- `await`는 비동기 함수에서 결과가 반환될 때까지 기다립니다.
- `yield`는 제너레이터 함수에서 값을 반환하며, 값을 반환하고 함수의 실행을 중지합니다.

## 25. Dart에서 `Mixin`과 `Abstract Class`의 차이점은 무엇인가요?
- `Mixin`은 클래스에 기능을 재사용할 수 있게 해주는 방식으로, 다중 상속을 가능하게 합니다.
- `Abstract Class`는 클래스에서 상속해야 하는 메서드의 틀만 제공하고, 인스턴스를 생성할 수 없습니다.

## 26. Dart에서 `super` 키워드를 사용하는 방법은 무엇인가요?
- `super`는 부모 클래스의 생성자나 메서드를 호출할 때 사용됩니다. 이를 통해 상속받은 클래스에서 부모 클래스의 기능을 활용할 수 있습니다.

## 27. Dart에서 `await`와 `then`의 차이점은 무엇인가요?
- `await`는 비동기 코드에서 값을 기다리며 동기적인 코드처럼 작성할 수 있게 합니다.
- `then`은 `Future`의 결과를 처리하는 콜백 함수를 등록하여 비동기적으로 처리합니다.

## 28. Dart에서 `with` 키워드를 사용하는 이유는 무엇인가요?
- `with`는 믹스인(mixin)을 적용하여 클래스에 다른 기능을 추가할 때 사용됩니다. 이를 통해 다중 상속 없이 기능을 확장할 수 있습니다.

## 29. Dart에서 `typedef`를 사용하여 함수 타입을 정의하는 방법은 무엇인가요?
- `typedef`를 사용하여 함수의 타입을 별칭으로 정의할 수 있습니다. 이를 통해 함수 타입을 좀 더 간결하게 표현할 수 있습니다.

## 30. Dart에서 `rethrow`와 `throw`의 차이점은 무엇인가요?
- `throw`는 예외를 던지며, 예외를 명시적으로 발생시킬 때 사용됩니다.
- `rethrow`는 현재 처리 중인 예외를 다시 던지는 데 사용되며, 예외를 더 이상 처리하지 않고 호출한 곳으로 전달합니다.

## 31. Dart에서 `is!` 연산자의 용도는 무엇인가요?
- `is!`는 객체가 특정 타입이 아닌지 확인하는 데 사용됩니다. 예를 들어, `x is! String`은 `x`가 `String`이 아닐 경우 참을 반환합니다.

## 32. Dart에서 `@required`와 `required`의 차이점은 무엇인가요?
- `@required`는 `flutter`에서 사용되며, 필수 매개변수를 표시하는 데 사용됩니다. `required`는 Dart 2.12 이상에서 null safety와 함께 사용되며, 함수 매개변수가 필수임을 나타냅니다.

## 33. Dart에서 `final`로 선언된 변수는 언제 값을 변경할 수 있나요?
- `final`로 선언된 변수는 한 번만 값이 할당될 수 있습니다. 그러나 값이 초기화된 후, 변수에 다시 값을 할당하려면 오류가 발생합니다.

## 34. Dart에서 `@override` 어노테이션의 역할은 무엇인가요?
- `@override`는 부모 클래스의 메서드를 재정의할 때 사용하는 어노테이션입니다. 컴파일러가 메서드가 부모 클래스를 올바르게 재정의하는지 확인하도록 돕습니다.

## 35. Dart에서 `abstract` 클래스는 무엇이며, 언제 사용하나요?
- `abstract` 클래스는 인스턴스를 생성할 수 없는 클래스입니다. 주로 자식 클래스에서 구현해야 하는 메서드를 정의할 때 사용됩니다.

## 36. Dart에서 `factory constructor`의 용도는 무엇인가요?
- `factory constructor`는 객체를 생성하는 데 사용되는 특별한 생성자로, 새 인스턴스를 만들지 않고 기존 인스턴스를 반환할 수 있습니다.

## 37. Dart에서 `assert`와 `debugger()`의 차이점은 무엇인가요?
- `assert`는 조건이 `false`일 때 `AssertionError`를 발생시킵니다. 주로 디버깅과 테스트 용도로 사용됩니다.
- `debugger()`는 코드 실행 중에 디버깅 세션을 시작하게 합니다.

## 38. Dart에서 `Future`와 `Stream`을 혼합해서 사용할 수 있나요? 예시를 들어 설명해주세요.
- `Future`와 `Stream`을 혼합할 수 있습니다. 예를 들어, `Future`로 결과를 기다린 후, 그 결과를 `Stream`으로 전달하는 방식이 가능합니다.

## 39. Dart에서 `spread operator`는 무엇인가요?
- `spread operator`(`...`)는 리스트나 맵을 다른 리스트나 맵에 확장하여 추가할 때 사용됩니다. 예를 들어, `var newList = [...oldList];`는 `oldList`의 모든 요소를 `newList`에 추가합니다.

## 40. Dart에서 `null-aware spread operator`는 어떻게 사용되나요?
- `null-aware spread operator`(`...?`)는 리스트나 맵이 `null`일 수 있는 경우, `null`이 아니면 해당 값을 확장합니다. 예를 들어, `var newList = [...?oldList];`는 `oldList`가 `null`이 아니면 확장하고, `null`이면 아무 것도 추가하지 않습니다.

## 41. Dart에서 `const`와 `final`을 객체에 적용할 때 차이점은 무엇인가요?
- `final`은 객체가 한 번만 초기화될 수 있음을 보장하지만, 객체 내부의 상태는 변경할 수 있습니다. 반면, `const`는 객체 자체가 컴파일 타임에 완전히 고정되어 불변입니다.

## 42. Dart에서 `late` 변수의 용도는 무엇인가요?
- `late` 키워드는 변수의 초기화를 지연시킬 수 있게 해줍니다. 이 키워드를 사용하면 `null safety`를 유지하면서도 변수의 초기화를 나중으로 미룰 수 있습니다.

## 43. Dart에서 `@deprecated` 어노테이션은 무엇을 의미하나요?
- `@deprecated`는 해당 메서드나 클래스를 더 이상 사용하지 않도록 권장하는 어노테이션입니다. 주로 API 변경 시 사용됩니다.

## 44. Dart에서 `super` 키워드를 사용하여 부모 클래스의 생성자를 호출하는 방법은 무엇인가요?
- `super`는 부모 클래스의 생성자를 호출할 때 사용됩니다. 예를 들어, `super(param1, param2)`와 같이 부모 클래스의 생성자를 호출할 수 있습니다.

## 45. Dart에서 `extension`을 활용하는 방법에 대해 설명해주세요.
- `extension`은 기존 클래스에 새로운 기능을 추가할 수 있는 방법입니다. 예를 들어, 기존 클래스에 새로운 메서드를 추가하고 싶을 때 유용합니다. 예시 
  ```dart
  extension StringReversal on String {
    String get reversed => this.split('').reversed.join();
  }
  ```

## 46. Dart에서 `mixins`와 `extends`의 차이점은 무엇인가요?
- `mixins`는 클래스를 상속하지 않고 다른 클래스의 기능을 추가할 수 있게 해주는 방법입니다. `extends`는 클래스 상속을 통해 부모 클래스의 기능을 물려받는 방법입니다.

## 47. Dart에서 `StreamController`의 `add`와 `addError`의 차이점은 무엇인가요?
- `add`는 스트림에 값을 추가합니다.
- `addError`는 스트림에 에러를 전달합니다.

## 48. Dart에서 `sync*`와 `async*` 제너레이터의 차이점은 무엇인가요?
- `sync*`는 동기적으로 값을 생성하는 제너레이터로, `Iterable`을 반환합니다.
- `async*`는 비동기적으로 값을 생성하는 제너레이터로, `Stream`을 반환합니다.

## 49. Dart에서 `Stream`을 종료하는 방법은 무엇인가요?
- `Stream`을 종료하려면 `StreamController`의 `close()` 메서드를 호출합니다. 이를 통해 스트림의 수신을 중단하고 리소스를 해제할 수 있습니다.

## 50. Dart에서 `Future.wait`의 용도는 무엇인가요?
- `Future.wait`는 여러 비동기 작업을 병렬로 실행하고, 모든 작업이 완료될 때까지 기다립니다. 이 메서드는 여러 `Future` 객체를 병렬로 처리할 때 유용합니다.

## 51. Dart에서 `Function` 타입을 사용할 때의 주의점은 무엇인가요?
- `Function` 타입은 모든 함수 타입을 나타내지만, 인자와 반환 타입을 명시적으로 정의하는 것이 좋습니다. 예를 들어, `Function(int, int) => int`와 같이 타입을 명확히 해주는 것이 좋습니다.

## 52. Dart에서 `List`와 `Set`의 주요 차이점은 무엇인가요?
- `List`는 순서가 있는 컬렉션으로, 중복된 요소를 허용합니다.
- `Set`은 중복된 값을 허용하지 않으며, 순서가 없습니다.

## 53. Dart에서 `rethrow`와 `throw`의 차이점은 무엇인가요?
- `throw`는 예외를 새로 던지는 데 사용되며, 사용자 정의 예외를 던질 수 있습니다.
- `rethrow`는 기존 예외를 다시 던져서 예외를 상위 호출 스택으로 전달합니다.

## 54. Dart에서 `try-catch` 블록에서 `on`과 `catch`의 차이점은 무엇인가요?
- `on`은 특정 타입의 예외만을 처리할 때 사용됩니다.
- `catch`는 예외 타입에 관계없이 모든 예외를 처리할 때 사용됩니다.

## 55. Dart에서 `num` 타입은 무엇인가요?
- `num`은 `int`와 `double`의 상위 타입으로, 숫자형 데이터를 처리할 수 있습니다. `num` 타입은 정수와 실수를 모두 처리할 수 있습니다.

## 56. Dart에서 `async` 함수와 일반 함수의 차이점은 무엇인가요?
- `async` 함수는 비동기적으로 작업을 처리하며 `Future`를 반환합니다. 일반 함수는 동기적으로 작업을 처리하고, 값을 즉시 반환합니다.

## 57. Dart에서 `Future.delayed`의 사용 사례를 설명해주세요.
- `Future.delayed`는 지정된 시간 후에 실행되는 비동기 작업을 예약하는 데 사용됩니다. 예를 들어, `Future.delayed(Duration(seconds 2))`는 2초 후에 특정 작업을 실행합니다.

## 58. Dart에서 `async`와 `await`을 사용할 때의 유의사항은 무엇인가요?
- `async` 함수는 항상 `Future`를 반환해야 하며, `await`은 `Future`가 완료될 때까지 기다리기 위해 사용됩니다.
- `await`은 반드시 `async` 함수 내에서만 사용 가능합니다.

## 59. Dart에서 `async` 함수에서 `return` 값을 반환하면 무엇이 반환되나요?
- `async` 함수에서 `return`은 `Future` 객체를 반환합니다. 반환된 값은 `Future`로 감싸져 있으며, 비동기 작업이 완료될 때 결과를 받을 수 있습니다.

## 60. Dart에서 `async`와 `await`을 사용할 때의 유의사항은 무엇인가요?
- `async` 함수는 항상 `Future`를 반환하고, `await`은 해당 `Future`의 완료를 기다립니다. `await`는 반드시 `async` 함수 내에서만 사용 가능합니다.

## 61. Dart에서 `const`와 `final`의 차이점은 무엇인가요?
- `const`는 컴파일 타임에 값이 결정되며, 변경 불가능한 상수를 정의할 때 사용됩니다.
- `final`은 런타임에 값이 결정되며, 한 번만 값을 할당할 수 있는 변수입니다.

## 62. Dart에서 `static` 키워드는 무엇을 의미하나요?
- `static` 키워드는 클래스의 인스턴스가 아니라 클래스 자체에 속하는 멤버를 정의하는 데 사용됩니다. `static` 멤버는 객체 인스턴스를 생성하지 않고 접근할 수 있습니다.

## 63. Dart에서 `typedef`의 용도는 무엇인가요?
- `typedef`는 함수 타입에 이름을 부여하는 데 사용됩니다. 이를 통해 함수 시그니처를 명확하게 정의할 수 있습니다.

## 64. Dart에서 `Iterable`과 `List`의 차이점은 무엇인가요?
- `Iterable`은 순회할 수 있는 객체를 의미하며, `List`는 인덱스로 접근 가능한 배열입니다.
- `List`는 `Iterable`의 서브타입입니다.

## 65. Dart에서 `null` safety란 무엇인가요?
- `null` safety는 변수에 `null` 값을 할당할 수 없도록 하는 기능으로, 코드에서 `null`로 인한 오류를 예방할 수 있습니다. `late`, `?`, `required` 등을 사용하여 `null`을 처리할 수 있습니다.

## 66. Dart에서 `late` 키워드는 무엇을 의미하나요?
- `late` 키워드는 변수의 값을 나중에 할당하겠다고 명시하는 키워드입니다. 변수는 선언 시 초기화되지 않지만, 실제로 사용될 때 값을 할당합니다.

## 67. Dart에서 `nullable` 타입과 `non-nullable` 타입의 차이점은 무엇인가요?
- `nullable` 타입은 `null`을 허용하는 타입입니다.
- `non-nullable` 타입은 `null`을 허용하지 않는 타입입니다. Dart는 `null` safety를 통해 이들을 구분합니다.

## 68. Dart에서 `Future`와 `Stream`의 차이점은 무엇인가요?
- `Future`는 하나의 값을 비동기적으로 반환하는 객체입니다.
- `Stream`은 여러 값을 비동기적으로 반환하는 객체입니다.

## 69. Dart에서 `await`와 `yield`의 차이점은 무엇인가요?
- `await`는 비동기 함수에서 비동기 작업이 완료될 때까지 기다리는 키워드입니다.
- `yield`는 제너레이터 함수에서 값을 반환하는 데 사용되며, `Stream` 또는 `Iterable`을 생성할 때 사용됩니다.

## 70. Dart에서 `factory` 키워드는 무엇인가요?
- `factory` 키워드는 클래스를 생성하는 팩토리 메서드를 정의하는 데 사용됩니다. 이를 통해 객체를 반환할 때 특별한 로직을 처리하거나 캐싱할 수 있습니다.

## 71. Dart에서 `mixins`를 사용하는 이유와 그 사용법은 무엇인가요?
- `mixins`는 여러 클래스에서 공통된 기능을 재사용하는 방법입니다. `with` 키워드를 사용하여 클래스에 여러 `mixin`을 적용할 수 있습니다.

## 72. Dart에서 `extension`을 사용해 기존 클래스를 확장하는 방법은 무엇인가요?
- `extension`을 사용하면 기존 클래스에 새로운 메서드나 프로퍼티를 추가할 수 있습니다. 이를 통해 클래스를 수정하지 않고도 기능을 확장할 수 있습니다.

## 73. Dart에서 `deferred` 키워드는 무엇을 의미하나요?
- `deferred` 키워드는 코드 분할 및 지연 로딩을 위한 키워드로, 특정 라이브러리를 필요할 때까지 로드하지 않도록 할 수 있습니다.

## 74. Dart에서 `assert` 키워드를 사용하는 용도는 무엇인가요?
- `assert`는 디버깅 중에 조건이 참인지 검사하는 데 사용됩니다. 조건이 거짓일 경우 `AssertionError`가 발생합니다.

## 75. Dart에서 `const`와 `final` 변수의 사용 예시를 설명해주세요.
- `const`는 컴파일 타임에 결정되는 상수를 선언할 때 사용합니다.
- `final`은 런타임에 한 번만 값을 할당할 수 있는 변수를 선언할 때 사용합니다.

## 76. Dart에서 `operator`를 오버로딩하는 방법은 무엇인가요?
- Dart에서는 `operator` 키워드를 사용하여 연산자 오버로딩을 할 수 있습니다. 예를 들어, `+` 연산자를 오버로딩하려면 `operator +(other)` 형태로 정의할 수 있습니다.

## 77. Dart에서 `bool` 타입을 사용하는 예시를 들어보세요.
- `bool` 타입은 참(True)과 거짓(False) 값을 나타냅니다. 예를 들어, `bool isActive = true;`와 같이 사용됩니다.

## 78. Dart에서 `async`와 `await`를 사용할 때, 예외 처리는 어떻게 하나요?
- `async` 함수 내에서 `await`을 사용하여 비동기 작업을 기다린 후 예외를 `try-catch` 블록으로 처리할 수 있습니다.
- `await`이 예외를 던지면, 이를 `catch` 블록에서 처리할 수 있습니다.

## 79. Dart에서 `setState()` 메서드를 사용하는 이유는 무엇인가요?
- `setState()`는 Flutter의 상태 관리에서 사용되는 메서드로, 상태가 변경되었음을 Flutter에게 알리고 해당 위젯을 다시 렌더링합니다.

## 80. Dart에서 `getter`와 `setter`는 어떻게 사용하나요?
- `getter`는 객체의 속성 값을 읽을 때 사용하고, `setter`는 객체의 속성 값을 설정할 때 사용됩니다. 예를 들어, `String get name => _name;`과 `set name(String name) => _name = name;`과 같이 정의할 수 있습니다.

## 81. Dart에서 `Future.value`와 `Stream.value`의 차이점은 무엇인가요?
- `Future.value`는 단일 값을 반환하는 `Future` 객체를 생성합니다.
- `Stream.value`는 단일 값을 반환하는 `Stream` 객체를 생성합니다.

## 82. Dart에서 `Function.apply` 메서드는 무엇인가요?
- `Function.apply`는 주어진 함수에 인자를 배열 형태로 전달하여 실행하는 메서드입니다.

## 83. Dart에서 `void` 반환 타입의 함수는 무엇을 의미하나요?
- `void`는 함수가 값을 반환하지 않음을 나타냅니다. `void` 반환 타입을 가진 함수는 결과를 반환하지 않고 단지 작업을 수행합니다.

## 84. Dart에서 `default` 키워드는 무엇을 의미하나요?
- Dart에서 `default`는 선택적 매개변수에 기본값을 설정할 때 사용됩니다. 함수 매개변수가 제공되지 않으면 기본값을 사용합니다.

## 85. Dart에서 `num` 타입은 무엇인가요?
- `num`은 `int`와 `double` 타입의 상위 타입으로, 숫자 값을 처리하는 데 사용됩니다.

## 86. Dart에서 `String`의 `substring` 메서드는 어떻게 작동하나요?
- `substring`은 주어진 범위 내에서 문자열을 잘라서 반환하는 메서드입니다. 예를 들어, `str.substring(0, 5)`는 문자열의 처음 5글자를 반환합니다.

## 87. Dart에서 `is`와 `as` 키워드의 차이점은 무엇인가요?
- `is`는 객체가 특정 타입인지 확인하는 데 사용됩니다.
- `as`는 객체를 특정 타입으로 형변환하는 데 사용됩니다.

## 88. Dart에서 `List`의 `map` 메서드는 어떻게 사용되나요?
- `map` 메서드는 각 항목에 대해 주어진 함수를 적용하여 새로운 리스트를 반환합니다. 예 `List<int> numbers = [1, 2, 3]; var doubled = numbers.map((n) => n * 2);`

## 89. Dart에서 `Set`과 `Map`의 차이점은 무엇인가요?
- `Set`은 중복을 허용하지 않는 집합입니다.
- `Map`은 키-값 쌍을 저장하는 데이터 구조입니다.

## 90. Dart에서 `for-in`과 `forEach`의 차이점은 무엇인가요?
- `for-in`은 컬렉션의 각 항목을 순차적으로 반복합니다.
- `forEach`는 컬렉션의 각 항목에 대해 제공된 콜백 함수를 실행합니다.

## 91. Dart에서 `await`을 사용하지 않고 `Future`를 반환하는 방법은 무엇인가요?
- `async` 함수에서 `await`을 사용하지 않고 `Future`를 반환하려면, `Future.value()`나 `Future.delayed()` 등을 사용할 수 있습니다.

## 92. Dart에서 `rethrow`와 `throw`의 차이점은 무엇인가요?
- `throw`는 새로운 예외를 던질 때 사용되며, `rethrow`는 이미 발생한 예외를 다시 던질 때 사용됩니다.

## 93. Dart에서 `Optional parameters`와 `Named parameters`의 차이점은 무엇인가요?
- `Optional parameters`는 함수의 매개변수를 선택적으로 받을 수 있게 해주는 방식입니다.
- `Named parameters`는 매개변수를 이름을 통해 전달할 수 있게 해줍니다.

## 94. Dart에서 `this` 키워드의 용도는 무엇인가요?
- `this` 키워드는 현재 객체의 인스턴스를 참조하는 데 사용됩니다. 클래스 내에서 다른 멤버 변수나 메서드에 접근할 때 사용됩니다.

## 95. Dart에서 `const` 생성자의 사용 이유는 무엇인가요?
- `const` 생성자는 객체를 컴파일 타임에 미리 생성할 수 있게 해줍니다. 이를 통해 효율적인 메모리 사용이 가능하고, 불변 객체를 생성하는 데 유용합니다.

## 96. Dart에서 `throw`와 `throw()`는 같은 의미인가요?
- `throw`는 예외를 던지는 키워드이며, `throw()`는 `throw` 키워드 뒤에 예외를 던지는 방식으로, 문법적 차이만 있습니다. `throw()`는 올바르지 않으며, `throw`를 사용해야 합니다.

## 97. Dart에서 `await`을 사용할 때 중요한 점은 무엇인가요?
- `await`은 비동기 작업이 완료될 때까지 기다리며, 비동기 함수 내에서만 사용 가능합니다. `await`은 `Future` 객체에만 사용할 수 있습니다.

## 98. Dart에서 `Set`에 중복된 값을 추가하려고 할 때 어떻게 되나요?
- `Set`은 중복을 허용하지 않기 때문에 중복된 값을 추가하려고 하면 값이 추가되지 않습니다.

## 99. Dart에서 `List`의 `addAll` 메서드는 무엇을 하나요?
- `addAll`은 다른 컬렉션의 모든 요소를 현재 `List`에 추가하는 메서드입니다.

## 100. Dart에서 `!` 연산자는 무엇을 의미하나요?
- `!`는 null 안전성을 무시하고 해당 값이 `null`이 아님을 보장하는 연산자입니다. 이를 사용하면 `null` 값을 허용하지 않는 변수에 대해 강제로 값을 처리할 수 있습니다.
