import { AirswapProvider } from '../context/AirswapContext'
import type { AppProps } from 'next/app'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AirswapProvider>
      <Component {...pageProps} />
    </AirswapProvider>
  )
}

export default MyApp
