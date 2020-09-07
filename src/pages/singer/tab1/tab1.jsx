import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import './tab1.scss';

class Tab1 extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '首页',

    usingComponents: {
      'i-row': '../../../iView/row/index',
      'i-col': '../../../iView/col/index',
      'i-cell-group': '../../../iView/cell-group/index',
      'i-cell': '../../../iView/cell/index',
      'i-switch': '../../../iView/switch/index',
      'i-tag': '../../../iView/tag/index',
      'i-button': '../../../iView/button/index',
      'i-divider': '../../../iView/divider/index',
      'i-modal': '../../../iView/modal/index'
    },
  };
  static defaultProps = {
    list: [],
  };
  constructor() {
    super(...arguments);
    this.state = {
      isShowModal: true,

    };
  }
  order(id) {
    this.props.onOpenModal_(id)
  }
  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { list, userState } = this.props;
    return (
      <View className='index'>


        <i-cell-group>
          {list.map(item => {
            return (
              <i-cell key={item.name} title={item.name} label={item.price + '元'}>
                <Button slot='footer' size='mini' className='primary' onClick={this.order.bind(this, item)} disabled={userState === '0' || userState === '2'} >
                  点歌
                </Button>
              </i-cell>
            );
          })}
        </i-cell-group>
        <i-divider content='加载已经完成,没有其他数据'></i-divider>
      </View >
    );
  }
}

export default Tab1;
Tab1.defaultProps = {
  list: [],
  userState: '0'
}
