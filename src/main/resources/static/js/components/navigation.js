import { getCurrentUser } from "../util/auth.js";

// 인덱스 페이지 우측 상단 로그인 유저 프로필 렌더링
async function renderMe() {
    // 서버에서 로그인한 사용자 정보 요청하기
    const currentUser = await getCurrentUser();
    console.log("current user : " + currentUser);

    const { profileImageUrl } = currentUser;

    if (currentUser) {
        const $user = document.querySelector('.current-user');
        // 프로필 이미지 생성
        $user.innerHTML = `
            <img src="${profileImageUrl || 'https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png'}" alt="${currentUser.username}의 프로필 이미지">`
    }
}

function initNavigation() {
    // renderMe();
}

export default initNavigation;