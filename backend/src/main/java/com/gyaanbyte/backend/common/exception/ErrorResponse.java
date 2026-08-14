package com.gyaanbyte.backend.common.exception;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ErrorResponse(

        boolean success,

        int status,

        String error,

        String message,

        String path,

        LocalDateTime timestamp,

        List<FieldValidationError> errors

) {

    public static ErrorResponse of(
            int status,
            String error,
            String message,
            String path
    ) {

        return new ErrorResponse(
                false,
                status,
                error,
                message,
                path,
                LocalDateTime.now(),
                null
        );
    }

    public static ErrorResponse of(
            int status,
            String error,
            String message,
            String path,
            List<FieldValidationError> errors
    ) {

        return new ErrorResponse(
                false,
                status,
                error,
                message,
                path,
                LocalDateTime.now(),
                errors
        );
    }
}
