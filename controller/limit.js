/**
 * 限行
 */
var moment = require('moment');
var db = require('../dbconnect/dbconnect');
var formidable = require('formidable');
var utils = require('../utils/utils');

module.exports = {
    //限行
    getLimitDays(req, res){
        var sql = `select * from limitDays where sysdate() between limit_from and limit_to;`;
        var values = [];
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
}