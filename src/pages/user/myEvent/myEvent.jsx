/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, } from '@tarojs/components';
import { getEventListById, deleteEvent } from '@/api/event';
import { connect } from '@tarojs/redux'
import { goToPage } from '@/utils/tools.js';
import './myEvent.scss';
@connect(state => state)


class MyEvent extends Component {
  config = {
    navigationBarTitleText: '我的活动',
    usingComponents: {
      'i-row': '../../../iView/row/index',
      'i-col': '../../../iView/col/index',
      'i-cell-group': '../../../iView/cell-group/index',
      'i-cell': '../../../iView/cell/index',
      'i-divider': '../../../iView/divider/index',
      'i-avatar': '../../../iView/avatar/index',
      'i-button': '../../../iView/button/index',
      'i-input': '../../../iView/input/index',
      'i-switch': '../../../iView/switch/index',
      'i-modal': '../../../iView/modal/index',
    },
  };

  constructor() {
    super(...arguments);
    this.state = {

      list: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      isShowModal: false,
      eventId: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentDidMount() {

  }
  fetchEventList(override) {
    Taro.showLoading({
      title: '加载中-活动',
    });
    // 向后端请求指定页码的数据
    const data = { id: this.props.user.id, pageSize: this.state.pageSize, pageNo: this.state.pageNo }

    return getEventListById(data)
      .then(res => {
        this.setState({
          list: override ? res.data.list : this.state.list.concat(res.data.list),
          total: res.data.total, //总页数
          loading: false,
        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      })
  }

  onClickEdit(id) {
    goToPage(`/pages/user/uploadEvent/uploadEvent?id=${id}`)
  }
  onClickDelete(id) {
    this.setState({ isShowModal: true, eventId: id });
  }
  onConfirmDelete(e) {
    if (e.detail.index === 0) {
      this.setState({ isShowModal: false });
    } else {
      deleteEvent({ id: this.state.eventId }).then(res => {
        this.setState({ isShowModal: false });
        this.fetchEventList(true)
      })
    }

  }


  componentWillUnmount() { }

  componentDidShow() {
    this.fetchEventList(true);
  }

  componentDidHide() { }
  onPullDownRefresh() {
    if (!this.state.loading) {
      this.setState({ pageNo: 1 }, () => {
        this.fetchEventList(true).then(res => {
          // 处理完成后，终止下拉刷新
          Taro.stopPullDownRefresh();
        });
      });


    }
  }
  onReachBottom() {
    if (
      !this.state.loading &&
      this.state.pageNo < this.state.total
    ) {
      this.setState({ pageNo: this.state.pageNo + 1 }, () => {
        this.fetchEventList();
      });
    }
  }
  render() {
    const { list, isShowModal } = this.state;
    return (
      <View className='myEvent'>
        <i-modal
          actions={[
            {
              name: '取消',
            },
            {
              name: '删除',
              color: '#ed3f14',
              loading: false,
            },
          ]}
          visible={isShowModal}
          // onOk={this.onOk.bind(this)}
          // onCancel={this.onCancel.bind(this)}
          onClick={this.onConfirmDelete.bind(this)}>
          <View>删除后无法恢复哦</View>
        </i-modal>
        <i-cell-group>
          {list.map(item => {
            return (
              <i-cell title={item.name} key={item.id}>
                {/* <i-switch slot='footer' checked /> */}

                <View className='button-wrapper' slot='footer'>
                  <Button
                    size='mini'
                    className='primary'
                    onClick={this.onClickEdit.bind(this, item.id)}>
                    编辑
                  </Button>
                  <Button
                    size='mini'
                    className='error'
                    style='margin-left:10px'
                    onClick={this.onClickDelete.bind(this, item.id)}>
                    删除
                  </Button>
                </View>
              </i-cell>
            );
          })}
        </i-cell-group>
        <i-divider content='加载已经完成,没有其他数据'></i-divider>
      </View>
    );
  }
}

export default MyEvent;
