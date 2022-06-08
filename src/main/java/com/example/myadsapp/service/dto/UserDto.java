package com.example.myadsapp.service.dto;

import com.example.myadsapp.io.entity.AdEntity;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class UserDto {

    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String encryptedPassword;
    private Set<AdEntity> ads;
}
