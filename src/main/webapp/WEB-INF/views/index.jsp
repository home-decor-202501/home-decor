<%-- src/main/webapp/WEB-INF/views/index.jsp --%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Homedecor Clone</title>

  <!-- Modular CSS -->
  <link rel="stylesheet" href="/css/main.css">


  <!-- Modular JS -->
  <script src="/js/components/main.js" type="module" defer></script>
</head>
<body>
<div class="container">
  <main class="feed">

    <!-- Posts Section -->
    <%@ include file="components/main.jsp" %> <!-- 게시물 피드 섹션 -->

    <%@ include file="components/create-post-modal.jsp" %> <!-- 모달 섹션 -->

  </main>

</div>
</body>
</html>