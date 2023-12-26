import { createAsyncThunk } from '@reduxjs/toolkit'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''
const URL = 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers?season=2023&league=39'

export const fetchTopScorers = createAsyncThunk(
  'football/fetchTopScorers',
  async () => {
    const response = await fetch(URL, {
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


