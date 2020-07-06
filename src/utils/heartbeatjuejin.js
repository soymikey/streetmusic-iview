import Taro, { Component } from '@tarojs/taro';

let lockReconnect = false;
let limit = 0;
let timer = null
let id = ''
const heartCheck = {
  timeout: 10000,
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function () {
    console.log('reset', this.serverTimeoutObj);

    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function () {
    this.timeoutObj = setTimeout(() => {

      Taro.sendSocketMessage({
        data: JSON.stringify({ type: 'ping' })
      });
      this.serverTimeoutObj = setTimeout(() => {
        Taro.closeSocket();
      }, this.timeout);
    }, this.timeout);
  },
};

const linkSocket = (id) => {
  id = id
  Taro.connectSocket({
    // url:
    //   app.globalData.wsUrl + 'websocket?' + this.data.taskId + '&' + this.data.userId,

    url: `ws://192.168.1.116:3001?id=${id}`,
    success() {
      console.log('连接成功');
      initEventHandle();
    },
  });
}

function initEventHandle() {
  Taro.onSocketMessage(res => {
    console.log('我是heartbeatjuejin,收到服务器的消息', res);
    const data = JSON.parse(res.data)
    if (data.type == 'pong') {
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
      linkSocket(id);
      lockReconnect = false;
    }, 5000);

    limit += 1;
  }
}

export { linkSocket, heartCheck }