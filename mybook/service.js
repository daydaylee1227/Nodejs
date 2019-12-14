/**
 * 业务模块
 */

const path = require('path')
const fs = require('fs')
let data = require('./data.json')
const db = require('./db.js')
// 返回书中最大的id
// let maxBookCode = () => {
//     let arr = [];
//     data.forEach( (item) => {
//         arr.push(item.id);
//     })
//     return Math.max.apply(null,arr);
// }

//  渲染主页面
exports.showIndex = (req, res) => {
    let sql = 'select * from book '
    db.base(sql, null, (result) => {
        res.render('index', { list : result});
    })
    
}

// 跳转到添加图书的页面
exports.toAddBook = (req, res) => {
    res.render('addBook', {});
}

// 添加图书保存数据
exports.addBook = (req, res) => {
    let info = req.body;
    let book = {};
    let sql = 'insert book set name=?,author=?,category=?,description=?'
    let data = [info.name,info.author,info.category,info.description];
    db.base(sql, data, (result) => {
        res.redirect('/');
    })
    // for(let key in info){
    //     book[key] = info[key]
    // }
    // book.id = maxBookCode() + 1;
    // data.push(book);
    // // 记得将数据写入文件
    // fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data,null,4),(err) => {
    //     if(err) {
    //         res.send('Server Error')
    //     }
    //     // 文件写入成功 跳转到主页面
    //     res.redirect('/');
    // });
}

// 删除书籍
exports.deleteBook = (req, res) => {
    let tmp = req.query.id;
    let sql ='delete from book where id = ?';
    let data = [tmp];
    db.base(sql, data, (result) => {
        
        res.redirect('/')
    })


    // const newData = [];
    // data.forEach( (item) => {
    //     if(item.id != tmp){
    //         newData.push(item);
    //     } 
    // })
    // data = newData;   // 这样子的话 每次删除的话 跳转新的页面  数据就会实时去更新
    // fs.writeFile(path.join(__dirname, 'data.json'),JSON.stringify(data, null, 4), (err) => {
    //     if(err){
    //         res.end('删除数据失败 请联系管理员')
    //         return 
    //     }
    //     res.redirect('/')
    // })
}

// 跳转到修改书本页面
exports.toEditBook = (req, res) => {
    
    let id = req.query.id;
    let sql = 'select * from book where id = ?';
    let data = [id];
    db.base(sql, data, (result) => {
        res.render('editBook',result[0]);  // 这里需要注意的就是 放回的结果是数组 所以需要索引值
    })
    // let tmpData = {};
    // data.forEach( (item) => {
    //     if(item.id == id){
    //         tmpData = item;
    //         return;
    //     }
    // })
    // res.render('editBook',tmpData);
}
exports.editBook = (req, res) => {
    let info = req.body;
    let sql = 'update book  set name=?,author=?,category=?,description=? where id=?';
    let data = [info.name,info.author,info.category,info.description,info.id];
    db.base(sql, data, (result) => {
        res.redirect('/');
    })

    // data.forEach( (item) => {
    //     if(item.id == info.id){
    //         for (let key in item){
    //             item[key] = info[key]
    //         }
    //         return ;
    //     }
    // })
    // fs.writeFile(path.join(__dirname, 'data.json'),JSON.stringify(data, null, 4), (err) => {
    //     if(err){
    //         res.end("数据修改失败!请联系管理员")
    //         return;
    //     }
    //     res.redirect('/') // 跳转到主页面
    // })
}