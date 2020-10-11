import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import './instruction.scss'

class Instruction extends Component {

  config = {
    navigationBarTitleText: '使用指南',
    usingComponents: {
      'i-row': '../../../iView/row/index',
      'i-col': '../../../iView/col/index',
      'i-cell-group': '../../../iView/cell-group/index',
      'i-cell': '../../../iView/cell/index',

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
      <View className='instruction'>
        <i-cell-group>
          <i-cell title='如何注册成为歌手?' is-link url='/pages/user/instruction/howToRegister/howToRegister'></i-cell>
          <i-cell title='如何申请点歌二维码?' is-link url='/pages/user/instruction/howToQrCode/howToQrCode'></i-cell>
          <i-cell title='如何上传歌曲?' is-link url='/pages/user/instruction/howToUploadSong/howToUploadSong'></i-cell>
          <i-cell title='如何上传活动?' is-link url='/pages/user/instruction/howToUploadEvent/howToUploadEvent'></i-cell>
          <i-cell title='如何接收订单?' is-link url='/pages/user/instruction/howToTakeOrder/howToTakeOrder'></i-cell>
          <i-cell title='如何提现?' is-link url='/pages/user/instruction/howToWithdraw/howToWithdraw'></i-cell>
        </i-cell-group>

      </View>
    )
  }
}

export default Instruction
