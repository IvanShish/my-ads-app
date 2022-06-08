package com.example.myadsapp.io.entity.chat;

import com.example.myadsapp.io.entity.AppEntity;
import com.example.myadsapp.io.entity.enums.MessageStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "chat_messages")
@Getter
@Setter
@ToString
public class ChatMessage extends AppEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "chat_id")
    private String chatId;

    @Column(name = "sender_id")
    private String senderId;

    @Column(name = "recipient_id")
    private String recipientId;

    @Column(name = "sender_name")
    private String senderName;

    @Column(name = "recipient_name")
    private String recipientName;

    @Column(name = "ad_id")
    private String adId;

    @Column(name = "ad_title")
    private String adTitle;

    @Column(name = "content")
    private String content;

    @Column(name = "timestamp")
    private Date timestamp;

    @Column(name = "status")
    private MessageStatus status;
}
