import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { getSMSCode } from '@/api/common';

import {
  withdrawByUserId,

} from '@/api/user';
import './withdraw.scss'
import validator from '@/utils/validator'

let clock
class Withdraw extends Component {

  config = {
    navigationBarTitleText: '提现',
    usingComponents: {
      'i-panel': '../../../../iView/panel/index',
      'i-input': '../../../../iView/input/index'
    },
  }
  constructor() {
    super(...arguments);
    this.state = {
      total: '',
      disabled: false,
      phone: '',
      code: '',
      smsDisabled: false,
      smsText: '点击发送验证码',
      smsCountDown: 60,
      randomCode: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  onChangeTotal(e) {
    this.setState({ total: e.target.detail.value });
  }
  onChangePhone(e) {
    this.setState({ phone: e.detail.detail.value });
  }
  onChangeCode(e) {
    this.setState({ code: e.detail.detail.value });
  }
  sendCode() {
    this.setState({ smsDisabled: true, smsText: this.state.smsCountDown + '秒后可重新获取' })
    clock = setInterval(this.doLoop, 1000, this);
  }
  doLoop(that) {
    that.setState({ smsCountDown: that.state.smsCountDown - 1 }, () => {
      if (that.state.smsCountDown > 0) {
        that.setState({ smsText: that.state.smsCountDown + '秒后可重新获取' })
      } else {
        clearInterval(clock); //清除js定时器
        that.setState({ smsText: '点击发送验证码', smsDisabled: false, smsCountDown: 60 })
      }
    })
  }
  fetchMSMCode() {
    const isValid = validator(
      [{
        value: this.state.phone,
        rules: [{
          rule: 'isMobile',
        }]
      },]
    )
    if (!isValid.status) {
      Taro.showToast({ title: isValid.msg, icon: 'none' });
      return;
    }
    return getSMSCode({phone:this.state.phone}).then(res => {
      this.setState({ randomCode: res.data.code })
      this.sendCode()
    })
  }

  withdraw() {

    if (this.state.code !== this.state.randomCode) {
      Taro.showToast({ title: '验证码输入错误,请重试~', icon: 'none' });
      return;
    }
    const isValid = validator(
      [
        {
          value: this.state.total,
          rules: [{
            rule: 'isPrice',
            msg: '提现金额格式错误'
          }]
        },
        {
          value: this.state.phone,
          rules: [{
            rule: 'isMobile',
            msg: '联系电话格式错误'
          }]
        },
      ]
    )

    if (!isValid.status) {
      Taro.showToast({ title: isValid.msg, icon: 'none' });
      return;
    }
    if (!(Number(this.state.total) > 0 && Number(this.state.total) < 1000)) {
      Taro.showToast({ title: '金额不能小于0或者大于999', icon: 'none' });
      return
    }
    this.setState({ disabled: true })
    withdrawByUserId({ amount: this.state.total, phone: this.state.phone }).then(res => {
      this.setState({ total: 0, phone: '', code: '', disabled: false })
    }).catch(e => {
      this.setState({ disabled: false })
    })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { total, disabled,
      phone,
      code,
      smsDisabled,
      smsText,

    } = this.state
    return (
      <View className='withdraw'>
        <i-input
          title='手机'
          type="number"
          placeholder='注册的手机号码'
          value={phone}
          maxlength={11}
          onChange={this.onChangePhone.bind(this)}
        />
        <View style='display:flex'>
          <View style='width:50%;'>
            <i-input
              title='验证码'
              placeholder='4位验证码'
              value={code}
              maxlength={4}
              onChange={this.onChangeCode.bind(this)}
              type='number'
            />
          </View>
          <View style='flex:1;display: flex; align-items: center;justify-content: end; background: #fff;'>
            <View style='text-align:right;width:100%;padding-right:15px' >
              <Button
                size='mini'
                className='success'
                onClick={this.fetchMSMCode.bind(this)}
                disabled={smsDisabled}
              >
                {smsText}
              </Button>
            </View>
          </View></View>
        <i-input value={total} right title="提现(元):" maxlength={3} placeholder="一次提现金额不能超过999元" onChange={this.onChangeTotal.bind(this)} type='number' />
        <View style='text-align:center;margin-top:20px;'>
          <Button className='primary' size='mini' onClick={this.withdraw.bind(this)} disabled={disabled} >
            提现 </Button>
        </View>
      </View>
    )
  }
}

export default Withdraw
