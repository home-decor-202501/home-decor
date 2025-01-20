
// 좋아요 버튼 클릭 이벤트
document.querySelector('.like-button').addEventListener('click', function () {

    console.log("좋아요클릭");

    const likeButton = this;
    const likeIcon = likeButton.querySelector('.like-icon');
    const likeCount = likeButton.querySelector('.like-count');

    // 좋아요 상태 확인
    if (likeButton.classList.contains('liked')) {
        likeButton.classList.remove('liked');
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
    } else {
        likeButton.classList.add('liked');
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    }
});