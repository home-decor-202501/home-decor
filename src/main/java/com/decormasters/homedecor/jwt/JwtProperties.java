package com.decormasters.homedecor.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
// 설정하는 파일이다. (자동 빈 등록)
@Configuration
// COnfiguraiton 어노테이션을 붙인 이 클래스에 있는 필드의 값들은, application.properties 에 있는 설정 값을 사용하겠다.
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    private String secretKey;
    private long accessTokenValidityTime;
    private long refreshTokenValidityTime;

}
