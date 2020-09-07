import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';

import './TabbarComp.scss';

class TabbarComp extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: 'tabbarComp',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-divider': '../../iView/divider/index',
      'i-tab-bar': '../../iView/tab-bar/index',
      'i-tab-bar-item': '../../iView/tab-bar-item/index',
    },
  };
  static defaultProps = {
    key: 'index',
  };
  constructor() {
    super(...arguments);
    this.state = {
      // current: 'index',
    };
  }

  onChangeTabbar(e) {
    const key = e.detail.key;
    // console.log('key', key);
    // this.setState({ current: key });
    if (key === 'index') {
      Taro.switchTab({
        url: '/pages/index/index',
      });
    }
    if (key === 'event') {
      Taro.switchTab({
        url: '/pages/event/event',
      });
    }
    if (key === 'order') {
      Taro.switchTab({
        url: '/pages/order/order',
      });
    }
    if (key === 'user') {
      Taro.switchTab({
        url: '/pages/user/user',
      });
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props, nextProps);
  // }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { currentTab } = this.props;

    return (
      <View className='tabbar-container'>
        <i-tab-bar
          i-class='tabBar'
          current={currentTab}
          color='#2d8cf0'
          onChange={this.onChangeTabbar.bind(this)}>
          <i-tab-bar-item
            key='index'
            icon='homepage'
            current-icon='homepage_fill'
            title='首页'></i-tab-bar-item>
          <i-tab-bar-item
            key='event'
            icon='remind'
            current-icon='remind_fill'
            // count='3'
            title='活动'></i-tab-bar-item>
          <i-tab-bar-item
            key='order'
            icon='document'
            current-icon='document_fill'
            title='订单'></i-tab-bar-item>

          <i-tab-bar-item
            key='user'
            icon='mine'
            current-icon='mine_fill'
            dot
            title='我的'></i-tab-bar-item>
        </i-tab-bar>
        <View className='tabbar-block'></View>

      </View>
    );
  }
}

export default TabbarComp;
