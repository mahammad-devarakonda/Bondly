import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import { combineReducers } from "redux";

// Configuration for persisting the auth state
const persistConfig = {
  key: "auth", // Persist only auth state
  storage, // Saves in localStorage (change to sessionStorage if needed)
};

// Wrap only the authReducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer, // Persisting only auth
});

const appStore = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(appStore); // Persistor to be used in index.js
export default appStore;
