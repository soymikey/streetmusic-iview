/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Picker } from '@tarojs/components';

import './myEvent.scss';

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
      eventLists: [
        { name: '阿桑-给你的爱一直很安静', price: '12.00' },
        { name: '又是一个睡不着的夜晚', price: '12.00' },
        { name: '疯人院', price: '12.00' },
        { name: '无邪', price: '12.00' },
        { name: '罪', price: '12.00' },
        { name: '落霜', price: '12.00' },
        { name: '背对背拥抱', price: '12.00' },
        { name: '春夏秋冬失去了你', price: '12.00' },
        { name: '江南（片段版）（翻自&nbsp;梁静茹）&nbsp;', price: '12.00' },
        { name: '如果云知道', price: '12.00' },
        { name: '领悟', price: '12.00' },
        { name: '辛晓琪', price: '12.00' },
        { name: '守候·辛晓琪', price: '12.00' },
        { name: '心如刀割', price: '12.00' },
        { name: '张学友', price: '12.00' },
        { name: '友情歌', price: '12.00' },
        { name: '无地自容', price: '12.00' },
        { name: '黑豹乐队', price: '12.00' },
        { name: '黑豹', price: '12.00' },
        { name: '大海', price: '12.00' },
        { name: '张雨生', price: '12.00' },
        { name: '大海', price: '12.00' },
        { name: '原谅', price: '12.00' },
        { name: '张玉华', price: '12.00' },
        { name: '张玉华', price: '12.00' },
        { name: '水手', price: '12.00' },
        { name: '郑智化', price: '12.00' },
        { name: '私房歌', price: '12.00' },
        { name: '雨一直下', price: '12.00' },
        { name: '群星', price: '12.00' },
        { name: '大人的情歌', price: '12.00' },
        { name: '练习', price: '12.00' },
        { name: '刘德华', price: '12.00' },
        { name: '美丽的一天', price: '12.00' },
        { name: '再回首', price: '12.00' },
        { name: '姜育恒', price: '12.00' },
        { name: '多年以后·再回首', price: '12.00' },
        { name: '最熟悉的陌生人', price: '12.00' },
        { name: '萧亚轩', price: '12.00' },
        { name: '萧亚轩', price: '12.00' },
        { name: '情书', price: '12.00' },
        { name: '张学友', price: '12.00' },
        { name: '友情歌', price: '12.00' },
      ],
      eventList: [],
      currentSongPage: 1,
      totalSongPage: 30,
      loading: false,
      isShowModal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentDidMount() {
    this.fetchEventList(1);
  }
  fetchEventList(pageNo) {
    this.setState({ loading: true });
    Taro.showLoading({
      title: '加载中-活动',
    });
    // 向后端请求指定页码的数据
    // return getArticles(pageNo)
    //   .then(res => {
    //     this.setState({
    //       currentSongPage: pageNo, //当前的页号
    //       totalSongPage: res.pages, //总页数
    //       eventList: [],
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
        currentSongPage: pageNo, //当前的页号
        totalSongPage: 8, //总页数
        eventList: this.state.eventLists.slice(0, pageNo * 20),
        loading: false,
      });
      Taro.hideLoading();
    }, 1000);
  }

  onClickEdit() {
    Taro.navigateTo({ url: "/pages/user/uploadEvent/uploadEvent?id='1234'" });
  }
  onClickDelete() {
    this.setState({ isShowModal: true });
  }
  // onOk() {
  //   console.log('ok');
  // }
  // onCancel() {
  //   this.setState({ isShowModal: false });
  // }
  onClickModal(e) {
    if (e.detail.index === 0) {
      this.setState({ isShowModal: false });
    }
  }
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  onPullDownRefresh() {
    if (!this.state.loading) {
      this.fetchEventList(1);
      // 处理完成后，终止下拉刷新
      Taro.stopPullDownRefresh();
    }
  }
  onReachBottom() {
    if (
      !this.state.loading &&
      this.state.currentSongPage < this.state.totalSongPage
    ) {
      this.fetchEventList(this.state.currentSongPage + 1);
    }
  }
  render() {
    const { eventList, isShowModal } = this.state;
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
          onClick={this.onClickModal.bind(this)}>
          <View>删除后无法恢复哦</View>
        </i-modal>
        <i-cell-group>
          {eventList.map(item => {
            return (
              <i-cell title={item.name} key={item.name}>
                {/* <i-switch slot='footer' checked /> */}

                <View className='button-wrapper' slot='footer'>
                  <Button
                    size='mini'
                    className='primary'
                    onClick={this.onClickEdit.bind(this)}>
                    编辑
                  </Button>
                  <Button
                    size='mini'
                    className='error'
                    style='margin-left:10px'
                    onClick={this.onClickDelete.bind(this)}>
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
