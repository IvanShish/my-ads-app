package com.example.myadsapp.service;

import com.example.myadsapp.io.entity.chat.ChatRoom;
import com.example.myadsapp.service.dto.ChatRoomDto;

import java.util.List;

public interface ChatRoomService {
    String getChatId(String senderId, String adId, String recipientId, boolean createIfNotExist);
    List<ChatRoom> findChatRooms(String userId);
    void createChatRoom(ChatRoomDto chatRoom);
}
