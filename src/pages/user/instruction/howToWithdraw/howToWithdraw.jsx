import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { baseURL } from '@/config'
import './howToWithdraw.scss'


class HowToWithdraw extends Component {

  config = {
    navigationBarTitleText: '如何提现',
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
        <View className='title' >点击-我的收益</View>
        <Image src={baseURL + '/instruction/withdraw/1.png'} className='image' />
        <View className='title'>提现</View>
        <Image src={baseURL + '/instruction/withdraw/2.png'} style='height:160px' />
        <View className='title'>申请提现</View>
        <View className='sub-title'>提现通过后需要1-2个工作日到账</View>
        <Image src={baseURL + '/instruction/withdraw/3.png'} style='height:190px' />
        <i-divider i-class='divider' content='完成'></i-divider>
      </View>
    )
  }
}

export default HowToWithdraw
