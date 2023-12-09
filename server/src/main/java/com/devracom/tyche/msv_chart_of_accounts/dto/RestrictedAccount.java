package com.devracom.tyche.msv_chart_of_accounts.dto;

import lombok.Data;

@Data
public class RestrictedAccount {
    private String id;
    private String description;
    private byte sign;
}
