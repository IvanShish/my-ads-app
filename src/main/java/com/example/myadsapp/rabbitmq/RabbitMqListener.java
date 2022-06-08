package com.example.myadsapp.rabbitmq;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@EnableRabbit
@Component
public class RabbitMqListener {

    @RabbitListener(queues = "myqueue")
    public void processMyQueue(String message) {
        System.out.println("Received from myqueue: " + message);
    }
}
