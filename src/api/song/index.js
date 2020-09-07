import Wechat from "@/utils/wechat.js"

export const createSong = (data) => { return Wechat.request('/api/song/create', data) }//创建歌曲
export const getSongListById = (data) => { return Wechat.request('/api/song/list', data) }//获取某个歌手歌曲
export const getHotSongList = (data) => { return Wechat.request('/api/song/hot', data) }//获取热门歌曲
export const getRecommendSongList = (data) => { return Wechat.request('/api/song/recommend', data) }//获取推荐歌曲
export const getSongDetailById = (data) => { return Wechat.request('/api/song/detail', data) }//获取某个歌手歌曲
export const updateSong = (data) => { return Wechat.request('/api/song/update', data) }//更新歌曲
export const deleteSong = (data) => { return Wechat.request('/api/song/delete', data) }//删除歌曲


export const getNewSongsList = (data) => { return Wechat.request('/api/song/new/list', data) }//获取最新歌曲
