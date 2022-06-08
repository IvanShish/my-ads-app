package com.example.myadsapp.service.impl;

import com.example.myadsapp.io.entity.chat.ChatRoom;
import com.example.myadsapp.io.repository.ChatRoomRepository;
import com.example.myadsapp.service.ChatRoomService;
import com.example.myadsapp.service.dto.ChatRoomDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {

    @Autowired
    ChatRoomRepository chatRoomRepository;

    public String getChatId(String senderId, String adId, String recipientId, boolean createIfNotExist) {
        var chatId = chatRoomRepository.findBySenderIdAndAdId(senderId, adId)
                .map(ChatRoom::getChatId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chat room not found"));

        if (createIfNotExist && chatRoomRepository.findBySenderIdAndAdId(recipientId, adId).isEmpty()) {
            ChatRoom recipientSender = ChatRoom
                    .builder()
                    .chatId(chatId)
                    .senderId(recipientId)
                    .adId(adId)
                    .recipientId(senderId)
                    .build();

            chatRoomRepository.save(recipientSender);
        }

        return chatId;
    }

    @Override
    public List<ChatRoom> findChatRooms(String userId) {
        return chatRoomRepository.findAllBySenderId(userId);
    }

    @Override
    public void createChatRoom(ChatRoomDto chatRoom) {
        chatRoom.setChatId(String.format("%s_%s", chatRoom.getSenderId(), chatRoom.getAdId()));

        if (chatRoomRepository.findBySenderIdAndAdId(chatRoom.getSenderId(), chatRoom.getAdId()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Chat room for this user and ad has already been created");
        }

        chatRoomRepository.save(new ModelMapper().map(chatRoom, ChatRoom.class));
    }
}
