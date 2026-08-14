package com.gyaanbyte.backend.features.auth.dto;

public record LoginResponse(
        UserResponse user,
        String accessToken
) {
}
