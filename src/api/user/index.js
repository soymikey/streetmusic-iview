import Taro, { showToast } from '@tarojs/taro';
import Wechat from '@/utils/wechat.js';
import { baseURL } from '@/config';
import { get, set, clear, remove } from '@/utils/localStorage';
import { linkSocket, heartCheck } from '@/utils/heartbeatjuejin';
import { goToPage } from '../../utils/tools';
// 小程序启动，通过wx.login()获取code
// 开发者服务器需要提供一个登录的接口，参数就是小程序获取的code
// 登录接口收到code后，调用微信提供的接口进行code的验证
// 得到验证结果，成功后能得到一个session_key和openid
// 生成一个自定义的key, 将session_key和openid跟自定义的key关联起来
// 将自定义的key返回给小程序
// 每次请求都带上key, 后端根据key获取openid识别当前用户身份
function setCookie(cookie) {
  if (cookie) {
    const formatedCookie =
      cookie.split('path=/;')[0] + cookie.split('httponly,')[1].split(' path=/;')[0];
    Taro.setStorageSync('sessionid', formatedCookie);
  }
}

// }// 登录

export const myLogin = async () => {
  const jsCode = await Wechat.getCryptoData(); //获取jscode
  const openIdResult = await Wechat.getMyOpenid({ jsCode }); //传jscode 给后台 返回openId session 和iopenId+session的token
  if (openIdResult.errno === 0) {
    const openId = openIdResult.data.openid;
    const getUserInfoResult = await Wechat.getUserInfo(); // 从微信后台获取用户信息传用户信息参数
    if (getUserInfoResult.errMsg === 'getUserInfo:ok') {
      const info = { ...getUserInfoResult.userInfo, id: openId };
      const val = await login(info); //登录接口，返回数据库用户信息，如果没有会自动注册然后返回注册过的用户信息      
      if (val.errno === 0) {

        set('token', val.data.token);//配置本地token
        console.log('连接ws用的openid', openId);
        linkSocket(openId);//连接websocket
        showToast({ title: '登录成功', icon: 'none' })

        setTimeout(() => {
          const routerObj = get('backToPage')
          if (routerObj) {
            const router = JSON.parse(routerObj)
            let url = router.route
            let query
            if (router.query) {
              query = '?'
              console.log('router.query', router.query);

              for (const key in router.query) {

                const value = router.query[key];
                query += `${key}=${value}&`

              }
              query = query.substr(0, query.length - 1);
            }
            goToPage(url + query)
            remove('backToPage')
          }
        }, 2000);
        return Promise.resolve(val);
      } else {
        showToast({ title: '登录失败,无法获取用户信息~', icon: 'none' })
      }
    } else {
      showToast({ title: '登录失败,无法获取用户授权~', icon: 'none' })
    }
  } else {
    showToast({ title: '后端无法获取小程序Id,请联系管理员~', icon: 'none' })
  }
};

export const login = data => {
  return Wechat.request('/api/userinfo/login', data);
}; //登录接口
export const getUserInfo = data => {
  return Wechat.request('/api/userinfo/detail', data);
}; //获取用户信息
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
