export interface LoginResponse {
    token: string;
    username: string;
    userId: number;
    firstName: string;
    lastName: string;
    roleId: number;
    profilePictureUrl: string;
    privateUser: boolean;
    contactVisible: boolean;
    preferences: UserPreferenceResponse[];
}

export interface CompleteProfileResponse {
    fileName: string;
}

export interface UserPreferenceResponse {
    tip: number;
    receiveNotification: boolean;
}