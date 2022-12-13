import Head from 'next/head'

const Blog = ({ article, description }) => {
  return (
    <>
      <Head>
        {/* <title>Article of {description}</title> */}
        <meta name='description' content={`Article for ${description}`} />
      </Head>
      <h1>
        {article} {description}
      </h1>
      <p>Env Analytics {process.env.NEXT_PUBLIC_ANALYTICS_ID}</p>
    </>
  )
}

export default Blog

export const getServerSideProps = () => {
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD

  console.log({ user, password })
  return {
    props: {
      article: 'Cool Article',
      description: 'Cool Description',
    },
  }
}
