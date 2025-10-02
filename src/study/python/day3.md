---
tags: ["python"]
lastUpdated: 2023/12/04 00:00:00
---

# **day3** (2023-12-06)

### 불과 비교, 논리연산자

```python
True, False # 파이썬에서의 true false
```

    (True, False)

```python
3 > 1 # 비교 연산자
```

    True

```python
10 == 10    # 10과 10이 같은지 비교
```

    True

```python
10 != 5     # 10과 5가 다른지 비교
```

    True

```python
'Python' == 'Python' # 문자열도 ==와 != 연산자로 비교할 수 있다.
```

    True

```python
'Python' != 'python' # 대소문자가 다르면 다른 문자열
```

    True

```python
print(10 > 20) # 부등호 10이 20보다 큰지 비교
print(10 < 20) # 10이 20보다 작은지 비교
print(10 >= 10) # 10이 10보다 크거나 같은지 비교
print(10 <= 10) # 10이 10보다 작거나 같은지 비교
```

    False
    True
    True
    True

```python
# 객체 비교
# ==, !=는 값 자체를 비교
# is, is not은 객체(object)를 비교
print(1 == 1.0)
print(1 is 1.0)
print(1 is not 1.0)
# 오류가 발생하는 이유는, ==은 값(데이터)을 비교하는 것이지만 is는 레퍼런스(포인터)를 비교하기 때문
# is 연산자는 되도록이면 None, True, False 등을 비교할 때 사용
```

    True
    False
    True


    <>:5: SyntaxWarning: "is" with a literal. Did you mean "=="?
    <>:6: SyntaxWarning: "is not" with a literal. Did you mean "!="?
    <>:5: SyntaxWarning: "is" with a literal. Did you mean "=="?
    <>:6: SyntaxWarning: "is not" with a literal. Did you mean "!="?
    C:\Users\HWA\AppData\Local\Temp\ipykernel_2372\658909175.py:5: SyntaxWarning: "is" with a literal. Did you mean "=="?
      print(1 is 1.0)
    C:\Users\HWA\AppData\Local\Temp\ipykernel_2372\658909175.py:6: SyntaxWarning: "is not" with a literal. Did you mean "!="?
      print(1 is not 1.0)

```python
# id 함수: 정수 객체와 실수 객체가 서로 다른지 확인
# id는 객체의 고유한 값(메모리 주소)을 구한다.
id(1)
```

    3033985712368

```python
id(1.0)
```

    3034064569808

```python
# 값 비교에 is를 쓰면 안됨.
a = -5
a is -5
a = -6
a is -6
# 변수 a가 있는 상태에서 다른 값을 할당하면 메모리 주소가 달라질 수 있기 때문.
# 따라서 다른 객체가 되므로 값이 같더라도 is로 비교하면 False가 나옴.
# 값(숫자)를 비교할 때는 is가 아닌 비교 연산자를 사용.
```

    <>:3: SyntaxWarning: "is" with a literal. Did you mean "=="?
    <>:5: SyntaxWarning: "is" with a literal. Did you mean "=="?
    <>:3: SyntaxWarning: "is" with a literal. Did you mean "=="?
    <>:5: SyntaxWarning: "is" with a literal. Did you mean "=="?
    C:\Users\HWA\AppData\Local\Temp\ipykernel_2372\2189375639.py:3: SyntaxWarning: "is" with a literal. Did you mean "=="?
      a is -5
    C:\Users\HWA\AppData\Local\Temp\ipykernel_2372\2189375639.py:5: SyntaxWarning: "is" with a literal. Did you mean "=="?
      a is -6





    False

```python
# 논리 연산자 and
print(True and True)
print(True and False)
print(False and True)
print(False and False)
# 논리 연산자 or
print(True or True)
print(True or False)
print(False or True)
print(False or False)
# 논리 연산자 not
print(not True)
print(not False)
```

    True
    False
    False
    False
    True
    True
    True
    False
    False
    True

```python
# and, or, not 논리 연산자가 식 하나에 들어있으면 not, and, or 순으로 판단.
print(not True and False or not False)
print(((not True) and False) or (not False)) # 괄호로 표현
```

    True
    True

```python
# 비교 연산자(is, is not, ==, !=, <, >, <=, >=)를 먼저 판단하고 논리 연산자(not, and, or)를 판단
print(10 == 10 and 10 != 5)    # True and True
print(10 > 5 or 10 < 3)        # True or False
print(not 10 > 5)              # not True
print(not 1 is 1.0)            # not False
```

    True
    True
    False
    True


    <>:5: SyntaxWarning: "is not" with a literal. Did you mean "!="?
    <>:5: SyntaxWarning: "is not" with a literal. Did you mean "!="?
    C:\Users\HWA\AppData\Local\Temp\ipykernel_2372\4058834489.py:5: SyntaxWarning: "is not" with a literal. Did you mean "!="?
      print(not 1 is 1.0)            # not False

```python
# 정수, 실수, 문자열을 불로 만들 때는 bool을 사용
# 정수 0, 실수 0.0이외의 모든 숫자는 True
# 빈 문자열 '', ""를 제외한 모든 문자열은 True
print(bool(1))
print(bool(0))
print(bool(1.5))
print(bool('False'))
```

    True
    False
    True
    True

```python
# 단락 평가(short-circuit evalution)
# 첫 번째 값만으로 결과가 확실할 때 두 번째 값은 확인(평가)하지 않는 방법
# 첫 번째 값이 거짓이므로 두 번째 값은 확인하지 않고 거짓으로 결정
print(False and True)     # False
print(False and False)    # False
# 첫 번째 값이 참이므로 두 번째 값은 확인하지 않고 참으로 결정
print(True or True)     # True
print(True or False)    # True
```

    False
    False
    True
    True

```python
# 논리 연산자는 마지막으로 단락 평가를 실시한 값을 그대로 반환
print(True and 'Python')
print('Python' and True)
print('Python' and False)
print(False and 'Python')
print(0 and 'Python') # 0은 False이므로 and 연산자는 두 번째 값을 평가하지 않음
print(True or 'Python') # or 연산자에서 첫 번째 값만으로 결과가 결정되므로 첫 번째 값이 반환
print('Python' or True) # 만약 두 번째 값까지 판단해야 한다면 두 번째 값이 반환
print(False or 'Python')
print(0 or False)
```

    Python
    True
    False
    False
    0
    True
    Python
    Python
    False

### 문자열 사용하기

```python
hello = 'Hello, world!' # ' '(작은따옴표), " "(큰따옴표), '''(작은따옴표 3개), """(큰따옴표 3개) 사용가능
hello
```

    'Hello, world!'

```python
# 여러 줄로 된 문자열(multiline string) 사용하기
# "'''(작은따옴표 3개), ""(큰따옴표 3개)
hello = '''Hello, world!
안녕하세요.
Python입니다.'''
print(hello)
```

    Hello, world!
    안녕하세요.
    Python입니다.

```python
# 문자열 안에 '(작은따옴표)를 넣고 싶다면 문자열을 "(큰따옴표)로 묶어줌
# "(큰따옴표)를 넣고 싶다면 문자열을 '(작은따옴표)로 묶어줍
a = "Python isn't difficult"
b = 'He said "Python is easy"'
print(a)
print(b)
# 작은따옴표 안에 작은따옴표를 넣거나 큰따옴표 안에 큰따옴표를 넣을 수는 없다.
# 여러 줄로 된 문자열은 작은따옴표 안에 작은따옴표와 큰따옴표를 둘 다 넣을 수 있다.
double_quote2 = """Hello, 'Python'"""    # 한 줄로 작성
print(double_quote2)
```

    Python isn't difficult
    He said "Python is easy"
    Hello, 'Python'

```python
# 작은(큰)따옴표 안에 작은(큼)따옴표 : 작은(큰)따옴표 앞에 \(역슬래시)
# 특수 문자를 포함하기 위해 앞에 \를 붙이는 방법: 이스케이프(escape)
'Python isn\'t difficult'
```

    "Python isn't difficult"

```python
# 따옴표 세 개로 묶어서 여러 줄로 된 문자열을 만들면 줄바꿈이 되는 부분에 \n이 들어있다
'''Hello
Python'''
```

    'Hello  \nPython'

### 리스트와 튜플

```python
# 리스트 만들기
a = [38, 21, 53, 62, 19] # 리스트에 저장된 각 값 요소(element)라고 부름
print(a)
# 문자열, 정수, 실수, 불 등 며 자료형을 섞어서 저장해도 됩
person = ['james', 17, 175.3, True]
print(person)

# 빈 리스트 만들기
b = []
c = list()
print(b)
print(c)
```

    [38, 21, 53, 62, 19]
    ['james', 17, 175.3, True]
    []
    []

```python
# range를 사용하여 리스트 만들기
range(10) # 0부터 9까지 숫자를 생성
a = list(range(10)) # # 0부터 9까지 들어있는 리스트 생성
print(a)
b = list(range(5, 12)) # 5부터 11까지 들어있는 리스트 생성
print(b)
c = list(range(-4, 10, 2)) # 증가폭
print(c)
d = list(range(10, 0, -1))
print(d)
```

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    [5, 6, 7, 8, 9, 10, 11]
    [-4, -2, 0, 2, 4, 6, 8]
    [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

```python
# 튜플 : 읽기 전용 리스트. 안에 저장된 요소를 변경, 추가, 삭제를 할 수 없다.
# 요소를 실수로 변경하는 상황을 방지
a = (38, 21, 53, 62, 19)
a
person = ('james', 17, 175.3, True) # 리스트처럼 여러 자료형을 섞어서 저장
person

# 요소가 한 개 들어있는 튜플
(38) # 값 한 개를 괄호로 묶으면 튜플이 아니라 그냥 값
(38, )# 요소가 한 개인 튜플을 만들 때는 ( )(괄호) 안에 값 한 개를 넣고 ,(콤마)를 붙입
# 함수(클래스)를 사용하다 보면 값이 아닌 튜플을 넣어야 할 경우가 생깁니다.
# 이때 값은 한 개지만 튜플을 넣어야 할 때 (값, )과 같은 형식을 사용해야 합니다.
# 실무에서는 가끔 이 문법을 사용하게 되는데, 그냥 튜플 형태를 유지하기 위한 문법
```

    (38,)

```python
# range를 사용하여 튜플 만들기
a = tuple(range(10))
b = tuple(range(5, 12)) # 5부터 11까지 들어있는 튜플
c = tuple(range(-4, 10, 2)) # 증가폭을 지정
```

    (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

```python
# 튜플을 리스트로 만들고 리스트를 튜플로 만들기
a = [1, 2, 3]
tuple(a) # tuple 안에 리스트를 넣으면 새 튜플이 생깁
b = (4, 5, 6)
list(b) # list 안에 튜플을 넣으면 새 리스트가 생성
```

    [4, 5, 6]

```python
# list와 tuple에 문자열을 넣으면 문자 리스트, 문자 튜플이 생성
list('Hello')
tuple('Hello')
```

    ('H', 'e', 'l', 'l', 'o')

```python
# 리스트와 튜플을 사용하면 변수 여러 개를 한 번에 만들 수 있다. 이때 변수의 개수와 리스트(튜플)의 요소 개수는 같아야 함.
a, b, c = [1, 2, 3]
print(a, b, c)
d, e, f = (4, 5, 6)
print(d, e, f)
```

    1 2 3
    4 5 6

```python
# 리스트와 튜플 변수로도 변수 여러 개를 만들 수 있습니다.
# 리스트 언패킹(list unpacking), 튜플 언패킹(tuple unpacking) : 리스트와 튜플의 요소를 변수 여러 개에 할당
x = [1, 2, 3]
a, b, c = x
print(a, b, c)
y = (4, 5, 6)
d, e, f = y
print(d, e, f)
```

    1 2 3
    4 5 6

```python
x = input().split() # input().split()은 리스트를 반환
a, b = x # 리스트 언패킹 형식으로 입력 값을 변수 여러 개에 저장
# a, b = input().split()과 같음
print(a, b)
```

    10 20
    10 20

```python
# 리스트 패킹(list packing)과 튜플 패킹(tuple packing)은 변수에 리스트 또는 튜플을 할당하는 과정
a = [1, 2, 3]    # 리스트 패킹
b = (1, 2, 3)    # 튜플 패킹
c = 1, 2, 3      # 튜플 패킹
c
```

    (1, 2, 3)
