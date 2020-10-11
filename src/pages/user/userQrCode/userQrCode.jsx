import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { getUserQrCode } from '@/api/user';
import WQRCode from '@/components/WQRCode/index'
import uQRCode from '@/components/WQRCode/uqrcode.js'
import { goToPage } from '@/utils/tools.js';
import { get } from '@/utils/localStorage';

import './userQrCode.scss'


class Userqrcode extends Component {

  config = {
    navigationBarTitleText: '二维码',
  }
  constructor() {
    super(...arguments);
    this.state = {
      qrCode: '',
      qrcodeText: 'https://streetmusic.migaox.com/qrcode/code?id=oUf6_4hX68zrrbvSKwFCNadg-OMU',
      qrcodeSize: 300,
      qrcodeSrc: ''
    }
  }

  componentDidMount() {
    const openId = get('openId')
    if (openId) {
      this.setState({ qrcodeText: 'https://streetmusic.migaox.com/qrcode/code?id=' + openId }, () => {
        uQRCode.make({
          canvasId: 'qrcode',
          text: this.state.qrcodeText,
          size: this.state.qrcodeSize,
          margin: 10,
          backgroudColor: '#9b9bdf',
          success: res => {
            this.setState({
              qrcodeSrc: res
            })
          },
          complete: () => {
            Taro.hideLoading()
          }
        })
      })

    } else {
      Taro.showToast({ title: '获取openId失败,请重新打开小程序', icon: 'none' })
    }

  }
  componentWillUnmount() { }

  componentDidShow() {

  }

  componentDidHide() { }
  saveImageToAlbum() {
    // //如果图片字符串不含要清空的前缀,可以不执行下行代码.
    Taro.saveImageToPhotosAlbum({
      filePath: this.state.qrcodeSrc,
      success(res) {
        if (res.errMsg === "saveImageToPhotosAlbum:ok") {
          Taro.showToast({ title: '保存成功', icon: 'none' })
        }
      },
      fail(err) {
        console.log('保存失败', err)
      }
    })

  }

  toComponent1 = (e) => {
    Taro.navigateTo({
      url: '/pages/user/userQrCode/qr/qrinner/index',
    })
  }
  toComponent2 = (e) => {
    Taro.navigateTo({
      url: '/pages/user/userQrCode/qr/components/Qrcode/index'
    })
  }
  goToQRcodeOrderPage() {
    goToPage('/pages/user/userQrCode/userQrCodeOrder')
  }
  render() {
    const { qrcodeSrc } = this.state
    return (
      <View className='userQrCode'>

        <View className="component" style='display: flex;justify-content: center;padding-top: 20%;'>
          <Canvas canvasId="qrcode" style={`width:300px; height:300px;`} />        </View>
        {/* <View className="component" style='display: flex;justify-content: center;padding-top: 20%;'>
          <WQRCode cid="michael" text={'https://streetmusic.migaox.com/qrcode/code?id=oUf6_4hX68zrrbvSKwFCNadg-OMU'} size={300} foregroundColor="#9b9bdf" makeOnLoad logo="http://qiniu.migaox.com/1600689451849.jpg" />
        </View> */}

        <View className='button' style='margin-top:20px;display:flex;justify-content: space-around;;'>
          <View style='text-align:center'>
            <Button
              size='mini'
              className='primary'
              onClick={this.saveImageToAlbum.bind(this)}
            >
              保存图片
              </Button>
          </View>
          <View style='text-align:center'>
            <Button
              size='mini'
              className='success'
              onClick={this.goToQRcodeOrderPage.bind(this)}
            >
              申请二维码收款码
              </Button>
          </View>

        </View>
      </View>



    )
  }
}

export default Userqrcode
