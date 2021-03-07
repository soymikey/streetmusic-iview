import Taro, { Component, onBLECharacteristicValueChange } from '@tarojs/taro';

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
import EventSumaryComp from '@/components/eventSumaryComp/eventSumaryComp';
import TabbarComp from '@/components/TabbarComp/TabbarComp';
import { getHotEventList } from '@/api/event';
import { getHotSingerList, getRecommendSongList } from '@/api/song';
import { getMyOpenid } from '@/api/user';
import { goToPage } from '@/utils/tools.js';
import { get, set, clear, remove } from '@/utils/localStorage';
import eventPoster from '@/asset/images/posters/eventPoster.jpg';

import './index.scss';

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
      "i-message": "../../iView/message/index",
      'i-modal': '../../iView/modal/index',
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
      path: ''

    };
  }

  componentWillMount() {
    // goToPage(`/pages/singer/singer?id=oUf6_4hX68zrrbvSKwFCNadg-OMU`)
    this.fetchHotEventList(true)
    this.fetchHotSongList(true)
    this.fetchRecommendList(true)
    if (this.$router.params.q) {
      let qrUrl = decodeURIComponent(this.$router.params.q)
      let id = qrUrl.split('id=')[1]
      goToPage(`/pages/singer/singer?id=${id}`)

    }


  }

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
        this.setState({ loading: false })
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
    return getHotSingerList(data)
      .then(res => {
        this.setState({
          hotList: override ? res.data.list : this.state.hotList.concat(res.data.list),
          total: res.data.total, //总页数
          loading: false,
        });
      })
      .catch(err => {
        this.setState({ loading: false })
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
        this.setState({ loading: false })
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
    const { hotEventList, isShowLoginComp, hotList, recommendList, path } = this.state;
    return (
      <View>
        <i-message id="message" />


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
            {hotEventList.length ? hotEventList.slice(0, 5).map(item => {
              return <SwiperItem key={item.id} >
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
          <i-divider i-class='divider' height={24}></i-divider>
          <SixBlockComp title='推荐歌曲' type='recommend' list={this.state.recommendList} />
          <i-divider i-class='divider' height={24}></i-divider>
          <SixBlockComp title='热门歌手' type='hot' list={this.state.hotList} />
          <i-divider i-class='divider' height={24}></i-divider>
          <EventSumaryComp list={hotEventList} isShowIcons={false} />
          <i-divider i-class='divider' content='加载已经完成,没有其他数据'></i-divider>
          <View className='tabbar-container'>
            <TabbarComp currentTab='index' />
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
