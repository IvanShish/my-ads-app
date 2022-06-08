package com.example.myadsapp.service.dto;

import com.example.myadsapp.io.entity.enums.MessageStatus;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class ChatMessageDto {

    private UUID id;
    private String chatId;
    private String senderId;
    private String recipientId;
    private String senderName;
    private String recipientName;
    private String adId;
    private String adTitle;
    private String content;
    private Date timestamp;
    private MessageStatus status;
}
