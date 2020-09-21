import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import {
  withdrawByUserId,

} from '@/api/user';
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
      total: '',
      disabled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  withdraw() {
    if (!Number(this.state.total)) {
      Taro.showToast({ title: '请输入大于0的金额', icon: 'none' });
      return
    }
    this.setState({ disabled: true })
    withdrawByUserId({ amount: this.state.total }).then(res => {
      this.setState({ total: 0, disabled: false })
    }).catch(e => {
      this.setState({ disabled: false })
    })
  }
  onChangeTotal(e) {
    this.setState({ total: e.target.detail.value });
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { total, disabled } = this.state
    return (
      <View className='withdraw'>
        <i-input value={total} right title="提现(元):" maxlength={3} mode="wrapped" placeholder="一次提现金额不能超过999元" onChange={this.onChangeTotal.bind(this)} type='number' />
        <View style='text-align:center'>
          <Button className='primary' size='mini' onClick={this.withdraw.bind(this)} disabled={disabled} >
            提现 </Button>
        </View>


      </View>
    )
  }
}

export default Withdraw