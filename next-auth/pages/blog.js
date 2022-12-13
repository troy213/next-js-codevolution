import { getSession } from 'next-auth/react'

const Blog = ({ data }) => {
  return <h1>Blog Page - {data}</h1>
}

export default Blog

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${process.env.REDIRECT_URL}`,
        permanent: false,
      },
    }
  }

  // ideally you want to return the data if the session is true
  return {
    props: {
      data: session ? 'List of 100 personalized blogs' : 'List of free blogs',
    },
  }
}
