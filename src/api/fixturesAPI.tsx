

import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://api-football-v1.p.rapidapi.com/v3/leagues?id=39';
const API_KEY = 'ccaf7c1fe6msh5aa3e83e5e5b132p14305djsnb398e7ccd0a1';

export const fetchLeagueById = createAsyncThunk(
  'football/fetchLeagueById',
  async () => {
    const response = await fetch(API_URL, {
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
