import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'


import './withdrawHistory.scss'

import {
  getWithdrawList
} from '@/api/user';
class Withdrawhistory extends Component {

  config = {
    navigationBarTitleText: '提现明细',
    usingComponents: {
      'i-cell-group': '../../../../iView/cell-group/index',
      'i-cell': '../../../../iView/cell/index',
      'i-divider': '../../../../iView/divider/index',
      'i-input': '../../../../iView/input/index',
      'i-avatar': '../../../../iView/avatar/index',
    },
  }
  constructor() {
    super(...arguments);
    this.state = {
      list: [],
      total: 0,
      amount: 0,
      pageSize: 20,
      pageNo: 1,
      loading: false,
      startDate: '',
      endDate: '',
      startTime: '00:00',
      endTime: '00:00',
      today: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
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
      today: new Date(+new Date() + 8 * 3600 * 1000).toISOString().split('T')[0]
    }, () => {
      this.getList(true);
    })
  }

  getList(override) {
    Taro.showLoading({
      title: '加载中-提现记录',
    });

    // 向后端请求指定页码的数据
    const { pageSize, pageNo, startDate,
      endDate,
      startTime,
      endTime } = this.state
    const startDateTime = startDate + ' ' + startTime
    const endDateTime = endDate + ' ' + endTime
    const data = { pageSize, pageNo, startDateTime, endDateTime }
    this.setState({ loading: true });
    return getWithdrawList(data)
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
      })
  }
  typeFormatter(item) {
    const { amount,
      avatar,
      createdDate,
      id,
      nickName,
      reason,
      state,
      userId,
      verifiedDate, } = item

    // 提现
    let stateText = ''

    if (state === '0') {
      stateText = '审核中...'
    }
    else if (state === '1') {
      stateText = '提现成功'

    } else if (state === '-1') {
      stateText = '提现失败'

    }
    return { state, stateText, avatar, nickName, amount_: amount, createdDate, reason }
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
  stateInText(state, reason) {
    if (state === '0') {
      return '审核中'
    } else if (state === '1') {
      return '提现成功'
    } else if (state === '-1') {
      return `提现失败-${reason}`
    }
  }

  render() {
    const { list, startDate, total, amount,
      endDate,
      startTime,
      endTime, today } = this.state
    return (
      <View className='withdrawHistory'>
        <View style='display:flex' >
          <View style='flex:1'>
            <Picker mode='date' onChange={this.onChangeStartDate.bind(this)} value={startDate} end={today}>
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
            <Picker mode='date' onChange={this.onChangeEndDate.bind(this)} value={endDate}>
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
            搜索
              </Button>
        </View>
        <i-cell-group>
          <i-cell title={'总计:' + amount + '元'} > <View slot="footer">{total}条记录</View> </i-cell>

          {list.map(item => {
            const { stateText, avatar, nickName, amount_, createdDate, reason, state } = this.typeFormatter(item)
            return <i-cell
              title={"类型:提现"}
              label={createdDate.slice(0, 10) + '  ' + createdDate.slice(11, 19)}
            > <View slot="footer">
                <View className=''>{'￥ ' + amount_}</View>
                {state === "-1" && <View className='error-text'>{stateText}
                  <View className='error-text'>{reason}</View>
                </View>}
                {state === "0" && <View className='warning-text'>{stateText}</View>}
                {state === "1" && <View className='primary-text'>{stateText}</View>}

              </View> </i-cell>

          })}
        </i-cell-group>
        <i-divider i-class='divider' content='加载已经完成,没有其他数据' ></i-divider>
      </View>
    )
  }
}

export default Withdrawhistory
