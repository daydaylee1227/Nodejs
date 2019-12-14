# 图书管理系统(后端渲染)
1. npm i
2. test目录中 启动initsql.js 完成data.json文件转换成mysql.sql 插入语句
3. 设置好对应的数据库 或者可以参照data.jsono文件的数据库
4. 启动本地数据库后  node . 或者 node index.js
   启动本地数据库的话  可以借助Wampserver 非常容易上手操作
5. 可以去修改index.js 托管静态文件的虚拟目录,也可以去修改 db.js 数据库的配置
6. http://localhost:3000

## 配置流程

```js

npm init -y
npm i express art-template express-art-template body-parser --save  

```
1. 创建index.js router.js service.js
2. data.json 
3. views文件夹 public文件夹

### index.js基本配置

```js

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
app.use(express.static('public'));
// 启动服务器
// 配置路由, 单独写个router.js文件 最后的话 引入就行
app.use(router)
// 监听端口
app.listen(3000, () => {
    console.log('running....')
})

```
### router.js 配置

```js
const express = require('express')
const router = express.Router();
const service = require('./service.js')

router.get('/', service.showIndex);
// 路由的处理
module.exports = router;

```
### service.js 配置

```js
const path = require('path')
const fs = require('fs')
const data = require('./data.json')

let data = require('./data.json')

//  渲染主页面
exports.showIndex = (req, res) => {
    res.render('index', { list : data});
}
// 按需要导出相应的功能函数

```
## 项目基本配置
1. index.js 文件入口
2. router.js 路由模块
3. service.js 对应的就是 这个逻辑代码(业务代码)
4. data.json 模拟图书馆数据部分
5. public 静态文件托管目录
6. views 模板引擎目录


## 开发步骤

1. Math.max.apply(null,arr) 获取数组的最大值
2. 添加图书的操作时 将数据写入data后, 需要通过fs文件API写入数据,及
```js
fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data,null,4),(err) => {
        if(err) {
            res.send('Server Error')
        }
        // 文件写入成功 跳转到主页面
        res.redirect('/');
    });
```
3. res.redirect('path') 表示的就是 重新跳转新的地址
4. JSON.stringify(obj,null,4) 数字4表示的就是 返回值文本在每个级别缩进指定数目的空格!使.json文件数据好看
5. 删除书籍的话 怎么去获取这个id呢? 也就是删除需要索引id
6. 删除书籍的时候 忘记这个是get请求 所以 监听路由的话 应该是 router.get() 获取传递数据参数列表就是 req.query
7. 然后新的数据存取新的图书信息 最后把data = newdata 写入文件 这样子res.redirect() 重新定向的话 会实时更新数据
8. 修改某个书本信息 点击修改 根据URL路径 添加相应的路由监听 然后利用模板引擎 完成数据的渲染
9. 跳转到对应的editBook页面后 再监听提交表单的路由  完成数据的更新
10. 跳到editBook页面 提交表单到路径'/editBook' 路由去监听这个post提交数据的请求  然后通过 req.body 获取数据


## Web-数据库
1. 下载mysql-Navicat Premium
2. 建立数据库mybook  然后建表book
3. 插入表格数据 insert into book (name,author,category, description) values ("aa",'bb','cc','dd')
4. 创建一个文件夹initsql.js将.json文件数据拼接成insert语句
5. Node.js 操作数据库需要第三方的包 mysql
6. 建立同级目录 mydb 然后 初始话包 在下载mysql包
7. 创建index.js文件 加载数据库的驱动 index.js 代码如下:
8. 前提是Wampserver 要打开  这样子才可以连接本地数据库

```js
/**
 * 操作数据库的基本步骤
 * 
 */
// 加载数据库的驱动  驱动可以理解就是操作数据库的API
var mysql = require('mysql');
// 创建数据库的连接
var connection = mysql.createConnection({
    host: 'localhost',      // 数据库所在的服务器的IP或者域名
    user: 'root',          //  登入数据库的账号   
    password: '',         //   密码
    database: 'book'    //    数据库的名称  这个名称指的是数据库的名称 不是数据库的连接   
});
// 执行连接操作
connection.connect();
// 操作数据库
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) { 
    // 这个 SELECT 1 + 1 AS solution 验证数据库环境是不是合理的
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
connection.end();
```
9. 数据库的增删改查

```js
let sql = 'insert into book set ?'
let data = {
    name : '我的名字',
    author : 'daydaylee',
    category : '小说',
    description : '讲述的故事大概描述的内容就是科幻的故事!',
}
// 操作数据库
connection.query(sql, data, (err, res, file) => {
    if(err) throw err;
    console.log(res);
    if(res.affectedRows == 1){
        console.log("数据插入成功！");
    }
})
```
```js
let sql = 'delete from book where id=?'
let data = [2]    //这个需要传递数据 问号一一对应 然后的话 格式要求
```
```js
let sql = 'update book  set name=?,author=?,category=?,description=? where id=?'
let data = ['抗拒知识','吴军','计算机','农民军的反抗历史的时代',1];
```
```js
let sql = 'select * from book where id = ?'
let data = [4];
```

10. 发现有许多的共同点 可以封装一个通用的API
```js
/**
 * 封装操作数据库通用的API
 */
const mysql = require("mysql")
exports.base = (sql, data, callback) => {
    var connection = mysql.createConnection({
        host: 'localhost',      
        user: 'root',         
        password: '',         
        database: 'book'      
    });
    connection.connect();
    connection.query(sql, data, (err, res, file) => {
        if(err) throw err;
        callback(res);
    })
    connection.end();
}
```

## 将图书管理系统存储数据改造成数据库

1. 在mybook根路径下 导入db.js 文件 也就是数据库封装好的文件
2. 然后就在services.js 中 导入db模块 最后实时更新数据库数据
3. 唯一需要注意的内容就是 数据库放回的数据是数组,模板字符串渲染需要的就是一个对象,所以一般需要result[0] 需要索引
