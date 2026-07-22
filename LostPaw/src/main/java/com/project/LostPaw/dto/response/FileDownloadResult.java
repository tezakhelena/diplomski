package com.project.LostPaw.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.core.io.Resource;

@Data
@AllArgsConstructor
public class FileDownloadResult {
    private Resource resource;
    private String fileName;
    private long contentLength;
}
