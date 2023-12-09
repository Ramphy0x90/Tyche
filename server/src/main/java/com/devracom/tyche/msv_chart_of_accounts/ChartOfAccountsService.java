package com.devracom.tyche.msv_chart_of_accounts;

import com.devracom.tyche.exceptions.EntityNotFoundException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ChartOfAccountsService {
    private final ChartOfAccountsRepository chartOfAccountsRepository;

    public ChartOfAccountsService(ChartOfAccountsRepository chartOfAccountsRepository) {
        this.chartOfAccountsRepository = chartOfAccountsRepository;
    }

    public List<Account> getAccounts(@Nullable String accountsPackage) {
        if(accountsPackage != null) {
            return chartOfAccountsRepository.findAllByPackage(accountsPackage);
        }

        return chartOfAccountsRepository.findAll();
    }

    public Account getAccount(String id) {
        return chartOfAccountsRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(Account.class, null)
        );
    }

    public List<String> getAccountsPackages() {
        List<Account> accounts = chartOfAccountsRepository.findAll();

        return accounts.stream()
                .map(Account::getAccountsPackage)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<Account> importExample() {
        try {
            String directoryPath = "src/main/resources/static/msv_chart_of_accounts";

            // List all JSON files in the directory
            List<File> jsonFiles = Files.walk(Paths.get(directoryPath))
                    .filter(Files::isRegularFile)
                    .filter(p -> p.toString().endsWith(".json"))
                    .map(Path::toFile)
                    .toList();

            for (File file : jsonFiles) {
                FileInputStream inputStream = new FileInputStream(file);
                byte[] jsonData = inputStream.readAllBytes();

                String jsonContent = new String(jsonData, StandardCharsets.UTF_8);
                ObjectMapper objectMapper = new ObjectMapper();
                List<Account> entities = objectMapper.readValue(jsonContent, new TypeReference<>() {});
                entities = entities.stream().peek(account -> account.setAccountsPackage("Example1")).collect(Collectors.toList());

                chartOfAccountsRepository.saveAll(entities);
                inputStream.close();
            }
        } catch (IOException | SecurityException e) {
            throw new RuntimeException("Error during chart of accounts import");
        }

        return chartOfAccountsRepository.findAll();
    }
}
