import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { getUserQrCode } from '@/api/user';


import './userQrCode.scss'


class Userqrcode extends Component {

  config = {
    navigationBarTitleText: '二维码',
  }
  constructor() {
    super(...arguments);
    this.state = {
      qrCode: ''
    };
  }

  componentDidMount() {
    console.log('this.$router.params.id', this.$router.params.id)
    const id = this.$router.params.id
    getUserQrCode({ id }).then(res => {
      console.log('res.data.qrCode', res.data.qrCode)
      this.setState({ qrCode: res.data.qrCode })
    })

  }
  componentWillUnmount() { }

  componentDidShow() {

  }

  componentDidHide() { }

  render() {
    const { qrCode } = this.state
    return (
      <View className='userQrCode'>
        <View className='image-wrapper'>
          <Image className='image' src={qrCode} />
        </View>



      </View>
    )
  }
}

export default Userqrcode
