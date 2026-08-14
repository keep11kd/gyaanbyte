package com.gyaanbyte.backend.features.health.controller;

import com.gyaanbyte.backend.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
@Tag(name = "Health Check", description = "Endpoints to check application status and health")
public class HealthController {

    @GetMapping
    @Operation(summary = "Check application health", description = "Returns the current health status, environment, and server time.")
    public ApiResponse<Map<String, Object>> health(
            HttpServletRequest request
    ) {
        Map<String, Object> data = new LinkedHashMap<>();

        data.put("status", "UP");
        data.put("application", "GyaanByte Backend");
        data.put("version", "1.0.0");
        data.put("environment", "Development");
        data.put("serverTime", LocalDateTime.now());

        return ApiResponse.success(
                "Application is running successfully.",
                data,
                request.getRequestURI()
        );
    }
}
