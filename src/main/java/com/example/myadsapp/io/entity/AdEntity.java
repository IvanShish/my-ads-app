package com.example.myadsapp.io.entity;

import com.example.myadsapp.io.entity.enums.Condition;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javassist.bytecode.ByteArray;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "ads")
@Getter
@Setter
@ToString
public class AdEntity extends AppEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "title", nullable = false, length = 60)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "condition", nullable = false)
    private Condition condition;

    @Column(name = "price", nullable = false)
    private Double price;

    @ManyToOne(optional = false)
    @JoinColumn(name = "state_id")
    private AdState state;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Lob
    @Type(type = "org.hibernate.type.ImageType")
    @Column(name="ad_picture")
    private byte[] adPicture;
}
