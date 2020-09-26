import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import uQRCode from '../../common/uqrcode'

import './index.scss'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() {
    this.make()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: 'uQRCode二维码生成'
  }

  state = {
    qrcodeText: 'uQRCode',
    qrcodeSize: 129,
    qrcodeSrc: ''
  }

  make = () => {
    Taro.showLoading({
      title: '二维码生成中',
      mask: true
    })

    uQRCode.make({
      canvasId: 'qrcode',
      text: this.state.qrcodeText,
      size: this.state.qrcodeSize,
      margin: 10,
      success: res => {
        console.log('res', res)
        this.setState({
          qrcodeSrc: res
        })
      },

      complete: () => {
        Taro.hideLoading()
      }
    })
  }

  inputChange = (e) => {
    this.setState({
      qrcodeText: e.detail.value
    })
  }

  toComponent = (e) => {
    Taro.navigateTo({
      url: '/pages/user/userQrCode/qr/components/Qrcode/index'
    })
  }

  render() {
    const { qrcodeSize, qrcodeSrc, qrcodeText } = this.state
    return (
      <View className='content'>
        <View class="canvas">
          <Canvas canvasId="qrcode" style={`width:${qrcodeSize}px; height:${qrcodeSize}px;`} />
          <Text>canvas</Text>
        </View>
        <View class="image">
          <Image src={qrcodeSrc} />
          <Text>image</Text>
        </View>
        <Input class="input" onChange={this.inputChange.bind(this)} placeholder="输入内容生成二维码" value={qrcodeText} />
        <Button class="button" type="primary" onTap={this.make.bind(this)}>生成二维码</Button>
        <Button class="button" type="primary" onTap={this.toComponent.bind(this)}>自定义组件</Button>
      </View>
    )
  }
}
