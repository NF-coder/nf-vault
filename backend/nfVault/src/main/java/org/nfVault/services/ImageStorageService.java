package org.nfVault.services;

import org.nfVault.exceptions.NotFoundException;
import org.nfVault.util.images.ImageFileExtension;
import org.nfVault.repository.ImageRepository;
import org.nfVault.util.images.formatValidation.ImageFileValidator;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageStorageService {
    private final ImageRepository imageRepository;
    private final ImageFileValidator imageFileValidator;

    public record StoredImage(Resource resource, MediaType mediaType) {}

    public ImageStorageService(ImageRepository imageRepository, ImageFileValidator imageFileValidator) {
        this.imageRepository = imageRepository;
        this.imageFileValidator = imageFileValidator;
    }

    public String store(MultipartFile image) {
        ImageFileExtension extension = imageFileValidator.validate(image);
        return imageRepository.store(image, extension);
    }

    public StoredImage get(String fileName) {
        ImageFileExtension extension = ImageFileExtension.fromFileName(fileName)
                .orElseThrow(() -> new NotFoundException("Image not found"));

        Resource resource = imageRepository.get(fileName)
                .orElseThrow(() -> new NotFoundException("Image not found"));

        return new StoredImage(resource, extension.mediaType());
    }
}
