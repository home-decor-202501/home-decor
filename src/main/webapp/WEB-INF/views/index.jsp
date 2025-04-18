<%-- src/main/webapp/WEB-INF/views/index.jsp --%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>오늘의 집</title>

  <!-- Modular CSS -->
  <link rel="stylesheet" href="/css/reset.css">
  <link rel="stylesheet" href="/css/navigation.css">
  <link rel="stylesheet" href="/css/categoryList.css">
  <link rel="stylesheet" href="/css/feed.css">
  <link rel="stylesheet" href="/css/post.css">
  <link rel="stylesheet" href="/css/modal.css">

  <!-- Modular JS -->
  <script src="/js/index.js" type="module" defer></script>
</head>

<body>
<div class="container">

  <%@ include file="components/navigation.jsp" %> <!-- 네비게이션 섹션 (로그인,글쓰기) -->
  <%@ include file="components/categoryList.jsp" %> <!-- 카테고리 섹션 (집사진) -->

  <main class="feed">
    <!-- Posts Section -->
    <%@ include file="components/post.jsp" %> <!-- 게시물 피드 섹션 -->

    <div id="loading-indicator" style="text-align: center; padding: 20px; display: none;">
      <span>Loading...</span>
    </div>

  </main>

  <%@ include file="components/create-post-modal.jsp" %> <!-- 모달 섹션 -->
</div>
</body>
</html>