import Head from 'next/head'
import Footer from '../components/Footer'

const About = () => {
  return (
    <>
      <Head>
        <title>About Codevolution</title>
        <meta name='description' content='Free tutorials on web development' />
      </Head>
      <h1>About Page</h1>
    </>
  )
}

export default About

About.getLayout = function pageLayout(page) {
  return (
    <>
      {page}
      <Footer />
    </>
  )
}
