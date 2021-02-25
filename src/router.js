import Home from './pages/Home'
import Blog from './pages/Blog'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default {
    routes: [
        { path: '/', exact: true, component: Home },
        { path: '/blog', exact: true, component: Blog },
        { path: '/about', exact: true, component: About },
        { label: '404', component: NotFound }
    ]
}
