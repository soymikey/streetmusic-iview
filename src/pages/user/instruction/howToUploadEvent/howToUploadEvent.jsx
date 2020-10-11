import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { baseURL } from '@/config'
import './howToUploadEvent.scss'


class HowToUploadEvent extends Component {

  config = {
    navigationBarTitleText: '如何上传活动',
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
        <View className='title' >点击-上传活动</View>
        <Image src={baseURL+'/static/instruction/uploadEvent/1.png'} className='image' />

        <View className='title'>填写活动信息</View>
        <Image src={baseURL+'/static/instruction/uploadEvent/2.png'} className='image' />

        <i-divider i-class='divider' content='完成'></i-divider>
      </View>
    )
  }
}

export default HowToUploadEvent
