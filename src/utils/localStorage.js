
import Taro from '@tarojs/taro';

/**
 * [nameKey 命名空间]
 * @type {String}
 */


//获取本地key的值
function _get(key) {
    var data = Taro.getStorageSync(key)
    return data
}

//设置本地的键值
function _set(key, value) {

    try {
        Taro.setStorageSync(key, JSON.stringify(value))
    } catch (e) {
        // console.log(e);
    }
}

function _remove(keys) {

    Taro.removeStorageSync(keys)
}

//删除本地所有键值
function _clear() {
    Taro.clearStorageSync()
}

module.exports = {
    get: _get,
    set: _set,
    clear: _clear,
    remove: _remove
};