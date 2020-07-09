import Wechat from "@/utils/wechat.js"

export const createOrder = (data) => { return Wechat.request('/api/order/create', data) }//创建订单
export const getOrderListById = (data) => { return Wechat.request('/api/order/list', data) }//获取某个歌手订单
export const updateOrder = (data) => { return Wechat.request('/api/order/update', data) }//更新订单

// export const getSongDetailById = (data) => { return Wechat.request('/api/song/detail', data) }//获取某个歌手订单
// export const updateSong = (data) => { return Wechat.request('/api/song/update', data) }//更新订单
// export const deleteSong = (data) => { return Wechat.request('/api/song/delete', data) }//删除订单


// export const getNewSongsList = (data) => { return Wechat.request('/api/song/new/list', data) }//获取最新订单
