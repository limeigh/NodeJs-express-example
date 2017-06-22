var fs = require('fs')
var path = require('path')
var config = require('./config')
var querystring = require('querystring')

var dataPath = config.dataPath

// handler 模块
// 就是提供处理函数

exports.showIndex = function (req, res) {
  fs.readFile(dataPath, 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    data = JSON.parse(data)
    res.render('index', {
      title: '黑客新闻',
      list: data.list
    })
  })
}

exports.showSubmit = function (req, res) {
  res.render('submit')
}

exports.showLogin = function (req, res) {
  res.render('login', {
    title: '登陆标题'
  })
}

exports.doAdd = function (req, res) {
  fs.readFile(dataPath, 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    data = JSON.parse(data)
    data.list.push(req.query)
    data = JSON.stringify(data)
    fs.writeFile(dataPath, data, function (err) {
      if (err) {
        throw err
      }
      // 处理完毕，根据这里的规则，让客户端跳转到 / 首页
      res.writeHead(302, {
        'Location': '/'
      })
      res.end()
    })
  })
}

exports.doSubmit = function (req, res) {
  // 这里通过 req.body 就可以直接获取到当前表单 POST 请求体中的数据
  // 原因是 body-parser 插件已经帮你自动解析成一个对象了
  var body = req.body
  fs.readFile(dataPath, 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    data = JSON.parse(data)
    var id = 0
    data.list.forEach(function (item) {
      if (item.id > id) {
        id = item.id
      }
    })
    body.id = id + 1
    data.list.push(body)
    data = JSON.stringify(data)
    fs.writeFile(dataPath, data, function (err) {
      if (err) {
        throw err
      }
      // 处理完毕，根据这里的规则，让客户端跳转到 / 首页
      res.writeHead(302, {
        'Location': '/'
      })
      res.end()
    })
  })
}

exports.showItem = function (req, res) {
  // 这里的 req.query 对象原来是由咱们自己解析出来的
  // 这里能使用的原因就是 Express 帮你解析出来了
  var id = parseInt(req.query.id)
    // 根据ID找到对应的数据
    // 读取模板字符串
    // 通过模板引擎将数据和模板字符串解析替换到一起，最后发送给用户
  fs.readFile(dataPath, 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    data = JSON.parse(data)
    var obj
    data.list.forEach(function (item) {
      if (item.id === id) {
        obj = item
      }
    })
    if (!obj) {
      return res.end('No such item.')
    }
    res.render('item', {
      item: obj
    })
  })
}

exports.doLogin = function (req, res) {
  console.log(req.body)
}
