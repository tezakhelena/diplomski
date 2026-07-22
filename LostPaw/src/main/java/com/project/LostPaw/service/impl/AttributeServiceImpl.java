package com.project.LostPaw.service.impl;
import com.project.LostPaw.dto.request.AttributeFilterRequest;
import com.project.LostPaw.dto.response.AttributeResponse;
import com.project.LostPaw.entity.Attribute;
import com.project.LostPaw.entity.PetAd;
import com.project.LostPaw.entity.User;
import com.project.LostPaw.enumeration.AttributeEnum;
import com.project.LostPaw.enumeration.AttributeTypeEnum;
import com.project.LostPaw.repository.*;
import com.project.LostPaw.service.AttributeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class AttributeServiceImpl implements AttributeService {

    @Autowired
    CountyRepository countyRepository;

    @Autowired
    AttributeRepository attributeRepository;

    @Autowired
    BreedRepository breedRepository;

    @Autowired
    PetAdRepository petAdRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PetRepository petRepository;

    @Autowired
    VolunteeringRepository volunteeringRepository;

    @Autowired
    BusinessProfileRepository businessProfileRepository;

    @Autowired
    AdoptionRequestsRepository adoptionRequestsRepository;

    @Autowired
    InquiryRepository inquiryRepository;

    @Override
    public List<AttributeResponse> getCategories() {
        Map<Long, Long> counts = getCountsByField(ad -> ad.getCategory() != null ? ad.getCategory().getId() : null);

        return attributeRepository.findByTypeOrderByIdAsc(AttributeTypeEnum.AD_CATEGORIES.getCode()).stream()
                .map(c -> new AttributeResponse(c, counts.getOrDefault(c.getId(), 0L)))
                .collect(Collectors.toList());
    }

    @Override
    public List<AttributeResponse> getSpecies() {
        Map<Long, Long> counts = getCountsByField(ad -> ad.getPet().getSpecies() != null ? ad.getPet().getSpecies().getId() : null);
        return attributeRepository.findByTypeOrderByIdAsc(AttributeTypeEnum.PET_TYPE.getCode()).stream()
                .map(s -> new AttributeResponse(s, counts.getOrDefault(s.getId(), 0L)))
                .collect(Collectors.toList());
    }

    @Override
    public List<AttributeResponse> getStatusesByType(Integer type) {
        Map<Long, Long> counts = getCountsByField(ad -> ad.getStatus() != null ? ad.getStatus().getId() : null);

        List<Attribute> statuses = (type == null) ? attributeRepository.findAll() : attributeRepository.findByTypeOrderByIdAsc(type);

        return statuses.stream()
                .map(s -> new AttributeResponse(s, counts.getOrDefault(s.getId(), 0L)))
                .collect(Collectors.toList());
    }

    @Override
    public List<AttributeResponse> getCounties() {
        Map<Long, Long> counts = getCountsByField(ad -> ad.getCounty() != null ? ad.getCounty().getId() : null);

        return countyRepository.findAll().stream()
                .map(c -> new AttributeResponse(c, counts.getOrDefault(c.getId(), 0L)))
                .collect(Collectors.toList());
    }

    @Override
    public List<AttributeResponse> getRoles() {
        Map<Long, Long> counts = getCountsByFieldUser(ad -> ad.getRole() != null ? ad.getRole().getId() : null);

        return roleRepository.findAll().stream()
                .map(c -> new AttributeResponse(c, counts.getOrDefault(c.getId(), 0L)))
                .collect(Collectors.toList());
    }

    @Override
    public List<AttributeResponse> getBreedsBySpeciesId(Long speciesId) {
        Map<Long, Long> counts = getCountsByField(ad -> ad.getPet().getBreed() != null ? ad.getPet().getBreedId() : null);

        return breedRepository.findBySpeciesIdOrderByNameAsc(speciesId).stream()
                .map(b -> new AttributeResponse(b, counts.getOrDefault(b.getId(), 0L)))
                .collect(Collectors.toList());
    }

    @Override
    public List<AttributeResponse> getBusinessUserTypes() {
        return attributeRepository.findByTypeOrderByIdAsc(AttributeTypeEnum.BUSINESS_TYPE.getCode()).stream() // 8 je tip za poslovne subjekte
                .map(attr -> new AttributeResponse(attr, 0L)) // 0L jer nema brojača oglasa za ovu kategoriju
                .collect(Collectors.toList());
    }

    @Override
    public List<AttributeResponse> getAllAttributes(AttributeFilterRequest request) {
        return attributeRepository.getAllAttributes(request.getSearch(), request.getType()).stream() // 8 je tip za poslovne subjekte
                .map(attr -> new AttributeResponse(attr, 0L)) // 0L jer nema brojača oglasa za ovu kategoriju
                .collect(Collectors.toList());
    }

    @Override
    public Attribute saveAttribute(Attribute attribute) {
        return attributeRepository.save(attribute);
    }

    @Override
    public Attribute updateAttribute(Long id, Attribute attribute) {
        Attribute existing = attributeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Atribut nije pronađen"));
        existing.setValue(attribute.getValue());
        existing.setDescription(attribute.getDescription());
        existing.setType(attribute.getType());
        return attributeRepository.save(existing);
    }

    @Override
    public void deleteAttribute(Long id) {
        Attribute attr = attributeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Atribut nije pronađen"));

        AttributeTypeEnum type = AttributeTypeEnum.fromCode(attr.getType());
        boolean isUsed = false;

        if (type != null) {
            switch (type) {
                case USER_STATUS:
                    isUsed = userRepository.existsByStatusId(id);
                    break;
                case AD_STATUS:
                    isUsed = petAdRepository.existsByStatusId(id);
                    break;
                case PET_STATUS:
                    isUsed = petRepository.existsByStatusId(id);
                    break;
                case AD_CATEGORIES:
                    isUsed = petAdRepository.existsByCategoryId(id);
                    break;
                case PET_TYPE:
                    isUsed = petRepository.existsByBreedId(id);
                    break;
                case VOLUNTEER_STATUS:
                    isUsed = volunteeringRepository.existsByStatusId(id) || volunteeringRepository.existsByVolunteerType(id);
                    break;
                case BUSINESS_TYPE:
                    isUsed = businessProfileRepository.existsByBusinessType(id);
                    break;
                case ADOPTION_STATUS:
                    isUsed = adoptionRequestsRepository.existsByStatusId(id);
                    break;
                case INQUIRY_TYPE:
                    isUsed = inquiryRepository.existsByType(id);
                    break;
                case VOLUNTEER_TYPE:
                    isUsed = volunteeringRepository.existsByVolunteerType(id);
                    break;
                default:
                    isUsed = false;
            }
        }

        if (isUsed) {
            throw new IllegalStateException("Atribut se ne može obrisati jer je povezan s oglasima ili korisnicima u sustavu.");
        }

        attributeRepository.deleteById(id);
    }

    private Map<Long, Long> getCountsByField(Function<PetAd, Long> fieldExtractor) {
        return petAdRepository.findAll().stream()
                .map(fieldExtractor)
                .filter(Objects::nonNull)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
    }

    private Map<Long, Long> getCountsByFieldUser(Function<User, Long> fieldExtractor) {
        return userRepository.findAll().stream()
                .map(fieldExtractor)
                .filter(Objects::nonNull)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
    }


}
