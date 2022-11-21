import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ItemContextProvider } from '../context/ItemContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ItemContextProvider>
      <Component {...pageProps} />
    </ItemContextProvider>
  )
}
