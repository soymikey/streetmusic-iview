import Taro from '@tarojs/taro';
import { get, set, clear } from '@/utils/localStorage';
import { logout } from '@/actions/user';

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

//去登录页面
export const goToLogin = () => {
  // 存当前页面的地址
  const prePage = Taro.getCurrentPages().pop()
  let query = ''
  for (const key in prePage.$component.$router.params) {
    const value = prePage.$component.$router.params[key]
    query += `${key}=${value}&`
  }
  query = query.substr(0, query.length - 1)
  const prePageUrl = `${prePage.$component.$router.path}?${query}`
  set('backToPage', prePageUrl);
  logout()
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
