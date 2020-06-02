import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';

import './tab2.scss';

class Tab2 extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      'i-row': '../../../iView/row/index',
      'i-col': '../../../iView/col/index',
      'i-cell-group': '../../../iView/cell-group/index',
      'i-cell': '../../../iView/cell/index',
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
      <View className='index'>
        <i-row>
          <i-col span='8' i-class='col-class'>
            i am tab 2
          </i-col>
          <i-col span='8' i-class='col-class'>
            col-8
          </i-col>
          <i-col span='8' i-class='col-class'>
            col-8
          </i-col>
        </i-row>
        <Text>this is tab2</Text>
      </View>
    );
  }
}

export default Tab2;