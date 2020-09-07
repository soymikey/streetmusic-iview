/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import TabbarComp from '@/components/TabbarComp/TabbarComp';
import FloatLayout from '@/components/FloatLayout/FloatLayout';
import EventSumaryComp from '@/components/eventSumaryComp/eventSumaryComp';

import './event.scss';

const post1_ = require('@/asset/images/poster1.png');
const post2_ = require('@/asset/images/poster2.png');

class Event extends Component {
  config = {
    navigationBarTitleText: '活动',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-cell-group': '../../iView/cell-group/index',
      'i-cell': '../../iView/cell/index',
      'i-switch': '../../iView/switch/index',
      'i-tag': '../../iView/tag/index',
      'i-button': '../../iView/button/index',
      'i-divider': '../../iView/divider/index',
    },
  };

  constructor() {
    super(...arguments);
    this.state = {
      isOpened: false,
      list: [
        {
          id: 1,
          username: '网易云小秘书',
          date: ' 昨天06：28',
          content:
            ' #早安世界#知道劝你们玩手机是没有用的，那就只能给你们加油鼓励了，早，今天也要努力学习哦！',
          posters: [post1_],
          likes: '112',
          shares: '223',
          comments: '334',
          collections: '445',
        },
        {
          id: 2,
          username: '网易云小秘书2',
          date: ' 昨天06：28',
          content:
            ' #早安世界#知道劝你们玩手机是没有用的，那就只能给你们加油鼓励了，早，今天也要努力学习哦！',

          likes: '112',
          shares: '223',
          comments: '334',
          collections: '445',
        },
        {
          id: 2,
          username: '网易云小秘书2',
          date: ' 昨天06：28',
          content:
            ' #早安世界#知道劝你们玩手机是没有用的，那就只能给你们加油鼓励了，早，今天也要努力学习哦！',
          posters: [post2_],
          likes: '112',
          shares: '223',
          comments: '334',
          collections: '445',
        },
      ],
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  onOpen() {
    this.setState({ isOpened: true });
  }
  onClose() {
    this.setState({ isOpened: false });
  }

  render() {
    const { isOpened, list } = this.state;
    return (
      <View className='event pb50px'>
        <i-row i-class='top-button'>
          <i-col span='12' i-class='col-class'>
            <View onClick={this.onOpen.bind(this)} className='text primary'>
              发活动
            </View>
          </i-col>
          <i-col span='12' i-class='col-class'>
            <View onClick={this.onOpen.bind(this)} className='video primary'>
              发视频
            </View>
          </i-col>
        </i-row>
        <View className='evensumary-wrapper'>
          <EventSumaryComp list={list} />
        </View>

        <i-divider content='加载已经完成,没有其他数据'></i-divider>

        <FloatLayout
          isOpened={isOpened}
          onClose={this.onClose.bind(this)}
          title='我是测试'
        />
        <View className='tabbar-container'>
          <TabbarComp currentTab='event' />
        </View>
      </View>
    );
  }
}

export default Event;
