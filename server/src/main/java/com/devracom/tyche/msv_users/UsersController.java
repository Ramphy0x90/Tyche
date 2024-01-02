package com.devracom.tyche.msv_users;

import com.devracom.tyche.msv_users.dto.RestrictedUser;
import com.devracom.tyche.msv_users.dto.UserLogin;
import com.devracom.tyche.msv_users.dto.UserLoginResponse;
import com.devracom.tyche.msv_users.dto.UserSignUp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/user")
public class UsersController {
    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @Operation(summary = "Get all users (fields restricted)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
    })
    @GetMapping(path = "/all")
    public List<RestrictedUser> getUsers() {
        return usersService.getUsers();
    }

    @Operation(summary = "Get user by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @GetMapping(path = "/{id}")
    public ResponseEntity<RestrictedUser> getUser(@PathVariable("id") String id) {
        return new ResponseEntity<>(usersService.getUserById(id), HttpStatus.OK);
    }

    @Operation(summary = "Check if user token is valid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200"),
            @ApiResponse(responseCode = "403", description = "Invalid token", content = @Content),
    })
    @GetMapping(path = "/check/token/{token}")
    public ResponseEntity<UserLoginResponse> verifyToken(@PathVariable("token") String token) {
        return new ResponseEntity<>(usersService.verifyToken(token), HttpStatus.OK);
    }

    @Operation(summary = "User login")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @PostMapping(path = "/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody UserLogin credentials) {
        return new ResponseEntity<>(usersService.login(credentials), HttpStatus.OK);
    }

    @Operation(summary = "User signup")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201"),
            @ApiResponse(responseCode = "401", description = "Authorization denied", content = @Content),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @PostMapping(path = "/signup")
    public ResponseEntity<RestrictedUser> signup(@RequestBody UserSignUp user) {
        return new ResponseEntity<>(usersService.signup(user), HttpStatus.OK);
    }
}
