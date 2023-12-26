import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchTopScorers } from '@/api/playersEndpoints'

interface TopScorersState {
    topScorersData: any; 
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TopScorersState = {
    topScorersData: { response: [] },
    status: 'idle',
    error: null,
};

export const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopScorers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTopScorers.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.topScorersData = action.payload;
            })
            .addCase(fetchTopScorers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default playersSlice.reducer;