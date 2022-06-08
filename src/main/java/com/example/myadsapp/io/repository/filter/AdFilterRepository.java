package com.example.myadsapp.io.repository.filter;

import com.example.myadsapp.io.entity.AdEntity;
import com.example.myadsapp.io.entity.AdState;
import com.example.myadsapp.io.entity.UserEntity;
import com.example.myadsapp.io.repository.AdRepository;
import com.example.myadsapp.io.repository.AdStateRepository;
import com.example.myadsapp.io.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.springframework.data.jpa.domain.Specification.where;

@Component
public class AdFilterRepository {

    @Autowired
    AdRepository adRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AdStateRepository adStateRepository;

    public List<AdEntity> getQueryResult(List<AdFilter> filters) {
        if (filters.size() > 0) {
            return adRepository.findAll(getSpecificationFromFilters(filters));
        } else {
            return adRepository.findAll();
        }
    }

    public List<AdEntity> getQueryResultWithPagination(List<AdFilter> filters, Pageable pageableRequest) {
        if (filters.size() > 0) {
            return adRepository.findAll(getSpecificationFromFilters(filters), pageableRequest).getContent();
        } else {
            return adRepository.findAll(pageableRequest).getContent();
        }
    }

    private Specification<AdEntity> getSpecificationFromFilters(List<AdFilter> filter) {
        Specification<AdEntity> specification = where(createSpecification(filter.get(0)));
        for (int i = 1; i < filter.size(); i++) {
            specification = specification.and(createSpecification(filter.get(i)));
        }
        return specification;
    }

    private Specification<AdEntity> createSpecification(AdFilter input) {
        switch (input.getOperator()) {

            case EQUALS:
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get(input.getProperty()),
                                castToRequiredType(root.get(input.getProperty()).getJavaType(),
                                        input.getValue()));

            case NOT_EQ:
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.notEqual(root.get(input.getProperty()),
                                castToRequiredType(root.get(input.getProperty()).getJavaType(), input.getValue()));

            case GREATER_THAN:
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.gt(root.get(input.getProperty()),
                                (Number) castToRequiredType(
                                        root.get(input.getProperty()).getJavaType(),
                                        input.getValue()));

            case LESS_THAN:
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.lt(root.get(input.getProperty()),
                                (Number) castToRequiredType(
                                        root.get(input.getProperty()).getJavaType(),
                                        input.getValue()));

            case LIKE:
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.like(root.get(input.getProperty()),
                                "%" + input.getValue() + "%");

            case IN:
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.in(root.get(input.getProperty()))
                                .value(castToRequiredType(root.get(input.getProperty()).getJavaType(), input.getValues()));

            case BETWEEN:
                return (root, query, criteriaBuilder) -> {
                    List<Double> nums = (List<Double>) castToRequiredType(root.get(input.getProperty()).getJavaType(), input.getValues());

                    return criteriaBuilder.between(root.get(input.getProperty()), nums.get(0), nums.get(1));
                };

            default:
                throw new RuntimeException("Operation not supported yet");
        }
    }

    private Object castToRequiredType(Class fieldType, String value) {
        if (fieldType.isAssignableFrom(Double.class)) {
            return Double.valueOf(value);
        } else if (fieldType.isAssignableFrom(Integer.class)) {
            return Integer.valueOf(value);
        } else if (Enum.class.isAssignableFrom(fieldType)) {
            return Enum.valueOf(fieldType, value);
        } else if (fieldType.isAssignableFrom(Boolean.class)) {
            return Boolean.valueOf(value);
        } else if (UserEntity.class.isAssignableFrom(fieldType)) {
            return userRepository.findById(UUID.fromString(value))
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "User with ID: " + value + " not found"));
        } else if (AdState.class.isAssignableFrom(fieldType)) {
            return adStateRepository.getAdStateByState(value);
        }

        return null;
    }

    private Object castToRequiredType(Class fieldType, List<String> value) {
        List<Object> lists = new ArrayList<>();
        for (String s : value) {
            lists.add(castToRequiredType(fieldType, s));
        }
        return lists;
    }
}
