package com.project.LostPaw.service;

import com.project.LostPaw.dto.response.*;
import java.util.List;

public interface HomePageService {
    List<HomepageReviewResponse> getHomepageReviews();
    HomePageResponse getHomePageStatistics();
}
