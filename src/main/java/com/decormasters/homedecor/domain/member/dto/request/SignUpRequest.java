package com.decormasters.homedecor.domain.member.dto.request;

import com.decormasters.homedecor.domain.member.entitiy.Member;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Setter @Getter @ToString
@Builder @AllArgsConstructor @NoArgsConstructor
@EqualsAndHashCode
public class SignUpRequest {

    /* [이메일 검증 : 아래 정규식 + not null]

        (?=.{1,64}@)            # local-part min 1 max 64
        [A-Za-z0-9_-]+          # Start with chars in the bracket [ ], one or more (+)
                                # dot (.) not in the bracket[], it can't start with a dot (.)
        (\\.[A-Za-z0-9_-]+)*	 # follow by a dot (.), then chars in the bracket [ ] one or more (+)
                                # * means this is optional
                                # this rule for two dots (.)
        @                       # must contains a @ symbol
        [^-]                    # domain can't start with a hyphen (-)
        [A-Za-z0-9-]+           # Start with chars in the bracket [ ], one or more (+)
        (\\.[A-Za-z0-9-]+)*      # follow by a dot (.), optional
        (\\.[A-Za-z]{2,})       # the last tld, chars in the bracket [ ], min 2

     */
    @NotBlank(message = "이메일을 입력해주세요")
    @Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$",
            message = "유효한 이메일을 입력해주세요")
    private String email;

    // 비밀번호 검증 : not null, 영문혹은 한글 포함, 숫자 포함, 아랍어 등 제외, 8자 이상
    @NotBlank(message = "비밀번호를 입력해주세요")
    @Pattern(regexp = ".*[a-zA-Z].*", message = "비밀번호는 영문자를 포함해야 합니다")
    @Pattern(regexp = "^[a-zA-Z0-9!@#]*$", message = "비밀번호는 영문자, 숫자 및 !, @, #만 포함해야 합니다")
    @Pattern(regexp = ".*\\d.*", message = "비밀번호는 숫자를 포함해야 합니다")
    @Size(min=8, message = "비밀번호는 8자 이상이어야 합니다")
    public String password;


    // 닉네임 검증 : not null, 한글/영문/숫자만 포함(특수문자 안 됨)
    @NotBlank(message = "닉네임을 입력해주세요")
    @Pattern(regexp = "^[가-힣a-zA-Z0-9-_]*$", message = "닉네임은 한글, 영문자, 숫자 및 '_'와 '-'만 포함해야 합니다")
    @Pattern(regexp = "^.{2,10}$", message = "닉네임은 2자에서 10자 이내여야 합니다")
    private String nickname;


    // null 가능
    private String imageUrl;

    public Member toEntity() {

        return Member.builder()
                .email(email)
                .password(password)
                .nickname(nickname)
                .imageUrl(imageUrl)
                .build();
    }
//    // 클라이언트가 전송한 입력값들을 엔터티로 변환
//    public Member toEntity() {
//
//        // 이메일과 휴대전화번호를 구분해서 처리
//        String email = null;
//        String phone = null;
//
//        if (this.emailOrPhone.contains("@")) {
//            email = this.emailOrPhone;
//        } else {
//            // 010-1234-7890 => 전화번호에있는 특수기호를 모두제거
//            phone = this.emailOrPhone.replaceAll("[^0-9]", "");
//        }
//
//        return Member.builder()
//                .email(email)
//                .phone(phone)
//                .username(this.username)
//                .name(this.name)
//                .password(this.password)
//                .build();
//    }

}
