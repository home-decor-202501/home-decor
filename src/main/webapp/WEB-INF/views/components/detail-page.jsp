<%-- src/main/webapp/WEB-INF/views/components/detail-page.jsp --%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>

  <%--  CSS--%>
  <link rel="stylesheet" href="/css/reset.css">
  <link rel="stylesheet" href="/css/navigation.css">
  <link rel="stylesheet" href="/css/categoryList.css">
  <link rel="stylesheet" href="/css/detail-page.css">

  <!-- JS -->
  <script type="module" src="/js/components/navigation.js" defer></script>
  <script type="module" src="/js/components/detail-page.js" defer></script>

</head>
<body>

  <%@ include file="navigation.jsp" %> <!-- 네비게이션 섹션 (로그인,글쓰기) -->
  <%@ include file="categoryList.jsp" %> <!-- 카테고리 섹션 (집사진) -->

<!-- Post detail -->
<div class="post-container" id="post-container">
  <div class="post-item">
    <!-- 게시물 이미지 및 내용 -->
    <div class="post-img-container">
    </div>
    <div class="post-contents">내 방이야</div>
    <!-- 날짜, 좋아요, 조회수 -->
    <div class="post-info">
      <div class="post-time"></div>
      <div class="like-count">좋아요 <span class="like-count"></span></div>
      <div class="view-count">조회 <span class="view-count"></span></div>

    </div>
    <!-- 프로필 영역 -->
    <div class="author-profile">
      <div class="author-profile-img">
      </div>
      <div class="author-info">
        <div class="author-nickname"></div>
      </div>
    </div>

    <!-- 댓글 영역 -->
    <div class="comment-section">
      <!-- 댓글 수 -->
      <div class="comment-counter">
        댓글 0
        <span class="comment-count"></span>
      </div>

      <!-- 댓글 입력 영역 -->
      <div class="comment-box">
        <div class="comment-profile">
          <div class="my-profile">
          </div>
        </div>
        <!-- 댓글 입력창 -->
        <div class="comment-input-container">
          <input type="text" class="comment-input" placeholder="댓글을 입력하세요">
          <button class="comment-submit-button">입력</button>
        </div>
      </div>
    </div>
  </div>

  <%--  고정바 (좋아요 클릭, 댓글 바로가기)--%>
  <div class="sticky-section">
    <button class="action-button like-button">
      <i class="fa-regular fa-heart like-icon"></i>
      <span class="like-count"></span>
    </button>
    <button class="action-button comment-button">
      <i class="fa-regular fa-comment"></i>
      <span class="comment-count">0</span>
    </button>
  </div>

</div>

