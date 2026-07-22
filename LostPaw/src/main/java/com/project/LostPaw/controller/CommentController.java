package com.project.LostPaw.controller;
import com.project.LostPaw.dto.request.AddCommentRequest;
import com.project.LostPaw.dto.response.ApiResponse;
import com.project.LostPaw.dto.response.CommentResponse;
import com.project.LostPaw.repository.CommentRepository;
import com.project.LostPaw.service.CommentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin
public class CommentController {
    @Autowired
    CommentService commentService;

    @GetMapping("/{petAdId}")
    public ResponseEntity<List<CommentResponse>> getCommentsByPetAdId(@PathVariable Long petAdId) {
        return ResponseEntity.ok(commentService.getCommentsByPetAdId(petAdId));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> addComment(@RequestBody AddCommentRequest request) {
        try {
            commentService.addComment(request);
            return ResponseEntity.ok(new ApiResponse(true, "Uspješno ste dodali komentar."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Greška prilikom dodavanja komentara."));
        }
    }
}
