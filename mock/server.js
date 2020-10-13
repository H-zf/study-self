const jsonServer = require('json-server')
const db = require('./db')
const routes = require('./routes')
const port = '5021'
const server = jsonServer.create()
server.use(function(req, res,next){
    if(req.method === 'GET'){
        req.url = req.url.replace(/\?.*/,'')
    }

    next()
})

const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()

const delay = require('express-delay')
server.use(delay(200, 350))
server.use(jsonServer.bodyParser)
server.use(middlewares)
server.use(jsonServer.rewriter(routes))

//设置一个响应头信息从server到前端
server.use((req, res, next) => {
    res.header('X-Hello','World')
    next()
})

server.use(function(req, res, next){
    if(req.method === 'POST'){
        req.method = 'GET'
        let body = req.body
        for (const key in body.hasOwnProperty){
            const value = body[key]
            if(typeof value === 'number'){
                body[key] = value.toString()
            }
        }
    }
})

router.render = (req, res) => {
    res.status(200)
    let newRes = {
        data: res.locals.data,
        code: 0,
        msg: '',
        pageDto: {
            count: 400,
            curPageCount: 3,
            pageNum: 1,
            pagesize: 20,
            totalPageNum: 20
        }
    }
    if ('pageDto' in res.locals.data) {
        let data = res.locals.data
        Object.assign(newRes, {
            data: data,
            pageDto: data.pageDto
        })
    }

    res.json(newRes)
}

server.use('./api', router)
server.use(router)
server.listen(port, function(){
    console.log(`JSON Server is running in http://localhost:${port}`)
})











