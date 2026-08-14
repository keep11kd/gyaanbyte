package com.gyaanbyte.backend.features.auth.dto;

import com.gyaanbyte.backend.features.auth.enums.UserRole;
import java.util.UUID;

public record UserResponse(
        UUID id,
        String name,
        String email,
        UserRole role,
        boolean emailVerified
) {
}
