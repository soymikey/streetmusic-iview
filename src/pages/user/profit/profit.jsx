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
    enablePullDownRefresh: false,
    navigationBarTitleText: '我的收益',
    usingComponents: {
      'i-cell-group': '../../../iView/cell-group/index',
      'i-cell': '../../../iView/cell/index',
    },
  }
  constructor() {
    super(...arguments);
    this.state = {
      profit: 0,
      holding: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {

  }
  componentWillUnmount() { }
  getProfit() {
    getProfitById().then(res => {
      this.setState({
        balance: res.data.balance,
        holding: res.data.holding,
      })
    })
  }
  componentDidShow() {
    this.getProfit()
  }

  componentDidHide() { }

  render() {
    const { balance, holding } = this.state
    return (
      <View className='profit'>
        <i-cell-group>

          <i-cell
            title='余额'

          ><View slot="footer">{balance}元</View></i-cell>
          <i-cell
            title='提现审查中'

          ><View slot="footer">{holding}元</View></i-cell>
          <i-cell
            title='提现'
            is-link
            url='/pages/user/profit/withdraw/withdraw'
          >  </i-cell>
          {/* <i-cell
            title='提现记录'
            is-link
            url='/pages/user/profit/withdrawHistory/withdrawHistory'
          >  </i-cell> */}
          <i-cell
            title='收益详情'
            is-link
            url='/pages/user/profit/details/details'
          >  </i-cell>

        </i-cell-group>

      </View>
    )
  }
}

export default Profit
