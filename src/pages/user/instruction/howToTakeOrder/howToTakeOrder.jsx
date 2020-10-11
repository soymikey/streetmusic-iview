import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { baseURL } from '@/config'
import './howToTakeOrder.scss'
class HowToTakeOrder extends Component {

  config = {
    navigationBarTitleText: '如何接收订单',
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
        <View className='title'>订单页面的现在订单</View>
        <Image src={baseURL+'/static/instruction/order/1.png'} className='image' />
        <View className='title'>3种模式:上线-休息中-下线</View>
        <View className='sub-title'>每次进入页面是上线,退出页面是下线</View>
        <Image src={baseURL+'/static/instruction/order/2.png'} className='image' />
        <View className='title'>更新订单按钮</View>
        <View className='sub-title'>网络堵塞,可通过更新按钮来获取最新订单</View>
        <Image src={baseURL+'/static/instruction/order/3.png'} className='image' />
        <View className='title'>开始订单确认</View>
        <Image src={baseURL+'/static/instruction/order/4.png'} className='image' />
        <View className='title'>完成订单确认</View>
        <Image src={baseURL+'/static/instruction/order/5.png'} className='image' />
        <i-divider i-class='divider' content='完成'></i-divider>
      </View>
    )
  }
}

export default HowToTakeOrder
