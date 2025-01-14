<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <%-- font-awesome--%>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/auth/pages/signup.css">

    <%--yup--%>
<%--    <script src="https://cdn.jsdelivr.net/npm/yup@1.6.1/index.min.js"></script>--%>
    <script type="module" src="/js/auth/signup.js" defer></script>
    <title>회원가입</title>

</head>

<body>
<div class="main">
    <%-- 로고 컨테이너--%>
    <div class="logo-container">
        <a class="link-to-main-page" href="/">
            <img src="/images/logo.png" alt="logo">
        </a>
    </div>
    <%-- 회원가입 폼 컨테이너--%>
    <div class="container">
        <div class="form-container">
            <form id="form" class="form" method="post">
                <h2>회원가입</h2>
                <!-- 프로필 사진 업로드 섹션 추가 -->
                <div class="profile-pic-wrapper">
                    <%-- profile 사진 선택 시 preview --%>
                    <div class="pic-holder">
                        <img class="pic-preview">
<%--                        <img class="pic-preview" style="display: none;">--%>
                        <%-- 파일 선택 버튼: opacity 0 --%>
                        <input class="upload-profile-input" type="file" name="profile-image" id="newProfilePhoto"
                               accept="image/*" style="opacity: 0">
                        <label for="newProfilePhoto" class="upload-file-block">
                            <div class="text-center">
                                <div class="mb-2">
                                    <i class="fa fa-camera fa-2x"></i>
                                </div>
                                <div class="text-uppercase">
                                    사진 업로드
                                </div>
                            </div>
                        </label>
                    </div>
                    <p class="text-info">프로필 사진을 설정하세요.</p>
                </div>

                <%--  form: 이메일 --%>
                <div class="form-control">
                    <label for='email'>이메일</label>
                    <input type="text" id="email" placeholder="이메일" name="email">
                    <small>Error message</small><a href="/login" class="link-to-login-page">로그인</a>
                </div>
                <%--  form: 닉네임 --%>
                <div class="form-control">
                    <label for='nickname'>닉네임</label>
                    <p class="text-info">2~10자(영문자, 한글, 언더바(_) 및 하이픈(-) 사용 가능)</p>
                    <input type="text" id="nickname" placeholder="닉네임" name="nickname">
                    <small>Error message</small>
                </div>
                <%-- form: 비밀번호 --%>
                <div class="form-control">
                    <label for='password2'>비밀번호</label>
                    <p class="text-info">8글자 이상(영문 및 숫자 포함 필수, 특수문자는 !, @, #만 사용 가능)</p>
                    <input type="password" id="password2" placeholder="비밀번호" name="password">
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
                            <span class="password-not-include">영문, 숫자, !, @, # 외 문자 금지</span>
                        </li>
                    </ul>
                    </small>
                </div>
                <button class='sign-up-btn'>회원가입</button>
                <div class="link-to-login-page">
                    <span>이미 아이디가 있으신가요?</span><a href="/login">로그인</a>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- 회원가입 성공 메시지 모달 -->
<div class="success-modal" class="modal" style="display:none">
    <div class="modal-content">
        <span id="close-modal" class="close">&times;</span>
        <p>회원가입에 성공하였습니다!</p>
        <p>3초 후 로그인 페이지로 이동합니다.</p>
    </div>
</div>



</body>

</html>



