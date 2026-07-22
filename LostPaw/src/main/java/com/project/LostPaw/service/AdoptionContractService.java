package com.project.LostPaw.service;

import com.project.LostPaw.dto.response.FileDownloadResult;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface AdoptionContractService {
    void addContract(Long adoptionId, Long userId, MultipartFile document) throws IOException;
    void signContract(Long userId, Long contractId, MultipartFile signatureBase64) throws IOException;
    FileDownloadResult downloadContractFile(String fileName) throws IOException;
}
