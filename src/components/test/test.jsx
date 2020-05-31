import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';

import './test.scss';

class Test extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
    },
  };
  constructor() {
    super(...arguments);
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='test'>
        <i-row>
          <i-col span='8' i-class='col-class'>
            col-8
          </i-col>
          <i-col span='8' i-class='col-class'>
            col-8
          </i-col>
          <i-col span='8' i-class='col-class'>
            col-8
          </i-col>
        </i-row>
        <Text>this is test</Text>
      </View>
    );
  }
}

export default Test;
