package com.project.LostPaw.controller;

import com.project.LostPaw.dto.response.ApiResponse;
import com.project.LostPaw.dto.response.FileDownloadResult;
import com.project.LostPaw.service.AdoptionContractService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
@RequestMapping("/api/contract")
@CrossOrigin
public class ContractController {

    @Autowired
    AdoptionContractService adoptionContractService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addContract(
            @RequestParam("adoptionId") Long adoptionId,
            @RequestParam("userId") Long userId,
            @RequestParam("document") MultipartFile document) {
        try {
            adoptionContractService.addContract(adoptionId, userId, document);
            return ResponseEntity.ok(new ApiResponse(true, "Ugovor uspješno dodan."));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Greška prilikom spremanja datoteke ugovora."));
        }
    }

    @PostMapping("/sign")
    public ResponseEntity<ApiResponse> signContract(
            @RequestParam("contractId") Long contractId,
            @RequestParam("userId") Long userId,
            @RequestParam("file") MultipartFile signatureBase64) {
        try {
            adoptionContractService.signContract(userId, contractId, signatureBase64);
            return ResponseEntity.ok(new ApiResponse(true, "Uspješno ste potpisali ugovor za udomljavanje."));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Neuspješno potpisivanje ugovora. Greška: " + e.getMessage()));
        }
    }

    @GetMapping("/download")
    public ResponseEntity<?> downloadSignedPdf(@RequestParam("fileName") String fileName) {
        try {
            // Pozivamo servis koji odrađuje sav "težak" posao oko diska
            FileDownloadResult downloadResult = adoptionContractService.downloadContractFile(fileName);

            // Kontroler samo slaže HTTP odgovor (zaglavlja i tijelo)
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + downloadResult.getFileName() + "\"")
                    .contentType(MediaType.APPLICATION_PDF)
                    .contentLength(downloadResult.getContentLength())
                    .body(downloadResult.getResource());

        } catch (FileNotFoundException e) {
            // Ako servis javi da datoteke nema, vraćamo 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (IOException e) {
            // Ako dođe do opće greške s čitanjem diska, vraćamo 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Došlo je do pogreške prilikom preuzimanja datoteke."));
        }
    }
}
