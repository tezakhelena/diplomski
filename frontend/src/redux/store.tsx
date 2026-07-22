import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import persistStore from "redux-persist/es/persistStore";
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import filterReduces from './slices/filterSlice';
import notifikacijeReducer from './slices/notificationSlice';
import oglasiReducer from './slices/oglasiSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    oglasi: oglasiReducer,
    notifikacije: notifikacijeReducer,
    filteri: filterReduces,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;


export default store;