package com.gyaanbyte.backend.features.auth.controller;

import com.gyaanbyte.backend.common.response.ApiResponse;
import com.gyaanbyte.backend.features.auth.dto.LoginRequest;
import com.gyaanbyte.backend.features.auth.dto.LoginResponse;
import com.gyaanbyte.backend.features.auth.dto.RegisterRequest;
import com.gyaanbyte.backend.features.auth.dto.UserResponse;
import com.gyaanbyte.backend.features.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for user registration and authentication")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Register a new user", description = "Creates a new user account with the provided details.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Registration successful"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation error"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "409", description = "Email already registered")
    })
    public ApiResponse<UserResponse> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletRequest httpRequest
    ) {
        UserResponse user = authService.register(request);

        return ApiResponse.success(
                "Registration successful.",
                user,
                httpRequest.getRequestURI()
        );
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user", description = "Validates user credentials and returns a JWT access token.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Login successful"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Invalid credentials"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Account disabled")
    })
    public ApiResponse<LoginResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest
    ) {
        LoginResponse response = authService.login(request);

        return ApiResponse.success(
                "Login successful.",
                response,
                httpRequest.getRequestURI()
        );
    }

    @GetMapping("/me")
@Operation(
    summary = "Get current authenticated user",
    description = "Returns the profile of the currently authenticated user."
)
public ApiResponse<UserResponse> me(
        Authentication authentication,
        HttpServletRequest httpRequest
) {
    UserResponse response = authService.getCurrentUser(authentication.getName());

    return ApiResponse.success(
            "Current user retrieved successfully.",
            response,
            httpRequest.getRequestURI()
    );
}
}
