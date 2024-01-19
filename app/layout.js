import { Courier_Prime } from 'next/font/google'
import { Inter } from 'next/font/google'
import './globals.css'

const courier_Prime = Courier_Prime({ subsets: ['latin'], weight: ['400', '700'] })
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Stargazer',
  description: 'Find the current stargazing conditions for any city or local area',
  icon: '/favicon.ico',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={courier_Prime.className}>{children}</body>
    </html>
  )
}
