// import PostLikeManager from '../ui/PostLikeManager.js';

function renderPost({ postId, content, createdAt, viewCount, author, loggedInUser, images, likeStatus }) {

    // 게시물 정보
    const $postInfo = document.querySelector('.post-info');
    const $postContent = document.querySelector('.post-contents');
    const $postImageContainer = document.querySelector('.post-img-container');
    const $likeCounts = document.querySelectorAll('.like-count');
    const $viewCount = $postInfo.querySelector('.view-count');
    const {nickname, profileImageUrl} = author;

    // 페이지 제목 설정
    const pageTitle = `${nickname}님의 라이프스타일`;
    document.title = pageTitle;

    // 작성자 정보
    const $authorProfile = document.querySelector('.author-profile');
    const $authorProfileImg = $authorProfile.querySelector('.author-profile-img');

    // 댓글 영역
    const $commentProfile = document.querySelector('.comment-profile');
    const $commentMyProfileImg = $commentProfile.querySelector('.my-profile');

    // 우측 고정바
    const $likeButton = document.querySelector('.like-button');

    // 게시물 이미지 렌더링
    $postImageContainer.innerHTML = ''; // 기존 내용을 초기화
    images.forEach(({ imageUrl }) => {
        if (imageUrl) { // imageUrl이 존재할 경우만 렌더링
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = '게시물 이미지';
            $postImageContainer.appendChild(imgElement); // 이미지 추가
        }
    });

    // 게시물 내용 렌더링
    $postContent.textContent = content;

    console.log("likeStatus " + likeStatus);

    // 게시물 정보 렌더링 (날짜, 좋아요 수, 조회수)
    $postInfo.querySelector('.post-time').textContent = formatDate(createdAt);
    $likeCounts.forEach(($likeCount) => {
        $likeCount.textContent += `${likeStatus?.likeCount || 0}`;
    });
    $viewCount.textContent += `${viewCount || 0}`;

    // 게시자 정보
    $authorProfileImg.innerHTML = profileImageUrl ?
        `<img src="${profileImageUrl}" alt="프로필 이미지">` :
        `<img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png" alt="프로필 이미지">`
    $authorProfile.querySelector('.author-nickname').textContent = nickname;

    // 댓글란 로그인 유저 정보
    // $commentMyProfileImg.innerHTML = profileImageUrl ?
    //     `<img src="${profileImageUrl}" alt="프로필 이미지">` :
    //     `<img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png" alt="프로필 이미지">`

    // likeStatus가 없으면 기본 값 설정
    const {liked = false, likeCount = 0} = likeStatus || {};

    $likeButton.classList.toggle('liked', liked);
}

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

function createAuthHeader() {
    // 액세스 토큰을 브라우저에서 가져오기
    const token = localStorage.getItem('accessToken');

    return token ? {Authorization: `Bearer ${token}`} : {};
}


async function openPostDetail() {
    console.log("openPostDetail");
    const pathSplits = window.location.pathname.split('/');
    const postId = pathSplits[pathSplits.length - 1];

    if (!postId) {
        alert("잘못된 게시물 ID입니다.");
        return;
    }

    // 서버에 데이터 요청
    const response = await fetchWithAuth(`/api/posts/${postId}`);

    if (!response.ok) {
        alert('피드 게시물 정보를 불러오는데 실패했습니다.');
        return;
    }

    const postData = await response.json();
    console.log("게시물 상세 정보 : " + JSON.stringify(postData, null, 2));

    // 화면에 렌더링
    renderPost(postData);
}

document.addEventListener('DOMContentLoaded', async () => {

    await openPostDetail();
});