
// import PostLikeManager from "../ui/PostLikeManager.js";
// import { fetchWithAuth } from "../util/api.js";

// 게시물이 들어갈 전체영역
const $postContainer = document.querySelector('.post-container');

// 게시물 정보를 서버로부터 불러오는 함수
async function fetchPosts() {

    // 서버 요청시 토큰을 헤더에 포함해서 요청해야 함
    const response = await fetchWithAuth('/api/posts');
    if (!response.ok) alert('게시물 목록을 불러오는데 실패했습니다.');
    return await response.json();
}

// 게시물의 날짜를 조작
export function formatDate(dateString) {
    // 날짜문자열을 날짜객체로 변환
    const date = new Date(dateString);

    // 현재시간을 구함
    const now = new Date();

    // 두 시간 사이 값을 구함
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return '방금 전';
    if (diff < 60 * 60) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 60 * 60 * 24) return `${Math.floor(diff / (60 * 60))}시간 전`;
    if (diff < 60 * 60 * 24 * 7) return `${Math.floor(diff / (60 * 60 * 24))}일 전`;

    return new Intl.DateTimeFormat(
        'ko-KR',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    ).format(date);
}

// 한개의 게시물을 렌더링하는 함수
function createPostItem({ postId, nickname, profileImageUrl, content, image, createdAt, likeStatus }) {
    // likeStatus가 null인 경우, likeCount를 표시하지 않음
    const { liked = false, likeCount = 0 } = likeStatus || {}; // likeStatus가 null이면 liked와 likeCount는 기본값을 사용

    return `
        <div class="post-item">
            <div class="post-profile">
                <img src="${profileImageUrl || 'https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?w=72&h=72&c=c"\n' +
    '           srcset="https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?w=72&h=72&c=c 1x,\n' +
    '          https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?w=144&h=144&c=c 2x,\n' +
    '          https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?w=216&h=216&c=c 3x'}" alt="프로필 이미지">
                <div class="profile-info">
                    <a href="#" class="profile-name">${nickname}</a>
                </div>
            </div>

            <!-- 랜덤 이미지 링크 https://picsum.photos/300/200-->
            <img src="${image || 'https://picsum.photos/300/200'}" alt="게시물 이미지">

            <div class="post-content">
                <span>${content}</span>
                <div class="like-section">
                    <i class="fa fa-heart like-icon ${liked ? 'liked' : ''}"></i>
                    ${likeStatus ? `<span>${likeCount}</span>` : ''}  <!-- likeStatus가 null이면 likeCount를 표시하지 않음 -->
                </div>
            </div>
        </div>
    `;
}

// 게시물 렌더링 함수
async function renderPost() {
    // 게시물 데이터를 서버로부터 불러오기
    const postList = await fetchPosts();
    console.log(postList);

    // post html 생성
    $postContainer.innerHTML = postList.map((post) => createPostItem(post)).join('');

    // 모든 게시물에 좋아요 매니저를 세팅
    // $postContainer.querySelectorAll('.post').forEach($post => {
    //     new PostLikeManager($post);
    // });
}

// --------------Utils로 옮기면 좋을듯
async function fetchWithAuth(url, options = {}) {

    // 기본 헤더에 인증 헤더 추가
    const headers = {
        ...options.headers,
        ...createAuthHeader(),
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    // 401 에러시 로그인 페이지로 리다이렉트
    if (response.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
        return;
    }

    return response;
}

// 인증 헤더를 생성하는 함수
function createAuthHeader() {
    // 액세스 토큰을 브라우저에서 가져오기
    const token = localStorage.getItem('accessToken');

    return token ? { Authorization: `Bearer ${token}` } : {};
}
// -------------------------------------------------

// 외부에 노출시킬 게시물관련 함수
function initPost() {
    renderPost();
}

export default initPost;