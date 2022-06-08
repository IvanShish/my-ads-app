package com.example.myadsapp.io.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
public class UserEntity extends AppEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(name = "email", nullable = false, length = 120)
    private String email;

    @Column(name = "encrypted_password", nullable = false)
    private String encryptedPassword;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<AdEntity> ads;
}
