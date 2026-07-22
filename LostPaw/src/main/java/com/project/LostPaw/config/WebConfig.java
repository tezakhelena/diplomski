package com.project.LostPaw.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final StorageProperties storageProperties;
    private final String frontendUrl;

    public WebConfig(StorageProperties storageProperties, @Value("${app.frontend-url}") String frontendUrl) {
        this.storageProperties = storageProperties;
        this.frontendUrl = frontendUrl;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(frontendUrl)
                .allowedMethods(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations(
                        toResourceLocation(
                                storageProperties.getImagesPath()
                        )
                );

        registry.addResourceHandler("/contracts/**")
                .addResourceLocations(
                        toResourceLocation(
                                storageProperties.getDocumentsPath()
                        )
                );
    }

    private String toResourceLocation(Path path) {
        String location = path
                .toAbsolutePath()
                .normalize()
                .toUri()
                .toString();

        return location.endsWith("/")
                ? location
                : location + "/";
    }
}