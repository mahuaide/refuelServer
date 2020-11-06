/**
 * 前后台接口，支持RESTful
 */
const STATION = '/station';
const REFUEL = '/refuel';
const USER = '/user';
const LIMIT = '/limit'
const GITLAB = '/gitlab'
const URL = '/url'

module.exports = {
    /**
     * 限行
     */
    getLimitDays: LIMIT + '/query/limitDays',

    /**
     * 加油站
     */
    getStationAll: STATION + '/query/all',
    getGasPrice: STATION + '/query/gasPrice',
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
    register: USER + '/register',
    checkUserExist: USER + '/checkUserExist/:userName',

    /**
     * gitlab
     */
    getProjects: GITLAB + '/getProjects',
    getDiff: GITLAB + '/getDiff/:project/:sha',
    getCommits: GITLAB + '/getCommits/:project/:branch',
    getBranches: GITLAB + '/getBranches/:project',

    /**
     * 动态路由
     */
    getRouter: "/getRouter",

    /**
     * ajax请求重定向
     */
    redirectAjax: URL + "/backToIndex",
}