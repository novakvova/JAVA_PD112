package org.example.services;

import lombok.AllArgsConstructor;
import org.example.dto.category.CategoryCreateDTO;
import org.example.dto.category.CategoryEditDTO;
import org.example.dto.category.CategoryItemDTO;
import org.example.dto.category.CategorySearchResultDTO;
import org.example.dto.common.SelectItemDTO;
import org.example.dto.product.ProductItemDTO;
import org.example.entities.CategoryEntity;
import org.example.mapper.CategoryMapper;
import org.example.repositories.CategoryRepository;
import org.example.storage.FileSaveFormat;
import org.example.storage.StorageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final StorageService storageService;

    @Override
    public CategorySearchResultDTO getAllCategories(Pageable pageable) {
        Page<CategoryEntity> search = categoryRepository.findAll(pageable);
        var searchResult = new CategorySearchResultDTO();
        searchResult.setList(categoryMapper.categoryItemDTOList(search.getContent()));
        searchResult.setTotalCount((int)search.getTotalElements());
        return searchResult;
    }

    @Override
    public boolean delete(Integer categoryId) {
        var entity = categoryRepository.findById(categoryId).orElse(null);
        if (entity == null) {
            return false;
        }
        try {
            storageService.deleteImage(entity.getImage());
            categoryRepository.deleteById(categoryId);
            return true;
        }
        catch (Exception exception) {
            return false;
        }
    }

    @Override
    public CategoryItemDTO getById(Integer categoryId) {
        var entity = categoryRepository.findById(categoryId).orElse(null);
        if (entity == null) {
            return null;
        }
        return categoryMapper.categoryItemDTO(entity);
    }

    @Override
    public CategoryItemDTO create(CategoryCreateDTO model) {
        var entity = categoryMapper.categoryEntityByCategoryCreateDTO(model);
        entity.setCreationTime(LocalDateTime.now());
        String fileName = storageService.SaveImage(model.getFile(), FileSaveFormat.WEBP);
        entity.setImage(fileName);
        categoryRepository.save(entity);
        return categoryMapper.categoryItemDTO(entity);
    }

    @Override
    public CategoryItemDTO edit(CategoryEditDTO model) {
        var old = categoryRepository.findById(model.getId()).orElse(null);
        if (old == null) {
            return null;
        }
        var entity = categoryMapper.categoryEditDto(model);
        if(model.getFile()==null) {
            entity.setImage(old.getImage());
        }
        else {
            try {
                storageService.deleteImage(old.getImage());
                String fileName = storageService.SaveImage(model.getFile(), FileSaveFormat.WEBP);
                entity.setImage(fileName);
            }
            catch (Exception exception) {
                return null;
            }
        }
        categoryRepository.save(entity);
        return categoryMapper.categoryItemDTO(entity);
    }

    @Override
    public CategorySearchResultDTO searchCategories(String keyword, int page, int size) {
        var result = categoryRepository.searchByNameContainingIgnoreCase(keyword, PageRequest.of(page, size));
        var searchResult = new CategorySearchResultDTO();
        searchResult.setList(categoryMapper.categoryItemDTOList(result.getContent()));
        searchResult.setTotalCount((int)result.getTotalElements());
        return searchResult;
    }

    @Override
    public List<SelectItemDTO> getNames() {
        var products = categoryRepository.findAll().stream()
                .map(category -> {
                    var dto = categoryMapper.selectItemDTO(category);
                    return dto;
                })
                .collect(Collectors.toList());
        return products;
    }
}