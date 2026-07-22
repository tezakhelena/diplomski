package com.project.LostPaw.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.nio.file.Path;
import java.nio.file.Paths;

@Setter
@Getter
@Component
@ConfigurationProperties(prefix = "storage")
public class StorageProperties {

    private String imagesDir;
    private String documentsDir;

    public Path getImagesPath() {
        return Paths.get(imagesDir)
                .toAbsolutePath()
                .normalize();
    }

    public Path getDocumentsPath() {
        return Paths.get(documentsDir)
                .toAbsolutePath()
                .normalize();
    }
}