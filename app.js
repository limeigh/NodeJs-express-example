var express = require('express')
var path = require('path')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

// 1. 处理网站的公共资源
//    希望处理成能像 Apache 一样通过路径的形式进行访问
//    第一个参数是可选的，如果给了第一个，则请求路径必须是以该路径开头才行，否则不处理
//    第二个参数传递一个方法：express.static('想要暴露资源的所属的目录路径')
app.use('/static/', express.static(path.join(__dirname, 'static')))

// 这种形式，如果省略了第一个参数，则表示只要请求进来就会进入并处理
// 例如当前请求是：/img/xm1.jpg
// 则这个规则会把 public 目录的路径和当前请求路径拼接起来去读取该资源
// 如果有，则直接响应返回，如果没有，则直接 can not get xxx
app.use('/public/', express.static(path.join(__dirname, 'public')))
  // 建议，暴露公共资源的时候，都加上第一个参数（以哪个标识开头）
  // 第二个参数 express.static() 中建议都使用绝对路径

// 2. 在 Express 中配置使用 ejs 模板引擎
//    npm install --save ejs
//    只要经过下面的配置，则在每一个请求处理函数中的 res 对象都会拥有一个 render 方法
//    使用 ejs 模板引擎进行渲染
//    也就是说，如果需要渲染一个 index.html 页面，直接 res.render('模板文件名', {要注入的解析替换的对象})
//    如果在 Express 中使用了 ejs 模板引擎，则模板文件名必须是 .ejs 后缀（可以修改）
app.set('views', path.join(__dirname, 'views')) // 这句配置可以省略，默认会去 views 目录查找
// app.set('view engine', 'ejs')
app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

// 配置 body-parser 插件
// 该插件会自动将表单 POST 请求体解析出来
// 然后作为一个对象挂载给 req.body 属性
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 挂载路由
app.use(router)

app.listen(3000, function () {
  console.log('running...')
})
