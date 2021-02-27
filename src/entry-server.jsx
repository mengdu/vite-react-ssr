import ReactDOMServer from 'react-dom/server'
import { matchRoutes } from 'react-router-config'
import { StaticRouter } from 'react-router-dom'
import { App } from './App'
import router from './router'
import { SSRProvider } from './context'

async function loadData (url, context) {
    const routes = matchRoutes(router.routes, url.replace(/\?.*$/, ''))
    const firstRoute = routes[0]

    if (firstRoute && firstRoute.route.component.loadData) {
        context.params = firstRoute.match.params
        const result = await firstRoute.route.component.loadData(context, firstRoute.match)
        return {
            path: firstRoute.route.path,
            props: result
        }
    }

    return {
        path: firstRoute && firstRoute.route.path,
        props: null
    }
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
