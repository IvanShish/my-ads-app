package com.example.myadsapp.service.impl;

import com.example.myadsapp.io.entity.AdEntity;
import com.example.myadsapp.io.entity.converters.AdFilterConverter;
import com.example.myadsapp.io.entity.enums.States;
import com.example.myadsapp.io.repository.AdRepository;
import com.example.myadsapp.io.repository.AdStateRepository;
import com.example.myadsapp.io.repository.filter.AdFilter;
import com.example.myadsapp.io.repository.filter.AdFilterRepository;
import com.example.myadsapp.service.AdService;
import com.example.myadsapp.service.dto.AdDto;
import com.example.myadsapp.ui.model.AdsResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AdServiceImpl implements AdService {

    @Autowired
    AdRepository adRepository;

    @Autowired
    AdFilterRepository adFilterRepository;

    @Autowired
    AdStateRepository adStateRepository;

    @Override
    public AdDto getAdById(String id) {
        AdEntity adEntity = adRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ad with ID: " + id + " not found"));

        return new ModelMapper().map(adEntity, AdDto.class);
    }

    @Override
    public AdsResponse getAds(int page, int limit, String filter) {
        List<AdFilter> filters = AdFilterConverter.convertStringToFilter(filter);

        if (page > 0) page--;

        Pageable pageableRequest = PageRequest.of(page, limit);

        List<AdDto> items = adFilterRepository.getQueryResultWithPagination(filters, pageableRequest)
                .stream()
                .map(ad -> new ModelMapper().map(ad, AdDto.class))
                .collect(Collectors.toList());

        return new AdsResponse(true, adFilterRepository.getQueryResult(filters).size(), items);
    }

    @Override
    public AdDto createAd(AdDto ad) {
        if (ad.getId() == null) {
            ad.setId(UUID.randomUUID());
        } else {
            if (adRepository.findById(ad.getId()).isPresent())
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Record already exists");
        }

        if (ad.getPrice() < 0) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "The price must be greater or equal than 0");
        }

        AdEntity adEntity = new ModelMapper().map(ad, AdEntity.class);
        adEntity.setState(adStateRepository.getAdStateByState(String.valueOf(States.DRAFT)));

        AdEntity storedAd = adRepository.save(adEntity);

//        if (ad.getFile() != null) {
//            setAdPicture(storedAd.getId().toString(), ad.getFile());
//        }

        return new ModelMapper().map(storedAd, AdDto.class);
    }

    @Override
    public void deleteAd(String id) {
        AdEntity ad = adRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ad with ID: " + id + " not found"));

        ad.setActual(false);
        ad.setState(adStateRepository.getAdStateByState(String.valueOf(States.DELETED)));
        adRepository.save(ad);
    }

    @Override
    public AdDto updateAd(String id, AdDto ad) {
        AdEntity adEntity = adRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ad with ID: " + id + " not found"));

        if (ad.getDescription() != null) {
            adEntity.setDescription(ad.getDescription());
        }
        if (ad.getTitle() != null) {
            adEntity.setTitle(ad.getTitle());
        }
        if (ad.getPrice() != null) {
            if (ad.getPrice() < 0) {
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "The price must be greater or equal than 0");
            }
            adEntity.setPrice(ad.getPrice());
        }
        if (ad.getCondition() != null) {
            adEntity.setCondition(ad.getCondition());
        }
        if (ad.getCategory() != null) {
            adEntity.setCategory(ad.getCategory());
        }
        if (ad.getState() != null) {
            adEntity.setState(adStateRepository.getAdStateByState(ad.getState()));
        }

        AdEntity updatedAd = adRepository.save(adEntity);

        return new ModelMapper().map(updatedAd, AdDto.class);
    }

    @Override
    public void setAdPicture(String id, MultipartFile file) {
        AdEntity adEntity = adRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ad with ID: " + id + " not found"));
        try {
            adEntity.setAdPicture(file.getBytes());
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Can't set this picture");
        }

        adRepository.save(adEntity);
    }

    @Override
    public byte[] getAdPicture(String id) {
        AdEntity adEntity = adRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ad with ID: " + id + " not found"));

        return adEntity.getAdPicture();
    }
}
