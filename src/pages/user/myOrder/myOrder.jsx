/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Picker } from '@tarojs/components';
import { getOrderHistoryListById } from '@/api/order';
import './myOrder.scss';
class MyOrder extends Component {
  config = {
    navigationBarTitleText: '订单历史',
    usingComponents: {
      'i-row': '../../../iView/row/index',
      'i-col': '../../../iView/col/index',
      'i-divider': '../../../iView/divider/index',
      'i-avatar': '../../../iView/avatar/index',
      'i-divider': '../../../iView/divider/index',
      'i-icon': '../../../iView/icon/index',
      'i-modal': '../../../iView/modal/index',
      'i-input': '../../../iView/input/index',
      'i-cell-group': '../../../iView/cell-group/index',
      'i-cell': '../../../iView/cell/index',
    },
  };

  constructor() {
    super(...arguments);
    this.state = {
      total: 0,
      pageSize: 10,
      pageNo: 1,
      loading: false,
      list: [],
      amount: 0,
      startDate: '',
      endDate: '',
      startTime: '00:00',
      endTime: '00:00',
      today: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps);
  }
  componentDidMount() {
    this.initDate();
  }
  initDate() {

    var currentDate = new Date(+new Date() + 8 * 3600 * 1000);
    var ourDate = new Date(+new Date() + 8 * 3600 * 1000);
    ourDate.setDate(ourDate.getDate() - 30);

    this.setState({
      startDate: ourDate.toISOString().split('T')[0], endDate: currentDate.toISOString().split('T')[0],
      endTime: currentDate.toISOString().split('T')[1].slice(0, 5),
      today: new Date(+new Date() + 8 * 3600 * 1000).toISOString().split('T')[0]
    }, () => {
      this.getList(true);
    })
  }
  componentWillUnmount() { }
  getList(override) {
    Taro.showLoading({
      title: '加载中-订单历史',
    });
    const { pageSize, pageNo, startDate,
      endDate,
      startTime,
      endTime } = this.state
    const startDateTime = startDate + ' ' + startTime
    const endDateTime = endDate + ' ' + endTime
    const data = { pageSize, pageNo, startDateTime, endDateTime }
    return getOrderHistoryListById(data)
      .then(res => {
        this.setState({
          list: override ? res.data.list : this.state.list.concat(res.data.list),
          total: res.data.total, //总页数
          amount: res.data.amount || 0,
          loading: false,
        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      });
  }
  onChangeStartDate(e) {
    this.setState({ startDate: e.detail.value });
  }
  onChangeEndDate(e) {
    this.setState({ endDate: e.detail.value });
  }
  onChangeStartTime(e) {
    this.setState({ startTime: e.detail.value });
  }
  onChangeEndTime(e) {
    this.setState({ endTime: e.detail.value });
  }
  search() {
    this.getList(true)
  }

  onPullDownRefresh() {
    // 上拉刷新
    if (!this.state.loading) {

      this.setState({ pageNo: 1 }, () => {
        this.getList(true).then(res => {
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
        this.getList();
      });
    }
  }
  componentDidShow() {

  }

  componentDidHide() { }

  render() {
    const { list
    } = this.state;

    return (
      <View className='myOrder'>
        <i-cell-group>
          {list.map(item => {
            return <i-cell
              title={"类型:" + (item.state === '0' ? '未完成' : (item.state === '1' ? '进行中' : '已完成'))}
              label={item.createdDate.slice(0, 10) + '  ' + item.createdDate.slice(11, 19)}
            > <View slot="footer">
                <View className=''><i-avatar src={item.avatar} size='small' />{item.nickName}</View>
                <View className=''>{'￥ ' + item.price}</View>
              </View> </i-cell>

          })}
        </i-cell-group>
        <i-divider i-class='divider' height={48} content='加载已经完成,没有其他数据'></i-divider>
      </View>
    );
  }
}

export default MyOrder;
