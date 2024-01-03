import { fetchTeamsStats } from '@/api/teamsEndpoints';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Stats {
    response: {
        team: TeamInfo
        goals: Goals
    }
}

interface TeamInfo {
    name: string
    id: number
}

interface Goals {
    for: Total
    against: Total
}

interface Total {
    total: TotalStats
}

interface TotalStats {
    away: number
    home: number
    total: number
}

interface TeamsStatsState {
    teamsStatsData: Stats[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TeamsStatsState = {
    teamsStatsData: [],
    status: 'idle',
    error: null,
}

export const teamsStatsSlice = createSlice({
    name: 'teamsStats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeamsStats.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTeamsStats.fulfilled, (state, action: PayloadAction<Stats>) => {
                state.status = 'succeeded';
                const existingIndex = state.teamsStatsData.findIndex(
                    stats => stats.response.team.id === action.payload.response.team.id
                )
                if (existingIndex !== -1) {
                    state.teamsStatsData[existingIndex] = action.payload;
                } else {
                    state.teamsStatsData.push(action.payload) 
                }
            })
            .addCase(fetchTeamsStats.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default teamsStatsSlice.reducer