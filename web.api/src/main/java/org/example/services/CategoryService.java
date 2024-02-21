package org.example.services;

import org.example.dto.CategoryCreateDTO;
import org.example.dto.CategoryEditDTO;
import org.example.dto.CategoryItemDTO;
import org.example.entities.CategoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryService {
    Page<CategoryItemDTO> getAllCategories(Pageable pageable);
    boolean delete(Integer categoryId);
    CategoryItemDTO getById(Integer categoryId);
    CategoryItemDTO create(CategoryCreateDTO model);
    CategoryItemDTO edit(CategoryEditDTO model);
    Page<CategoryEntity> searchCategories(String keyword, int page, int size);


}
