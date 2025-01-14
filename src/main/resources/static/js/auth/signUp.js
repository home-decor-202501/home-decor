// yup library 사용 방법 1)  의존성 추가
import * as yup from 'https://cdn.jsdelivr.net/npm/yup@0.32.11/+esm'


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
    $passwordInput: $form.querySelector('input[type="password"][name="password"]')
}

// ========== 일반 함수 =========== //
// # 회원가입 성공 시, 성공했다고 알림을 띄어주고 메인 페이지로 이동
function showSuccessModalAndRedirect() {
    // 회원가입 성공 알림 모달 띄우고, 메인 내용 div 숨기기
    $signUpSuccessModal.$successModal.style.display = 'block';
    $elements.$main.style.display = 'none';

    // 3초 후 로그인 페이지로 리디렉션
    const redirectTimeout = setTimeout(function () {
        window.location.href = '/login';
    }, 3000);

    // 모달 닫기 버튼 클릭 시 즉시 리디렉션
    $signUpSuccessModal.$signUpModalCloseBtn.addEventListener('click', function () {
        clearTimeout(redirectTimeout); // 타이머 지우기
        window.location.href = '/login'; // 즉시 리디렉션
    });
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


function handleUserDataValidation(e) {
    console.log(e.target);
    console.log(e.target.value);

    /* yup library 사용 방법 2) 필요 시 검증 조건 customize
   - yup.addMethod() : yup에 customized 유효성 검증 메소드를 추가하는 함수
   - @Param yup.string : 커스텀 메소드를 추가할 스키마 유형(문자열 타입 스키마)
   - @Param customEmail : 추가할 커스텀 메소드 이름
   - @Param 3번째 인자 : 커스텀 메소드가 구현할 내용을 정리
   - this.matches()는 yup의 내부 함수로, 문자열이 정규식과 일치하는지 확인함
    */
    //이메일 형식 검증
    const customEmailRegex = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
    yup.addMethod(yup.string, 'customEmail', function (errorMessage) {
        return this.matches(customEmailRegex, {
            message: errorMessage || '유효한 이메일 형식이 아닙니다.', // 검증 실패 시 출력할 오류 메시지
            name: 'customEmail', // 검증 메소드의 이름
            excludeEmptyString: true // 빈 문자열을 제외
        })
    });

// "닉네임은 한글, 영문자, 숫자 및 '_'와 '-'만 포함해야 합니다
    const customNickNameRegex = "^[가-힣a-zA-Z0-9-_]*$";
    yup.addMethod(yup.string, 'customNickname', function (errorMessage) {
        return this.matches(customNickNameRegex, {
            message: errorMessage || '닉네임은 한글, 영문자, 숫자 및 \'_\'와 \'-\'만 포함해야 합니다.', // 검증 실패 시 출력할 오류 메시지
            name: 'customNickname', // 검증 메소드의 이름
            excludeEmptyString: true // 빈 문자열을 제외
        })
    });

//  "비밀번호는 영문자를 포함해야 합니다"
    const customPasswordIncludeAlphaBetRegex = ".*[a-zA-Z].*";
    yup.addMethod(yup.string, 'customPasswordIncludeAlphaBet', function (errorMessage) {
        return this.matches(customPasswordIncludeAlphaBetRegex, {
            message: errorMessage || '비밀번호는 영문자를 포함해야 합니다.', // 검증 실패 시 출력할 오류 메시지
            name: 'customPasswordIncludeAlphaBet', // 검증 메소드의 이름
            excludeEmptyString: true // 빈 문자열을 제외
        })
    });

//  "비밀번호는 숫자를 포함해야 합니다"
    const customPasswordIncludeNumberRegex = ".*\\d.*";
    yup.addMethod(yup.string, 'customPasswordIncludeNumber', function (errorMessage) {
        return this.matches(customPasswordIncludeNumberRegex, {
            message: errorMessage || '비밀번호는 숫자를 포함해야 합니다.', // 검증 실패 시 출력할 오류 메시지
            name: 'customPasswordIncludeNumber', // 검증 메소드의 이름
            excludeEmptyString: true // 빈 문자열을 제외
        })
    });

// "비밀번호는 영문자, 숫자 및 !, @, #만 포함해야 합니다"
    const customPasswordExcludeSpecialLetterRegex = "^[a-zA-Z0-9!@#]*$";
    yup.addMethod(yup.string, 'customPasswordExcludeSpecialLetter', function (errorMessage) {
        return this.matches(customPasswordExcludeSpecialLetterRegex, {
            message: errorMessage || '비밀번호는 영문자, 숫자 및 !, @, #만 포함해야 합니다.', // 검증 실패 시 출력할 오류 메시지
            name: 'customPasswordExcludeSpecialLetter', // 검증 메소드의 이름
            excludeEmptyString: true // 빈 문자열을 제외
        })
    });

//  yup library 사용 방법 3) 스키마 검증 대상 정의
    const formData = {
        email: $inputs.$emailInput.value,
        nickname: $inputs.$nicknameInput.value,
        password: $inputs.$passwordInput.value
    };

    /*
     yup library 사용 방법 4) 검증 조건 정의
         - yup.object() : 객체 정의
         - shape() : 조건 정의
     */
    const schema = yup.object().shape({

        // 이메일 검증 조건 : 앞뒤 공백 금지, 공란 금지, 정규식 유효성 검사
        email: yup.string().trim('공백을 포함할 수 없습니다').required("이메일을 입력해주세요").customEmail(),

        // 닉네임 검증 조건 :  앞뒤 공백 금지, 공란 금지,
        nickname: yup.string()
            .trim('공백을 포함할 수 없습니다').required('닉네임을 입력해주세요').min(2, '닉네임은 2자 이상이여야 합니다.').max(10, '닉네임은 10자 이하여야 합니다.')
            .customNickname(),

        password: yup.string()
            .trim('공백을 포함할 수 없습니다').required("비밀번호를 입력해주세요").min(8, "비밀번호는 최소 8글자 이상이어야 합니다")
            .customPasswordIncludeAlphaBet().customPasswordIncludeNumber().customPasswordExcludeSpecialLetter()
    })

    /*
        yup library 사용 방법 5. 검증실행
         schema
             .validate(formData, { abortEarly: false })
             .then(valid => {
                 console.log("성공", valid)
             })
             .catch(err => {
                  console.log("실패입니다:", err.errors);
              });

     */
    schema
        .validate(formData, {abortEarly: false})
        .then(valid => {
            console.log("성공", valid)
        })
        .catch(err => {
            console.log("실패입니다:", err.errors);
        });


}


// # 각 input에 input 이벤트 걸기 (자세한 이벤트 구현내용은 handlerUserDataValidation 함수에서 구현)
function initValidation() {
    Object.values($inputs).forEach($input => $input.addEventListener('input', (e) => handleUserDataValidation(e)));
}

// # 화면 초기 진입 시 진행할 이벤트 핸들러
function initSignup(e) {
    // profile 사진 설정(=input[type="file"]의 change  이벤트 발생) 하면 사진 파일을 가지고 있고 + 사진을 preview로 띄우는 이벤트
    $inputs.$profileImageInput.addEventListener('change', handleProfileImageUpload);
    // 회원가입 form 제출 이벤트
    $form.addEventListener('submit', handleSubmit);
    // 이메일 input에 autofocus 되도록 하는 이벤트
    $inputs.$emailInput.focus();
    // 이메일, 닉네임, 패스워드 validation 함수
    initValidation();
}

// =================== 초기 화면 진입 시 실행 =================== //
document.addEventListener('DOMContentLoaded', initSignup);

