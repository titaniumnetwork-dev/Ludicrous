import '../styles/globals.css'
import Config from './config.ts'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  pageProps.config = Config;
  return <Component {...pageProps} />
}

export default MyApp
