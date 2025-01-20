package com.decormasters.homedecor;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.SecureRandom;
import java.util.Base64;

@SpringBootTest
class HomedecorApplicationTests {

	// JWT 토큰용 secret key 를 생성하기 위한 테스트
	@Test
	void contextLoads() {
		SecureRandom random = new SecureRandom();
		// 빈 32 바이트를 만들어서
		byte[] salt = new byte[32];
		// 이 바이트를 랜덤한 난수로 채우고
		random.nextBytes(salt);
		// 그걸 또 Base64로 인코딩 해줘
		String secretKey = Base64.getEncoder().encodeToString(salt);
		System.out.println("Generated Secret key : " + secretKey);




	}

}
