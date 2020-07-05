import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Swiper, SwiperItem, Image } from '@tarojs/components';
import { getEventDetailById, getHotEventList } from '@/api/event';
import { getCommentList } from '@/api/common';

import post1 from '@/asset/images/poster1.png';
import post2 from '@/asset/images/poster2.png';
import OneBlockComp from '@/components/OneBlockComp/OneBlockComp';
import EventSumaryComp from '@/components/eventSumaryComp/eventSumaryComp';
import CommentSumaryComp from '@/components/commentSumaryComp/commentSumaryComp';
import CommentBarComp from '@/components/commentBarComp/commentBarComp';
import './eventDetail.scss';

const post1_ = require('@/asset/images/poster1.png');
const post2_ = require('@/asset/images/poster2.png');

class EventDetail extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '活动页面',
    usingComponents: {
      'i-row': '../../../iView/row/index',
      'i-col': '../../../iView/col/index',
      'i-divider': '../../../iView/divider/index',
      'i-tag': '../../../iView/tag/index',
      'i-icon': '../../../iView/icon/index',
      'i-avatar': '../../../iView/avatar/index',
    },
  };
  constructor() {
    super(...arguments);
    this.state = {
      list: [post1, post2],
      tagList: [
        '摇滚',
        '流行',
        '爵士',
        '民谣',
        '原创音乐',
        '翻唱',
        '轻音乐',
        '古典音乐',
        '民乐',
      ],
      name: '',
      introduction: '',
      date: '',
      startTime: '',
      endTime: '',
      address: '',
      poster: [],
      provinceCityRegion: { code: [], value: [] },
      avatar: '', nickName: '',
      iconList: ['like', 'share', 'document', 'collection'],
      commentList: [
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
      hotEventList: [],
      loading: false,
      pageSize: 10,
      pageNo: 1,
      total: 0,
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
  getEventDetail() {
    getEventDetailById({ id: this.$router.params.id }).then(res => {
      const { address,
        city,
        cityCode,
        date,
        endTime,
        introduction,
        name,
        poster,
        province,
        provinceCode,
        region,
        regionCode,
        startTime,
        avatar, nickName,
      } = res.data
      let poster_ = []
      if (JSON.parse(poster).length) {
        poster_ = JSON.parse(poster).map(item => { return { url: item } })
      }
      this.setState({
        avatar, nickName,
        name,
        introduction,
        date,
        startTime,
        endTime,
        address,
        poster: poster_,
        provinceCityRegion: {
          code: [provinceCode,
            cityCode,
            regionCode,], value: [
              province,
              city,
              region,]
        },
      })
    })
  }

  // 热门活动
  fetchHotEventList() {
    Taro.showLoading({
      title: '加载中-活动',
    });
    // 向后端请求指定页码的数据
    const data = { pageSize: 5, pageNo: 1 }

    return getHotEventList(data)
      .then(res => {
        for (const item of res.data.list) {
          item.poster = JSON.parse(item.poster)
        }
        this.setState({
          hotEventList: res.data.list,

        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      })
  }
  // 留言列表
  fetchCommentList(override) {
    Taro.showLoading({
      title: '加载中-留言',
    });
    // 向后端请求指定页码的数据
    // 向后端请求指定页码的数据
    const data = { pageSize: this.state.pageSize, pageNo: this.state.pageNo, id: this.$router.params.id }
    this.setState({ loading: true });

    return getCommentList(data)
      .then(res => {

        this.setState({
          commentList: override ? res.data.list : this.state.commentList(res.data.list),
          total: res.data.total,
          loading: false
        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      })
  }
  init() {
    this.getEventDetail()//活动详情
    this.fetchHotEventList()//热门推荐活动
    this.fetchCommentList(true).then(res => {
      // 处理完成后，终止下拉刷新
      Taro.stopPullDownRefresh();
    })//留言列表
  }
  componentWillMount() {
    this.init()
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onPullDownRefresh() {

    this.init();


  }
  onReachBottom() {
    if (
      !this.state.loading &&
      this.state.pageNo < this.state.total
    ) {
      this.setState({ pageNo: this.state.pageNo + 1 }, () => {
        this.fetchCommentList();
      });
    }
  }
  render() {
    const { list, hotEventList, tagList, iconList, commentList, name,
      introduction,
      date,
      startTime,
      endTime,
      address,
      poster,
      avatar, nickName,
      provinceCityRegion, } = this.state;
    return (
      <View className='eventDetail'>
        <Swiper
          style='height:250px;'
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          {poster.map(item => {
            return (
              <SwiperItem key={item.url}>
                <Image src={item.url} mode='aspectFit' style='width: 100%' />
              </SwiperItem>
            );
          })}
        </Swiper>
        <View className='info-container'>
          <i-row i-class='title-row'>
            <i-col span='24' i-class='col-class'>
              <View class='title ellipsis'>
                <Text>
                  {name}
                </Text>
              </View>
            </i-col>
          </i-row>
          {/* <i-row i-class='sub-title-row'>
            <i-col span='12' i-class='col-class'>
              <View class='sub-title'>
                <Text>发布:2019-10-02</Text>
              </View>
            </i-col>
            <i-col span='12' i-class='col-class'>
              <View class='sub-title'>
                <Text>播放:342423</Text>
              </View>
            </i-col>
          </i-row> */}
          <View class='time-title'>
            <Text>活动时间</Text>
          </View>
          <i-row i-class='time'>
            <i-col span='24' i-class='col-class'>
              <View >
                <Text>{date.slice(0, 10)}<Text decode="true">&nbsp;</Text>{startTime.slice(0, 5)}
                  <Text decode="true">&nbsp;</Text>
                到<Text decode="true">&nbsp;</Text>{date.slice(0, 10)}<Text decode="true">&nbsp;</Text>{endTime.slice(0, 5)}</Text>
              </View>
            </i-col>

          </i-row>
          <View class='address-title'>
            <Text>活动地址</Text>
          </View>
          <i-row i-class='address'>
            <i-col span='24' i-class='col-class'>
              <View >
                <Text>{provinceCityRegion.value[0]}-{provinceCityRegion.value[1]}-{provinceCityRegion.value[2]}-{address}</Text>
              </View>
            </i-col>

          </i-row>
          <View class='introduction-title'>
            <Text>活动介绍</Text>
          </View>
          <i-row i-class='introduction'>
            <i-col span='24' i-class='col-class'>
              <View >
                <Text>{introduction}</Text>
              </View>
            </i-col>

          </i-row>

          <View className='tag-container'>
            {tagList.map(item => {
              return (
                <i-tag key={item} class='i-tags'>
                  {item}
                </i-tag>
              );
            })}
          </View>
          <i-row i-class='icon-row'>
            {iconList.map(item => {
              return (
                <i-col key={item} span='6' i-class='col-class icon-wrapper'>
                  {/* <i-icon size={30} type='like_fill' /> */}
                  <View onClick={this.iconHandler.bind(this, item)}>
                    <i-icon size={30} type={item} />
                  </View>
                  <View className='number'>
                    <Text>32423</Text>
                  </View>
                </i-col>
              );
            })}
          </i-row>
          <i-divider height={10} />
          <i-row i-class='user-row'>
            <i-col span='20' i-class='col-class'>
              <i-avatar
                src={avatar}
                size='large'
              />
              <Text className='username'>{nickName}</Text>
            </i-col>
            <i-col span='4' i-class='col-class follow-col'>
              <Button size='mini' className='error'>
                关注
              </Button>
            </i-col>
          </i-row>
        </View>
        <i-row i-class='recommend-row'>
          <i-col span='6' i-class='col-class'>
            <View className='recommend-title'>
              <Text>相关推荐</Text>
            </View>
          </i-col>
        </i-row>
        <View className='EventSumaryCompWrapper'>
          <EventSumaryComp list={hotEventList} isShowIcons={false} />
        </View>

        <i-row i-class='recommend-row'>
          <i-col span='6' i-class='col-class'>
            <View className='recommend-title'>
              <Text>相关评论</Text>
            </View>
          </i-col>
        </i-row>
        <View className='CommentSumaryCompWrapper'>
          <CommentSumaryComp list={commentList} />
        </View>
        <i-divider content='加载已经完成,没有其他数据'></i-divider>
        <View className='commentBarComp-wrapper'>
          <CommentBarComp id_={this.$router.params.id} type={1} />
        </View>
      </View>
    );
  }
}

export default EventDetail;