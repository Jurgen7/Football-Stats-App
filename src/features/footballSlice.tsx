import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLeagueById, fetchTopScorers } from '../api/fixturesAPI';

interface FootballState {
    leagueData: any // Replace 'any' with a specific type for league data
    topScorersData: any
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: FootballState = {
    leagueData: null, 
    topScorersData: {
        response: [], 
    },
    status: 'idle',
    error: null,
};

export const footballSlice = createSlice({
    name: 'football',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeagueById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTopScorers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLeagueById.fulfilled, (state, action: PayloadAction<any>) => { // Replace `any` with the type of data you expect
                state.status = 'succeeded';
                state.leagueData = action.payload;
            })
            .addCase(fetchTopScorers.fulfilled, (state, action: PayloadAction<any>) => { 
                state.status = 'succeeded';
                state.topScorersData = action.payload;
            })
            .addCase(fetchLeagueById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchTopScorers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
    },
});

export default footballSlice.reducer;