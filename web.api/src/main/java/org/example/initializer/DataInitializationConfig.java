package org.example.initializer;

import com.github.javafaker.Faker;
import lombok.AllArgsConstructor;
import org.example.entities.CategoryEntity;
import org.example.repositories.CategoryRepository;
import org.example.storage.FileSaveFormat;
import org.example.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Configuration
@AllArgsConstructor
public class DataInitializationConfig {

    private final CategoryRepository categoryRepository;
    private final StorageService storageService;

    @Bean
    @Transactional
    public CommandLineRunner initData() {
        return args -> {
            if (categoryRepository.count() < 100) {
                addSampleCategories();
            }
        };
    }

    private void addSampleCategories() {
        Faker faker = new Faker();

        List<CategoryEntity> categories = IntStream.rangeClosed(1, 100)
                .mapToObj(i -> createRandomCategory(faker))
                .collect(Collectors.toList());

        categoryRepository.saveAll(categories);
    }

    private CategoryEntity createRandomCategory(Faker faker) {
        CategoryEntity category = new CategoryEntity();
        category.setCreationTime(LocalDateTime.now());
        category.setName(faker.food().ingredient());

        // Modify to use a random sample image from the resources
        String imageUrl = "https://picsum.photos/800/600";;

        String fileName = storageService.SaveImageURL(imageUrl, FileSaveFormat.WEBP);
        category.setImage(fileName);

        category.setDescription(faker.lorem().paragraph());
        return category;
    }


}