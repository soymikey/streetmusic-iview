import Taro from "@tarojs/taro"
import Wechat from "@/utils/wechat.js"
import { baseURL } from '@/config'

export const createComment = (data) => { return Wechat.request('/api/comment/create', data) }//创建留言
export const getCommentList = (data) => { return Wechat.request('/api/comment/list', data) }//获取留言列表
export const createLike = (data) => { return Wechat.request('/api/like/create', data) }//点赞
export const createCollection = (data) => { return Wechat.request('/api/collection/create', data) }//收藏
export const createFollow = (data) => { return Wechat.request('/api/follow/create', data) }//关注
export const getSearchResult = (data) => { return Wechat.request('/api/search', data) }//搜索
export const getSMSCode = (data) => { return Wechat.request('/api/code', data) }//获取验证码

export const uploadImage = (file, url) => {
    Taro.showLoading({
        title: '正在上传图片',
    });
    return new Promise((resolve, reject) => {
                console.log('file',file)
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
                Taro.showToast({title:'图片上传失败',icon:'none'})
                Taro.hideLoading();
                console.log('图片上传失败',e)
                reject(e)
            }
        })
    })
}//上传图片