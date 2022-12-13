import Head from 'next/head'
import Header from 'components/Header'
import Footer from 'components/Footer'
import 'styles/globals.css'
import 'styles/layout.css'

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return (
    <>
      <Head>
        <title>Codevolution</title>
        <meta name='description' content='Awesome youtube channel' />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
