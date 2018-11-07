/**
 * 加油站crud
 */
var moment = require('moment');
var db = require('../dbconnect/dbconnect');
var formidable = require('formidable');
var utils = require('../utils/utils');

module.exports = {
    //查询所有加油站信息
    getStationAll(req, res){
        var sql = 'select * from gas_station order by create_time desc';
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
    //根据加油站ID，更新加油站信息
    updateStationById(req, res){
        var sql = 'update gas_station set station_name=?, station_address=?,update_time=now() where station_id=?';
        var station_id = req.params.id;
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var station_name = fields.station_name;
            var station_address = fields.station_address;
            var values = [station_name, station_address, station_id];
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
    //增加一个加油站
    newStation(req, res){
        var sql = 'insert into gas_station (station_name,station_address,create_time,update_time) values (?,?,now(),now())';
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var station_name = fields.station_name;
            var station_address = fields.station_address;
            var values = [station_name, station_address];
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
    //根据加油站ID，删除加油站信息
    delStationById(req, res){
        var sql = 'delete from gas_station where station_id = ?';
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