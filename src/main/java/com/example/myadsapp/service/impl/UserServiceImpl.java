package com.example.myadsapp.service.impl;

import com.example.myadsapp.io.entity.UserEntity;
import com.example.myadsapp.io.repository.UserRepository;
import com.example.myadsapp.service.UserService;
import com.example.myadsapp.service.dto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDto getUserById(String id) {
        UserEntity userEntity = userRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with ID: " + id + " not found"));

        return new ModelMapper().map(userEntity, UserDto.class);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email);

        if (userEntity == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with email: " + email + " not found");
        }

        return new ModelMapper().map(userEntity, UserDto.class);
    }

    @Override
    public UserDto createUser(UserDto user) {
        if (user.getId() == null) {
            user.setId(UUID.randomUUID());
        } else {
            if (userRepository.findById(user.getId()).isPresent())
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Record with this id already exists");
        }

        if (userRepository.findByEmail(user.getEmail()) != null)
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Record with this email already exists");

        UserEntity userEntity = new ModelMapper().map(user, UserEntity.class);
        userEntity.setEncryptedPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        UserDto storedUser = new ModelMapper().map(userRepository.save(userEntity), UserDto.class);
        storedUser.setPassword(user.getPassword());

        return storedUser;
    }

    @Override
    public UserDto updateUser(String id, UserDto user) {
        UserEntity userEntity = userRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with ID: " + id + " not found"));

        if (user.getFirstName() != null) {
            userEntity.setFirstName(user.getFirstName());
        }
        if (user.getLastName() != null) {
            userEntity.setLastName(user.getLastName());
        }

        UserEntity updatedUser = userRepository.save(userEntity);

        return new ModelMapper().map(updatedUser, UserDto.class);
    }

    @Override
    public void deleteUser(String id) {
        UserEntity userEntity = userRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with ID: " + id + " not found"));

        userRepository.delete(userEntity);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException(email);
        }

        return new User(user.getEmail(), user.getEncryptedPassword(), new ArrayList<>());
    }
}
