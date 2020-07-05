import Taro from "@tarojs/taro"
import Wechat from "@/utils/wechat.js"
import { baseURL } from '@/config'

export const createComment = (data) => { return Wechat.request('/api/comment/create', data) }//创建留言
export const getCommentList = (data) => { return Wechat.request('/api/comment/list', data) }//获取留言列表
export const uploadImage = (file, url) => {
    Taro.showLoading({
        title: '正在上传图片',
    });
    return new Promise((resolve, reject) => {
        Taro.uploadFile({
            url: baseURL + url,// '/api/event/image/upload',
            filePath: file,
            name: 'file',
            header: {
                'content-type': 'multipart/form-data'
            },
            success: function (res) {
                resolve(res.data)
                Taro.hideLoading();
            },
            fail: function (e) {
                reject(e)
                Taro.hideLoading();
            }
        })
    })
}//上传图片