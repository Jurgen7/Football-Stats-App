'use client'

import { useEffect } from 'react'
import { fetchTopScorers } from '@/api/playersEndpoints'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, store } from '@/store/store'
import { AppDispatch } from '@/store/store'
import { Table } from 'flowbite-react'
import { playersSlice } from '@/features/players/playersSlice';

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  const topScorersData = useSelector((state: RootState) => state.players.topScorersData)

  useEffect(() => {
    dispatch(playersSlice.actions.fetchTopScorersRequest()) 
  }, [dispatch])

  return (
 
    <div>

      <div className='m-auto mt-8 text-center'>
        <h1>Goalscorers Stats</h1>
        <p>Premier League</p>
      </div>

      <div className="overflow-auto p-8">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Player</Table.HeadCell>
                    <Table.HeadCell>Appearances</Table.HeadCell>
                    <Table.HeadCell>Shots</Table.HeadCell>
                    <Table.HeadCell>Goals</Table.HeadCell>
                    <Table.HeadCell>Penalties</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {topScorersData && topScorersData.response.map((scorer, index) => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                            <Table.Cell className="whitespace-nowrap cursor-pointer font-medium text-gray-900 dark:text-white">
                            <div className="flex gap-4 items-center">
                                        <img src={scorer.player.photo} width={32}  alt="player-picture"></img>
                                        <span>{scorer.player.name}</span>
                                    </div>
                            </Table.Cell>
                            <Table.Cell>{scorer.statistics[0].games.appearences}</Table.Cell>
                            <Table.Cell>{scorer.statistics[0].shots.total}</Table.Cell>
                            <Table.Cell>{scorer.statistics[0].goals.total}</Table.Cell>
                            <Table.Cell>{scorer.statistics[0].penalty.scored}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    </div>
  )
}
