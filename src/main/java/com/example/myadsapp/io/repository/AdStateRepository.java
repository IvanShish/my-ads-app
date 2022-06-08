package com.example.myadsapp.io.repository;

import com.example.myadsapp.io.entity.AdState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AdStateRepository extends JpaRepository<AdState, UUID> {
    AdState getAdStateByState(String state);
}
