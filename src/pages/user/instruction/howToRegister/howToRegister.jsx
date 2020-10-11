import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { baseURL } from '@/config'

import './howToRegister.scss'

class Howtoregister extends Component {

  config = {
    navigationBarTitleText: '如何注册成为歌手',
    usingComponents: {
      'i-divider': '../../../../iView/divider/index',
    },
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='container'>
        <View className='title'>登录后点击注册歌手</View>
        <Image src={baseURL+'/static/instruction/register/1.png'} className='image' />
        <View className='title'>填写基本信息和手机验证</View>
        <Image src={baseURL+'/static/instruction/register/2.png'} className='image' />
        <View className='title'>注册成功</View>
        <Image src={baseURL+'/static/instruction/register/3.png'} className='image' />
        <i-divider i-class='divider' content='完成'></i-divider>
      </View>
    )
  }
}

export default Howtoregister
