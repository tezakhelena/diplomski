import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notifikacijeTypes } from '../../types/values';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    username?: string;
    userId: number;
    firstName: string;
    lastName: string;
    roleId: number;
    profilePictureUrl: string;
    privateUser: boolean;
    contactVisible: boolean;
    preferences: Record<number | string, boolean>;
    businessTypeId: number;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    username: "",
    userId: 0,
    roleId: 0,
    firstName: "",
    lastName: "",
    profilePictureUrl: "",
    privateUser: false,
    contactVisible: false,
    preferences: notifikacijeTypes.reduce((acc, { value }) => {
        acc[value] = true; // Default to true
        return acc;
    }, {} as Record<number | string, boolean>),
    businessTypeId: 0,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ token: string; username: string, userId: number, roleId: number, firstName: string, lastName: string, profilePictureUrl: string, privateUser: boolean, contactVisible: boolean, businessTypeId: number }>) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.userId = action.payload.userId;
            state.roleId = action.payload.roleId;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.profilePictureUrl = action.payload.profilePictureUrl;
            state.privateUser = action.payload.privateUser,
            state.contactVisible = action.payload.contactVisible,
            state.businessTypeId = action.payload.businessTypeId
        },
        logout() {
            return initialState;
        },
        setUloga(state, action: PayloadAction<number>) {
            state.roleId = action.payload;
        },
        setProfilna(state, action: PayloadAction<string>) {
            state.profilePictureUrl = action.payload;
        },
        setContactVisible(state, action: PayloadAction<boolean>) {
            state.contactVisible = action.payload;
        },
        setPreference: (state, action: PayloadAction<{ tip: number | string; receive: boolean }>) => {
            state.preferences[action.payload.tip] = action.payload.receive;
        },
    },
});

export const { login, logout, setUloga, setProfilna, setContactVisible, setPreference } = authSlice.actions;

export default authSlice.reducer;
