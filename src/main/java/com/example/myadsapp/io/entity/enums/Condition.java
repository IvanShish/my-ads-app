package com.example.myadsapp.io.entity.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Condition {
    NEW("N"),
    USED("U");

    private String code;
}
