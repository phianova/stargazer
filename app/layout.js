import { Courier_Prime } from 'next/font/google'
import { Inter } from 'next/font/google'
import './globals.css'

const courier_Prime = Courier_Prime({ subsets: ['latin'], weight: '400' })
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={courier_Prime.className}>{children}</body>
    </html>
  )
}