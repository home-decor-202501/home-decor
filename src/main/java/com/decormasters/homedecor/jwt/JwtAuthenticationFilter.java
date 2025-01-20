package com.decormasters.homedecor.jwt;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

// @Component 등록
@Component
@Slf4j
@RequiredArgsConstructor
// 라우팅 된 페이지에서 혹은 api 요청에서 token 값을 찾아와서, token 유효성을 검사하는 클래스
// OncePerRequestFilter를 상속받는 클래스를 만들어서, doFilterInternal 메소드 오버라이드
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // 유효성 검사 메소드는 JwtProvider에 있음
    private final JwtProvider jwtProvider;

    // 1. 토큰 유효성 검사를 하려면 먼저 토큰을 가져와야 되는데,
    //    토큰을 저장된 위치가 api 요청이냐, 페이지 라우팅이냐에 따라 다름(api는 보통 fetch header에, 페이지 라우팅은 보통 쿠키에)
    //    -> 따라서, 일단 api 요청인지 여부부터 확인
    // 토근 검사 -> 페이지는 쿠키, 어는 너
    public boolean isApiRequest(HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        return requestURI.startsWith("/api");
    }

    // 2. api 요청이냐, 페이지 라우팅이냐에 따른 token 구하는 방법 구현
    //  2-1) api 요청인 경우 : fetch 시에 headers의 authorization으로 보냄(bearer token 어쩌구저쩌구의 형태)
    public String resolveTokenFromHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        } else {
            return null;
        }
    }

    // 2. api 요청이냐, 페이지 라우팅이냐에 따른 token 구하는 방법 구현
    //  2-2) 페이지 라우팅인 경우 : 쿠키에 저장해서 보냄 -> Cookie[]을 getCookie()로 받아온 후 -> Arrays.stream()으로 배열 스트림으로 바꿔준 후
    //                            -> 이름이 accessToken인 토큰의 value을 가져오면 됨
    public String resolveTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() != null) {
            // 쿠키 가져오기
            Cookie[] cookies = request.getCookies();
            // Cookie[]을 array stream()으로 변환(filter 등 쓰기 위해)
            String token = Arrays
                    .stream(cookies)
                    // 쿠키 중 key name 이 accesstoken인 것 찾아서
                    .filter(cookie -> "accessToken".equals(cookie.getName()))
                    .findFirst()
                    // acessToken 쿠키의 value를 가져오기
                    .map(cookie -> cookie.getValue())
                    .orElse(null);
            return token;
        }
        return null;
    }

    // 3. 토큰 검사하고,  통과하면 Spring WebSecurity한테 이 사람은 인증 해주라고 알려주기(
    private void validateAndAuthenticate(String token) {

        log.debug("parsed token: {}", token);

        // 토큰이 존재하고, 유효성 검증에 통과하면 인증 처리
        if (StringUtils.hasText(token) && jwtProvider.validateToken(token)) {
            // - 인증처리 하는 법 : UsernamePasswordAuthenticationToken 객체에 username을 담아 생성후,SecurityContextHolder에 저장해줌
            Authentication authentication
                    = new UsernamePasswordAuthenticationToken(jwtProvider.getCurrentLoginUsername(token), null, new ArrayList<>());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }

    // 오버라이드해서, 자동으로 구현할 내용 적기
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 사용자가 전달한 토큰을 가져와야 함.
        String token;
        if (isApiRequest(request)) {
            // 요청헤더에 토큰을 들고다니는 경우 - API요청
            token = resolveTokenFromHeader(request);
        } else {
            // 쿠키에 토큰을 들고다니는 경우 - 라우팅 요청
            token = resolveTokenFromCookie(request);
        }

        // 토큰 유효성 검증 및 토큰이 유효하다면 스프링에게 유효하다는 정보를 전달
        validateAndAuthenticate(token);

        // 다음 필터로 넘어가기
        filterChain.doFilter(request, response);

    }
}

