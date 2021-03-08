/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Picker } from '@tarojs/components';
import { getOrderListById, updateOrder } from '@/api/order';
import TabbarComp from '@/components/TabbarComp/TabbarComp';

import { updateUserState } from '@/api/user';
import { get, set, remove, clear } from '@/utils/localStorage';
import './order.scss';

class MyCurrentOrder extends Component {
  config = {
    navigationBarTitleText: '现在订单',
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
      "i-message": "../../iView/message/index",
      "i-input": "../../iView/input/index",
      "i-notice-bar": "../../iView/notice-bar/index",
    },
  };

  constructor() {
    super(...arguments);
    this.state = {
      orderList: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      state: '',
      role: '',
      selectedOrder: {},
      isShowModal: false,
      actions: [],
    };
  }

  componentDidMount() {

  }
  componentWillUnmount() { }
  fetchOrderList(override) {
    Taro.showLoading({
      title: '加载中-订单',
    });
    // 向后端请求指定页码的数据
    const data = { pageSize: this.state.pageSize, pageNo: this.state.pageNo }
    return getOrderListById(data)
      .then(res => {

        this.setState({
          orderList: override ? res.data.list : this.state.orderList.concat(res.data.list),
          total: res.data.total, //总页数

        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      });
  }


  onPullDownRefresh() {
    // 上拉刷新
    if (!this.state.loading) {
      this.setState({ pageNo: 1 }, () => {
        this.fetchOrderList(true).then(res => {
          // 处理完成后，终止下拉刷新
          Taro.stopPullDownRefresh();
        });
      })
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
    if (!id) {
      Taro.showToast({ title: '歌曲id不能为空', icon: 'none' })
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
        const userInfo_ = get('userInfo') || {}
        Taro.sendSocketMessage({
          data: JSON.stringify({
            type: 'updateOrderStateOK',
            artistId: userInfo_.id,
            state: '1',
            songName: this.state.selectedOrder.name,
            userName: this.state.selectedOrder.nickName,
          }),
        });
      })
      .catch(err => {
        this.setState({ isShowModal: false });
      });
  }
  confirmFinish() {
    const id = this.state.selectedOrder.id;
    if (!id) {
      Taro.showToast({ title: '歌曲id不能为空', icon: 'none' })
      return
    }
    updateOrder({ orderId: id, state: '2' })
      .then(res => {
        const actions_ = [...this.state.actions];
        actions_[1].loading = false;
        this.setState({
          actions: actions_,
          isShowModal: false,
          orderList: this.state.orderList.map(item =>
            item.id === id ? { ...item, state: '2' } : item
          ),
        });
        this.setState({ pageNo: 1 }, () => {

          this.fetchOrderList(true);
        })

        const userInfo_ = get('userInfo') || {}
        Taro.sendSocketMessage({
          data: JSON.stringify({
            type: 'updateOrderStateOK',
            artistId: userInfo_.id,
            state: '2',
            songName: this.state.selectedOrder.name,
            userName: this.state.selectedOrder.nickName,
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

  refresh() {
    this.setState({ pageNo: 1 }, () => {
      this.fetchOrderList(true);
    })
  }
  componentDidShow() {
    this.fetchOrderList(true);
    const { role, state } = get('userInfo')
    this.setState({ state, role })
  }

  onReachBottom() {
    if (
      this.state.pageNo * this.state.pageSize < this.state.total
    ) {
      this.setState({ pageNo: this.state.pageNo + 1 }, () => {
        this.fetchOrderList(false);
      });
    }
  }
  render() {
    const { orderList, isShowModal, selectedOrder, actions, state, role } = this.state;

    return (
      <View className='index pb50px'>
        {role === 'artist' ? <View>
          <View className='refresh' onClick={this.refresh.bind(this)} >
            <i-icon type="refresh" size="30" color="#fff" />
          </View>
          <i-message id="message" />
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
          {state !== '1' && <i-notice-bar icon="systemprompt" loop color='#fff'
            backgroundcolor='#2d8cf0'
          >
            您还未开启接单模式。请去我的页面，开启接单模式。
</i-notice-bar>}
          {orderList.map((item, index) => {
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
                        订单日期:
                      {item.createdDate && <Text><Text>{item.createdDate.slice(0, 10)}</Text><Text decode="true">&nbsp;</Text> <Text>{item.createdDate.slice(11, 16)}</Text></Text>}
                      </i-col>
                      <i-divider i-class='divider' height={10}></i-divider>

                      <i-col span='18' i-class='col-class name date'>
                        <Text>用户名:{item.nickName}</Text>
                        <View>歌曲价格:￥{item.price}</View>
                      </i-col>
                      <i-col span='24' i-class='col-class bold price'>
                        合计:￥{item.price + item.tips}
                      </i-col>
                      <i-col span='24' i-class='col-class comment'>
                        {item.comment ? '留言:' + item.comment : null}
                      </i-col>

                      <i-col span='24' i-class='col-class button'>
                        {item.state === '0' ? (
                          <Button
                            size='mini'
                            className='primary'
                            disabled={index !== 0}
                            onClick={this.start.bind(this, item)}
                          >
                            开始
                          </Button>
                        ) : (
                            <Button
                              disabled={index !== 0}
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
                <i-divider i-class='divider' height={24}></i-divider>
              </View>
            );
          })}
          <i-divider i-class='divider' height={48} content='加载已经完成,没有其他数据'></i-divider>
        </View> :
          <View className=''>
            <i-divider i-class='divider' height={200} content=' 您还未注册艺人,无法访问此页面'></i-divider>
          </View>


        }

        <View className='tabbar-container'>
          <TabbarComp currentTab='order' />
        </View>
      </View>
    );
  }
}

export default MyCurrentOrder;
