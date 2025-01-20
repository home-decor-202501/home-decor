package com.decormasters.homedecor.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

// Spring아, 니가 관리해
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtProvider {

    // token을 만드는 데 필요한 값 중 secret Key, access/refresh token validity time은 보안을 위해 별도로 jwtProperties 클래스에 저장해 두었움
    private final JwtProperties jwtProperties;

    // secretKey의 경우, JwtProperties 클래스에서는 32바이트짜리 랜덤난수를 생성한 후에 이를 Base64로 '인코딩'한 후 변수에 저장했는데,
    // 근데 이는 키의 보안성과 인코딩된 키 전송 시의 데이터 손상 시 전송 오류 방지용이었음
    // 그래서 이 클래스에서 secret Key를 다시 디코딩하여 쓸 것임
    private SecretKey secretKey;
    @PostConstruct
    public void init() {

        this.secretKey = Keys.hmacShaKeyFor(
                Decoders.BASE64.decode(jwtProperties.getSecretKey()));
    }

    /**
     * access 토근 발행 함수
     * @Param userEmail (token의 subject 값 : 사용자를 고유하게 식별할 수 있는 값)
     * @return
     */
    public String generateAccessToken(String userEmail) {
        return generateToken(userEmail, jwtProperties.getAccessTokenValidityTime());
    }

    public String generateRefreshToken(String userEmail) {
        return generateToken(userEmail, jwtProperties.getRefreshTokenValidityTime());
    }

    public String generateToken(String userEmail, long validityInMilliseconds) {

        // token 구성 중 issuedAt의 인자를 Date 타입으로 줘야 하므로, new Date()로 값 저장해두었음
        Date now = new Date();

        // token 구성 중 validity time을 Date 형태로 줘야 하므로, Date 형재로 변환해서 만들어놓았음
        // - new Date() + miliseconds는 오류가 나기 때문에, 현재 날짜및 시간 정보를 miliseconds로 변환한 now.getTime()과 validity time(ms)를 합한 후, date 객체로 변환해주었음
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
        .setIssuer("home_decor")
        .setIssuedAt(now)
        .setSubject(userEmail) // 사용자 고유 식별값
        .setExpiration(validity)
        .signWith(secretKey)
        .compact();
    }

    // # 암호화된 토큰을 다시 decode 하여 body(=claims)을 반환하는 함수
    // # parse 과정에서, token 유효기한이 만료되었거나 secret key 가 위조된 token이 있을 경우 exception을 발생시켜줌
    public Claims parseClaims(String token) {
        // JWT Parser를 생성해서 -> secretKey로 열리는지 확인해서, 열리면 build를 한 후에
        // -> token의 바디인 Claims를 parse에서 body를 가져와라
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
    }

    // # 토큰에 대해서 단순히 실제로 유효한 토큰인지(유효기간, secret Key 일치여부)만 확인해주는 함수
    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("invalid token: {}", e.getMessage(), e);
            return false;
        }
    }

    /**
     * 검증된 토큰에서 사용자이름을 추출하는 메서드
     * @param token - 인증 토큰
     * @return 토큰에서 추출한 사용자 이름
     */
    public String getCurrentLoginUsername(String token) {
        return parseClaims(token).getSubject();
    }


}
