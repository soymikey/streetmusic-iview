/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import TabbarComp from '@/components/TabbarComp/TabbarComp';
import './order.scss';
import { get, set, remove, clear } from '@/utils/localStorage';
import { updateUserState } from '@/api/user';
import { connect } from '@tarojs/redux'

import { setUserInfo } from '../../actions/user'
@connect(({ user }) => ({
  user
}), (dispatch) => ({
  setUserInfo(data) {
    dispatch(setUserInfo(data))
  },

}))
class Order extends Component {
  config = {
    enablePullDownRefresh: false,
    navigationBarTitleText: '订单',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-cell-group': '../../iView/cell-group/index',
      'i-cell': '../../iView/cell/index',
      'i-divider': '../../iView/divider/index',
      "i-message": "../../iView/message/index",
      "i-switch": "../../iView/switch/index"
    },
  };
  constructor() {
    super(...arguments);
    this.state = {
      isSwitched: false
    };
  }
  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onChangeSwitch(e) {
    const value = e.detail.value
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
          this.setState({ isSwitched: value })
          this.props.setUserInfo({ state: value ? '1' : '0' })

          const userInfo_ = get('userInfo') || {}
          Taro.sendSocketMessage({
            data: JSON.stringify({
              type: 'updateUserStateOK',
              artistId: userInfo_.id,
              state: value ? '1' : '0',
              artist: userInfo_.nickName
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
              Taro.showToast({ title: '获取修改状态失败' })
            }
          }
        })

      }

    })
  }


  render() {
    const userInfo_ = get('userInfo') || {}
    const { isSwitched } = this.state

    const state = this.props.user.state
    return (
      <View className='order'>
        <i-message id="message" />
        <i-cell-group>
          {userInfo_.role === 'artist' &&
            <View>
              {/* <i-switch value="{{switch1}}" bind:change="onChange" slot="footer"> */}
              <i-cell title={state === '1' ? '上线' : '下线'}>
                <i-switch slot="footer" value={state === '1' ? true : false} onChange={this.onChangeSwitch.bind(this)} />
              </i-cell>
              <i-cell title='现在订单' is-link url='/pages/order/myCurrentOrder'></i-cell>
              <i-cell title='推荐历史' is-link url='/pages/reference/history'></i-cell>
            </View>


          }
          {userInfo_.role && <View >
            <i-cell title='打赏历史' is-link url='/pages/tips/history'></i-cell>
            <i-cell title='订单历史' is-link url='/pages/order/myHistoryOrder'></i-cell>
          </View>}



        </i-cell-group>
        <View className='tabbar-container'>
          <TabbarComp currentTab='order' />
        </View>
      </View>
    );
  }
}

export default Order;
