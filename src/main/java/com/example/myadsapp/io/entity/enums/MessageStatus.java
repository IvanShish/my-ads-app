package com.example.myadsapp.io.entity.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MessageStatus {
    RECEIVED("R"),
    DELIVERED("D");

    private String code;
}
