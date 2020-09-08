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

  console.log('Taro.getCurrentPages()', Taro.getCurrentPages());
  const currentPage = Taro.getCurrentPages()[Taro.getCurrentPages().length - 1];
  const params = {};
  console.log('currentPage', currentPage);
  params.route = `${currentPage.$component.$router.path}`;
  params.query = currentPage.$component.$router.params;
  // params.query = currentPage.$vm.$mp && currentPage.$vm.$mp.query;
  set('backToPage', JSON.stringify(params));
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
