/**
 * Created by Administrator on 2018/8/28.
 */
var mysql = require('mysql');
var dbCongfig = require('../config/db');
var pool = mysql.createPool(dbCongfig);

module.exports = {
    //无数据库事务的连接
    connnectPool(sql, values, callback){
        pool.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                callback(err, {}, '无法连接数据库！')
            } else {
                conn.query(sql, values, (err, data) => {
                    if (err) {
                        console.log(err);
                        callback(err, {}, '操作数据库失败')
                    }
                    callback(err, data, "");
                    conn.release();
                });
            }
        })
    }
}