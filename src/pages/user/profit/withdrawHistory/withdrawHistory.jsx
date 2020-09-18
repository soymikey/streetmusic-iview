import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'


import './withdrawHistory.scss'

import {
  getWithdrawList
} from '@/api/user';
class Withdrawhistory extends Component {

  config = {
    navigationBarTitleText: '提现历史',
    usingComponents: {

      'i-cell-group': '../../../../iView/cell-group/index',
      'i-cell': '../../../../iView/cell/index',

    },
  }
  constructor() {
    super(...arguments);
    this.state = {
      list: []
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.getList()
  }
  getList() {

    getWithdrawList({ amount: this.state.total }).then(res => {
      this.setState({ list: res.data.list });
    })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { list } = this.state
    return (

      // <i-cell-group>
      //     <i-cell
      //       title='总金额'

      //     ><View slot="footer">{profit}元</View></i-cell>
      //     <i-cell
      //       title='提现'
      //       is-link
      //       url='/pages/user/profit/withdraw/withdraw'
      //     >  </i-cell>
      //     <i-cell
      //       title='提现记录'
      //       is-link
      //       url='/pages/user/profit/withdrawHistory/withdrawHistory'
      //     >  </i-cell>
      //   </i-cell-group>
      <View className='withdrawHistory'>
        <i-cell-group>
          {list.map(item => {
            return <i-cell
              title='提现金额'
              label={item.createdDate.slice(0, 10) + '  ' + item.createdDate.slice(11, 19)}
            > <View slot="footer">{item.amount}元</View> </i-cell>

          })}
        </i-cell-group>

      </View>
    )
  }
}

export default Withdrawhistory
