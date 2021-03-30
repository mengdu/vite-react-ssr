import { Link } from 'react-router-dom'
import router from './router'
import { SSRConsumer } from './context'
import ErrorPage from './pages/Error'
import './App.css'

export function App(props) {
  return (
    <>
      <SSRConsumer>
        {(ctx) => {
          if (ctx.$ssrErrorMsg) {
            return <ErrorPage message={ctx.$ssrErrorMsg}/>
          }

          return (
            <>
              <h1 className="text-center">React SSR base on Vite</h1>
              <nav className="main-nav text-center">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/user/1234?with=1">Params</Link></li>
                  <li><Link to="/layout">Layout</Link></li>
                  <li><Link to="/about">About</Link></li>
                </ul>
              </nav>
              <div className="text-center">
                {router.view({ ssr: ctx })}
              </div>
            </>
          )
        }}
      </SSRConsumer>
    </>
  )
}
