package com.example.myadsapp.security.jwt;

import com.example.myadsapp.service.dto.UserDto;
import com.example.myadsapp.ui.model.JwtPayload;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtils {

    @Autowired
    ObjectMapper objectMapper;

    @Value("${jwt.secret}")
    private String secret;

    /**
     * Tries to parse specified String as a JWT token. If successful, returns email.
     * If unsuccessful (token is invalid), simply returns null.
     *
     * @param token the JWT token to parse
     * @return email from specified token or null if a token is invalid.
     */
    public String parseToken(String token) {
        try {
            Claims body = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            JwtPayload jwtPayload = objectMapper.readValue(body.getSubject(), JwtPayload.class);

            return jwtPayload.getEmail();
        } catch (JwtException | ClassCastException | JsonProcessingException e) {
            return null;
        }
    }

    /**
     * Generates a JWT token containing username, userId, firstName.
     *
     * @param userDto the user information for which the token will be generated
     * @return the JWT token
     */
    public String generateToken(UserDto userDto) {
        Claims claims = null;
        try {
            JwtPayload jwtPayload = JwtPayload.builder()
                    .userId(userDto.getId())
                    .email(userDto.getEmail())
                    .firstName(userDto.getFirstName())
                    .lastName(userDto.getLastName())
                    .build();

            claims = Jwts.claims().setSubject(objectMapper.writeValueAsString(jwtPayload));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
}
