import type { NextPage } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Swap from '../components/Swap'

const Home: NextPage = () => {
  return (
    <div className="max-w-screen flex min-h-screen overflow-y-hidden text-white">
      <Head>
        <title>AirSwap Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster position="top-center" />
      <Navbar />
      {/* @ts-ignore */}
      <Swap />
      <Header />
    </div>
  )
}

export default Home
