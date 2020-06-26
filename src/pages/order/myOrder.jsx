/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';

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
      orderLists: [
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '阿桑-给你的爱一直很安静',
          price: '12.00',
        },
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '又是一个睡不着的夜晚',
          price: '12.00',
        },
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '疯人院',
          price: '12.00',
        },
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '无邪',
          price: '12.00',
        },
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '罪',
          price: '12.00',
        },
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '落霜',
          price: '12.00',
        },
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '背对背拥抱',
          price: '12.00',
        },
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '春夏秋冬失去了你',
          price: '12.00',
        },
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '江南（片段版）（翻自&nbsp;梁静茹）&nbsp;',
          price: '12.00',
        },
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '如果云知道',
          price: '12.00',
        },
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '领悟',
          price: '12.00',
        },
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '辛晓琪',
          price: '12.00',
        },
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '守候·辛晓琪',
          price: '12.00',
        },
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '心如刀割',
          price: '12.00',
        },
        {
          singerName: '歌手名称',
          comment: '这是commentcommetn11111111111111',
          date: '2020-07-02 10:20:20',
          name: '张学友',
          price: '12.00',
        },
      ],
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
    this.fetchOrderList(1);
  }
  componentWillUnmount() {}
  fetchOrderList(pageNo) {
    this.setState({ loading: true });
    Taro.showLoading({
      title: '加载中',
    });
    // 向后端请求指定页码的数据
    // return getArticles(pageNo)
    //   .then(res => {
    //     this.setState({
    //       currentOrderPage: pageNo, //当前的页号
    //       totalOrderPage: res.pages, //总页数
    //       OrderList: [],
    //     });
    //   })
    //   .catch(err => {
    //     console.log('==> [ERROR]', err);
    //   })
    //   .then(() => {
    //     this.loading = false;
    //   });
    setTimeout(() => {
      this.setState({
        currentOrderPage: pageNo, //当前的页号
        totalOrderPage: 8, //总页数
        orderList: this.state.orderLists.slice(0, pageNo * 5),
        loading: false,
      });

      Taro.hideLoading();
    }, 1000);
  }

  onPullDownRefresh() {
    // 上拉刷新
    if (!this.state.loading) {
      this.fetchOrderList(1);
      // 处理完成后，终止下拉刷新
      Taro.stopPullDownRefresh();
    }
  }

  onReachBottom() {
    if (
      !this.state.loading &&
      this.state.currentOrderPage < this.state.totalOrderPage
    ) {
      this.fetchOrderList(this.state.currentOrderPage + 1);
    }
  }
  componentDidShow() {}

  componentDidHide() {}

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
                    src='https://i.loli.net/2017/08/21/599a521472424.jpg'
                    size='large'
                  />
                </i-col>
                <i-col span='20' i-class='col-class'>
                  <i-row i-class='right'>
                    <i-col span='20' i-class='col-class bold ellipsis'>
                      {item.singerName}
                    </i-col>
                    <i-col span='4' i-class='col-class state'>
                      已完成
                    </i-col>
                    <i-col span='24' i-class='col-class date'>
                      订单日期:{item.date}
                    </i-col>
                    <i-divider height={10}></i-divider>
                    <i-col span='18' i-class='col-class name ellipsis'>
                      名称:{item.name}
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
