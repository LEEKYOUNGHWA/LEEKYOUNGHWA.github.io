---
tags: ["python"]
lastUpdated: 2023/12/04 00:00:00
---

# **day2** (2023-12-05)

### 출력 방법

```python
print(1, 2, 3)
print('Hello', 'Python')
print(1, 2, 3, sep=', ')    # sep에 콤마와 공백을 지정
print(4, 5, 6, sep=',')    # sep에 콤마만 지정
print('Hello', 'Python', sep='')    # sep에 빈 문자열을 지정
print(1920, 1080, sep='x')    # sep에 x를 지정
```

    1 2 3
    Hello Python
    1, 2, 3
    4,5,6
    HelloPython
    1920x1080

```python
print(1, 2, 3, sep='\n') # sep에 개행 문자(\n)
print('1\n2\n3')
```

    1
    2
    3
    1
    2
    3

> ### 제어 문자
>
> 제어 문자는 화면에 출력되지는 않지만 출력 결과를 제어.  
> 또한, 제어 문자는 \로 시작하는 이스케이프 시퀀스이다.  
> (부록 ‎47.6 이스케이프 시퀀스 참조).
>
> - \n: 다음 줄로 이동하며 개행이라고도 부릅니다.
> - \t: 탭 문자, 키보드의 Tab 키와 같으며 여러 칸을 띄웁니다.
> - \\: \ 문자 자체를 출력할 때는 \를 두 번 써야 합니다.

```python
print(1)
print(2)
print(3)

print(1, end='')    # end에 빈 문자열을 지정하면 다음 번 출력이 바로 뒤에 오게 됨
print(2, end='')
print(3)

print(1, end=' ')    # end에 공백 한 칸 지정
print(2, end=' ')
print(3)
```

    1
    2
    3
    123
    1 2 3

```python
10_000_000  # - , 대신 _(밑줄 문자)를 사용 : 숫자를 콤마로 구분해서 표현
```

    10000000

```python
10,000,000 # 숫자에 ,를 사용하면 파이썬의 튜플 자료형이 되므로 주의
```

    (10, 0, 0)

```python
import sys
x = y = 1000
print(sys.getrefcount(1000))
print(sys.getrefcount(x))
print(sys.getrefcount(y))
print(x is y)
```

    3
    4
    4
    True

### 줄바꿈 방식

- \r은 캐리지 리턴(Carriage Return, CR)
- \n은 라인 피드(Line Feed, LF)
- Windows: CR LF(\r\n)
- 유닉스, 리눅스, macOS: LF(\n)
- Mac OS 9(클래식): CR(\r)
- 파이썬에서는 줄바꿈을 할 때 운영체제에 상관없이 \n만 사용

```python
# 행렬 곱셈 연산자
import numpy as np    # numpy 모듈을 가져옴
a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])    # 3x3 행렬 생성
b = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])    # 3x3 행렬 생성
a @ b    # 행렬 곱셈
```

    array([[ 30,  36,  42],
           [ 66,  81,  96],
           [102, 126, 150]])

```python
1+4
```

    5

```python
_ # 파이썬 셸에서 코드를 실행했을 때 결과는 _(밑줄 문자) 변수에 저장
```

    5
