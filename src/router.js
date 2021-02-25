import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default {
    routes: [
        { path: '/', label: 'Home', component: Home },
        { path: '/about', label: 'About', component: About },
        { label: '404', component: NotFound }
    ]
}
