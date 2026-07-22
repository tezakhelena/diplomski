package com.project.LostPaw.service;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface FileStorageService {
    String saveImage(MultipartFile file, String filenameWithoutExtension) throws IOException;
    String saveDocument(MultipartFile file, String filenameWithoutExtension) throws IOException;
    void deleteImage(String filename) throws IOException;
    void deleteDocument(String filename) throws IOException;
    String saveDocumentAs(MultipartFile file, String filename) throws IOException;
    Resource loadDocument(String filename) throws IOException;
    long getDocumentSize(String filename) throws IOException;
}