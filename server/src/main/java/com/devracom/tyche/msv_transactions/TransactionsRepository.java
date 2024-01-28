package com.devracom.tyche.msv_transactions;

import com.devracom.tyche.msv_chart_of_accounts.Account;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionsRepository extends MongoRepository<Transaction, String> {
    @Query("{user._id: ?0}")
    List<Account> findAllByUserId(String userId);
}
