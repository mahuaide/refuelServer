/**
 * mysql 数据库连接池，地址，端口，用户名，密码，数据库名称
 */
module.exports = {
    connectionLimit : 100,
    // host:'w.rdc.sae.sina.com.cn',
    // port:3307,
    // user:'zyzwz5oj1x',
    // password:'khkiy53jlk35hy5yz34khxkmkj43ik0zxj4wl1ml',
    // database:'app_refuel',
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'refuel',
    multipleStatements: true
}