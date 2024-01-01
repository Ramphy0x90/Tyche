package com.devracom.tyche.msv_users.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserLoginResponse {
    private RestrictedUser user;
    private String token;
}
