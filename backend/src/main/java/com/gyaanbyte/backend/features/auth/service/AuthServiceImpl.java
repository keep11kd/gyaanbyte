package com.gyaanbyte.backend.features.auth.service;

import com.gyaanbyte.backend.common.exception.EmailAlreadyExistsException;
import com.gyaanbyte.backend.features.auth.dto.LoginRequest;
import com.gyaanbyte.backend.features.auth.dto.LoginResponse;
import com.gyaanbyte.backend.features.auth.dto.RegisterRequest;
import com.gyaanbyte.backend.features.auth.dto.UserResponse;
import com.gyaanbyte.backend.features.auth.entity.User;
import com.gyaanbyte.backend.features.auth.enums.UserRole;
import com.gyaanbyte.backend.features.auth.repository.UserRepository;
import com.gyaanbyte.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyExistsException("Email is already registered");
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(UserRole.STUDENT)
                .emailVerified(false)
                .enabled(true)
                .build();

        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.isEmailVerified()
        );
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        if (!user.isEnabled()) {
            throw new DisabledException("Account is disabled. Please contact support.");
        }

        String accessToken = jwtService.generateAccessToken(user);

        UserResponse userResponse = new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.isEmailVerified()
        );

        return new LoginResponse(userResponse, accessToken);
    }
    @Override
@Transactional(readOnly = true)
public UserResponse getCurrentUser(String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new BadCredentialsException("Authenticated user not found")
            );

    return new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole(),
            user.isEmailVerified()
    );
}
}
