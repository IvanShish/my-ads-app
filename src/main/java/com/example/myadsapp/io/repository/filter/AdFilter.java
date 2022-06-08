package com.example.myadsapp.io.repository.filter;

import com.example.myadsapp.io.entity.enums.QueryOperator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@Builder
public class AdFilter {

    private String property;
    private String value;
    private QueryOperator operator;
    private List<String> values;    //Used in case of IN and BETWEEN operators
}
