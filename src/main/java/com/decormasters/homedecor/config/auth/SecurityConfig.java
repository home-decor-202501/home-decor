package com.decormasters.homedecor.config.auth;

import com.decormasters.homedecor.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.security.config.Customizer.withDefaults;

// WebSeucirty에 대한 Configuration 파일이다.
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // csrf : A 사이트에 방문했던 사용자가 스팸사이트에 방문했을 때, 스팸사이트에서 A 사이트에 사용자의 브라우저 쿠기를 가지고 악의적인 요청을 보냄
            .csrf(AbstractHttpConfigurer::disable)
            .cors(withDefaults())
            // cors : CORS 설정은 다른 사이트에서 API를 요청할 때, 그 요청을 허용할지 말지를 결정하는 설정 (프로젝트 발표를 위에 아래에 별도 설정하였음)
//            .cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configure(http))
            // 세션 인증을 비활성화
            .sessionManagement(
                    httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            // api 별 접근 권한 설정
            .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry ->
                    authorizationManagerRequestMatcherRegistry
                            // 테스트용 : main 페이지는 로그인 후에만 사용 가능
//                            .requestMatchers("/").authenticated()
                            .anyRequest().permitAll()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            // 시큐리티 기본 인증인가차단의 상태코드는 403으로 지정되어 있음
            // 그런데 403은 인가차단이지 인증차단코드가 아님, 인증차단은 401로 해야 적합함
            .exceptionHandling(httpSecurityExceptionHandlingConfigurer
                    -> httpSecurityExceptionHandlingConfigurer.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
            );


        return http.build();


    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*"); // 모든 도메인 허용
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }





}
