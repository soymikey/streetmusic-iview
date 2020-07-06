import Taro, { Component } from "@tarojs/taro";

class Heartbeat {
 
  
  constructor(url, taskId, userId, message) {
    this.lockReconnect = "";
    this.limit = "";
    this.url = url;
    this.taskId = taskId;
    this.userId = userId;
    this.message = message;
    this.heartCheck = {
      message1: this.message,
      timeout: 10000,
      timeoutObj: null,
      serverTimeoutObj: null,
      reset: function() {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
      },
      start: function() {
        this.timeoutObj = setTimeout(() => {
          console.log("发送ping", this.message1);
          Taro.sendSocketMessage({
            data: this.message1,
          });

          this.serverTimeoutObj = setTimeout(() => {
         
            Taro.closeSocket();
          }, this.timeout);
        }, this.timeout);
      },
    };
  }
  start() {
  console.log('开始连接 start',this.url);
  
    Taro.connectSocket({
      url: this.url, //+ 'websocket?' + this.taskId + '&' + this.userId,
      success: () => {
        console.log("连接成功", this.message);
        this.initEventHandle();
        this.heartCheck.reset().start();
      },
    });
  }

  initEventHandle() {
    Taro.onSocketMessage((res) => {
      //收到消息
      if (res.data == "pong") {
        console.log("收到 pong");

        this.heartCheck.reset().start();
      } else {
        // 处理数据
        console.log("收到服务端传回的数据", res.data);
      }
    });
    // Taro.onSocketOpen(() => {
    //   console.log("WebSocket连接打开",this.message);
    //   this.heartCheck.reset().start();
    // });
    Taro.onSocketError((res) => {
      console.log("WebSocket连接打开失败");
      this.reconnect();
    });
    Taro.onSocketClose((res) => {
      console.log("onSocketClose,WebSocket 已关闭！");
      this.reconnect();
    });
  }
  reconnect() {
    console.log("ws 重连中...");

    if (this.lockReconnect) return;
    this.lockReconnect = true;
    clearTimeout(this.timer);
    if (this.limit < 12) {
      this.timer = setTimeout(() => {
        this.start();

        this.lockReconnect = false;
      }, 5000);

      this.limit = this.limit + 1;
    }
  }
}

export default Heartbeat;
