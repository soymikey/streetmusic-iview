/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Picker } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList, AtListItem } from 'taro-ui';
import { heartCheck } from '@/utils/heartbeatjuejin';
import { getOrderListById, updateOrder } from '@/api/order';
import { updateUserState } from '@/api/user';

import './myOrder.scss';

@connect(state => state)
class myOrder extends Component {
  config = {
    navigationBarTitleText: '我的订单',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-divider': '../../iView/divider/index',
      'i-tab-bar': '../../iView/tab-bar/index',
      'i-tab-bar-item': '../../iView/tab-bar-item/index',
      'i-avatar': '../../iView/avatar/index',
      'i-divider': '../../iView/divider/index',
      'i-icon': '../../iView/icon/index',
      'i-modal': '../../iView/modal/index',
    },
  };

  constructor() {
    super(...arguments);
    this.state = {
      orderList: [],
      currentOrderPage: 1,
      totalOrderPage: 30,
      loading: false,
      stateList: [
        { value: '0', label: '下线' },
        { value: '1', label: '上线' },
        { value: '2', label: '休息中' },
      ],
      stateRange: ['下线', '上线', '休息中'],
      state: '下线',
      selectedOrder: {},
      isShowModal: false,
      actions: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps);
  }
  componentDidMount() {
    this.fetchOrderList();
  }
  componentWillUnmount() {}
  fetchOrderList() {
    Taro.showLoading({
      title: '加载中-订单',
    });
    // 向后端请求指定页码的数据
    const data = { id: 'o2VHy5Fn3m8GlVISHmDgNS6y3WrM', pageSize: 50, pageNo: 1 };

    return getOrderListById(data)
      .then(res => {
        const state_ = this.state.stateList.filter(
          item => item.value === res.data.userInfo.state
        )[0].label;
        this.setState({
          orderList: res.data.list,
          state: state_,
        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      });
  }
  onChangeState(event) {
    const label = this.state.stateList[event.detail.value].label;
    const value = this.state.stateList[event.detail.value].value;
    const data = {
      state: value,
    };
    updateUserState(data).then(res => {
      this.setState({ state: label });
      Taro.sendSocketMessage({
        data: JSON.stringify({
          type: 'updateUserStateOK',
          artistId: this.props.user.id,
        }),
      });
    });
  }

  onPullDownRefresh() {
    // 上拉刷新
    if (!this.state.loading) {
      this.fetchOrderList().then(res => {
        // 处理完成后，终止下拉刷新
        Taro.stopPullDownRefresh();
      });
    }
  }

  start(item) {
    this.setState({
      selectedOrder: item,
      isShowModal: true,
      actions: [
        {
          name: '取消',
        },
        {
          name: '确定',
          color: '#2d8cf0',
          loading: false,
        },
      ],
    });
  }
  finish(item) {
    this.setState({
      selectedOrder: item,
      isShowModal: true,
      actions: [
        {
          name: '取消',
        },
        {
          name: '确定',
          color: '#ed3f14',
          loading: false,
        },
      ],
    });
  }
  confirmStart() {
    const id = this.state.selectedOrder.id;
    if(!id){
      Taro.showToast({title:'歌曲id不能为空',icon:'none'})
      return
    }
    updateOrder({ orderId: id, state: '1' })
      .then(res => {

        const actions_ = [...this.state.actions];
        actions_[1].loading = false;
        this.setState({
          actions: actions_,
          isShowModal: false,
          orderList: this.state.orderList.map(item =>
            item.id === id ? { ...item, state: '1' } : item
          ),
        });
        Taro.sendSocketMessage({
          data: JSON.stringify({
            type: 'updateOrderStateOK',
            artistId: this.props.user.id,
          }),
        });
      })
      .catch(err => {
        this.setState({ isShowModal: false });
      });
  }
  confirmFinish() {
    const id = this.state.selectedOrder.id;
    if(!id){
      Taro.showToast({title:'歌曲id不能为空',icon:'none'})
      return
    }
    updateOrder({ orderId: id, state: '3' })
      .then(res => {
        const actions_ = [...this.state.actions];
        actions_[1].loading = false;
        this.setState({
          actions: actions_,
          isShowModal: false,
          orderList: this.state.orderList.map(item =>
            item.id === id ? { ...item, state: '3' } : item
          ),
        });
        this.fetchOrderList()
        Taro.sendSocketMessage({
          data: JSON.stringify({
            type: 'updateOrderStateOK',
            artistId: this.props.user.id,
          }),
        });
      })
      .catch(err => {
        this.setState({ isShowModal: false });
      });
  }
  onConfirmModal(e) {
    if (e.detail.index === 0) {
      this.setState({ isShowModal: false });
    } else {
      const actions_ = [...this.state.actions];
      actions_[1].loading = true;
      this.setState({ actions: actions_ });
      this.state.selectedOrder.state === '0' ? this.confirmStart() : this.confirmFinish();
    }
  }
  componentDidShow() {
    Taro.onSocketMessage(res => {
      //收到消息
      console.log('我的订单, 收到服务器消息', res);

      const data = JSON.parse(res.data);
      if (data.type == 'pong') {
        heartCheck.reset().start();
      } else if (data.type === 'goFetchOrderList') {
        this.fetchOrderList();
        // 处理数据
      }
    });
  }

  componentDidHide() {}

  render() {
    const { orderList, isShowModal, selectedOrder, actions } = this.state;
    return (
      <View className='order'>
        <i-modal
          title={selectedOrder.state === '0' ? '确认开始' : '确认结束'}
          visible={isShowModal}
          actions={actions}
          onClick={this.onConfirmModal.bind(this)}
        >
          <View>
            {selectedOrder.state === '0'
              ? '确认开始' + selectedOrder.name + '?'
              : '确认结束' + selectedOrder.name + '?'}
          </View>
        </i-modal>
        <i-row i-class='state'>
          <Picker
            mode='selector'
            range={this.state.stateRange}
            onChange={this.onChangeState.bind(this)}
          >
            <AtList>
              <AtListItem title='状态' extraText={this.state.state} />
            </AtList>
          </Picker>
        </i-row>
        {orderList.map(item => {
          return (
            <View className='order-item-wrapper' key={item.id}>
              <i-row i-class='left'>
                <i-col span='4' i-class='col-class'>
                  <i-avatar src={item.avatar} size='large' />
                </i-col>
                <i-col span='20' i-class='col-class'>
                  <i-row i-class='right'>
                    <i-col span='18' i-class='col-class bold ellipsis'>
                      歌曲:{item.name}
                    </i-col>
                    <i-col span='6' i-class='col-class state'>
                      状态:{item.state === '0' ? '未开始' : '进行中'}
                    </i-col>
                    <i-col span='24' i-class='col-class date'>
                      订单日期:{item.createdDate}
                    </i-col>
                    <i-divider height={10}></i-divider>
                    <i-col span='18' i-class='col-class name ellipsis'>
                      用户名:{item.nickName}
                    </i-col>
                    <i-col span='6' i-class='col-class bold price'>
                      ￥{item.price}
                    </i-col>
                    <i-col span='24' i-class='col-class comment'>
                      {item.comment}
                    </i-col>
                    <i-col span='24' i-class='col-class button'>
                      {item.state === '0' ? (
                        <Button
                          size='mini'
                          className='primary'
                          onClick={this.start.bind(this, item)}
                        >
                          开始
                        </Button>
                      ) : (
                        <Button
                          size='mini'
                          className='error'
                          onClick={this.finish.bind(this, item)}
                        >
                          完成
                        </Button>
                      )}
                    </i-col>
                  </i-row>
                </i-col>
              </i-row>
              <i-divider height={24}></i-divider>
            </View>
          );
        })}
        <i-divider height={48} content='加载已经完成,没有其他数据'></i-divider>
      </View>
    );
  }
}

export default myOrder;
