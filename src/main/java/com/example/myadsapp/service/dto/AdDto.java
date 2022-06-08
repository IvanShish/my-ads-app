package com.example.myadsapp.service.dto;

import com.example.myadsapp.io.entity.enums.Condition;
import lombok.Data;

import java.util.UUID;

@Data
public class AdDto {

    private UUID id;
    private String title;
    private String description;
    private String category;
    private Condition condition;
    private Double price;
    private String state;
    private UUID userId;
    private byte[] adPicture;
}
