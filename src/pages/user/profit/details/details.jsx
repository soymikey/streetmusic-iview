import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'


import './details.scss'

import {
  getStatementList
} from '@/api/user';
class Details extends Component {

  config = {
    navigationBarTitleText: '流水列表',
    usingComponents: {
      'i-cell-group': '../../../../iView/cell-group/index',
      'i-cell': '../../../../iView/cell/index',
      'i-avatar': '../../../../iView/avatar/index',
      'i-divider': '../../../../iView/divider/index',
      'i-input': '../../../../iView/input/index',
      'i-action-sheet': '../../../../iView/action-sheet/index',
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
      isShowActionSheet: false,
      type: '0',
      typeName: '全部',
      actions: [
        {
          name: '全部',
          type: '0',
        },
        {
          name: '订单',
          type: '1',
        },
        {
          name: '打赏',
          type: '2',
        },
        {
          name: '活动奖励',
          type: '3',
        },
        {
          name: '提现',
          type: '4',
        },

      ],
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
    ourDate.setDate(ourDate.getDate() - 180);

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
      title: '加载中-流水记录',
    });

    // 向后端请求指定页码的数据
    const { pageSize, pageNo, startDate,
      endDate,
      startTime,
      endTime, type } = this.state
    const startDateTime = startDate + ' ' + startTime
    const endDateTime = endDate + ' ' + endTime
    const data = { pageSize, pageNo, startDateTime, endDateTime, type }
    this.setState({ loading: true });
    return getStatementList(data)
      .then(res => {
        console.log('res.data.list', res.data.list);
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
  onCancel() {
    this.setState({ isShowActionSheet: false })
  }
  onChange(e) {
    const index = e.detail.index
    const type = this.state.actions[index].type
    const typeName = this.state.actions[index].name
    this.setState({ isShowActionSheet: false, type, typeName })

  }
  onShowActionSheet() {
    this.setState({ isShowActionSheet: true })
  }
  typeFormatter(item) {
    const { type } = item
    // 小费
    // 订单
    // 活动奖励
    // 提现
    let state = ''
    let typeINText = ''
    let avatar = item.avatar
    let nickname = item.nickName
    let amount = ''
    let createdDate = item.createdDate

    if (type === 1) {
      state = '完成'
      typeINText = '小费'
      amount = item.tips
    } else if (type === 2) {
      typeINText = '订单'
      if (item.orderState === "0") {
        state = '未完成'
      }
      else if (item.orderState === "1") {
        state = '进行中'
      }
      else if (item.orderState === "2") {
        state = '完成'
      }
      amount = item.price

    } else if (type === 3) {
      typeINText = '活动奖励'
      if (item.rewardState === '0') {
        state = '未完成'
      } else if (item.rewardState === '1') {
        state = '完成'
      }
      amount = item.amount
    }
    else if (type === 4) {
      typeINText = '提现'
      if (item.withdrawState === "-1") {
        state = '提现失败'
      } else if (item.withdrawState === "0") {
        state = '待确认'
      } else if (item.withdrawState === "1") {
        state = '提现成功'
      }
      amount = '-' + item.amount
    }

    return { typeINText, state, avatar, nickname, amount, createdDate }

  }

  render() {
    const { list, startDate, total, amount,
      endDate,
      startTime,
      endTime, today, isShowActionSheet, actions, typeName } = this.state
    return (
      <View className='details'>
        <i-action-sheet visible={isShowActionSheet} actions={actions} show-cancel onCancel={this.onCancel.bind(this)} onClick={this.onChange.bind(this)} />
        <View style='display:flex' onClick={this.onShowActionSheet.bind(this)} >
          <i-input title='收益类型' placeholde='请选择收益类型' disabled={true} value={typeName} ></i-input>
        </View>

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
            </Picker>
          </View>
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
            const { state, avatar, nickname, amount, createdDate, typeINText } = this.typeFormatter(item)
            return <i-cell
              // title={'状态:' + this.stateInText(item.state, item.reason)}
              title={"类型:" + typeINText}
              label={'收入: ' + amount + ' 元 ' + '  状态:' + state}
            > <View slot="footer">
                <i-avatar src={avatar} size='large' />
                <View className=''>{nickname}</View>
                <View className=''>{createdDate.slice(0, 10) + '  ' + createdDate.slice(11, 19)}</View>


              </View> </i-cell>

          })}
        </i-cell-group>
        <i-divider i-class='divider' content='加载已经完成,没有其他数据' ></i-divider>
      </View >
    )
  }
}

export default Details
