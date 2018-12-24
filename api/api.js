/**
 * 前后台接口，支持RESTful
 */
const STATION = '/station';
const REFUEL = '/refuel';
const USER = '/user'

module.exports = {
    /**
     * 加油站
     */
    getStationAll: STATION + '/query/all',
    updateStationById: STATION + '/updateInfo/:id',
    newStation: STATION + '/create',
    delStation: STATION + '/delete/:id',

    /**
     * 加油记录
     */
    getRefuelLogAll: REFUEL + '/query/all',
    updateRefuelLogById: REFUEL + '/updateInfo/:id',
    newRefuelLog: REFUEL + '/create',
    delRefuelLog: REFUEL + '/delete/:id',
    getRefuelLogInStation: REFUEL + '/query/instation',

    /**
     * 用户信息
     */
    login: USER + '/login/:userName/:password',
    getLoginUserInfo: USER + '/getLoginUserInfo',
    getTag: USER + '/getTag',
    register:USER + '/register',
    checkUserExist:USER + '/checkUserExist/:userName',
}
