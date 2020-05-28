import Taro from '@tarojs/taro'
import config from '@/utils/config.js'

console.log('config', config);

export const simpleRequest = (url, params, success, fail) => {
    this.request(url, params, "", success, fail)
}
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
export const request = (url, params, message, method = 'post', success, fail) => {
    console.log(params)
    Taro.showNavigationBarLoading()
    if (message != "") {
        Taro.showLoading({
            title: message,
        })
    }
    Taro.request({
        url: url,
        data: params,
        header: {
            //'Content-Type': 'application/json'
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: method,
        success: function (res) {
            //console.log(res.data)
            Taro.hideNavigationBarLoading()
            if (message != "") {
                Taro.hideLoading()
            }
            if (res.statusCode == 200) {
                success(res.data)
            } else {
                fail()
            }

        },
        fail: function (res) {
            Taro.hideNavigationBarLoading()
            if (message != "") {
                Taro.hideLoading()
            }
            fail()
        },
        complete: function (res) {

        },
    })
}
