<div align='center'><h1>Codevolution NextJS Course</h1>
<h3>Next Misc</h3>
</div>
<hr />

### 📃 Documentation

**Table of Content**

- App Layout
- Head Component
- Image Component
- Absoulte Imports and Module Paths
- Static HTML Export
- Typescript Support
  - Typescript Installation
  - Typescript + Data Fetching
  - Typescript + API Routes
- Preview Mode
- Redirect
- Environment Variables

<hr />

**App Layout**

To create a layout, you can put your **Component** to **pages/\_app.js**

For example:

```js
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/layout.css' // for custom layout styling

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
```

Sometimes, some pages have different layout, you can put an exception for certain page by checking the **Component.getLayout**

for example:

```js
function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return <>. . . </>
}

export default MyApp
```

<hr />

**Head Component**

You also can make a custom **head** tag for your each page to make your website more SEO friendly by importing **Head** from next/head

for example:

```js
import Head from 'next/head'

const Component = () => {
  return (
    <>
      <Head>
        <title>My Awesome Title & My Awesome {customTitle}</title>
        <meta
          name='description'
          content={`My Awesome Meta Description & My Awesome ${customDescription}`}
        />
      </Head>
    </>
  )
}
```

<hr />

**Image Component**

To use an image, you need to put all your assets inside public folder. NextJS is also providing awesome Image Component that lazy load and blur\* on loading by default to avoid layout shift which is causing a bad user experience.

```js
import Image from 'next/image'
import myImage from '../public/myImage.jpg' // staticly import image

const Component = () => {
  return (
    <>
      <Image src={myImage} blurDataURL='' alt='my awesome image' />
    </>
  )
}
```

<sub><em>\*blur on loading is only work if you statically import the image. if you want a blur on loading for dynamic image, you need to add _blurDataURL_ properties inside **Image** component</em></sub>

<hr />

**Absoulte Imports and Module Paths**

To create absolute path, you can create a **jsconfig.json** and write

```json
{
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

<sub><em>If it doesn't work, it's probably your vscode/editor has a problem, if you use a vscode, try to press `Ctrl + Shift + p` and <strong>Reload Window</strong></em></sub>

To use **Module Paths**, you can write _paths_ properties inside **jsconfig.json**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/layout/*": ["components/layout/*"]
    }
  }
}
```

Now you can use the Module paths inside your project

```js
import Header from '@/layout/Header'
import Footer from '@/layout/Footer'
```

<hr />

**Static HTML Export**

Static HTML means you convert NextJS app to normal React App like using CRA without the need of a Node.js server, so you can host your application on any static hosting service or a CDN without having to maintain a server. The downside of Static HTML is you cannot use **ISR** or **SSR**.

To export your Next App to Static HTML is by adding _export_ script inside **package.json**.

```json
"scripts": {
  "export": "next build && next export"
}
```

<hr />

**Typescript Support**

- Typescript installation

You can add Typescript manually by adding **tsconfig.json** file inside your project directory.
Now, you can install the dependecies for typescript by running

```
npm install --save-dev typescript @types/react
```

<sub><em>If you already have the latest version of <strong>create-next-app</strong>, you can add typescript support automatically</em></sub>

- Typescript + Data Fetching

To use _getStaticProps_, _getStaticPaths_, and _getServersideProps_ you need to import the Type from **next** first

```js
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
  // ...
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
}
```

- Typescript + API Routes

```js
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' })
}
```

<hr />

**Preview Mode**

- Help applications that rely on a CMS
- CMS stands for Content Management System and is a tool that helps users create, manage, and modify content on a website without the need for specialized technical knowledge
- How preview mode can be used when you do have a CMS

When to use a Preview Mode?

- In the pre-rendering section, we understood about static generation where the pages are pre-rendered at build time. It is pretty useful when your pages fetch data from a CMS.
- However, it's not suitable when you're creating a draft in your CMS and want to preview the draft changes immediately on your page.
- You want Next JS to bypass static generation for this scenario.
- You deploy your app and then when you make changes in your CMS, they won't be reflected as pages are only generated when you build the application.
- There was a need to handle this scenario of 'Preview of Publish'.

For example:

- Create an index.js file inside news folder

```
|- pages/
|   |- news/
|   |   |- index.js
```

_index.js_

```js
const News = ({ data }) => {
  return <h1 className='content'>{data}</h1>
}

export default News

export const getStaticProps = async (context) => {
  return {
    props: {
      data: context.preview
        ? 'List of draft articles'
        : 'List of published articles',
    },
  }
}
```

- Create a **preview.js** inside api folder

```js
const handler = (req, res) => {
  res.setPreviewData({ user: 'Troy' }) // it accept empty object or object with any key value pair
  res.redirect(req.query.redirect)
}

export default handler
```

- Now type in the URL _http://localhost:3000/api/preview?redirect=/news_
  now the news page will render the data of context preview

<br />

- To disable preview mode, Create **disable-preview.js** inside of api folder

```js
const handler = (req, res) => {
  res.clearPreviewData()
  res.end('Preview mode disabled')
}

export default handler
```

- Now type in the URL _http://localhost:3000/api/disable-preview_
  now the news page will render the published data

Preview mode help update the data without rebuilding your app

<hr />

**Redirect**

Redirect are useful when you want to reorganizing your website or perhaps the sites is undergoing maintenance and you want to temporarily redirect the user to other page.

- First you open **next.config.js**

```js
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/about', // for a complex path matching redirect, you can see the redirect documentation inside NextJS documentation
        destination: '/',
        permanent: true, // is used to give 308 Permanent Redirect HTTP status, if not it will return 307 Temporary Redirect
      },
    ]
  },
}

module.exports = nextConfig
```

<hr />

**Environment Variables**

- First create **.env.local** file in your root directory

```
DB_USER='Troy'
DB_PASSWORD='123'
```

To invoke the data, you can write **process.env.DB_USER** or **process.env.DB_PASSWORD**
<sub><em>You can only invoke the env variable inside nodejs environment</em></sub>

To make a public env variable that can be access inside the client side such as google analytics, you can add **NEXT_PUBLIC_AWESOME_DATA**

```
NEXT_PUBLIC_ANALYTICS_ID='123'
```
