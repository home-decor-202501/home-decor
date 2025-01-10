<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/auth/pages/signup.css">
    <script type="module" src="/js/auth/signup.js" defer></script>
    <title>로그인 페이지</title>

</head>

<body>
<div class="container">
    <div class="logo-container">
        <a class="link-to-main-page" href="/">
            <img src="data:image/png;base64,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" alt="Example Image">

        </a>

    </div>
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
                <p class="text-info text-center small">프로필 사진을 설정하세요.</p>
            </div>

            <!-- 프로필 사진 업로드 섹션 끝 -->
            <div class="form-control">
                <label for='username'>Username</label>
                <input type="text" id="username" placeholder="Enter username">
                <small>Error message</small>
            </div>
            <div class="form-control">
                <label for='email'>Email</label>
                <input type="text" id="email" placeholder="Enter email">
                <small>Error message</small>
            </div>

            <div class="form-control">
                <label for='password2'>비밀번호(비밀번호 조건~~~입니다)</label>
                <input type="password" id="password2" placeholder="Enter password again ">
                <small>Error message</small>
                <small class="password-field-desc">password must have atleast
                    <ul class>
                        <li>
                            <img src="https://example.com/min-length-check.png" alt="Minimum length check" width="100" title="check-circle">
                            <span>8 characters</span>
                        </li>
                        <li>
                            <img src="https://example.com/numeric-char-check.png" alt="Numeric character check" width="100" title="check-circle">
                            <span>1 numerical character</span>
                        </li>
                        <li>
                            <img src="https://example.com/uppercase-char-check.png" alt="Uppercase character check" width="100" title="check-circle">
                            <span>1 uppercase letter</span>
                        </li>
                        <li>
                            <img src="https://example.com/special-char-check.png" alt="Special character check" width="100" title="check-circle">
                            <span class="uline" title="e.g. !@#$%^&?*">1 special character</span>
                        </li>
                    </ul>
                </small>

                <!--          비밀전호 조건 끝          -->

            </div>
            <button class ='sign-up-btn'>Submit</button>
        </form>
    </div>


</div>
<script src="script.js"></script>
</body>

</html>