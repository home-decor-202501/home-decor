CREATE DATABASE home_decor;

CREATE TABLE `user` (
                        id	BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                        email	VARCHAR(255) UNIQUE	NOT NULL,
                        password VARCHAR(255)	NOT NULL,
                        nickname	VARCHAR(255)	NOT NULL,
                        age	INT	NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                        img_url	VARCHAR(255) NULL
);

CREATE TABLE post (
                      post_id	BIGINT	AUTO_INCREMENT NOT NULL PRIMARY KEY,
                      user_id	BIGINT	NOT NULL,
                      content	VARCHAR(500)	NOT NULL,
                      created_at	DATETIME DEFAULT CURRENT_TIMESTAMP	NOT NULL,
                      updated_at	DATETIME	NULL,
                      view_count	INT	NOT NULL,
                      FOREIGN KEY (user_id) REFERENCES `user`(id)
);

CREATE TABLE `like` (
                        like_id	INT AUTO_INCREMENT	NOT NULL PRIMARY KEY,
                        user_id	BIGINT	NOT NULL,
                        post_id	BIGINT	NOT NULL,
                        FOREIGN KEY (user_id) REFERENCES `user`(id),
                        FOREIGN KEY (post_id) REFERENCES post(post_id)
);

CREATE TABLE Comment (
                         comment_id	INT	AUTO_INCREMENT NOT NULL PRIMARY KEY,
                         post_id	BIGINT	NOT NULL,
                         user_id	BIGINT	NOT NULL,
                         content	VARCHAR(200)	NOT NULL,
                         created_at	DATETIME	DEFAULT CURRENT_TIMESTAMP NOT NULL,
                         updated_at	DATETIME	NOT NULL,
                         is_deleted	boolean	NOT NULL,
                         FOREIGN KEY (user_id) REFERENCES `user`(id),
                         FOREIGN KEY (post_id) REFERENCES post(post_id)
);


CREATE TABLE post_image (
                            id	BIGINT	AUTO_INCREMENT NOT NULL PRIMARY KEY,
                            post_id	BIGINT	NOT NULL,
                            image_url	VARCHAR(255) NOT NULL,
                            image_order INT	NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP	NULL,
                            FOREIGN KEY (post_id) REFERENCES post(post_id)
);


--------- 잘 만들어졌는지 확인용 : 만들어진 테이블 상세 보고 싶으신 분만 실행해보세요. -------------

select * from `user`;
DESCRIBE user;


select * from comment;
DESCRIBE comment;


select * from `like`;
DESCRIBE `like`;


select * from post_image;
DESCRIBE post_image;


select * from post;
DESCRIBE post;

