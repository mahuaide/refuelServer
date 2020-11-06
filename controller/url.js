/**
 * ajax请求重定向
 */

module.exports = {
    redirectAjax(req, res){
        res.redirect(302,"http://localhost:8083/#/refuel")
    }
}