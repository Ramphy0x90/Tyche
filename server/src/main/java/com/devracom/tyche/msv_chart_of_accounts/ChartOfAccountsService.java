package com.devracom.tyche.msv_chart_of_accounts;

import com.devracom.tyche.exceptions.EntityNotFoundException;
import com.devracom.tyche.msv_chart_of_accounts.dto.CreateAccount;
import com.devracom.tyche.msv_chart_of_accounts.dto.RestrictedAccount;
import com.devracom.tyche.msv_users.dto.RestrictedUser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.lang.Nullable;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    public List<RestrictedAccount> getAccountsRestricted(String accountsPackage) {
        return chartOfAccountsRepository.findAllRestrictedByPackage(accountsPackage);
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
        String userId = ((RestrictedUser)(SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getId();

        if(chartOfAccountsRepository.findAllByPackage("Example1").isEmpty()) {
            try {
                PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
                Resource[] resources = resolver.getResources("classpath:static/msv_chart_of_accounts/*.json");
                File tempDir = Files.createTempDirectory("jsonResources").toFile();
                
                List<File> jsonFiles = Stream.of(resources).map(resource -> {
                    File tempFile = new File(tempDir, Objects.requireNonNull(resource.getFilename()));
                    try (InputStream is = resource.getInputStream(); FileOutputStream os = new FileOutputStream(tempFile)) {
                        byte[] buffer = new byte[1024];
                        int bytesRead;
                        while ((bytesRead = is.read(buffer)) != -1) {
                            os.write(buffer, 0, bytesRead);
                        }
                        return tempFile;
                    } catch (IOException e) {
                        throw new RuntimeException("Failed to read and write resource file", e);
                    }
                }).toList();

                for (File file : jsonFiles) {
                    FileInputStream inputStream = new FileInputStream(file);
                    byte[] jsonData = inputStream.readAllBytes();

                    String jsonContent = new String(jsonData, StandardCharsets.UTF_8);
                    ObjectMapper objectMapper = new ObjectMapper();
                    List<Account> entities = objectMapper.readValue(jsonContent, new TypeReference<>() {});
                    entities = entities.stream().peek(account -> {
                                        account.setAccountsPackage("Example1");
                                        account.setUserId(userId);
                                    }).collect(Collectors.toList());

                    chartOfAccountsRepository.saveAll(entities);
                    inputStream.close();
                }
            } catch (IOException | SecurityException e) {
                throw new RuntimeException("Error during chart of accounts import");
            }
        }

        return chartOfAccountsRepository.findAllByPackage("Example1");
    }

    public Account create(CreateAccount account) {
        String userId = ((RestrictedUser)(SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getId();

        Account newAccount = Account.builder()
                .type(account.getType())
                .subType(account.getSubType())
                .group(account.getGroup())
                .description(account.getDescription())
                .notes(account.getNotes())
                .code(account.getCode())
                .sign(account.getSign())
                .accountsPackage(account.getAccountsPackage())
                .userId(userId)
                .build();

        return chartOfAccountsRepository.save(newAccount);
    }

    public Account update(Account account) {
        return chartOfAccountsRepository.save(account);
    }

    public void delete(String id) {
        Account account = chartOfAccountsRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(Account.class, null)
        );

        chartOfAccountsRepository.delete(account);
    }
}
