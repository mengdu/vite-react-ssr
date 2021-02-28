import { Link, Route, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import router from './router'
import { SSRConsumer } from './context'

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
// const pages = import.meta.globEager('./pages/*.jsx')

// const routes = Object.keys(pages).map((path) => {
//   const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1]
//   return {
//     label: name,
//     path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
//     component: pages[path].default
//   }
// })

export function App(props) {
  const routes = router.routes
  return (
    <>
      <SSRConsumer>
        {(ctx) => {
          return (
            <>
              <nav>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/user/1234?with=1">User</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/about">About</Link></li>
                </ul>
              </nav>
              {renderRoutes(routes, { ...ctx })}
            </>
          )
        }}
      </SSRConsumer>
    </>
  )
}
