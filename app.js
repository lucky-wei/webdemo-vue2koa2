const koa = require('koa')
    , route = require('koa-router')()
    , json = require('koa-json')
    , logger = require('koa-logger')
    , jwt = require('koa-jwt')
    , api = require('./server/routes/api')
    , auth = require('./server/routes/auth');//引入各种依赖

const cors = require('koa-cors')

const app = new koa()

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(cors())
// app.use(function* (next) {
//     let start = new Date
//     yield next
//     let ms = new Date - start
//     console.log('%s %s - %s', this.method, this.url, ms)
// })
// app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', '*')
//     ctx.set('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With')
//     ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//     if (ctx.method == 'OPTIONS') {
//         ctx.body = 200;
//     } else {
//         await next()
//     }
// })


app.on('error', function (err, ctx) {
    console.log('server error', err)
})
route.use('/auth', auth.routes())
// jwt({ secret: 'vue-koa-demo' }),
route.use('/api', api.routes())

app.use(route.routes())

app.listen(8899, () => {
    console.log('koa is listen in 8899')
})

module.exports = app