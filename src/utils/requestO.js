// wx.request 封装

import Taro from '@tarojs/taro'
import { baseURL } from '../config'
// function request(url, config, resolve, reject) {
function request({ url = '/', data = {}, method = 'POST', contentType = 'application/json' }) {
  // const baseURL = process.env.NODE_ENV === "development" ? "http://127.0.0.1:4001" : "https://blog.migaox.com"// api的base_url
  //const baseURL = 'https://elema.migaox.com'
  const fullURL = baseURL + url
  const header = {
    'content-type': contentType,
    'cookie': Taro.getStorageSync("sessionid")//读取cookie
  };
  //进行请求
  Taro.showLoading({
    title: '加载中'
  })

  return Taro.request({
    url: fullURL,
    data,
    method,
    header,
    success: (data) => {
      //如果后台返回-1（登录过期）

    },
    // fail: (err) => reject(err)
  })
}

export default request