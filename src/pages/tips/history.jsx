/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Picker } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getTipsHistoryListById } from '@/api/tips';

import './history.scss';

@connect(state => state)
class History extends Component {
  config = {
    navigationBarTitleText: '打赏历史',
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
      total: 0,
      pageSize: 10,
      pageNo: 1,
      loading: false,
      list: []
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps);
  }
  componentDidMount() {
    this.fetchTipsHistoryListById(true);
  }
  componentWillUnmount() { }
  fetchTipsHistoryListById(override) {
    Taro.showLoading({
      title: '加载中-打赏历史',
    });
    // 向后端请求指定页码的数据
    const data = { pageSize: this.state.pageSize, pageNo: this.state.pageNo };

    return getTipsHistoryListById(data)
      .then(res => {
        this.setState({
          list: override ? res.data.list : this.state.list.concat(res.data.list),
          total: res.data.total, //总页数
          loading: false,
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
        this.fetchTipsHistoryListById(true).then(res => {
          // 处理完成后，终止下拉刷新
          Taro.stopPullDownRefresh();
        });
      });

    }
  }
  onReachBottom() {
    if (
      !this.state.loading &&
      this.state.pageNo * this.state.pageSize < this.state.total
    ) {
      this.setState({ pageNo: this.state.pageNo + 1 }, () => {
        this.fetchTipsHistoryListById();
      });
    }
  }
  componentDidShow() {

  }

  componentDidHide() { }

  render() {
    const { list } = this.state;
    return (

      <View className='history'>
        {list.map(item => {
          return (
            <View className='order-item-wrapper' key={item.id}>
              <i-row i-class='left'>
                <i-col span='4' i-class='col-class'>
                  <i-avatar src={item.avatar} size='large' />
                </i-col>
                <i-col span='20' i-class='col-class'>
                  <i-row i-class='right'>

                    <i-col span='24' i-class='col-class date'>
                      订单日期:  {item.createdDate && <Text><Text>{item.createdDate.slice(0, 10)}</Text><Text decode="true">&nbsp;</Text> <Text>{item.createdDate.slice(11, 16)}</Text></Text>}
                    </i-col>
                    <i-divider height={10}></i-divider>
                    <i-col span='18' i-class='col-class name date'>
                      <Text>用户名:{item.nickName}</Text>
                      <View>打赏:￥{item.tips}</View>
                    </i-col>
                    <i-col span='24' i-class='col-class bold price'>
                      合计:￥{item.tips}
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

export default History;