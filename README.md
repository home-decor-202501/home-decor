--- 업데이트 용 commit ---
# 오늘의 집 클론 Project

💡 프로젝트 개요: 사용자들이 자신의 인테리어 디자인을 공유하고 자랑할 수 있는 플랫폼을 만드는 프로젝트


## 1. Git Repository
📁 https://github.com/home-decor-202501/home-decor

## 2. 프로젝트 기간: 25/01/06 ~ 25/01/24
![img.png](img.png)

## 3. 👥 프로젝트 멤버 및 역할
#### 1) 김미정 (팀장)  [![GitHub Badge](https://img.shields.io/badge/mjkim41-FF69B4?logo=github&logoColor=white&labelColor=FF69B4)](https://github.com/mjkim41)
- 역할: 회원가입/로그인 페이지, 인가, Github 세팅, Github Readme 작성

#### 2) 오인혁 [![GitHub Badge](https://img.shields.io/badge/inhyeokoh-FF69B4?logo=github&logoColor=white&labelColor=FF69B4)](https://github.com/inhyeokoh)
- 역할: 게시글 상세보기 페이지, 메인페이지 게시글 렌더링, ERD 작성

#### 3) 윤희원 [![GitHub Badge](https://img.shields.io/badge/hee123hee-FF69B4?logo=github&logoColor=white&labelColor=FF69B4)](https://github.com/hee123hee)
- 역할: 메인페이지 프론트엔드, 게시글 쓰기, 프로젝트 발표

#### 4) 박찬의  [![GitHub Badge](https://img.shields.io/badge/parkchenui-FF69B4?logo=github&logoColor=white&labelColor=FF69B4)](https://github.com/parkchenui)
  <br>


## 4. ⚙️ Tech Stack with Tools
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
✔️ 최소한의 정보 입력으로 간편 회원가입<br>
✔️ 프로필 사진 설정 : 자신의 개성과 스타일을 표현하는 것을 즐기는 타켓 고객의 성향 반영<br>
✔️ UX 향상 기능 제공 : 페이지 진입시 첫번째 필수 입력 필드에 자동 포커스, 회원가입 실패 시 잘못 입력 된 필드로 자동 이동<br>
  ![](https://velog.velcdn.com/images/kimmy25312/post/ddb0c4bb-f6c0-4aa1-a26d-70b138f8145b/image.gif)
  <br>

#### 2) 🔑️‍ 로그인 페이지(김미정)
✔️  로그인 후 인증 방식 : JWT 토큰 기반<br>
✔️ 편리한 UX 제공 : 아이디 자동 저장, Caps Lock 감지 등
  ![](https://velog.velcdn.com/images/kimmy25312/post/f21a640b-0967-43ad-b6de-fbad17274fc4/image.gif)
  <br>


#### 3) 🏠 메인 페이지(오인혁, 윤희원)
✔️  html, css, js를 활용해 메인 페이지 레이아웃 및 디자인 작업 구현<br>
✔️ SQL 쿼리 정의(CRUD 작업) : 게시물 등록(INSERT), 게시물 데이터 조회(SELECT)
<br>

#### 4) ✍️ 게시글 쓰기 페이지(윤희원)
✔️  편리한 UI / UX 제공 : 드래그 앤 드롭, 캐러셀(인디케이터, 슬라이드 이동 등) <br>
✔️ 모달 스텝 이동 및 API 요청
- step1: 이미지 업로드
- step2: 미리보기
- step3: 공유하기(업로드한 파일을 FormData로 변환 후 서버 전송)
![](https://velog.velcdn.com/images/kimmy25312/post/983a85a8-5a98-424d-8083-ab0dceefbda6/image.gif)
<br>

#### 5) 📋 게시글 상세보기 페이지(오인혁)
✔️  이미지에 집중된 심플한 디자인 : 세세한 글 보다 집 내부 이미지에 집중할 수 있도록 이미지를 크게 배치
<br>

## 6. ✅ 트러블 슈팅
**[회원가입(김미정)]**<br>
🔍 상황 : 회원 가입 시 유효성 검증 결과에 각 입력필드(이메일, 닉네임, 비밀번호 필드)의 UI를 업데이트 하고자 함<br>
🛑 이슈 : 프론트와 백엔드 각각 나누어서 순서대로 검증이 이루어지다보니, 프론트 검증 실패 후 백엔드 검증 성공 시 검증 성공 시의 UI가 반영되는 문제
<br>
![img_1.png](img_1.png) <br>
💡 해결방안 : 프론트엔드와 백엔드 각각에서 유효성 검사 실패 시 input 태그에 error 클래스 붙임<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ 백엔드 유효성 검사까지 끝난 후, error 클래스가 붙은 input 태그와 그렇지 않은 태그로 구분하여 UI 업데이트
<br><br>
**[메인페이지(윤희원)]**<br><br>
🔍 상황 : 게시물과 이미지 저장의 트랜잭션 처리 문제 (@Transactional) <br>
🛑 이슈 : 게시물과 게시물이미지는 각각 다른 테이블에 데이터를 저장하는데, 이미지 저장 중 실패하면 게시물은 이미 저장된 상태로 남아 데이터 불일치 문제가 발생<br>
💡 해결방안 : 트랜잭션 관리를 통해 두 작업이 하나의 트랜잭션에서 처리되도록 보장. 이미지 저장 중 오류 발생 시 전체 작업을 롤백하여 데이터 불일치를 방지
**[DB ↔ Java 객체 매핑(오인혁)]**<br>
🔍 상황 : MyBatis XML의 ResultMap에서 데이터베이스 컬럼과 객체 프로퍼티 매핑 후, 서비스 클래스에서 DTO로 변환하는 로직을 사용. 하지만 DTO 특정 필드에 null 값이 들어오는 문제가 발생<br>
🛑 이슈 : MyBatis XML에서 잘못된 컬럼명을 참조해 매핑이 실패했으나, 서비스 클래스에서 발생한 변환 로직 문제로 오해해 디버깅 시간이 증가
💡 해결방안 : MyBatis XML의 ResultMap 설정을 검토하고 누락된 매핑을 수정. 서비스 클래스에서 매핑 오류 식별을 위한 로그를 추가해 원인 파악을 용이하게 개선
<br><br>


## 7. 🧠️ 느낀 점
**[김미정]**<br>
- 개발 진행 속도가 더디어 정작 중요한 기능(아이디/비밀번호 찾기, 회원가입 시 이메일 인증, 소셜로그인)은 개발하지 못해서 아쉬움 <br>
- 유효성 검증 라이브러리(yup)를 써보면서, 처음 써보는 라이브러리의 사용 방법을 스스로 익혀보는 시간을 가진 것은 유의미했음 <br>

**[윤희원]**<br>
- ERD를 처음부터 명확하게 설계하는 것이 얼마나 중요한지 깨달음. 데이터 구조를 제대로 설계하지 않으면 나중에 유지보수가 어려워지고 모든 코드에 영향을 미칠 수 있을 것 같음
- 백엔드는 사용자에게 보이지 않는 작업이지만, 체계적으로 설계를 하고 디버깅해야만 프론트엔드와 원활하게 연결할 수 있다는 점을 배웠음. 특히 데이터베이스를 설계할 때 한 번의 실수가 모든 작업에 영향을 줄 수 있기에 팀원들과의 협업과 문서화가 중요하다는 것을 느낌<br>

**[오인혁]**<br>
- 프로젝트 진행 시, ERD설계, UI설계가 왜 우선적으로 이루어지는지 확실히 느낄 수 있었음
- 명세 없이 구두로만 토의한 것들도 일부 있었는데, 잘못 기억한 경험을 통해 기억 의존이 아닌 구체적인 명세가 중요하다는 것을 깨달았음 <br>

