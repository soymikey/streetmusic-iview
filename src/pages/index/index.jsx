import Taro, { Component } from '@tarojs/taro';

import { View, Button, Text, Swiper, SwiperItem, Image } from '@tarojs/components';
import { toolbox } from '@/utils/tools.js';
import { getUserInfo } from '@/api/user';
import post1 from '@/asset/images/poster1.png';
import post2 from '@/asset/images/poster2.png';
import SixBlockComp from '@/components/SixBlockComp/SixBlockComp';
import OneBlockComp from '@/components/OneBlockComp/OneBlockComp';
import './index.scss';

class Index extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-divider': '../../iView/divider/index',
      // 'i-action-sheet': '../../iView/action-sheet/index',
      // 'i-alert': '../../iView/alert/index',
      // 'i-avatar': '../../iView/avatar/index',
      // 'i-badge': '../../iView/badge/index',
      // 'i-button': '../../iView/button/index',
      // 'i-card': '../../iView/card/index',
      // 'i-cell': '../../iView/cell/index',
      // 'i-cell-group': '../../iView/cell-group/index',
      // 'i-checkbox': '../../iView/checkbox/index',
      // 'i-checkbox-group': '../../iView/checkbox-group/index',
      // 'i-col': '../../iView/col/index',
      // 'i-collapse': '../../iView/collapse/index',
      // 'i-collapse-item': '../../iView/collapse-item/index',
      // 'i-count-down': '../../iView/count-down/index',
      // 'i-divider': '../../iView/divider/index',
      // 'i-drawer': '../../iView/drawer/index',
      // 'i-grid': '../../iView/grid/index',
      // 'i-grid-icon': '../../iView/grid-icon/index',
      // 'i-grid-item': '../../iView/grid-item/index',
      // 'i-grid-label': '../../iView/grid-label/index',
      // 'i-icon': '../../iView/icon/index',
      // 'i-index': '../../iView/index/index',
      // 'i-index-item': '../../iView/index-item/index',
      // 'i-input': '../../iView/input/index',
      // 'i-input-number': '../../iView/input-number/index',
      // 'i-load-more': '../../iView/load-more/index',
      // 'i-message': '../../iView/message/index',
      // 'i-modal': '../../iView/modal/index',
      // 'i-notice-bar': '../../iView/notice-bar/index',
      // 'i-page': '../../iView/page/index',
      // 'i-panel': '../../iView/panel/index',
      // 'i-progress': '../../iView/progress/index',
      // 'i-radio': '../../iView/radio/index',
      // 'i-radio-group': '../../iView/radio-group/index',
      // 'i-rate': '../../iView/rate/index',
      // 'i-row': '../../iView/row/index',
      // 'i-slide': '../../iView/slide/index',
      // 'i-spin': '../../iView/spin/index',
      // 'i-step': '../../iView/step/index',
      // 'i-steps': '../../iView/steps/index',
      // 'i-sticky': '../../iView/sticky/index',
      // 'i-sticky-item': '../../iView/sticky-item/index',
      // 'i-swipeout': '../../iView/swipeout/index',
      // 'i-switch': '../../iView/switch/index',
      // 'i-tab': '../../iView/tab/index',
      // 'i-tab-bar': '../../iView/tab-bar/index',
      // 'i-tab-bar-item': '../../iView/tab-bar-item/index',
      // 'i-tabs': '../../iView/tabs/index',
      // 'i-tag': '../../iView/tag/index',
      // 'i-toast': '../../iView/toast/index',
    },
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  testRequest() {
    // http://49.235.133.74:4001/api/categories/getList
    // request(
    //   'http://49.235.133.74:4001/api/categories/getList',
    //   {},
    //   '123',
    //   'post',
    //   '1',
    //   '2'
    // )
    //   .then(res => {
    //     console.log('res', res);
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //   });
  }
  componentWillUnmount() {}

  componentDidShow() {
    // getUserInfo('http://49.235.133.74:4001/api/categories/getList', {}, 'get')
    //   .then(res => {
    //     console.log('res', res);
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //   });
  }

  componentDidHide() {}
  clickHandler() {
    console.log('clicked');
  }
  render() {
    return (
      <View className='index'>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
            <Image src={post1} style='width: 100%' />
          </SwiperItem>
          <SwiperItem>
            <Image src={post2} style='width: 100%' />
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-3'>3</View>
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
        <i-divider></i-divider>
        <SixBlockComp title='推荐歌单' />
        <i-divider></i-divider>
        <SixBlockComp title='热门歌单' />
        <i-divider></i-divider>
        <OneBlockComp />
      </View>
    );
  }
}

export default Index;
