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