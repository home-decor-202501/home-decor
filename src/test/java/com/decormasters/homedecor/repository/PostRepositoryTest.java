package com.decormasters.homedecor.repository;

import com.decormasters.homedecor.domain.post.entity.Post;
import com.decormasters.homedecor.domain.post.entity.PostImage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest  // 스프링이 관리하고 있는 빈들을 모두 불러옴!
@Transactional
class PostRepositoryTest {

    @Autowired
    PostRepository postRepository;

    // 케이스별 메서드를 한개씩 만듬
    @Test
    // 테스트를 설명하는 이름 - 단언 (Assertion)
    @DisplayName("피드의 내용을 3000자 내로 작성하면 피드가 반드시 생성된다.")
    void saveFeedTest() {
        // GWT 패턴
        // given - 테스트를 위해 주어지는 데이터
        Post givenPost = Post.builder()
                .content("테스트 컨텐츠입니다")
                .userId(1L)
                .build();

        // when - 실제 실행될 테스트 핵심 코드
        postRepository.saveFeed(givenPost);

        // then - 테스트 검증 (단언)
        Long postId = givenPost.getId(); // 생성된 피드게시물의 id를 가져옴
        System.out.println("postId = " + postId);

        // postId가 null이 아닐 것이라고 확신한다.
        assertThat(postId).isNotNull();
    }

    @Test
    @DisplayName("피드를 3개 작성하고 피드 목록조회를 하면 리스트 크기는 3이어야 한다")
    void findAlltest() {
        //
        for (int i = 0; i < 3; i++) {
            Post givenPost = Post.builder()
                    .content("테스트 컨텐츠입니다" + i)
                    .userId(1L)
                    .build();

            postRepository.saveFeed(givenPost);
        }

        //when
        List<Post> feedList = postRepository.findAll();

        //then
        feedList.forEach(System.out::println);

        assertThat(feedList.size()).isEqualTo(3);
        assertThat(feedList.get(0).getUserId()).isEqualTo("임시작성자2");
    }

    @Test
    @DisplayName("""
            피드 생성 후 해당 피드에 이미지를
            2개 첨부했을 때 이미지 생성과 함께 해당 이미지 목록이 조회된다.
            """)
    void saveImagesAndFindEmages() {
        //given
        //피드를 한개 생성
        Post feed = Post.builder()
                .userId(1L)
                .content("ㅎㅎ")
                .build();

        postRepository.saveFeed(feed);

        // 첨부 이미지 2개 생성
        Long postId = feed.getId();
        PostImage image1 = PostImage.builder()
                .postId(postId)
                .imageOrder(1)
                .imageUrl("/uploads/first-image.jpg")
                .build();
        PostImage image2 = PostImage.builder()
                .postId(postId)
                .imageOrder(2)
                .imageUrl("/uploads/second-image.jpg")
                .build();

        //when
        postRepository.saveFeedImage(image1);
        postRepository.saveFeedImage(image2);

        List<PostImage> imageList = postRepository.findImagesByPostId(postId);

        //then
        imageList.forEach(System.out::println);
        assertThat(imageList.size()).isEqualTo(2);
        assertThat(imageList.get(0).getImageOrder()).isEqualTo(1);
        assertThat(imageList.get(1).getImageUrl()).contains("second");

    }
}
