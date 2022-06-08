package com.example.myadsapp.io.entity.converters;

import com.example.myadsapp.io.entity.enums.Condition;
import com.example.myadsapp.io.entity.enums.MessageStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class MessageStatusConverter implements AttributeConverter<MessageStatus, String> {
    @Override
    public String convertToDatabaseColumn(MessageStatus messageStatus) {
        if (messageStatus == null) {
            return null;
        }
        return messageStatus.getCode();
    }

    @Override
    public MessageStatus convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(MessageStatus.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
