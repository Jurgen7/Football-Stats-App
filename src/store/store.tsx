import { configureStore } from "@reduxjs/toolkit";
import playersReducer from '@/features/players/playersSlice';
import teamsReducer from "@/features/teams/teamsSlice";
import createSagaMiddleware from 'redux-saga';
import { watchFetchTopScorers } from "@/sagas/playerSaga";
import teamsStatsReducer from "@/features/teams/teamsStatsSlice"

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
    reducer: {
        players: playersReducer, 
        teams: teamsReducer,
        teamsStats: teamsStatsReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(watchFetchTopScorers)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch