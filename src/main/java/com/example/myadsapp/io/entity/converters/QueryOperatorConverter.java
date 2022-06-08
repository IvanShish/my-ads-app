package com.example.myadsapp.io.entity.converters;

import com.example.myadsapp.io.entity.enums.QueryOperator;

import java.util.stream.Stream;

public class QueryOperatorConverter {

    public static QueryOperator convertAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(QueryOperator.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
