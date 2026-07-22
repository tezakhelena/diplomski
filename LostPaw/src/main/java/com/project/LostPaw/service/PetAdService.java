package com.project.LostPaw.service;

import com.project.LostPaw.dto.request.FilterAdsRequest;
import com.project.LostPaw.dto.request.ReportAdRequest;
import com.project.LostPaw.dto.request.SaveAdRequest;
import com.project.LostPaw.dto.response.PetAdDetailResponse;
import com.project.LostPaw.dto.response.PetAdResponse;
import com.project.LostPaw.entity.PetAd;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PetAdService {
    List<PetAdResponse> getAds(FilterAdsRequest request);
    List<PetAdResponse> checkSimilarAdsBeforeCreating(SaveAdRequest request);
    PetAd createAd(SaveAdRequest request, Long petId);
    PetAdDetailResponse getPetAdDetails(Long petAdId);
    void addImages(Long petAdId, MultipartFile[] images) throws IOException;
    Long addPetData(SaveAdRequest request);
    List<PetAdResponse> getAdsFromLast7Days();
    void reportAd(ReportAdRequest request);
    boolean deleteAd(Long petAdId);
    void updateAd(SaveAdRequest request);
}
