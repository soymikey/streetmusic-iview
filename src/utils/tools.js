import Taro from '@tarojs/taro';
import { get, set, clear } from '@/utils/localStorage';
import { getMyOpenid } from '@/api/user';
import { linkSocket } from '@/utils/heartbeatjuejin';

//去某个页面
export const goToPage = (url, checkAuth = false) => {
  if (checkAuth) {
  }
  if (['/pages/index/index',
    '/pages/event/event',
    '/pages/order/order',
    '/pages/user/user',].includes(url)) {
    Taro.switchTab({ url });
  } else {
    Taro.navigateTo({ url });
  }
};
export const getSession = () => {
  Taro.login({
    success: (res) => {
      if (res.code) {
        return getMyOpenid({ jsCode: res.code }).then(res1 => {
          set('openId', res1.data.openid)

        })
      }
    },
    fail: (err) => {
      Taro.showToast({ title: '获取openId失败,联系管理员~', icon: 'none' })
      return
    }
  })
}
//去登录页面
export const goToLogin = () => {
  // 存当前页面的地址
  const prePage = Taro.getCurrentPages().pop()
  let query = '?'
  for (const key in prePage.$component.$router.params) {
    const value = prePage.$component.$router.params[key]
    query += `${key}=${value}&`
  }
  query = query.substr(0, query.length - 1)
  const prePageUrl = `${prePage.$component.$router.path}${query}`
  if (prePageUrl.includes('pages/user/user')) {
    return
  }
  clear()
  set('backToPage', prePageUrl);
  Taro.switchTab({ url: '/pages/user/user' })
}
//显示提示2秒 后去某个页面
export const showToastAndGoto = ({ title, icon = 'none', duration = 2000, url = '/pages/user/user' }) => {
  console.log('showToastAndGoto', url);

  Taro.showToast({
    title, icon, success: () => {
      setTimeout(function () {
        goToPage(url)
      }, duration);
    }
  })
}

/**
 * 检测当前的小程序
 * 是否是最新版本，是否需要下载、更新
 */
export const checkUpdateVersion = function () {
  //判断微信版本是否 兼容小程序更新机制API的使用
  if (Taro.canIUse('getUpdateManager')) {
    //创建 UpdateManager 实例
    const updateManager = Taro.getUpdateManager();
    //检测版本更新
    updateManager.onCheckForUpdate(function (res) {
      console.log('onCheckForUpdate', res);
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        //监听小程序有版本更新事件
        updateManager.onUpdateReady(function () {
          //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
          updateManager.applyUpdate();
        })
        updateManager.onUpdateFailed(function () {
          // 新版本下载失败
          Taro.showModal({
            title: '已经有新版本喽~',
            content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~',
          })
        })
      }
    })
  } else {
    //TODO 此时微信版本太低（一般而言版本都是支持的）
    Taro.showModal({
      title: '溫馨提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}
