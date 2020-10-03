import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import './about.scss'

class About extends Component {

    config = {
    navigationBarTitleText: '关于我们'
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
       请您务必认真阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了向您提供数据、分享等服务所要获取的权限信息。
      </View>
    )
  }
}

export default About
