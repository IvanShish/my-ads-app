package com.example.myadsapp.service;

import com.example.myadsapp.io.entity.chat.ChatMessage;
import com.example.myadsapp.service.dto.ChatMessageDto;

import java.util.List;

public interface ChatMessageService {

    ChatMessage createMessage(ChatMessageDto chatMessage);
    List<ChatMessage> findChatMessages(String senderId, String adId);
    ChatMessage findById(String id);
}
