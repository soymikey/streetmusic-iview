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
import SixBlockComp from '@/components/SixBlockComp/SixBlockComp';
import OneBlockComp from '@/components/OneBlockComp/OneBlockComp';
import EventSumaryComp from '@/components/eventSumaryComp/eventSumaryComp';
import LoginComp from './login/login';
import TabbarComp from '@/components/TabbarComp/TabbarComp';
import { setUserInfo } from '@/actions/user'
import { getHotEventList } from '@/api/event';
import { getHotSongList, getRecommendSongList } from '@/api/song';
import { heartCheck } from '@/utils/heartbeatjuejin'
import { myLogin } from '@/api/user';
import { goToPage } from '@/utils/tools.js';
import './index.scss';


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

      ],
      total: 0,
      pageSize: 10,
      pageNo: 1,
      loading: false,
      isShowLoginComp: true,
      themeClass: 'block',
      hotList: [],	//热门歌曲
      recommendList: [],//推荐歌曲
    };
  }
  async login() {
    myLogin().then(res => {
      this.props.setUserInfo(res.data);
    });
  }
  componentWillMount() {
    this.fetchHotEventList(true)
    this.fetchHotSongList(true)
    this.fetchRecommendList(true)

    // Taro.getSetting({
    //   success: res => {
    //     // 判断是否授权
    //     if (res.authSetting['scope.userInfo']) {
    //       this.setState({ isShowLoginComp: false })
    //       this.login()
    //       this.fetchHotEventList(true)
    //       this.fetchHotSongList(true)
    //       this.fetchRecommendList(true)
    //     } else {
    //       this.setState({ isShowLoginComp: true })
    //     }
    //   }
    // })
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentDidMount() {



  }
  componentWillUnmount() { }

  componentDidShow() {
    // Taro.onSocketMessage(res => {
    //   //收到消息
    //   console.log('我是index, 收到服务器消息', res);
    //   const data = JSON.parse(res.data)
    //   if (data.type == 'pong') {
    //     heartCheck.reset().start();
    //   } else {
    //     // 处理数据
    //   }
    // });
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
  fetchHotSongList(override) {
    Taro.showLoading({
      title: '加载中-热门歌曲',
    });
    // 向后端请求指定页码的数据
    const data = { pageSize: 6, pageNo: 1 }
    this.setState({ loading: true });
    return getHotSongList(data)
      .then(res => {
        this.setState({
          hotList: override ? res.data.list : this.state.hotList.concat(res.data.list),
          total: res.data.total, //总页数
          loading: false,
        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      })
  }
  fetchRecommendList(override) {
    Taro.showLoading({
      title: '加载中-推荐歌曲',
    });
    // 向后端请求指定页码的数据
    const data = { pageSize: 6, pageNo: 1 }
    this.setState({ loading: true });
    return getRecommendSongList(data)
      .then(res => {
        this.setState({
          recommendList: override ? res.data.list : this.state.recommendList.concat(res.data.list),
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
          this.fetchHotSongList(true)
          this.fetchRecommendList(true)
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
  goToEventDetailPage(id) {
    goToPage(`/pages/event/eventDetail/eventDetail?id=${id}`)
  }

  render() {
    const { hotEventList, isShowLoginComp, hotList, recommendList } = this.state;
    const { user } = this.props

    return (
      <View>

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
            {hotEventList.length ? hotEventList.map(item => {
              return <SwiperItem>
                <View className='image-wrapper' onClick={this.goToEventDetailPage.bind(this, item.id)}>
                  <Image src={item.poster[0]} mode='aspectFit' style='width: 100%' />

                </View>

              </SwiperItem>
            }) : null}

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
          <SixBlockComp title='推荐歌曲' list={this.state.recommendList} />
          <i-divider height={24}></i-divider>
          <SixBlockComp title='热门歌曲' list={this.state.hotList} />
          <i-divider height={24}></i-divider>
          {/* <OneBlockComp /> */}

          <EventSumaryComp list={hotEventList} isShowIcons={false} />
          <i-divider content='加载已经完成,没有其他数据'></i-divider>
          <View className='tabbar-container'>
            <TabbarComp currentTab='index' />
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
