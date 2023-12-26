'use client'

import { useEffect } from 'react'
import { fetchTopScorers } from '@/api/playersEndpoints'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, store } from '@/store/store'
import { AppDispatch } from '@/store/store'
import { Table } from 'flowbite-react'

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  const topScorersData = useSelector((state: RootState) => state.players.topScorersData)

  useEffect(() => {
    dispatch(fetchTopScorers()) 
  }, [dispatch])

  const scorers = topScorersData?.response

  return (
 
    <div>

      <div className='m-auto my-4 text-center'>
        <h1>Goalscorers Stats</h1>
        <p>Premier League</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%', height: '70vh' }}>
        <div className="overflow-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Player</Table.HeadCell>
              <Table.HeadCell>Appearences</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">

              {Array.isArray(scorers) && scorers.map((scorer, index) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {scorer.player.name}
                  </Table.Cell>
                  <Table.Cell>{scorer.statistics[0].games.appearences}</Table.Cell>
                </Table.Row>

              ))}
            </Table.Body>
          </Table>
        </div>

        <div className="overflow-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Player</Table.HeadCell>
              <Table.HeadCell>Shots</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">

              {Array.isArray(scorers) && scorers.map((scorer, index) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {scorer.player.name}
                  </Table.Cell>
                  <Table.Cell>{scorer.statistics[0].shots.total}</Table.Cell>
                </Table.Row>

              ))}
            </Table.Body>
          </Table>
        </div>

        <div className="overflow-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Player</Table.HeadCell>
              <Table.HeadCell>Goals</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">

              {Array.isArray(scorers) && scorers.map((scorer, index) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {scorer.player.name}
                  </Table.Cell>
                  <Table.Cell>{scorer.statistics[0].goals.total}</Table.Cell>
                </Table.Row>

              ))}
            </Table.Body>
          </Table>
        </div>

        <div className="overflow-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Player</Table.HeadCell>
              <Table.HeadCell>Penalties</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">

              {Array.isArray(scorers) && scorers.map((scorer, index) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {scorer.player.name}
                  </Table.Cell>
                  <Table.Cell>{scorer.statistics[0].penalty.scored}</Table.Cell>
                </Table.Row>

              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  )
}
