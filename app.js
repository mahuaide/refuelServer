var express = require('express');
var app = express();
var router = require('./router/router');
var session = require('express-session');
var server = require('./config/server');
var paths = require('./api/pathignore');
var path = require('path');
var formidable = require('formidable') //post请求接收参数或者上传文件时候可能会用到
var fs = require('fs');
var log = require('./log/log.js')
var http = require('http').Server(app);

var io = require('socket.io')(http, {
    path:'/socketIoTest',
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: true
});

app.use('/oss/photo', express.static(path.join(__dirname, '/oss/photo')));
app.use(session({
    secret: 'refuel',
    name: 'refuel',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
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
app.use((req, res, next) => {
    var check = true;
    paths.arr.forEach(path => {
        if (req.path.startsWith(path)) {
            check = false;
        }
    })
    if (check && !req.session.userId) {
        res.send(401);
        //next();
    } else {
        next();
    }
})

io.on("connection", function (socket) {
    // console.log(1);
    //第一次握手时，取得握手參數
    console.log(socket.handshake.query.who);
    //通道ID
    let socketid = socket.id;
    socket.on("getLog", function (query) {
      let lastData = "";
      setInterval(function () {
        //1秒轮询数据库或者文件
        let fileName = "/log/access.log"
        fs.readFile(path.join(__dirname, fileName), 'utf-8', (err, data) => {
          let dataNew = data;
          if (lastData !== dataNew) {
            lastData = dataNew;
            //广播方式
            socket.emit("sendLog",lastData)
            //点对点方式
            // if (io.sockets.connected[socketid]) {
            //   io.sockets.connected[socketid].emit("sendLog", lastData))
            // }else{
            //   socket.disconnect(true)
            // }
          }
        })
      }, 1000)
    })
  });

app.all('/oss/photo', (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./oss/photo";
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }
        res.send(files.file.path.slice(10))
    });
});
/**
 业务请求，集中在router中处理
 */

app.use(log)

app.use(router);

app.listen(server.server_port, server.server_host, (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log('server Listening at http://' + server.server_host + ':' + server.server_port + '\n')
})

http.listen(server.server_port,(err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log('websocket Listening at http://' + server.server_host + ':' + server.server_port + '\n')
})