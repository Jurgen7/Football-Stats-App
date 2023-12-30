// import { fetchTeamsStats } from "@/api/teamsEndpoints";
// import { teamsStatsSlice } from "@/features/teams/teamsStatsSlice";
// import { call, put, takeLatest } from "redux-saga/effects";

// function* fetchTeamsStatsSaga (action: any): Generator {
//     try {
//         const { teamId } = action.payload;
//         const teamsStatsData = yield call(fetchTeamsStats, teamId);
 
//         yield put(teamsStatsSlice.actions.fetchTeamsStatsSuccess({ teamId, data: teamsStatsData }));
//     } catch (e: any) {
//         console.error("Error fetching team stats:", e);
//         yield put(teamsStatsSlice.actions.fetchTeamsStatsFailure(e.message));
//     }
// }

// export function* watchFetchTeamsStats() {
//     console.log("Setting up watchFetchTeamsStats");
//     yield takeLatest('teams/fetchTeamsStatsRequest', fetchTeamsStatsSaga);
// }