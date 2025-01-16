<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <%-- font-awesome--%>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/auth/pages/login.css">
    <script type="module" src="/js/auth/login.js" defer></script>
    <title>로그인</title>

</head>

<body>
<div class="main">
    <%-- 로고 컨테이너--%>
    <div class="logo-container">
        <a class="link-to-main-page" href="/">
            <img src="/images/logo.png" alt="logo">
        </a>
    </div>
    <div class="container">
    <%-- 회원가입 폼 컨테이너--%>
        <div class="form-container">
            <form id="form" class="form" method="post">
                <h2>로그인</h2>
                <%--  form: 이메일 --%>
                <div class="form-control">
                    <label for='email'>이메일</label>
                    <input type="text" id="email" placeholder="이메일" name="email">
                    <small>Error message</small><a href="/login" class="link-to-login-page">로그인</a>
                </div>
                <%-- form: 비밀번호 --%>
                <div class="form-control">
                    <label for="password">비밀번호</label>
                    <p class="text-info">8글자 이상(영문 및 숫자 포함 필수, 특수문자는 !, @, #만 사용 가능)</p>
                    <div class="password-wrapper">
                        <input type="password" id="password" placeholder="비밀번호" name="password">
                        <i class="fa-solid fa-lock toggle-password"></i>
                    </div>

                    <ul class="password-field-desc">
                        <li>
                            <i class="fa-regular fa-circle-check password-length"></i>
                            <span class="password-length">8글자 이상</span>
                        </li>
                        <li>
                            <i class="fa-regular fa-circle-check password-include-number"></i>
                            <span class="password-include-number">숫자 포함</span>
                        </li>
                        <li>
                            <i class="fa-regular fa-circle-check password-include-alphabet"></i>
                            <span class="password-include-alphabet">영문자 포함</span>
                        </li>
                        <li>
                            <i class="fa-regular fa-circle-check password-not-include"></i>
                            <span class="password-not-include">영문, 숫자, !, @, # 만 허용(공백 및 이외 특수문자 불가)</span>
                        </li>
                    </ul>
                    </small>
                </div>
                <button class='sign-up-btn'>회원가입</button>
                <div class="link-to-login-page">
                    <span>회원이 아니신가요?</span><a href="/sign-up">간편 회원가입</a>
                </div>
            </form>
        </div>
    </div>
</div>


</body>

</html>



