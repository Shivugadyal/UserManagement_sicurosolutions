package com.sicuro.task.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sicuro.task.dto.MyUser;
import com.sicuro.task.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

	@Autowired
	UserService service;

	@PostMapping("/users")
	public ResponseEntity<Object> addUser(@Valid @RequestBody MyUser myUser, BindingResult result) {
		return service.addUser(myUser, result);
	}

	@GetMapping("/users")
	public ResponseEntity<Object> fetchAllUsers() {
		return service.fetchAllUsers();
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<Object> fetchUserById(@PathVariable int id) {
		return service.fetchUserById(id);
	}

	@GetMapping("/users/userName/{userName}")
	public ResponseEntity<Object> fetchUserByuserName(@PathVariable String userName) {
		return service.fetchUserByuserName(userName);
	}

	@GetMapping("/users/email/{email}")
	public ResponseEntity<Object> fetchUserByEmail(@PathVariable String email) {
		return service.fetchUserByEmail(email);
	}

	@GetMapping("/users/firstName/{firstName}")
	public ResponseEntity<Object> fetchUserByFirstName(@PathVariable String firstName) {
		return service.fetchUserByFirstName(firstName);
	}

	@GetMapping("/users/lastName/{lastName}")
	public ResponseEntity<Object> fetchUserByLastName(@PathVariable String lastName) {
		return service.fetchUserBylastName(lastName);
	}
}