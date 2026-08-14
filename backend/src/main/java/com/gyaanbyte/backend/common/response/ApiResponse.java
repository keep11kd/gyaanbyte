package com.gyaanbyte.backend.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
        boolean success,
        String message,
        T data,
        LocalDateTime timestamp,
        String path
) {

    public static <T> ApiResponse<T> success(
            String message,
            T data,
            String path
    ) {
        return new ApiResponse<>(
                true,
                message,
                data,
                LocalDateTime.now(),
                path
        );
    }

    public static <T> ApiResponse<T> success(
            T data,
            String path
    ) {
        return success(
                "Request processed successfully.",
                data,
                path
        );
    }

    public static <T> ApiResponse<T> success(
            String message,
            String path
    ) {
        return new ApiResponse<>(
                true,
                message,
                null,
                LocalDateTime.now(),
                path
        );
    }

    public static <T> ApiResponse<T> failure(
            String message,
            String path
    ) {
        return new ApiResponse<>(
                false,
                message,
                null,
                LocalDateTime.now(),
                path
        );
    }

    public static <T> ApiResponse<T> failure(
            String message,
            T data,
            String path
    ) {
        return new ApiResponse<>(
                false,
                message,
                data,
                LocalDateTime.now(),
                path
        );
    }
}
