

class CarouselManager{

    //생성자
    constructor(container){
        //캐러셀을 감싸는 전체 부모태그
        this.container = container;

        //이미지 트랙(실제 이미지가 배치될 공간)
        this.track = this.container.querySelector('.carousel-track');

        // 실제 이미지 파일 배열
        this.slides = [];
    }

    //초기 이미지파일 배열 받기
    init(files) {
        this.slides = files;
        // 슬라이드 띄우기
    }

}

export default CarouselManager;