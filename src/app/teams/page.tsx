'use client'
import { fetchTeams, fetchTeamsStats } from "@/api/teamsEndpoints"
import { teamsStatsSlice } from "@/features/teams/teamsStatsSlice"
import { AppDispatch, RootState } from "@/store/store"
import { Table } from "flowbite-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Teams() {
    const dispatch: AppDispatch = useDispatch()
    const teamsData = useSelector((state: RootState) => state.teams.teamsData)
    const teamsStatsData = useSelector((state: RootState) => state.teamsStats.teamsStatsData)

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

    useEffect(() => {
        if (teamsData && teamsData.response) {
            const firstTwoTeams = teamsData.response.slice(0, 2);
            firstTwoTeams.forEach(team => {
                dispatch(fetchTeamsStats(team.team.id));
            });
        }
    }, [dispatch, teamsData]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div className="mt-4 text-center">
                <h1 className="text-2xl">Premier League Teams</h1>
                <p>General Information about each Team</p>
            </div>
            
            <div className="overflow-auto">
                <Table hoverable >
                    <Table.Head>
                        <Table.HeadCell>Team</Table.HeadCell>
                        <Table.HeadCell>Founded</Table.HeadCell>
                        <Table.HeadCell>Stadium</Table.HeadCell>
                        <Table.HeadCell>Capacity</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {teamsData.response && teamsData.response.map((teamInfo, index) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {teamInfo.team.name}
                                </Table.Cell>
                                <Table.Cell>{teamInfo.team.founded}</Table.Cell>
                                <Table.Cell>{teamInfo.venue.name}</Table.Cell>
                                <Table.Cell>{teamInfo.venue.capacity}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {teamsStatsData.map((stats, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{stats.response.team?.name}</span>
                        <span>{stats.response.goals?.for.total.total}</span>
                        <span>{stats.response.goals?.for.total.home}</span>
                        <span>{stats.response.goals?.for.total.away}</span>
                    </div>                  
                ))}
            </div>
        </div>
    )
}