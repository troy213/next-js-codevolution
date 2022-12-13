<div align='center'><h1>Codevolution NextJS Course</h1>
<h3>Next Routing</h3></div>
<hr />

## 🛠 installation

`npm create-next-app <project-name>`

## 📁 route folder structure

```
your-project/
|
|– pages/                      // File based route system
|   |- 404.js                  // Create custom 404 page
|   |
|   |– nested-routes/          // Create nested route
|   |   |- [id]/               // Create dynamic nested route page
|   |   |   |- [childId].js    // Create dynamic route page
|   |   |   |- index.js        // Create dynamic nested route root page
|   |   |
|   |   |- first.js            // Create child route
|   |   |- index.js            // Create nested route root page
|   |
|   |- docs/
|   |   |- [[...params]].js    // Create catch all route page
|   |
|   |– index.js                // Root page
|
```

## 🧭 Navigating

- Navigating through Link

```js
import Link from 'next/link'

const Component = () => {
  return (
    <Link href='/your-route'>
      <p>Your Route</p>
    </Link>
  )
}

export default Component
```

- Navigation programatically

```js
import { useRouter } from 'next/router';

const Component = () => {
 const router = useRouter();

 const { params = [] } = router.query          // get params

 const handleClick = () => {
  router.push('/your-page');                   // navigate to page
  router.replace('/your-page');                // navigate with replace history
 }

 return (
  .
  .
  .
 );
}

export default Component;
```
