package com.example.myadsapp.io.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.util.UUID;

@MappedSuperclass
@Getter
@Setter
public abstract class AppEntity {

    @Id
    @GeneratedValue(generator = "uuid")
    private UUID id;

    @Column(name = "actual", nullable = false)
    private Boolean actual = true;
}
