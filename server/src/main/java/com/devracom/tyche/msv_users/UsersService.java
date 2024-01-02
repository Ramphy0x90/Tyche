package com.devracom.tyche.msv_users;

import com.devracom.tyche.exceptions.EntityNotFoundException;
import com.devracom.tyche.exceptions.ExistingUserException;
import com.devracom.tyche.exceptions.InvalidCredentialsException;
import com.devracom.tyche.msv_users.dto.RestrictedUser;
import com.devracom.tyche.msv_users.dto.UserLogin;
import com.devracom.tyche.msv_users.dto.UserLoginResponse;
import com.devracom.tyche.msv_users.dto.UserSignUp;
import com.devracom.tyche.security.UserAuthenticationProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.CharBuffer;
import java.util.List;

@Service
@Transactional
public class UsersService {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserAuthenticationProvider userAuthenticationProvider;

    public UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder, UserAuthenticationProvider userAuthenticationProvider) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.userAuthenticationProvider = userAuthenticationProvider;
    }

    public List<RestrictedUser> getUsers() {
        return usersRepository.findAllRestricted();
    }

    public RestrictedUser getUserById(String id) {
        return usersRepository.findByIdRestricted(id).orElseThrow(
                () -> new EntityNotFoundException(User.class, null)
        );
    }

    public RestrictedUser getUserByEmail(String email) {
        return usersRepository.findByEmailRestricted(email).orElseThrow(
                () -> new EntityNotFoundException(User.class, null)
        );
    }

    public UserLoginResponse verifyToken(String token) {
        return userAuthenticationProvider.verifyToken(token);
    }

    public UserLoginResponse login(UserLogin credentials) {
        User user = usersRepository.findByEmail(credentials.getEmail()).orElseThrow(
                () -> new EntityNotFoundException(User.class, null)
        );

        if(passwordEncoder.matches(CharBuffer.wrap(credentials.getPassword()), user.getPassword())) {
            RestrictedUser userRestricted = usersRepository.findByIdRestricted(user.getId()).orElse(null);

            assert userRestricted != null;
            return UserLoginResponse.builder()
                    .user(usersRepository.findByIdRestricted(user.getId()).orElse(null))
                    .token(userAuthenticationProvider.createToken(userRestricted))
                    .build();
        }

        throw new InvalidCredentialsException();
    }

    public RestrictedUser signup(UserSignUp user) {
        if(usersRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ExistingUserException();
        }

        User newUser = User.builder()
                .email(user.getEmail())
                .name(user.getName())
                .surname(user.getSurname())
                .password(passwordEncoder.encode(user.getPassword()))
                .isActive(true)
                .build();

        return getUserById(usersRepository.save(newUser).getId());
    }
}
