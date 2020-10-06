/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Picker } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getReferenceHistoryListById } from '@/api/user';

import './history.scss';

@connect(state => state)
class History extends Component {
  config = {
    navigationBarTitleText: '推荐好友',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-divider': '../../iView/divider/index',
      'i-avatar': '../../iView/avatar/index',
      'i-divider': '../../iView/divider/index',
      'i-icon': '../../iView/icon/index',
      'i-modal': '../../iView/modal/index',
      'i-cell-group': '../../iView/cell-group/index',
      'i-cell': '../../iView/cell/index',
      'i-input': '../../iView/input/index',
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
      today:'',
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps);
  }
  componentDidMount() {
    this.initDate()
  }
  initDate() {
    var currentDate = new Date(+new Date() + 8 * 3600 * 1000);
    var ourDate = new Date(+new Date() + 8 * 3600 * 1000);
    ourDate.setDate(ourDate.getDate() - 30);

    this.setState({
      startDate: ourDate.toISOString().split('T')[0], endDate: currentDate.toISOString().split('T')[0],
      endTime: currentDate.toISOString().split('T')[1].slice(0, 5),
      today:new Date(+new Date() + 8 * 3600 * 1000).toISOString().split('T')[0]
    }, () => {
      this.getList(true);
    })
  }

  getList(override) {
    Taro.showLoading({
      title: '加载中-推荐好友',
    });
    const { pageSize, pageNo, startDate,
      endDate,
      startTime,
      endTime } = this.state
    const startDateTime = startDate + ' ' + startTime
    const endDateTime = endDate + ' ' + endTime
    const data = { pageSize, pageNo, startDateTime, endDateTime }

    return getReferenceHistoryListById(data)
      .then(res => {
        this.setState({
          list: override ? res.data.list : this.state.list.concat(res.data.list),
          total: res.data.total, //总页数
          amount: res.data.amount || 0,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({ loading: false })
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
    const { list, startDate, total, amount,
      endDate,
      startTime,
      endTime,today } = this.state
    return (

      <View className='history'>
        <View style='display:flex' >
          <View style='flex:1'>
            <Picker mode='date' onChange={this.onChangeStartDate.bind(this)} value={startDate}>
              <View onClick={this.hideKeyBoard.bind(this)}>
                <i-input title='开始日期' placeholder='开始日期' value={startDate} disabled />
              </View>
            </Picker></View>
          <View style='flex:1'>
            <Picker mode='time' onChange={this.onChangeStartTime.bind(this)} value={startTime}>
              <View onClick={this.hideKeyBoard.bind(this)}>
                <i-input
                  title='开始时间'
                  placeholder='开始时间'
                  value={startTime}
                  disabled
                />
              </View>
            </Picker></View>
        </View>
        <View style='display:flex' >
          <View style='flex:1'>
            <Picker mode='date' onChange={this.onChangeEndDate.bind(this)} end={today} value={endDate}>
              <View onClick={this.hideKeyBoard.bind(this)}>
                <i-input title='结束日期' placeholder='结束日期' value={endDate} disabled />
              </View>
            </Picker></View>
          <View style='flex:1'>
            <Picker mode='time' onChange={this.onChangeEndTime.bind(this)} value={endTime}>
              <View onClick={this.hideKeyBoard.bind(this)}>
                <i-input
                  title='结束时间'
                  placeholder='活动结束时间'
                  value={endTime}
                  disabled
                />
              </View>
            </Picker></View>
        </View>
        <View className='button-wrapper'>
          <Button
            size='mini'
            className='primary'
            onClick={this.search.bind(this)}
          >
            搜索订单
              </Button>
        </View>
        <i-cell-group>
          <i-cell > <View slot="footer">{total}条记录</View> </i-cell>

        </i-cell-group>
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
                    <i-divider i-class='divider' height={10}></i-divider>
                    <i-col span='18' i-class='col-class name date'>
                      <Text>用户名:{item.nickName}</Text>
                    </i-col>
                    <i-col span='24' i-class='col-class price'>
                      状态:{item.state === '0' ? '未获得奖励' : '恭喜,获得50元奖励'}
                    </i-col>
                  </i-row>
                </i-col>
              </i-row>
              <i-divider i-class='divider' height={24}></i-divider>
            </View>
          );
        })}
        <i-divider i-class='divider' height={48} content='加载已经完成,没有其他数据'></i-divider>
      </View>
    );
  }
}

export default History;
