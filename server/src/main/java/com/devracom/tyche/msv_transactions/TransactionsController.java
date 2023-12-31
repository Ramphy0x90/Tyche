package com.devracom.tyche.msv_transactions;

import com.devracom.tyche.msv_transactions.dto.RestrictedTransaction;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/transactions")
public class TransactionsController {
    private final TransactionsService transactionsService;

    public TransactionsController(TransactionsService transactionsService) {
        this.transactionsService = transactionsService;
    }

    @Operation(summary = "Get all transactions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
    })
    @GetMapping("/all")
    public List<Transaction> getTransactions() {
        return transactionsService.getTransactions();
    }

    @Operation(summary = "Get transaction by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
            @ApiResponse(responseCode = "404", description = "Transaction not found", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransaction(@PathVariable("id") String id) {
        return new ResponseEntity<>(transactionsService.getTransaction(id), HttpStatus.OK);
    }

    @Operation(summary = "Create transaction")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Transaction created successfully"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
    })
    @PostMapping(path = "/create")
    public ResponseEntity<Transaction> createTransaction(@RequestBody RestrictedTransaction transaction) {
        return new ResponseEntity<>(transactionsService.createTransaction(transaction), HttpStatus.OK);
    }

    @Operation(summary = "Update transaction data")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Transaction updated"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Transaction not found", content = @Content),
    })
    @PutMapping(path = "/update")
    public ResponseEntity<Transaction> updateTransaction(@RequestBody Transaction transaction) {
        return new ResponseEntity<>(transactionsService.updateTransaction(transaction), HttpStatus.OK);
    }

    @Operation(summary = "Delete transaction by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Transaction deleted"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
            @ApiResponse(responseCode = "404", description = "Transaction not found", content = @Content),
    })
    @DeleteMapping(path = "/delete/{id}")
    public void deleteTransaction(@PathVariable("id") String id) {
        transactionsService.deleteTransaction(id);
    }
}
