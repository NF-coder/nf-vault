package org.nfVault.controllers;

import lombok.extern.slf4j.Slf4j;
import org.nfVault.exceptions.ExpiredException;
import org.nfVault.exceptions.NotFoundException;
import org.nfVault.exceptions.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionMapper {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<String> handleNotFound(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }

    @ExceptionHandler(ExpiredException.class)
    public ResponseEntity<String> handleExpired(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.GONE)
                .body(ex.getMessage());
    }

    @ExceptionHandler ({
        UnauthorizedException.class, AuthorizationDeniedException.class
    })
    public ResponseEntity<String> handleUnauthorized(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ex.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleAccessDenied(
            AccessDeniedException ex
    ) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Access denied");
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        log.warn("Unexpected error", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Internal error");
    }
}