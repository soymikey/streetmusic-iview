/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import TabbarComp from '@/components/TabbarComp/TabbarComp';
import { login, updateUserState } from '@/api/user';

import { goToPage, getSession } from '@/utils/tools.js';
import { get, set, remove, clear } from '@/utils/localStorage';
const logo = require('@/asset/icon/logo.png');
import './user.scss';
import { connect } from '@tarojs/redux';
import { setUserInfo } from '../../actions/user';

@connect(
  ({ user }) => ({
    user,
  }),
  dispatch => ({
    setUserInfo(data) {
      dispatch(setUserInfo(data));
    },
  })
)
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
      'i-message': '../../iView/message/index',
    },
  };
  constructor() {
    super(...arguments);
    this.state = {
      userInfo: {
        collectionCount: 0,
        followCount: 0,
        eventCount: 0,
        isSwitched: false,
      },
    };
  }

  componentDidMount() {
    if (this.$router.params.referenceCode) {
      set(referenceCode, this.$router.params.referenceCode);
    }
  }
  onChangeSwitch(e) {
    const value = e.detail.value;
    console.log('value', value);
    Taro.getLocation({
      type: 'wgs84',
      isHighAccuracy: true,
      success: res => {
        const data = {
          state: value ? '1' : '0',
          latitude: res.latitude,
          longitude: res.longitude,
        };
        updateUserState(data).then(res => {
          this.setState({ isSwitched: value });
          this.props.setUserInfo({ state: value ? '1' : '0' });

          const userInfo_ = get('userInfo') || {};
          Taro.sendSocketMessage({
            data: JSON.stringify({
              type: 'updateUserStateOK',
              artistId: userInfo_.id,
              state: value ? '1' : '0',
              artist: userInfo_.nickName,
            }),
          });
        });
      },
      fail: err => {
        Taro.showModal({
          title: '提示',
          content: '请在设置里开启定位',
          success: res => {
            if (res.confirm) {
              Taro.switchTab({
                url: '/pages/user/user',
              });
            } else if (res.cancel) {
              Taro.showToast({ title: '获取修改状态失败' });
            }
          },
        });
      },
    });
  }

  getUserInfo(e) {
    let userInfo = e.detail.userInfo;
    if (!get('openId')) {
      Taro.showToast({ title: '登录失败,请重新开启小程序.', icon: 'none' });
      return;
    }
    userInfo.openid = get('openId');
    return login(userInfo).then(res => {
      set('token', res.data.token);

      this.props.setUserInfo(res.data);
      this.setState({ userInfo: res.data });
      Taro.showToast({ title: '登录成功', icon: 'none' });
      const backToPage = get('backToPage');
      if (backToPage) {
        setTimeout(() => {
          goToPage(backToPage);
          remove('backToPage');
        }, 2000);
      }
    });
  }
  logout() {
    clear();
    Taro.showToast({ title: '正在退出...', icon: 'none', duration: 5000 });
    setTimeout(() => {
      Taro.reLaunch({ url: '/pages/index/index' });
    }, 2000);
  }
  goToEditMyInfo() {
    const token = get('token');
    if (token) {
      goToPage('/pages/user/editMyInfo/editMyInfo');
    }
  }
  setting() {
    Taro.openSetting({
      success(res) {
        console.log('res', res);
      },
    });
  }
  recommendation() {
    Taro.openSetting({
      success(res) {
        console.log('res', res);
      },
    });
  }
  onShareAppMessage() {
    const userInfo_ = get('userInfo');
    return {
      from: 'button',
      title: `来自${userInfo_.nickName}的邀请,邀请码:${userInfo_.referenceCode}`,
      path: `/pages/user/user?referenceCode=${userInfo_.referenceCode}`,
      imageUrl: logo,
      success: function(res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
          Taro.showToast({ title: '分享成功', icon: 'none' });
        }
      },
    };
  }
  componentDidShow() {
    if (!get('openId')) {
      getSession();
    }
  }
  render() {
    const {
      avatar,
      id,
      nickName,
      role,
      collectionCount,
      followCount,
      eventCount,
      referenceCode,
    } = get('userInfo') || {};
    const { state } = this.props.user;
    return (
      <View className='user'>
        <i-message id='message' />
        <View className='pb50px' style='background:#fff'>
          <i-row i-class='user-info'>
            {nickName}
            <i-col span='4'>
              <i-avatar src={avatar || logo} size='large'></i-avatar>
            </i-col>
            <i-col span='20' i-class='col-class'>
              <View className='user-name'>
                <Text>{nickName}</Text>
              </View>
              <View className='user-level'>
                {role === 'user' && <i-tag>普通用户</i-tag>}
                {role === 'artist' && <i-tag>歌手</i-tag>}
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
          <i-divider i-class='divider' i-class='divider' height={24}></i-divider>
          <i-cell-group>
            {role === 'user' && (
              <View>
                <i-cell
                  title='注册歌手'
                  is-link
                  url='/pages/user/registerArtist/registerArtist'></i-cell>
                <i-cell
                  title='我的订单'
                  is-link
                  url='/pages/user/myOrder/myOrder'></i-cell>

                <i-cell
                  title='使用指南'
                  is-link
                  url='/pages/user/instruction/instruction'></i-cell>

                <i-cell title='设置' onClick={this.setting.bind(this)}></i-cell>
              </View>
            )}

            {role === 'artist' && (
              <View>
                <i-cell title={state === '1' ? '接单中' : '下线'}>
                  <i-switch
                    slot='footer'
                    value={state === '1' ? true : false}
                    onChange={this.onChangeSwitch.bind(this)}
                  />
                </i-cell>
                <i-cell
                  title='我点过的歌曲'
                  is-link
                  url='/pages/user/myOrder/myOrder'></i-cell>
                <i-cell
                  title='上传歌曲'
                  is-link
                  url='/pages/user/uploadSong/uploadSong'></i-cell>
                <i-cell
                  title='我的歌曲'
                  is-link
                  url='/pages/user/mySong/mySong'></i-cell>
                <i-cell
                  title='上传活动'
                  is-link
                  url='/pages/user/uploadEvent/uploadEvent'></i-cell>
                <i-cell
                  title='我的活动'
                  is-link
                  url='/pages/user/myEvent/myEvent'></i-cell>
                <i-cell
                  title='账户资金'
                  is-link
                  url='/pages/user/profit/profit'></i-cell>

                <i-cell
                  title='点歌二维码'
                  is-link
                  url={'/pages/user/userQrCode/userQrCode?id=' + id}></i-cell>
                <i-cell
                  title='使用指南'
                  is-link
                  url='/pages/user/instruction/instruction'></i-cell>

                <i-cell title='设置' onClick={this.setting.bind(this)}></i-cell>
                <Button size='mini' className='share-button' open-type='share'>
                  <i-cell
                    title='邀请有奖'
                    label='邀请好友注册歌手,被邀请人并完成50个订单.您将获得50元奖励'
                    value={'邀请码:' + referenceCode}></i-cell>
                </Button>
              </View>
            )}

            {/* <i-cell title='关于' is-link url='/pages/user/about/about'></i-cell> */}
          </i-cell-group>

          <View>
            <View style='width:150px;margin:20px auto'>
              {!id ? (
                <Button
                  className='primary'
                  open-type='getUserInfo'
                  onGetUserInfo={this.getUserInfo.bind(this)}>
                  登录
                </Button>
              ) : (
                <Button className='error' onClick={this.logout.bind(this)}>
                  退出
                </Button>
              )}
            </View>
          </View>
        </View>
        <View className='tabbar-container'>
          <TabbarComp currentTab='user' />
        </View>
      </View>
    );
  }
}

export default User;
