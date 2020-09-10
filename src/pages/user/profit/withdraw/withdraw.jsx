import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './withdraw.scss'

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
      total: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  withdraw() {
    const { total } = this.state
    if (total % 10 === 0 && total !== 0) {
      console.log('ok')
    } else {
      Taro.showToast({ title: '提现金额只能是10的倍数', icon: 'fail' });
    }
  }
  onChangeTotal(e) {
    this.setState({ total: e.target.detail.value });
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { total } = this.state
    return (
      <View className='withdraw'>
        <i-input value={total} right title="提现(元):" mode="wrapped" placeholder="提现" onChange={this.onChangeTotal.bind(this)} />
        <View style='text-align:center'>
          <Button className='primary' size='mini' onClick={this.withdraw.bind(this)} >
            提现 </Button>
        </View>


      </View>
    )
  }
}

export default Withdraw
