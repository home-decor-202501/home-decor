// 검증 로직
import Validator from './util/validator.js';

// ================ 전역 변수 ================== //
// # DOM 요소 기타
const $elements = {
    $main: document.querySelector('.main'),
    $togglePasswordIcon: document.querySelector('.toggle-password'),
}
const $profileImage = {
    // 사진 미리보기
    $profileImagePreview: document.querySelector('.pic-preview'),
    // 사진 선택 전
    $profilePicHolder: document.querySelector('.pic-holder'),
    // 카메라 아이콘 + 프로필 선택하세요 이미지의 부모 요소
    $textCenter: document.querySelector('.text-center'),
    $uploadFileBlock: document.querySelector('.upload-file-block')
}
// # 회원가입 성공 모달 DOM 요소
const $signUpSuccessModal = {
    // 회원가입 성공 모달 외 다른 부분 전체
    $successModal: document.querySelector('.success-modal'),
    $signUpModalCloseBtn: document.getElementById('close-modal')
}
// #profileImage의 경우, input[type="file"]의 change 이벤트에서 값을 가져와서, $form에 대한 submit 이벤트가 발생할 때 사용됨
//   -> 따라서 두 개 메소드에서 사용되므로, 전역변수로 빼주었음
let profileImageFiles = null;
const $form = document.querySelector('.form');
// # form 태그 안에 있는 $input들 (동일한 이벤트 걸어야 함으로 한 객체안에 보관)
const $inputs = {
    $profileImageInput: $form.querySelector('input[type="file"][name="profile-image"]'),
    $emailInput: $form.querySelector('input[type="text"][name="email"]'),
    $nicknameInput: $form.querySelector('input[type="text"][name="nickname"]'),
    $passwordInput: $form.querySelector('input[name="password"]')
}

// ========== 일반 함수 =========== //
//  # 회원가입 성공 후, 서버에 자동 로그인 요청
async function fetchToLogin() {

    // 로그인 페이지로 redirect 하기 전에, 서버에 자동 로그인 요청
    const payload = {
        email: $inputs.$emailInput.value,
        password: $inputs.$passwordInput.value
    }

    return await fetch('api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

// 이전 페이지로 redirect
function redirectToPreviousPage() {
    // 3초 후 로그인 페이지로 리디렉션
    const redirectTimeout = setTimeout(function () {
        const previousPageUrl = localStorage.getItem('previousPage');
        if (previousPageUrl) {
            window.location.href = previousPageUrl;
        } else {
            window.location.href = '/';
        }
    }, 3000);

    // 즉시 리디렉션 함수
    function redirectNow() {
        clearTimeout(redirectTimeout); // 타이머 지우기
        // 즉시 redirect
        const previousPageUrl = localStorage.getItem('previousPage');
        if (previousPageUrl) {
            window.location.href = previousPageUrl;
        } else {
            window.location.href = '/';
        }
    }

    // 모달 닫기 버튼 클릭 시 즉시 리디렉션
    $signUpSuccessModal.$signUpModalCloseBtn.addEventListener('click', redirectNow);

    // 키보드 이벤트로 엔터나 ESC 키를 눌렀을 때 즉시 리디렉션
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === 'Escape') {
            redirectNow();
        }
    });
}

// # 회원가입 성공 시, 자동 로그인 후, 회원가입 성공 모달 표시하고, 로그인 페이지로 리디렉션
async function showSuccessModalAndRedirect() {

    const response = await fetchToLogin();
    const data = await response.json();

    // 로그인 성공해서 토큰 발급되면,
    if (response.ok) {
        // 회원가입 성공 알림 모달 띄우고, 메인 내용 div 숨기기
        $signUpSuccessModal.$successModal.style.display = 'block';
        $elements.$main.style.display = 'none';

        // 다른 페이지에서도 access token 정보를 가지고 있을 수 있도록 token 을 local storage에 저장
        localStorage.setItem('accessToken', data.accessToken);
        // local Storage에 email 값 저장 (다시 페이지 방문 시 전에 로그인 했던 아이디 바로 보이도록)
        localStorage.setItem('savedEmail', data.email);

        // 이전 페이지로 redirect
        redirectToPreviousPage();

    }
}


//  눈 모양 아이콘 클릭/hover에 따른 아이콘 변경 및 비밀번호 표시 여부 변경
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

// 에러가 난 input(=클래스에 error 있는 input 태그)를 shake 해주는 함수
function shakeErrorInput() {

    Object.values($inputs).forEach($input => {
        $input.classList.remove('shake');
        if ($input.classList.contains('error')) {
            setTimeout(() => {
                $input.classList.add('shake');
                console.log($input);
            }, 10);
        } // 10 밀리초 지연
    })

}


// ================ 이벤트 핸들러 함수 ================ //
// # 회원가입 시 필요한 FormData 형식의 payload 만드는 이벤트 핸들러
//  - 화면 초기 진입시 INITsIGNUP 함수 호출 -> INITSIGNUP은 handleSubmit 호출 -> handleSubmit는 createPayload() 호출
function createPayload(e) {
    // deconstructuring
    const {$profileImageInput, $emailInput, $nicknameInput, $passwordInput} = $inputs;

    // formdata로 데이터 전송하기 위해, FORMDATA 객체 생성
    const formData = new FormData();
    // - 파일(사진)과 나머지 이렇게 크게 2개로 나누고, 각 부분에 대해서 나눠서 보냄
    // profileImage는 $profileImageInput에 대한 change 이벤트 리스너로 따로 받아두었음
    const newUserData = {
        email: $emailInput.value,
        nickname: $nicknameInput.value,
        password: $passwordInput.value
    }
    // - formdata에 데이터 집어넣기
    //   :  json의 경우, formData.append(fetch 할 때 보낼 key 이름, new Blob([JSON.stringify(data)], {data type} )'
    formData.append('newUserData', new Blob([JSON.stringify(newUserData)], {type: 'application/json'}));
    // 이미지 파일의 경우, 선택된 경우에만 formData에 추가
    if (profileImageFiles && profileImageFiles.length > 0) {
        profileImageFiles.forEach(profileImage => formData.append('profileImage', profileImage));
    }

    return formData;
}

// # 화면 초기 진입시 INITsIGNUP 함수 호출 -> INITSIGNUP은 handleSubmit 호출 -> handleSubmit는 createPayload() 호출 -> createpayload()에서 전달값 받아서 서버에 회원등록 위한 fetch
async function fetchToSignUp(formData) {
    const response = await fetch("/api/auth/sign-up", {
        method: 'POST',
        body: formData
    });
    const data = await response.json();

    // 제대로 아이디가 만들어 졌으면,
    if (response.ok) {
        // 자동 로그인 후, 회원가입 성공 모달 표시하고, 로그인 페이지로 리디렉션
        showSuccessModalAndRedirect();
    } else {
        // 에러가 난 input을 골라서 shake 효과는 주는 이벤트
        shakeErrorInput();
    }
}


// # 회원가입 버튼 누를 시 진행할 이벤트 핸들러(payload 만들고, 서버에 전달)
//  - 초기 화면 진입 시 DOMContentloaded 이벤트로 initSignup 함수 호출됨 -> initSignup 함수가 handleSubmit 함수 호출
async function handleSubmit(e) {

    // submit input의 기본 기능인 새로고침 방지
    e.preventDefault();

    // 먼저 이전 유효성 검사에서 로그인 링크 보이게 했던 것 무효화
    document.querySelector('.form-control a.link-to-login-page').style.display = 'none';
    // 먼저 front에서 유효성 검사 후, 결과에 따라 ui 변경
    handleAllUserDataValidation(e);

    // 서버에 보낼 데이터를 객체 형태로 반환
    const payload = createPayload();

    // 서버에 데이터 보내며 회원가입 처리 요청
    const data = fetchToSignUp(payload);

}

function handleProfileImageUpload(e) {

    // #profileImage의 경우, input[type="file"]의 change 이벤트에서 값을 가져와서, $form에 대한 submit 이벤트가 발생할 때 사용됨
    //   -> 따라서 두 개 메소드에서 사용되므로, 전역변수로 빼주었음
    profileImageFiles = [...e.target.files];

    // 이미지를 preview로 띄우기
    //  - input[type="file"]에 submit 이벤트가 일어나면,
    //     -> new FileReader()이 파일을 Base64 인코딩된 데이터 url로 파일을 변환함 (파일 - url 세트가 생기는 것임)
    //     -> FileReader에 load 이벤트가 일어나면 ( = 파일을 url로 변환이 끝나면)
    //     -> url 주소를 가져와라 ( = e.target.result로 이미지를 불러온다.)
    //     -> FileReader.readAsDataUrl로 파일을 보여줘라
    const fileReader = new FileReader();

    fileReader.addEventListener('load', e => {
        $profileImage.$profileImagePreview.src = e.target.result;
        $profileImage.$profileImagePreview.style.display = 'block'; // 선택 사진 보이게
    });

    fileReader.readAsDataURL(profileImageFiles[0]);

    // 카메라 아이콘 및 문구 사라진 후에는, 프로필 사진에 hover하면 문구 다시 보이고 mouseover 하면 문구 다시 사라지게
    $profileImage.$textCenter.classList.add('hide'); // 선택 아이콘 안보이게 (hover시 보이게 할거임)
    $profileImage.$uploadFileBlock.addEventListener('mouseout', function () {
        $profileImage.$textCenter.classList.add('hide');
    });
    $profileImage.$uploadFileBlock.addEventListener('mouseover', function () {
        $profileImage.$textCenter.classList.remove('hide');
    });
}

/**
 * yup library로 유효성 검증을 하고, 검증 결과에 따라 관련 UI를 변경하는 함수
 * @param eventTarget 클릭된 $input
 * @param valid validator.js를 통해 yup 라이브러리로 유효성 검증한 값. 검증 성공 valid는 true, 실패 시 false
 * @param errors yup 검증 실패 시 전달되는 에러 메시지
 */
function updateValidationUI(eventTarget, valid, errors) {

    // 먼저 이전 유효성 검사에서 로그인 링크 보이게 했던 것 무효화
    document.querySelector('.form-control a.link-to-login-page').style.display = 'none';

    if (!valid) {
        const {$emailInput, $passwordInput, $nicknameInput} = $inputs;

        // 이메일이 있는 이메일이면 로그인 링크 열리게
        if (eventTarget === $emailInput) {
            errors.forEach(error => {
                const $loginPageLink = document.querySelector('.form-control a.link-to-login-page');
                $loginPageLink.style.display = error === "이미 존재하는 이메일입니다." ? 'inline' : 'none';
            });
        }

        // 해당 input 태그가 email이나 nickname일 경우 (small 태그의 디자인을 조절)
        if (eventTarget === $emailInput || eventTarget === $nicknameInput) {
            // 에러 메시지 표기
            eventTarget.closest('.form-control').querySelector('small').classList.add('error'); // display를 none에서 inline으로
            eventTarget.closest('.form-control').querySelector('small').textContent = errors;
        }

        // 해당 input 태그가 password일 경우 (small 태그의 디자인을 조절) emialinput 로 버그 때문에 임시로 이렇게 처리
        if (eventTarget === $passwordInput) {
            console.log(errors);
            // 에러 메시지 표기
            console.log()
            eventTarget.closest('.form-control').querySelector('small').classList.add('error'); // display를 none에서 inline으로
            eventTarget.closest('.form-control').querySelector('small').textContent = errors[0];
        }

        // 버그 발생
        // // 해당 input 태그가 password일 경우, span과 i로  ui 조절
        // if (eventTarget === $passwordInput) {
        //     // 에러 메시지와 textContent가 같은 태그를 찾아, 1) 문구 및 아이콘 색상 빨간색으로 2) 아이콘 x 로 바꾸기
        //
        //     const $passwordValidationSpan = [...document.querySelectorAll('.password-field-desc span')];
        //
        //     errors.forEach(error => {
        //         //  #####모든 span 및 i 태그를 초록색으로 설정
        //         $passwordValidationSpan.forEach($span => {
        //             const correspondingIcon = $span.previousElementSibling;
        //             $span.classList.remove('error');
        //             $span.classList.add('success');
        //             if (correspondingIcon) {
        //                 correspondingIcon.classList.remove('fa-circle-xmark', 'error');
        //                 correspondingIcon.classList.add('fa-circle-check', 'success');
        //             }
        //         });
        //     });
        //
        //     // 공란이라면, input 태그 빨간 테두리 적용 등
        //     const inputValue = eventTarget.value;
        //     if (inputValue === '') {
        //         $passwordValidationSpan.forEach($span => {
        //             const correspondingIcon = $span.previousElementSibling;
        //             $span.classList.add('error');
        //             $span.classList.remove('success');
        //             if (correspondingIcon) {
        //                 correspondingIcon.classList.add('fa-circle-xmark', 'error');
        //                 correspondingIcon.classList.remove('fa-circle-check', 'success');
        //             }
        //         });
        //     }
        //
        //     errors.forEach(error => {
        //         $passwordValidationSpan.forEach($span => {
        //             if ($span.textContent === error) {
        //                 $span.classList.add('error');
        //                 $span.classList.remove('success');
        //                 console.log($span);
        //                 $span.previousElementSibling.classList.remove('fa-circle-check', 'success'); // 인접 i 태그(아이콘)
        //                 $span.previousElementSibling.classList.add('fa-circle-xmark', 'error');
        //             }
        //         });
        //     });
        // }

        // 어떤 input 이던 공통사항 : input 박스 테두리를 빨갛게
        eventTarget.closest('.form-control').querySelector('input').classList.add('error');
        eventTarget.closest('.form-control').querySelector('input').classList.remove('success');

    } else if (valid) {

        // 해당 input 태그가 email이나 nickname일 경우 (small 태그의 디자인을 조절) + emailinput로 버그로 임시로 이렇게 처리
        if (eventTarget === $inputs.$emailInput || eventTarget === $inputs.$nicknameInput || eventTarget === $inputs.$passwordInput) {
            // 에러 메시지 표기
            eventTarget.closest('.form-control').querySelector('small').classList.remove('error'); // display를 none에서 inline으로
            eventTarget.closest('.form-control').querySelector('small').textContent = '';
        }

        // 버그 발생
        // // 해당 input 태그가 email이나 nickname일 경우 (span과 i 태그 조절)
        // if (eventTarget === $inputs.$passwordInput) {
        //     // 모든 span 과 i의 ui를 초록색으로 변경
        //     const $passwordValidationI = [...document.querySelectorAll('.password-field-desc i')];
        //     const $passwordValidationSpan = [...document.querySelectorAll('.password-field-desc span')];
        //     $passwordValidationSpan.forEach($span => {
        //         $span.classList.remove('error');
        //         $span.classList.add('success');
        //         $span.previousElementSibling.classList.add('fa-regular', 'fa-circle-check', 'success'); // 인접 i 태그(아이콘)
        //         $span.previousElementSibling.classList.remove('fa-solid', 'fa-circle-xmark', 'error');
        //     });
        // }

        // 어던 input 이던 공통사항 : input 박스 테두리를 빨갛게
        eventTarget.closest('.form-control').querySelector('input').classList.remove('error');
        eventTarget.closest('.form-control').querySelector('input').classList.add('success');
    }
}

async function handleAllUserDataValidation(event) {

    //  yup library 사용 방법 3) 스키마 검증 대상 정의
    const formData = {
        email: $inputs.$emailInput.value,
        nickname: $inputs.$nicknameInput.value,
        password: $inputs.$passwordInput.value
    };

    /**
     *yup 라이브러리로 검증
     @Param event 이 함수는 $form 태그의 submit 이벤트가 발생하면 호출됨
     @Param formData 어떤 필드에 대해서 검색할 것인지 알려주기
     */
    const signupValidator = new Validator('signup');
    const response = await signupValidator.validateAllUserData(event, formData, 'signup');
    console.log(response);
    // yup 라이브러리에서 아래 형식으롣 답변 전달하면, 맞춰서 ui 바꿔주기
    /* {
        email : {valid: false, errors {[이메일을 입력해주세요]}}
        nickname : {valid: false, errors {[에러메시지]}}
        password : {valid: false, errors {[에러메시지]}}
    }
     */
    // email, nickname, password의 yup 유효성 검증에 실패했으면
    if (!response.email.valid) {
        updateValidationUI($inputs.$emailInput, false, response.email.errors);
    }
    if (!response.nickname.valid) {
        updateValidationUI($inputs.$nicknameInput, false, response.nickname.errors);
    }
    if (!response.password.valid) {
        updateValidationUI($inputs.$passwordInput, false, response.password.errors);
    }

    // 커서 위치를 error가 있는 가장 처음 input으로 이동
    const $errorInputs = [...document.querySelectorAll('input.error')];
    console.log($errorInputs);
    if ($errorInputs.length > 0) {
        const $firstErrorInput = $errorInputs[0]
        $firstErrorInput.focus();
        const valueLength = $firstErrorInput.value.length;
        $firstErrorInput.setSelectionRange(0, valueLength);
    }

}

async function handleUserDataValidation(event) {

    //  yup library 사용 방법 3) 스키마 검증 대상 정의
    const formData = {
        email: $inputs.$emailInput.value,
        nickname: $inputs.$nicknameInput.value,
        password: $inputs.$passwordInput.value
    };

    /**
     *yup 라이브러리로 검증
     @Param e 이 함수는 input 태그체 input 이벤트가 발생하면 호출됨
     @Param formData 어떤 필드에 대해서 검색할 것인지 알려주기
     */
    const signupValidator = new Validator('signup');
    const {valid, errors, result} = await signupValidator.validateUserData(event, formData);
    // dvalid 여부에 따라 UI 업데이트
    updateValidationUI(event.target, valid, errors);
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// # 각 input에 input 이벤트 걸기 (자세한 이벤트 구현내용은 handlerUserDataValidation 함수에서 구현)
function initValidation() {
    const debouncedValidation = debounce(handleUserDataValidation, 500); // 0.5초 대기

    // input 이벤트 발생했을 때
    Object.values($inputs).forEach($input => $input.addEventListener('input', (e) => debouncedValidation(e)));

    // form이 submit 되었을 때
    $form.addEventListener('submit', handleSubmit);
}

// # caps lock 키 누를 떄
function handlePressCapsLock(e) {

    const {$passwordInput} = $inputs;
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

    const {$passwordInput} = $inputs;
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
        new Event("keydown", {bubbles: true, cancelable: true})
    );
}

// # 화면 초기 진입 시 진행할 이벤트 핸들러
function initSignup(e) {

    const {$nicknameInput, $passwordInput, $emailInput, $profileImageInput} = $inputs;

    // profile 사진 설정(=input[type="file"]의 change  이벤트 발생) 하면 사진 파일을 가지고 있고 + 사진을 preview로 띄우는 이벤트
    $profileImageInput.addEventListener('change', handleProfileImageUpload);
    // 이메일 input에 autofocus 되도록 하는 이벤트
    $emailInput.focus();
    // 이메일, 닉네임, 패스워드 validation 함수
    initValidation();
    // 비밀번호 표시/숨기기 관련 함수
    togglePasswordDisplay();
    // input 태그에 input이나 focus 이벤트 발생하면 Caps lock 활성화 상태 확인하는 함수를 쓰고 싶은데,
    // caps losk 활성화 상태 확인 함수는 key press  이벤트가 발생했을 때만 확인 가능
    //  -> 임의로 keypress 이벤트를 생성하는 함수
    $passwordInput.addEventListener('input', triggerKeyPressHandler);
    $passwordInput.addEventListener('keydown', handleCapsLockOn);
    $passwordInput.addEventListener('keydown', handlePressCapsLock);

}

// =================== 초기 화면 진입 시 실행 =================== //
document.addEventListener('DOMContentLoaded', initSignup);


