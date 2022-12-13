import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <nav className='header'>
      <h1 className='logo'>
        <a href='#'>NextAuth</a>
      </h1>
      <ul className={`main-nav ${!session && loading ? 'loading' : 'loaded'}`}>
        <li>
          <Link href='/'>
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href='/dashboard'>
            <p>Dashboard</p>
          </Link>
        </li>
        <li>
          <Link href='/blog'>
            <p>Blog</p>
          </Link>
        </li>
        {!loading && !session && (
          <li>
            <Link href='/api/auth/signin'>
              <p
                onClick={(e) => {
                  e.preventDefault()
                  signIn('github')
                }}
              >
                Sign In
              </p>
            </Link>
          </li>
        )}

        {session && (
          <li>
            <Link href='/api/auth/signOut'>
              <p
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign Out
              </p>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
