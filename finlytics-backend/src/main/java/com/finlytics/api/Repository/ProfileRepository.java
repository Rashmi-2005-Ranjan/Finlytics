package com.finlytics.api.Repository;

import com.finlytics.api.Entity.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<ProfileEntity, Long> {

    //* SQL Query Run - SELECT * FROM tbl_profiles WHERE email = ?;
    Optional<ProfileEntity> findByEmail(String email);

    Optional<ProfileEntity> findByActivationToken(String activationToken);
}