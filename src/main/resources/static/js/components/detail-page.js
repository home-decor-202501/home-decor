// import PostLikeManager from '../ui/PostLikeManager.js';

function renderPost({ postId, content, createdAt, user, images, likeStatus }) {
    const $postProfile = document.querySelector('.post-profile');
    const $postInfo = document.querySelector('.post-info');

    const { nickname, profileImageUrl } = user;
    const { liked, likeCount } = likeStatus;

    $postProfile.querySelector('.profile-name').textContent = nickname;
    $postInfo.querySelector('.post-time').textContent = formatDate(createdAt);
}

    // // 좋아요 렌더링 및 토글 처리
    // const $likeButton = $modal.querySelector('.like-button');
    // const $heartIcon = $modal.querySelector('.like-button i');
    // const $likeCount = $modal.querySelector('.likes-count');
    //
    // $likeButton.classList.toggle('liked', liked);
    // $heartIcon.className = liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    // $likeCount.textContent = likeCount;
    //
    // // 좋아요 버튼 클릭 이벤트
    // document.querySelector('.like-button').addEventListener('click', function () {
    //
    //     console.log("좋아요클릭");
    //
    //     const likeButton = this;
    //     const likeIcon = likeButton.querySelector('.like-icon');
    //     const likeCount = likeButton.querySelector('.like-count');
    //
    //     // 좋아요 상태 확인
    //     if (likeButton.classList.contains('liked')) {
    //         likeButton.classList.remove('liked');
    //         likeCount.textContent = parseInt(likeCount.textContent) - 1;
    //     } else {
    //         likeButton.classList.add('liked');
    //         likeCount.textContent = parseInt(likeCount.textContent) + 1;
    //     }
    // });



// 날짜 조작
function formatDate(dateString) {
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


// 전체 게시물 페이지에서 상세페이지 이동하기
async function openPostDetail(postId) {

    // 상세 페이지로 이동
    window.location.href = `/posts/${postId}`;

    // 서버에 데이터 요청
    const response = await fetchWithAuth(`/api/posts/${postId}`);

    if (!response.ok) {
        alert('피드 게시물 정보를 불러오는데 실패했습니다.');
        return;
    }

    const postData = await response.json();

    // 화면에 렌더링
    renderPost(postData);
}


export default openPostDetail;