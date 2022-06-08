package com.example.myadsapp.service;

import com.example.myadsapp.service.dto.AdDto;
import com.example.myadsapp.ui.model.AdsResponse;
import org.springframework.web.multipart.MultipartFile;

public interface AdService {
    AdDto getAdById(String id);
    AdsResponse getAds(int page, int limit, String filter);
    AdDto createAd(AdDto ad);
    void deleteAd(String id);
    AdDto updateAd(String id, AdDto ad);
    void setAdPicture(String id, MultipartFile file);
    byte[] getAdPicture(String id);
}
