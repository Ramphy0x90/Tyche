package com.devracom.tyche.msv_chart_of_accounts.dto;

import lombok.Data;

@Data
public class CreateAccount {
    private String type;
    private String subType;
    private String group;
    private String description;
    private String notes;
    private long code;
    private short sign;
    private String accountsPackage;
}
