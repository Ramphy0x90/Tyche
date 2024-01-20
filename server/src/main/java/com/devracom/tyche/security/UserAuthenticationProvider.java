package com.devracom.tyche.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.devracom.tyche.exceptions.EntityNotFoundException;
import com.devracom.tyche.exceptions.InvalidTokenException;
import com.devracom.tyche.msv_users.User;
import com.devracom.tyche.msv_users.UsersRepository;
import com.devracom.tyche.msv_users.dto.RestrictedUser;
import com.devracom.tyche.msv_users.dto.UserLoginResponse;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.Base64;
import java.util.Date;
import java.util.List;

@Configuration
public class UserAuthenticationProvider {
    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;
    private final UsersRepository usersRepository;

    public UserAuthenticationProvider(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @PostConstruct()
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(RestrictedUser user) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + 3_600_000);

        return JWT.create()
                .withIssuer(user.getEmail())
                .withIssuedAt(now)
                .withExpiresAt(expiration)
                .withClaim("email", user.getEmail())
                .withClaim("displayName", user.getName() + " " + user.getSurname())
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);

        RestrictedUser user = usersRepository.findByEmailRestricted(decodedJWT.getClaim("email").asString()).orElseThrow(
                () -> new EntityNotFoundException(User.class, null)
        );

        return new UsernamePasswordAuthenticationToken(user, null, List.of());
    }

    public UserLoginResponse verifyToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();

        try {
            DecodedJWT decodedJWT = verifier.verify(token);

            if(decodedJWT.getExpiresAt().after(new Date())) {
                RestrictedUser user = usersRepository.findByEmailRestricted(decodedJWT.getClaim("email").asString()).orElseThrow(
                        () -> new EntityNotFoundException(User.class, null)
                );

                return UserLoginResponse.builder()
                        .user(usersRepository.findByIdRestricted(user.getId()).orElse(null))
                        .token(token)
                        .build();
            }
        } catch (RuntimeException e) {
            throw new InvalidTokenException();
        }

        return null;
    }
}
