<%-- src/main/webapp/WEB-INF/views/components/detail-page.jsp --%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

-- TODO : 공통 헤더영역 분리

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>00님의 게시물</title>

  <!-- Font Awesome 아이콘 라이브러리 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

  <!-- External CSS 파일 링크 -->
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
<!-- Header -->
<header class="header">
  <div class="logo">
    <!-- 로고 이미지 -->
    <img src="/images/logo.png" alt="오늘의집 로고">
  </div>
  <nav class="nav">
    <a href="/login">로그인</a>
    <a href="#">홈</a>
    <a href="#">커뮤니티</a>
    <a href="#">집들이</a>
    <a href="#" id="write-button">글쓰기</a>
  </nav>
</header>

<!-- Filter Container -->
<div class="filter-container">
  <div class="title-container">
    <span>집사진</span>
    <span>추천</span>
    <span>#채널</span>
    <span>3D인테리어</span>
    <span>반려동물</span>
    <span>육아</span>
    <span>홈스토랑</span>
    <span>플랜테니어어</span>
    <span>콜렉터블</span>
    <span>캠핑핑</span>
    <span>이벤트</span>
  </div>
  <div class="sort-options">
    <label for="sort-option">정렬:</label>
    <select id="sort-option" onchange="applySort()">
      <option value="popularity">인기순</option>
      <option value="latest">최신순</option>
    </select>
  </div>
</div>

<!-- Post detail -->
<div class="feed-container" id="feed-container">
  <div class="feed-item">
    <div class="feed-profile">
      <img src="" alt="프로필 이미지">
      <div class="profile-info">
        <div class="profile-name">bebeyul</div>
      </div>
      <a class="follow-button" href="#">팔로우</a>
    </div>
    <img src="/images/LivingRoom.jpeg" alt="거실 이미지">
    <div class="feed-title">
      <span>모던한 거실 인테리어</span>
      <div class="like-section">
        <i class="fa fa-heart like-icon"></i>
        <span>26</span>
      </div>
    </div>
    <div class="feed-details">심플하고 깔끔한 분위기의 거실</div>
  </div>
</div>

