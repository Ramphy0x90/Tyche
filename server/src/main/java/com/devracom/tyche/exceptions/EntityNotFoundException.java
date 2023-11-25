package com.devracom.tyche.exceptions;

import com.mongodb.lang.Nullable;

public class EntityNotFoundException extends RuntimeException{
    public EntityNotFoundException (Class<?> clazz, @Nullable String message) {
        super(String.format(message == null ? "%s was not found" : message, clazz.getName()));
    }
}
