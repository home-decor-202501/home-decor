<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- 카테고리 목록 컨테이너 -->

<div class="filter-container">
  <div class="title-container">
    <span>집사진</span>
    <span>추천</span>
    <span>#채널</span>
    <span>3D인테리어</span>
    <span>반려동물</span>
    <span>육아</span>
    <span>홈스토랑</span>
    <span>플랜테리어</span>
    <span>콜렉터블</span>
    <span>캠핑</span>
    <span>이벤트</span>
  </div>

  <!-- 카테고리(인기순정렬)  -->
  <div class="sort-options">
    <label for="sort-option">정렬:</label>
    <select id="sort-option" onchange="applySort()">
      <option value="popularity">인기순</option>
      <option value="latest">최신순</option>
    </select>
  </div>
</div>