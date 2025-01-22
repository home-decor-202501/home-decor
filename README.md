
# 오늘의 집 클론 Project

💡 프로젝트 개요: 사용자들이 자신의 인테리어 디자인을 공유하고 자랑할 수 있는 플랫폼을 만드는 프로젝트

## 1. Git Repository
📁 https://github.com/home-decor-202501/home-decor

## 2. 프로젝트 기간: 25/01/06 ~ 25/01/24
![img.png](img.png)

## 3. 👥 프로젝트 멤버 및 역할
#### 1) 김미정 (팀장)  [![GitHub Badge](https://img.shields.io/badge/mjkim41-FF69B4?logo=github&logoColor=white&labelColor=FF69B4)](https://github.com/mjkim41)
- 역할: 회원가입/로그인 페이지 개발, Github 세팅, GitHub ReadMe 작성

#### 2) 오인혁 [![GitHub Badge](https://img.shields.io/badge/inhyeokoh-FF69B4?logo=github&logoColor=white&labelColor=FF69B4)](https://github.com/inhyeokoh)
- 역할: 게시글 상세보기 페이지 개발, ERD 작성, 프로젝트 발표

#### 3) 윤희원 [![GitHub Badge](https://img.shields.io/badge/hee123hee-FF69B4?logo=github&logoColor=white&labelColor=FF69B4)](https://github.com/hee123hee)
- 역할: 메인페이지 개발, 게시글 쓰기 페이지 개발

#### 4) 박찬의  [![GitHub Badge](https://img.shields.io/badge/parkchenui-FF69B4?logo=github&logoColor=white&labelColor=FF69B4)](https://github.com/parkchenui)
- 역할: 내 글 보기 페이지
  <br><br>


## 4. ⚙️ Tech Stack with Too
<div style="display: flex; flex-wrap: wrap; gap: 10px;">

#### Frontend Technologies
![HTML5](https://img.shields.io/badge/HTML5-E44D26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JS ES11](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

#### Backend Technologies
![Java 17](https://img.shields.io/badge/Java%2017-007396?style=flat&logo=java&logoColor=white)
![Spring](https://img.shields.io/badge/Spring%203.3.6-6DB33F?style=flat&logo=spring&logoColor=white)
![MyBatis](https://img.shields.io/badge/MyBatis-FF0000?style=flat&logo=mybatis&logoColor=white)

#### Database
![MariaDB](https://img.shields.io/badge/MariaDB-003B57?style=flat&logo=mariadb&logoColor=white)

#### Libraries
![Yup (유효성 검증)](https://img.shields.io/badge/Yup%20(유효성%20검증)-E6A400?style=flat&logo=yup&logoColor=white)


#### Development Tools
![IntelliJ](https://img.shields.io/badge/IntelliJ-000000?style=flat&logo=intellij-idea&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-02303A?style=flat&logo=gradle&logoColor=white)

#### Operating Systems
![Windows](https://img.shields.io/badge/Windows-00A4EF?style=flat&logo=windows&logoColor=white)

#### Version Control
![Git](https://img.shields.io/badge/Git-F1502F?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-211F1F?style=flat&logo=github&logoColor=white)

#### Communication Tools
![Slack](https://img.shields.io/badge/Slack-4A154B?style=flat&logo=slack&logoColor=white)



## 5. 📸 시연
####  1) 📝 회원가입 페이지(김미정)
- 사용자 경험(ux) 에 초점을 둔 회원가입 페이지<br>
  (페이지 로드 시 첫번째 입력필드로
  자동 이동, 실시간 입력정보 유효성 검사, Caps Lock 감지, 회원가입에 실패할 시
  입력값 오류 발생 필드로 자동 이동)<br>
  ![](https://velog.velcdn.com/images/kimmy25312/post/ddb0c4bb-f6c0-4aa1-a26d-70b138f8145b/image.gif)
  <br>

#### 2) 🔑️‍ 로그인 페이지(김미정)
- 사용자 경험(ux) 에 초점을 둔 로그인<br>
  (이전 로그인 아이디 자동 저장, 로그인 실패 시
  비밀번호 설정 조건 알림, Caps Lock 감지, 로그인에 실패할 시
  입력값 오류 발생 필드로 자동 이동)<br>
  ![](https://velog.velcdn.com/images/kimmy25312/post/f21a640b-0967-43ad-b6de-fbad17274fc4/image.gif)
  <br>


#### 3) 🏠 메인 페이지(윤희원)

<br>

#### 4) ✍️ 게시글 쓰기 페이지(윤희원)

<br>

#### 5) 📋 게시글 상세보기 페이지(오인혁)
<br>

## 6. ✅ 트러블 슈팅
**[회원가입(김미정)]**<br>
🔍 문제점 : 회원 가입 시 유효성 검증 결과에 각 입력필드(이메일, 닉네임, 비밀번호 필드)의 UI를 업데이트 하고자 하였는데, 프론트와 백엔드 각각 나누어서 순서대로 검증이 이루어지다보니 프론트 검증 실패 후 백엔드 검증 성공 시 검증 성공 시의 UI가 반영되는 문제
<br>
![img_1.png](img_1.png) <br>
💡 해결방안 : 프론트엔드와 백엔드 각각에서 유효성 검사 실패 시 input 태그에 error 클래스 붙임<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ 백엔드 유효성 검사까지 끝난 후, error 클래스가 붙은 input 태그와 그렇지 않은 태그로 구분하여 UI 업데이트
<br><br>
**[(오인혁)]**<br>
🔍 문제점 : <br>
💡 해결방안 :
<br><br>
**[(윤희원)]**<br>
🔍 문제점 : <br>
💡 해결방안 :
<br><br>


## 7. 🧠️ 느낀 점
**[김미정]**<br>
- 개발 진행 속도가 더디어 정작 중요한 기능(아이디/비밀번호 찾기, 회원가입 시 이메일 인증, 소셜로그인)은 개발하지 못해서 아쉬움 <br>
- 유효성 검증 라이브러리(yup)를 써보면서, 처음 써보는 라이브러리의 사용 방법을 스스로 익혀보는 시간을 가진 것은 유의미했음 <br>

**[오인혁]**<br>
-  <br>

**[윤희원]**<br>
- <br>
