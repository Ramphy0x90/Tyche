package com.devracom.tyche.msv_chart_of_accounts;

import com.devracom.tyche.msv_chart_of_accounts.dto.CreateAccount;
import com.devracom.tyche.msv_chart_of_accounts.dto.RestrictedAccount;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/chart-of-accounts")
public class ChartOfAccountsController {
    private final ChartOfAccountsService chartOfAccountsService;

    public ChartOfAccountsController(ChartOfAccountsService chartOfAccountsService) {
        this.chartOfAccountsService = chartOfAccountsService;
    }

    @Operation(summary = "Get all chart of accounts")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
    })
    @GetMapping(path = "/all")
    public List<Account> getChartOfAccounts() {
        return chartOfAccountsService.getAccounts(null);
    }

    @Operation(summary = "Get all chart of accounts by package")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
    })
    @GetMapping(path = "/all/{package}")
    public List<Account> getChartOfAccountsByPackage(@PathVariable("package") String accountsPackage) {
        return chartOfAccountsService.getAccounts(accountsPackage);
    }

    @Operation(summary = "Get all chart of accounts restricted by package")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
    })
    @GetMapping(path = "/all/restricted/{package}")
    public List<RestrictedAccount> getChartOfAccountsRestrictedByPackage(@PathVariable("package") String accountsPackage) {
        return chartOfAccountsService.getAccountsRestricted(accountsPackage);
    }

    @Operation(summary = "Get chart by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
            @ApiResponse(responseCode = "404", description = "Account not found", content = @Content)
    })
    @GetMapping(path = "/{id}")
    public ResponseEntity<Account> getChartOfAccounts(@PathVariable("id") String id) {
        return new ResponseEntity<>(chartOfAccountsService.getAccount(id), HttpStatus.OK);
    }

    @Operation(summary = "Get all chart of accounts packages")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
    })
    @GetMapping(path = "/packages")
    public List<String> getChartOfAccountsPackages() {
        return chartOfAccountsService.getAccountsPackages();
    }

    @Operation(summary = "Import example of chart of accounts")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
    })
    @GetMapping(path = "/import/example")
    public List<Account> importExample() {
        return chartOfAccountsService.importExample();
    }

    @Operation(summary = "Create account")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Account created successfully"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
    })
    @PostMapping(path = "/create")
    public ResponseEntity<Account> createAccount(@RequestBody CreateAccount account) {
        return new ResponseEntity<>(chartOfAccountsService.create(account), HttpStatus.OK);
    }

    @Operation(summary = "Update account")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Account updated successfully"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
    })
    @PutMapping(path = "/update")
    public ResponseEntity<Account> updateAccount(@RequestBody Account account) {
        return new ResponseEntity<>(chartOfAccountsService.update(account), HttpStatus.OK);
    }

    @Operation(summary = "Delete account by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Account deleted"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
            @ApiResponse(responseCode = "404", description = "Account not found", content = @Content),
    })
    @DeleteMapping(path = "/delete/{id}")
    public void deleteAccount(@PathVariable("id") String id) {
        chartOfAccountsService.delete(id);
    }
}
