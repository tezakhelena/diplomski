package com.project.LostPaw.service;

import com.project.LostPaw.dto.request.AddCommentRequest;
import com.project.LostPaw.dto.response.CommentResponse;

import java.util.List;

public interface CommentService {
    void addComment(AddCommentRequest request);
    List<CommentResponse> getCommentsByPetAdId(Long petAdId);
}
