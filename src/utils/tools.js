import Taro from '@tarojs/taro'

export const toolbox = { name: '123' }
export const toolbox2 = { name: '123' }


//去某个页面
export const goToPage = (url) => {
    Taro.navigateTo({ url })
}
