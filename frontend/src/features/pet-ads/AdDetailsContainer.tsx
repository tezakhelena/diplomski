import { useLocation } from "react-router-dom";
import { FilterAdsRequest } from "./types/request-types";
import { usePetAdDetails, usePetAds } from "./hooks/usePetAdQueries";
import { AdDetails } from "./components/details/AdDetails";
import { PetCategory } from "../../enums/petEnums";

export const AdDetailsContainer = () => {
    const location = useLocation();
    const petAdId = location.state?.petAdId;

    const { petAdDetails: petAd, refetchPetAdDetails: refetch } = usePetAdDetails(petAdId);

    const similarRequest: Partial<FilterAdsRequest> = {
        speciesId: petAd?.petDetails?.speciesId,
        gender: petAd?.petDetails?.gender,
        countyId: petAd?.countyId,
        petAdId: petAd?.petAdId,
        categoryId: petAd?.categoryId === PetCategory.Napusten ? PetCategory.TraziSe : PetCategory.Napusten
    };

    const { data: slicniOglasi } = usePetAds(similarRequest, {
        enabled: !!petAd,
    });

    return (
        <AdDetails
            petAd={petAd}
            refetch={refetch}
            data={slicniOglasi}
        />
    );
};