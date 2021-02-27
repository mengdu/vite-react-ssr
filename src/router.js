import WrapperRoute from './components/WrapperRoute'
import Home from './pages/Home'
import Blog from './pages/Blog'
import User from './pages/User'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default {
    routes: [
        { path: '/', exact: true, component: WrapperRoute(Home) },
        { path: '/user/:userId', exact: true, component: WrapperRoute(User) },
        { path: '/blog', exact: true, component: WrapperRoute(Blog) },
        { path: '/about', exact: true, component: WrapperRoute(About) },
        { label: '404', component: NotFound }
    ]
}
