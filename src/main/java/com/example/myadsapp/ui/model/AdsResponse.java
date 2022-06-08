package com.example.myadsapp.ui.model;

import com.example.myadsapp.service.dto.AdDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AdsResponse {

    private Boolean success;
    private long results;
    private List<AdDto> items;
}
