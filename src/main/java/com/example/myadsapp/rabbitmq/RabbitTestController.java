package com.example.myadsapp.rabbitmq;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RabbitTestController {

    private final AmqpTemplate amqpTemplate;

    @Autowired
    public RabbitTestController(AmqpTemplate amqpTemplate) {
        this.amqpTemplate = amqpTemplate;
    }

    @PostMapping(path = "/api/emit")
    public ResponseEntity<String> emit(@RequestBody String message) {
        System.out.println(message);
        amqpTemplate.convertAndSend("myqueue", message);
        return ResponseEntity.ok("OK");
    }
}
