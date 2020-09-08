/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import TabbarComp from '@/components/TabbarComp/TabbarComp';

import { connect } from '@tarojs/redux';
import './order.scss';

class Order extends Component {
  config = {
    navigationBarTitleText: '订单',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-cell-group': '../../iView/cell-group/index',
      'i-cell': '../../iView/cell/index',
      'i-divider': '../../iView/divider/index',
    },
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='order'>
        <i-cell-group>
          <i-cell title='历史订单' is-link url='/pages/order/myHistoryOrder'></i-cell>
          <i-cell title='现在订单' is-link url='/pages/order/myCurrentOrder'></i-cell>
        </i-cell-group>
        <View className='tabbar-container'>
          <TabbarComp currentTab='order' />
        </View>
      </View>
    );
  }
}

export default Order;
