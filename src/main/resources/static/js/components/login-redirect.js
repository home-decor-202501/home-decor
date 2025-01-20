// # ------ 로그인 페이지 redirect를 위하여, 로그인 a 태그에 현재 머무루고 있는 페이지의 경로를 dataset으로 저장 -------
document.addEventListener('DOMContentLoaded', (e) => {
        // 로그인 버튼을 누르는 현재의 현재페이지의 경로를 가져와 a 태그의 href 속성에 추가
        const currentPageUrl = window.location.href;
        const parsedUrl = new URL(currentPageUrl);
        const path = parsedUrl.pathname; // '/auth'

        const $loginLink = document.querySelector('nav a.login');
        $loginLink.dataset.currentUrl = path;
        $loginLink.href = `/login?redirect=${encodeURIComponent(currentPageUrl)}`;
})


// # ---- 회원 가입 페이지 redirect를 위하여, 상세페이지와 메인페이지에서 현재 페이지의 href를 localstorage에 저장하는함수
//          (회원가입 페이지, 로그인페이지에서는 localstorage에 현재 경로 저장 안함. 왜냐면 회원가입 페이지의 경로를 저장해버리면, 회원가입 후에 다시 회원가입 페이지로 이동이 되어버림)
// 현재 페이지의 URL을 localStorage에 저장
function storeCurrentPageUrl() {
        localStorage.setItem('previousPage', window.location.href);
}

storeCurrentPageUrl();




