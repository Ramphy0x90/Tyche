package com.devracom.tyche.msv_transactions;

import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class TransactionEventListener extends AbstractMongoEventListener<Transaction> {

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Transaction> event) {
        Transaction transaction = event.getSource();

        if (transaction.isExecuted() && transaction.getExecutionDate() == null) {
            transaction.setExecutionDate(new Date());
        }
    }
}