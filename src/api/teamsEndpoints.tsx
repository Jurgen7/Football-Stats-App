import { createAsyncThunk } from '@reduxjs/toolkit'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''
const URL = 'https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2023'

export const fetchTeams = createAsyncThunk(
    'football/fetchTeams',
    async () => {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
              'x-rapidapi-key': API_KEY,
              'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
            }
        })
        const data = await response.json()
        return data
    }
)

export const getTeamUrl = (teamId: number) => {
    return `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?season=2023&team=${teamId}&league=39`;
}

export const fetchTeamsStats = createAsyncThunk(
    'football/fetchTeamsStats',
    async (teamId: number) => {
        const url = getTeamUrl(teamId);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
            }
        })
        const data = await response.json();
        return data;
    }
)
