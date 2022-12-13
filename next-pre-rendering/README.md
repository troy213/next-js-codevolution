<div align='center'><h1>Codevolution NextJS Course</h1>
<h3>Pre Rendering and Data Fetching</h3>
</div>
<hr />

### 📃 Documentation

by default Next using SSG to pre-render all data fetch by using **getStaticProps** in the page file

Table of content:

- getStaticProps & getStaticPaths
  - getStaticProps
  - getStaticPaths
    - getStaticPaths _(hardcoded)_
    - getStaticPaths _(dynamic)_
  - getStaticPaths fallback
    - fallback: false
    - fallback: true
    - fallback: 'blocking'
- Incremental Static Regeneration (ISR)
- Server Side Rendering (SSR)
- Client Side Rendering (CSR)
  - conventional method
  - SWR (Stale While Revalidate) method

<hr />

## **getStaticProps & getStaticPaths**

- **getStaticProps**

```js
const Component = ({users}) => {
 return (
  <>
   {users.map(user => {
    return (
    <div key={user.id}>
     <p>{user.name}</p>
    </div>
    )
   })}
  </div>
 )
}

export default Component;

export const getStaticProps = async () => {
 const response = await fetch('fetchUrl');
 const data = await response.json();

 // need to return object of props
 return {
  props: {
   users: data
  }
 }
}
```

**getStaticPaths** is needed to fetch dynamic type of data fetching like get user detail, get post detail or etc which require identifier

- **getStaticPaths** _hardcoded_

```js
export const getStaticPaths = async () => {
 // need to return object of paths array of object and fallback
 return {
  paths: [
   {
    params: { id: '1' },
   },
   {
    params: { id: '2' },
   },
   .
   .
   .
  ],
  fallback: false
 }
}

export const getStaticProps = async (context) => {
 const { params } = context;

 const response = await fetch(`fetchUrl/${params.id}`);
 const data = await response.json();

 // need to return object of props object
 return {
  props: {
   users: data
  }
 }
}
```

- **getStaticPaths** _dynamic_

```js
export const getStaticPaths = async () => {
  const response = await fetch(`fetchUrl/${params.id}`)
  const data = await response.json()

  const paths = data.map((value) => {
    return {
      params: {
        id: `${value.id}`,
      },
    }
  })

  // need to return object of paths array of object and fallback
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const { params } = context

  const response = await fetch(`fetchUrl/${params.id}`)
  const data = await response.json()

  // need to return object of props object
  return {
    props: {
      users: data,
    },
  }
}
```

<br />

## **getStaticPaths** fallback

fallback has 3 values

- fallback: false
- fallback: true
- fallback: 'blocking'

**1. fallback: false** mean any paths not returned by getStaticPaths will result in 404 page

for example:

```js
export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: '1' },
      },
    ],
    fallback: false,
  }
}
```

will result 404 page for page other than params of 1

**Usage:**

- the false value is most suitable if you have an application with a small number of paths to pre-render.
- When new pages are not added often.
- A blog site with a few articles is a godd example for fallback set to false

<br />

**2. fallback: true** means

- The paths returned from getStaticPaths will be rendered to HTML at build time by _getStaticProps_.
- The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a "fallback" version of the page on the first request to such path.
- In the background, Next.js will statically generate the requested path HTML and JSON. This includes running _getStaticProps_.
- When that's done, the browser receives the JSON for the generated path. This will be used to automatically render the page with the required props. From the user's perspective the page will be swapped from the fallback page to the full page.
- At the same time, Next.js keeps track of the new list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

for example:

```js
import { useRouter } from 'next/router';

const Component = ({ post }) {
  const router = useRouter();

  // when the page is not served in the server, router.isFallback will be true
  if (router.isFallback) {
    return <Loading />
  }

  return (
    <>
      .
      .
      .
    </>
  )
}

// when fallback set to true, paths all the paths that is not declared will be statically generated on client side
export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: '1' },
      }
    ],
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { params } = context
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  )
  const data = await response.json()

  // redirect to 404 page if fetch return 404
  if (!data.id) {
    return {
      notFound: true,
    }
  }

  // need to return object of props object
  return {
    props: {
      post: data,
    },
  }
}
```

**Usage:**

- The true value is most suitable if your app has a very large number of static pages that depend on data.
- A large e-commerce site.
- You want all the product pages to be pre-rendered but if you have a few thousand products, builds can take a really long time.
- You may statically generate a small subset of products that are popular and use _fallback: true_ for the rest.
- When someone requests a page that's not generated yet, the user will see the page with a loading indicator.
- Shortly after, getStaticProps finishes and the page will be rendered with the requested data. From then onwards, everyone who requests the same page will get the statically pre-rendered page.

**3. fallback: 'blocking'** means

- The paths returned from _getStaticPaths_ will be rendered to HTML at build time by _getStaticProps_.
- The paths that have not been generated at build time will not result in a 404 page. Instead, on the first request, Next.js will render the apge on the server and return the generated HTML.
- When that's done, the browser receives the HTML for the generated path. from the user's perspective, it will transition from "the browser is requesting the page" to "the full page is loaded". There is no flash of loading/fallback state.
- At the same time, Next.js keeps track of the new list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

for example:

```js
export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: '1' },
      },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps = async (context) => {
  const { params } = context
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  )
  const data = await response.json()

  // redirect to 404 page if fetch return 404
  if (!data.id) {
    return {
      notFound: true,
    }
  }

  // need to return object of props object
  return {
    props: {
      post: data,
    },
  }
}
```

**Usage:**

- On a UX level, sometimes, people prefer the page to be loaded without a loading indicator if the wait time is a few milli seconds. This helps avoid the layout shift.
- Some crawlers did not support Javascript. The loading page would be rendered and then the full page would be loaded which was causing a problem.

<hr />

## **Incremental Static Regeneration (ISR)**

The problem of static generation is the data that is fetched can be stale, one of the solution is using _revalidate_ inside _getStaticProps_

for example:

```js
export const getStaticProps = async (context) => {
  const { params } = context
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  )
  const data = await response.json()

  // need to return object of props object
  return {
    props: {
      post: data,
    },
    revalidate: 10, // regenerate every 10 seconds
  }
}
```

the _revalidate_ value is completely dependant on the nature of the application behavior, for example:

- Low traffic e-commerce of active user can have 60s _revalidate_ time value but high traffic site can have revalidation time to 1s to ensure no stale data.
- Documentation site can have more than 60s to make sure changes in documentation are not stale for a long period of time.

<hr />

## **Server Side Rendering (SSR)**

**getServerSideProps**

- _getServerSideProps_ runs only on the server side
- The function will never run in client-side
- The code you write inside _getServerSideProps_ won't even be included in the JS bundle that is sent to the browser
- You can write server-side code directly in _getServerSideProps_
- Accessing the **file system** using the **fs module** or **querying a database** can be done inside _getServerSideProps_
- You also don't have to worry about including **API keys** in _getServerSideProps_ as that won't make it to the browser
- _getServerSideProps_ is allowed only in a page and cannot be run from regular component file
- it is used only for pre-rendering and not client-side data fetching
- _getServerSideProps_ should return an object and object should contain a props key which is an object\*
- _getServerSideProps_ will run at request time

for example:

```js
export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:4000/news')
  const data = await response.json()

  return {
    props: {
      articles: data,
    },
  }
}
```

or

```js
export const getServerSideProps = async (context) => {
  const { params, query, req, res } => context;

  // you can also write server side code here like req.cookies to get cookies and res.setHeader
  // console.log(req.cookies);
  // res.setHeader('Set-Cookie', ['name=Troy']);

  const response = await fetch(`http://localhost:4000/news/${params.category}?subcategory=${query.subcategory}`)
  const data = await response.json();

  return {
    props: {
      articles: data,
      category: params.category
    }
  }
}
```

<hr />

## **Client Side Rendering (CSR)**

it's pretty straight forward how to fetch data in Client Side Rendering if you already learn basic react before. But, Next team recommending to use **SWR (Stale While Revalidate)** library to fetch in Next JS.

for example:

- _conventional method_

```js
import { useState, useEffect } from 'react'

const Component = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/data')
      const data = await response.json()

      setData(data)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return <>. . .</>
}
```

- _using SWR_

```js
import useSWR from 'swr'

const fetcher = async () => {
  const response = await fetch('http://localhost:4000/data')
  const data = await response.json()
}

const Component = () => {
  const { data, error } = useSWR('dashboard', fetcher)

  if (error) return 'Error'
  if (!data) return 'Loading'

  return <>. . .</>
}
```

<hr />

## **Pre-rendering + Client Side Data Fetching**

- SEO + Request time data fetching -> Server-side rendering with _getServerSideProps_
- Client-side data fetching for filtering events
  <sub><em>(ideally, both pagination and filtering would take place client side)</em></sub>

for example:

```js
import { useState } from 'react'
import { useRouter } from 'next/router'

const Component = ({ eventList }) => {
  const [events, setEvents] = useState(eventList)
  const router = useRouter()

  const fetchSportsEvents = async () => {
    // by doing this you can fetch dynamically fetching from client side + server side
    const response = await fetch(`http://localhost:4000/events?category=sports`)
    const data = await response.json()

    setEvents(data)
    router.push('/events?category=sports', undefined, { shallow: true })
  }

  return (
    <>
      <button onClick={fetchSportsEvents}>Sports Events</button>
      <h1>List of events</h1>
      {events.map((event) => {
        return (
          <div key={event.id}>
            <h2>
              {event.id} {event.title} {event.date} | {event.category}
            </h2>
            <p>{event.description}</p>
          </div>
        )
      })}
    </>
  )
}

export default Component

export const getServerSideProps = async (context) => {
  const { query } = context
  const { category } = query
  const queryString = category ? 'category=sports' : ''

  // by doing this you can fetch dynamically fetching from client side + server side
  const response = await fetch(`http://localhost:4000/events?${queryString}`)
  const data = await response.json()

  return {
    props: {
      eventList: data,
    },
  }
}
```
