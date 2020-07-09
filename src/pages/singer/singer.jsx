import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import post1 from '@/asset/images/poster1.png';
import post2 from '@/asset/images/poster2.png';
import Tab3 from './tab3/tab3';
import Tab1 from './tab1/tab1';
import Tab2 from './tab2/tab2';
import FollowButtonComp from '@/components/FollowButtonComp/FollowButtonComp';

import { getUserInfo, getUserState } from '@/api/user';

import { getEventListById } from '@/api/event';
import { getSongListById } from '@/api/song';
import { createOrder, getOrderListById } from '@/api/order';
import { set } from '@/utils/localStorage';
import { heartCheck } from '@/utils/heartbeatjuejin';
import { showToastAndGoto } from '@/utils/tools.js';
import './singer.scss';

const post1_ = require('@/asset/images/poster1.png');
const post2_ = require('@/asset/images/poster2.png');

@connect(state => state)
class Singer extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '歌手详情',

    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-tag': '../../iView/tag/index',
      'i-avatar': '../../iView/avatar/index',
      'i-button': '../../iView/button/index',
      'i-icon': '../../iView/icon/index',
      'i-tabs': '../../iView/tabs/index',
      'i-tab': '../../iView/tab/index',
      'i-modal': '../../iView/modal/index',
      'i-input': '../../iView/input/index',
    },
  };
  constructor() {
    super(...arguments);
    this.state = {
      userInfo: {},
      tabList: [
        { key: 0, label: '歌曲' },
        { key: 1, label: '正在播放' },
        { key: 2, label: '活动' },
      ],
      tagList: ['15后', 'Lv.6', '北京', '白羊座'],
      colorList: ['blue', 'green', 'red', 'yellow', 'default'],
      currentTab: 0,
      iconList: ['like', 'share', 'document', 'collection'],
      swiperHeight: 0,
      loading: false,
      currentSongPage: 1,
      totalSongPage: 8,
      currentOrderPage: 1,
      totalOrderPage: 8,
      currentEventsPage: 1,
      totalEventsPage: 8,

      orderLists: [
        { name: '阿桑-给你的爱一直很安静', price: '12.00' },
        { name: '疯人院', price: '12.00' },
        { name: '罪', price: '12.00' },
        { name: '背对背拥抱', price: '12.00' },
        { name: '江南（片段版）（翻自&nbsp;梁静茹）&nbsp;', price: '12.00' },
        { name: '领悟', price: '12.00' },
        { name: '守候·辛晓琪', price: '12.00' },
        { name: '张学友', price: '12.00' },
        { name: '无地自容', price: '12.00' },
        { name: '黑豹', price: '12.00' },
        { name: '张雨生', price: '12.00' },
        { name: '原谅', price: '12.00' },
        { name: '张玉华', price: '12.00' },
        { name: '水手', price: '12.00' },
        { name: '郑智化', price: '12.00' },
        { name: '私房歌', price: '12.00' },
      ],
      orderList: [],

      //活动分页
      eventPageSize: 10,
      eventPageNo: 1,
      eventList: [],
      eventTotal: 0,
      loading: false,
      //歌曲分页
      songPageSize: 10,
      songPageNo: 1,
      songList: [],
      songTotal: 0,
      //歌曲分页

      orderListList: [],
      orderListTotal: 0,
      isShowModal: false,
      content: '', //留言内容
      selectedSong: {},
    };
  }
  iconHandler(icon) {
    const index = this.state.iconList.findIndex(item => item === icon);
    const newIcon =
      icon.indexOf('_fill') === -1 ? icon + '_fill' : icon.split('_fill')[0];
    // this.state.iconList.splice(index, 1, newIcon);
    // console.log(this.state.iconList);
    this.state.iconList.splice(index, 1, newIcon);
    this.setState({ iconList: this.state.iconList });
  }
  onChangeTab(e) {
    const value = e.detail.key;
    this.setSwiperHeight(value);
    this.setState({ currentTab: value });
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.fetchUserDetail(true);
      this.fetchSongList(true);
      this.fetchOrderList();
      this.fetchEventList(true);
    }
  }
  setSwiperHeight(value) {
    let height = 0;
    const query = Taro.createSelectorQuery();

    query
      .selectAll('#tab')
      .boundingClientRect(rec => {
        height = rec[value].height + 48;
        this.setState({ swiperHeight: height });
      })
      .exec();
  }
  onChangeSwiper(e) {
    const value = e.detail.current;
    this.setSwiperHeight(value);
    this.setState({ currentTab: value });
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  fetchUserDetail() {
    getUserInfo({ id: this.$router.params.id }).then(res => {
      this.setState({ userInfo: res.data });
    });
  }
  fetchSongList(override) {
    Taro.showLoading({
      title: '加载中-歌曲',
    });
    // 向后端请求指定页码的数据
    const data = {
      id: this.$router.params.id,
      pageSize: this.state.songPageSize,
      pageNo: this.state.songPageNo,
    };

    return getSongListById(data)
      .then(res => {
        if (override) {
          this.setSwiperHeight(0);
        }
        this.setState({
          songList: override
            ? res.data.list
            : this.state.songList.concat(res.data.list),
          songTotal: res.data.total, //总页数
          loading: false,
        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      });
  }
  fetchOrderList() {
    Taro.showLoading({
      title: '加载中-订单',
    });
    // 向后端请求指定页码的数据
    const data = { id: this.$router.params.id, pageSize: 50, pageNo: 1 };

    return getOrderListById(data)
      .then(res => {
        this.setState({
          orderList: res.data.list,
          loading: false,
        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      });
  }

  fetchEventList(override) {
    Taro.showLoading({
      title: '加载中-活动',
    });
    // 向后端请求指定页码的数据
    const data = {
      id: this.$router.params.id,
      pageSize: this.state.eventPageSize,
      pageNo: this.state.eventPageNo,
    };
    return getEventListById(data)
      .then(res => {
        console.log('res.data', res.data);
        for (const item of res.data.list) {
          item.poster = JSON.parse(item.poster);
        }
        this.setState({
          eventList: override
            ? res.data.list
            : this.state.songList.concat(res.data.list),
          eventTotal: res.data.total, //总页数
          loading: false,
        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      });
  }

  onOpenModal(song) {
    this.setState({ isShowModal: true, selectedSong: song });
  }

  onPullDownRefresh() {
    const { currentTab } = this.state;
    if (currentTab === 0) {
      // 上拉刷新
      if (!this.state.loading) {
        this.setState({ songPageNo: 1 }, () => {
          this.fetchSongList(true).then(res => {
            // 处理完成后，终止下拉刷新
            Taro.stopPullDownRefresh();
          });
        });
      }
    }
    if (currentTab === 1) {
      if (!this.state.loading) {
        this.fetchOrderList().then(res => {
          // 处理完成后，终止下拉刷新
          Taro.stopPullDownRefresh();
        });
      }
    }
    if (currentTab === 2) {
      if (!this.state.loading) {
        this.setState({ eventPageNo: 1 }, () => {
          this.fetchEventList(true).then(res => {
            // 处理完成后，终止下拉刷新
            Taro.stopPullDownRefresh();
          });
        });
      }
    }
  }
  onReachBottom() {
    const { currentTab } = this.state;
    if (currentTab === 0) {
      if (!this.state.loading && this.state.songPageNo < this.state.songTotal) {
        this.setState({ songPageNo: this.state.songPageNo + 1 }, () => {
          this.fetchSongList();
        });
      }
    }
    if (currentTab === 1) {
      // if (
      //   !this.state.loading &&
      //   this.state.currentOrderPage < this.state.totalOrderPage
      // ) {
      //   this.fetchOrderList(this.state.currentOrderPage + 1);
      // }
    }
    if (currentTab === 2) {
      if (!this.state.loading && this.state.eventPageNo < this.state.eventTotal) {
        this.setState({ eventPageNo: this.state.eventPageNo + 1 }, () => {
          this.fetchEventList();
        });
      }
    }
  }

  //关注
  onClickFollow(value) {
    this.state.userInfo.followed = value;
    this.setState({ userInfo: this.state.userInfo });
  }
  onConfirmComment(e) {
    if (e.detail.index === 0) {
      this.setState({ isShowModal: false });
    } else {
      if (!this.state.selectedSong.id) {
        Taro.showToast({ title: '请选择歌曲', icon: 'none' });
        return;
      }
      const data = {
        songId: this.state.selectedSong.id,
        price: this.state.selectedSong.price,
        name: this.state.selectedSong.name,
        comment: this.state.content,
        singerId: this.$router.params.id,
      };
      createOrder(data).then(res => {
        this.setState({ isShowModal: false });
        console.log('准备发送toArtist');
        Taro.sendSocketMessage({
          data: JSON.stringify({
            type: 'createOrderOK',
            id: this.$router.params.id,
          }),
        });
        setTimeout(() => {
          this.fetchOrderList();
        }, 2000);
      });
    }
  }

  handleContent(e) {
    this.setState({ content: e.detail.detail.value });
  }
  componentDidShow() {
    const { path, params } = this.$router;
    set('page', path + '?id=' + params.id);
    if (!this.props.user.id) {
      showToastAndGoto({ title: '请登录', url: '/pages/user/user' });
      return;
    }
    Taro.sendSocketMessage({
      data: JSON.stringify({
        type: 'join',
        roomId: params.id + '@@@' + this.props.user.id,
      }),
    });
    Taro.onSocketMessage(res => {
      //收到消息
      console.log('我的歌手, 收到服务器消息', res);
      const data = JSON.parse(res.data);
      if (data.type == 'pong') {
        heartCheck.reset().start();
      } else if (data.type === 'goFetchUserState') {
        console.log('我是歌手页面 收到 fetchUserState请求');
        getUserState({ id: this.$router.params.id }).then(res => {
          this.state.userInfo.state = res.data.state;
          this.setState({ userInfo: this.state.userInfo });
        });
        // 处理数据
      } else if (data.type === 'goFetchOrderList') {
        console.log('我是歌手页面 收到 fetchOrderList请求');
        this.fetchOrderList();
      }
    });
  }
  componentDidHide() {
    Taro.sendSocketMessage({
      data: JSON.stringify({
        type: 'unJoin',
        roomId: this.$router.params.id + '@@@' + this.props.user.id,
      }),
    });
  }

  render() {
    const {
      tagList,
      colorList,
      tabList,
      currentTab,
      iconList,
      swiperHeight,
      scrollTop,
      orderList,
      loading,
      eventList,
      eventTotal,
      songList,
      songTotal,
      orderListList,
      orderListTotal,
      isShowModal,
      followed,
      userInfo,
    } = this.state;
    return (
      <View className='singer'>
        <i-modal
          title='留言'
          actions={[
            {
              name: '取消',
            },
            {
              name: '确定',
              color: '#2d8cf0',
              loading: false,
            },
          ]}
          visible={isShowModal}
          onClick={this.onConfirmComment.bind(this)}
        >
          <View>
            <i-input
              placeholder='请输入你的留言...'
              value={content}
              maxlength={50}
              onChange={this.handleContent.bind(this)}
              type='textarea'
            />
          </View>
        </i-modal>
        <View className='full-background'></View>

        <View className='singer-info'>
          <View class='background'>
            <Image
              mode='aspectFill'
              src={userInfo.avatar}
              style='width: 100%;height: 100%;'
            />
          </View>
          <i-row i-class='row-top'>
            <i-col span='16' i-class='row-top-col'>
              <i-avatar src={userInfo.avatar} size='large' />
            </i-col>
            <i-col span='5' i-class='row-top-col'>
              <FollowButtonComp
                onClickFollow_={this.onClickFollow.bind(this)}
                followed={userInfo.followed}
                userId={this.$router.params.id}
              ></FollowButtonComp>
            </i-col>
            <i-col span='1' i-class='row-top-col'>
              <i-icon size={40} type='message' />
            </i-col>
          </i-row>
          <i-row i-class='row-name'>
            <i-col span='18' i-class='col-class username ellipsis'>
              <Text>{userInfo.nickName}</Text>
            </i-col>
            <i-col span='6' i-class='col-class state'>
              <Text className='title'>状态:</Text>
              <Text className='content'>
                {userInfo.state === '0'
                  ? '下线'
                  : userInfo.state === '1'
                  ? '上线'
                  : '休息中'}
              </Text>
            </i-col>
          </i-row>

          <i-row i-class='row-followers-fans'>
            <i-col span='8' i-class='col-class'>
              关注:23423
            </i-col>
            <i-col span='8' i-class='col-class'>
              粉丝:4324
            </i-col>
          </i-row>
          <View className='tag-container'>
            {tagList.map(item => {
              return (
                <i-tag
                  key={item}
                  color={colorList[Math.floor(Math.random() * 6)]}
                  class='i-tags'
                >
                  {item}
                </i-tag>
              );
            })}
          </View>
        </View>
        <View
          className='tabs-container'
          style='position:sticky;position: -webkit-sticky;top:0;z-index: 999;'
        >
          <i-tabs current={currentTab} onChange={this.onChangeTab.bind(this)}>
            <i-tab key={0} title='歌曲' type='border' count={songTotal}></i-tab>
            <i-tab key={1} title='正在播放' type='border'></i-tab>
            <i-tab key={2} title='活动' type='border'></i-tab>
          </i-tabs>
        </View>
        <Swiper
          style={'height:' + swiperHeight + 'px;background-color:#fff;'}
          current={currentTab}
          id='swiper'
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          onChange={this.onChangeSwiper.bind(this)}
          circular
        >
          <SwiperItem>
            <View className='tab1' id='tab'>
              <Tab1
                list={songList}
                onOpenModal_={this.onOpenModal.bind(this)}
                userState={userInfo.state}
              />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='tab2' id='tab'>
              <Tab2 list={orderList} />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='tab3' id='tab'>
              <Tab3 list={eventList} />
            </View>
          </SwiperItem>
        </Swiper>
      </View>
    );
  }
}

export default Singer;
