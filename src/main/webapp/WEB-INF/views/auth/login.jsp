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
            <form id="form" class="form">
                <%--  form: 이메일 --%>
                <div class="form-control">
                    <label for='email'>이메일</label>
                    <div class="nickname input-and-tooltip-wrapper">
                        <input type="text" id="email" placeholder="이메일" name="email">
                    </div>
                    <small>없는 아이디입니다.</small><a href="/login" class="link-to-signup-page" style="display: inline;">간편 회원가입</a>
                </div>
                <%-- form: 비밀번호 --%>
                <div class="form-control">
                    <label for="password">비밀번호</label>
                    <div class="password-wrapper">
                        <div class="nickname input-and-tooltip-wrapper">
                            <input type="password" id="password" placeholder="비밀번호" name="password">
                        </div>
                        <i class="fa-solid fa-lock toggle-password"></i>
                    </div>
                    <small>틀린 비밀번호입니다. (비밀번호 : 영문, 숫자를 포함한 8자리 글자) </small>
                </div>

                <button class='login-btn'>로그인</button>

                <div class="link-to-signup-page">
                    <span>회원이 아니신가요?</span><a href="/sign-up">간편 회원가입</a>
                </div>
            </form>
        </div>
    </div>
</div>


</body>

</html>



