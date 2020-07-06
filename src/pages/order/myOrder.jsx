/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { heartCheck } from '@/utils/heartbeatjuejin'
import { getOrderListById } from '@/api/order';

import './myOrder.scss';

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
    },
  };

  constructor() {
    super(...arguments);
    this.state = {

      orderList: [],
      currentOrderPage: 1,
      totalOrderPage: 30,
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentDidMount() {
    this.fetchOrderList();;
  }
  componentWillUnmount() { }
  fetchOrderList() {
    Taro.showLoading({
      title: '加载中-订单',
    });
    // 向后端请求指定页码的数据
    const data = { id: 'o2VHy5Fn3m8GlVISHmDgNS6y3WrM', pageSize: 50, pageNo: 1 }

    return getOrderListById(data)
      .then(res => {

        this.setState({
          orderList: res.data.list,
        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      })
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

  // onReachBottom() {
  //   if (
  //     !this.state.loading &&
  //     this.state.currentOrderPage < this.state.totalOrderPage
  //   ) {
  //     this.fetchOrderList(this.state.currentOrderPage + 1);
  //   }
  // }
  componentDidShow() {
    Taro.onSocketMessage(res => {
      //收到消息
      console.log('我的订单, 收到服务器消息', res);

      const data = JSON.parse(res.data)
      if (data.type == 'pong') {
        heartCheck.reset().start();
      } else if (data.type === 'fromUser') {
        if (data.msg === 'fetchOrderList') {
          this.fetchOrderList()
        }
        // 处理数据
      }
    });
  }

  componentDidHide() { }

  render() {
    const { orderList } = this.state;
    return (
      <View className='order'>
        {orderList.map(item => {
          return (
            <View className='order-item-wrapper' key={item.name}>
              <i-row i-class='left'>
                <i-col span='4' i-class='col-class'>
                  <i-avatar
                    src={item.avatar}
                    size='large'
                  />
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
                      <Button size='mini' className='primary'>
                        开始
                      </Button>
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
