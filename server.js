const fs = require('fs')
const path = require('path')
const express = require('express')

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD
const resolve = (p) => path.resolve(__dirname, p)

async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === 'production') {
    const indexProd = isProd
        ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
        : ''

    const app = new express()

    /**
     * @type {import('vite').ViteDevServer}
     */
    let vite
    if (!isProd) {
        vite = await require('vite').createServer({
            root,
            logLevel: isTest ? 'error' : 'info',
            server: {
                middlewareMode: true
            }
        })
        // use vite's connect instance as middleware
        app.use(vite.middlewares)
    } else {
        app.use(require('compression')())
        app.use(
            require('serve-static')(resolve('dist/client'), {
                index: false
            })
        )
    }

    app.use('/favicon.ico', (req, res) => {
        res.end('ok')
    })

    if (!isProd) {
        app.use(function (req, res, next) {
            console.log(req.method, req.url)
            next()
        })
    }

    app.use('*', async (req, res) => {
        try {
            const url = req.originalUrl

            let template, render
            if (!isProd) {
                // always read fresh template in dev
                template = fs.readFileSync(resolve('index.html'), 'utf-8')
                template = await vite.transformIndexHtml(url, template)
                render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
            } else {
                template = indexProd
                render = require('./dist/server/entry-server.js').render
            }

            const context = {
                isSSR: true,
                query: req.query,
                url: req.originalUrl,
                req
            }
            const { appHtml, propsData } = await render(url, context)

            // if (context.url) {
            //     // Somewhere a `<Redirect>` was rendered
            //     return res.redirect(301, context.url)
            // }

            const html = template
                .replace('<!--init-props-->', `<script id="ssr-props" type="text/json">${JSON.stringify(propsData)}</script>`)
                .replace(`<!--app-html-->`, appHtml)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            !isProd && vite.ssrFixStacktrace(e)
            console.log(e.stack)
            res.status(500).end(e.stack)
        }
    })

    return { app, vite }
}

if (!isTest) {
    createServer().then(({ app }) =>
        app.listen(3000, () => {
            console.log('http://localhost:3000')
        })
    )
}

// for test use
exports.createServer = createServer
