package com.project.LostPaw.service.impl;

import com.project.LostPaw.dto.response.FileDownloadResult;
import com.project.LostPaw.entity.AdoptionRequest;
import com.project.LostPaw.entity.Contract;
import com.project.LostPaw.enumeration.AttributeEnum;
import com.project.LostPaw.enumeration.NotificationStatus;
import com.project.LostPaw.enumeration.NotificationType;
import com.project.LostPaw.repository.AdoptionContractRepository;
import com.project.LostPaw.repository.AdoptionRequestsRepository;
import com.project.LostPaw.service.AdoptionContractService;
import com.project.LostPaw.service.FileStorageService;
import com.project.LostPaw.service.UserHistoryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AdoptionContractServiceImpl implements AdoptionContractService {

    @Autowired
    AdoptionContractRepository adoptionContractRepository;

    @Autowired
    AdoptionRequestsRepository adoptionRequestsRepository;

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    UserHistoryService userHistoryService;

    @Override
    public void addContract(Long adoptionId, Long userId, MultipartFile document) throws IOException {

        Optional<Contract> existingContract = adoptionContractRepository.findByAdoptionId(adoptionId);

        if (existingContract.isPresent()) {
            throw new IllegalStateException(
                    "Ugovor za ovaj zahtjev za udomljavanje već postoji."
            );
        }

        validatePdf(document);

        String originalFilename = document.getOriginalFilename();
        String filenameWithoutExtension = "contract_" + adoptionId;
        String savedFilename = fileStorageService.saveDocument(document, filenameWithoutExtension);

        Contract contract = new Contract();
        contract.setAdoptionId(adoptionId);
        contract.setFileName(originalFilename);
        contract.setNewFileName(savedFilename);
        contract.setUserId(userId);
        contract.setUploadedAt(LocalDateTime.now());
        contract.setSignedStatus(0);

        adoptionContractRepository.save(contract);
    }

    @Override
    public void signContract(Long userId, Long contractId, MultipartFile signedPdf) throws IOException {

        Contract contract = adoptionContractRepository.findById(contractId).orElseThrow(() ->
                new EntityNotFoundException("Ugovor nije pronađen."));
        AdoptionRequest adoptionRequest = adoptionRequestsRepository.findById(contract.getAdoptionId()).orElseThrow(() ->
                new EntityNotFoundException("Zahtjev za udomljavanjem nije pronađen."));

        validatePdf(signedPdf);
        String storedFilename = contract.getNewFileName();
        fileStorageService.saveDocumentAs(signedPdf, storedFilename);
        Integer currentSignedStatus = contract.getSignedStatus();

        if (currentSignedStatus == null) {
            currentSignedStatus = 0;
        }

        if (currentSignedStatus.equals(0)) {
            contract.setSignedStatus(1);

            userHistoryService.addUserHistoryForUser(
                    NotificationType.PODNOSITELJ_POTPISAO.getSadrzaj(), adoptionRequest.getAdOwnerId(),
                    NotificationType.PODNOSITELJ_POTPISAO.getCode(), NotificationType.PODNOSITELJ_POTPISAO.getNotification(),
                    NotificationStatus.NOTIFICATION_UNREAD.getCode(), adoptionRequest.getPetAdId()
            );

        } else if (currentSignedStatus.equals(1)) {
            contract.setSignedStatus(2);

            adoptionRequest.setStatusId(AttributeEnum.ADOPTION_FINISHED.getCode());

            if (adoptionRequest.getPetAd() != null) {
                adoptionRequest.getPetAd().setStatusId(AttributeEnum.AD_RESOLVED.getCode());
            }
        } else {
            throw new IllegalStateException("Ugovor je već u potpunosti potpisan.");
        }

        adoptionContractRepository.save(contract);
    }

    @Override
    public FileDownloadResult downloadContractFile(String fileName) throws IOException {

        Resource resource = fileStorageService.loadDocument(fileName);
        long contentLength = fileStorageService.getDocumentSize(fileName);

        return new FileDownloadResult(resource, fileName, contentLength);
    }

    private void validatePdf(MultipartFile document) {
        if (document == null || document.isEmpty()) {
            throw new IllegalArgumentException(
                    "PDF dokument nije poslan."
            );
        }

        String originalFilename = document.getOriginalFilename();

        if (originalFilename == null || !originalFilename.toLowerCase().endsWith(".pdf")) {
            throw new IllegalArgumentException("Dozvoljeno je učitati samo PDF dokument.");
        }
    }
}