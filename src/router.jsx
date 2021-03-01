import Router from './components/router'
import Home from './pages/Home'
import Blog from './pages/Blog'
import User from './pages/User'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Demo from './pages/Demo'
import Demo1 from './pages/Demo/Demo1'
import Demo2 from './pages/Demo/Demo2'

export default new Router({
    routes: [
        { path: '/', component: Home },
        { path: '/user/:userId', component: User },
        { path: '/blog', component: Blog },
        {
            path: '/demo',
            component: Demo,
            routes: [
                { path: '/demo/test', component: Demo1 },
                { path: '/demo/test/123', component: Demo2 },
            ]
        },
        { path: '/about', component: About },
        { label: '404', component: NotFound }
    ]
})
