import '../styles/globals.css'
import '../styles/theme.scss'

import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import { useState } from 'react'
import { Router } from 'next/router'

import { Spinner } from 'react-bootstrap'

import { Header } from '../components/Header'


export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  const [isLoad, setIsLoad] = useState(true)

  Router.events.on("routeChangeStart", (url) => {
    setIsLoad(false)
  })

  Router.events.on("routeChangeComplete", (url) => {
    setIsLoad(true)
  })
  
  return (
    <SessionProvider session={session}>
      <Header />
      {isLoad ? 
        <Component {...pageProps} />
        : 
        <section className='w-100 position-relative' style={{'height': '80vh'}}>
          <Spinner className='position-absolute top-50 start-50' animation="border" />
        </section>
      }
      <footer className='p-5 bg-dark mt-5 text-white'>footer</footer>
    </SessionProvider>
  )
}