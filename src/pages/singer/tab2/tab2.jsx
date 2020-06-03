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
      'i-divider': '../../../iView/divider/index',
    },
  };
  static defaultProps = {
    list: [],
  };

  constructor() {
    super(...arguments);
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { list } = this.props;
    return (
      <View className='index'>
        <i-cell-group>
          {list.map(item => {
            return (
              <i-cell
                key={item.name}
                title={item.name}
                label='用户名:米高'
                value='未开始'></i-cell>
            );
          })}
        </i-cell-group>
        <i-divider content='加载已经完成,没有其他数据'></i-divider>
      </View>
    );
  }
}

export default Tab2;
