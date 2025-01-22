package com.decormasters.homedecor.domain.post.dto.request;

import com.decormasters.homedecor.domain.post.entity.Post;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

// 피드 생성시 클라이언트가 보낸 JSON데이터를 파싱하고 검증
@Getter @Setter @ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class PostCreate {

    private Long userId; //JSON에서 필드 매핑
    private List<MultipartFile> images; // 파일리스트 (JSON에서 필드 매핑시)

    @Size(max = 3000, message = "피드 내용은 최대 3000자까지 입력 가능합니다.")
    private String content;  //JSON에서 필드 매핑

    public Post toEntity() {  // Post 엔터티로 반환
        return Post.builder()
                .userId(this.userId)
                .content(this.content)
                .build();
    }
}

