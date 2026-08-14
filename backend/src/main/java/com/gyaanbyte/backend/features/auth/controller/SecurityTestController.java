package com.gyaanbyte.backend.features.auth.controller;

import com.gyaanbyte.backend.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/security-test")
@Tag(
        name = "Security Test",
        description = "Temporary role authorization tests"
)
public class SecurityTestController {

    @GetMapping("/authenticated")
    @Operation(summary = "Test authenticated access")
    public ApiResponse<String> authenticated(
            HttpServletRequest request
    ) {
        return ApiResponse.success(
                "Authenticated access granted.",
                "You are authenticated.",
                request.getRequestURI()
        );
    }

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(summary = "Test student access")
    public ApiResponse<String> student(
            HttpServletRequest request
    ) {
        return ApiResponse.success(
                "Student access granted.",
                "You have ROLE_STUDENT.",
                request.getRequestURI()
        );
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Test admin access")
    public ApiResponse<String> admin(
            HttpServletRequest request
    ) {
        return ApiResponse.success(
                "Admin access granted.",
                "You have ROLE_ADMIN.",
                request.getRequestURI()
        );
    }

    @GetMapping("/instructor")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    @Operation(summary = "Test instructor access")
    public ApiResponse<String> instructor(
            HttpServletRequest request
    ) {
        return ApiResponse.success(
                "Instructor access granted.",
                "You have ROLE_INSTRUCTOR.",
                request.getRequestURI()
        );
    }

    @GetMapping("/sales")
    @PreAuthorize("hasRole('SALES')")
    @Operation(summary = "Test sales access")
    public ApiResponse<String> sales(
            HttpServletRequest request
    ) {
        return ApiResponse.success(
                "Sales access granted.",
                "You have ROLE_SALES.",
                request.getRequestURI()
        );
    }
}
