var express = require('express');
var app = express();
var router = require('./router/router');
var session = require('express-session');
var server = require('./config/server');
var paths = require('./api/pathignore');


app.use(session({
    secret: 'refuel',
    name:'refuel',
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge:1000*60*30
    }
}))
/**
 跨域中间件，拦截OPTIONS请求返回200
 */
app.use('*', function (req, res, next) {
    res.setHeader('Content-Type', 'text/json;charset=UTF-8');
    res.setHeader('Access-Control-Allow-Origin', req.headers['origin'] || req.headers['referer'] || "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

//登录授权拦截
app.use((req,res,next)=>{
    var check = true;
    paths.arr.forEach(path =>{
        if(req.path.startsWith(path)){
            check = false;
        }
    })
    if(check && !req.session.userId){
        res.send(401);
    }else{
        next();
    }
})

/**
 业务请求，集中在router中处理
 */
app.use(router);

app.listen(server.server_port, server.server_host, (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log('server Listening at http://' + server.server_host + ':' + server.server_port + '\n')
})
