import Taro from '@tarojs/taro';
import config from '@/utils/config.js';

export const simpleRequest = (url, params) => {
  this.request(url, params, '');
};
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
export const request = (url, params, method = 'post', message = '加载中') => {
  console.log(params);

  if (message != '') {
    Taro.showLoading({
      title: message,
    });
  }

  return new Promise(function (resolve, reject) {
    console.log('url', url);

    Taro.request({
      url: url,
      data: params,
      header: {
        'Content-Type': 'application/json'
        // 'content-type': 'application/x-www-form-urlencoded',
      },
      method: method,
      success: res => {
        if (message != '') {
          Taro.hideLoading();
        }
        if (res.statusCode == 200) {
          //   success(res.data);

          resolve(res.data);
        } else {
          //   fail();
          reject('错误1');
        }
      },
      fail: function (res) {
        if (message != '') {
          Taro.hideLoading();
        }
        reject('错误2');
      },
      complete: res => { },
    });
  });
};
