---
lastUpdated: 2025/07/14 14:56:00
subTitle: I hate this
description: Pro*C는 Oracle에서 제공하는 예비 컴파일러로, C/C++ 소스 코드 내에 SQL 문을 삽입하여 데이터베이스와 통신할 수 있도록 해준다.
image: https://em-content.zobj.net/source/apple/114/convenience-store_1f3ea.png
tags: ["sql"]
---

# Pro*C

## 1. Pro*C란?

Pro*C는 Oracle에서 제공하는 예비 컴파일러로, C/C++ 소스 코드 내에 SQL 문을 삽입하여 데이터베이스와 통신할 수 있도록 해준다.

## 2. 프로그램 구조

### 2.1 설명부 (Header)

- 프로그램 ID, 설명, 실행 주기, 참조 및 생성 테이블 등의 메타 정보를 주석으로 작성한다.
- 실행 인자, 로그 정보, 사용 라이브러리 등을 기술한다.

### 2.2 선언부

- 시스템 헤더 파일과 응용 프로그램 헤더 파일을 포함한다.
- 매크로 정의, SQL 변수 선언, 함수 원형 정의 등을 작성한다.
- SQL 문에서 사용할 호스트 변수는 `EXEC SQL BEGIN DECLARE SECTION` 블록 내에 선언한다.

### 2.3 실행부

- `main()` 함수에서 초기화 → 메인 처리 → 종료 처리의 흐름으로 구성된다.
- 각 단계는 함수로 분리되어 있으며 다음과 같은 구조를 따른다:

```c
int main(int argc, char *argv[]) {
    int li_rtn = OK;

    li_rtn = init_process(argc, argv);

    if (li_rtn == OK) {
        li_rtn = do_process();
    }

    li_rtn = final_process(li_rtn);
    return li_rtn;
}
```



## 3. 예제 소스

```sh
/*****************************************
 * 설명부: 회원 정보 조회 프로그램
 *****************************************/

#include <stdio.h>
#include <string.h>
#include <sqlca.h>

/*****************************************
 * 선언부: 변수 및 함수 선언
 *****************************************/
EXEC SQL BEGIN DECLARE SECTION;
    char user_id[10];
    char user_name[100];
EXEC SQL END DECLARE SECTION;

void fetch_user_info() {
    EXEC SQL CONNECT TO mydb USER 'user' IDENTIFIED BY 'pass';

    strcpy(user_id, "USER001");

    EXEC SQL SELECT name INTO :user_name FROM users WHERE id = :user_id;

    printf("사용자 이름: %s\n", user_name);

    EXEC SQL COMMIT RELEASE;
}

/*****************************************
 * 실행부: main 함수
 *****************************************/
int main() {
    fetch_user_info();
    return 0;
}
```



## 4. 컴파일 방법

### 일반 Pro*C 소스 컴파일
```sh
$ ./mk 파일명.pc
```

### RFC 모듈 포함 컴파일
```sh
$ ./mk_rfc 파일명.pc
```

### 라이브러리 컴파일
```sh
$ ./mk_lib 파일명.pc
```



## 5. 디렉토리 구조 예시

| 디렉토리 | 설명 |
|--|--|
| `/src/proc` | Pro*C 소스파일 |
| `/include` | Header 파일 |
| `/bin` | 실행 파일 |
| `/lib` | 라이브러리 |
| `/log` | 로그 파일 |
| `/data` | 송수신 파일 위치 |



## 6. 로그 처리 및 디버깅

- `DEBUG` 매크로를 통해 로그 출력 여부를 제어한다.
- `logging_start()` 와 `logging_end()` 함수로 로그 시작과 종료를 기록한다.
- 실행 로그는 로그 파일과 로그 테이블 모두에 저장할 수 있다.



## 7. 커서 사용법

```c
EXEC SQL DECLARE c1 CURSOR FOR SELECT name FROM users;
EXEC SQL OPEN c1;
EXEC SQL FETCH c1 INTO :user_name;
EXEC SQL CLOSE c1;
```

- 반복 처리는 `while(1)` 루프에서 수행하며, 종료 조건을 명시해야 한다.



## 8. 대용량 데이터 처리

- `FETCH BULK COLLECT INTO` 구문으로 여러 건의 데이터를 한 번에 가져올 수 있다.
- 루프 처리보다 효율적인 처리가 가능하다.



## 9. 오류 로그 함수

- `append_msg()` 함수는 오류를 로그 테이블에 저장한다.
- `append_msg2()` 함수는 로그 파일에 오류 메시지를 기록한다.



## 10. 유용한 유닉스 명령어

```sh
# 특정 문자열을 포함한 Pro*C 파일 검색
$ find . -name "*.pc" -exec grep -il "특정문자열" {} \;

# 로그 파일 조회
$ tail -n 30 로그파일.log
```