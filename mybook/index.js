/*
    图书管理系统

*/ 
const express = require('express')
const template = require('art-template')
const router = require('./router.js')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

// 设置模板引擎
app.set('views',path.join(__dirname, 'views'))  //模板路径是views
app.set("view engine", 'art')  // 模板引擎种类是art
app.engine('art', require('express-art-template'));  // 使express兼容art-templatte模板引擎
// 处理请求参数
// 挂载参数处理中间件(post)
app.use(bodyParser.urlencoded({ extended: false }))
// 处理JSON格式的数据(json)
app.use(bodyParser.json())

// 挂载内置的中间件 就是将静态的文件托管
app.use('/www',express.static('public'));


// 启动服务器
// 配置路由, 单独写个router.js文件 最后的话 引入就行
app.use(router)
// 监听端口
app.listen(3000, () => {
    console.log('running....')
})