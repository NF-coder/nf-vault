package org.nfVault.exceptions;

public class ConflictException extends RuntimeException {
    public ConflictException(String message) {
        super(message);
    }
    public ConflictException() {
    super("Conflict");
  };
}
