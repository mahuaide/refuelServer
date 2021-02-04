var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var http = require('http').Server(app);

var io = require('socket.io')(http, {
    path:'/socketIoTest',
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: true
});


io.on("connection", function (socket) {
    // console.log(1);
    //第一次握手时，取得项目ID
    console.log(socket.handshake.query.projectId);
    //通道ID
    let socketid = socket.id;
    //监听客户端发起查询项目状态请求，query中放projectId
    socket.on("getLog", function (query) {
      let lastData = "";
      //查询请求，从参数中获取项目ID
      console.log(query.projectId);
      setInterval(function () {
        //1秒轮询数据库或者文件
        let fileName = "/log/access.log"
        fs.readFile(path.join(__dirname, fileName), 'utf-8', (err, data) => {
          let dataNew = JSON.parse(data).data;
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

http.listen(3003, (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log("websocket")
})
