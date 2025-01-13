package com.decormasters.homedecor.repository;

import com.decormasters.homedecor.domain.member.entitiy.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberRepository {

    int insertUser(Member newUser, String uploadedImageUrl);

    List<Member> displayAllUsers();
}
