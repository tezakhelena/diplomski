package com.project.LostPaw.service.impl;

import com.project.LostPaw.dto.request.AddCommentRequest;
import com.project.LostPaw.dto.response.CommentResponse;
import com.project.LostPaw.entity.Comment;
import com.project.LostPaw.entity.PetAd;
import com.project.LostPaw.entity.User;
import com.project.LostPaw.enumeration.NotificationStatus;
import com.project.LostPaw.enumeration.NotificationType;
import com.project.LostPaw.repository.CommentRepository;
import com.project.LostPaw.repository.UserRepository;
import com.project.LostPaw.repository.PetAdRepository;
import com.project.LostPaw.service.CommentService;
import com.project.LostPaw.service.UserHistoryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PetAdRepository petAdRepository;

    @Autowired
    UserHistoryService userHistoryService;

    @Override
    public List<CommentResponse> getCommentsByPetAdId(Long petAdId) {
        return commentRepository.findCommentsByPetAdId(petAdId).stream()
                .map(CommentResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public void addComment(AddCommentRequest request) {
        if (request.getContent() == null || request.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Comment content is required.");
        }

        Comment comment = new Comment();
        comment.setPetAdId(request.getPetAdId());
        comment.setUserId(request.getUserId());
        comment.setContent(request.getContent());
        comment.setCreatedAt(LocalDateTime.now());
        commentRepository.saveAndFlush(comment);

        PetAd petAd = petAdRepository.findById(request.getPetAdId())
                .orElseThrow(() -> new EntityNotFoundException("Pet advertisement not found with ID: " + request.getPetAdId()));
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + request.getUserId()));

        //logika slanja obavijesti (ovisno o tome komentira li autor oglas ili netko drugi)
        if (!Objects.equals(request.getUserId(), petAd.getUserId())) {
            userHistoryService.addUserHistory(
                    NotificationType.KOMENTAR.getFormattedMessage(petAd.getGeneratedName(), user.getUsername()),
                    petAd.getUserId(),
                    request.getUserId(),
                    NotificationType.KOMENTAR.getCode(),
                    NotificationType.KOMENTAR.getFormattedNotification(petAd.getGeneratedName(), user.getUsername()),
                    NotificationStatus.NOTIFICATION_UNREAD.getCode()
            );
        } else {
            userHistoryService.addUserHistory(
                    NotificationType.KOMENTAR.getFormattedMessage(petAd.getGeneratedName(), user.getUsername()),
                    petAd.getUserId(),
                    request.getUserId(),
                    NotificationType.KOMENTAR.getCode(),
                    null,
                    3
            );
        }
    }
}
