<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="module" src="/js/components/login-redirect.js" defer></script>
<script type="module" src="/js/components/check-login-or-not.js" defer></script>
<script type="module" src="/js/components/navigation.js" defer></script>
<nav class="navigation">
  <div class="logo">
    <!-- 로고 이미지 -->
    <a href="/"><img src="/images/logo.png" alt="오늘의집 로고"></a>
  </div>

  <nav class="nav">
    <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png" class="current-user" alt="기본 프로필 사진">
    <a href="/login" class="login">로그인</a>
    <a href="#">홈</a>
    <a href="#">커뮤니티</a>
    <a href="#">집들이</a>
    <a href="#" id="write-button">글쓰기</a>
  </nav>
</nav>