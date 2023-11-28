package com.devracom.tyche.msv_chart_of_accounts;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChartOfAccountsRepository extends MongoRepository<Account, String> {
}
