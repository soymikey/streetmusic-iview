/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';

import { View, Button, Text } from '@tarojs/components';
import TabbarComp from '@/components/TabbarComp/TabbarComp';
import { getMyOpenid, login } from '@/api/user';
import { setUserInfo, logout, } from '@/actions/user';

import { goToPage } from '@/utils/tools.js';
import { get, set, remove } from '@/utils/localStorage';
import { linkSocket, heartCheck } from '@/utils/heartbeatjuejin';

import './user.scss';

@connect(state => state, { setUserInfo, logout })
class User extends Component {
  config = {
    enablePullDownRefresh: false,
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
    },
  };

  componentDidMount() {
    this.getSession();

  }
  // 获取登录的code
  getSession() {
    Taro.login({
      success: (res) => {
        if (res.code) {
          return getMyOpenid({ jsCode: res.code }).then(res1 => {
            set('openId', res1.data.openid)
          })
        }
      },
      fail: (err) => {
        Taro.showToast({ title: '获取openId失败,联系管理员~', icon: 'none' })
        return
      }
    })
  }
  getUserInfo(e) {
    let userInfo = e.detail.userInfo;
    if (!get('openId')) {
      Taro.showToast({ title: '无法获取openId', icon: 'none' })
      return
    }
    userInfo.openid = get('openId');
    return login(userInfo).then(res => {
      set('token', res.data.token)
      this.props.setUserInfo(res.data);
      linkSocket(userInfo.openid);//连接websocket
      Taro.showToast({ title: '登录成功', icon: 'none' })
      remove('openId')
      const backToPage = get('backToPage')
      if (backToPage) {
        setTimeout(() => {
          goToPage(backToPage)
          remove('backToPage')
        }, 2000);
      }

    })
  }
  logout() {
    this.props.logout();
    setTimeout(() => {
      Taro.reLaunch({ url: '/pages/index/index' })
    }, 2000);
  }
  goToEditMyInfo() {
    if (this.props.user.id) {
      goToPage('/pages/user/editMyInfo/editMyInfo');
    }
  }
  render() {
    const {
      address,
      avatar,
      city,
      country,
      gender,
      id,
      introduction,
      language,
      lastLogin,
      nickName,
      phoneNumber,
      province,
      realName,
      region,
      registerArtist,
      registerArtistDate,
      registerDate,
      role,
      state,
      token,
      collectionCount,
      followCount,
      eventCount,
    } = this.props.user;
    return (
      <View className='user'>
        <i-row i-class='user-info'>
          {nickName}
          <i-col span='4'>
            <i-avatar src={avatar} size='large'></i-avatar>
          </i-col>
          <i-col span='20' i-class='col-class'>
            <View className='user-name'>
              <Text>{nickName}</Text>
            </View>
            <View className='user-level'>
              {role === 'user' && <i-tag>普通用户</i-tag>}
              {role === 'artist' && <i-tag>街头艺人</i-tag>}
            </View>
          </i-col>
        </i-row>
        <i-row i-class='summary-row'>
          <i-col span='6' i-class='col-class border-right'>
            <View className='title'>
              <Text>活动</Text>
            </View>
            <View className='content'>
              <Text>{eventCount}</Text>
            </View>
          </i-col>
          <i-col span='6' i-class='col-class border-right'>
            <View className='title'>
              <Text>关注</Text>
            </View>
            <View className='content'>
              <Text>{followCount}</Text>
            </View>
          </i-col>
          <i-col span='6' i-class='col-class border-right'>
            <View className='title'>
              <Text>粉丝</Text>
            </View>
            <View className='content'>
              <Text>{collectionCount}</Text>
            </View>
          </i-col>
          <i-col span='6' i-class='col-class'>
            <View onClick={this.goToEditMyInfo.bind(this)}>
              <View className='title'>
                <Text>我的资料</Text>
              </View>
              <View className='content'>
                <i-icon type='editor' />
              </View>
            </View>
          </i-col>
        </i-row>
        <i-divider i-class='divider' height={24}></i-divider>
        <i-cell-group>
          {role === 'user' && (
            <i-cell
              title='注册艺人'
              is-link
              url='/pages/user/registerArtist/registerArtist'
            ></i-cell>
          )}
          {role === 'artist' && (
            <View>
              <i-cell
                title='上传歌曲'
                is-link
                url='/pages/user/uploadSong/uploadSong'
              ></i-cell>
              <i-cell
                title='我的歌曲'
                is-link
                url='/pages/user/mySong/mySong'
              ></i-cell>
              <i-cell
                title='上传活动'
                is-link
                url='/pages/user/uploadEvent/uploadEvent'
              ></i-cell>
              <i-cell
                title='我的活动'
                is-link
                url='/pages/user/myEvent/myEvent'
              ></i-cell>
              <i-cell title='我的收益' is-link url='/pages/user/profit/profit'></i-cell>
              <i-cell title='收款二维码' is-link url={'/pages/user/userQrCode/userQrCode?id=' + id}></i-cell>
            </View>
          )}

          <i-cell title='关于' is-link></i-cell>
        </i-cell-group>

        <View style='text-align:center;margin-top:40px;'>
          {!id ? (
            <Button
              size='mini'
              className='primary'
              open-type='getUserInfo'
              onGetUserInfo={this.getUserInfo.bind(this)}
            >
              登录
            </Button>
          ) : (
              <Button size='mini' className='error' onClick={this.logout.bind(this)}>
                退出
              </Button>
            )}
        </View>

        <View className='tabbar-container'>
          <TabbarComp currentTab='user' />
        </View>
      </View>
    );
  }
}

export default User;
