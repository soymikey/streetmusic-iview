import Taro from '@tarojs/taro';
import { baseURL } from '../config';
import { get, clear } from '@/utils/localStorage';
import { goToLogin } from '@/utils/tools.js';

class Wechat {
  /**
   * 登陆
   * @return {Promise}
   */
  static login() {
    return new Promise((resolve, reject) =>
      Taro.login({ success: resolve, fail: reject })
    );
  }

  /**
   * 获取用户信息
   * @return {Promise}
   */
  static getUserInfo() {
    return new Promise((resolve, reject) =>
      Taro.getUserInfo({
        withCredentials: true, success: resolve, fail: err => {
          Taro.showModal({
            title: '提示',
            content: '请在设置允许用户信息',
            success: res => {
              if (res.confirm) {
                Taro.switchTab({
                  url: '/pages/user/user',
                });
              } else if (res.cancel) {
                Taro.showToast({title:'用户信息失败'})
              }
            }
          })
        }
      })
    );
  }

  // 展示进度条的网络请求
  // url:网络请求的url
  // params:请求参数
  // message:进度条的提示信息
  // success:成功的回调函数
  // fail：失败的回调
  static async request(url, params, method = 'post', message = '加载中') {

    if (message != '') {
      Taro.showLoading({
        title: message,
      });
    }

    return new Promise(function (resolve, reject) {
      const token = get('token');
      const header = {
        'Content-Type': 'application/json',
      };
      if (token) {
        header['Authorization'] = 'Bearer ' + token;
      }
      Taro.request({
        url: baseURL + url,
        data: Object.assign({}, params),
        header: header,
        method: method,
        success: res => {
          if (message != '') {
            Taro.hideLoading();
          }
          if (res.statusCode == 200) {
            if (res.data.errno === 0) {
              if (res.data.message) {
                Taro.showToast({ title: res.data.message, icon: 'none' });
              }
              resolve(res.data);
            } else if (res.data.errno === -2) {
              Taro.showToast({ title: res.data.message, icon: 'none' });
              setTimeout(() => {
                goToLogin()
              }, 2000);
            } else {
              Taro.showToast({ title: res.data.message, icon: 'none' });
              reject(res.data.message);
            }
          } else {
            //   fail();
            Taro.showToast({ title: '请求错误', icon: 'none' });
            reject('错误1');
          }
        },
        fail: function (res) {
          if (message != '') {
            Taro.hideLoading();
          }
          Taro.showToast({ title: '请求错误', icon: 'none' });

          reject('错误2');
        },
        complete: res => { },
      });
    });
  }

  /**
   * 获取微信数据,传递给后端
   */
  static getCryptoData() {
    let code = '';
    return this.login()
      .then(data => {
        code = data.code;
        console.log('获取的微信服务端code:', code);
        return Promise.resolve(code);
        // return this.getUserInfo();
      })

      .catch(e => {
        console.log(e);
        return Promise.reject('获取的微信服务端code失败');
      });
  }

  /**
   * 从后端获取openid
   * @param {object} params
   */
  static getMyOpenid(jsCode) {
    return this.request('/api/openid', jsCode);
  }

}

export default Wechat;
