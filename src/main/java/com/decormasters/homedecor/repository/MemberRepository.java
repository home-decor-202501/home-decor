package com.decormasters.homedecor.repository;

import com.decormasters.homedecor.domain.member.entity.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MemberRepository {

    int insertUser(Member newUser, String uploadedImageUrl);

    List<Member> displayAllUsers();

    boolean checkNicknameExists(String nickname);

    boolean checkEmailExists(String email);

    Optional<Member> findUserByEmail(String userEmail);

    Optional<Member> findUserById(Long userId);
}
