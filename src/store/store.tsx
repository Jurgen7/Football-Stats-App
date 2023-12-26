import { configureStore } from "@reduxjs/toolkit";
import playersReducer from '@/features/players/playersSlice';
import teamsReducer from "@/features/teams/teamsSlice";

export const store = configureStore({
    reducer: {
        players: playersReducer, 
        teams: teamsReducer 
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch