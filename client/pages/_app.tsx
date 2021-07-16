import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '../context/userContext'
import { GentleProvider } from '../context/gentleContext'
import { createGentleInstance } from 'gentleman-sample-sdk'

function MyApp({ Component, pageProps }: AppProps) {
  let gentleClient
  if (process.browser) gentleClient = createGentleInstance({ baseUrl: 'http://localhost:5000' })

  if (gentleClient) {
    return (
      <GentleProvider gentleClient={gentleClient}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </GentleProvider>
    )
  }

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
export default MyApp
