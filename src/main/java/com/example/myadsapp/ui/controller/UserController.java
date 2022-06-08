package com.example.myadsapp.ui.controller;

import com.example.myadsapp.service.UserService;
import com.example.myadsapp.service.dto.UserDto;
import com.example.myadsapp.ui.model.UserResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(path = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public UserDto getUser(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @DeleteMapping(path = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);

        return ResponseEntity.ok().body("User with ID: " + id + " deleted");
    }

    @PutMapping(path = "/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public UserResponse updateUser(@PathVariable String id, @RequestBody UserDto userDto) {
        UserResponse response = new ModelMapper().map(userService.updateUser(id, userDto), UserResponse.class);
        response.setSuccess(true);

        return response;
    }
}
