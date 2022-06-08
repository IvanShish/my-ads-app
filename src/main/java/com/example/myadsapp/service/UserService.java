package com.example.myadsapp.service;

import com.example.myadsapp.service.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    UserDto getUserById(String id);
    UserDto getUserByEmail(String email);
    UserDto createUser(UserDto user);
    UserDto updateUser(String id, UserDto user);
    void deleteUser(String id);
}
