/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import TabbarComp from '@/components/TabbarComp/TabbarComp';

import './user.scss';

class User extends Component {
  config = {
    navigationBarTitleText: '我的',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-cell-group': '../../iView/cell-group/index',
      'i-cell': '../../iView/cell/index',
      'i-switch': '../../iView/switch/index',
      'i-tag': '../../iView/tag/index',
      'i-button': '../../iView/button/index',
      'i-divider': '../../iView/divider/index',
      'i-avatar': '../../iView/avatar/index',
      'i-icon': '../../iView/icon/index',
      'i-message': '../../iView/message/index',
    },
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentDidMount() {
    // Taro.navigateTo({ url: '/pages/user/registerArtist/registerArtist' });
  }
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='user'>
        <i-row i-class='user-info'>
          <i-col span='4'>
            <i-avatar
              src='https://i.loli.net/2017/08/21/599a521472424.jpg'
              size='large'></i-avatar>
          </i-col>
          <i-col span='20' i-class='col-class'>
            <View className='user-name'>
              <Text>helo wrold</Text>
            </View>
            <View className='user-level'>
              <i-tag>level:7</i-tag>
            </View>
          </i-col>
        </i-row>
        <i-row i-class='summary-row'>
          <i-col span='6' i-class='col-class border-right'>
            <View className='title'>
              <Text>活动</Text>
            </View>
            <View className='content'>
              <Text>323</Text>
            </View>
          </i-col>
          <i-col span='6' i-class='col-class border-right'>
            <View className='title'>
              <Text>关注</Text>
            </View>
            <View className='content'>
              <Text>323</Text>
            </View>
          </i-col>
          <i-col span='6' i-class='col-class border-right'>
            <View className='title'>
              <Text>粉丝</Text>
            </View>
            <View className='content'>
              <Text>323</Text>
            </View>
          </i-col>
          <i-col span='6' i-class='col-class'>
            <View className='title'>
              <Text>我的资料</Text>
            </View>
            <View className='content'>
              <i-icon type='editor' />
            </View>
          </i-col>
        </i-row>
        <i-divider i-class='divider' height={24}></i-divider>
        <i-cell-group>
          <i-cell
            title='注册艺人'
            is-link
            url='/pages/user/registerArtist/registerArtist'></i-cell>
          <i-cell
            title='上传歌曲'
            is-link
            url='/pages/user/uploadSong/uploadSong'></i-cell>
          <i-cell title='我的歌曲' is-link url='/pages/user/mySong/mySong'></i-cell>
          <i-cell
            title='上传活动'
            is-link
            url='/pages/user/uploadEvent/uploadEvent'></i-cell>
          <i-cell title='我的活动' is-link url='/pages/user/myEvent/myEvent'></i-cell>
          <i-cell title='我的收益' is-link></i-cell>
          <i-cell title='收款二维码' is-link></i-cell>
          <i-cell title='关于' is-link></i-cell>
        </i-cell-group>

        <View style='text-align:center;margin-top:40px;'>
          <Button size='mini' type='warn'>
            退出
          </Button>
        </View>

        <View className='tabbar-container'>
          <TabbarComp currentTab='user' />
        </View>
      </View>
    );
  }
}

export default User;
