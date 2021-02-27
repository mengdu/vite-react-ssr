import { useState, useEffect } from 'react'
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
          setInjectProps({ ...injectProps, ...result })
        })
      }
    }, [])

    // console.log(props.route.component.$raw === Component)
    return <Component {...injectProps} />
  }

  PageWrapper.loadData = Component.loadData
  PageWrapper.$raw = Component

  return PageWrapper
}
