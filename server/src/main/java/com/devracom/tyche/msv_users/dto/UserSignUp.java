package com.devracom.tyche.msv_users.dto;

import lombok.Data;

@Data
public class UserSignUp {
    private String email;
    private String name;
    private String surname;
    private String password;
}
