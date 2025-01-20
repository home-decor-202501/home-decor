import Validator from './util/validator.js';

// ======= 전역 변수 ====== //
const $loginBtn = document.querySelector('button.login-btn');
const $formContainer = document.querySelector('.form-container');
const $inputs = {
    $emailInput: $formContainer.querySelector('input[name=email]'),
    $passwordInput: $formContainer.querySelector('input[name=password]'),
}
// # DOM 요소 기타
const $elements = {
    $main: document.querySelector('.main'),
    $togglePasswordIcon: document.querySelector('.toggle-password'),
}

// ====== 이벤트 핸들러 ====== //
function updateValidationUI(eventTarget, isValid, errorMessage) {

    // 먼저 이전 유효성 검사에서 회원가입 링크 보이게 했던 것 무효화
    document.querySelector('.form-control a.link-to-signup-page').style.display = 'none';

    const $errorMessageField = eventTarget.closest('.form-control').querySelector('small');
    const $errorInput = eventTarget.closest('.form-control').querySelector('input');

    if (isValid === false) {

        // 에러 메시지 표기
        $errorMessageField.classList.add('error'); // display를 none에서 inline으로
        $errorMessageField.textContent = errorMessage;

        // input 박스 테두리를 빨갛게
        $errorInput.classList.add('error');
        $errorInput.classList.remove('success');

    } else if (isValid) {
        // 에러 메시지 표기
        $errorMessageField.classList.remove('error'); // display를 none에서 inline으로
        $errorMessageField.textContent = '';

        // input 박스 테두리를 초록색으로
        $errorInput.classList.remove('error');
        $errorInput.classList.add('success');
    }



}


//#  에러가 난 input(=클래스에 error 있는 input 태그)를 shake 해주는 함수
function shakeErrorInput() {

    Object.values($inputs).forEach($input => {
        $input.classList.remove('shake');
        if ($input.classList.contains('error')) {
            setTimeout(() => {
                $input.classList.add('shake');
            }, 10);
        } // 10 밀리초 지연
    })

}
// # form 이 submit 될 때 로그인 유효성 검증을 요청하는 이벤트 함수
async function handleLoginSubmit(e) {

    e.preventDefault();

    const {$emailInput, $passwordInput} = $inputs;

    // 프론트 유효성 검증(yup library)
    // - 아이디 존재여부 및 비밀번호 일치 확인은 백엔드에서 따로 처리
    const formData = {
        email: $emailInput.value,
        password: $passwordInput.value
    };
    const loginValidator = new Validator('login');
    const responseData = await loginValidator.validateAllUserData(e, formData, 'login');

    // 프론트 유효성 검증 여부 검증 결과에 따른 ui 업데이트
    updateValidationUI($inputs.$emailInput, responseData.email.valid, responseData.email.errors);
    updateValidationUI($inputs.$passwordInput, responseData.password.valid, responseData.password.errors);

    // 커서 위치를 error가 있는 가장 처음 input으로 이동
    const $errorInputs = [...document.querySelectorAll('input.error')];
    if ($errorInputs.length > 0) {
        const $firstErrorInput = $errorInputs[0]
        $firstErrorInput.focus();
        const valueLength = $firstErrorInput.value.length;
        $firstErrorInput.setSelectionRange(0, valueLength);
    }

    //  에러가 난 input(=클래스에 error 있는 input 태그)를 shake 해주는 함수
    shakeErrorInput();

    // 프론트 검증 통과 했을 시, 백엔드 유효성 검증
    if ($errorInputs.length !== 0) return;
    const payload = {
        email: $emailInput.value,
        password: $passwordInput.value
    }

    const response = await fetch('api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const data = await response.json();


    // 백엔드 검증 여부 검증  실패 시 ui 업데이트
    if (!response.ok) {

        // 에러 난 곳 확인
        const errorField = data.errorField[0];
        const $errorInput = document.querySelector(`input#${errorField}`);
        const errorMessage = data.message;
        console.log(errorField);
        // ui 업데이트
        updateValidationUI($errorInput, false, errorMessage);

        // 없는 아이디면, 회원가입 링크 보이게
        if (errorField === 'email') {
            console.log(document.querySelector('.form-control a.link-to-signup-page'));
            document.querySelector('.form-control a.link-to-signup-page').style.display = 'inline';
        } else {
            document.querySelector('.form-control a.link-to-signup-page').style.display = 'none';
        }

        // 커서 위치를 error가 있는 가장 처음 input으로 이동
        const $errorInputsAfterBackEndValidation = [...document.querySelectorAll('input.error')];
        if ($errorInputsAfterBackEndValidation.length > 0) {
            const $firstErrorInput = $errorInputsAfterBackEndValidation[0];
            $firstErrorInput.focus();
            const valueLength = $firstErrorInput.value.length;
            $firstErrorInput.setSelectionRange(0, valueLength);
        }

    }



    shakeErrorInput();

    // 백엔드 검증 성공 시
    if (response.ok) {
        console.log(data);
        console.log(data.accessToken);
        // 다른 페이지에서도 access token 정보를 가지고 있을 수 있도록 token 을 local storage에 저장
        localStorage.setItem('accessToken', data.accessToken);
        // local Storage에 email 값 저장 (다시 페이지 방문 시 전에 로그인 했던 아이디 바로 보이도록)
        localStorage.setItem('savedEmail', data.email);

        // 이전 페이지로 리디렉션
        // 이전 페이지가 /sign-up이면 루트 페이지로 이동
        // 1. 쿼리 매개변수에서 가져옴
        const redirectUrl = new URLSearchParams(window.location.search).get('redirect');
        if (redirectUrl === '/sign-up') {
            window.location.href = '/';
        } else {
            window.location.href = redirectUrl || '/';
        }




    }

}


//  # 눈 모양 아이콘 클릭/hover에 따른 아이콘 변경 및 비밀번호 표시 여부 변경
function togglePasswordDisplay() {

    //  1) 눈 모양 아이콘 클릭/hover에 따른 아이콘 변경 및 비밀번호 표시 여부 변경
    let {$passwordInput} = $inputs;
    const {$togglePasswordIcon} = $elements;

    $elements.$togglePasswordIcon.addEventListener('click', function () {

        // 현재 input type이 password인 경우 : input type을 text로(비밀번호 보이게), 아이콘을
        if ($passwordInput.type === 'password') {
            $passwordInput.type = 'text';
            $togglePasswordIcon.classList.remove('fa-eye');
            $togglePasswordIcon.classList.add('fa-eye-slash');

        } else {
            $passwordInput.type = 'password';
            $togglePasswordIcon.classList.remove('fa-eye-slash');
            $togglePasswordIcon.classList.add('fa-eye');
        }
    });


    // 현재 input type이 password인 경우 : 아이콘을 fa-lock-open으로
    $elements.$togglePasswordIcon.addEventListener('mouseover', function () {
        if ($passwordInput.type === 'password') {
            $togglePasswordIcon.classList.remove('fa-eye');
            $togglePasswordIcon.classList.add('fa-eye-slash');
        } else {
            $togglePasswordIcon.classList.remove('fa-eye-slash');
            $togglePasswordIcon.classList.add('fa-eye');
        }
    });


    // 현재 input type이 password인 경우 : 아이콘을 fa-lock-으로
    $elements.$togglePasswordIcon.addEventListener('mouseleave', function () {
        if ($passwordInput.type === 'password') {
            $togglePasswordIcon.classList.add('fa-eye');
            $togglePasswordIcon.classList.remove('fa-eye-slash');
        } else {
            $togglePasswordIcon.classList.add('fa-eye-slash');
            $togglePasswordIcon.classList.remove('fa-eye');
        }
    });

}


// # caps lock 키 누를 떄
function handlePressCapsLock(e) {

    const {  $passwordInput } = $inputs;
    if (e.key === 'CapsLock') {
        const isCapsLockOn = e.getModifierState('CapsLock');
        console.log(isCapsLockOn);
        if (isCapsLockOn) {
            console.log(e.target);
            e.target.closest('.input-and-tooltip-wrapper').style.setProperty('--tooltip-opacity', '1');
        } else {
            e.target.closest('.input-and-tooltip-wrapper').style.setProperty('--tooltip-opacity', '0');
        }
    }
}
// # caps lock on 여부 확인
function handleCapsLockOn(e) {

    const {  $passwordInput } = $inputs;
    if (e.target !== $passwordInput) return;

    const isCapsLockOn = e.getModifierState('CapsLock');

    if (isCapsLockOn) {
        e.target.closest('.input-and-tooltip-wrapper').style.setProperty('--tooltip-opacity', '1');
    } else {
        $passwordInput.style.setProperty('--tooltip-opacity', '0');
    }
}

// input 태그에 input  이벤트 발생하면 Caps lock 활성화 상태 확인하는 함수를 쓰고 싶은데,
// caps losk 활성화 상태 확인 함수는 key press  이벤트가 발생했을 때만 확인 가능
// # -> 임의로 keypress 이벤트를 생성하는 함수
function triggerKeyPressHandler(e) {
    e.target.dispatchEvent(
        new Event("keydown", { bubbles: true, cancelable: true})
    );
}

// 전에 로그인 페이지에서 마지막으로 제출했던 이메일을 불러오는 함수(local storage 사용)
function handleLoadPreviouslySubmittedEmail(e) {
    const savedEmail = localStorage.getItem('savedEmail');
    console.log(savedEmail, 'ggg');
    if (savedEmail) {
        $inputs.$emailInput.value = savedEmail;
    }
}

// input 태그에 input이나 focus 이벤트 발생하면 Caps lock 활성화 상태 확인하는 함수를 쓰고 싶은데,
// caps losk 활성화 상태 확인 함수는 key press  이벤트가 발생했을 때만 확인 가능
//  -> 임의로 keypress 이벤트를 생성하는 함
function detectPasswordCapsLock() {
    $inputs.$passwordInput.addEventListener('input', triggerKeyPressHandler);
    $inputs.$passwordInput.addEventListener('keydown', handleCapsLockOn);
    $inputs.$passwordInput.addEventListener('keydown', handlePressCapsLock);
}

function initLogin() {
    togglePasswordDisplay();
    // 이메일 input에 autofocus 되도록 하는 이벤트
    $inputs.$emailInput.focus();
    detectPasswordCapsLock();
    //폼이 제출될 때 제출했던 이메일을 저장하는 함수
    document.querySelector('form').addEventListener('submit', handleLoginSubmit);
}

// =================== 초기 화면 진입 시 실행 =================== //
document.addEventListener('DOMContentLoaded', initLogin);
// 전에 로그인 페이지에서 마지막으로 제출했던 이메일을 불러오는 함수(local storage 사용)
document.addEventListener('DOMContentLoaded', handleLoadPreviouslySubmittedEmail);








