<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- Feed Container -->
<div class="feed-container" id="feed-container">

  <c:forEach begin="1" end="18">
  <div class="feed-item">

    <div class="feed-profile">
      <img src="#" alt="프로필 이미지">
      <div class="profile-info">
        <a href="#" class="profile-name">bebeyul</a>
      </div>
      <a class="follow-button" href="#">팔로우</a>
    </div>

    <img src="https://png.pngtree.com/background/20230527/original/pngtree-white-modern-living-room-with-a-chandelier-picture-image_2767824.jpg"
         alt="거실 이미지">

    <div class="feed-title">
      <span>모던한 거실 인테리어</span>
      <div class="like-section">
        <i class="fa fa-heart like-icon"></i>
        <span>26</span>
      </div>
    </div>
    <div class="feed-details">심플하고 깔끔한 분위기의 거실</div>
  </div>


<%--    <!-- Post Images -->--%>
<%--    <div class="post-images">--%>
<%--      <div class="carousel-container">--%>
<%--        <div class="carousel-track">--%>
<%--          <img src="https://png.pngtree.com/background/20230527/original/pngtree-white-modern-living-room-with-a-chandelier-picture-image_2767824.jpg" alt="게시물 이미지">--%>
<%--        </div>--%>
<%--        <button class="carousel-prev">--%>
<%--          <i class="fa-solid fa-chevron-left"></i>--%>
<%--        </button>--%>
<%--        <button class="carousel-next">--%>
<%--          <i class="fa-solid fa-chevron-right"></i>--%>
<%--        </button>--%>
<%--        <div class="carousel-indicators">--%>
<%--          <span class="indicator active"></span>--%>
<%--          <span class="indicator"></span>--%>
<%--          <span class="indicator"></span>--%>
<%--        </div>--%>
<%--      </div>--%>
<%--    </div>--%>

  </c:forEach>


  <div id="loading-indicator" style="text-align: center; padding: 20px; display: none;">
    <span>Loading...</span>


  </div>

