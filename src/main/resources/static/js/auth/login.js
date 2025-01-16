import Validator from './util/validator.js';

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

    const { $emailInput, $passwordInput } = $inputs;

    // 프론트 유효성 검증(yup library)
    // - 아이디 존재여부 및 비밀번호 일치 확인은 백엔드에서 따로 처리
    const formData = {
        email: $emailInput.value,
        password: $passwordInput.value
    };
    const loginValidator = new Validator('login');
    const responseData = await loginValidator.validateAllUserData(e, formData, 'login');
    console.log(responseData);

}

async function handleUserDataValidation(e) {
    //  yup library 사용 방법 3) 스키마 검증 대상 정의
    const formData = {
        email: $inputs.$emailInput.value,
        password: $inputs.$passwordInput.value
    };

    // yup 라이브러리로 검증
    const loginValidator = new Validator('login');
    const responseData = await loginValidator.validateUserData(e, formData);
    console.log(responseData);
}

// front, back 유효성 검증
function initValidation() {
    // form의 input 태그 안에서 엔터를 누르거나, 로그인 버튼을 누르면 자동으로 form이 submit 됨.
    // 이 떄, form 이 submit 될 때 backend에 로그인 유효성 검증을 요청하는 이벤트 함수
    document.querySelector('form').addEventListener('submit', handleLoginSubmit);
    // input 이벤트 발생했을 때
    Object.values($inputs).forEach($input => $input.addEventListener('input', (e) => handleUserDataValidation(e)));
}

function initLogin() {
    initValidation();


}

// =================== 초기 화면 진입 시 실행 =================== //
document.addEventListener('DOMContentLoaded', initLogin);

