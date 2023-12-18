package com.devracom.tyche.msv_transactions;

import com.devracom.tyche.exceptions.EntityNotFoundException;
import com.devracom.tyche.msv_transactions.dto.RestrictedTransaction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TransactionsService {
    private final TransactionsRepository transactionsRepository;

    public TransactionsService(TransactionsRepository transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    public List<Transaction> getTransactions() {
        return transactionsRepository.findAll();
    }

    public Transaction getTransaction(String id) {
        return transactionsRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(Transaction.class, null)
        );
    }

    public Transaction createTransaction(RestrictedTransaction transaction) {
        Transaction newTransaction = Transaction.builder()
                .account(transaction.getAccount())
                .value(transaction.getValue())
                .notes(transaction.getNotes())
                .isExecuted(transaction.isExecuted())
                .build();

        return transactionsRepository.save(newTransaction);
    }

    public Transaction updateTransaction(String id, Transaction transaction) {
        Transaction storedTransaction = transactionsRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(Transaction.class, null)
        );

        storedTransaction.setAccount(transaction.getAccount());
        storedTransaction.setNotes(transaction.getNotes());
        storedTransaction.setExecutionDate(transaction.getExecutionDate());
        storedTransaction.setExecuted(transaction.isExecuted());

        return storedTransaction;
    }

    public void deleteTransaction(String id) {
        Transaction storedTransaction = transactionsRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(Transaction.class, null)
        );

        transactionsRepository.delete(storedTransaction);
    }
}
