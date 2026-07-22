package com.project.LostPaw.controller;

import com.project.LostPaw.dto.request.InquiryFilterRequest;
import com.project.LostPaw.dto.request.InquiryRequest;
import com.project.LostPaw.dto.response.ApiResponse;
import com.project.LostPaw.dto.response.InquiryResponse;
import com.project.LostPaw.service.InquiryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
@CrossOrigin
public class InquiryController {
    @Autowired
    InquiryService inquiryService;
    @PostMapping
    public ResponseEntity<List<InquiryResponse>> getInquiries(@RequestBody InquiryFilterRequest request) {
        return ResponseEntity.ok(inquiryService.getInquiries(request));
    }

    @PostMapping("/send")
    public ResponseEntity<ApiResponse> sendInquiry(@RequestBody InquiryRequest request) {
        try {
            inquiryService.addInquiry(request);
            return ResponseEntity.ok(new ApiResponse(true, "Inquiry successfully sent to professional users."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An error occurred while sending the inquiry."));
        }
    }

    @PostMapping("/reply")
    public ResponseEntity<ApiResponse> replyToInquiry(@RequestBody InquiryRequest request) {
        try {
            inquiryService.addAnswer(request);
            return ResponseEntity.ok(new ApiResponse(true, "Answer successfully recorded and user notified."));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An error occurred while saving the reply."));
        }
    }
}
