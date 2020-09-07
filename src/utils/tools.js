import Taro from '@tarojs/taro';

export const toolbox = { name: '123' };
export const toolbox2 = { name: '123' };




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
  const currentPage = Taro.getCurrentPages()[Taro.getCurrentPages().length - 1];
  const params = {};
  console.log('currentPage', currentPage);
  params.route = `/${currentPage.$vm.__route__}`;
  params.query = currentPage.$vm.$mp && currentPage.$vm.$mp.query;

  // uni.setStorageSync('backToPage', JSON.stringify(params));
  // await mStore.commit('logout');
  // mRouter.redirectTo({ route: '/pages/public/login' });
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
