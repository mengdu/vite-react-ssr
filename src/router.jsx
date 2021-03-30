import Router from './components/router'
import Home from './pages/Home'
import Params from './pages/Params'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Layout from './pages/Layout'
import Page1 from './pages/Layout/Page-1'
import Page2 from './pages/Layout/Page-2'

export default new Router({
    routes: [
        { path: '/', component: Home },
        // Dynamic routing
        { path: '/user/:userId', component: Params },
        { path: '/docs/:docId/:postId?', component: Params },
        {
            path: '/layout',
            component: Layout,
            routes: [
                { path: '/layout/page-1', component: Page1 },
                { path: '/layout/page-2', component: Page2 },
            ]
        },
        { path: '/about', component: About },
        { label: '404', component: NotFound }
    ]
})
