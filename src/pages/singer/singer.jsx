import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import post1 from '@/asset/images/poster1.png';
import Tab1 from './tab1/tab1';
import './singer.scss';

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
        { key: 0, label: '选项1' },
        { key: 1, label: '选项2' },
        { key: 2, label: '选项3' },
      ],
      tagList: ['15后', 'Lv.6', '北京', '白羊座'],
      colorList: ['blue', 'green', 'red', 'yellow', 'default'],
      currentTab: 2,
      iconList: ['like', 'share', 'document', 'collection'],
      swiperHeight: 0,
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
    this.setSwiperHeight(this.state.currentTab);
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

  render() {
    const {
      tagList,
      colorList,
      tabList,
      currentTab,
      iconList,
      swiperHeight,
      scrollTop,
    } = this.state;

    return (
      <View className='singer'>
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
                  count='3'></i-tab>
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
              <Tab1 />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='tab2' id='tab'>
              2
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='tab3' id='tab'>
              3
            </View>
          </SwiperItem>
        </Swiper>
      </View>
    );
  }
}

export default Singer;
