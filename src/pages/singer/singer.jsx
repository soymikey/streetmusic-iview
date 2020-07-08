import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import post1 from '@/asset/images/poster1.png';
import post2 from '@/asset/images/poster2.png';
import Tab3 from './tab3/tab3';
import Tab1 from './tab1/tab1';
import Tab2 from './tab2/tab2';

import './singer.scss';
import { getEventListById } from '@/api/event';
import { getSongListById } from '@/api/song';
import { createOrder, getOrderListById } from '@/api/order';
import { set } from '@/utils/localStorage';

const post1_ = require('@/asset/images/poster1.png');
const post2_ = require('@/asset/images/poster2.png');

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
      'i-input': '../../iView/input/index'
    },
  };
  constructor() {
    super(...arguments);
    this.state = {
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
      content: '',//留言内容
      selectedSong: {}
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
    this.fetchSongList(true);
    this.fetchOrderList();
    this.fetchEventList(true);
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

  componentWillUnmount() { }

  componentDidShow() {
    const {path,params}=this.$router
   set('page',path+'?id='+params.id)
  }

  componentDidHide() { }
  fetchSongList(override) {
    Taro.showLoading({
      title: '加载中-歌曲',
    });
    // 向后端请求指定页码的数据
    const data = { id: this.$router.params.id, pageSize: this.state.songPageSize, pageNo: this.state.songPageNo }

    return getSongListById(data)
      .then(res => {
        if (override) {
          this.setSwiperHeight(0);
        }
        this.setState({
          songList: override ? res.data.list : this.state.songList.concat(res.data.list),
          songTotal: res.data.total, //总页数
          loading: false,
        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      })
  }
  fetchOrderList() {
    Taro.showLoading({
      title: '加载中-订单',
    });
    // 向后端请求指定页码的数据
    const data = { id: this.$router.params.id, pageSize: 50, pageNo: 1 }

    return getOrderListById(data)
      .then(res => {

        this.setState({
          orderList: res.data.list,
          loading: false,
        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      })
  }

  fetchEventList(override) {
    Taro.showLoading({
      title: '加载中-活动',
    });
    // 向后端请求指定页码的数据
    const data = { id: this.$router.params.id, pageSize: this.state.eventPageSize, pageNo: this.state.eventPageNo }
    return getEventListById(data)
      .then(res => {
        console.log('res.data', res.data)
        for (const item of res.data.list) {
          item.poster = JSON.parse(item.poster)
        }
        this.setState({
          eventList: override ? res.data.list : this.state.songList.concat(res.data.list),
          eventTotal: res.data.total, //总页数
          loading: false,
        });
      })
      .catch(err => {

        console.log('==> [ERROR]', err);
      })
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
      if (
        !this.state.loading &&
        this.state.songPageNo < this.state.songTotal
      ) {
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

      if (
        !this.state.loading &&
        this.state.eventPageNo < this.state.eventTotal
      ) {
        this.setState({ eventPageNo: this.state.eventPageNo + 1 }, () => {
          this.fetchEventList();
        });
      }
    }
  }

  onConfirmComment(e) {
    if (e.detail.index === 0) {
      this.setState({ isShowModal: false });
    } else {
      if (!this.state.selectedSong.id) {
        Taro.showToast({ title: '请选择歌曲', icon: 'none' })
        return
      }
      const data = {
        songId: this.state.selectedSong.id,
        price: this.state.selectedSong.price,
        name: this.state.selectedSong.name,

        comment: this.state.content,
        singerId: this.$router.params.id
      }
      createOrder(data).then(res => {
        this.setState({ isShowModal: false });
        console.log('准备发送toSinger')
        Taro.sendSocketMessage({
          data: JSON.stringify({ type: 'toSinger', msg: 'fetchOrderList', id: this.$router.params.id })
        });
        setTimeout(() => {
          this.fetchOrderList()
        }, 2000);
      })
    }
  }
  handleContent(e) {
    this.setState({ content: e.detail.detail.value });
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
      isShowModal
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
            <Image mode='aspectFill' src={post1} style='width: 100%;height: 100%;' />
          </View>
          <i-row i-class='row-top'>
            <i-col span='17' i-class='col-class'>
              <i-avatar
                src='https://i.loli.net/2017/08/21/599a521472424.jpg'
                size='large'
              />
            </i-col>
            <i-col span='4' i-class='col-class'>
              <Text className='follow-button'>+ 关注</Text>
            </i-col>
            <i-col span='3' i-class='col-class'>
              <i-icon size={40} type='message' />
            </i-col>
          </i-row>
          <i-row i-class='row-name'>
            <i-col span='16' i-class='col-class username ellipsis'>
              <Text>冷血刺客的三碗面</Text>
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
              <Tab1 list={songList}
                onOpenModal_={this.onOpenModal.bind(this)}
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
