/**
 * Created by Administrator on 2018/8/28.
 */
var moment = require('moment');
var db = require('../dbconnect/dbconnect');
var formidable = require('formidable');
var utils = require('../utils/utils');

module.exports = {
    //校验用户是否已经存在
    checkUserExist(req, res){
        var sql = 'select count(*) as count from users where userName =?';
        var userName = req.params.userName;
        var values = [userName];
        db.connnectPool(sql, values, (err, data, errMsg) => {
            if (err) {
                res.json({
                    code: 500,
                    errMsg: errMsg
                })
            } else {
                res.json({
                    code: 200,
                    data: data
                })
            }
        })
    },
    //注册
    register(req, res){
        var sql = `insert into users(userName,password,create_time,update_time,license,carType) values (?,?,now(),now(),?,?);SELECT LAST_INSERT_ID() as userId;`
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var userName = fields.userName;
            var password = fields.password;
            var license = fields.license;
            var carType = fields.carType;
            var values = [userName, password, license, carType];
            db.connnectPool(sql, values, (err, data, errMsg) => {
                if (err) {
                    res.json({
                        code: 500,
                        errMsg: errMsg
                    })
                } else {
                    req.session.userId = data[1][0].userId;
                    res.json({
                        code: 200,
                        data: {}
                    })
                }
            })
        });
    },
    //登录
    login(req, res){
        var sql = 'select userId,userName from users where userName =? and password=?';
        var userName = req.params.userName;
        var password = req.params.password;
        var values = [userName, password];
        db.connnectPool(sql, values, (err, data, errMsg) => {
            if (err) {
                res.json({
                    code: 500,
                    errMsg: errMsg
                })
            } else {
                if (data.length == 1) { 
                    req.session.userId = data[0].userId;
                    res.json({
                        code: 200,
                        data: data
                    })
                } else {
                    res.json({
                        code: 401,
                        errMsg: '未授权'
                    })
                }

            }
        })
    },
    //获取登录人信息
    getLoginUserInfo(req, res){
        var sql = 'select userId,userName,create_time,update_time,license,carType from users where userId=?;select sum(a.pay_money) as payTotal from refuel_log a where a.userId = ?;select max(mileage) as mileage from refuel_log where userId=?;';
        var userId = req.session.userId || '';
        var values = [userId, userId,userId];
        db.connnectPool(sql, values, (err, data, errMsg) => {
            if (err) {
                res.json({
                    code: 500,
                    errMsg: errMsg
                })
            } else {
                if (data[0].length == 1) {
                    data = utils.formate(data);
                    res.json({
                        code: 200,
                        data: {
                            userId: data[0][0].userId,
                            userName: data[0][0].userName,
                            create_time: data[0][0].create_time,
                            update_time: data[0][0].update_time,
                            license: data[0][0].license,
                            carType: data[0][0].carType,
                            mileage: data[2][0].mileage,
                            payTotal: data[1][0].payTotal
                        }
                    })
                } else {
                    res.json({
                        code: 401,
                        errMsg: '未授权'
                    })
                }

            }
        })
    },
    //tag
    getTag(req, res){
        var sql = 'select tagName,releaseNote,releaseTime from temp_tag order by releaseTime desc limit 0,50';
        var values = [];
        db.connnectPool(sql, values, (err, data, errMsg) => {
            if (err) {
                res.json({
                    code: 500,
                    errMsg: errMsg
                })
            } else {
                data = utils.formate(data);
                res.json({
                    code: 200,
                    data: data
                })
            }
        })
    },
}