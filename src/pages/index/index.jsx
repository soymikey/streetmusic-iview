import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux'

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
import post1 from '@/asset/images/poster1.png';
import post2 from '@/asset/images/poster2.png';
import SixBlockComp from '@/components/SixBlockComp/SixBlockComp';
import OneBlockComp from '@/components/OneBlockComp/OneBlockComp';
import EventSumaryComp from '@/components/eventSumaryComp/eventSumaryComp';
import TabbarComp from '@/components/TabbarComp/TabbarComp';
import { setUserInfo } from '@/actions/user'
import { getHotEventList } from '@/api/event';
import { heartCheck } from '@/utils/heartbeatjuejin'

import './index.scss';

const post1_ = require('@/asset/images/poster1.png');
const post2_ = require('@/asset/images/poster2.png');

@connect(state => state, { setUserInfo })


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
      canIUse: Taro.canIUse('button.open-type.getUserInfo'),
      hotEventList: [
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
      total: 0,
      pageSize: 1,
      pageNo: 1,
      loading: false,
    };
  }


  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentDidMount() {

    this.fetchHotEventList(true)
    // 查看是否授权
    // Taro.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       Taro.getUserInfo({
    //         success: function (res) {
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
  }
  componentWillUnmount() { }

  componentDidShow() {
    Taro.onSocketMessage(res => {
      //收到消息
      console.log('我是index, 收到服务器消息', res);
      const data = JSON.parse(res.data)
      if (data.type == 'pong') {

        heartCheck.reset().start();
      } else {
        // 处理数据
      }
    });
  }
  fetchHotEventList(override) {
    Taro.showLoading({
      title: '加载中-活动',
    });
    // 向后端请求指定页码的数据
    const data = { pageSize: this.state.pageSize, pageNo: this.state.pageNo }
    this.setState({ loading: true });
    return getHotEventList(data)
      .then(res => {
        for (const item of res.data.list) {
          item.poster = JSON.parse(item.poster)
        }
        this.setState({
          hotEventList: override ? res.data.list : this.state.hotEventList.concat(res.data.list),
          total: res.data.total, //总页数
          loading: false,
        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      })
  }

  componentDidHide() { }
  clickHandler() {
    console.log('clicked');
  }
  onPullDownRefresh() {
    if (!this.state.loading) {
      this.setState({ pageNo: 1 }, () => {
        this.fetchHotEventList(true).then(res => {
          // 处理完成后，终止下拉刷新
          Taro.stopPullDownRefresh();
        });
      });


    }
  }
  onReachBottom() {
    if (
      !this.state.loading &&
      this.state.pageNo < this.state.total
    ) {
      this.setState({ pageNo: this.state.pageNo + 1 }, () => {
        this.fetchHotEventList();
      });
    }
  }

  render() {
    const { hotEventList, canIUse } = this.state;
    const { user } = this.props
    return (
      <View className='index pb50px'>
        <Swiper
          style='height:250px;'
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <Image src={post1} mode='aspectFit' style='width: 100%' />
          </SwiperItem>
          <SwiperItem>
            <Image src={post2} mode='aspectFit' style='width: 100%' />
          </SwiperItem>
          <SwiperItem>
            <Image src={post1} mode='aspectFit' style='width: 100%' />
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

        <EventSumaryComp list={hotEventList} isShowIcons={false} />
        <i-divider content='加载已经完成,没有其他数据'></i-divider>
        <View className='tabbar-container'>
          <TabbarComp currentTab='index' />
        </View>
      </View>
    );
  }
}

export default Index;
