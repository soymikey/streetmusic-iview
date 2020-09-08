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
import LoginComp from './login/login';
import TabbarComp from '@/components/TabbarComp/TabbarComp';
import { setUserInfo } from '@/actions/user'
import { getHotEventList } from '@/api/event';
import { heartCheck } from '@/utils/heartbeatjuejin'
import { myLogin } from '@/api/user';
import { goToPage } from '@/utils/tools.js';

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
      pageSize: 10,
      pageNo: 1,
      loading: false,
      isShowLoginComp: true,
      themeClass: 'block',
      hotList: ['栏目1', '栏目2', '栏目3', '栏目4']	//初始化推荐列表
    };
  }
  async login() {
    myLogin().then(res => {
      this.props.setUserInfo(res.data);
    });
  }
  componentWillMount() {
    Taro.getSetting({
      success: res => {
        // 判断是否授权
        if (res.authSetting['scope.userInfo']) {
          this.setState({ isShowLoginComp: false })
          this.login()
          this.fetchHotEventList(true)
        } else {
          this.setState({ isShowLoginComp: true })
        }
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentDidMount() {



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
      console.log('onPullDownRefresh')
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
      this.state.pageNo * this.state.pageSize < this.state.total
    ) {
      this.setState({ pageNo: this.state.pageNo + 1 }, () => {
        this.fetchHotEventList();
      });
    }
  }
  goToSearch() {
    goToPage('/pages/index/search/search')
  }

  render() {
    const { hotEventList, isShowLoginComp, } = this.state;
    const { user } = this.props
    console.log('isShowLoginComp', isShowLoginComp)
    return (
      <View>
        {isShowLoginComp ? <LoginComp /> :
          <View className='index pb50px'>
            <View className='search-wrapper'>

              <View className="search" onClick={this.goToSearch.bind(this)} >
                <Input maxLength="20" type="text" placeholder="请输入关键词搜索" />
                <Image src={require("./static/search.svg")} mode="aspectFit" className="search-left-icon"></Image>
              </View>

            </View>
            <Swiper
              style='height:250px;'
              className='swiper'
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
            {/* 未开启功能 */}
            {/* <i-row i-class='sub-cate'>
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
            </i-row> */}
            <i-divider height={24}></i-divider>
            <SixBlockComp title='推荐歌曲' />
            <i-divider height={24}></i-divider>
            <SixBlockComp title='热门歌曲' />
            <i-divider height={24}></i-divider>
            {/* <OneBlockComp /> */}

            <EventSumaryComp list={hotEventList} isShowIcons={false} />
            <i-divider content='加载已经完成,没有其他数据'></i-divider>
            <View className='tabbar-container'>
              <TabbarComp currentTab='index' />
            </View>
          </View>
        } </View>
    );
  }
}

export default Index;
