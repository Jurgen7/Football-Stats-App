import { createAsyncThunk } from '@reduxjs/toolkit'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''
const League_URL = 'https://api-football-v1.p.rapidapi.com/v3/leagues?id=39'

export const fetchLeagueById = createAsyncThunk(
  'football/fetchLeagueById',
  async () => {
    const response = await fetch(League_URL, {
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

const Scorers_URL = 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers?season=2023&league=39'

export const fetchTopScorers = createAsyncThunk(
  'football/fetchTopScorers',
  async () => {
    const response = await fetch(Scorers_URL, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    })
    const scorersData = await response.json()
    return scorersData
  }
)
