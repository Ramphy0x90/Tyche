package com.devracom.tyche.msv_users.dto;

import lombok.Data;

@Data
public class RestrictedUser {
    private String id;
    private String email;
    private String name;
    private String surname;
    private boolean isActive;
}
