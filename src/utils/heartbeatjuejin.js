import Taro, { Component } from '@tarojs/taro';

let lockReconnect = false;
let limit = 0;
let timer=null
const heartCheck = {
  timeout: 10000,
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function() {
      console.log('reset',this.serverTimeoutObj);
      
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function() {
    this.timeoutObj = setTimeout(() => {
     
      Taro.sendSocketMessage({
        data: JSON.stringify({type:'ping'})
     });
      this.serverTimeoutObj = setTimeout(() => {
        Taro.closeSocket();
      }, this.timeout);
    }, this.timeout);
  },
};

const linkSocket=()=> {
  Taro.connectSocket({
    // url:
    //   app.globalData.wsUrl + 'websocket?' + this.data.taskId + '&' + this.data.userId,
    url: 'ws://localhost:3001?id=335829832',
    success() {
      console.log('连接成功');
      initEventHandle();
    },
  });
}

function initEventHandle() {
  Taro.onSocketMessage(res => {
      console.log('我是heartbeatjuejin,收到服务器的pong',res);
      
    //收到消息
    if (res.data == 'pong') {
      heartCheck.reset().start();
    } else {
      // 处理数据
    }
  });
  Taro.onSocketOpen(() => {
    console.log('WebSocket连接打开');
    heartCheck.reset().start();
  });
  Taro.onSocketError(res => {
    console.log('WebSocket连接打开失败');
    reconnect();
  });
  Taro.onSocketClose(res => {
    console.log('WebSocket 已关闭！');
    reconnect();
  });
}

function reconnect() {
  if (lockReconnect) return;
  lockReconnect = true;
  clearTimeout(timer);
  if (limit < 12) {
    timer = setTimeout(() => {
      linkSocket();
      lockReconnect = false;
    }, 5000);

    limit += 1;
  }
}

export  {linkSocket,heartCheck}