package com.example.myadsapp.io.entity.chat;

import com.example.myadsapp.io.entity.AppEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "chat_rooms")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatRoom extends AppEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "chat_id")
    private String chatId;

    @Column(name = "sender_id")
    private String senderId;

    @Column(name = "recipient_id")
    private String recipientId;

    @Column(name = "ad_id")
    private String adId;
}
