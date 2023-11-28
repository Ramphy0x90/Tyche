package com.devracom.tyche.msv_chart_of_accounts;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/chart-of-accounts")
public class ChartOfAccountsController {
    private final ChartOfAccountsService chartOfAccountsService;

    public ChartOfAccountsController(ChartOfAccountsService chartOfAccountsService) {
        this.chartOfAccountsService = chartOfAccountsService;
    }

    @GetMapping(path = "/import/example")
    public List<Account> importExample() {
        return chartOfAccountsService.importExample();
    }
}
