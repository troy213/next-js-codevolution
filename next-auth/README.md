<div align='center'><h1>Codevolution NextJS Course</h1>
<h3>Next Auth</h3>
</div>
<hr />

### 📃 Documentation

**Table of Content**

- Next Auth Setup
- Sign In and Sign Out
- Client Side Protected Route
- Server Side Authentication
- Securing Pages Server Side
- Securing API Routes

<hr />

**Next Auth Setup**

- Install the **next-auth** library

```
npm install next-auth
```

- Import _SessionProvider_ in the **\_app.js** file

```js
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
```

- Create auth API
  You can name the API routes anything, but the conventional naming for the auth is **auth/**, inside **auth/** folder, go create a file named [...nextauth].js

inside of [...nextauth].js, import _NextAuth_ and the _Providers_

```js
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // you can put another auth provider here, go check and see next-auth documentation for the provider list
  ],
})
```

<hr />

**Sign In and Sign Out**
To Sign In and Sign Out, Next Auth provide a _useSession_ hooks that return data object and status, _signIn_, and _signOut_. The example of usage can be found below.

```js
import { signIn, signOut, useSession } from 'next-auth/react'

const Component = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <>
      {!loading && !session && (
        <div>
          <Link href='/api/auth/signin'>
            <p
              onClick={(e) => {
                e.preventDefault()
                signIn('github') // the parameter can be empty to redirect the page to sign in page
              }}
            >
              Sign In
            </p>
          </Link>
        </div>
      )}

      {session && (
        <div>
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
        </div>
      )}
    </>
  )
}
```

<hr />

**Client Side Protected Route**
You can conditionally render the page with _useSession_ hooks to check if the user is authenticated or not

```js
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Component = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn()
    }
  }, [status])

  if (status === 'loading') return <h1>Loading...</h1>

  if (session) return <h1>Component Page</h1>
}

export default Component
```

<hr />

**Server Side Authentication**

```js
import { getSession } from 'next-auth/react'

const Component = ({ data }) => {
  return <h1>Component Page - {data}</h1>
}

export default Component

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  // ideally you want to return the data if the session is true
  return {
    props: {
      data: session ? 'List of protected data' : 'List of non protected data',
    },
  }
}
```

<hr />

**Securing Pages Server Side**

```js
import { getSession } from 'next-auth/react'

// . . .

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  // if the user is not logged in, user will be redirected to the sign in page
  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${process.env.REDIRECT_URL}`,
        permanent: false,
      },
    }
  }

  // . . .
}
```

<hr />

**Securing API Routes**

```js
import { getSession } from 'next-auth/react'

const handler = async (req, res) => {
  const session = await getSession({ req })

  if (!session)
    return res
      .status(401)
      .json({ success: false, error: 'Unauthenticated user' })
  return res.status(200).json({ success: true, session })
}
```
