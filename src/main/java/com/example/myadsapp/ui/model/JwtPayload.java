package com.example.myadsapp.ui.model;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class JwtPayload {
    private UUID userId;
    private String email;
    private String firstName;
    private String lastName;
}
