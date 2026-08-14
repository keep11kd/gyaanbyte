package com.gyaanbyte.backend.features.auth.service;

import com.gyaanbyte.backend.features.auth.dto.LoginRequest;
import com.gyaanbyte.backend.features.auth.dto.LoginResponse;
import com.gyaanbyte.backend.features.auth.dto.RegisterRequest;
import com.gyaanbyte.backend.features.auth.dto.UserResponse;

public interface AuthService {

    UserResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    UserResponse getCurrentUser(String email);
}
