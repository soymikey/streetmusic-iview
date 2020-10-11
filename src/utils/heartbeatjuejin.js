import Taro, { Component } from '@tarojs/taro';
import { baseWsURL, baseURL } from '@/config'
const { $Message } = require('../iView/base/index');
import { get, remove } from '@/utils/localStorage';
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

const sendWSMessage = (data) => {  
  Taro.sendSocketMessage({
    data: JSON.stringify(data)
  });
  remove('order')
  remove('tips')
}
const linkSocket = () => {
  Taro.connectSocket({
    // url:
    //   app.globalData.wsUrl + 'websocket?' + this.data.taskId + '&' + this.data.userId,

    // url: `ws://localhost:3101?id=${id}`,
    url: `${baseWsURL}?id=${get('openId')}`,
    success() {
      console.log('ws连接成功');
      initEventHandle();
      if (get('order')) {
        const data = JSON.parse(get('order'))
        sendWSMessage(data)
      } else if (get('tips')) {
        const data = JSON.parse(get('tips'))
        sendWSMessage(data)
      }
    },
  });
}

function initEventHandle() {

  Taro.onSocketMessage(res => {
    const currentPage = Taro.getCurrentPages()[Taro.getCurrentPages().length - 1]
    const currentPath = currentPage.$component.$router.path
    const currentParams = currentPage.$component.$router.params
    const data = JSON.parse(res.data)
    if (data.type == 'pong') {
      heartCheck.reset().start();
      return
    }
    else if (data.type === 'join') {
      $Message({
        content: data.data.userName+'加入了~'
      });
    }
    // else if (data.type === 'unJoin') {
    //   $Message({
    //     content: data.data
    //   });
    // }

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
      console.log('data', data);

      const isArtist = data.data.artistId === get('openId')
      if (isArtist) {
        innerAudioContext.play()
      }

    }
    else if (data.type === 'updateOrderState') {
      if (currentPath === "/pages/singer/singer") {
        currentPage.onReady()//拉取状态

      }
      let content
      if (data.data.state === '1') {
        content = `开始歌曲:${data.data.songName}`
      } else if (data.data.state === '2') {
        content = `完成歌曲:${data.data.songName}`
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
        currentPage.onReady()
        let string = data.data.artist
        if (data.data.state === '0') {
          string += '下线了~'
        } else if (data.data.state === '1') {
          string += '上线了~'
        } else if (data.data.state === '2') {
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
    reJoinRoomAfterSeverRestart()
    heartCheck.reset().start();
  });
  Taro.onSocketError(res => {
    console.log('WebSocket连接打开失败');
    $Message({
      content: `同步网络失败, 重试中~~`,
      duration: 7
    });
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

function reJoinRoomAfterSeverRestart() {
  const length_ = Taro.getCurrentPages().length
  if (length_) {
    const currentPage = Taro.getCurrentPages()[Taro.getCurrentPages().length - 1]
    const currentPath = currentPage.$component.$router.path
    const currentParams = currentPage.$component.$router.params
    if (currentPath === "/pages/singer/singer") {
      if (currentParams.id) {
        const userInfo_=get('userInfo')
        sendWSMessage({
          type: 'join',
          roomId: currentParams.id + '@@@' + get('openId'),
          userName:userInfo_.nickName,
        })
      } else {
        Taro.showToast({ title: '同步歌手失败,无效歌手Id' })
      }

    }
  }

}

export { linkSocket, heartCheck }