/* src/main/resources/static/js/feed.js */
import initMain from './components/feed.js';
import initCreateFeedModal from './components/create-feed-modal.js';

// 모든 태그가 렌더링되면 실행됨
document.addEventListener('DOMContentLoaded',()=>{
   initMain(); // 메인피드
   initCreateFeedModal(); // 모달창

});