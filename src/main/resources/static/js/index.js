/* src/main/resources/static/js/feed.js */
import initMain from './components/feed.js';
import initCreateFeedModal from './components/create-feed-modal.js';
import initPost from './components/post.js';

// 모든 태그가 렌더링되면 실행됨
document.addEventListener('DOMContentLoaded',()=>{
   initMain(); // 메인피드
   // initNavigation(); - 로그인 유저 불러오는거 잠시 대기
   initCreateFeedModal(); // 모달창
   initPost(); // 피드목록 렌더링 관련 js
});