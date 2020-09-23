/**
 * 加油记录
 */
var moment = require('moment');
var db = require('../dbconnect/dbconnect');
var formidable = require('formidable');
var utils = require('../utils/utils');

module.exports = {
    //统计每个加油站的加油次数和钱数，同时返回加油站经纬度
    getRefuelLogInStation(req, res){
        var sql = `SELECT 
    a.refuel_station_id,
    b.station_name,
    b.station_address,
    SUM(a.pay_money) as total_money,
    COUNT(*) as count,
    b.lng,
    b.lat
FROM
    refuel_log a,
    gas_station b
WHERE
    a.refuel_station_id = b.station_id
    and a.userId= ? 
GROUP BY a.refuel_station_id`;
        var userId = req.session.userId;
        var values = [userId];
        db.connnectPool(sql, values, (err, data, errMsg) => {
            if (err) {
                res.json({
                    code: 500,
                    errMsg: errMsg
                })
            } else {
                res.json({
                    code: 200,
                    data: data,
                })
            }
        })
    },
    //查询所有加油记录信息
    getRefuelLogAll(req, res){
        var sql = `select SQL_CALC_FOUND_ROWS 
        a.refuel_id,
        a.refuel_station_id,
        a.refuel_time,
        a.pay_money,
        a.pay_type,
        a.oil_type,
        a.liters,
        b.station_name,
        b.station_address,
        a.mileage,
        a.photo,
        round(a.liters/(a.mileage-a.pre_mileage)*100,2) as avg_kilo
        from refuel_log a,gas_station b 
        where a.refuel_station_id = b.station_id and a.userId = ? 
        order by a.refuel_time desc limit ?,?;
        select FOUND_ROWS() as count;
        select sum(a.pay_money) as sum from refuel_log a where a.userId = ?;`;
        var page = parseInt(req.query.page);
        var pageSize = parseInt(req.query.pageSize);
        var userId = req.session.userId;
        var values = [userId, --page * pageSize, pageSize, userId];
        db.connnectPool(sql, values, (err, data, errMsg) => {
            if (err) {
                res.json({
                    code: 500,
                    errMsg: errMsg
                })
            } else {
                data[0] = utils.formate(data[0]);
                res.json({
                    code: 200,
                    count: data[1][0].count,
                    log: data[0],
                    sum: data[2][0].sum
                })
            }
        })
    },
    //根据加油站ID，更新加油站信息
    updateRefuelLogById(req, res){
        var sql = 'update refuel_log set refuel_station_id=?,oil_type=?,liters=?,pay_type=?,pay_money=?,refuel_time=?,mileage=?,photo=? where refuel_id=?';
        var refuel_id = req.params.id;
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var refuel_station_id = fields.refuel_station_id;
            var oil_type = fields.oil_type;
            var liters = fields.liters;
            var pay_type = fields.pay_type;
            var pay_money = fields.pay_money;
            var mileage = fields.mileage;
            var photo = fields.photo;
            var refuel_time = new Date(fields.refuel_time);
            var values = [refuel_station_id, oil_type, liters, pay_type, pay_money, refuel_time,mileage,photo,refuel_id];
            db.connnectPool(sql, values, (err, data, errMsg) => {
                if (err) {
                    res.json({
                        code: 500,
                        errMsg: errMsg
                    })
                } else {
                    res.json({
                        code: 200,
                        data: {}
                    })
                }
            })
        });
    },
    //增加一条加油记录
    newRefuelLog(req, res){
        var sql = `select max(mileage) as pre_mileage
        from refuel_log a
        where a.userId = ?;`;
        var userId = req.session.userId;
        var values = [userId];
        db.connnectPool(sql, values, (err, data, errMsg) => {
            if (err) {
                res.json({
                    code: 500,
                    errMsg: errMsg
                })
            } else {
                var pre_mileage =  data[0]["pre_mileage"] || 0;
                var sql = 'insert into refuel_log (refuel_station_id,oil_type,liters,pay_type,pay_money,refuel_time,userId,mileage,photo,pre_mileage) values (?,?,?,?,?,?,?,?,?,?);SELECT LAST_INSERT_ID() as refuel_id;';
                var form = new formidable.IncomingForm();
                form.parse(req, function (err, fields, files) {
                    var refuel_station_id = fields.refuel_station_id;
                    var oil_type = fields.oil_type;
                    var liters = fields.liters;
                    var pay_type = fields.pay_type;
                    var pay_money = fields.pay_money;
                    var mileage = fields.mileage;
                    var photo = fields.photo;
                    var refuel_time = new Date(fields.refuel_time);
                    var userId = req.session.userId;
                    var values = [refuel_station_id, oil_type, liters, pay_type, pay_money, refuel_time, userId,mileage,photo,pre_mileage];
                    db.connnectPool(sql, values, (err, data, errMsg) => {
                        if (err) {
                            res.json({
                                code: 500,
                                errMsg: errMsg
                            })
                        } else {
                            res.json({
                                code: 200,
                                data: {refuel_id:data[1][0].refuel_id}
                            })
                        }
                    })
                });
            }
        })
    },
    //根据加油记录ID，删除加油记录信息
    delRefuelLogById(req, res){
        var sql = 'delete from refuel_log where refuel_id = ?';
        var values = [req.params.id];
        db.connnectPool(sql, values, (err, data, errMsg) => {
            if (err) {
                res.json({
                    code: 500,
                    errMsg: errMsg
                })
            } else {
                res.json({
                    code: 200,
                    data: {}
                })
            }
        })
    }
}