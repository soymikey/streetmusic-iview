import Wechat from "@/utils/wechat.js"

export const createTips = (data) => { return Wechat.request('/api/tips/create', data) }
export const getTipsHistoryListById = (data) => { return Wechat.request('/api/tips/history', data) }//获取某个用户/歌手打赏历史
