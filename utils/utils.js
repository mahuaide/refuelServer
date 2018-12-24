/**
 * 工具
 */
var moment = require('moment');
var path = require('path');

module.exports = {
    formate(data){
        return data.map(row => {
            let dateC = new Date(row.create_time).getTime();
            let dataU = new Date(row.update_time).getTime();
            let dataR = new Date(row.refuel_time).getTime();
            let dataRT = new Date(row.releaseTime).getTime();
            return Object.assign({}, row, {
                create_time: dateC,
                update_time: dataU,
                refuel_time: dataR,
                releaseTime: dataRT
            });
        });
    }
}

