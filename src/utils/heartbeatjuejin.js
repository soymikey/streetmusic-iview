import Taro, { Component } from '@tarojs/taro';
import { baseWsURL } from '@/config'
let lockReconnect = false;
let limit = 0;
let timer = null
let id = ''
const heartCheck = {
  timeout: 10000,
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function () {
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

  Taro.connectSocket({
    // url:
    //   app.globalData.wsUrl + 'websocket?' + this.data.taskId + '&' + this.data.userId,

    // url: `ws://192.168.1.117:3101?id=${id}`,
    url: `${baseWsURL}?id=${id}`,
    success() {
      console.log('ws连接成功');

      initEventHandle(id);
    },
  });
}

function initEventHandle(id) {
  Taro.onSocketMessage(res => {
    console.log('我是heartbeatjuejin,收到服务器的消息', res);
    const data = JSON.parse(res.data)
    if (data.type == 'pong') {
      console.log('receive pong-initEventHandle');
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
    reconnect(id);
  });
}

function reconnect(id) {
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