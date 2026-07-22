package com.project.LostPaw.service.impl;

import com.project.LostPaw.config.StorageProperties;
import com.project.LostPaw.service.FileStorageService;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final StorageProperties storageProperties;

    public FileStorageServiceImpl(StorageProperties storageProperties) {
        this.storageProperties = storageProperties;
    }

    @SuppressWarnings("unused")
    @PostConstruct
    public void initializeStorageDirectories() {
        try {
            Files.createDirectories(storageProperties.getImagesPath());
            Files.createDirectories(storageProperties.getDocumentsPath());
        } catch (IOException e) {
            throw new IllegalStateException("Nije moguće kreirati direktorije za pohranu datoteka.", e);
        }
    }

    @Override
    public String saveImage(MultipartFile file, String filenameWithoutExtension) throws IOException {

        validateFile(file);
        String extension = getFileExtension(file.getOriginalFilename());

        String filename = filenameWithoutExtension + extension;

        return saveFile(file, storageProperties.getImagesPath(), filename);
    }

    @Override
    public String saveDocument(MultipartFile file, String filenameWithoutExtension) throws IOException {

        validateFile(file);

        String extension = getFileExtension(file.getOriginalFilename());

        String filename = filenameWithoutExtension + extension;

        return saveFile(file, storageProperties.getDocumentsPath(), filename);
    }

    @Override
    public void deleteImage(String filename) throws IOException {
        deleteFile(storageProperties.getImagesPath(), filename);
    }

    @Override
    public void deleteDocument(String filename) throws IOException {
        deleteFile(storageProperties.getDocumentsPath(), filename);
    }

    @Override
    public String saveDocumentAs(MultipartFile file, String filename) throws IOException {

        validateFile(file);

        if (filename == null || filename.isBlank()) {
            throw new IllegalArgumentException(
                    "Naziv dokumenta nije zadan."
            );
        }

        String safeFilename = Path.of(filename).getFileName().toString();

        return saveFile(file, storageProperties.getDocumentsPath(), safeFilename);
    }

    @Override
    public Resource loadDocument(String filename) throws IOException {

        Path documentPath = getExistingDocumentPath(filename);

        return new InputStreamResource(Files.newInputStream(documentPath));
    }

    @Override
    public long getDocumentSize(String filename) throws IOException {

        Path documentPath = getExistingDocumentPath(filename);
        return Files.size(documentPath);
    }

    private Path getExistingDocumentPath(String filename) throws IOException {

        if (filename == null || filename.isBlank()) {
            throw new IllegalArgumentException(
                    "Naziv dokumenta nije zadan."
            );
        }

        Path documentPath = resolveSafePath(
                storageProperties.getDocumentsPath(),
                filename
        );

        if (!Files.exists(documentPath) || !Files.isRegularFile(documentPath)) {
            throw new FileNotFoundException("Dokument nije pronađen: " + filename);
        }

        return documentPath;
    }

    private String saveFile(MultipartFile file, Path storageDirectory, String filename) throws IOException {

        Files.createDirectories(storageDirectory);
        Path targetPath = resolveSafePath(storageDirectory, filename);
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
        }

        return filename;
    }

    private void deleteFile(Path storageDirectory, String filename) throws IOException {
        if (filename == null || filename.isBlank()) {
            return;
        }

        Path filePath = resolveSafePath(storageDirectory, filename);
        Files.deleteIfExists(filePath);
    }

    private Path resolveSafePath(Path storageDirectory, String filename) {
        Path normalizedStorageDirectory = storageDirectory.toAbsolutePath().normalize();
        Path resolvedPath = normalizedStorageDirectory.resolve(filename).normalize();

        if (!resolvedPath.startsWith(normalizedStorageDirectory)) {
            throw new IllegalArgumentException(
                    "Neispravan naziv datoteke."
            );
        }

        return resolvedPath;
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "Datoteka nije poslana ili je prazna."
            );
        }
    }

    private String getFileExtension(String originalFilename) {
        if (originalFilename == null || originalFilename.isBlank()) {
            return "";
        }

        String cleanedFilename = Path.of(originalFilename).getFileName().toString();
        int extensionIndex = cleanedFilename.lastIndexOf('.');

        if (extensionIndex < 0) {
            return "";
        }

        String extension = cleanedFilename.substring(extensionIndex).toLowerCase();

        if (!extension.matches("\\.[a-z0-9]{1,10}")) {
            throw new IllegalArgumentException(
                    "Neispravna ekstenzija datoteke."
            );
        }

        return extension;
    }
}