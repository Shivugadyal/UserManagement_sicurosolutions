package com.sicuro.task.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sicuro.task.dto.MyUser;

public interface UserRepository extends JpaRepository<MyUser, Integer> {

	boolean existsByUserName(String encode);

	MyUser findByUserName(String username);

	Optional<MyUser> findByuserName(String userName);

	List<MyUser> findByFirstName(String firstName);

	Optional<MyUser> findByEmail(String email);

	List<MyUser> findByLastName(String lastName);

}
