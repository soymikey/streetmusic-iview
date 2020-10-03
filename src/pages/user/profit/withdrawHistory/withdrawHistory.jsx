import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'


import './withdrawHistory.scss'

import {
  getWithdrawList
} from '@/api/user';
class Withdrawhistory extends Component {

  config = {
    navigationBarTitleText: '提现历史',
    usingComponents: {

      'i-cell-group': '../../../../iView/cell-group/index',
      'i-cell': '../../../../iView/cell/index',
      'i-divider': '../../../../iView/divider/index',

    },
  }
  constructor() {
    super(...arguments);
    this.state = {
      list: [],
      total: 0,
      pageSize: 10,
      pageNo: 1,
      loading: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.getList()
  }
  // getList() {
  //   getWithdrawList({ amount: this.state.total }).then(res => {
  //     this.setState({ 
  //       list: override ? res.data.list : this.state.list.concat(res.data.list),
  //       total: res.data.total, //总页数
  //       loading: false,
  //     });
  //   })
  // }
  getList(override) {
    Taro.showLoading({
      title: '加载中-提现记录',
    });
    // 向后端请求指定页码的数据
    const data = { pageSize: this.state.pageSize, pageNo: this.state.pageNo }
    this.setState({ loading: true });
    return getWithdrawList(data)
      .then(res => {

        this.setState({
          list: override ? res.data.list : this.state.list.concat(res.data.list),
          total: res.data.total, //总页数
          loading: false,
        });
      })
      .catch(err => {
        this.setState({ loading: false })
        console.log('==> [ERROR]', err);
      })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onPullDownRefresh() {
    if (!this.state.loading) {
      this.setState({ pageNo: 1 }, () => {
        this.getList(true)
      });


    }
  }
  onReachBottom() {
    if (
      !this.state.loading &&
      this.state.pageNo * this.state.pageSize < this.state.total
    ) {
      this.setState({ pageNo: this.state.pageNo + 1 }, () => {
        this.getList();
      });
    }
  }

  render() {
    const { list } = this.state
    return (
      <View className='withdrawHistory'>
        <i-cell-group>
          {list.map(item => {
            return <i-cell
              title='提现金额'
              label={item.createdDate.slice(0, 10) + '  ' + item.createdDate.slice(11, 19)}
            > <View slot="footer">{item.amount}元</View> </i-cell>

          })}
        </i-cell-group>
        <i-divider content='加载已经完成,没有其他数据'  color="#fff"></i-divider>
      </View>
    )
  }
}

export default Withdrawhistory
