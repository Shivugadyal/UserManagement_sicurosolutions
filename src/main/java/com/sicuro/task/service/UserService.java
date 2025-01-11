
package com.sicuro.task.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.sicuro.task.dto.MyUser;
import com.sicuro.task.repository.UserRepository;

import jakarta.validation.Valid;

@Service
public class UserService {

	@Autowired
	UserRepository repository;

	@Autowired
	PasswordEncoder encoder;

	public ResponseEntity<Object> addUser(@Valid MyUser myUser, BindingResult result) {
		if (repository.existsByUserName(myUser.getUserName()))
			result.rejectValue("userName", "error.userName", "UserName Should be Unique");

		if (result.hasErrors()) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("error", "Not Able to Save");
			map.put("reason", result.getAllErrors().stream().map(x->x.getDefaultMessage()).toList());
			return new ResponseEntity<Object>(map, HttpStatus.UNPROCESSABLE_ENTITY);
		} else {
			myUser.setUserName(myUser.getUserName());
			myUser.setPassword(encoder.encode(myUser.getPassword()));
			repository.save(myUser);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("success", "Record Added Success");
			map.put("userId", myUser.getUserId());
			return new ResponseEntity<Object>(map, HttpStatus.CREATED);
		}
	}

	public ResponseEntity<Object> fetchUserById(int id) {
		Optional<MyUser> user=repository.findById(id);
		if(user.isPresent()) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("success", "Record Found Success");
			map.put("user", user.get());
			return new ResponseEntity<Object>(map, HttpStatus.FOUND);
		}else {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("error", "Not Found");
			return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<Object> fetchUserByuserName(String userName) {
		Optional<MyUser> user=repository.findByuserName(userName);
		if(user.isPresent()) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("success", "Record Found Success");
			map.put("user", user.get());
			return new ResponseEntity<Object>(map, HttpStatus.FOUND);
		}else {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("error", "Not Found");
			return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<Object> fetchUserByEmail(String email) {
		Optional<MyUser> user=repository.findByEmail(email);
		if(user.isPresent()) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("success", "Record Found Success");
			map.put("user", user.get());
			return new ResponseEntity<Object>(map, HttpStatus.FOUND);
		}else {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("error", "Not Found");
			return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<Object> fetchUserByFirstName(String firstName) {
		 List<MyUser> users= repository.findByFirstName(firstName);
		 if(users.isEmpty()) {
				Map<String, Object> map=new HashMap<String, Object>();
				map.put("error", "records not found");
				return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
			}else {
				Map<String, Object> map=new HashMap<String, Object>();
				map.put("success", "record found success");
				map.put("user", users);
				return new ResponseEntity<Object>(map, HttpStatus.FOUND);
			}
	}

	public ResponseEntity<Object> fetchUserBylastName(String lastName) {
		 List<MyUser> users= repository.findByLastName(lastName);
		 if(users.isEmpty()) {
				Map<String, Object> map=new HashMap<String, Object>();
				map.put("error", "records not found");
				return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
			}else {
				Map<String, Object> map=new HashMap<String, Object>();
				map.put("success", "record found success");
				map.put("user", users);
				return new ResponseEntity<Object>(map, HttpStatus.FOUND);
			}
	}

    public ResponseEntity<Object> fetchAllUsers() {
        List<MyUser> users = repository.findAll();
        if(users.isEmpty()) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("error", "No users found");
            return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
        } else {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("success", "Users found");
            map.put("users", users);
            return new ResponseEntity<Object>(map, HttpStatus.OK);
        }
    }
}
