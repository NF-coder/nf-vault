package org.nfVault.controllers;

import org.nfVault.config.ApiVersionConfig;
import org.nfVault.controllers.DTO.UploadImageResponse;
import org.nfVault.services.ImageStorageService;
import org.nfVault.services.ImageStorageService.StoredImage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/image")
public class ImageController {
    private final ImageStorageService imageStorageService;

    public ImageController(ImageStorageService imageStorageService) {
        this.imageStorageService = imageStorageService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("isAuthenticated()")
    public UploadImageResponse uploadImage(
            @RequestParam("file") MultipartFile file
    ) {
        String fileName = imageStorageService.store(file);

        return new UploadImageResponse(
                ApiVersionConfig.versionedPath("/image/" + fileName)
        );
    }

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<?> getImage(
            @PathVariable("fileName") String fileName
    ) {
        StoredImage image = imageStorageService.get(fileName);

        return ResponseEntity.ok()
                .contentType(image.mediaType())
                .body(image.resource());
    }
}
