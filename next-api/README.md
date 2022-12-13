<div align='center'><h1>Codevolution NextJS Course</h1>
<h3>Next API</h3>
</div>
<hr />

### 📃 Documentation

**Introduction**

NextJS basically is a fullstack framework, you can write RESTful API and connect to the database with NextJS.
to create an API, you need to make an **api** folder inside **pages** folder, and **_the name must be "api" and it must be inside of pages folder_**

**Table of Content**

- Folder Structure Example
- Setting up your API
  - Basic handler
  - Catch All route
  - GET, POST
  - PUT, DELETE
- Fetching data from Client Side
- API and Pre-Rendering
- API Summary

<hr />

**Folder Structure Example**

```
your-project/
|
|– pages/
|   |– api/
|   |   |- blog/
|   |   |   |- [blogId].js     // http://localhost:3000/api/blog/abc123
|   |   |   |- recent.js       // http://localhost:3000/api/blog/recent
|   |   |   |- index.js        // http://localhost:3000/api/blog
|   |   |
|   |   |- [...params].js      // catch all routes
|   |   |- dashboard.js        // http://localhost:3000/api/dashboard
|   |   |- index.js            // http://localhost:3000/api/
|   |
|
```

<hr />

**Setting Up your API**

- Basic handler

```js
const handler = (req, res) => {
  res.status(200).json({ success: true, data })
}

export default handler
```

- Catch All Route

```js
const handler = (req, res) => {
  const { params } = req.query
  res.status(404).json({ success: false })
}
```

- GET, POST

```js
const handler = (req, res) => {
  if (req.method === 'GET') return res.status(200).json({ success: true, data })
  if (req.method === 'POST')
    return res.status(201).json({ success: true, data })
}

export default handler
```

- PUT, DELETE

```js
const handler = (req, res) => {
  const { id } = req.query

  if (req.method === 'GET') return res.status(200).json({ success: true, data })
  if (req.method === 'PUT') return res.status(200).json({ success: true, data })
  if (req.method === 'DELETE')
    return res.status(200).json({ success: true, data })
}

export default handler
```

<hr />

**Fetching data from the Client Side**

```js
import { useState } from 'react';

const Component = () => {
  const [componentData, setComponentData] = useState([]);
  const [newData, setNewData] = useState('');

  const getData = async () => {
    const response = await fetch('/api');
    const data = await response.json();
    setComponentData(data);
  }

  const postData = async () => {
    const response = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ newData }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    getData();
  }

  const putData = async (id) => {
    const response = await fetch(`/api/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ newData });
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    getData();
  }

  const deleteData = async (id) => {
    const response = await fetch(`/api/${id}`, {
      method: 'DELETE',
    })
    const data = await response.json();
    getData();
  }

  return <>. . .</>
}
```

<hr />

**API and Pre-Rendering**

All the data that already fetched can be pre-rendered inside dynamic routes. You need to avoid calling your API inside _getStaticProps_ because it cause a roundtrip.

for example:

```js
import { datas } from '../../data/yourDatas';

const Component = ({ yourData }) => {
  return <>. . .</>
}

export default Component;

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: '1'};
      },
      {
        params: { id: '2'};
      },
      {
        params: { id: '3'};
      },
    ]
  }
}

export const getStaticProps = async (context) => {
  const { params } = context;
  const { id } = params

  const newData = datas.find(data => data.id === id);

  return {
    props: {
      yourData: newData
    }
  }
}
```

<hr />

**API Summary**

- API Routing mechanism is similar to page based routing mechanism
- APIs are associated with a route based on their file name
- Every API route exports a default function typically named _handler_ function
- The _handler_ function receives the _request_ and _response_ as parameters
- Cater to different request types like GET and POST using _req.method_
- We should not call our own API routes for pre-rendering content
