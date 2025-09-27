package com.finlytics.api.Repository;

import com.finlytics.api.Entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    //Select * from tbl_categories where profile_id = ?;
    List<CategoryEntity> findByProfileId(Long profile_id);

    //Select * from tbl_categories where id = ? and profile_id = ?;
    Optional<CategoryEntity> findByIdAndProfileId(Long id , Long profile_id);

    //Select * from tbl_categories where type = ? and profile_id = ?;
    List<CategoryEntity> findByTypeAndProfileId(String type,Long profileId);

    Boolean existsByNameAndProfileId(String name,Long profileId);
}