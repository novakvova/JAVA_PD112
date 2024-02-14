package org.example.storage;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    void init();
    String SaveImage(MultipartFile file, FileSaveFormat format);
}
