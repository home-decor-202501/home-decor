<%-- src/main/webapp/WEB-INF/views/index.jsp --%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Homedecor Clone</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

  <!-- Modular CSS -->
  <link rel="stylesheet" href="/css/main.css">
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