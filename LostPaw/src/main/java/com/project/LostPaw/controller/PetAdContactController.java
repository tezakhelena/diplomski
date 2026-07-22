package com.project.LostPaw.controller;

import com.project.LostPaw.dto.request.PetAdContactRequest;
import com.project.LostPaw.dto.request.SendMessageRequest;
import com.project.LostPaw.dto.response.AdoptionRequestDetailResponse;
import com.project.LostPaw.dto.response.ApiResponse;
import com.project.LostPaw.dto.response.PetAdContactDetailResponse;
import com.project.LostPaw.dto.response.PetAdContactResponse;
import com.project.LostPaw.service.PetAdContactService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin
public class PetAdContactController {
    @Autowired
    PetAdContactService petAdContactService;

    @PostMapping
    public ResponseEntity<List<PetAdContactResponse>> getContacts(@RequestBody PetAdContactRequest request) {
        return ResponseEntity.ok(petAdContactService.getContacts(request));
    }

    @PostMapping("/send")
    public ResponseEntity<ApiResponse> sendMessage(@RequestBody SendMessageRequest request) {
        try {
            petAdContactService.sendMessage(request);
            return ResponseEntity.ok(new ApiResponse(true, "Message successfully sent to user."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An error occurred while sending the message."));
        }
    }

    @PostMapping("/reply")
    public ResponseEntity<ApiResponse> replyToMessage(@RequestBody SendMessageRequest request) {
        try {
            petAdContactService.addAnswer(request);
            return ResponseEntity.ok(new ApiResponse(true, "Answer successfully recorded and user notified."));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An error occurred while saving the reply."));
        }
    }

    @GetMapping("/{contactId}/{userId}")
    public PetAdContactDetailResponse getPetAdContactDetail(@PathVariable Long contactId, @PathVariable Long userId) {
        return petAdContactService.getPetAdContactDetail(contactId, userId);
    }
}
