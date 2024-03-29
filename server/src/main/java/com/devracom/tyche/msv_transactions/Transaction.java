package com.devracom.tyche.msv_transactions;


import com.devracom.tyche.msv_chart_of_accounts.Account;
import com.devracom.tyche.msv_users.dto.RestrictedUser;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    private String id;

    @DBRef
    private Account account;

    private String userId;
    private long value;
    private String notes;
    private Date executionDate;

    @JsonProperty("isExecuted")
    private boolean isExecuted;

    @CreatedDate
    private Date createdDate;

    @LastModifiedDate
    private Date lastModifiedDate;
}
