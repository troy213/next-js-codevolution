import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Dashboard = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn()
    }
  }, [status])

  if (status === 'loading') return <h1>Loading...</h1>

  if (session) return <h1>Dashboard Page</h1>
}

export default Dashboard
