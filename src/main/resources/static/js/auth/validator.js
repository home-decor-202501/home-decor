// yup library 사용 방법 1)  의존성 추가
import * as yup from 'https://cdn.jsdelivr.net/npm/yup@0.32.11/+esm'

class Validator {
    constructor() {
        this.initializeCustomizedYup();
        this.schema = this.createSchema();
    }

    initializeCustomizedYup() {
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
                excludeEmptyString: false // 빈 문자열 포함
            })
        });

        // "닉네임은 한글, 영문자, 숫자 및 '_'와 '-'만 포함해야 합니다
        const customNickNameRegex = "^[가-힣a-zA-Z0-9-_]*$";
        yup.addMethod(yup.string, 'customNickname', function (errorMessage) {
            return this.matches(customNickNameRegex, {
                message: errorMessage || '닉네임은 한글, 영문자, 숫자 및 \'_\'와 \'-\'만 포함해야 합니다.', // 검증 실패 시 출력할 오류 메시지
                name: 'customNickname', // 검증 메소드의 이름
            })
        });

        //  "비밀번호는 영문자를 포함해야 합니다"
        const customPasswordIncludeAlphaBetRegex = ".*[a-zA-Z].*";
        yup.addMethod(yup.string, 'customPasswordIncludeAlphaBet', function (errorMessage) {
            return this.matches(customPasswordIncludeAlphaBetRegex, {
                message: errorMessage || '영문자 포함', // 검증 실패 시 출력할 오류 메시지
                name: 'customPasswordIncludeAlphaBet', // 검증 메소드의 이름
            })
        });

        //  "비밀번호는 숫자를 포함해야 합니다"
        const customPasswordIncludeNumberRegex = ".*\\d.*";
        yup.addMethod(yup.string, 'customPasswordIncludeNumber', function (errorMessage) {
            return this.matches(customPasswordIncludeNumberRegex, {
                message: errorMessage || '숫자 포함', // 검증 실패 시 출력할 오류 메시지
                name: 'customPasswordIncludeNumber', // 검증 메소드의 이름
            })
        });

        // "비밀번호는 영문자, 숫자 및 !, @, #만 포함해야 합니다"
        const customPasswordExcludeSpecialLetterRegex = "^[a-zA-Z0-9!@#]*$";
        yup.addMethod(yup.string, 'customPasswordExcludeSpecialLetter', function (errorMessage) {
            return this.matches(customPasswordExcludeSpecialLetterRegex, {
                message: errorMessage || '영문, 숫자, !, @, # 만 허용(공백 및 이외 특수문자 불가)', // 검증 실패 시 출력할 오류 메시지
                name: 'customPasswordExcludeSpecialLetter', // 검증 메소드의 이름
            })
        });

    } // end of initializeCustomizedYup


    createSchema() {
        /*
            yup library 사용 방법 4) 검증 조건 정의
              - yup.object() : 객체 정의
              - shape() : 조건 정의
        */
        return yup.object().shape({
            // 이메일 검증 조건 : 앞뒤 공백 금지, 공란 금지, 정규식 유효성 검사
            email: yup.string().required("이메일을 입력해주세요").customEmail()
                .test( 'no-spaces', '공백 포함 불가', value => !/\s/.test(value) )
                .test('email-exists'
                    , '이미 존재하는 이메일입니다.'
                    , async value => {
                        const response = await fetch(`/api/auth/check-email?email=${value}`);
                        const data = await response.json(); // 아이디가 있으면 true, 없으면 false 반환
                        return data.flag ? false : true;
                    }
                ),
            // 닉네임 검증 조건 :  앞뒤 공백 금지, 공란 금지,
            nickname: yup.string()
                .required('닉네임을 입력해주세요').min(2, '닉네임은 2자 이상이여야 합니다.').max(10, '닉네임은 10자 이하여야 합니다.')
                .customNickname()
                .test( 'no-spaces', '공백 포함 불가', value => !/\s/.test(value) )
                .test('nickname-exists'
                        , '이미 존재하는 닉네임입니다.'
                        , async value => {
                            const response = await fetch(`/api/auth/check-nickname?nickname=${value}`);
                            const data = await response.json(); // 아이디가 있으면 true, 없으면 false 반환
                            return data.flag ? false : true;
                        }
                ),
            password: yup.string()
                .required("8글자 이상").min(8, "8글자 이상")
                .customPasswordIncludeAlphaBet().customPasswordIncludeNumber().customPasswordExcludeSpecialLetter()
                .test( 'no-spaces', '영문, 숫자, !, @, # 만 허용(공백 및 이외 특수문자 불가)', value => !/\s/.test(value) )
        })
    } // end of createSchema()

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
    async validateUserData(event, formData) {
        // event.target으로 어떤 input 태그에 대한 이벤트 발생인지 가져오기 (그 input 태그에 대해서만 유효성 검사 실행할 것임)
        const $selectedInput = event.target;
        const $selectedInputValue = $selectedInput.value;
        const $emailInput = document.querySelector('input[type="text"][name="email"]');
        const $nicknameInput = document.querySelector('input[type="text"][name="nickname"]');
        const $passwordInput= document.querySelector('input[name="password"]');
        let selectedField = null;

        if ($selectedInput === $emailInput) {
            selectedField = 'email';
        } else if ($selectedInput === $nicknameInput) {
            selectedField = 'nickname';
        } else if ($selectedInput === $passwordInput) {
            selectedField = 'password';
        }

        // 필드별로 abortEarly 옵션 설정
        const fieldName = event.target.name;
        const options = {
            email: { abortEarly: true },
            nickname: { abortEarly: true },
            password: { abortEarly: false }
        };

        try {
            await this.schema.validateAt(selectedField, { [selectedField]: $selectedInputValue }, options[fieldName]);
            return { valid: true, result: $selectedInput };
        } catch (error) {
            return { valid: false, errors: error.errors };
        }
    }

    async validateAllUserData(event, formData) {

        const $emailInput = document.querySelector('input[type="text"][name="email"]');
        const $nicknameInput = document.querySelector('input[type="text"][name="nickname"]');
        const $passwordInput= document.querySelector('input[name="password"]');

        // 검솨 결과를 담을 객체
        const validationResult = {
            email: { valid: false, errors: [] }
            , nickname: { valid: false, errors: [] }
            , password: { valid: false, errors: [] }
        };

        // 필드별로 검사 실행
        try {
            await this.schema.validateAt('email', {email: $emailInput.value}, {abortEarly: true});
            validationResult.email.valid = true;
        } catch (error) {
            validationResult.email.errors = [error.errors];
        }

        try {
            await this.schema.validateAt('nickname', { nickname: $nicknameInput.value }, { abortEarly: true });
            validationResult.nickname.valid = true;
        } catch (error) {
            validationResult.nickname.errors = [error.errors];
        }

        try {
            await this.schema.validateAt('password', { password: $passwordInput.value }, { abortEarly: false });
            validationResult.password.valid = true;
        } catch (error) {
            validationResult.password.errors = [error.errors];
        }
        return validationResult;
    }
}


export default new Validator();



