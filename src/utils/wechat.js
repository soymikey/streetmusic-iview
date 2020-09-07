import Taro from '@tarojs/taro';
import { baseURL } from '../config';
import { get, clear } from '@/utils/localStorage';
import { myLogin } from '@/api/user';
import { goToPage, showToastAndGoto, goToLogin } from '@/utils/tools.js';

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
      Taro.getUserInfo({ withCredentials: true, success: resolve, fail: reject })
    );
  }

  // 展示进度条的网络请求
  // url:网络请求的url
  // params:请求参数
  // message:进度条的提示信息
  // success:成功的回调函数
  // fail：失败的回调
  static async request(url, params, method = 'post', message = '加载中') {
    if (
      url !== '/api/openid' &&
      url !== '/api/userinfo/login' &&
      url !== '/api/event/hotList'
    ) {
      await this.sessionAndTokenChecker();
    }

    if (message != '') {
      Taro.showLoading({
        title: message,
      });
    }

    return new Promise(function (resolve, reject) {
      const token = get('token');
      const header = {
        'Content-Type': 'application/json',
        // 'content-type': 'application/x-www-form-urlencoded',
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
            //   success(res.data);
            if (res.data.errno === 0) {
              if (res.data.message) {
                Taro.showToast({ title: res.data.message, icon: 'none' });
              }
              resolve(res.data);
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
  static sessionAndTokenChecker() {
    return new Promise((resolve, reject) => {
      const token = get('token');
      if (token) {
        // 检查 session_key 是否过期
        Taro.checkSession({
          // session_key 有效(未过期)
          success: () => {
            // 业务逻辑处理
            resolve(true);
          },

          // session_key 过期
          fail: () => {
            // session_key过期，重新登录
            // myLogin();
            clear();
            Taro.showToast({ title: '登录过期,请重新登录~', icon: 'none' })
            setTimeout(() => {
              // goToPage('/pages/index/index')
              goToLogin()
            }, 1500);
          },
        });
      } else {
        reject('您还未登录,请登录~');
        // 无skey，作为首次登录
        Taro.showToast({
          title: '您还未登录,请登录~', icon: 'none'
        })
        setTimeout(() => {
          goToPage('/pages/index/index')
        }, 1500);

        // myLogin();
      }
    });
  }
}

export default Wechat;
