/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import TabbarComp from '@/components/TabbarComp/TabbarComp';
import './order.scss';
import { get, set, remove,clear } from '@/utils/localStorage';

class Order extends Component {
  config = {
    enablePullDownRefresh: false,
    navigationBarTitleText: '订单',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-cell-group': '../../iView/cell-group/index',
      'i-cell': '../../iView/cell/index',
      'i-divider': '../../iView/divider/index',
      "i-message": "../../iView/message/index",
    },
  };

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const userInfo_ = get('userInfo') || {}
    return (
      <View className='order'>
        <i-message id="message" />
        <i-cell-group>
          {userInfo_.role === 'artist' &&
            <View>

              <i-cell title='现在订单' is-link url='/pages/order/myCurrentOrder'></i-cell>
              <i-cell title='推荐历史' is-link url='/pages/reference/history'></i-cell>
            </View>


          }
          <i-cell title='打赏历史' is-link url='/pages/tips/history'></i-cell>
          <i-cell title='订单历史' is-link url='/pages/order/myHistoryOrder'></i-cell>


        </i-cell-group>
        <View className='tabbar-container'>
          <TabbarComp currentTab='order' />
        </View>
      </View>
    );
  }
}

export default Order;
