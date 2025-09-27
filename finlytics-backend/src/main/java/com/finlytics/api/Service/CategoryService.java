package com.finlytics.api.Service;

import com.finlytics.api.DTO.CategoryDTO;
import com.finlytics.api.Entity.CategoryEntity;
import com.finlytics.api.Entity.ProfileEntity;
import com.finlytics.api.Repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final ProfileService profileService;
    private final CategoryRepository categoryRepository;

    public CategoryDTO saveCategory(CategoryDTO categoryDTO) {
        // Check That Category Is Already Created Or No
        //Get The Current logged In Profile
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        if (categoryRepository.existsByNameAndProfileId ( categoryDTO.getName ( ) , currentProfile.getId ( ) )) {
            throw new RuntimeException ( "Category With This Name Already Exists" );
        }
        CategoryEntity category = toEntity ( categoryDTO , currentProfile );
        //If Not exist then create it
        category = categoryRepository.save ( category );

        return toDTO ( category );
    }

    // Get Categories For Current User
    public List<CategoryDTO> getCategoriesForCurrentUser() {
        //Get The Current logged In Profile
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        List<CategoryEntity> categories = categoryRepository.findByProfileId ( currentProfile.getId ( ) );
        return categories.stream ( ).map ( this::toDTO ).toList ( );
    }

    public List<CategoryDTO> getCategoriesByTypeForCurrentUser(String type) {
        //Get The Current logged In Profile
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        List<CategoryEntity> categories = categoryRepository.findByTypeAndProfileId ( type , currentProfile.getId ( ) );
        return categories.stream ( ).map ( this::toDTO ).toList ( );
    }

    public CategoryDTO updateCategory(Long categoryId , CategoryDTO dto) {
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        CategoryEntity existingCategory = categoryRepository.findByIdAndProfileId ( categoryId , currentProfile.getId ( ) )
                .orElseThrow ( () -> new RuntimeException ( "Category Not Found" ) );
        existingCategory.setName ( dto.getName ( ) );
        existingCategory.setIcon ( dto.getIcon ( ) );
        existingCategory.setType ( dto.getType ( ) );
        existingCategory = categoryRepository.save ( existingCategory );
        return toDTO ( existingCategory );
    }

    private CategoryEntity toEntity(CategoryDTO categoryDTO , ProfileEntity profileEntity) {
        return CategoryEntity.builder ( )
                .name ( categoryDTO.getName ( ) )
                .icon ( categoryDTO.getIcon ( ) )
                .profile ( profileEntity )
                .type ( categoryDTO.getType ( ) )
                .build ( );
    }

    private CategoryDTO toDTO(CategoryEntity categoryEntity) {
        return CategoryDTO.builder ( )
                .id ( categoryEntity.getId ( ) )
                .name ( categoryEntity.getName ( ) )
                .type ( categoryEntity.getType ( ) )
                .profileId ( categoryEntity.getProfile ( ) != null ? categoryEntity.getProfile ( ).getId ( ) : null )
                .icon ( categoryEntity.getIcon ( ) )
                .createdAt ( categoryEntity.getCreatedAt ( ) )
                .updatedAt ( categoryEntity.getUpdatedAt ( ) )
                .build ( );
    }
}
