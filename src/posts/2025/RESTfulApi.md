---
lastUpdated: 2025/01/06 16:01:00
subTitle: 누군가 당신에게 칠판에 RESTful API 설계를 해보라 한다면.. 이불킥
---

# RESTful API

## API란?
Application Programming Interface (API) : Application을 Programming 할 때 사용되는 인터페이스이다.  
(인터페이스는 간단히 말해서, 어려운 것은 감추고 보다 쉽게 상호작용할 수 있도록 해주는 것들을 의미한다.)
한마디로, API는 소프트웨어 간의 상호 작용을 가능하게 하는 규칙과 프로토콜의 집합이다.

## RESTful API란?
REST(Representational State Transfer)는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍쳐이며, REST를 준수하는 API를 REST API라고 한다.

### REST API의 세 가지 요소

자원(URI), 행위(HTTP요청 메서드), 표현(페이로드)

### REST의 주요 원칙
#### 1. 리소스 식별  
고유한 URL을 통해 모든 자원이 식별 되어야 한다. 즉, URL을 통해 모든 자원을 파악할 수 있다는 것이다.
다음 URL을 분석해보자

    https://api.example.com/users/1
  - "http://api.example.com" 을  통해 시스템에 접근한다.  
  - user id가 1인 데이터에 접근한다.

이처럼 url을 통해 사용자는 직관적으로 자원을 식별할 수 있어야한다.

#### 2. 무상태성 (statelessness)
서버는 클라이언트는 서로의 상태를 알 수 없다. 따라서 요청을 처리할 충분한 정보를 포함해야한다.
만약 로그인 상태를 체크하여 로그인 된 유저에게만 api 접근을 허용하려고한다.
이 때 서버에서는 클라이언트에서 로그인이 되었는지 알 수 없기 때문에 토큰 정보를 같이 보낸다.

#### 3. 자원의 조작 (Representation)
JSON이나 XML 등의 형식으로 요청과 응답이 처리되며, 이 때 전송 받은 데이터는 가공하여 사용 가능하다.

#### 4. 모든 내용을 담아야 한다.
요청과 응답 시 전송하는 메시지를 통해 모든 처리가 가능해야한다.

#### 5. 추가적인 상태 변화를 위한 정보를 공유한다. (HATEOAS, 선택적 사용)
서버를 통한 응답을 통해 이후 가능한 행동에 대한 하이퍼링크를 포함해야한다.
이 말의 뜻은 사용자 정보를 조회하는 GET 요청을 서버에 전송하였을 때, 서버로부터 받는 응답에는 사용자를 수정하거나 삭제할 수 있는 URL, method를 포함된다는 것이다. 해당 특징은 선택적 사용된다.

#### 6. 캐시 가능 여부 포함
응답을 통해 해당 정보가 캐시 가능 여부와 가능 시 유지 기간을 포함해야한다.

### REST API의 설계 원칙

URI는 리소스를 표현해야 한다.
리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.(URI에 표현하지 않는다.)
REST의 기본 원칙을 성실히 지킨 서비스 디자인을 Restful하다고 한다.

RESTful API의 설계 원칙을 준수하여 각 리소스에 대해 일관된 메소드를 사용하면 API를 이해하기 쉽고 유지보수하기 편해진다.

1. URI에 동사가 포함이 되어선 안된다.
2. URI에서 단어의 구분이 필요한 경우 -(하이픈)을 이용한다.
3. 자원은 기본적으로 복수형으로 표현한다.
4. 단 하나의 자원을 명시적으로 표현을 하기 위해서는 /users/id와 같이 식별 값을 추가로 사용한다.
5. 자원 간 연관 관계가 있을 경우 이를 URI에 표현한다.

## 1. API 설계

| HTTP Method | Endpoint        | 설명                          | 인증 필요 여부  | 요청 예시                      | 상태 코드 (HTTP Status)                          |
|-------------|-----------------|-------------------------------|----------------|--------------------------------|--------------------------------------------------|
| **POST**    | `/auth/login`   | 로그인 (토큰 발급)            | ❌              | 로그인 요청: `email`, `password` | 200 OK, 400 Bad Request, 401 Unauthorized         |
| **POST**    | `/auth/signup`  | 회원 가입                    | ❌              | 회원가입 요청: `name`, `email`, `password` | 201 Created, 400 Bad Request                      |
| **GET**     | `/users`        | 모든 회원 조회                | ✅              | 토큰 포함 헤더: `Authorization: Bearer <token>` | 200 OK, 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| **GET**     | `/users/{id}`   | 특정 회원 조회                | ✅              | 토큰 포함 헤더: `Authorization: Bearer <token>` | 200 OK, 401 Unauthorized, 403 Forbidden, 404 Not Found |
| **PUT**     | `/users/{id}`   | 회원 정보 수정                | ✅              | 토큰 포함 헤더 + 데이터: `name`, `email`, `password` | 200 OK, 400 Bad Request, 401 Unauthorized, 404 Not Found |
| **DELETE**  | `/users/{id}`   | 회원 삭제                     | ✅              | 토큰 포함 헤더: `Authorization: Bearer <token>` | 204 No Content, 401 Unauthorized, 403 Forbidden, 404 Not Found |

---

## 2. 상태 코드

| 상태 코드 | 이름                       | 설명                                                                 |
|-----------|----------------------------|---------------------------------------------------------------------|
| **1xx**   | **정보 응답 (Informational)**| **요청 처리 중**                        |
| 100       | Continue                   | 서버가 요청의 일부를 받았으며 계속해서 요청을 보내도 됨.              |

| 상태 코드 | 이름                       | 설명                                                                 |
|-----------|----------------------------|----------------------------------------------------------------------|
| **2xx**   | **성공 (Success)**          | **요청이 성공적으로 처리되었음**                         |
| 200       | OK                         | 요청이 성공적으로 처리되었으며, 결과가 포함되어 반환됨.               |
| 201       | Created                    | 요청이 성공적으로 처리되어 자원이 생성됨.                             |
| 202       | Accepted                   | 요청이 수락되었으나 아직 처리되지 않음.                               |
| 204       | No Content                 | 요청이 성공했으나 반환할 데이터가 없음.                               |

| 상태 코드 | 이름                       | 설명                                                                 |
|-----------|----------------------------|---------------------------------------------------------------------|
| **3xx**   | **리다이렉션 (Redirection)** | **요청에 대한 추가 작업 필요**                                    |
| 301       | Moved Permanently          | 요청한 리소스가 영구적으로 이동됨.                                   |
| 302       | Found                      | 요청한 리소스가 임시적으로 다른 위치에 있음.                          |
| 304       | Not Modified               | 요청한 리소스가 수정되지 않았으므로 캐시된 버전을 사용할 수 있음.      |

| 상태 코드 | 이름                       | 설명                                                                 |
|-----------|----------------------------|---------------------------------------------------------------------|
| **4xx**   | **클라이언트 오류 (Client Error)** | **클라이언트 요청에 문제가 있음**                          |
| 400       | Bad Request                | 잘못된 요청으로 서버가 이해하지 못함.                                 |
| 401       | Unauthorized               | 인증이 필요하거나 인증에 실패함.                                      |
| 403       | Forbidden                  | 요청이 금지됨 (권한 부족).                                            |
| 404       | Not Found                  | 요청한 리소스를 찾을 수 없음.                                         |
| 405       | Method Not Allowed         | 허용되지 않은 HTTP 메서드를 사용함.                                   |
| 409       | Conflict                   | 요청이 현재의 서버 상태와 충돌함.                                     |
| 422       | Unprocessable Entity       | 요청이 올바르지만 처리가 불가능함 (주로 유효성 검증 실패).              |

| 상태 코드 | 이름                       | 설명                                                                 |
|-----------|----------------------------|---------------------------------------------------------------------|
| **5xx**   | **서버 오류 (Server Error)** | **서버에서 요청을 처리할 수 없음**                                 |
| 500       | Internal Server Error      | 서버에서 일반적인 오류가 발생함.                                      |
| 501       | Not Implemented            | 서버에 요청 처리 기능이 구현되어 있지 않음.                            |
| 502       | Bad Gateway                | 서버가 잘못된 응답을 받음.                                            |
| 503       | Service Unavailable        | 서버가 과부하 상태이거나 유지 관리 중임.                               |
| 504       | Gateway Timeout            | 게이트웨이가 응답하지 않아 요청이 처리되지 않음.                        |

## 3. 토큰 기반 인증 처리

### **POST `/auth/login` (로그인 - 토큰 발급)**

- **Request**: 클라이언트가 이메일과 비밀번호를 보내면 서버는 해당 사용자를 인증하고 JWT 토큰을 발급합니다.
- **Response**:
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 3600
  }
  ```
  - **200 OK**: 토큰 발급 성공
  - **400 Bad Request**: 잘못된 요청 (예: 이메일 또는 비밀번호 누락)
  - **401 Unauthorized**: 인증 실패 (잘못된 자격 증명)

### **GET `/users` (회원 조회)**

- **Request**: 사용자는 헤더에 JWT 토큰을 포함하여 요청합니다.
  ```http
  Authorization: Bearer <valid-jwt-token>
  ```
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    {
      "id": 2,
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  ]
  ```
  - **200 OK**: 요청한 모든 회원 정보 반환
  - **401 Unauthorized**: 토큰 누락 또는 유효하지 않은 토큰
  - **403 Forbidden**: 해당 리소스에 접근 권한이 없는 경우
  - **500 Internal Server Error**: 서버 내부 오류

### **PUT `/users/{id}` (회원 수정)**

- **Request**: `Authorization` 헤더에 유효한 토큰을 포함하고 수정할 데이터를 보냅니다.
  ```json
  {
    "name": "John Doe Updated",
    "email": "john_updated@example.com",
    "password": "new_secure_password"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "name": "John Doe Updated",
    "email": "john_updated@example.com"
  }
  ```
  - **200 OK**: 회원 정보 수정 성공
  - **400 Bad Request**: 잘못된 요청 데이터
  - **401 Unauthorized**: 유효하지 않은 토큰 또는 인증되지 않은 사용자
  - **404 Not Found**: 존재하지 않는 회원 ID

### **DELETE `/users/{id}` (회원 삭제)**

- **Request**: `Authorization` 헤더에 유효한 토큰을 포함하여 요청합니다.
- **Response**:
  - **204 No Content**: 회원 삭제 성공 (응답 본문 없음)
  - **401 Unauthorized**: 유효하지 않은 토큰
  - **403 Forbidden**: 삭제 권한이 없는 사용자
  - **404 Not Found**: 해당 ID의 회원을 찾을 수 없음

---
