package com.project.LostPaw.service.impl;

import com.project.LostPaw.dto.response.*;
import com.project.LostPaw.enumeration.AttributeEnum;
import com.project.LostPaw.repository.*;
import com.project.LostPaw.service.HomePageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HomePageServiceImpl implements HomePageService {
    @Autowired
    PetAdRepository petAdRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReviewsRepository reviewsRepository;

    public List<HomepageReviewResponse> getHomepageReviews() {
        return reviewsRepository.getReviews().stream()
                .map(r -> new HomepageReviewResponse(
                        r.getReviewId(),
                        r.getComment(),
                        r.getRate(),
                        new UserSummaryResponse(
                                r.getUserId(),
                                r.getUsername(),
                                r.getProfilePictureUrl()
                        )
                )).collect(Collectors.toList());
    }

    public HomePageResponse getHomePageStatistics(){
        HomePageResponse homePageResponse = new HomePageResponse();
        homePageResponse.setCountSuccessfullAds(petAdRepository.countByStatusId(AttributeEnum.AD_RESOLVED.getCode()));
        homePageResponse.setAverageReview(reviewsRepository.getAverageRating());
        homePageResponse.setCountActiveUsers(userRepository.countByStatusId(AttributeEnum.USER_ACTIVE.getCode()));

        List<BusinessUsersResponse> businessUsersList = userRepository.getBusinessUsers()
                .stream()
                .map(BusinessUsersResponse::new)
                .toList();

        homePageResponse.setBusinessUsers(businessUsersList);

        return homePageResponse;
    }
}
