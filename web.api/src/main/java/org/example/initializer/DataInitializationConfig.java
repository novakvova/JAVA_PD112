package org.example.initializer;

import com.github.javafaker.Faker;
import lombok.AllArgsConstructor;
import org.example.constants.Roles;
import org.example.entities.CategoryEntity;
import org.example.entities.RoleEntity;
import org.example.entities.UserEntity;
import org.example.entities.UserRoleEntity;
import org.example.repositories.CategoryRepository;
import org.example.repositories.RoleRepository;
import org.example.repositories.UserRepository;
import org.example.repositories.UserRoleRepository;
import org.example.storage.FileSaveFormat;
import org.example.storage.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Configuration
@AllArgsConstructor
public class DataInitializationConfig {

    private final CategoryRepository categoryRepository;
    private final StorageService storageService;

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    @Transactional
    public CommandLineRunner initData() {
        return args -> {
            if (categoryRepository.count() < 100) {
                addSampleCategories();
            }
            seedRole();
            seedUser();
        };
    }

    private void addSampleCategories() {
        Faker faker = new Faker();

        List<CategoryEntity> categories = IntStream.rangeClosed(1, 100)
                .mapToObj(i -> createRandomCategory(faker))
                .collect(Collectors.toList());

        categoryRepository.saveAll(categories);
    }

    private void seedRole() {
        if(roleRepository.count() == 0) {
            RoleEntity admin = RoleEntity
                    .builder()
                    .name(Roles.Admin)
                    .build();
            roleRepository.save(admin);
            RoleEntity user = RoleEntity
                    .builder()
                    .name(Roles.User)
                    .build();
            roleRepository.save(user);
        }
    }

    private void seedUser() {
        if(userRepository.count() == 0) {
            var user = UserEntity
                    .builder()
                    .email("admin@gmail.com")
                    .firstName("Микола")
                    .lastName("Підкаблучник")
                    .phone("+380 97 67 56 464")
                    .password(passwordEncoder.encode("123456"))
                    .build();
            userRepository.save(user);
            var role = roleRepository.findByName(Roles.Admin);
            var ur = UserRoleEntity
                    .builder()
                    .role(role)
                    .user(user)
                    .build();
            userRoleRepository.save(ur);
        }
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