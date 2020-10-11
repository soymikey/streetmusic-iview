import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { baseURL } from '@/config'
import './howToUploadSong.scss'


class HowToUploadSong extends Component {

  config = {
    navigationBarTitleText: '如何上传歌曲',
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
        <View className='title' >点击-上传歌曲</View>
        <Image src={baseURL+'/static/instruction/uploadSong/1.png'} className='image' />

        <View className='title'>上传歌曲</View>
        <Image src={baseURL+'/static/instruction/uploadSong/2.png'}style='height:250px'  />

        <i-divider i-class='divider' content='完成'></i-divider>
      </View>
    )
  }
}

export default HowToUploadSong
