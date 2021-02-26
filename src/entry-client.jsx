import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { SSRProvider } from './context'

ReactDOM.hydrate(
  <SSRProvider value={{}}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </SSRProvider>,
  document.getElementById('app')
)
