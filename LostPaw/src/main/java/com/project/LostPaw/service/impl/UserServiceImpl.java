package com.project.LostPaw.service.impl;
import com.project.LostPaw.dto.request.*;
import com.project.LostPaw.dto.response.*;
import com.project.LostPaw.enumeration.AttributeEnum;
import com.project.LostPaw.enumeration.NotificationStatus;
import com.project.LostPaw.enumeration.NotificationType;
import com.project.LostPaw.entity.*;
import com.project.LostPaw.enumeration.RolesEnum;
import com.project.LostPaw.repository.*;
import com.project.LostPaw.service.FileStorageService;
import com.project.LostPaw.service.UserService;
import com.project.LostPaw.service.UserHistoryService;
import com.project.LostPaw.service.PetAdHistoryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PetAdRepository petAdRepository;

    @Autowired
    UserHistoryRepository userHistoryRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserHistoryService userHistoryService;

    @Autowired
    PetAdHistoryService petAdHistoryService;

    @Autowired
    AttributeRepository attributeRepository;

    @Autowired
    BusinessProfileRepository businessProfileRepository;

    @Autowired
    FileStorageService fileStorageService;

    @Override
    public List<UserResponse> getAllUsers(UserFilterRequest request){
        return userRepository.getAllUsers(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getUsername(),
                        request.getStatusId(),
                        request.getRoleId(),
                        request.getPrivateUser(),
                        request.getBusinessTypeId(),
                        request.getSortDirection(),
                        request.getSearch()
                ).stream()
                .map(UserResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public Long register(RegisterRequest request) {
        String username = request.getUsername().trim();
        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByUsernameIgnoreCase(username)) {
            throw new IllegalArgumentException("Korisnik s tim korisničkim imenom već postoji.");
        }

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new IllegalArgumentException("Korisnik s tom e-mail adresom već postoji.");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User();
        user.setUsername(username);
        user.setStatusId(11L);
        user.setRoleId(RolesEnum.NEPOTPUNI_PROFIL.getCode());
        user.setPassword(encodedPassword);
        user.setEmail(email);
        user.setRegistrationDate(LocalDate.now());
        user.setPrivateUser(request.isPrivateUser());
        user.setEmailVerified(false);

        return userRepository.saveAndFlush(user).getId();
    }

    @Override
    public User completeProfile(CompleteProfileRequest request){
        User user = userRepository.findById(request.getUserId()).orElseThrow();

        if (!user.isPrivateUser()) {
            String oib = request.getOib();

            if (!checkOIB(oib)) {
                throw new IllegalArgumentException("Uneseni OIB nije važeći.");
            }

            if (businessProfileRepository.existsByOib(oib)) {
                throw new IllegalStateException("OIB je već registriran u sustavu.");
            }

            BusinessProfiles bp = new BusinessProfiles();
            bp.setUserId(request.getUserId());
            bp.setOib(oib);
            bp.setWebsite(request.getWebsite());
            Attribute attr = attributeRepository.findById(request.getBusinessTypeId()).orElseThrow();
            bp.setBusinessType(attr.getId());

            businessProfileRepository.save(bp);
        }

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setCountyId(request.getCountyId());
        user.setCity(request.getCity());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRoleId(RolesEnum.KORISNIK.getCode());
        user.setContactVisible(request.isContactVisible());

        return userRepository.saveAndFlush(user);
    }

    @Override
    public String addImage(Long korisnikId, MultipartFile slika) throws IOException {

        User user = userRepository.findById(korisnikId).orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + korisnikId));

        String filenameWithoutExtension = "user_" + korisnikId + "_1";

        String savedFilename = fileStorageService.saveImage(slika, filenameWithoutExtension);

        user.setProfilePictureUrl(savedFilename);

        userRepository.saveAndFlush(user);

        return savedFilename;
    }

    @Override
    public UserDetailsResponse updateProfile(UpdateProfileRequest request, MultipartFile image) throws IOException {

        User user = userRepository.findById(request.getUserId()).orElseThrow();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setCountyId(request.getCountyId() == null ? user.getCountyId() : request.getCountyId());
        user.setCity(request.getCity());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setContactVisible(request.isContactVisible());
        user.setRoleId(request.getRoleId() == null ? user.getRoleId() : request.getRoleId());

        if (!user.isPrivateUser()) {
            BusinessProfiles bp = businessProfileRepository.findByUserId(user.getId()).get();
            bp.setUser(user);
            bp.setOib(request.getOib());
            bp.setWebsite(request.getWebsite());
            Attribute attr = attributeRepository.findById(request.getBusinessTypeId()).orElseThrow();
            bp.setBusinessType(attr.getId());

            businessProfileRepository.save(bp);
        }

        if (image != null && !image.isEmpty()) {

            String oldImage = user.getProfilePictureUrl();
            String filenameWithoutExtension = "user_" + user.getId() + "_1";
            String newFilename = fileStorageService.saveImage(image, filenameWithoutExtension);

            if (oldImage != null && !oldImage.isBlank() && !oldImage.equals(newFilename)) {
                fileStorageService.deleteImage(oldImage);
            }

            user.setProfilePictureUrl(newFilename);
        }

        userRepository.saveAndFlush(user);

        return getUserDetails(user.getId());
    }


    @Override
    public UserDetailsResponse getUserDetails(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        UserDetailsResponse response = new UserDetailsResponse();
        BeanUtils.copyProperties(user, response);

        // Osnovno mapiranje
        response.setUserId(user.getId());
        response.setProfilePictureUrl(user.getProfilePictureUrl());
        response.setStatus(user.getStatus().getValue());
        response.setStatusId(user.getStatus().getId());
        response.setRole(user.getRole().getName());
        response.setCounty(user.getCounty() != null ? user.getCounty().getName() : null);
        response.setPrivateUser(user.isPrivateUser());
        response.setEmailVerified(user.isEmailVerified());
        response.setContactVisible(user.isContactVisible());
        response.setUserHistory(userHistoryRepository.findByCreatedBy(userId));

        businessProfileRepository.findByUserId(userId).ifPresent(profile -> {
            response.setOib(profile.getOib());
            response.setWebsite(profile.getWebsite());
            if (profile.getBusinessType() != null) {
                response.setBusinessTypeId(profile.getBusinessType());
                response.setBusinessUserType(profile.getAttribute().getValue());
            }
        });

        return response;
    }

    @Override
    public void verifyUserByEmail(String email){
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new IllegalArgumentException("Korisnik s e-mail adresom " + email + " ne postoji.");
        }

        user.setEmailVerified(true);

        userHistoryService.addUserHistory(NotificationType.VERIFIKACIJA_MAILA.getSadrzaj(), user.getId(), user.getId(), NotificationType.VERIFIKACIJA_MAILA.getCode(), NotificationType.VERIFIKACIJA_MAILA.getNotification(), NotificationStatus.NOTIFICATION_UNREAD.getCode());

        userRepository.save(user);
    }

    @Override
    public void changeEmail(String email, Long korisnikId){
        User user = userRepository.findById(korisnikId).get();
        user.setEmail(email);
        userRepository.saveAndFlush(user);
    }

    @Override
    public String changePassword(UpdateProfileRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Korisnik nije pronađen."));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Upišite ispravnu staru lozinku.");
        }

        try {
            String encodedNewPassword = passwordEncoder.encode(request.getNewPassword());
            user.setPassword(encodedNewPassword);
            userRepository.saveAndFlush(user);

            return "Uspješno promijenjena lozinka!";
        } catch (Exception e) {
            throw new RuntimeException("Došlo je do pogreške prilikom promjene lozinke.", e);
        }
    }

    @Override
    public void changeContactVisibility(Boolean vidljivost, Long userId){
        User user = userRepository.findById(userId).orElseThrow();
        user.setContactVisible(vidljivost);
        userRepository.saveAndFlush(user);
    }

    @Override
    public void changeStatus(Long statusId, Long korisnikId, String komentar){
        User user = userRepository.findById(korisnikId).get();

        List<PetAdResponse> petAdResponse = petAdRepository.findAllPetAdsNoFilter(korisnikId)
                .stream()
                .map(PetAdResponse::new)
                .toList();

        user.setStatusId(statusId);

        if(statusId.equals(AttributeEnum.USER_SUSPENDED.getCode())){ //postavi svim oglasima status na blokirano ako je korisnicki racun obustavljen
            petAdResponse.forEach(e ->
                    petAdHistoryService.changeAdStatusByUserStatus(e.getPetAdId(), AttributeEnum.AD_BLOCKED.getCode(), korisnikId, 13)
            );
            userHistoryService.addUserHistory(NotificationType.OBUSTAVLJEN_RACUN.getSadrzaj(), korisnikId, 3L, NotificationType.OBUSTAVLJEN_RACUN.getCode(), NotificationType.OBUSTAVLJEN_RACUN.getFormattedNotificationRacun(komentar), 3);
        }

        if(statusId.equals(AttributeEnum.USER_ACTIVE.getCode())){
            petAdResponse.forEach(e ->
                    petAdRepository.reactivatePetAd(e.getPetAdId())
            );
            userHistoryService.addUserHistory(NotificationType.PONOVNO_AKTIVIRAN_RACUN.getSadrzaj(), korisnikId, 3L, NotificationType.PONOVNO_AKTIVIRAN_RACUN.getCode(), NotificationType.PONOVNO_AKTIVIRAN_RACUN.getNotification(), NotificationStatus.NOTIFICATION_UNREAD.getCode());
        }

        userRepository.saveAndFlush(user);
    }

    @Override
    public void deleteAccount(Long userId){
        if(userRepository.existsById(userId)){
            userRepository.deleteById(userId);
        }
    }

    //korišten primjer: https://github.com/domagojpa/oib-validation/blob/main/Java/OibValidation.java
    public boolean checkOIB(String oib) {
        if (oib == null || oib.length() != 11) {
            return false;
        }

        int a = 10;
        for (int i = 0; i < 10; i++) {
            char c = oib.charAt(i);

            if (!Character.isDigit(c)) {
                return false;
            }

            a += Character.getNumericValue(c);
            a %= 10;

            if (a == 0) {
                a = 10;
            }

            a = (a * 2) % 11;
        }

        int kontrolni = (11 - a) % 10;
        char lastChar = oib.charAt(10);

        if (!Character.isDigit(lastChar)) {
            return false;
        }

        return kontrolni == Character.getNumericValue(lastChar);
    }
}