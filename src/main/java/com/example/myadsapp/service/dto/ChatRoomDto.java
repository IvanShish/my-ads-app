package com.example.myadsapp.service.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class ChatRoomDto {

    private UUID id;
    private String chatId;
    private String senderId;
    private String adId;
    private String recipientId;
}
