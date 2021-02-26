import ReactDOMServer from 'react-dom/server'
import { matchRoutes } from 'react-router-config'
import { StaticRouter } from 'react-router-dom'
import { App } from './App'
import router from './router'
import { SSRProvider } from './context'

function loadData (url) {
    const promises = matchRoutes(router.routes, url).map(({ route, match }) => {
        // console.log(route)
        return route.component.loadData
            ? route.component.loadData(match)
            : Promise.resolve(null)
    })

    return Promise.all(promises)
}

export async function render(url, context) {
    console.log(url)
    // const data = await loadData(url)
    const data = { arr: [1,2,3] }
    return ReactDOMServer.renderToString(
        <SSRProvider value={data}>
            <StaticRouter location={url} context={context}>
                <App></App>
            </StaticRouter>
        </SSRProvider>
    )
}
