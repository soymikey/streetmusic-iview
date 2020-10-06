import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';
import EventSumaryComp from '@/components/eventSumaryComp/eventSumaryComp';

import './tab3.scss';

class Tab3 extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '',
    usingComponents: {
      'i-row': '../../../iView/row/index',
      'i-col': '../../../iView/col/index',

      'i-avatar': '../../../iView/avatar/index',
      'i-divider': '../../../iView/divider/index',
      'i-icon': '../../../iView/icon/index',
      'i-divider': '../../../iView/divider/index',
    },
  };
  static defaultProps = {
    list: [],
  };
  constructor() {
    super(...arguments);
    this.state = {
      tabList: [
        { key: 0, label: '选项1' },
        { key: 1, label: '选项2' },
        { key: 2, label: '选项3' },
      ],
      tagList: ['15后', 'Lv.6', '北京', '白羊座'],
      colorList: ['blue', 'green', 'red', 'yellow', 'default'],
      currentTab: 2,
      iconList: ['like', 'share', 'document', 'collection'],
      swiperHeight: 0,
    };
  }

  iconHandler(icon) {
    const index = this.state.iconList.findIndex(item => item === icon);
    const newIcon =
      icon.indexOf('_fill') === -1 ? icon + '_fill' : icon.split('_fill')[0];

    this.state.iconList.splice(index, 1, newIcon);
    this.setState({ iconList: this.state.iconList });
  }
  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    // const { iconList } = this.state;
    const { list } = this.props;
    return (
      <View className='tab3'>
        <EventSumaryComp list={list} />
        <i-divider i-class='divider' content='加载已经完成,没有其他数据'></i-divider>
      </View>
    );
  }
}

export default Tab3;
