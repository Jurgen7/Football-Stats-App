'use client';
import { Alert, Datepicker, Navbar } from "flowbite-react";
import Image from "next/image";



export default function Home() {
  return (
    <main>
      <Navbar
      fluid={true}
      rounded={true}
    >
      <Navbar.Brand href="https://flowbite.com/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flashscore
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          href="/navbars"
          active={true}
        >
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars">
          About
        </Navbar.Link>
        <Navbar.Link href="/navbars">
          Services
        </Navbar.Link>
        <Navbar.Link href="/navbars">
          Pricing
        </Navbar.Link>
        <Navbar.Link href="/navbars">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    </main>
  )
}
