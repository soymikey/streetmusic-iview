import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import {
  createWithdraw,
  getWithdrawListById
} from '@/api/withdraw';
import {
  getProfitById
} from '@/api/user';


import './profit.scss'


class Profit extends Component {

  config = {
    navigationBarTitleText: '我的收益',
    usingComponents: {
      'i-row': '../../../iView/row/index',
      'i-col': '../../../iView/col/index',
      'i-cell-group': '../../../iView/cell-group/index',
      'i-cell': '../../../iView/cell/index',
      'i-switch': '../../../iView/switch/index',
      'i-tag': '../../../iView/tag/index',
      'i-button': '../../../iView/button/index',
      'i-divider': '../../../iView/divider/index',
      'i-avatar': '../../../iView/avatar/index',
      'i-icon': '../../../iView/icon/index',
    },
  }
  constructor() {
    super(...arguments);
    this.state = {
      profit: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.getProfit()
  }
  componentWillUnmount() { }
  getProfit() {
    getProfitById().then(res => {
      this.setState({ profit: res.data.profit })
    })
  }
  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { profit } = this.state
    return (
      <View className='profit'>
        <i-cell-group>
          <i-cell
            title='总金额'

          ><View slot="footer">{profit}元</View></i-cell>
          <i-cell
            title='提现'
            is-link
            url='/pages/user/profit/withdraw/withdraw'
          >  </i-cell>
          <i-cell
            title='提现记录'
            is-link
            url='/pages/user/withdraw/history'
          >  </i-cell>
        </i-cell-group>

      </View>
    )
  }
}

export default Profit
