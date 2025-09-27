package com.finlytics.api.Controller;

import com.finlytics.api.DTO.CategoryDTO;
import com.finlytics.api.Service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("/add-category")
    public ResponseEntity<CategoryDTO> saveCategory(@RequestBody CategoryDTO categoryDTO) {
        CategoryDTO savedCategory = categoryService.saveCategory ( categoryDTO );
        return ResponseEntity.status ( HttpStatus.CREATED ).body ( savedCategory );
    }

    @GetMapping("/get-categories")
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        List<CategoryDTO> categoriesForCurrentUser = categoryService.getCategoriesForCurrentUser ( );
        return ResponseEntity.ok ( categoriesForCurrentUser );
    }

    @GetMapping("/get-categories-by-type/{type}")
    public ResponseEntity<List<CategoryDTO>> getCategoriesByType(@PathVariable String type) {
        List<CategoryDTO> categoriesByTypeForCurrentUser = categoryService.getCategoriesByTypeForCurrentUser ( type );
        return ResponseEntity.ok ( categoriesByTypeForCurrentUser );
    }

    @PutMapping("/update-category/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long categoryId , @RequestBody CategoryDTO categoryDTO) {
        CategoryDTO updatedCategory = categoryService.updateCategory ( categoryId , categoryDTO );
        return ResponseEntity.ok ( updatedCategory );
    }
}