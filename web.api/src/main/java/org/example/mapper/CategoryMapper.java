package org.example.mapper;

import org.example.dto.CategoryCreateDTO;
import org.example.dto.CategoryItemDTO;
import org.example.entities.CategoryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);
    @Mapping(source = "creationTime", target = "dateCreated", dateFormat = "dd.MM.yyyy HH:mm:ss")
    CategoryItemDTO categoryItemDTO(CategoryEntity category);
    List<CategoryItemDTO> categoryItemDTOList(List<CategoryEntity> categories);
    @Mapping(target = "file", ignore = true)
    CategoryEntity categoryEntityByCategoryCreateDTO(CategoryCreateDTO category);
}
