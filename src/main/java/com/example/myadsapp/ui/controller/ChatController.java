package com.example.myadsapp.ui.controller;

import com.example.myadsapp.io.entity.chat.ChatMessage;
import com.example.myadsapp.io.entity.chat.ChatNotification;
import com.example.myadsapp.service.ChatMessageService;
import com.example.myadsapp.service.ChatRoomService;
import com.example.myadsapp.service.dto.ChatMessageDto;
import com.example.myadsapp.service.dto.ChatRoomDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class ChatController {

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @Autowired
    ChatMessageService chatMessageService;

    @Autowired
    ChatRoomService chatRoomService;

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessageDto chatMessage) throws InterruptedException {
        var chatId = chatRoomService.getChatId(chatMessage.getSenderId(), chatMessage.getAdId(),
                chatMessage.getRecipientId(), true);
        chatMessage.setChatId(chatId);

        ChatMessage saved = chatMessageService.createMessage(chatMessage);

        messagingTemplate.convertAndSendToUser(
                chatMessage.getRecipientId(), "/queue/messages",
                new ChatNotification(
                        saved.getId().toString(),
                        saved.getSenderId(),
                        saved.getSenderName(),
                        chatMessage.getContent()
                ));
    }

    @GetMapping(path = "/api/messages/{senderId}/{adId}")
    public ResponseEntity<?> findChatMessages(@PathVariable String senderId, @PathVariable String adId) {
        return ResponseEntity.ok(chatMessageService.findChatMessages(senderId, adId).stream()
                .map(chatMessage -> new ModelMapper().map(chatMessage, ChatMessageDto.class))
                .collect(Collectors.toList()));
    }

    @GetMapping(path = "/api/messages/{id}")
    public ChatMessageDto findMessage(@PathVariable String id) {
        return new ModelMapper().map(chatMessageService.findById(id), ChatMessageDto.class);
    }

    @GetMapping(path = "/api/rooms/{userId}")
    public ResponseEntity<?> findRooms(@PathVariable String userId) {
        return ResponseEntity.ok(chatRoomService.findChatRooms(userId).stream()
                .map(chatRoom -> new ModelMapper().map(chatRoom, ChatRoomDto.class))
                .collect(Collectors.toList()));
    }

    @PostMapping(path = "/api/rooms", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> createChatRoom(@RequestBody ChatRoomDto chatRoomDto) {
        chatRoomService.createChatRoom(chatRoomDto);
        return ResponseEntity.ok("Chat room created");
    }
}
