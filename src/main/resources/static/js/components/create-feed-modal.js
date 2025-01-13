// 피드 생성 몯랑르 전역관리
// let $modal = null;

// 모달 관련 JS 함수 - 외부에 노출
function initCreateFeedModal() {
    console.log('모달 초기화 시작 !!');

    // DOM  요소 가져오기
    const writeButton = document.getElementById('write-button');
    const modalContainer = document.getElementById('createPostModal'); // 모달 컨테이너

    writeButton.addEventListener('click', e=>{
        e.preventDefault();
        modalContainer.style.display = 'flex';

    });

}

export default initCreateFeedModal;