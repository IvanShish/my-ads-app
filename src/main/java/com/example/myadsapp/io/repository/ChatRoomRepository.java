package com.example.myadsapp.io.repository;

import com.example.myadsapp.io.entity.chat.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, UUID> {
    Optional<ChatRoom> findBySenderIdAndAdId(String senderId, String adId);
    List<ChatRoom> findAllBySenderId(String senderId);
}
