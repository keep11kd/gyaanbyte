package com.gyaanbyte.backend.common.exception;

public record FieldValidationError(

        String field,

        Object rejectedValue,

        String message

) {

    public static FieldValidationError of(
            String field,
            Object rejectedValue,
            String message
    ) {

        return new FieldValidationError(
                field,
                rejectedValue,
                message
        );
    }
}
