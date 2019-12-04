# react-JWT
react jwt

## JWT Lifectcle
- JWT는 만료시간이 있고, Refresh 과정이 있기 때문에 그 Lifecycle이 조금 복잡하다.
- 크게 접속 시 검증과 요청 전 검증으로 나뉘고, 공통적으로 Refresh 과정을 거치게 된다.
- 접속 시 검증 시나리오
  - 사용자가 접속한다.
    - 기존에 토큰이 있는 경우
      - Access Token의 만료기간을 확인한다.
        - 만료되지 않은 경우, END
        - 만료된 경우, REFRESH
      - 기존에 토큰이 없는 경우
        - LOGIN
        - 로그인 성공 시 Access Token과 Refresh Token을 서버로부터 받고 사용한다.
