import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { goToPage } from '@/utils/tools.js';
import { createPay, createQrCodeStand } from '@/api/user';
import validator from '@/utils/validator'

import './userQrCodeOrder.scss'


class userQrCodeOrder extends Component {

  config = {
    navigationBarTitleText: '申请点歌二维码',

    usingComponents: {
      'i-row': '../../../iView/row/index',
      'i-col': '../../../iView/col/index',
      'i-cell-group': '../../../iView/cell-group/index',
      'i-cell': '../../../iView/cell/index',
      'i-divider': '../../../iView/divider/index',
      'i-avatar': '../../../iView/avatar/index',
      'i-button': '../../../iView/button/index',
      'i-input': '../../../iView/input/index',
      'i-panel': '../../../iView/panel/index',
      "i-notice-bar": "../../../iView/notice-bar/index"
    },
  }
  constructor() {
    super(...arguments);
    this.state = {
      user: '',
      address: '',
      phoneNumber: '',
      loading: false
    }
  }

  componentDidMount() {
    // console.log('this.$router.params.id', this.$router.params.id)
    // const id = this.$router.params.id
    // getUserQrCode({ id }).then(res => {
    //   this.setState({ qrCode: res.data.qrCode })
    // })

  }
  componentWillUnmount() { }

  componentDidShow() {

  }

  componentDidHide() { }


  onChangeName(e) {
    this.setState({ user: e.target.detail.value });
  }
  onChangePhoneNumber(e) {
    this.setState({ phoneNumber: e.target.detail.value });
  }
  onChangeAddress(e) {
    this.setState({ address: e.detail.detail.value });
  }

  hideKeyBoard() {
    Taro.hideKeyboard();
  }
  pay() {
    const { user, phoneNumber, address } = this.state
    const isValid = validator(
      [

        {
          value: user,
          rules: [{
            rule: 'required',
            msg: '收件名称不能为空'
          }]
        },

        {
          value: phoneNumber,
          rules: [{
            rule: 'isMobile',
          }]
        },
        {
          value: address,
          rules: [{
            rule: 'required',
            msg: '收货地址不能为空'
          }]
        },])

    if (!isValid.status) {
      Taro.showToast({ title: isValid.msg, icon: 'none' });
      return;
    }
    const userInfo_ = get('userInfo') || {}
    if (phoneNumber !== userInfo_.phone) {
      Taro.showToast({ title: '联系电话号码和注册电话号码不一致', icon: 'none' })
      return
    }

    this.setState({ loading: true })
    createPay({ amount: '500' }).then(res => {
      Taro.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.paySign,
        success: (errmsg) => {
          if (errmsg.errMsg == 'requestPayment:ok') {
            Taro.showToast({
              title: '支付成功',
              icon: 'success'
            });

            const data = {
              user: this.state.user,
              address: this.state.address,
              phoneNumber: this.state.phoneNumber,
            };
            createQrCodeStand(data).then(res => {
              this.setState({ loading: false });
              setTimeout(() => {
                Taro.navigateBack(-1)
              }, 2000);
            }).catch(err => {
              this.setState({ loading: false });
            })

          }
        },
        fail: function (res) {
          this.setState({ loading: false });
          if (res.errMsg == 'requestPayment:fail cancel') {
            Taro.showToast({
              title: '支付取消',
              icon: 'none'
            });
          } else {
            Taro.showToast({
              title: res.errmsg,
              icon: 'none'
            });
          }
        }
      })
    })
  }
  getAddress() {
    Taro.chooseLocation({
      success: (res) => {
        if (res.errMsg === "chooseLocation:ok") {
          this.setState({ address: res.name + ' ' + res.address })
        }

      }
    })
  }
  goToQRcodeOrderPage() {
    goToPage('/pages/user/userQrCode/userQrCodeOrder')
  }
  render() {
    const { user,
      address,
      phoneNumber, loading } = this.state
    return (
      <View className='userQrCodeOrder'>
        <i-notice-bar icon="systemprompt" loop>
          二维码申请成功后, 我们将会在1-2个工作日内发货.(大家也可以直接到淘宝上定制个性化的二维码)
</i-notice-bar>
        <i-input
          title='收货人姓名'
          placeholder='姓名'
          value={user}
          maxlength={5}
          onChange={this.onChangeName.bind(this)}
        />
        <i-input
          onChange={this.onChangePhoneNumber.bind(this)}
          value={phoneNumber}
          title='联系电话'
          placeholder='联系电话'
          type='number'
          maxlength={11}
        />
        <View style='display:flex'>
          <View style='width:80%;'>

            <i-input
              title='收件地址'
              placeholder='收件地址'
              value={address}
              maxlength={150}
              onChange={this.onChangeAddress.bind(this)}
              type='textarea'
            />
          </View>

          <View style='flex:1;display: flex; align-items: center;justify-content: center; background: #fff;'>
            <Button
              size='mini'
              className='success'
              onClick={this.getAddress.bind(this)}
            >
              地址
          </Button>
          </View>

        </View>

        <View style='text-align:center;margin-top:20px'>
          <Button
            disabled={loading}
            size='mini'
            className='primary'
            onClick={this.pay.bind(this)}
          >支付</Button>

        </View>

      </View>



    )
  }
}

export default userQrCodeOrder
