package org.example;

import org.example.entities.CategoryEntity;
import org.example.repositories.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner runner(CategoryRepository categoryRepository) {
        return args -> {
            CategoryEntity category = new CategoryEntity();
            category.setName("Міні пігі");
            category.setDescription("Для дорослих людей");
            category.setImage("pig.jpg");
            category.setCreationTime(LocalDateTime.now());

            categoryRepository.save(category);
        };
    }
}