package com.devracom.tyche.msv_chart_of_accounts;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChartOfAccountsRepository extends MongoRepository<Account, String> {
    @Query("{accountsPackage: ?0}")
    List<Account> findAllByPackage(String accountsPackage);
}
