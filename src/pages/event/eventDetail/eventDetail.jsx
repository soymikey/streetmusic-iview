import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Swiper, SwiperItem, Image } from '@tarojs/components';

import post1 from '@/asset/images/poster1.png';
import post2 from '@/asset/images/poster2.png';
import OneBlockComp from '@/components/OneBlockComp/OneBlockComp';
import EventSumaryComp from '@/components/eventSumaryComp/eventSumaryComp';
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
      iconList: ['like', 'share', 'document', 'collection'],
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
  iconHandler(icon) {
    const index = this.state.iconList.findIndex(item => item === icon);
    const newIcon =
      icon.indexOf('_fill') === -1 ? icon + '_fill' : icon.split('_fill')[0];
    // this.state.iconList.splice(index, 1, newIcon);
    // console.log(this.state.iconList);
    this.state.iconList.splice(index, 1, newIcon);
    this.setState({ iconList: this.state.iconList });
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { list, tagList, iconList, eventList } = this.state;
    return (
      <View className='eventDetail'>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          {list.map(item => {
            return (
              <SwiperItem key={item}>
                <Image src={item} style='width: 100%' />
              </SwiperItem>
            );
          })}
        </Swiper>
        <View className='info-container'>
          <i-row i-class='title-row'>
            <i-col span='24' i-class='col-class'>
              <View class='title ellipsis'>
                <Text>
                  当邓超喊出蓝莲花的时候
                  我无耻ellipsisellipsisellipsisellipsisellipsisellipsis的笑了
                </Text>
              </View>
            </i-col>
          </i-row>
          <i-row i-class='sub-title-row'>
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
                src='https://i.loli.net/2017/08/21/599a521472424.jpg'
                size='large'
              />
              <Text className='username'>hwllow world</Text>
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
        <i-divider height={10} />
        <View className='EventSumaryCompWrapper'>
          <EventSumaryComp list={eventList} isShowIcons={false} />
        </View>
      </View>
    );
  }
}

export default EventDetail;
