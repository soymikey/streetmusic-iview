import Taro, { showToast } from '@tarojs/taro';
import Wechat from '@/utils/wechat.js';
import { baseURL } from '@/config';
import { get, set, clear, remove } from '@/utils/localStorage';
import { goToPage } from '../../utils/tools';
// 小程序启动，本地如果没有token, 通过wx.login()获取jscode,并且请求后端 获取openid保存到本地
//用户点击登录的时候 用本地的openid 获取用户的信息(后端-如果没有就注册 返回用户信息,并且保存用户信息里面的token到本地)
// 登录接口收到code后，保存到本地. 调用微信提供的接口进行code的验证
function setCookie(cookie) {
  if (cookie) {
    const formatedCookie =
      cookie.split('path=/;')[0] + cookie.split('httponly,')[1].split(' path=/;')[0];
    Taro.setStorageSync('sessionid', formatedCookie);
  }
}

export const login = data => {
  return Wechat.request('/api/userinfo/login', data);
}; //登录接口
export const getMyOpenid = data => {
  return Wechat.request('/api/openid', data);
}
export const getUserInfo = data => {
  return Wechat.request('/api/userinfo/detail', data);
}; //获取用户信息
export const getUserFullInfo = data => {
  return Wechat.request('/api/userinfo/fullDetail', data);
}; //歌手获取自己的所有信息
export const getUserQrCode = data => {
  return Wechat.request('/api/userinfo/qrCode', data);
}; //获取用户二维码
export const getUserState = data => {
  return Wechat.request('/api/userinfo/state/get', data);
}; //更新用户状态
export const updateUserState = data => {
  return Wechat.request('/api/userinfo/state/update', data);
}; //更新用户状态

export const createUser = data => {
  return Wechat.request('/api/userinfo/create', data);
}; // 创建用户
export const registerArtist = data => {
  return Wechat.request('/api/userinfo/registerArtist', data);
}; //注册艺人
export const updateUserInfo = data => {
  return Wechat.request('/api/userinfo/update', data);
}; // 更新用户

export const getFullUserInfo = () => {
  return Wechat.request('/api/userinfo/fullDetail');
}; //获取用户所有信息


export const createArtist = data => {
  return Wechat.request('/api/userinfo/createArtist', data);
}; // 更新用户信息和role变成艺人

export const getProfitById = () => { return Wechat.request('/api/userinfo/profit') }//获取某个歌手的总金额
export const withdrawByUserId = (data) => { return Wechat.request('/api/userinfo/withdraw/create', data) }
export const getWithdrawList = (data) => { return Wechat.request('/api/userinfo/withdraw/history', data) }
export const createPay = (data) => { return Wechat.request('/api/userinfo/pay/create', data) }
export const createQrCodeStand = (data) => { return Wechat.request('/api/userinfo/createQRCodeStand', data) }
export const getReferenceHistoryListById = (data) => { return Wechat.request('/api/userinfo/reference/history', data) }//获取某个用户/歌手打赏历史

export const uploadUserImage = files => {
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: baseURL + '/api/userinfo/avatar/upload',
      filePath: files,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data',
      },
      success: function (res) {
        resolve(res);
      },
      fail: function (e) {
        reject(e);
      },
    });
  });
};

export const downloadAvatarUrl = url => {
  return new Promise((resolve, reject) => {
    Taro.downloadFile({
      url: url,
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath);
        }
      },
      fail: function (e) {
        reject(e);
      },
    });
  });
};
