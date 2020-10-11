import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';

import { goToPage } from '@/utils/tools.js';

import './OneBlockComp.scss';

class OneBlockComp extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    // navigationBarTitleText: '首页'
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-avatar': '../../iView/avatar/index',
      'i-divider': '../../iView/divider/index',
    },
  };
  constructor() {
    super(...arguments);
    this.state = {
      list: [],
    };
  }
  goToEventPage() {

    goToPage('/pages/event/eventDetail/eventDetail')
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { list } = this.state;
    return (
      <View className='OneBlockComp'>
        {list.map(item => {
          return (
            <View
              className='container'
              key={item}
              onClick={this.goToEventPage.bind(this)}>
              <i-row i-class='top'>
                <i-col span='24' i-class='col-class'>
                  <Image class='image' src={item} style='width: 100%' />
                </i-col>
              </i-row>
              <i-row i-class='middle'>
                <i-col span='24' i-class='col-class'>
                  当邓超喊出蓝莲花的时候 我无耻的笑了
                </i-col>
              </i-row>
              <i-divider i-class='divider' height={10}></i-divider>
              <i-row i-class='bottom'>
                <i-col span='16' i-class='col-class'>
                  <i-avatar src={item} size='large' />
                  <Text className='username'>hwllow world</Text>
                </i-col>
              </i-row>
              <i-divider i-class='divider' height={24}></i-divider>
            </View>
          );
        })}
      </View>
    );
  }
}

export default OneBlockComp;
