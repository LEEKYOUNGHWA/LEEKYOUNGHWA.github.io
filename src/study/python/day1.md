---
title: 파이썬 스터디
lang: ko-KR
date: 2023/12/04 00:00:00
lastUpdated: 2023/12/04 00:00:00
subTitle: 파이썬 스터디 파이썬 코딩 도장 요약. 아나콘다 주피터 노트북 anaconda23.3.1, python3.10.9, jupyterNotebook
meta:
  - name: 파이썬
    content: 아나콘다, 주피터노트북
tags: ["python"]
---

# **day1** (2023-12-04)

> - 교재 : [파이썬 코딩도장](https://dojang.io/course/view.php?id=7)
> - 교재 소스 파일 : [링크](https://github.com/namjaeyoon/python.dojang)
> - 환경 : 개인적 선호에 따라 anaconda23.3.1, python3.10.9, jupyterNotebook 사용

### 환경변수 설정 : 시스템 환경변수 Path 에 추가

```
C:\ProgramData\anaconda3
C:\ProgramData\anaconda3\Scripts
C:\ProgramData\anaconda3\Library
```

### 버전확인 `conda -V` `conda --version` `python -V` `python --version`

### python idle 실행 : conda prompt에 idle 입력

```python
# Hello, world 출력: idle 에 입력
print('Hello, world!')
Hello, world!
```

### 파일 저장해서 실행

    (1) idle: File>New File
    (2) idle: File>Save hello.py `print('Hello, world!')`
    (3) idle: Run>Run Module

### 명령 프롬프트에서 파이썬 사용하기 `cmd`

```sh
C:\Users\HWA>python
Python 3.10.9 | packaged by Anaconda, Inc. | (main, Mar  1 2023, 18:18:15) [MSC v.1916 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> print('Hello, world!')
Hello, world!
>>> exit()
```

### 명령 프롬프트에서 스크립트 파일 실행하기

```sh
C:\Users\HWA>cd C:\study\python
C:\study\python>python hello.py
Hello, world
```

### 세미콜론

파이썬은 세미콜론을 붙이지 않음. 보통 한 줄에 여러 구문을 사용할 때 세미콜론으로 구분해준다.

```python
print('Hello'); print('1234')
```

### 한 줄 주석

```py
# Hello, world! 출력
print('Hello, world!')
a = 1 + 2 # 더하기
print('Hello, world!') #printf('1234567890')
```

### 블록 주석

각 줄마다 맨 앞에 #을 넣어준다. 보통 블록 주석을 작성할 때는 코드를 읽기 쉽도록 # 뒤에 공백을 한 칸 띄움.

```py
# 더하기
# a = 1 + 2
# print('Hello, world!')
```

### 들여쓰기 : 공백(스페이스) 2칸, **공백 4칸**, 탭(tab)

> 파이썬 코딩 스타일 가이드(PEP 8)에서는 공백 4칸으로 규정하고 있습니다. 따라서 공백 4칸을 사용하는 것이 좋습니다

```py
if a == 10:
     print('10입니다.')
```

- 코드블록 : 특정한 동작을 위해서 코드가 모여 있는 상태. 파이썬은 들여쓰기를 기준으로 코드 블록을 구성.같은 블록은 들여쓰기 칸 수가 같아야 하고, 공백과 탭 문자를 섞어 쓰면 안됨.

```py
if a == 10:
      print('10')
      print('입니다.')
```

### 정수계산

```python
1 + 1 #덧셈
```

    2

```python
1 - 2 #뺄셈
```

    -1

```python
2 * 2 #곱셈
```

    4

```python
5 / 2 #나눗셈
```

    2.5

> ### 파이썬 2와 파이썬 3의 차이점
>
> **_파이썬 2_**에서 5 / 2는 2.5가 아닌 2가 나오는데, 정수끼리 나눗셈 결과는 **_정수_**가 나오도록 정했기 때문.  
> **_파이썬 3는 정수끼리 나눗셈을 해도 나눗셈이 완전히 나누어 떨어져도 실수가 나옴_**
>
> ```
> 4 / 2
> ```
>
> ```
> 2.0
> ```

```python
5 // 2 # 버림 나눗셈(floor division) : 나눗셈의 결과에서 소수점 이하는 버림
```

    2

```python
5.5 // 2 # 실수에 // 연산자를 사용하면 결과는 실수가 나오며 소수점 이하는 버림. 따라서 결과는 항상 .0으로 끝남
```

    2.0

```python
5 % 2 # 모듈로(modulo) 연산자 %: 나눗셈 후 나머지를 구하는 연산자
```

    1

```python
2 ** 10 # 거듭제곱을 구하는 ** 연산자 2 ** 10은 1024이고 2^10을 뜻함
```

    1024

```python
int(3.3) # int() : 정수(integer)를 뜻하며 값을 정수로 만들어 줌(소수점 이하는 버림)
```

    3

```python
int(5 / 2) # int(계산식)
```

    2

```python
int('10') #  int('문자열') : 문자열을 넣을땐 정수로 된 문자열을 넣어야 한다.
```

    10

```python
type(10) # 객체의 타입(자료형) 알아내기 : type(값)
```

    <class 'int'>

> ### type(10)
>
> <class 'int'>  
> type은 말그대로 객체의 타입(자료형)을 알아내는 함수.  
> type에 괄호를 붙이고 10을 넣어보면 <class 'int'>라고 나오는데 정수(int) 클래스라는 뜻이다.  
> 파이썬에서는 숫자도 객체(object)이며, 객체는 클래스(class)로 표현함.  
> 앞에서 사용한 int(3.3)은 실수 3.3을 int 클래스로 된 객체로 만든다는 뜻이다.

```python
divmod(5, 2) # 몫과 나머지를 함께 구하기
```

    (2, 1)

> 값을 괄호로 묶은 형태를 튜플(tuple)이라고 하며 값 여러 개를 모아서 표현할 때 사용  
> 튜플은 변수 여러 개에 저장할 수 있는데 divmod의 결과가 튜플로 나오므로 몫과 나머지는 변수 두 개에 저장할 수 있음.

```python
quotient, remainder = divmod(5, 2)
print(quotient, remainder)
```

    2 1

> ### 참고 | 2진수, 8진수, 16진수
>
> - 2진수: 숫자 앞에 0b를 붙이며 0과 1을 사용합니다.
> - 8진수: 숫자 앞에 0o(숫자 0과 소문자 o)를 붙이며 0부터 7까지 사용합니다.
> - 16진수: 숫자 앞에 0x 또는 0X를 붙이며 0부터 9, A부터 F까지 사용합니다(소문자 a부터 f도 가능).

```py
0b110
```

    6

```python
0o10
```

    8

```python
0xF
```

    15

### 실수계산

```python
3.5 + 2.1
```

    5.6

```python
4.3 - 2.7
```

    1.5999999999999996

> 1.6이 나와야 하는데 1.5999999999999996이 나왔음.  
> 컴퓨터는 실수를 표현할 때 오차가 발생하기 때문.  
> 자세한 내용은 [부록 47.7 실수 값의 오차](https://dojang.io/mod/page/view.php?id=2466)를 참조.

```python
1.5 * 3.1
```

    4.65

```python
5.5 / 3.1
```

    1.7741935483870968

```python
4.2 + 5 # 실수와 정수를 함께 계산하면 표현 범위가 넓은 실수로 계산(실수가 정수보다 표현 범위가 넓다)
```

    9.2

```python
float(5) # float(숫자) : 숫자 또는 계산 결과를 강제로 실수로 float
```

    5.0

```python
float(1 + 2) # float(계산식)
```

    3.0

```python
float('5.3') # float('문자열') : 실수 또는 정수로 된 문자열이어야 함.
```

    5.3

> ### float
>
> 부동소수점(floating point)에서 따왔으며 값을 실수로 만들어줌.  
> 즉, 실수는 float 자료형이며 type에 실수를 넣어보면 <class 'float'>가 나옴.  
> type(3.5)  
> <class 'float'>

> ### 참고 | 복소수
>
> 실수부와 허수부로 이루어진 복소수(complex number)도 사용할 수 있다.  
> 허수부는 숫자 뒤에 j를 붙임  
> (수학에서는 허수를 i로 표현하지만 공학에서는 j를 사용)

```python
1.2+1.3j
```

    (1.2+1.3j)

```python
complex(1.2, 1.3) # 복소수로 만들 때는 complex를 사용
```

    (1.2+1.3j)

### 변수(variable) 변수이름 = 값

#### 변수 이름 규칙

- 영문 문자와 숫자를 사용할 수 있습니다.
- 대소문자를 구분합니다.
- 문자부터 시작해야 하며 숫자부터 시작하면 안 됩니다.
- \_(밑줄 문자)로 시작할 수 있습니다.
- 특수 문자(+, -, \*, /, $, @, &, % 등)는 사용할 수 없습니다.
- 파이썬의 키워드(if, for, while, and, or 등)는 사용할 수 없습니다.

```python
x = 10 # x를 만들면서 10을 할당(assignment)
x # 파이썬 셸에서는 변수를 입력한 뒤 엔터 키를 누르면 변수에 저장된 값이 출력됨.
```

    10

```python
# 변수에는 숫자뿐만 아니라 문자열도 넣을 수 있다.
y = 'Hello, world!'  # ' '(작은따옴표)로 묶은 문자열 Hello, world!를 변수 y에 할당
y
```

    'Hello, world!'

```python
# type(변수) : 변수(객체)의 자료형 구하기
type(x) # 정수 10이 들어있으므로 int(integer)
```

    int

```python
type(y) # 문자열 Hello, world!가 들어있으므로 str(string)
```

    str

```python
# 변수 여러 개를 한 번에 만들 수도 있다. [변수이름1, 변수이름2, 변수이름3 = 값1, 값2, 값3] 형식
# 변수와 값의 개수는 동일하게 맞춰주어야 하며 나열된 순서대로 값이 할당
# 변수와 값의 개수가 맞지 않으면 에러 발생
x, y, z = 10, 20, 30
x, y, z
```

    (10, 20, 30)

```python
x = y = z = 10 # 값이 모두 같게 변수 여러 개를 만들기
x, y, z
```

    (10, 10, 10)

```python
x, y = 10, 20 # 변수를 할당할 때 서로 자리를 바꿔주면 두 변수의 값을 바꿈.
x, y = y, x
x, y
```

    (20, 10)

```python
x = 10
del x # 변수 삭제 del
# x # 변수 x를 삭제하여 변수가 없어졌으므로 x가 정의되지 않았다는 메시지와 함께 NameError가 발생
```

```python
x = None #  빈 변수 만들기 None: 아무것도 없는 상태를 나타내는 자료형, 보통 다른 언어에서는 널(null)
print(x), x
```

    (None, None)

### 변수로 계산하기

```python
a = 10
b = 20 # 변수 a, b에 숫자를 할당
c = a + b # a와 b의 값을 더해서 변수 c에 할당
c
```

    30

```python
a = 10
a + 20, a # a + 20은 a에 20을 더하기만 할 뿐 계산 결과를 유지하지 않음.
```

    (30, 10)

```python
a = 10
a = a + 20    # a와 20을 더한 후 결과를 다시 a에 저장
a # 변수 한 개에서 값의 변화를 계속 유지하려면 계산 결과를 다시 변수에 저장
```

    30

```python
# 변수를 두 번 입력하지 않도록 산술 연산 후 할당 연산자를 제공
# 덧셈(+=), 뺄셈(-=), 곱셈(*=), 나눗셈(/=, //=), 나머지(%=)도 같은 방식
a = 10
a += 20    # a와 20을 더한 후 결과를 다시 a에 저장
a
```

    30

> ### 만들지 않은 변수 d에 10을 더한 후 다시 할당하면 에러가 발생
>
> d += 10 # d는 만들지 않은 변수  
> 왜냐하면 계산 결과를 d에 할당하기 전에 d와 10을 더해야 하는데 d라는 변수가 없어서 덧셈이 안 되기 때문

```python
# 계산을 하다 보면 부호를 붙여야 하는 경우도 생김.
# 이때는 값이나 변수 앞에 양수, 음수 부호를 붙이면 됨.
x = -10
+x , -x
```

    (-10, 10)

### 입력 값을 변수에 저장하기

```python
x = input('문자열을 입력하세요: ') # input 함수는 사용자가 입력한 값을 가져오는 함수
print("x : " , x)
```

    문자열을 입력하세요: yp
    x :  yp

```python
a = input('첫 번째 숫자를 입력하세요: ')
b = input('두 번째 숫자를 입력하세요: ')
print(a + b) # input에서 입력받은 값은 항상 문자열 형태
```

    첫 번째 숫자를 입력하세요: 1
    두 번째 숫자를 입력하세요: 2
    12

```python
a = input()
type(a) # input에서 입력받은 값은 항상 문자열 형태
```

    1
    str

```python
a = int(input('첫 번째 숫자를 입력하세요: '))    # int를 사용하여 입력 값을 정수로 변환
b = int(input('두 번째 숫자를 입력하세요: '))    # int를 사용하여 입력 값을 정수로 변환
print(a + b)
# 3.5와 2.1처럼 실수를 더하려면 int 대신 float에 input()을 넣는다.
```

    첫 번째 숫자를 입력하세요: 20
    두 번째 숫자를 입력하세요: 30
    50

### 입력 값을 변수 두 개에 저장하기

`변수1, 변수2 = input('문자열').split('기준문자열')`

```python
# input 한 번에 값을 여러 개 입력
a, b = input('문자열 두 개를 입력하세요: ').split()    # 입력받은 값을 공백을 기준으로 분리
print(a)
print(b)
```

    문자열 두 개를 입력하세요: Hello Python
    Hello
    Python

```python
# 두 숫자의 합 구하기
a, b = input('숫자 두 개를 입력하세요: ').split()
print(a + b)
a = int(a)    # 변수를 정수로 변환한 뒤 다시 저장
b = int(b)    # 변수를 정수로 변환한 뒤 다시 저장
print(a + b)
print(int(a) + int(b))
```

    숫자 두 개를 입력하세요: 10 20
    1020
    30

### map을 사용하여 정수로 변환하기

map에 int와 input().split()을 넣으면 split의 결과를 모두 int로 변환해줌.
(실수로 변환할 때는 int 대신 float를 넣습니다.).

`변수1, 변수2 = map(int, input('문자열').split('기준문자열'))`

```python
a, b = map(int, input('숫자 두 개를 입력하세요: ').split()) #입력받는 부분과 int로 변환하는 부분이 한 줄로 줄었다
print(a + b)
a, b = map(int, input('숫자 두 개를 입력하세요: ').split(',')) # 입력받은 값을 콤마를 기준으로 분리 10,20
print(a + b)
```

    숫자 두 개를 입력하세요: 10 20
    30
    숫자 두 개를 입력하세요: 30,40
    70
