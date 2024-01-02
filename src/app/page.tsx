'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState} from '@/store/store'
import { AppDispatch } from '@/store/store'
import { Modal, Table } from 'flowbite-react'
import { PlayerInfo, playersSlice } from '@/features/players/playersSlice';
import Image from 'next/image'

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  const topScorersData = useSelector((state: RootState) => state.players.topScorersData)

  useEffect(() => {
    dispatch(playersSlice.actions.fetchTopScorersRequest()) 
  }, [dispatch])

  const [selectedScorer, setselectedScorer] = useState<PlayerInfo | null>(null);
  const [openModal, setOpenModal] = useState(false);

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
              <Table.Row 
                  className="bg-white dark:border-gray-700 dark:bg-gray-800" 
                  key={index}
                  onClick={() => {
                    setselectedScorer(scorer);
                    setOpenModal(true);
                }}
              >
                <Table.Cell className="whitespace-nowrap cursor-pointer font-medium text-gray-900 dark:text-white">
                  <div className="flex gap-4 items-center">
                    <Image 
                      src={scorer.player.photo} 
                      width={0} 
                      height={0} 
                      style={{ width: '32px' }} 
                      sizes="100vw" 
                      alt="player-picture" 
                    />
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

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <div className='flex gap-4 items-center'>
            <Image 
              src={selectedScorer ? selectedScorer.player.photo : ''} 
              width={0} 
              height={0} 
              style={{ width: '36px' }} 
              sizes="100vw" 
              alt= 'player-photo' 
            />
            {selectedScorer ? selectedScorer.player.name : 'Player'}
          </div>

        </Modal.Header>
        <Modal.Body>
            <div className="space-y-6">
                {selectedScorer && (
                    <>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Age: {selectedScorer.player.age}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Nationality: {selectedScorer.player.nationality}
                        </p>
                        <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400 flex gap-4 items-center">
                            <span>Team:</span> 
                            <span>{selectedScorer.statistics[0].team.name}</span>
                            <Image 
                              src={selectedScorer.statistics[0].team.logo} 
                              width={0} 
                              height={0} 
                              style={{ width: '36px', height: 'auto' }} 
                              sizes="100vw" 
                              alt='team logo' 
                            />   
                        </div>
                    </>
                )}
            </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
