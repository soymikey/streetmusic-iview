import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import Test from '@/components/test/test'
import { toolbox } from '@/utils/tools.js'
import { request } from '@/utils/request.js'
import './index.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      "i-button": "../../iview/button/index",
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  testRequest() {
    // http://49.235.133.74:4001/api/categories/getList
    request('http://49.235.133.74:4001/api/categories/getList', {}, '123', 'get',
      function (res) {
        //res就是我们请求接口返回的数据
        console.log(res)
      }, function () {
        wx.showToast({
          title: '加载数据失败',
        })
      })

  }
  componentWillUnmount() { }


  componentDidShow() {
    this.testRequest()
  }

  componentDidHide() { }
  clickHandler() {
    console.log("clicked");
  }
  render() {
    return (
      <View className='index'>
        <Test ></Test>
        <i-button type='primary' onClick={this.clickHandler.bind(this)}>
          {isDev()}
        </i-button>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

export default Index
