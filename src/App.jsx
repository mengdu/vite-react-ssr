import { Link, Route, Switch } from 'react-router-dom'
import router from './router'

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

export function App() {
  const routes = router.routes
  return (
    <>
      <nav>
        <ul>
          {routes.map(({ label, path }, index) => {
            if (!path) return null
            return (
              <li key={index}>
                <Link to={path}>{label}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <Switch>
        {routes.map(({ path, component: RouteComp }, index) => {
          return (
            <Route key={index} path={path} exact>
              <RouteComp />
            </Route>
          )
        })}
      </Switch>
    </>
  )
}
