package com.example.myadsapp.io.entity.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum QueryOperator {
    GREATER_THAN("gt"),
    LESS_THAN("lt"),
    EQUALS("eq"),
    NOT_EQ("neq"),
    LIKE("like"),
    IN("in"),
    BETWEEN("between");

    private String code;
}
