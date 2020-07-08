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

//显示提示2秒 后去某个页面
export const showToastAndGoto=({title,icon='none',duration=2000,url='/pages/user/user'})=>{
  console.log('url``````````',url);
  
  Taro.showToast({ title, icon,success:()=>{
    setTimeout(function() {
        goToPage(url)
      }, duration);
} })
}
