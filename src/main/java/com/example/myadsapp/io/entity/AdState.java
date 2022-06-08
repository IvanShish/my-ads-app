package com.example.myadsapp.io.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "ad_states")
@Getter
@Setter
@ToString
public class AdState extends AppEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "state", nullable = false)
    private String state;   // DRAFT, ACTIVELY, WITHDRAWN, DELETED
}
