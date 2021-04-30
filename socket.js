var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
const {
  callbackify
} = require('util');
var http = require('http').Server(app);
let fileName = "/log/access.log"
var io = require('socket.io')(http, {
  path: '/socket.io',
  pingInterval: 1000,
  pingTimeout: 5000,
  cookie: true
});

function sendLog(socket) {
  fs.readFile(path.join(__dirname, fileName), 'utf-8', (err, data) => {
    socket.emit("sendLog", decodeURIComponent(data))
  })
}

io.on("connection", function (socket) {
  console.log("connection")
  // 接收到客户端请求，查询日志
  socket.on("getLog", function (query) {
    // 先全量发送一边
    sendLog(socket);
    // 如果日志有变化,间隔10S
    fs.watchFile(path.join(__dirname, fileName),[false,true,1000], (cur, prv) => {
      // 修改时间不一致
      if (cur.mtime != prv.mtime) {
        // 发送新得日志全量信息
        sendLog(socket);
      }
    })
  })
  socket.on("disconnect", (reason) => {
    console.log("disconnect")
  });
});


http.listen(3003, "127.0.0.1", (err) => {
  if (err) {
    console.log(err);
    return
  }
  console.log('websocket Listening at http://127.0.0.1:3003')
})

