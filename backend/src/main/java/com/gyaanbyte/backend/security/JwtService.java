package com.gyaanbyte.backend.security;

import com.gyaanbyte.backend.features.auth.entity.User;
import org.springframework.security.oauth2.jwt.Jwt;

public interface JwtService {

    String generateAccessToken(User user);

    String extractUsername(Jwt jwt);

    boolean isTokenValid(Jwt jwt, User user);
}
