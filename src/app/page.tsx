'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from 'flowbite-react';
import Logo from '../../public/images/logo.png'
import { useEffect } from 'react';
import { fetchLeagueById } from '../api/fixturesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../store/store';
import { AppDispatch } from '../store/store';

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const leagueData = useSelector((state: RootState) => state.football.leagueData); 

  useEffect(() => {
    dispatch(fetchLeagueById()); 
  }, [dispatch]);

  console.log(leagueData);

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
        <h1>Name :{leagueData?.response?.[0]?.league?.name}</h1>
        <h1>Type: {leagueData?.response?.[0]?.league?.type}</h1>
      </div>
    </div>

  )
}
