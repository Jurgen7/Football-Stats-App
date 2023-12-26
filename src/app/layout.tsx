'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import PageNavbar from '@/components/navbar'


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <title>Football Hub</title>
        </head>
        <body className={`${inter.className} bg-slate-800 text-slate-100 container `}>
          <PageNavbar />
          {children}
        </body>
      </html>
    </Provider>
  )
}
