const http = require('http')
const path = require('path')
const createViteHandle = require('./vite-handle')

const isProd = process.env.NODE_ENV === 'production'
const port = +process.env.PORT || 3000
const resolve = (p) => path.resolve(__dirname, p)

createViteHandle({
    index: isProd ? resolve('dist/client/index.html') : resolve('index.html'),
    dist: resolve('dist'),
    dev: !isProd
}).then(handle => {
    const app = http.createServer((req, res) => {
        if (isProd) {
            require('compression')()(req, res, () => {
                handle(req, res)
            })
        } else {
            handle(req, res)
        }
    })

    app.listen(port, () => {
        console.log(`StartAt: http://localhost:${port}`)
    })
})
