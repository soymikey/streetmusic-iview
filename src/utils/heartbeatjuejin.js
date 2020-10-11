import Taro, { Component } from '@tarojs/taro';
import { baseWsURL, baseURL } from '@/config'
const { $Message } = require('../iView/base/index');
import { get } from '@/utils/localStorage';
const voice = require('../asset/voice/newOrder.mp3')
let lockReconnect = false;
let limit = 0;
let timer = null
let id = ''
const innerAudioContext = Taro.createInnerAudioContext()
innerAudioContext.src = baseURL + '/static/voice/newOrder.mp3'
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

const linkSocket = () => {

  Taro.connectSocket({
    // url:
    //   app.globalData.wsUrl + 'websocket?' + this.data.taskId + '&' + this.data.userId,

    // url: `ws://localhost:3101?id=${id}`,
    url: `${baseWsURL}?id=${get('openId')}`,
    success() {
      console.log('ws连接成功');
      initEventHandle();
    },
  });
}

function initEventHandle() {
  // const currentPage = Taro.getCurrentPages()[Taro.getCurrentPages().length - 1]
  // const currentPath = currentPage.$component.$router.path
  // if (currentPath === "/pages/singer/singer") {
  //   const currentParams = currentPage.$component.$router.params
  //   Taro.showToast({ title: currentParams.id + '@@@' + get('openId'), icon: 'none' })
  //   Taro.sendSocketMessage({
  //     data: JSON.stringify({
  //       type: 'join',
  //       roomId: currentParams.id + '@@@' + get('openId'),
  //     }),
  //   });
  // }

  Taro.onSocketMessage(res => {
    // console.log('我是heartbeatjuejin,收到服务器的消息', res);
    const data = JSON.parse(res.data)
    console.log('data=======', data);

    const currentPage = Taro.getCurrentPages()[Taro.getCurrentPages().length - 1]
    const currentPath = currentPage.$component.$router.path
    const currentParams = currentPage.$component.$router.params
    if (data.type == 'pong') {
      console.log('receive pong-initEventHandle');
      heartCheck.reset().start();
      return
    }
    else if (data.type === 'join') {
      $Message({
        content: data.data
      });
    }
    else if (data.type === 'unJoin') {
      $Message({
        content: data.data
      });
    }

    else if (data.type === 'goFetchOrderList') {
      if (currentPath === "/pages/order/myCurrentOrder") {
        currentPage.onShow()//拉取最新的订单
      }
      else if (currentPath === "/pages/singer/singer") {
        currentPage.onReady()//拉取最新的订单
      }

      $Message({
        content: `${data.data.userName}点了:${data.data.songName}`,
      });
      const isArtist = data.data.artistId === get('openId')
      if (isArtist) {
        innerAudioContext.play()
      }

    }
    else if (data.type === 'updateOrderState') {
      if (currentPath === "/pages/order/myCurrentOrder") {
        currentPage.onShow()//拉取最新的订单
      }
      else if (currentPath === "/pages/singer/singer") {
        currentPage.onReady()//拉取最新的订单
      }
      let content
      if (data.state === '1') {
        content = `开始歌曲:${data.songName}`
      } else if (data.state === '2') {
        content = `完成歌曲:${data.songName}`
      }
      $Message({
        content: content,
      });
    }
    else if (data.type === 'createTipsOKBack') {
      $Message({
        content: `${data.data.userName}打赏了${data.data.tips}元~`,
       
      });
    }
    else if (data.type === 'goFetchUserState') {
      if (currentPath === "/pages/singer/singer") {
        currentPage.onShow()
        let string = data.artist
        if (data.state === '0') {
          string += '下线了~'
        } else if (data.state === '1') {
          string += '上线了~'
        } else if (data.state === '2') {
          string += '去休息了~'
        }
        $Message({
          content: `${string}`,
         
        });
      }
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
    // console.log('res', res);
    // if (res.reason === '小程序关闭') {
    //   return
    // }
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

export { linkSocket, heartCheck }