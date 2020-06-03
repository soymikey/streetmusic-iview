import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import post1 from '@/asset/images/poster1.png';
import post2 from '@/asset/images/poster2.png';
import Tab3 from './tab3/tab3';
import Tab1 from './tab1/tab1';
import Tab2 from './tab2/tab2';
import './singer.scss';
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
    },
  };
  constructor() {
    super(...arguments);
    this.state = {
      tabList: [
        { key: 0, label: '歌曲' },
        { key: 1, label: '正在播放' },
        { key: 2, label: '动态' },
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
      currentNewsPage: 1,
      totalNewsPage: 8,
      songLists: [
        { name: '阿桑-给你的爱一直很安静', price: '12.00' },
        { name: '又是一个睡不着的夜晚', price: '12.00' },
        { name: '疯人院', price: '12.00' },
        { name: '无邪', price: '12.00' },
        { name: '罪', price: '12.00' },
        { name: '落霜', price: '12.00' },
        { name: '背对背拥抱', price: '12.00' },
        { name: '春夏秋冬失去了你', price: '12.00' },
        { name: '江南（片段版）（翻自&nbsp;梁静茹）&nbsp;', price: '12.00' },
        { name: '如果云知道', price: '12.00' },
        { name: '领悟', price: '12.00' },
        { name: '辛晓琪', price: '12.00' },
        { name: '守候·辛晓琪', price: '12.00' },
        { name: '心如刀割', price: '12.00' },
        { name: '张学友', price: '12.00' },
        { name: '友情歌', price: '12.00' },
        { name: '无地自容', price: '12.00' },
        { name: '黑豹乐队', price: '12.00' },
        { name: '黑豹', price: '12.00' },
        { name: '大海', price: '12.00' },
        { name: '张雨生', price: '12.00' },
        { name: '大海', price: '12.00' },
        { name: '原谅', price: '12.00' },
        { name: '张玉华', price: '12.00' },
        { name: '张玉华', price: '12.00' },
        { name: '水手', price: '12.00' },
        { name: '郑智化', price: '12.00' },
        { name: '私房歌', price: '12.00' },
        { name: '雨一直下', price: '12.00' },
        { name: '群星', price: '12.00' },
        { name: '大人的情歌', price: '12.00' },
        { name: '练习', price: '12.00' },
        { name: '刘德华', price: '12.00' },
        { name: '美丽的一天', price: '12.00' },
        { name: '再回首', price: '12.00' },
        { name: '姜育恒', price: '12.00' },
        { name: '多年以后·再回首', price: '12.00' },
        { name: '最熟悉的陌生人', price: '12.00' },
        { name: '萧亚轩', price: '12.00' },
        { name: '萧亚轩', price: '12.00' },
        { name: '情书', price: '12.00' },
        { name: '张学友', price: '12.00' },
        { name: '友情歌', price: '12.00' },
      ],
      songList: [],
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
      newsLists: [
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
      newsList: [],
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
    this.fetchSongList(1);
    this.fetchOrderList(1);
    this.fetchNewsList(1);
  }
  setSwiperHeight(value) {
    let height = 0;
    const query = Taro.createSelectorQuery();

    query
      .selectAll('#tab')
      .boundingClientRect(rec => {
        height = rec[value].height;
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

  componentDidShow() {}

  componentDidHide() {}
  fetchSongList(pageNo) {
    this.setState({ loading: true });
    Taro.showLoading({
      title: '加载中-歌曲',
    });
    // 向后端请求指定页码的数据
    // return getArticles(pageNo)
    //   .then(res => {
    //     this.setState({
    //       currentSongPage: pageNo, //当前的页号
    //       totalSongPage: res.pages, //总页数
    //       songList: [],
    //     });
    //   })
    //   .catch(err => {
    //     console.log('==> [ERROR]', err);
    //   })
    //   .then(() => {
    //     this.loading = false;
    //   });
    setTimeout(() => {
      this.setState(
        {
          currentSongPage: pageNo, //当前的页号
          totalSongPage: 8, //总页数
          songList: this.state.songLists.slice(0, pageNo * 2),
          loading: false,
        },
        () => {
          this.setSwiperHeight(this.state.currentTab);
        }
      );

      Taro.hideLoading();
    }, 1000);
  }
  fetchOrderList(pageNo) {
    this.setState({ loading: true });
    Taro.showLoading({
      title: '加载中-订单',
    });

    setTimeout(() => {
      this.setState(
        {
          currentOrderPage: pageNo, //当前的页号
          totalOrderPage: 8, //总页数
          orderList: this.state.orderLists.slice(0, pageNo * 10),
          loading: false,
        },
        () => {
          this.setSwiperHeight(this.state.currentTab);
        }
      );

      Taro.hideLoading();
    }, 1000);
  }
  fetchNewsList(pageNo) {
    this.setState({ loading: true });
    Taro.showLoading({
      title: '加载中-动态',
    });

    setTimeout(() => {
      this.setState(
        {
          currentNewsPage: pageNo, //当前的页号
          totalNewsPage: 8, //总页数
          newsList: this.state.newsLists.slice(0, pageNo * 10),
          loading: false,
        },
        () => {
          this.setSwiperHeight(this.state.currentTab);
        }
      );

      Taro.hideLoading();
    }, 1000);
  }

  onPullDownRefresh() {
    const { currentTab } = this.state;
    if (currentTab === 0) {
      // 上拉刷新
      if (!this.state.loading) {
        this.fetchSongList(1);
        // 处理完成后，终止下拉刷新
        Taro.stopPullDownRefresh();
      }
    }
    if (currentTab === 1) {
      if (!this.state.loading) {
        this.fetchOrderList(1);
        // 处理完成后，终止下拉刷新
        Taro.stopPullDownRefresh();
      }
    }
    if (currentTab === 2) {
      if (!this.state.loading) {
        this.fetchNewsList(1);
        // 处理完成后，终止下拉刷新
        Taro.stopPullDownRefresh();
      }
    }
  }
  onReachBottom() {
    const { currentTab } = this.state;
    if (currentTab === 0) {
      if (
        !this.state.loading &&
        this.state.currentSongPage < this.state.totalSongPage
      ) {
        this.fetchSongList(this.state.currentSongPage + 1);
      }
    }
    if (currentTab === 1) {
      if (
        !this.state.loading &&
        this.state.currentOrderPage < this.state.totalOrderPage
      ) {
        this.fetchOrderList(this.state.currentOrderPage + 1);
      }
    }
    if (currentTab === 2) {
      if (
        !this.state.loading &&
        this.state.currentNewsPage < this.state.totalNewsPage
      ) {
        this.fetchNewsList(this.state.currentNewsPage + 1);
      }
    }
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
      songList,
      orderList,
      newsList,
      loading,
    } = this.state;
    console.log(songList.length);
    const count = songList.length;
    return (
      <View className='singer'>
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
                  class='i-tags'>
                  {item}
                </i-tag>
              );
            })}
          </View>
        </View>
        <View
          className='tabs-container'
          style='position:sticky;position: -webkit-sticky;top:0;z-index: 999;'>
          <i-tabs current={currentTab} onChange={this.onChangeTab.bind(this)}>
            {tabList.map(item => {
              return (
                <i-tab
                  key={item.key}
                  title={item.label}
                  type='border'
                  count={count}></i-tab>
              );
            })}
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
          circular>
          <SwiperItem>
            <View className='tab1' id='tab'>
              <Tab1 list={songList} />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='tab2' id='tab'>
              <Tab2 list={orderList} />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='tab3' id='tab'>
              <Tab3 list={newsList} />
            </View>
          </SwiperItem>
        </Swiper>
      </View>
    );
  }
}

export default Singer;
