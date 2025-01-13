// const form = document.getElementById("form");
// const username = document.getElementById("username");
// const email = document.getElementById("email");
// const password = document.getElementById("password");
// const password2 = document.getElementById("password2");
//
// function showError(input, message) {
//     const formControl = input.parentElement;
//     formControl.className = "form-control error";
//     let small = formControl.querySelector("small");
//     small.innerText = message;
// }
//
// function showSuccess(input) {
//     const formControl = input.parentElement;
//     formControl.className = "form-control success";
// }
//
// function checkEmail(input) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (re.test(input.value)) {
//         showSuccess(input);
//     } else {
//         showError(input, "Email is not valid");
//     }
// }
//
// function checkRequired(inputArr) {
//     inputArr.forEach(function(input) {
//         if (input.value === "") {
//             showError(input, `${getFieldName(input)} is required`);
//         } else {
//             showSuccess(input);
//         }
//     });
// }
//
// function checkPasswordsMatch(password1, password2) {
//     if (password1.value !== password2.value) {
//         showError(password2, "Password do not match");
//     }
// }
//
// function checkLength(input, min, max) {
//     if (input.value.length <= min) {
//         showError(
//             input,
//             `${getFieldName(input)} must be more than ${min} characters`
//         );
//     } else if (input.value.length >= max) {
//         showError(
//             input,
//             `${getFieldName(input)} must be less than ${max} characters`
//         );
//     } else {
//         showSuccess(input);
//     }
// }
//
// function getFieldName(input) {
//     return input.id.charAt(0).toUpperCase() + input.id.slice(1);
// }
//
// form.addEventListener("submit", function(e) {
//     e.preventDefault();
//
//     checkRequired([username, email, password, password2]);
//     checkLength(username, 3, 15);
//     checkLength(password, 6, 25);
//     checkEmail(email);
//     if (password2.value !== "") {
//         checkPasswordsMatch(password, password2);
//     }
// });

// ================ 전역 변수 ================== //
// # DOM 요소 기타
const $elements = {
    // 회원가입 성공 모달 외 다른 부분 전체
    $main: document.querySelector('.main'),
}
const $profileImage = {
    // 사진 미리보기
    $profileImagePreview: document.querySelector('.pic-preview'),
    // 사진 선택 전
    $profilePicHolder: document.querySelector('.pic-holder'),
    // 카메라 아이콘 + 프로필 선택하세요 이미지의 부모 요소
    $textCenter : document.querySelector('.text-center'),
    $uploadFileBlock : document.querySelector('.upload-file-block')
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
    $profileImageInput : $form.querySelector('input[type="file"][name="profile-image"]'),
    $emailInput : $form.querySelector('input[type="text"][name="email"]'),
    $nicknameInput : $form.querySelector('input[type="text"][name="nickname"]'),
    $passwordInput : $form.querySelector('input[type="password"][name="password"]')
}

// ========== 일반 함수 =========== //
// # 회원가입 성공 시, 성공했다고 알림을 띄어주고 메인 페이지로 이동
function showSuccessModalAndRedirect() {
    // 회원가입 성공 알림 모달 띄우고, 메인 내용 div 숨기기
    $signUpSuccessModal.$successModal.style.display = 'block';
    $elements.$main.style.display = 'none';

    // 3초 후 로그인 페이지로 리디렉션
    const redirectTimeout = setTimeout(function() {
        window.location.href = '/login';
    }, 3000);

    // 모달 닫기 버튼 클릭 시 즉시 리디렉션
    $signUpSuccessModal.$signUpModalCloseBtn.addEventListener('click', function() {
        clearTimeout(redirectTimeout); // 타이머 지우기
        window.location.href = '/login'; // 즉시 리디렉션
    });

}

// ================ 이벤트 핸들러 함수 ================ //
// # 회원가입 시 필요한 FormData 형식의 payload 만드는 이벤트 핸들러
//  - 화면 초기 진입시 INITsIGNUP 함수 호출 -> INITSIGNUP은 handleSubmit 호출 -> handleSubmit는 createPayload() 호출
function createPayload(e) {
    // deconstructuring
    const { $profileImageInput, $emailInput, $nicknameInput, $passwordInput } = $inputs;

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
    formData.append('newUserData', new Blob([JSON.stringify(newUserData)], { type: 'application/json' }));
    // 이미지 파일의 경우, 선택된 경우에만 formData에 추가
    if (profileImageFiles && profileImageFiles.length > 0) {
        profileImageFiles.forEach(profileImage => formData.append('profileImage', profileImage));
    }

    return formData;
}

// # 화면 초기 진입시 INITsIGNUP 함수 호출 -> INITSIGNUP은 handleSubmit 호출 -> handleSubmit는 createPayload() 호출 -> createpayload()에서 전달값 받아서 서버에 회원등록 위한 fetch
async function fetchToSignUp(formData) {
    const response = await fetch("api/auth/sign-up", {
        method: 'POST',
        body: formData
    });
    const data = await response.json();

    // 제대로 아이디가 만들어 졌으면,
    if (response.ok) {
        // 회원가입 성공 모달 표시하고, 로그인 페이지로 리디렉션
        showSuccessModalAndRedirect();
    } else {
        console.log("실패");
    }
}

// # 회원가입 버튼 누를 시 진행할 이벤트 핸들러(payload 만들고, 서버에 전달)
//  - 초기 화면 진입 시 DOMContentloaded 이벤트로 initSignup 함수 호출됨 -> initSignup 함수가 handleSubmit 함수 호출
async function handleSubmit(e) {

    // submit input의 기본 기능인 새로고침 방지
    e.preventDefault();

    // 서버에 보낼 데이터를 객체 형태로 반환
    const payload = createPayload();

    // 서버에 데이터 보내며 회원가입 처리 요청
    const  data = fetchToSignUp(payload);

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
    $profileImage.$uploadFileBlock.addEventListener('mouseout', function() {
        $profileImage.$textCenter.classList.add('hide');
    });
    $profileImage.$uploadFileBlock.addEventListener('mouseover', function() {
        $profileImage.$textCenter.classList.remove('hide');
    });
}


// # 화면 초기 진입 시 진행할 이벤트 핸들러
function initSignup(e) {
    // profile 사진 설정(=input[type="file"]의 change  이벤트 발생) 하면 사진 파일을 가지고 있고 + 사진을 preview로 띄우는 이벤트
    $inputs.$profileImageInput.addEventListener('change', handleProfileImageUpload);
    // 회원가입 form 제출 이벤트
    $form.addEventListener('submit', handleSubmit);
}

// =================== 초기 화면 진입 시 실행 =================== //
document.addEventListener('DOMContentLoaded', initSignup);
document.addEventListener('click', function (e) {
    console.log(e.target);
});


