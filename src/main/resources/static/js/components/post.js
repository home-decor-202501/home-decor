// 게시물이 들어갈 전체영역
const $postContainer = document.querySelector('.post-container');
let observer = null; // 옵저버 변수
let observerActivated = false; // 옵저버 활성화 여부

// 스크롤 비활성화 함수
function disableScroll() {
    document.body.style.overflow = 'hidden'; // 스크롤 비활성화
    console.log('스크롤 비활성화');
}

// 스크롤 활성화 함수
function enableScroll() {
    document.body.style.overflow = 'auto'; // 스크롤 활성화
    console.log('스크롤 활성화');
}

// 게시물 정보를 서버로부터 불러오는 함수
async function fetchPosts() {
    const response = await fetchWithAuth('/api/posts');
    if (!response.ok) {
        alert('게시물 목록을 불러오는데 실패했습니다.');
        return [];
    }
    return await response.json();
}

// 게시물의 날짜를 조작
export function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return '방금 전';
    if (diff < 60 * 60) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 60 * 60 * 24) return `${Math.floor(diff / (60 * 60))}시간 전`;
    if (diff < 60 * 60 * 24 * 7) return `${Math.floor(diff / (60 * 60 * 24))}일 전`;

    return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

// 한개의 게시물을 렌더링하는 함수
function createPostItem({ postId, nickname, profileImageUrl, content, image, createdAt, likeStatus }) {
    const { liked = false, likeCount = 0 } = likeStatus || {};
    const { imageUrl } = image;

    return `
        <div class="post-item" data-post-id="${postId}">
            <div class="post-profile">
                <img src="${profileImageUrl || 'https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png'}" alt="프로필 이미지">
                <div class="profile-info">
                    <a href="#" class="profile-name">${nickname}</a>
                </div>
            </div>
            <img src="${imageUrl || 'https://picsum.photos/300/200'}" alt="게시물 이미지">
            <div class="post-content">
                <span>${content}</span>
                <div class="like-section">
                    <i class="fa fa-heart like-icon ${liked ? 'liked' : ''}"></i>
                    ${likeStatus ? `<span>${likeCount}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

// 옵저버 관련 설정
function observeLastPost() {
    const posts = document.querySelectorAll('.post-item'); // 게시물 목록
    if (posts.length === 0) {
        console.warn('옵저버를 등록할 게시물이 없습니다.');
        return;
    }

    const lastPost = posts[posts.length - 1]; // 마지막 게시물 선택
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.9, // 90% 보였을 때 트리거
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('마지막 게시물이 화면에 보입니다.');
                observer.unobserve(entry.target); // 기존 옵저버 해제
                // 추가 작업 필요 시 여기에 작성
            }
        });
    };

    observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(lastPost); // 마지막 게시물에 옵저버 등록
    console.log('옵저버가 등록되었습니다.');
}

// 스크롤 이벤트로 옵저버 활성화
function activateObserverOnScroll() {
    if (!observerActivated) {
        console.log('스크롤 감지됨, 옵저버 활성화');
        observerActivated = true; // 옵저버 활성화
        enableScroll(); // 스크롤 활성화
        observeLastPost(); // 옵저버 등록
        window.removeEventListener('scroll', activateObserverOnScroll); // 스크롤 이벤트 제거
    }
}

// 게시물 렌더링 함수
async function renderPost() {
    const postList = await fetchPosts();
    if (!postList || postList.length === 0) {
        console.warn('게시물이 없습니다.');
        return;
    }

    $postContainer.innerHTML = postList.map((post) => createPostItem(post)).join('');

    document.querySelectorAll('.post-item').forEach(postItem => {
        postItem.addEventListener('click', function () {
            const postId = postItem.dataset.postId;
            window.location.href = `/post/${postId}`;
        });
    });
}

// 인증 헤더를 생성하는 함수
function createAuthHeader() {
    const token = localStorage.getItem('accessToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

// API 요청에 인증 헤더를 포함하는 함수
async function fetchWithAuth(url, options = {}) {
    const headers = { ...options.headers, ...createAuthHeader() };
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
        return;
    }
    return response;
}

// 외부에 노출시킬 게시물 관련 함수
function initPost() {
    disableScroll(); // 초기에는 스크롤 비활성화
    renderPost(); // 게시물 렌더링
    window.addEventListener('scroll', activateObserverOnScroll); // 스크롤 이벤트로 옵저버 활성화
}

export default initPost;
