
--- 변경 사항 for 인혁님, 희원님 --

[1번 변경사항]
- 구현사항 : 메인페이지/상세 페이지에서 로그인 버튼 누를 시, 어떤 페이지에서 로그인 버튼을 누른 것인지 서버에 알려주기
            (그래야 로그인 성공 후에 이전에 보던 페이지로 redirect 가능)

- !!!관련해서 코드 변경 한 부분 :
  1. (인혁님 페이지) detail-page.jsp, (희원님 페이지) navigation.jsp 파일에 아래 코드 추가
     <script type="module" src="/js/components/login-redirect.js" defer></script>
  2. (인혁님 페이지) detail-page.jsp, (희원님 페이지) navigation.jsp 파일에 로그인 a 태그에 'login' 클래스 추가


[2번 변경사항]
- 구현 기능 : 글쓰기 버튼 누를 시, 로그인 된 상태가 아니라면 로그인 페이지로 이동.
            로그인 상태라면 글쓰기 모달 뜸

- !!!관련해서 코드 변경 한 부분
1. (희원님 페이지) create-feed-modal.js의 openModal 함수중간에 아래 코드 추가(모달 열기 바로 전)
  
// 로그인 여부 확인해서, 로그인 안했으면 로그인 페이지로 이동
const accessToken = localStorage.getItem('accessToken');
if (accessToken === null) {
    document.body.style.opacity = 0; 
    setTimeout(() => {
    window.location.href = "/login";
}, 200); // 0.2초 후에 로그인 페이지로 이동합니다.

2. (to 인혁님) 아직 글쓰기 모달 관련 코드 올리시기 전이라 인혁님 꺼에는 따로 관련 코드 추가를 못했는데,
희원님 코드 똑같이 쓰실거 같으니 그냥 복붙하시면 될듯합니다.

3. (인혁님) detail-page.jsp, (희원님) navigation.jsp 파일에 아래 코드 추가
   <script type="module" src="/js/components/check-login-or-not.js" defer></script>



