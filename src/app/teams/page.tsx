'use client'
import { fetchTeams, fetchTeamsStats } from "@/api/teamsEndpoints"
import { AppDispatch, RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Sidebar } from 'flowbite-react'
import Image from 'next/image'
import { TeamInfo } from "@/features/teams/teamsSlice"
import { Modal } from 'flowbite-react'
import { Accordion } from 'flowbite-react'
import { Stats } from "@/features/teams/teamsStatsSlice"

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
    
                if (!teamsStatsData.some(stats => stats.response.team?.id === team.team.id)) {
                    dispatch(fetchTeamsStats(team.team.id));
                }
            });
        }
    }, [dispatch, teamsData, teamsStatsData]);

    const [selectedTeam, setSelectedTeam] = useState<TeamInfo | null>(null)
    const [selectedTeamStats, setSelectedTeamStats] = useState<Stats | null>(null)
    const [openModal, setOpenModal] = useState(false)

    const handleTeamSelect = (teamInfo: TeamInfo) => {
        const teamStats = teamsStatsData.find(
            stats => stats.response.team?.id === teamInfo.team.id
        )
        setSelectedTeam(teamInfo)
        setSelectedTeamStats(teamStats || null )
        setOpenModal(true)
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div className="mt-4 text-center">
                <h1 className="text-2xl">Premier League Teams</h1>
                <p>General information about the Clubs</p>
            </div>
            <div className="flex gap-12 px-12 box-border">
                <Sidebar aria-label="Default sidebar example" style={{ width: '20%', height: '70vh' }}>
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            {teamsData.response && teamsData.response.map((teamInfo, index) => (
                                <Sidebar.Item 
                                    href="#" 
                                    key={index}
                                    onClick={() => handleTeamSelect(teamInfo)}
                                >
                                    <div className="flex gap-4 items-center">
                                        <Image 
                                            src={teamInfo.team.logo} 
                                            width={0} 
                                            height={0} 
                                            style={{ width: '32px' }} 
                                            sizes="100vw" 
                                            alt="team-logo" 
                                        />
                                        <span>{teamInfo.team.name}</span>
                                    </div>
                                </Sidebar.Item>
                            ))} 
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
                <div className="flex-grow flex justify-center items-start" style={{ width: '80%' }}>
                    <Accordion className="w-full md:w-96 h-auto">
                        <Accordion.Panel>
                            <Accordion.Title>Premier League</Accordion.Title>
                            <Accordion.Content>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    The Premier League is the highest level of the English football league system.
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Contested by 20 clubs, it operates on a system of promotion and relegation with the
                                    English Football League (EFL). Seasons typically run from August to May, with each 
                                    team playing 38 matches against all other teams, both home and away.
                                </p>
                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                            <Accordion.Title>Premier League History</Accordion.Title>
                            <Accordion.Content>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    The competition was founded as the FA Premier League on 20 February 1992 following
                                    the decision of First Division (top-tier league from 1888 until 1992) clubs to break 
                                    away from the English Football League.
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    The Premier League is the most-watched sports league in the world, broadcast in 212 territories
                                    to 643 million homes, with a potential TV audience of 4.7 billion people.
                                </p>
                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                            <Accordion.Title>Teams</Accordion.Title>
                            <Accordion.Content>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                With 48 continental trophies won, English clubs are the third-most successful in European football, 
                                behind Italy (49) and Spain (65). In the top-tier UEFA Champions League, a record six English clubs 
                                have won a total of 15 titles and lost a further 11 finals, behind Spanish clubs with 19 and 11, 
                                respectively. In the second-tier UEFA Europa League, English clubs are also second, with nine 
                                victories and eight losses in the finals.
                            </p>
                            <p className="mb-2 text-white">
                                To learn more information and statistics about each team click on the team you want on the sidebar!
                            </p>
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            </div>

            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    {selectedTeam ? selectedTeam.team.name : 'Team Details'}
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        {selectedTeam && (
                            <>
                                <Image 
                                    src={selectedTeam.team.logo} 
                                    width={0} 
                                    height={0} 
                                    style={{ width: '38px' }} 
                                    sizes="100vw"  
                                    alt={`${selectedTeam.team.name} logo`} 
                                />
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Founded: {selectedTeam.team.founded}
                                </p>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Stadium: {selectedTeam.venue.name}
                                </p>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Capacity: {selectedTeam.venue.capacity}
                                </p>
                                {selectedTeamStats && (
                                    <>
                                        <h3 className='text-gray-900 text-xl border-b pb-5 font-medium'>2023 Stats</h3>
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                            Total Goals: {selectedTeamStats.response.goals?.for.total.total}
                                        </p>
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                            Home Goals: {selectedTeamStats.response.goals?.for.total.home}
                                        </p>
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                            Away Goals: {selectedTeamStats.response.goals?.for.total.away}
                                        </p>
                                    </>
                                )}
                            </>
                        )}

                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}