---
lastUpdated: 2024/12/10 16:22:00
description: 챗 지피티가 뽑아준
---

# RestAPI interview 예상 질문 100개

<TTSButton/>

## 1. REST란 무엇인가요?
- REST (Representational State Transfer)는 웹 서비스 아키텍처 스타일로, HTTP 프로토콜을 기반으로 리소스를 처리하고 클라이언트와 서버 간의 상태 전이를 표현하는 방식입니다. RESTful API는 HTTP 메소드를 이용하여 CRUD 작업을 수행합니다.

## 2. REST API에서 HTTP 메소드 GET, POST, PUT, DELETE의 역할을 설명해주세요.
- GET 서버에서 리소스를 조회하는 데 사용합니다.
- POST 서버에 새로운 리소스를 생성하는 데 사용합니다.
- PUT 리소스를 전체적으로 업데이트하는 데 사용합니다.
- DELETE 서버에서 리소스를 삭제하는 데 사용합니다.

## 3. REST API에서 리소스는 무엇인가요?
- 리소스는 REST API에서 처리되는 데이터나 객체로, URI를 통해 고유하게 식별됩니다. 예를 들어, 사용자는 `/users/123`와 같은 URI로 특정 사용자의 정보를 요청할 수 있습니다.

## 4. REST API에서 URI 디자인의 모범 사례는 무엇인가요?
- 명사형으로 리소스를 표현합니다. 예 `/users`, `/products`.
- 복수형을 사용하여 여러 리소스를 나타냅니다.
- 계층적인 구조를 사용하여 리소스 간 관계를 나타냅니다. 예 `/users/123/orders`.
- 명확한 필터링 및 검색 기능을 제공하는 방식으로 쿼리 파라미터를 활용합니다.

## 5. REST API의 상태가 없는(stateless) 특성에 대해 설명해주세요.
- REST는 상태가 없는 아키텍처를 따르므로, 클라이언트와 서버 간의 요청은 독립적이어야 합니다. 서버는 클라이언트의 상태 정보를 저장하지 않으며, 클라이언트는 모든 필요한 정보를 요청 시마다 함께 전송해야 합니다.

## 6. HTTP 상태 코드 200, 201, 400, 404, 500에 대해 설명해주세요.
- 200 OK 요청이 성공적으로 처리됨.
- 201 Created 리소스가 성공적으로 생성됨.
- 400 Bad Request 요청이 잘못되었음을 나타냄.
- 404 Not Found 요청한 리소스를 찾을 수 없음.
- 500 Internal Server Error 서버에서 오류가 발생함.

## 7. REST API에서 요청 헤더와 응답 헤더의 차이점은 무엇인가요?
- 요청 헤더는 클라이언트에서 서버로 보내는 추가적인 정보(예 인증 정보, 콘텐츠 타입 등)를 포함하며, 응답 헤더는 서버가 클라이언트에게 보내는 정보(예 상태 코드, 콘텐츠 길이 등)를 포함합니다.

## 8. REST API에서 Authentication과 Authorization의 차이점은 무엇인가요?
- Authentication 사용자가 누구인지 확인하는 과정입니다. 예 로그인.
- Authorization 인증된 사용자가 특정 리소스에 접근할 수 있는 권한을 부여하는 과정입니다. 예 사용자 권한 확인.

## 9. JWT (JSON Web Token)란 무엇인가요?
- JWT는 JSON 형식으로 정보를 안전하게 전달하는 토큰 기반 인증 메커니즘입니다. JWT는 세 부분(헤더, 페이로드, 서명)으로 구성되며, 주로 클라이언트와 서버 간의 인증에 사용됩니다.

## 10. REST API에서의 응답 본문(body)의 역할은 무엇인가요?
- 응답 본문은 요청에 대한 서버의 결과를 포함합니다. JSON 또는 XML 형식으로 데이터를 반환하며, 클라이언트가 이를 사용하여 결과를 처리할 수 있습니다.

## 11. API Rate Limiting이란 무엇인가요?
- API Rate Limiting은 일정 시간 내에 특정 API에 대한 요청 횟수를 제한하는 메커니즘입니다. 이는 서버의 과부하를 방지하고, 서비스의 안정성을 유지하는 데 중요합니다.

## 12. RESTful API에서 Pagination이란 무엇인가요?
- Pagination은 리소스가 많을 때, 한 번에 모두 반환하는 대신 여러 페이지로 나누어 데이터를 반환하는 방식입니다. 예를 들어, 쿼리 파라미터로 `page`와 `limit`을 사용하여 페이지 단위로 데이터를 나눠서 제공할 수 있습니다.

## 13. API에서 CORS(Cross-Origin Resource Sharing)란 무엇인가요?
- CORS는 웹 브라우저에서 다른 도메인으로의 요청을 제어하는 보안 기능입니다. REST API 서버는 CORS 헤더를 설정하여 특정 출처에서의 요청을 허용하거나 차단할 수 있습니다.

## 14. REST API에서 HATEOAS란 무엇인가요?
- HATEOAS(Hypermedia As The Engine Of Application State)는 클라이언트가 리소스를 탐색할 때, API 응답에서 다른 리소스의 링크를 제공하는 방식입니다. 이를 통해 클라이언트는 API 사용 방법을 동적으로 발견할 수 있습니다.

## 15. REST API에서 SOAP와의 차이점은 무엇인가요?
- SOAP는 XML 기반의 프로토콜로, 주로 고정된 형식의 요청과 응답을 요구합니다. 반면 REST는 HTTP를 기반으로 하며, 데이터 형식에 제한이 없고, 상태 비저장성, 단순성 등의 특징을 가집니다.

## 16. REST API에서 URI 버전 관리 방법은 무엇인가요?
- URI 버전 관리는 API의 버전을 관리하는 방법으로, 보통 `/v1/` 또는 `/api/v1/`와 같이 URI에 버전 정보를 포함합니다. 이를 통해 API의 변경에 대응할 수 있습니다.

## 17. 파라미터가 URL에 포함된 형태를 어떻게 처리하나요?
- 파라미터는 URL에 `?key=value` 형식으로 포함되며, 여러 파라미터는 `&`로 구분합니다. 예 `/search?q=python&page=1`.

## 18. REST API에서 필터링과 정렬을 어떻게 구현하나요?
- 필터링과 정렬은 주로 쿼리 파라미터로 구현됩니다. 예를 들어, `/users?age=25&sort=name`와 같이 특정 조건으로 필터링하거나, 데이터를 정렬할 수 있습니다.

## 19. REST API에서 API 문서화의 중요성은 무엇인가요?
- API 문서화는 다른 개발자가 API를 올바르게 이해하고 사용할 수 있게 해줍니다. 명확한 문서는 개발자 경험을 향상시키고, API의 효율적인 사용을 돕습니다.

## 20. REST API에서 상태 코드 401 Unauthorized와 403 Forbidden의 차이점은 무엇인가요?
- 401 Unauthorized 인증이 필요하지만 제공되지 않거나 잘못된 인증이 제공된 경우.
- 403 Forbidden 인증은 되었지만, 해당 리소스에 대한 접근 권한이 없는 경우.

## 21. REST API에서 XML과 JSON 중 어떤 형식을 사용하는 것이 좋을까요?
- JSON은 더 간단하고, 가볍고, JavaScript와 쉽게 통합되므로 일반적으로 더 많이 사용됩니다. XML은 더 복잡하지만, 구조화된 데이터와 메타데이터를 다룰 때 유용할 수 있습니다.

## 22. API에서 인증 방식으로 Basic Authentication과 Bearer Token의 차이점은 무엇인가요?
- Basic Authentication 사용자 이름과 비밀번호를 Base64로 인코딩하여 HTTP 헤더에 포함시키는 방식입니다.
- Bearer Token 토큰 기반 인증 방식으로, 보통 JWT와 같은 토큰을 HTTP 헤더에 포함시켜 인증을 수행합니다.

## 23. API에서 Caching이란 무엇인가요?
- Caching은 API 응답을 일정 시간 동안 저장하여, 동일한 요청에 대해 서버가 다시 처리하지 않고 저장된 데이터를 반환하는 방식입니다. 이를 통해 응답 속도를 향상시킬 수 있습니다.

## 24. REST API에서 `OPTIONS` 메소드의 역할은 무엇인가요?
- `OPTIONS` 메소드는 클라이언트가 서버에서 지원하는 HTTP 메소드 및 옵션을 확인하는 데 사용됩니다. 이는 주로 CORS 요청에서 사용됩니다.

## 25. API에서 `Content-Type`과 `Accept` 헤더의 차이점은 무엇인가요?
- Content-Type 요청 본문 또는 응답 본문의 미디어 타입을 지정합니다.
- Accept 클라이언트가 받아들일 수 있는 응답의 미디어 타입을 지정합니다.

## 26. API에서 GET 요청과 POST 요청의 차이점은 무엇인가요?
- GET 서버에서 데이터를 조회하는 데 사용되며, 요청 본문을 포함하지 않습니다.
- POST 서버에 데이터를 전송하여 새로운 리소스를 생성하는 데 사용됩니다.

## 27. REST API에서 API Gateway란 무엇인가요?
- API Gateway는 여러 서비스가 하나의 엔드포인트를 통해 접근할 수 있게 하는 서버로, API 요청을 라우팅하고, 인증, 모니터링, 로깅 등의 기능을 제공하는 역할을 합니다.

## 28. API에서 Webhooks란 무엇인가요?
- Webhook은 특정 이벤트가 발생했을 때, 서버가 자동으로 클라이언트에게 HTTP POST 요청을 보내는 방식입니다. 예를 들어, 결제가 완료되었을 때 알림을 받을 수 있습니다.

## 29. REST API에서 PATCH 메소드의 용도는 무엇인가요?
- `PATCH` 메소드는 리소스의 일부를 업데이트하는 데 사용됩니다. `PUT`은 리소스를 전체적으로 업데이트하는 데 반해, `PATCH`는 일부 필드를 업데이트할 때 사용됩니다.

## 30. API에서 OAuth란 무엇인가요?
- OAuth는 안전하게 리소스를 공유할 수 있게 해주는 인증 프로토콜로, 사용자가 자신의 자격 증명을 제공하지 않고도 제3자 애플리케이션이 자원에 접근할 수 있도록 합니다.

## 31. REST API에서 클라이언트가 보내는 요청 본문을 어떻게 처리하나요?
- 요청 본문은 클라이언트가 서버로 보낸 데이터로, 주로 `Content-Type` 헤더를 사용하여 데이터 형식을 지정합니다. 서버는 이 형식에 맞게 데이터를 파싱하여 처리합니다.

## 32. REST API에서 HTTP 상태 코드 422 Unprocessable Entity는 무엇을 의미하나요?
- `422 Unprocessable Entity`는 요청은 유효하지만, 서버가 요청된 작업을 처리할 수 없는 상태를 나타냅니다. 예를 들어, 잘못된 형식이나 필수 데이터가 누락된 경우입니다.

## 33. API에서 "Idempotent"란 무엇인가요?
- `Idempotent`는 같은 요청을 여러 번 보내도 결과가 동일한 특성을 의미합니다. 예를 들어, `GET`, `PUT`, `DELETE` 메소드는 일반적으로 `Idempotent`합니다.

## 34. API에서 "Safe"한 요청이란 무엇인가요?
- `Safe`한 요청은 서버의 상태를 변경하지 않는 요청입니다. 예를 들어, `GET` 요청은 서버의 데이터를 조회하지만, 서버의 상태를 변경하지 않으므로 `Safe`한 요청에 해당합니다.

## 35. API에서 Rate Limiting을 구현하는 방법은 무엇인가요?
- Rate Limiting을 구현하는 방법으로는 클라이언트의 IP 주소를 기준으로 요청 횟수를 제한하거나, API 키 별로 제한을 설정하는 방법이 있습니다. `X-Rate-Limit` 헤더를 통해 제한 정보를 제공할 수 있습니다.

## 36. REST API에서 "Cross-Origin Resource Sharing (CORS)"을 설정하는 방법은 무엇인가요?
- CORS를 설정하려면 서버에서 `Access-Control-Allow-Origin` 헤더를 설정하여 특정 출처에서의 요청을 허용하거나 차단할 수 있습니다. 또한, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers` 등을 설정할 수 있습니다.

## 37. API에서 "Proxy"란 무엇인가요?
- Proxy는 클라이언트와 서버 사이에 중간 역할을 하는 서버입니다. 주로 보안, 로깅, 요청 필터링 등의 용도로 사용됩니다. API Gateway가 Proxy 역할을 하기도 합니다.

## 38. API에서 "Request Validation"이란 무엇인가요?
- Request Validation은 클라이언트가 보낸 요청의 데이터를 서버에서 확인하는 과정입니다. 필수 파라미터가 존재하는지, 형식이 올바른지 등을 검증합니다.

## 39. REST API에서 보안적인 측면에서 고려해야 할 사항은 무엇인가요?
- HTTPS를 사용하여 데이터 암호화.
- API 키 또는 토큰 기반 인증(예 JWT)을 사용하여 보안 강화.
- 요청의 입력값을 검증하여 SQL 인젝션, XSS와 같은 공격 방지.
- Rate Limiting을 통해 서비스 남용 방지.

## 40. REST API에서 "HMAC"란 무엇인가요?
- HMAC (Hash-based Message Authentication Code)은 메시지가 변경되지 않았는지 확인하기 위해 메시지와 비밀 키를 이용해 해시 값을 생성하는 방법입니다. 주로 데이터의 무결성을 검증할 때 사용됩니다.

## 41. API에서 "JSONP"란 무엇인가요?
- JSONP (JSON with Padding)는 CORS가 지원되지 않는 환경에서, 서버의 데이터를 클라이언트에서 받아오기 위한 기술로, `<script>` 태그를 사용하여 데이터를 반환받습니다.

## 42. REST API에서 "Limit"과 "Offset"을 사용하는 이유는 무엇인가요?
- `Limit`과 `Offset`은 페이징 처리를 위해 사용됩니다. `Limit`은 한 페이지에서 가져올 항목의 수를, `Offset`은 페이지 번호에 해당하는 항목의 시작 위치를 지정합니다.

## 43. API에서 "Callback URL"이란 무엇인가요?
- Callback URL은 서버에서 특정 작업이 완료된 후, 클라이언트의 지정된 URL로 알림을 보내는 방법입니다. 예를 들어, 결제 시스템에서 결제 완료 후, 결과를 알리기 위한 URL입니다.

## 44. API에서 "Idempotent" 메소드와 "Non-Idempotent" 메소드의 차이점은 무엇인가요?
- Idempotent 요청을 여러 번 반복해도 결과가 동일한 메소드입니다. 예 `GET`, `PUT`, `DELETE`.
- Non-Idempotent 요청을 여러 번 반복하면 결과가 달라질 수 있는 메소드입니다. 예 `POST`.

## 45. REST API에서 "Deep Linking"은 무엇인가요?
- Deep Linking은 REST API에서 특정 리소스나 페이지를 직접 접근할 수 있도록 하는 URL입니다. 예를 들어, `/products/123`와 같은 URL은 특정 상품에 대한 상세 정보를 직접 조회할 수 있게 해줍니다.

## 46. REST API에서 "Hypermedia"란 무엇인가요?
- Hypermedia는 HATEOAS의 일환으로, 서버가 응답에 다른 리소스나 가능한 동작에 대한 링크를 포함시켜 클라이언트가 다른 관련 리소스를 동적으로 발견할 수 있도록 합니다.

## 47. API에서 "Stateful"과 "Stateless"의 차이점은 무엇인가요?
- Stateful 서버가 클라이언트의 상태를 유지하고, 요청 간에 상태 정보를 공유하는 방식입니다.
- Stateless 서버가 클라이언트의 상태를 유지하지 않으며, 각 요청은 독립적입니다. REST는 Stateless를 권장합니다.

## 48. API에서 "Circuit Breaker" 패턴이란 무엇인가요?
- Circuit Breaker는 시스템에서 장애가 발생했을 때, 지속적으로 오류를 발생시키지 않도록 차단하는 패턴입니다. 이를 통해 시스템의 안정성을 유지하고, 장애 확산을 방지할 수 있습니다.

## 49. API에서 "Service Discovery"란 무엇인가요?
- Service Discovery는 동적으로 서비스의 위치를 찾는 방법입니다. 특히 마이크로서비스 아키텍처에서 각 서비스의 위치를 자동으로 검색하고 관리하는 데 사용됩니다.

## 50. API에서 "Request Throttling"이란 무엇인가요?
- Request Throttling은 요청이 너무 많을 경우, 일정한 속도 제한을 두어 과도한 요청을 방지하는 기술입니다. 이는 Rate Limiting과 유사하지만 더 세밀하게 제어할 수 있습니다.

## 51. API에서 "API Gateway"의 역할은 무엇인가요?
- API Gateway는 클라이언트 요청을 받아서 적절한 마이크로서비스로 전달하고, 인증, 로깅, 라우팅, Rate Limiting 등의 기능을 제공합니다. 클라이언트와 서비스 간의 중재자 역할을 합니다.

## 52. API에서 "Event-Driven Architecture"란 무엇인가요?
- Event-Driven Architecture는 시스템의 각 구성 요소가 이벤트를 통해 서로 통신하는 아키텍처입니다. 이벤트가 발생하면 이를 처리하는 서비스가 동작하며, API는 이러한 이벤트에 반응하여 동작합니다.

## 53. API에서 "Asynchronous" 처리 방식이란 무엇인가요?
- Asynchronous 처리 방식은 요청을 보낸 후, 서버가 즉시 응답하지 않고 백그라운드에서 작업을 처리하는 방식입니다. 클라이언트는 작업이 완료되면 알림을 받거나 상태를 확인할 수 있습니다.

## 54. API에서 "Webhook"과 "Poll"의 차이점은 무엇인가요?
- Webhook 서버가 클라이언트에게 알림을 보내는 방식입니다.
- Poll 클라이언트가 주기적으로 서버에 요청하여 상태를 확인하는 방식입니다.

## 55. API에서 "Rate Limiting"을 구현할 때 사용하는 도구는 무엇인가요?
- Redis, Nginx, API Gateway 등을 사용하여 Rate Limiting을 구현할 수 있습니다. 예를 들어, Redis는 클라이언트의 요청을 추적하고 제한하는 데 유용합니다.

## 56. API에서 "Data Consistency"란 무엇인가요?
- Data Consistency는 여러 시스템 간에 데이터의 일관성이 유지되는 상태를 의미합니다. 이를 위해 트랜잭션 관리, 분산 데이터베이스, 이벤트 소싱 등을 활용할 수 있습니다.

## 57. API에서 "Throttling"과 "Rate Limiting"의 차이점은 무엇인가요?
- Throttling 요청을 일정 시간 동안 제한하는 방식입니다. 요청 속도를 조절하여 서버를 보호합니다.
- Rate Limiting 일정 시간 동안의 최대 요청 횟수를 설정하여 과도한 요청을 방지하는 방식입니다.

## 58. API에서 "Load Balancer"란 무엇인가요?
- Load Balancer는 여러 서버에 클라이언트 요청을 분배하여 시스템의 부하를 고르게 분산시키는 장치입니다. 이를 통해 시스템의 확장성과 안정성을 향상시킬 수 있습니다.

## 59. API에서 "Microservices"란 무엇인가요?
- Microservices는 애플리케이션을 독립적인 작은 서비스들로 나누어 개발하는 아키텍처 스타일입니다. 각 서비스는 자체적인 데이터베이스를 가질 수 있으며, API를 통해 서로 통신합니다.

## 60. API에서 "Proxy Server"란 무엇인가요?
- Proxy Server는 클라이언트와 서버 간의 중개 역할을 하는 서버입니다. 보안, 로깅, 캐싱 등의 기능을 제공하며, 클라이언트의 요청을 다른 서버로 전달합니다.

## 61. API에서 "Caching"을 사용하는 이유는 무엇인가요?
- Caching을 사용하면 데이터베이스나 다른 서버에 대한 요청을 줄여 성능을 개선하고 응답 시간을 단축시킬 수 있습니다. 캐시된 데이터를 재사용함으로써 시스템의 부하를 줄이고 응답 속도를 빠르게 할 수 있습니다.

## 62. API에서 "ETag" 헤더의 역할은 무엇인가요?
- `ETag`는 리소스의 버전 정보를 나타내는 HTTP 헤더입니다. 클라이언트가 요청할 때 `ETag` 값을 제공하면, 서버는 리소스가 변경되지 않았을 경우 304 Not Modified 응답을 보냅니다.

## 63. REST API에서 "Pagination"이란 무엇인가요?
- Pagination은 대량의 데이터를 여러 페이지로 나누어 반환하는 기술입니다. 이를 통해 한 번에 많은 양의 데이터를 처리하는 대신, 데이터 전송량을 줄이고 성능을 향상시킬 수 있습니다.

## 64. API에서 "Content Negotiation"이란 무엇인가요?
- Content Negotiation은 클라이언트가 요청 시, 응답받을 콘텐츠 유형을 지정할 수 있는 기능입니다. 예를 들어, `Accept` 헤더를 통해 클라이언트가 원하는 형식(`application/json`, `application/xml`)을 서버에 전달할 수 있습니다.

## 65. API에서 "OAuth 2.0"은 무엇인가요?
- OAuth 2.0은 제3자 애플리케이션이 사용자의 리소스에 접근할 수 있도록 인증 및 권한 부여를 처리하는 프로토콜입니다. `Access Token`을 발급하여 권한을 부여합니다.

## 66. API에서 "JWT (JSON Web Token)"은 무엇인가요?
- JWT는 사용자의 인증 정보를 안전하게 전달하는 JSON 기반의 토큰입니다. 서버는 이 토큰을 사용하여 클라이언트의 요청을 인증하고 권한을 검증합니다.

## 67. API에서 "Authorization"과 "Authentication"의 차이점은 무엇인가요?
- Authentication은 사용자가 누구인지를 확인하는 과정입니다.
- Authorization은 사용자가 특정 리소스나 작업을 수행할 권한이 있는지를 확인하는 과정입니다.

## 68. API에서 "PATCH"와 "PUT" 메소드의 차이점은 무엇인가요?
- `PATCH`는 리소스의 일부만 업데이트할 때 사용됩니다.
- `PUT`은 리소스를 전체적으로 업데이트하거나 새로운 리소스를 생성할 때 사용됩니다.

## 69. API에서 "HEAD" 메소드의 용도는 무엇인가요?
- `HEAD` 메소드는 `GET` 메소드와 유사하지만, 응답 본문을 제외한 헤더만을 반환합니다. 주로 리소스의 메타데이터를 확인할 때 사용됩니다.

## 70. API에서 "OPTIONS" 메소드의 역할은 무엇인가요?
- `OPTIONS` 메소드는 서버가 지원하는 HTTP 메소드와 관련된 정보를 반환합니다. 클라이언트가 특정 리소스에 대해 지원되는 메소드를 확인할 때 사용됩니다.

## 71. REST API에서 "Resource"란 무엇을 의미하나요?
- REST API에서 "Resource"는 서버에서 다루는 개체나 데이터를 의미합니다. 각 리소스는 고유한 URL을 통해 식별되며, HTTP 메소드를 통해 액세스됩니다.

## 72. API에서 "Rate Limiting"과 "Throttling"의 차이점은 무엇인가요?
- Rate Limiting은 일정 시간 동안 요청 횟수를 제한하여 과도한 요청을 방지하는 방식입니다.
- Throttling은 요청 속도를 제한하는 방식으로, 서버가 과부하 상태에 이를 수 있는 요청을 방지합니다.

## 73. API에서 "OpenAPI"란 무엇인가요?
- OpenAPI는 RESTful API를 설명하기 위한 명세서입니다. API의 엔드포인트, 요청 및 응답 형식 등을 문서화하는 데 사용됩니다.

## 74. API에서 "Swagger"란 무엇인가요?
- Swagger는 OpenAPI 스펙을 기반으로 한 API 문서화 도구입니다. 이를 통해 API를 디자인하고 테스트할 수 있으며, 인터랙티브한 문서도 제공합니다.

## 75. API에서 "API Gateway"가 하는 역할은 무엇인가요?
- API Gateway는 클라이언트의 요청을 받아서 적절한 서비스로 전달하고, 인증, 로깅, 라우팅, 트래픽 관리 등의 기능을 제공합니다. 마이크로서비스 아키텍처에서 중앙 집중식 관리 기능을 제공합니다.

## 76. API에서 "Webhook"과 "Polling"의 차이점은 무엇인가요?
- Webhook은 서버가 이벤트 발생 시 자동으로 클라이언트에 알림을 보내는 방식입니다.
- Polling은 클라이언트가 일정 주기로 서버에 상태를 확인하는 방식입니다.

## 77. REST API에서 "Idempotent"와 "Non-Idempotent" 메소드의 차이점은 무엇인가요?
- Idempotent는 같은 요청을 여러 번 보내도 결과가 동일한 메소드입니다. 예 `PUT`, `DELETE`.
- Non-Idempotent는 요청을 여러 번 보내면 결과가 달라질 수 있는 메소드입니다. 예 `POST`.

## 78. API에서 "OAuth 2.0"의 흐름을 설명해주세요.
- OAuth 2.0 흐름은 주로 `Authorization Code`, `Implicit`, `Client Credentials`, `Resource Owner Password Credentials` 흐름을 포함합니다. 각 흐름은 사용자의 인증을 통해 `Access Token`을 발급받고, 이를 통해 리소스에 접근합니다.

## 79. API에서 "RESTful"한 API 디자인의 특징은 무엇인가요?
- RESTful API는 리소스를 URL로 식별하고, HTTP 메소드를 사용하여 CRUD 작업을 수행합니다. 상태 비저장, 클라이언트-서버 구조, 캐시 가능성 등을 특징으로 합니다.

## 80. API에서 "API Versioning"을 하는 이유와 방법은 무엇인가요?
- API Versioning은 API의 변경으로 인해 기존 클라이언트가 영향을 받지 않도록 하기 위해 사용됩니다. URL, 헤더, 쿼리 파라미터 등을 통해 버전을 관리할 수 있습니다.

## 81. REST API에서 "Hypermedia"의 역할은 무엇인가요?
- Hypermedia는 API 응답에 다른 리소스나 동작을 연결할 수 있는 링크를 포함시켜, 클라이언트가 동적으로 리소스를 탐색할 수 있게 합니다.

## 82. API에서 "API Documentation"을 작성할 때 중요한 점은 무엇인가요?
- API 문서화는 API 사용자가 이해하기 쉽게 작성해야 합니다. 각 엔드포인트, 요청과 응답 예시, HTTP 상태 코드, 인증 방법 등을 명확히 작성해야 합니다.

## 83. API에서 "Basic Authentication"과 "Bearer Token Authentication"의 차이점은 무엇인가요?
- Basic Authentication은 사용자의 `username`과 `password`를 base64로 인코딩하여 인증하는 방식입니다.
- Bearer Token Authentication은 `Access Token`을 사용하여 인증하는 방식입니다.

## 84. API에서 "OAuth 2.0"과 "JWT"의 관계는 무엇인가요?
- OAuth 2.0은 인증 및 권한 부여 프로토콜이고, JWT는 OAuth 2.0 인증 과정에서 `Access Token`을 안전하게 전달하기 위한 형식입니다. JWT는 OAuth 2.0에서 자주 사용됩니다.

## 85. API에서 "JSON vs XML"의 차이점은 무엇인가요?
- JSON은 가볍고 읽기 쉬운 데이터 형식으로, 웹 API에서 자주 사용됩니다.
- XML은 더 복잡하고 구조적인 데이터를 표현할 수 있으며, 주로 SOAP API에서 사용됩니다.

## 86. REST API에서 "Stateless"란 무엇인가요?
- Stateless는 서버가 클라이언트의 상태를 유지하지 않는 특성입니다. 각 요청은 독립적으로 처리되며, 이전 요청의 상태 정보를 저장하지 않습니다.

## 87. API에서 "Access Control"이란 무엇인가요?
- Access Control은 사용자나 시스템이 리소스에 접근할 수 있는 권한을 설정하는 과정입니다. 인증과 권한 부여가 포함됩니다.

## 88. API에서 "SLA (Service Level Agreement)"이란 무엇인가요?
- SLA는 서비스 제공자가 제공할 서비스의 품질, 가용성, 응답 시간 등을 정의한 계약입니다. API 서비스의 성능 지표를 명시합니다.

## 89. API에서 "Request Timeout"을 처리하는 방법은 무엇인가요?
- 서버는 일정 시간이 지나도 응답이 없으면 클라이언트에게 `408 Request Timeout` 상태 코드를 반환합니다. 클라이언트는 요청을 재시도하거나, 타임아웃을 적절히 처리해야 합니다.

## 90. API에서 "Data Validation"이란 무엇인가요?
- Data Validation은 클라이언트에서 보낸 데이터를 서버에서 검증하는 과정입니다. 형식, 길이, 필수 항목 등을 검사하여 유효성을 확인합니다.

## 91. API에서 "Rate Limiting"을 설정할 때 고려해야 할 사항은 무엇인가요?
- Rate Limiting을 설정할 때, 요청을 제한할 기준 (IP 주소, API 키 등)과 시간 간격 (예 분당 1000회)을 설정하고, 이를 관리할 방법을 고려해야 합니다.

## 92. API에서 "API Gateway"를 사용해야 하는 이유는 무엇인가요?
- API Gateway는 여러 마이크로서비스를 관리하고, 인증, 로깅, 트래픽 관리 등의 기능을 중앙에서 처리합니다. 이를 통해 마이크로서비스 아키텍처를 단순화하고 관리하기 쉽게 만듭니다.

## 93. API에서 "Service-Oriented Architecture (SOA)"와 "Microservices Architecture"의 차이점은 무엇인가요?
- SOA는 대규모 시스템을 여러 서비스로 나누고, 각 서비스가 서로 통신하는 방식입니다.
- Microservices는 더 작은 단위의 독립적인 서비스로 시스템을 나누어, 각 서비스가 독립적으로 배포되고 관리될 수 있도록 합니다.

## 94. API에서 "RESTful API"의 장점은 무엇인가요?
- RESTful API는 간결하고 이해하기 쉬운 구조를 제공합니다. 또한 HTTP 표준을 따르며, 상태 비저장성, 확장성, 캐시 가능성을 지원합니다.

## 95. API에서 "Authentication"을 처리하는 방법은 무엇인가요?
- 인증은 보통 `API Key`, `Basic Authentication`, `OAuth 2.0`, `JWT` 등을 사용하여 처리됩니다. 각 방식은 보안 수준과 사용 용도에 따라 다릅니다.

## 96. API에서 "SOAP"과 "REST"의 차이점은 무엇인가요?
- SOAP은 XML을 사용하고, 메시지 프로토콜을 통해 데이터를 주고받는 방식입니다.
- REST는 HTTP를 기반으로 한 아키텍처로, 더 가볍고 유연하게 데이터를 전송할 수 있습니다.

## 97. API에서 "Retry Mechanism"이란 무엇인가요?
- Retry Mechanism은 네트워크 오류나 서버 장애가 발생할 경우, 요청을 재시도하는 메커니즘입니다. 지수 백오프(Exponential Backoff) 기법 등을 사용하여 재시도 간격을 늘릴 수 있습니다.

## 98. API에서 "Stateful vs Stateless"의 장단점은 무엇인가요?
- Stateless는 확장성이 좋고, 서버의 부담을 줄일 수 있습니다. 그러나 클라이언트에서 상태를 관리해야 합니다.
- Stateful은 서버에서 상태를 관리하므로 클라이언트가 부담을 줄 수 있지만, 확장성이 떨어지고 서버의 부담이 증가할 수 있습니다.

## 99. API에서 "Session"을 사용하는 이유는 무엇인가요?
- Session은 사용자의 상태를 서버에 저장하여, 로그인 상태를 유지하거나 사용자 정보를 추적하는 데 사용됩니다. 주로 쿠키를 통해 클라이언트와 연결됩니다.

## 100. API에서 "Backoff Strategy"란 무엇인가요?
- Backoff Strategy는 서버가 과도한 요청을 처리할 수 없을 때, 요청을 지연시키는 방법입니다. `Exponential Backoff`는 지수적으로 지연 시간을 증가시키는 방식입니다.
