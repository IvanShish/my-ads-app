package com.example.myadsapp.io.repository;

import com.example.myadsapp.io.entity.AdEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AdRepository extends JpaRepository<AdEntity, UUID>, JpaSpecificationExecutor<AdEntity> {
}
