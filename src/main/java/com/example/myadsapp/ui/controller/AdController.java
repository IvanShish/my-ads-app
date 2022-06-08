package com.example.myadsapp.ui.controller;

import com.example.myadsapp.service.AdService;
import com.example.myadsapp.service.dto.AdDto;
import com.example.myadsapp.ui.model.AdResponse;
import com.example.myadsapp.ui.model.AdsResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/api/ads")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdController {

    @Autowired
    AdService adService;

    @GetMapping(path = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public AdDto getAd(@PathVariable String id) {
        return adService.getAdById(id);
    }

    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public AdsResponse getAds(@RequestParam(value = "page", defaultValue = "1") int page,
                              @RequestParam(value = "limit", defaultValue = "20") int limit,
                              @RequestParam(value = "filter", required = false) String filter) {

        return adService.getAds(page, limit, filter);
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public AdResponse createAd(@RequestBody AdDto adDto) {
        AdDto createdAd = adService.createAd(adDto);
        AdResponse response = new ModelMapper().map(createdAd, AdResponse.class);
        response.setSuccess(true);

        return response;
    }

    @DeleteMapping(path = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> deleteAd(@PathVariable String id) {
        adService.deleteAd(id);

        return ResponseEntity.ok().body("Ad with ID: " + id + " will be deleted");
    }

    @PutMapping(path = "/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public AdResponse updateAd(@PathVariable String id, @RequestBody AdDto adDto) {
        AdDto updatedAd = adService.updateAd(id, adDto);
        AdResponse response = new ModelMapper().map(updatedAd, AdResponse.class);
        response.setSuccess(true);

        return response;
    }

    @PostMapping(path = "{id}/picture", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public ResponseEntity<?> setAdPicture(@PathVariable("id") String id, @RequestParam MultipartFile file) {
        adService.setAdPicture(id, file);

        return ResponseEntity.ok().body("Set new image for ad with ID: " + id);
    }

    @GetMapping(path = "{id}/picture")
    public ResponseEntity<?> getAdPicture(@PathVariable("id") String id) {
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(MediaType.IMAGE_JPEG_VALUE))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"${System.currentTimeMillis()}\"")
                .body(adService.getAdPicture(id));
    }

}
