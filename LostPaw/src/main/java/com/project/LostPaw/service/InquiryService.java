package com.project.LostPaw.service;

import com.project.LostPaw.dto.request.InquiryFilterRequest;
import com.project.LostPaw.dto.request.InquiryRequest;
import com.project.LostPaw.dto.response.InquiryResponse;

import java.util.List;

public interface InquiryService {
    void addInquiry(InquiryRequest request);
    List<InquiryResponse> getInquiries(InquiryFilterRequest request);
    void addAnswer(InquiryRequest request);
}
