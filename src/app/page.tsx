'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from 'flowbite-react'
import Logo from '../../public/images/logo.png'
import { useEffect } from 'react'
import { fetchLeagueById, fetchTopScorers } from '../api/fixturesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, store } from '../store/store'
import { AppDispatch } from '../store/store'
import { Table } from 'flowbite-react'

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  const leagueData = useSelector((state: RootState) => state.football.leagueData)
  const topScorersData = useSelector((state: RootState) => state.football.topScorersData)

  useEffect(() => {
    dispatch(fetchLeagueById())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchTopScorers()) 
  }, [dispatch])

  console.log(leagueData)
  console.log(topScorersData)

  const scorers = topScorersData?.response

  return (
 
    <div>
      <Navbar fluid >
        <Navbar.Brand as={Link} href="">
          <Image src={Logo} width={34} height={26} className="mr-3 h-6 sm:h-9" alt="Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white" style={{ color: '#111' }}>Football Hub</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link as={Link} href="#">
            News
          </Navbar.Link>
          <Navbar.Link href="#">Live</Navbar.Link>
          <Navbar.Link href="#">Standings</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <h1>This Season Goalscorers</h1>
        <p>League: {leagueData?.response?.[0]?.league?.name} </p>
      </div>

      <div className="overflow-x-auto">
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
    </div>
  )
}
