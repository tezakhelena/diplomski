package com.project.LostPaw.controller;
import com.project.LostPaw.dto.response.*;
import com.project.LostPaw.service.HomePageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/application")
@CrossOrigin
public class AppController {
    @Autowired
    HomePageService homePageService;

    @GetMapping("/reviews")
    public ResponseEntity<List<HomepageReviewResponse>> getReviews(){
        return ResponseEntity.ok(homePageService.getHomepageReviews());
    }

    @GetMapping("/home-page")
    public ResponseEntity<HomePageResponse> getHomePageStatistics(){
        return ResponseEntity.ok(homePageService.getHomePageStatistics());
    }


}
