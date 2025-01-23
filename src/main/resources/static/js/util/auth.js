import { fetchWithAuth } from "./api.js";


// 현재 로그인한 사용자 정보를 요청하기
export async function getCurrentUser() {

    // /api/profiles/me 는 /api/profiles/{token} 이랑 경로 겹쳐서 경로 바꿈
    const response = await fetchWithAuth(`/api/profiles/me/me`);

    if (!response.ok) {
        // 로그인을 안했어도 프로필 사진을 불러오는 fetch를 진행할거니까, 로그인 안한 상태에서 alert 안 띄우게
        // alert('로그인한 사용자 정보를 불러오는 데 실패했습니다.');
        return;
    }

    return await response.json();
}