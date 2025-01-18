import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import languageReducer from './slices/languageSlice.js';
import loginStateReducer from './slices/loginStateSlice.js';


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    language: languageReducer,
    loginState: loginStateReducer,
    
  },
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
