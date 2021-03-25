import { renderRoutes, matchRoutes } from 'react-router-config'
import { useState, useEffect, useRef } from 'react'
import { queryStringToObject } from '../../utils'

function ssrWrapper (Component) {
  function SSRPage (props) {
    const exit = useRef(false)
    const ssr = props.ssr[props.match.path]
    const ssrData = ssr ? ssr.data : null
    const url = props.location.pathname + props.location.search
    const data = {
      ...ssrData,
      ssrCurrent: props.ssr.hasOwnProperty(props.match.path) && ssr.url === url
    }
    data.loaded = data.ssrCurrent

    const [injectData, setInjectData] = useState(data)

    const frontendLoadData = () => {
      Promise.all([
        Component.loadData({
          isSSR: false,
          query: queryStringToObject(props.location.search),
          params: props.match.params,
          url: props.match.url + props.location.search
        })
      ]).then(([result]) => {
        if (result.redirect) {
          if (/^http/.test(result.redirect)) {
            location.href = result.redirect
          } else {
            props.history.push(result.redirect)
          }
        } else {
          const newData = { ...injectData, ...result }
          newData.loaded = true

          // 避免 unmounted 还设置
          !exit.current && setInjectData(newData)
        }
      }).catch(err => {
        const newData = { ...injectProps, err }
        newData.loaded = true
        !exit.current && setInjectData(newData)
      })
    }

    useEffect(() => {
      // 切换路由，如果服务端渲染的不是当前路由时渲染
      if ((!data.ssrCurrent) && Component.loadData) {
        frontendLoadData()
      }

      return () => {
        exit.current = true
      }
    }, [])

    return <Component
      match={props.match}
      history={props.history}
      location={props.location}
      route={props.route}
      view={props.view}
      ssr={props.ssr}
      {...injectData}/>
  }

  SSRPage.loadData = Component.loadData
  SSRPage.$raw = Component

  return SSRPage
}

export default class Router {
  constructor ({ routes }) {
    function loop (arr) {
      return arr.map(e => {
        const route = {
          ...e,
          path: e.path,
          exact: e.exact === undefined ? true : e.exact
        }

        if (e.routes) {
          route.component = (props) => {
            const Component = ssrWrapper(e.component)
            return <Component {...props}
              view={(props) => props.route.routes
                ? renderRoutes(props.route.routes, { ssr: props.ssr })
                : null}/>
          }
          route.component.loadData = e.component.loadData
          route.exact = false
          route.routes = loop(e.routes)
        } else {
          route.component = ssrWrapper(e.component)
        }

        return route
      })
    }

    this.routes = loop(routes)
  }

  view (props) {
    return renderRoutes(this.routes, props)
  }

  match (url) {
    return matchRoutes(this.routes, url)
  }
}
