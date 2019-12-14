/**
 * 路由模块
 * 
 */

const express = require('express')
const router = express.Router();
const service = require('./service.js')

// 路由的处理

// 渲染主页
router.get('/', service.showIndex);

//添加图书 跳转到添加图书的页面
router.get('/toAddBook',service.toAddBook)

// 添加图书 提交表单(Post)
router.post('/addBook',service.addBook)

// 删除对应的书籍
router.get("/deleteBook",service.deleteBook)

// 跳转到修改图书的界面
router.get('/toEditBook',service.toEditBook)

// 监听这个修改表单
router.post('/editBook',service.editBook)

module.exports = router;