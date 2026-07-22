package com.project.LostPaw.service;
import com.project.LostPaw.dto.request.*;
import com.project.LostPaw.dto.response.UserDetailsResponse;
import com.project.LostPaw.dto.response.UserResponse;
import com.project.LostPaw.projections.PetAdProjection;
import com.project.LostPaw.entity.User;
import com.project.LostPaw.entity.Role;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
    List<UserResponse> getAllUsers(UserFilterRequest request);
    Long register(RegisterRequest request) throws IOException;
    UserDetailsResponse getUserDetails(Long korisnikId);
    void deleteAccount(Long korisnikId);
    String addImage(Long korisnikId, MultipartFile slika) throws IOException;
    void verifyUserByEmail(String email);
    User completeProfile(CompleteProfileRequest request);
    UserDetailsResponse updateProfile(UpdateProfileRequest request, MultipartFile slika) throws IOException;
    void changeContactVisibility(Boolean vidljivost, Long korisnikId);
    void changeEmail(String email, Long korisnikId);
    String changePassword(UpdateProfileRequest request);
    void changeStatus(Long statusId, Long korisnikId, String komentar);
}
