package com.project.LostPaw.controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.LostPaw.enumeration.NotificationStatus;
import com.project.LostPaw.repository.BusinessProfileRepository;
import com.project.LostPaw.util.JWTUtil;
import com.project.LostPaw.dto.request.*;
import com.project.LostPaw.dto.response.*;
import com.project.LostPaw.enumeration.NotificationType;
import com.project.LostPaw.entity.*;
import com.project.LostPaw.repository.UserRepository;
import com.project.LostPaw.repository.UserNotificationPreferencesRepository;
import com.project.LostPaw.service.EmailService;
import com.project.LostPaw.service.UserService;
import com.project.LostPaw.service.UserHistoryService;
import com.project.LostPaw.service.UserNotificationPreferencesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JWTUtil jwtUtil;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EmailService emailService;

    @Autowired
    UserHistoryService userHistoryService;

    @Autowired
    UserNotificationPreferencesService userNotificationPreferencesService;

    @Autowired
    UserNotificationPreferencesRepository userNotificationPreferencesRepository;

    @Autowired
    BusinessProfileRepository businessProfileRepository;

    @PostMapping
    public List<UserResponse> getAllUsers(@RequestBody UserFilterRequest request){
        return userService.getAllUsers(request);
    }

    @PostMapping("/register")
    public ApiResponse register(@RequestBody RegisterRequest request) throws IOException {

        Long  userId = userService.register(request);

        String token = jwtUtil.generateTokenEmail(request.getEmail());
        String verificationUrl = "http://localhost:5173/verify-email?token=" + token;
        userHistoryService.addUserHistory(NotificationType.REGISTRACIJA.getFormattedMessageDatum(LocalDate.now()),  userId,  userId, NotificationType.REGISTRACIJA.getCode(), "Uspješno ste se registrirali", NotificationStatus.NOTIFICATION_UNREAD.getCode());

        emailService.sendVerificationEmail(request.getEmail(), verificationUrl);

        userNotificationPreferencesService.addNotificationPreferencesInitial( userId);

        return new ApiResponse(true, "Uspješno ste se regstrirali.");
    }

    @PostMapping("/complete")
    public CompleteProfileResponse completeProfile(@RequestPart("completeProfileRequest") String completeProfileRequest, @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        CompleteProfileRequest request = objectMapper.readValue(completeProfileRequest, CompleteProfileRequest.class);

        User user = userService.completeProfile(request);

        String fileName = null;
        if(image != null && !image.isEmpty()) {
            fileName = userService.addImage(user.getId(), image);
        }

        return new CompleteProfileResponse(fileName);
    }

    @PostMapping("/changeEmail")
    public ApiResponse changeEmail(@RequestBody UpdateProfileRequest request){
        userService.changeEmail(request.getEmail(), request.getUserId());
        return new ApiResponse(true, "Email uspješno promjenjen.");
    }

    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody UpdateProfileRequest request){
        try {
            String result = userService.changePassword(request);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while changing the password.");
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<UserDetailsResponse> updateProfile(@RequestPart("updateProfileRequest") String updateProfileRequest,
                               @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        UpdateProfileRequest request = objectMapper.readValue(updateProfileRequest, UpdateProfileRequest.class);
        UserDetailsResponse updatedUser = userService.updateProfile(request, image);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        try {
            String email = jwtUtil.extractUsernameEmail(token);

            if (email == null || email.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token: Email not found.");
            }

            userService.verifyUserByEmail(email);

            return ResponseEntity.ok("Email successfully verified!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authentication(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            User user = userRepository.findByUsername(request.getUsername());
            user.setLastLogin(LocalDateTime.now());
            userRepository.saveAndFlush(user);

            Long businessTypeId = null;
            Optional<BusinessProfiles> profileOpt = businessProfileRepository.findByUserId(user.getId());

            if (profileOpt.isPresent() && profileOpt.get().getBusinessType() != null) {
                businessTypeId = profileOpt.get().getBusinessType();
            }

            List<UserPreferenceResponse> preferences = userNotificationPreferencesRepository.findByUserId(user.getId())
                    .stream()
                    .map(pref -> new UserPreferenceResponse(pref.getType(), pref.isReceiveNotification()))
                    .toList();

            String token = jwtUtil.generateToken(request.getUsername());

            LoginResponse loginResponse = new LoginResponse(
                    token,
                    request.getUsername(),
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRoleId(),
                    user.getProfilePictureUrl(),
                    user.isPrivateUser(),
                    user.isContactVisible(),
                    preferences,
                    businessTypeId
            );

            return ResponseEntity.ok(loginResponse);

        } catch (org.springframework.security.authentication.BadCredentialsException e) {
            return ResponseEntity.status(401).body(new ApiResponse(false, "Neispravno korisničko ime ili lozinka."));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, "Došlo je do pogreške prilikom prijave."));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDetailsResponse> details(@PathVariable Long userId){
        return ResponseEntity.ok(userService.getUserDetails( userId));
    }

    @PostMapping("/change-contact-visibility")
    public ApiResponse changeContactVisibility(@RequestBody UpdateProfileRequest request){
        userService.changeContactVisibility(request.isContactVisible(), request.getUserId());
        return new ApiResponse(true, "Uspješna promjena vidljivosti kontakta.");
    }

    @PostMapping("/changeStatus")
    public ApiResponse changeStatus(@RequestBody UpdateProfileRequest request){
        userService.changeStatus(request.getStatusId(), request.getUserId(), request.getComment());
        return new ApiResponse(true, "Uspješna promjena statusa.");
    }

    @GetMapping("/delete/{userId}")
    public ApiResponse deleteAccount(@PathVariable Long userId){
        userService.deleteAccount(userId);
        return new ApiResponse(true, "Usješno obrisan račun.");
    }

    @PostMapping("/updatePreference")
    public ResponseEntity<Boolean> updatePreference(@RequestBody UpdatePreferenceRequest request){
        userNotificationPreferencesService.updatePreference(request);
        return ResponseEntity.ok(true);
    }

}
