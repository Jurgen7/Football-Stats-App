'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Live Football Statistics',
//   description: 'Get your team results whenever you want',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className= {`${inter.className} bg-slate-800 text-slate-100 container `}>
          {children}
        </body>
      </html>
    </Provider>
  )
}
