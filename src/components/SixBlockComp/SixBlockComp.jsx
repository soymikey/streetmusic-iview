import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';
import { goToPage } from '@/utils/tools.js';
// import square1 from '@/asset/images/square1.png';

// import square2 from '@/asset/images/square2.png';
// import square3 from '@/asset/images/square3.png';
// import square4 from '@/asset/images/square4.png';
// import square5 from '@/asset/images/square5.png';
// import square6 from '@/asset/images/square6.png';

import './SixBlockComp.scss';

class SixBlockComp extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    // navigationBarTitleText: '首页'
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
    },
  };
  constructor() {
    super(...arguments);
    this.state = {

      // list: [square1, square2, square3, square4, square5, square6],
    };
  }
  goToSingerPage(id) {
    goToPage(`/pages/singer/singer?id=${id}`)
  }
  goToSingerListPage(type) {

    goToPage(`/pages/singer/singerList?type=${type}`)
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props, nextProps);
  // }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { title, list, type } = this.props;
    return (
      <View className='SixBlockComp'>
        <i-row i-class='title-row'>
          <i-col span='20' i-class='col-class'>
            <View className='main-title'>
              <Text>{title}</Text>
            </View>
          </i-col>

          <i-col span='4' i-class='col-class'>
            <View className='more' onClick={this.goToSingerListPage.bind(this, type)}>
              <Text>更多</Text>
            </View>
          </i-col>
        </i-row>
        <View className='container-wrapper'>
          {list.map(item => {
            return (
              <View
                className='container'
                key={item}
                onClick={this.goToSingerPage.bind(this, item.toUserId)}
              >
                <View className='image-wrapper'>
                  <Image mode='aspectFill' className='image' src={item.avatar} />
                </View>
                <View className='title'>{type === 'hot' ? item.nickName : item.name}</View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default SixBlockComp;
