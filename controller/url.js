/**
 * 请求重定向
 */

module.exports = {
    redirectAjax(req, res){
        res.redirect(302,"https://www.baidu.com?userName=mahd")
    }
}