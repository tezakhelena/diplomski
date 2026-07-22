import { Moment } from "moment";

export interface PetAdResponse {
    petAdId: number;
    userId: number;
    primaryImage: string;
    county: string;
    gender: string;
    missingDate: Moment;
    petName: string;
    category: string;
    categoryId: number;
    breed: string;
    city: string;
    views: number;
    reward: number;
    maturity: string;
    generatedTitle: string;
    notes: string;
    createdAt: Moment;
    statusId: number;
    status: string;
    species: string;
    speciesId: number;
}

export interface PetAdPicture {
    id: number;
    petAdId: number;
    url: string;
    isFirst: boolean;
}

export interface PetAdDetailResponse {
    petAdId: number;
    userId: number;
    username: string;
    userProfilePicture: string;
    userRegistrationDate: Moment;

    createdAt: Moment;
    generatedTitle: string;
    notes: string;
    views: number;
    reward: number;

    categoryId: number;
    category: string;
    countyId: number;
    county: string;
    city: string;

    email?: string;
    phoneNumber?: string;

    adPictures: PetAdPicture[];
    userReportedIds: number[];
    petDetails: PetDetailResponse;
    statusId: number;
}

export interface PetDetailResponse {
    name: string;
    missingDate: Moment;
    gender: string;
    maturity: string;
    furColor: string;

    statusId: number;
    status: string;

    speciesId: number;
    species: string;

    breedId: number;
    breed: string;
}