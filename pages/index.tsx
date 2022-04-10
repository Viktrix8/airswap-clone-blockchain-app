import type { NextPage } from 'next'
import Head from 'next/head'

import Header from '../components/Header'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen w-screen text-white">
      <Head>
        <title>AirSwap Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      {/* Swap */}
      <Header />
    </div>
  )
}

export default Home
