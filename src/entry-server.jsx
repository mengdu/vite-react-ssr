import ReactDOMServer from 'react-dom/server'
import { matchRoutes } from 'react-router-config'
import { StaticRouter } from 'react-router-dom'
import { App } from './App'
import router from './router'
import { SSRProvider } from './context'

async function loadData (url, context) {
    // const promises = matchRoutes(router.routes, url).map(({ route, match }) => {
    //     console.log(route)
    //     return route.component.loadData
    //         ? route.component.loadData(match)
    //         : Promise.resolve(null)
    // })
    
    // return Promise.all(promises)

    const routes = matchRoutes(router.routes, url)
    const firstRoute = routes[0]
    if (firstRoute && firstRoute.route.component.loadData) {
        return await firstRoute.route.component.loadData(context, firstRoute.match)
    }
    return null
}

export async function render(url, context) {
    const props = await loadData(url, context)

    const html = ReactDOMServer.renderToString(
        <SSRProvider value={props}>
            <StaticRouter location={url} context={context}>
                <App></App>
            </StaticRouter>
        </SSRProvider>
    )

    return { appHtml: html, propsData: props }
}
