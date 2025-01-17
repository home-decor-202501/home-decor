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
function updateValidationUI(eventTarget, isValid, errors) {

    // 먼저 이전 유효성 검사에서 회원가입 링크 보이게 했던 것 무효화
    document.querySelector('.form-control a.link-to-signup-page').style.display = 'none';

    if (!isValid) {
        // 에러 메시지 표기
        eventTarget.closest('.form-control').querySelector('small').classList.add('error'); // display를 none에서 inline으로
        eventTarget.closest('.form-control').querySelector('small').textContent = errors;

        // input 박스 테두리를 빨갛게
        eventTarget.closest('.form-control').querySelector('input').classList.add('error');
        eventTarget.closest('.form-control').querySelector('input').classList.remove('success');

    } else if (isValid) {
        // 에러 메시지 표기
        eventTarget.closest('.form-control').querySelector('small').classList.remove('error'); // display를 none에서 inline으로
        eventTarget.closest('.form-control').querySelector('small').textContent = '';

        // input 박스 테두리를 초록색으로
        eventTarget.closest('.form-control').querySelector('input').classList.remove('error');
        eventTarget.closest('.form-control').querySelector('input').classList.add('success');
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

    const { $emailInput, $passwordInput } = $inputs;

    // local Storage에 email 값 저장
    localStorage.setItem('savedEmail', $emailInput.value);

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

    // 백엔드 유효성 검증
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
    console.log(data);

    // 백엔드 검증 여부 검증 결과에 따른 ui 업데이트
    updateValidationUI($inputs.$emailInput, data.email.valid, data.email.errors);
    updateValidationUI($inputs.$passwordInput, data.password.valid, data.password.errors);



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
            $togglePasswordIcon.classList.remove('fa-lock');
            $togglePasswordIcon.classList.add('fa-lock-open');
        } else {
            $passwordInput.type = 'password';
            $togglePasswordIcon.classList.remove('fa-lock-open');
            $togglePasswordIcon.classList.add('fa-lock');
        }
    });


    // 현재 input type이 password인 경우 : 아이콘을 fa-lock-open으로
    $elements.$togglePasswordIcon.addEventListener('mouseover', function () {
        if ($passwordInput.type === 'password') {
            $togglePasswordIcon.classList.remove('fa-lock');
            $togglePasswordIcon.classList.add('fa-lock-open');
        } else {
            $togglePasswordIcon.classList.remove('fa-lock-open');
            $togglePasswordIcon.classList.add('fa-lock');
        }
    });


    // 현재 input type이 password인 경우 : 아이콘을 fa-lock-으로
    $elements.$togglePasswordIcon.addEventListener('mouseleave', function () {
        if ($passwordInput.type === 'password') {
            $togglePasswordIcon.classList.add('fa-lock');
            $togglePasswordIcon.classList.remove('fa-lock-open');
        } else {
            $togglePasswordIcon.classList.add('fa-lock-open');
            $togglePasswordIcon.classList.remove('fa-lock');
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

function initLogin() {
    togglePasswordDisplay();
    // 이메일 input에 autofocus 되도록 하는 이벤트
    $inputs.$emailInput.focus();
    // input 태그에 input이나 focus 이벤트 발생하면 Caps lock 활성화 상태 확인하는 함수를 쓰고 싶은데,
    // caps losk 활성화 상태 확인 함수는 key press  이벤트가 발생했을 때만 확인 가능
    //  -> 임의로 keypress 이벤트를 생성하는 함수
    $inputs.$passwordInput.addEventListener('input', triggerKeyPressHandler);
    $inputs.$passwordInput.addEventListener('keydown', handleCapsLockOn);
    $inputs.$passwordInput.addEventListener('keydown', handlePressCapsLock);
    //폼이 제출될 때 제출했던 이메일을 저장하는 함수
    document.querySelector('form').addEventListener('submit', handleLoginSubmit);
}

// =================== 초기 화면 진입 시 실행 =================== //
document.addEventListener('DOMContentLoaded', initLogin);
// 전에 로그인 페이지에서 마지막으로 제출했던 이메일을 불러오는 함수(local storage 사용)
document.addEventListener('DOMContentLoaded', handleLoadPreviouslySubmittedEmail);

