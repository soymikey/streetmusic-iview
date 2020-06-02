import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import TabbarComp from '@/components/TabbarComp/TabbarComp';

import './order.scss';

class Order extends Component {
  config = {
    navigationBarTitleText: '我的订单',
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='order'>
        <Text>我的订单</Text>
        <View className='tabbar-container'>
          <TabbarComp currentTab='order' />
        </View>
      </View>
    );
  }
}

export default Order;
