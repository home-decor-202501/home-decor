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
    <script type="module" src="/js/auth/signup.js" defer></script>
    <title>회원가입</title>

</head>

<body>
<%-- 로고 컨테이너--%>
<div class="logo-container">
    <a class="link-to-main-page" href="/">
        <img src="/images/logo.png" alt="logo">
    </a>
</div>
<%-- 회원가입 폼 컨테이너--%>
<div class="container">
    <div class="form-container">
        <form id="form" class="form">
            <h2>회원가입</h2>
            <!-- 프로필 사진 업로드 섹션 추가 -->
            <div class="profile-pic-wrapper">
                <div class="pic-holder">
                    <img id="profilePic" class="pic" src="https://mblogthumb-phinf.pstatic.net/MjAxODA3MjZfMTU4/MDAxNTMyNjA3MDM2MzAw.AzxMf2NTlUd7A_5yXzeqh66atVjcbSn5Fb8xSswIXpcg.yNGnPCr22Xk3VqCS4PYNRq1TSbhEU07cW7jEXh-ZUN8g.JPEG.anjh7789/2p0RvW.jpg?type=w800">
                    <input class="upload-profile-input" type="file" name="profile_pic" id="newProfilePhoto" accept="image/*" style="opacity: 0;" />
                    <label for="newProfilePhoto" class="upload-file-block">
                        <div class="text-center">
                            <div class="mb-2">
                                <i class="fa fa-camera fa-2x"></i>
                            </div>
                            <div class="text-uppercase">
                                Update <br /> Profile Photo
                            </div>
                        </div>
                    </label>
                </div>
                <p class="text-info">프로필 사진을 설정하세요.</p>
            </div>

            <%--  form: 이메일 --%>
            <div class="form-control">
                <label for='email'>이메일</label>
                <input type="text" id="email" placeholder="이메일">
                <small>Error message</small><a href="/login" class="link-to-login-page">로그인</a>
            </div>
            <%--  form: 닉네임 --%>
            <div class="form-control">
                <label for='username'>닉네임</label>
                <p class="text-info">2~10자(영문자, 한글, 언더바(_) 및 하이픈(-) 사용 가능)</p>
                <input type="text" id="username" placeholder="닉네임">
                <small>Error message</small>
            </div>
            <%-- form: 비밀번호 --%>
            <div class="form-control">
                <label for='password2'>비밀번호</label>
                <p class="text-info">8글자 이상(영문 및 숫자 포함 필수, 특수문자는 !, @, #만 사용 가능)</p>
                <input type="password" id="password2" placeholder="비밀번호">
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

                <!--          비밀전호 조건 끝          -->

            </div>
            <button class ='sign-up-btn'>Submit</button>
            <div class="link-to-login-page">
                <span>이미 아이디가 있으신가요?</span><a href="/login">로그인</a>
            </div>
        </form>
    </div>


</div>
<script src="script.js"></script>
</body>

</html>