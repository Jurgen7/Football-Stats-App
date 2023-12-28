import { fetchTopScorers } from "@/api/playersEndpoints";
import { playersSlice } from '@/features/players/playersSlice';
import { call, put, takeLatest } from "redux-saga/effects";


function* fetchTopScorersSaga(): Generator {
    try {
        const topScorersData = yield call(fetchTopScorers)
        yield put(playersSlice.actions.fetchTopScorersSuccess(topScorersData))
    } catch (e: any) {
        yield put(playersSlice.actions.fetchTopScorersFailure(e.message))
    }
}

export function* watchFetchTopScorers() {
    yield takeLatest('players/fetchTopScorersRequest', fetchTopScorersSaga)
}