import { Link } from 'react-router-dom'
import router from './router'
import { SSRConsumer } from './context'
import './App.css'

export function App(props) {
  return (
    <>
      <SSRConsumer>
        {(ctx) => {
          return (
            <>
              <h1>React SSR Project base on Vite</h1>
              <nav className="main-nav">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/user/1234?with=1">User</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/demo">Demo</Link></li>
                  <li><Link to="/about">About</Link></li>
                </ul>
              </nav>
              {router.view({ ssr: ctx })}
            </>
          )
        }}
      </SSRConsumer>
    </>
  )
}
