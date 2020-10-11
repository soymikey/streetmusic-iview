import Wechat from "@/utils/wechat.js"

export const createEvent = (data) => { return Wechat.request('/api/event/create', data) }//创建活动
export const getEventListById = (data) => { return Wechat.request('/api/event/list', data) }//获取某个歌手活动
export const getEventDetailById = (data) => { return Wechat.request('/api/event/detail', data) }//获取某个歌手活动
export const updateEvent = (data) => { return Wechat.request('/api/event/update', data) }//更新活动
export const deleteEvent = (data) => { return Wechat.request('/api/event/delete', data) }//删除活动
export const getHotEventList = (data) => { return Wechat.request('/api/event/hotList', data) }//获取热门活动
export const  getRecommendEventList = (data) => { return Wechat.request('/api/event/recommend', data) }//获取推荐活动


