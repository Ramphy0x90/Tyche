package com.devracom.tyche.msv_transactions.dto;

import com.devracom.tyche.msv_chart_of_accounts.Account;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RestrictedTransaction {
    private Account account;
    private long value;
    private String notes;

    @JsonProperty
    private boolean isExecuted;
}
