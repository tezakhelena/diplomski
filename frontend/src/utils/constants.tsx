export const backendBaseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8081";

const API = `${backendBaseUrl}/api`;

export const ADMIN = API + "/admin";
export const CHART_STATISTICS = ADMIN + "/chart-statistics";
export const GET_USER_REPORTED_ADS = ADMIN + "/reports/";
export const GET_ADS_OD_BLOCKED_USER = ADMIN + "/petAds/";

export const GET_USERS = API + "/users"; 
export const LOGIN_POST = GET_USERS + "/login";
export const REGISTER_POST = GET_USERS + "/register"; 
export const KORISNIK_OGLASI = GET_USERS + "/oglasi/";
export const EDIT_USER = GET_USERS + "/edit";
export const CONTACT_VISIBILITY = GET_USERS + "/change-contact-visibility";
export const CHANGE_EMAIL = GET_USERS + "/changeEmail";
export const CHANGE_PASSWORD = GET_USERS + "/changePassword";
export const CHANGE_STATUS = GET_USERS + "/changeStatus";
export const DELETE_USER = GET_USERS + "/delete/";
export const UPDATE_PREFERENCE = GET_USERS + "/updatePreference";

export const COMPLETE_PROFILE = GET_USERS + "/complete";

export const GET_PET_ADS = API + "/pet_ads";
export const GET_LATEST_ADS = GET_PET_ADS + "/latest";
export const CREATE_PET_AD = GET_PET_ADS + "/create";
export const EDIT_PET_AD = GET_PET_ADS + "/update";
export const CHANGE_STATUS_OGLAS = GET_PET_ADS + "/change-status";

export const GET_ATTRIBUTES = API + "/attribute";
export const GET_CATEGORIES = GET_ATTRIBUTES + "/categories";
export const GET_SPECIES = GET_ATTRIBUTES + "/species";
export const GET_COUNTIES = GET_ATTRIBUTES + "/counties";
export const GET_BREEDS = GET_ATTRIBUTES + "/breed/";
export const GET_STATUSES_BY_TYPE = GET_ATTRIBUTES + "/status/";
export const GET_ROLES = GET_ATTRIBUTES + "/roles";
export const GET_BUSINESS_TYPES = GET_ATTRIBUTES + "/bussiness_types";

export const COMMENTS = API + "/comments";

export const NOTIFICATIONS = API + "/notification";
export const READ_NOTIFICATIONS = NOTIFICATIONS + "/read";
export const CLEAR_NOTIFIKACIJS = NOTIFICATIONS + "/clear";

export const VERIFICIRAJ_MAIL = GET_USERS + "/verify";

export const CHAT = API + "/chat";
export const GET_CHATS = CHAT + "/conversations/";
export const CHECK = CHAT + "/check";
export const SEND_MESSAGE = CHAT + "/send";
export const GET_MESSAGES = CHAT + "/messages/";
export const GET_USERS_FOR_CHAT = CHAT + "/users";

export const GET_ADOPTION_REQUESTS = API + "/adoption_request";
export const SEND_ADOPTION_REQUEST = GET_ADOPTION_REQUESTS + "/send_adoption_request";
export const GET_ALL_ADOPTION_REQUESTS = GET_ADOPTION_REQUESTS + "/adoption_requests";
export const GET_OGLAS = GET_ADOPTION_REQUESTS + "/getOglas/";
export const CHANGE_ADOPTION_STATUS = GET_ADOPTION_REQUESTS + "/change_adoption_status";

export const GET_CONTRACTS = API + "/contract";
export const ADD_CONTRACT = GET_CONTRACTS + "/add";
export const ADD_SIGNATURE = GET_CONTRACTS + "/sign";
export const DOWNLOAD_PDF = GET_CONTRACTS + "/download";

export const GET_VOLUNTEERING = API + "/volunteering";
export const SEND_APPLICATION = GET_VOLUNTEERING + "/send";
export const CHANGE_APPLICATION_STATUS = GET_VOLUNTEERING + "/change-status";


export const INQUIRIES = API + "/inquiries";
export const SEND_INQUIRY = INQUIRIES + "/send";
export const REPLY_TO_INQUIRY = INQUIRIES + "/reply";

export const REVIEWS = API + "/application/reviews";
export const HOME_PAGE_STATISTICS = API + "/application/home-page";

export const PET_AD_CONTACTS = API + `/contact`;
export const SEND_PET_AD_CONTACT = PET_AD_CONTACTS + `/send`;
export const REPLY_TO_PET_AD_CONTACT = PET_AD_CONTACTS + `/reply`;

export const GET_ALL_ATTRIBUTES = GET_ATTRIBUTES + "/all";
export const ADD_ATTRIBUTE = GET_ATTRIBUTES + "/admin/add";
export const UPDATE_ATTRIBUTE = GET_ATTRIBUTES + "/admin/update/";
export const DELETE_ATTRIBUTE = GET_ATTRIBUTES + "/admin/delete/";