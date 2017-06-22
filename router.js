var express = require('express')
var handler = require('./handler')

// 1. 通过 express.Router() 得到一个 router 实例
var router = express.Router()

// 2. 把所有的请求处理路由都挂载给 router

router
  .get('/', handler.showIndex)
  .get('/submit', handler.showSubmit)
  .post('/submit', handler.doSubmit)
  .get('/item', handler.showItem)
  .get('/login', handler.showLogin)
  .post('/login', handler.doLogin)


// 3. 把 router 暴露出去
module.exports = router

// 4. 在 app.js 中，通过 app.use(router)
