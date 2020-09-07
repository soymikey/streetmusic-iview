import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'


import './event.scss'



class Event extends Component {

  config = {
    navigationBarTitleText: '活动墙面'
  }
  constructor() {
    super(...arguments);
    this.state = {
      noramalData: [
        {
          "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190306144842/1001.png",
          "CoverHeight": 467,
          "CoverWidth": 350
        },
        {
          "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
          "CoverHeight": 871,
          "CoverWidth": 672
        },
      ],

      leftList: [],
      rightList: [],
      leftHight: 0,
      rightHight: 0
    };
  }

  componentDidMount() {
    var that = this;
    var allData = that.state.noramalData;
    //定义两个临时的变量来记录左右两栏的高度，避免频繁调用setData方法
    var leftH = that.state.leftHight;
    var rightH = that.state.rightHight;
    var leftData = [];
    var rightData = [];
    for (let i = 0; i < allData.length; i++) {
      var currentItemHeight = parseInt(Math.round(allData[i].CoverHeight * 345 / allData[i].CoverWidth));
      allData[i].CoverHeight = currentItemHeight + "rpx";//因为xml文件中直接引用的该值作为高度，所以添加对应单位
      if (leftH == rightH || leftH < rightH) {//判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
        leftData.push(allData[i]);
        leftH += currentItemHeight;
      } else {
        rightData.push(allData[i]);
        rightH += currentItemHeight;
      }
    }

    //更新左右两栏的数据以及累计高度
    that.setState({
      leftHight: leftH,
      rightHight: rightH,
      leftList: leftData,
      rightList: rightData
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='event'>
        <View class='content'>
          <View class='left'>
            {leftList.map((item, index) => {
              return <Block key={index}>
                <Image class='pic' style={"height:" + item.CoverHeight} src={item.Cover}></Image>
              </Block>
            })}
          </View>
          <View class='right'>
            {rightList.map((item, index) => {
              return <Block key={index}>
                <Image class='pic' style={"height:" + item.CoverHeight} src={item.Cover}></Image>
              </Block>
            })}
          </View>
        </View>
      </View>
    )
  }
}

export default Event
