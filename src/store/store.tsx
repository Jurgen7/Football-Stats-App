import { configureStore } from "@reduxjs/toolkit";
import footballReducer from '../features/footballSlice';

export const store = configureStore({
    reducer: {
        football: footballReducer, // Add your football slice reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;