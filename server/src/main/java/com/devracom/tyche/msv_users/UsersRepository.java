package com.devracom.tyche.msv_users;

import com.devracom.tyche.msv_users.dto.RestrictedUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends MongoRepository<User, String> {
    @Query("{}")
    List<RestrictedUser> findAllRestricted();

    @Query("{_id:  ?0}")
    Optional<RestrictedUser> findByIdRestricted(String id);

    @Query("{email: ?0}")
    Optional<RestrictedUser> findByEmailRestricted(String email);

    @Query("{email: ?0}")
    Optional<User> findByEmail(String email);
}
