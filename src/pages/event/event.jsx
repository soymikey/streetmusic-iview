import Taro, { Component } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import TabbarComp from '@/components/TabbarComp/TabbarComp';
import { getHotEventList } from '@/api/event'
import { goToPage } from '@/utils/tools.js';

import './event.scss'


let leftHeight = 0
let rightHeight = 0
class Event extends Component {

  config = {
    navigationBarTitleText: '活动',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-divider': '../../iView/divider/index',
      "i-message": "../../iView/message/index",
    },
  }
  constructor(props) {
    super(props)
    this.state = {
      leftList: [],
      rightList: [],
      list: [],
      total: 0,
      pageSize: 20,
      pageNo: 1,
      loading: false,
    }
  }
  componentDidMount() {
    this.fetchHotEventList(true)

  }

  async isLeft() {
    const { list, leftList, rightList } = this.state;
    for (const item of list) {
      leftHeight <= rightHeight ? leftList.push(item) : rightList.push(item); //判断两边高度，来觉得添加到那边
      await this.getBoxHeight(leftList, rightList);
    }
  }
  fetchHotEventList(override) {
    Taro.showLoading({
      title: '加载中-活动',
    });
    // 向后端请求指定页码的数据
    const data = { pageSize: this.state.pageSize, pageNo: this.state.pageNo }
    this.setState({ loading: true });
    return getHotEventList(data)
      .then(res => {
        for (const item of res.data.list) {
          item.CoverWidth = ''
          item.CoverHeight = ''
          item.poster = JSON.parse(item.poster)
          item.Cover = item.poster[0]
        }
        async function awaitAll(array) {
          const promises = array.map(item => Taro.getImageInfo({ src: item.Cover }).then((res) => {
            item.CoverWidth = res.width + 'px'
            item.CoverHeight = res.height + 'px'

          }))
          await Promise.all(promises)
        }
        awaitAll(res.data.list)
        this.setState({
          list: override ? res.data.list : this.state.list.push(res.data.list),
          total: res.data.total, //总页数
          loading: false,
          leftList: [],
          rightList: []
        }, () => {
          this.isLeft()
        });
      })
      .catch(err => {
        this.setState({ loading: false })
        console.log('==> [ERROR]', err);
      })
  }
  getBoxHeight(leftList, rightList) { //获取左右两边高度

    let query = Taro.createSelectorQuery();
    return new Promise((resolve) => {
      this.setState({ leftList, rightList }, () => {
        setTimeout(() => {
          query.select('#left').boundingClientRect();
          query.select('#right').boundingClientRect();
          query.exec((res) => {
            leftHeight = res[0].height;
            rightHeight = res[1].height;
            resolve();
          });
        }, 50);
      });
    })
  }
  goToEventDetailPage(id) {
    goToPage(`/pages/event/eventDetail/eventDetail?id=${id}`)
  }

  onPullDownRefresh() {
    if (!this.state.loading) {
      this.setState({ pageNo: 1 }, () => {
        this.fetchHotEventList(true).then(res => {
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
        this.fetchHotEventList();
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { leftList, rightList } = this.state;
    return (
      <View className='event pb50px'>
        <i-message id="message" />

        <ScrollView
          enableFlex={true}
          className='content'>
          <View className='left' id="left" ref="left">
            {leftList.map((item, index) => {
              return <View key={index} onClick={this.goToEventDetailPage.bind(this, item.id)} className='wrapper'>
                <Image lazyLoad mode="widthFix" className='pic' src={item.Cover}></Image>
                <View className='title ellipsis'>{item.name}</View>

              </View>
            })}
          </View>
          <View className='right' id="right">
            {rightList.map((item, index) => {
              return <View key={index} onClick={this.goToEventDetailPage.bind(this, item.id)} className='wrapper'>
                <Image lazyLoad mode="widthFix" className='pic' src={item.Cover}></Image>
                <View className='title ellipsis'>{item.name}</View>
              </View>
            })}
          </View>
          <View className="clear"></View>

        </ScrollView>
        <i-divider i-class='divider' content='加载已经完成,没有其他数据'></i-divider>
        <View className='tabbar-container'>
          <TabbarComp currentTab='event' />
        </View>
      </View>

    )
  }
}

export default Event
