/* src/main/resources/static/js/index.js */
import initMain from './components/main.js';
import initCreateFeedModal from './components/create-feed-modal.js';
import initPost from './components/post.js';

// 모든 태그가 렌더링되면 실행됨
document.addEventListener('DOMContentLoaded',()=>{
   initMain();
   initCreateFeedModal(); // 피드 생성관련
   initPost(); // 피드목록 렌더링 관련 js
});