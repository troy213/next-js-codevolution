import { SessionProvider } from 'next-auth/react'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '../components/Navbar.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
