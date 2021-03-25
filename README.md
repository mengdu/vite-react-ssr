# Vite React SSR

Server Side Rendering project template base on `Vite` + `React`.

## loadData

Define component loadData function:

```js
// pages/demo.jsx
function Demo (props) {
  return <>...</>
}

// ssr data load
Demo.loadData = async (ctx) => {
  const [list, count] = await doRequest()
  return {
    // redirect: '/user/1234', // Switch to route
    // redirect: 'https://other.com?w=123', // Redirect to site

    // props.list
    list: [],
    // props.count
    count: 10
  }
}

export default Demo
```

**ctx**:

+ `ctx.isSSR` `boolean` whether is SSR.
+ `ctx.url` `string` Url for request.
+ `ctx.query` `object` Query params for request.
+ `ctx.params` `object` route params for request.
+ `ctx.req` `express.req` When server rendering.


## Router

```js
// src/router.jsx
import Router from './components/router'
import Home from './pages/Home'
import User from './pages/User'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Layout from './pages/Layout'
import Page1 from './pages/Layout/Page-1'
import Page2 from './pages/Layout/Page-2'

export default new Router({
    routes: [
        { path: '/', component: Home },
        { path: '/user/:userId', component: User },
        {
            path: '/layout',
            component: Layout,
            routes: [
                { path: '/layout/page-1', component: Page1 },
                { path: '/layout/page-2', component: Page2 },
            ]
        },
        { path: '/about', component: About },
        { label: '404', component: NotFound }
    ]
})
```

## Start

**dev**

```sh
npm run dev
```

**build**

```sh
npm run build
```

**serve**

```sh
npm run serve
```

## Deploy

1、build

```sh
npm run build
```

2、serve

```sh
cross-env NODE_ENV=production node server
```
