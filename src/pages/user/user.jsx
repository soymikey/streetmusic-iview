/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux'

import { View, Button, Text } from '@tarojs/components';
import TabbarComp from '@/components/TabbarComp/TabbarComp';
import { myLogin } from '@/api/user';
import { setUserInfo, logout } from '@/actions/user'

import { goToPage } from '@/utils/tools.js';

import './user.scss';

@connect(state => state, { setUserInfo, logout })


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
  async login() {
    myLogin().then(res => {
      this.props.setUserInfo(res.data)
    })
  }
  logout() {
    this.props.logout()
  }
  goToEditMyInfo() {
    goToPage('/pages/user/editMyInfo/editMyInfo')
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentDidMount() {
    // this.login()
  }
  componentWillUnmount() { }

  componentDidShow() {

  }

  componentDidHide() { }

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
    } = this.props.user
    console.log('this.props.user.avatar', this.props.user.avatar)
    return (
      <View className='user'>
        <i-row i-class='user-info'>
          <i-col span='4'>
            <i-avatar
              src={avatar}
              size='large'
            ></i-avatar>
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
          <i-col span='6' i-class='col-class' >
            <View onClick={this.goToEditMyInfo.bind(this)}>

              <View className='title' >
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
          {role === 'user' && <i-cell
            title='注册艺人'
            is-link
            url='/pages/user/registerArtist/registerArtist'
          ></i-cell>}
          {role === 'artist' && <View >
            <i-cell
              title='上传歌曲'
              is-link
              url='/pages/user/uploadSong/uploadSong'
            ></i-cell>
            <i-cell title='我的歌曲' is-link url='/pages/user/mySong/mySong'></i-cell>
            <i-cell
              title='上传活动'
              is-link
              url='/pages/user/uploadEvent/uploadEvent'
            ></i-cell>
            <i-cell title='我的活动' is-link url='/pages/user/myEvent/myEvent'></i-cell>
            <i-cell title='我的收益' is-link></i-cell>
            <i-cell title='收款二维码' is-link></i-cell>
          </View>}



          <i-cell title='关于' is-link></i-cell>
        </i-cell-group>

        <View style='text-align:center;margin-top:40px;'>
          {!id ? <Button size='mini' className='primary' open-type='getUserInfo' onGetUserInfo={this.login.bind(this)}>
            登录
          </Button> : <Button size='mini' className='error' onClick={this.logout.bind(this)}>
              退出
          </Button>}
        </View>

        <View className='tabbar-container'>
          <TabbarComp currentTab='user' />
        </View>
      </View>
    );
  }
}

export default User;
