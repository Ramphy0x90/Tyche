package com.devracom.tyche.msv_transactions.dto;

import com.devracom.tyche.msv_chart_of_accounts.Account;
import lombok.Data;

@Data
public class RestrictedTransaction {
    private Account account;
    private String notes;
    private boolean isExecuted;
}
