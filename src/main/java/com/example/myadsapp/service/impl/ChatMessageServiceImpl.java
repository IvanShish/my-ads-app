package com.example.myadsapp.service.impl;

import com.example.myadsapp.io.entity.chat.ChatMessage;
import com.example.myadsapp.io.entity.enums.MessageStatus;
import com.example.myadsapp.io.repository.ChatMessageRepository;
import com.example.myadsapp.service.ChatMessageService;
import com.example.myadsapp.service.ChatRoomService;
import com.example.myadsapp.service.dto.ChatMessageDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ChatMessageServiceImpl implements ChatMessageService {

    @Autowired
    ChatMessageRepository repository;

    @Autowired
    ChatRoomService chatRoomService;

    @Override
    public ChatMessage createMessage(ChatMessageDto chatMessage) {
        ChatMessage saved = new ModelMapper().map(chatMessage, ChatMessage.class);

        saved.setStatus(MessageStatus.RECEIVED);
        repository.save(saved);
        return saved;
    }

    @Override
    public List<ChatMessage> findChatMessages(String senderId, String adId) {
        var chatId = chatRoomService.getChatId(senderId, adId, null, false);

        var messages = repository.findByChatId(chatId);

        if (messages.size() > 0) {
            messages.forEach(chatMessage -> {
                chatMessage.setStatus(MessageStatus.DELIVERED);
                repository.save(chatMessage);
            });
        }

        return messages;
    }

    @Override
    public ChatMessage findById(String id) {
        return repository.findById(UUID.fromString(id))
                .map(chatMessage -> {
                    chatMessage.setStatus(MessageStatus.DELIVERED);
                    return repository.save(chatMessage);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Message with ID: " + id + " not found"));
    }
}
