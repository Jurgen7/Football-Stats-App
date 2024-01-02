'use client'

import { Navbar } from 'flowbite-react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../public/images/premier-league-1.svg'


export default function PageNavbar() {

    return (
        <div>
            <Navbar fluid >
                <Navbar.Brand as={Link} href="">
                    <Image src={Logo} width={34} className="mr-3 h-6 sm:h-9" alt="Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white" style={{ color: '#111' }}>
                        Premier Stats
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link as={Link} href="/"> Players </Navbar.Link>
                    <Navbar.Link as={Link} href="#"> News </Navbar.Link>
                    <Navbar.Link as={Link} href="/teams"> Teams </Navbar.Link>
                    <Navbar.Link as={Link} href="/standings"> Standings </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}