import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchTeams } from '@/api/teamsEndpoints'

interface Team {
    id: number
    name: string
    founded: number
}
interface Venue {
    id: number
    name: string
    capacity: number
}
interface TeamInfo {
    team: Team;
    venue: Venue;
}

interface TeamsState {
    teamsData: { response: TeamInfo[] };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TeamsState = {
    teamsData: { response: [] },
    status: 'idle',
    error: null,
}

export const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeams.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.teamsData = action.payload;
            })
            .addCase(fetchTeams.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default teamsSlice.reducer;