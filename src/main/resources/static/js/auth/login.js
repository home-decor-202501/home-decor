// 검증 로직
import Validator from './validator.js';

// ======= 전역 변수 ====== //
const $loginBtn = document.querySelector('button.login-btn');
const $formContainer = document.querySelector('.form-container');
const $inputs = {
    $emailInput: $formContainer.querySelector('input[name=email]'),
    $passwordInput: $formContainer.querySelector('input[name=password]'),

}

// ====== 이벤트 핸들러 ====== //
// # form 이 submit 될 때 backend에 로그인 유효성 검증을 요청하는 이벤트 함수
async function handleLoginSubmit(e) {

    e.preventDefault();

    // 서버에 보낼 내용을 payload 변수로 담고, post fetch 하여 로그인 검증 백엔드에 요청
    const payload = {
        'email': $inputs.$emailInput.value,
        'password': $inputs.$passwordInput.value
    };

    await fetch(`/api/auth/login`, {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(payload)
    });
}


function initLogin() {
    // form의 input 태그 안에서 엔터를 누르거나, 로그인 버튼을 누르면 자동으로 form이 submit 됨.
    // 이 떄, form 이 submit 될 때 backend에 로그인 유효성 검증을 요청하는 이벤트 함수
    document.querySelector('form').addEventListener('submit', handleLoginSubmit);
}

// =================== 초기 화면 진입 시 실행 =================== //
document.addEventListener('DOMContentLoaded', initLogin);

