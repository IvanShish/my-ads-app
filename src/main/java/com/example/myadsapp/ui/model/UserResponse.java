package com.example.myadsapp.ui.model;

import com.example.myadsapp.io.entity.AdEntity;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class UserResponse {

    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String encryptedPassword;
    private Set<AdEntity> ads;
    private Boolean success = false;
}
