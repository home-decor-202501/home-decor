

// 무한 스크롤 로직
const feedContainer = document.getElementById('feed-container');
const loadingIndicator = document.getElementById('loading-indicator');

const observer = new IntersectionObserver(entries => {
    const entry = entries[0];
    if (entry.isIntersecting) {
        loadMorePosts();
    }
});

observer.observe(loadingIndicator);

function loadMorePosts() {
    // 로딩 상태 표시
    loadingIndicator.style.display = 'block';

    // 게시물 추가 ( !!예제 데이터임!! )
    setTimeout(() => {
        for (let i = 0; i < 4; i++) {
            const newPost = document.createElement('div');
            newPost.className = 'feed-item';
            newPost.innerHTML = `
        <img src="https://via.placeholder.com/300x200" alt="새 게시물">
        <div class="feed-title">
          <span>새로운 게시물 ${i + 1}</span>
          <div class="like-section">
            <i class="fa fa-heart like-icon"></i>
            <span>0</span>
          </div>
        </div>
        <div class="feed-details">무한 스크롤로 추가된 게시물</div>
      `;
            feedContainer.appendChild(newPost);
        }

        // 로딩 상태 숨김
        loadingIndicator.style.display = 'none';
    }, 1000); // 1초 후 게시물 추가
}

function applySort() {
    const sortOption = document.getElementById('sort-option').value;
    alert(`정렬 옵션: ${sortOption}이(가) 적용되었습니다.`);
}
