/**
 * 业务路由器
 */
var express = require('express');
var router = express.Router();
var api = require('../api/api');
var station = require('../controller/station');
var refuel = require('../controller/refuel');
var user = require('../controller/user')

/**
 * 加油站
*/
router.get(api.getStationAll, station.getStationAll);
router.get(api.getGasPrice, station.getGasPrice);
router.post(api.updateStationById, station.updateStationById);
router.post(api.newStation, station.newStation);
router.delete(api.delStation, station.delStationById);

/**
 * 加油记录
 */
router.get(api.getRefuelLogAll, refuel.getRefuelLogAll);
router.get(api.getRefuelLogInStation, refuel.getRefuelLogInStation);
router.post(api.updateRefuelLogById, refuel.updateRefuelLogById);
router.post(api.newRefuelLog, refuel.newRefuelLog);
router.delete(api.delRefuelLog, refuel.delRefuelLogById);

/**
 * 用户信息
 */
router.post(api.login, user.login);
router.get(api.getLoginUserInfo, user.getLoginUserInfo);
router.get(api.checkUserExist, user.checkUserExist);
router.get(api.getTag, user.getTag);
router.post(api.register,user.register);

module.exports = router;

