import Wechat from "@/utils/wechat.js"


export const createWithdraw = (data) => { return Wechat.request('/api/withdraw/create', data) }//创建提现请求
export const getWithdrawListById = (data) => { return Wechat.request('/api/withdraw/list', data) }//获取某个歌手的提现历史
