import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';
import tipsPNG from '@/asset/icon/tips.png';


import './tipsComp.scss';
var left = 0
var top = 0
var deg = 0
var obj;
class tipsComp extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {

    usingComponents: {

    },
  };
  constructor() {
    super(...arguments);
    this.state = {
      src: 'test.png',
      left: 0,
      top: 0,
      windowHeight: 0,
      windowWidth: 0,
      deg: 0,
    };
  }


  componentDidMount() {
    this.setState({
      windowHeight: Taro.getSystemInfoSync().windowHeight - Taro.getSystemInfoSync().windowHeight % 20,
      windowWidth: Taro.getSystemInfoSync().windowWidth - Taro.getSystemInfoSync().windowWidth % 20
    })
    obj = this;
    Taro.onAccelerometerChange(function (res) {
      // x轴
      if (res.x > 0) { //向右
        deg += 10
        if (left < (obj.state.windowWidth - 50)) {
          left += 15;
        }

      }
      else if (res.x < 0) { //向左
        deg -= 10
        if (left !== 0) {
          left -= 15;
        }
      }
      // y轴
      if (res.y > 0) {//向上
        if (top !== 0) {
          top -= 15;
        }
      }
      else if (res.y < 0) {//向下
        if (top < (obj.state.windowHeight - 70)) {
          top += 15;
        }
      }
      obj.setState({
        left: left,
        deg: deg
      })


    })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { left, deg } = this.state
    return (
      <View className='outter-wrapper' style={{ transform: 'translate(' + left + 'px)' }}>
        <Image
          className='image'
          style={{ transform: 'rotate(' + deg + 'deg)' }}
          src={tipsPNG} />
      </View>

      // <View className='outter-wrapper' style={{ transform: 'translate(' + left + 'px,' + top + "px)" }}>
      //   <View className="wrap">
      //     <View className="box1 box" >
      //       <Image src={imageUrl} style='height:100%;width:100%;' />
      //     </View>
      //     <View className="box2 box" >
      //       <Image src={imageUrl} style='height:100%;width:100%;' />
      //     </View>
      //     <View className="box3 box" >
      //       <Image src={imageUrl} style='height:100%;width:100%;' />
      //     </View>
      //     <View className="box4 box" >
      //       <Image src={imageUrl} style='height:100%;width:100%;' />
      //     </View>
      //     <View className="box5 box" >
      //       <Image src={imageUrl} style='height:100%;width:100%;' />
      //     </View>
      //     <View className="box6 box" >
      //       <Image src={imageUrl} style='height:100%;width:100%;' />
      //     </View>
      //   </View>
      // </View>
    );
  }
}

export default tipsComp;
