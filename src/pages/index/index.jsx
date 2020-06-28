import Taro, { Component } from '@tarojs/taro';

import {
  View,
  Button,
  Text,
  Swiper,
  SwiperItem,
  Image,
  Input,
  Textarea,
} from '@tarojs/components';
import { toolbox } from '@/utils/tools.js';
import { getUserInfo } from '@/api/user';
import post1 from '@/asset/images/poster1.png';
import post2 from '@/asset/images/poster2.png';
import SixBlockComp from '@/components/SixBlockComp/SixBlockComp';
import OneBlockComp from '@/components/OneBlockComp/OneBlockComp';
import EventSumaryComp from '@/components/eventSumaryComp/eventSumaryComp';

import TabbarComp from '@/components/TabbarComp/TabbarComp';
import './index.scss';

const post1_ = require('@/asset/images/poster1.png');
const post2_ = require('@/asset/images/poster2.png');

class Index extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-divider': '../../iView/divider/index',
      'i-tab-bar': '../../iView/tab-bar/index',
      'i-tab-bar-item': '../../iView/tab-bar-item/index',
    },
  };
  constructor() {
    super(...arguments);
    this.state = {
      eventList: [
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

  testRequest() {
    // http://49.235.133.74:4001/api/categories/getList
    // request(
    //   'http://49.235.133.74:4001/api/categories/getList',
    //   {},
    //   '123',
    //   'post',
    //   '1',
    //   '2'
    // )
    //   .then(res => {
    //     console.log('res', res);
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //   });
  }
  componentWillUnmount() {}

  componentDidShow() {
    // getUserInfo('http://49.235.133.74:4001/api/categories/getList', {}, 'get')
    //   .then(res => {
    //     console.log('res', res);
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //   });
  }

  componentDidHide() {}
  clickHandler() {
    console.log('clicked');
  }
  render() {
    const { eventList } = this.state;
    return (
      <View className='index pb50px'>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
            <Image src={post1} style='width: 100%' />
          </SwiperItem>
          <SwiperItem>
            <Image src={post2} style='width: 100%' />
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-3'>3</View>
          </SwiperItem>
        </Swiper>
        <i-row i-class='sub-cate'>
          <i-col span='6' i-class='col-class'>
            <View class='cate-wrapper'>
              <View class='cate-icon'></View>
              <View class='cate-title'>
                <Text>私人FM</Text>
              </View>
            </View>
          </i-col>
          <i-col span='6' i-class='col-class'>
            <View class='cate-wrapper'>
              <View class='cate-icon'></View>
              <View class='cate-title'>
                <Text>私人FM</Text>
              </View>
            </View>
          </i-col>
          <i-col span='6' i-class='col-class'>
            <View class='cate-wrapper'>
              <View class='cate-icon'></View>
              <View class='cate-title'>
                <Text>私人FM</Text>
              </View>
            </View>
          </i-col>
          <i-col span='6' i-class='col-class'>
            <View class='cate-wrapper'>
              <View class='cate-icon'></View>
              <View class='cate-title'>
                <Text>私人FM</Text>
              </View>
            </View>
          </i-col>
        </i-row>
        <i-divider height={24}></i-divider>
        <SixBlockComp title='推荐歌单' />
        <i-divider height={24}></i-divider>
        <SixBlockComp title='热门歌单' />
        <i-divider height={24}></i-divider>
        {/* <OneBlockComp /> */}

        <EventSumaryComp list={eventList} isShowIcons={false} />
        <i-divider content='加载已经完成,没有其他数据'></i-divider>
        <View className='tabbar-container'>
          <TabbarComp currentTab='index' />
        </View>
      </View>
    );
  }
}

export default Index;
