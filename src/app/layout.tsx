"use client"

import '@styles/globals.css'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from '@contexts/Theme/useTheme'
import { NavigationProvider } from '@contexts/Navigation/useNavigation'

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className} >
        <ThemeProvider>
          <NavigationProvider >
            {children}
          </NavigationProvider >
        </ThemeProvider>
      </body>
    </html>

  )
}