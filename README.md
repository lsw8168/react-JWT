# react-JWT
리엑트 JWT 개발하기

## 어떻게?
- JSON Web Token 방식으로 개발

## 세부정보 
* `JSON Web Token`의 약자로 여러 가지 토큰의 방식 중의 하나이다. `OAuth` 토큰으로도 사용할 수 있어 종종 혼동된다.
 * JWT를 OAuth의 토큰으로 사용할 순 있지만 JWT를 사용한다고 해서 OAuth를 적용하는 것은 아니다.
 * JWT는 토큰의 종류 중 '구조화된 토큰'이다. '구조화된 토큰'이란 DB에서 토큰에 대응하는 정보를 찾는 게 아닌 토큰 안에 필요한 정보가 모두 담겨 있는 것을 말한다. 즉, `stateless`가 가능하다. 그래서 `REST API`와 같이 잘 쓰인다.
 * JWT는 2~3개의 JSON 형태를 `.`으로 구분한 문자열들로 구성되는데, `Header`, `Payload`, `Signature(Optional)`이다.
 * Signature가 선택적인데, Sigature는 서명 정보를 담는 부분이며 없을 시에 변조를 막을 수 없어 사실상 필수이다.
 * JWT는 signature 부분을 제외한 곳을 base64로 암호화/복호화하게 되는데 이는 URL, HTTP 헤더의 제한된 문자집합 때문이다.
 * 또한 base64로 복호화한다면 누구나 토큰의 내용을 알 수 있다. (물론, HTTPS를 적용하면 '누구나'는 서버와 클라이언트 뿐이겠지만)
 * JWT의 서명과 암호화를 담당하는 부분을 `JOSE(JSON Object Signing and Encryption)`이라고 하는데, 각각은 `JWS`, `JWE`, `JWK`로 나뉜다. 이 부분은 간단하게 정리할 수 있지만 너무 길어져서 다른 글에 정리하도록 하겠다.
 * JWT에는 `claim`이라는 개념이 있다. JWT의 `payload`에 담기는 key를 claim이라고 하는데, `등록된 클레임`, `공개 클레임`, `비공개 클레임`으로 구분된다. 등록된 클레임은 `IANA`에 등록된 이름으로, 표준 속성이라고 생각하면 되고, 공개 클레임은 미리 정의된 이름으로 충돌을 피하는 것이 권고되는 이름이다. 비공개 클레임은 사용자 입장에서 마음대로 정의하고 사용하는 claim을 뜻한다.
 * 사용 시 주의사항: Traffic에 영향을 미치므로 짧아야 좋고, TLS는 사실상 필수이다. 사용자 본인 대상으로도 보안이 필요하면 `JWE`를 사용하면 되고, OAuth를 따라 `Resource Server`, `Authentication Server`로 나뉘는 경우 서명(`JWS`) 방식을 `RSA256` 등의 비대칭키로 가져가는 것이 좋다.

## JWT Lifectcle
* JWT는 만료시간이 있고, Refresh 과정이 있기 때문에 그 Lifecycle이 조금 복잡하다.
* 크게 접속 시 검증과 요청 전 검증으로 나뉘고, 공통적으로 Refresh 과정을 거치게 된다.
* 접속 시 검증 시나리오
  - 사용자가 접속한다.
    + 기존에 토큰이 있는 경우
      1. Access Token의 만료기간을 확인한다.
        1. 만료되지 않은 경우, END
        2. 만료된 경우, REFRESH
      2. 기존에 토큰이 없는 경우
        1. LOGIN
        2. 로그인 성공 시 Access Token과 Refresh Token을 서버로부터 받고 사용한다.
* 요청 전 검증 시나리오
  - API 요청을 날리게 될 때 Access Token을 사용하게 된다.
  - 요청 전, Access Token의 만료 여부를 확인한다.
    + Access Token이 만료되지 않은 경우
      1. 만료되지 않은 경우, END
      2. 만료된 경우, REFRESH
    + 정상적인 Access Token으로 API 요청을 수행한다.
* Refresh 과정
  - Refresh Token으로 Access Token을 재발행 요청한다.
    + Refresh Token이 만료된 경우, LOGOUT
    + 만료되지 않은 경우, 정상 Access Token을 저장한다. END
