import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Player {
    name: string
    age: number
    photo: string
    nationality: string
}
export interface PlayerInfo {
    player: Player, 
    statistics: any
}
interface TopScorersState {
    topScorersData: {response: PlayerInfo[]} 
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
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
    reducers: {
      fetchTopScorersRequest(state) {
        state.status = 'loading';
      },
      fetchTopScorersSuccess(state, action: PayloadAction<any>) {
        state.status = 'succeeded';
        state.topScorersData = action.payload;
      },
      fetchTopScorersFailure(state, action: PayloadAction<string>) {
        state.status = 'failed';
        state.error = action.payload;
      },
    },
  })

  export default playersSlice.reducer