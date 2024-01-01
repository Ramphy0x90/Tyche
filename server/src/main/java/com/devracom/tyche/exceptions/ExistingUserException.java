package com.devracom.tyche.exceptions;

public class ExistingUserException extends RuntimeException{
    public ExistingUserException() {
        super("User already exists");
    }
}
