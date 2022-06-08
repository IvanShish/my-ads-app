package com.example.myadsapp.ui.model;

import com.example.myadsapp.io.entity.enums.Condition;
import lombok.Data;

import java.util.UUID;

@Data
public class AdResponse {

    private UUID id;
    private String title;
    private String description;
    private String category;
    private Condition condition;
    private Double price;
    private Boolean success = false;
}
