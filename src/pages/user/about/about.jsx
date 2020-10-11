import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text ,Image} from '@tarojs/components'
import './about.scss'

class About extends Component {

    config = {
    navigationBarTitleText: '使用指南'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='about'>
        <View className='title'>注册歌手</View>
        <Image src={imageUrl} style='height:100%;width:100%;' />
      </View>
    )
  }
}

export default About
