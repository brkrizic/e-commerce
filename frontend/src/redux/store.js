import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);


export { store, persistor };