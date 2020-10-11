import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { baseURL } from '@/config'
import './howToQrCode.scss'
class HowToQrCode extends Component {

  config = {
    navigationBarTitleText: '如何申请点歌二维码',
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
        <View className='title'>点击-点歌二维码</View>
        <Image src={baseURL+'/static/instruction/qrcode/1.png'} className='image' />
        <View className='title'>申请点歌二维码</View>
        <View className='sub-title'>或者保存二维码到手机</View>
        <Image src={baseURL+'/static/instruction/qrcode/2.png'} className='image' />
        <View className='title'>填写收货信息-支付</View>
        <View className='sub-title'>支付费用5元(二维码支架和二维码打印)</View>
        <Image src={baseURL+'/static/instruction/qrcode/3.png'} style='height:295px' />
        <i-divider i-class='divider' content='完成'></i-divider>
      </View>
    )
  }
}

export default HowToQrCode
