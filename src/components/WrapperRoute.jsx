import { useState, useEffect } from 'react'
import router from '../router'
import { queryStringToObject } from '../utils'

export default function WrapperRoute (Component) {
  function PageWrapper (props) {
    const isCurrent = props.match.path === props.path
    const data = {}
    for (const k in props) {
      if (['history', 'location', 'match', 'route', 'staticContext'].indexOf(k) > -1) {
        data[k] = props[k]
      } else if (isCurrent && k === 'props') {
        for (const i in props.props) {
          data[i] = props.props[i]
        }
      }
    }

    data.ssrLoaded = isCurrent || !!Component.loadData
    data.loadDataed = isCurrent
    data.hasLoadData = !!Component.loadData
    const [injectProps, setInjectProps] = useState(data)

    useEffect(() => {
      // 路由切换时当前组件已经在服务端调用loadData
      if (!isCurrent && Component.loadData) {
        Component.loadData({
          isSSR: false,
          query: queryStringToObject(props.location.search),
          params: props.match.params,
          url: props.match.url + props.location.search
        }).then(result => {
          if (result.redirect) {
            if (/^http/.test(result.redirect)) {
              location.href = result.redirect
            } else {
              props.history.push(result.redirect)
            }
          } else {
            const newProps = { ...injectProps, ...result }
            newProps.loadDataed = true
            setInjectProps(newProps)
          }
        }).catch(err => {
          newProps.loadDataed = true
          const newProps = { ...injectProps, err }
          setInjectProps(newProps)
        })
      }
    }, [])

    return <Component {...injectProps} />
  }

  PageWrapper.loadData = Component.loadData
  PageWrapper.$raw = Component

  return PageWrapper
}
