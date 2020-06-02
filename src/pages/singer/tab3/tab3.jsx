import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';
import post1 from '@/asset/images/poster1.png';

import './tab3.scss';

class Tab3 extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '',
    usingComponents: {
      'i-row': '../../../iView/row/index',
      'i-col': '../../../iView/col/index',

      'i-avatar': '../../../iView/avatar/index',

      'i-icon': '../../../iView/icon/index',
    },
  };

  constructor() {
    super(...arguments);
    this.state = {
      tabList: [
        { key: 0, label: '选项1' },
        { key: 1, label: '选项2' },
        { key: 2, label: '选项3' },
      ],
      tagList: ['15后', 'Lv.6', '北京', '白羊座'],
      colorList: ['blue', 'green', 'red', 'yellow', 'default'],
      currentTab: 2,
      iconList: ['like', 'share', 'document', 'collection'],
      swiperHeight: 0,
    };
  }

  iconHandler(icon) {
    const index = this.state.iconList.findIndex(item => item === icon);
    const newIcon =
      icon.indexOf('_fill') === -1 ? icon + '_fill' : icon.split('_fill')[0];
    // this.state.iconList.splice(index, 1, newIcon);
    // console.log(this.state.iconList);
    this.state.iconList.splice(index, 1, newIcon);
    this.setState({ iconList: this.state.iconList });
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      tagList,
      colorList,
      tabList,
      currentTab,
      iconList,
      swiperHeight,
      scrollTop,
    } = this.state;

    return (
      <View className='tab3'>
        <i-row i-class='row-tab3'>
          <i-col span='4' i-class='col-class avatar'>
            <i-avatar
              src='https://i.loli.net/2017/08/21/599a521472424.jpg'
              size='large'
            />
          </i-col>
          <i-col span='20' i-class='col-class'>
            <i-row i-class='row-title'>
              <i-col span='24' i-class='col-class'>
                <View className='username'>
                  <Text>网易云小秘书 发布视频：</Text>
                </View>
              </i-col>
              <i-col span='24' i-class='col-class'>
                <View className='date'>
                  <Text> 昨天06：28</Text>
                </View>
              </i-col>
              <i-col span='24' i-class='col-class'>
                <View className='content'>
                  <Text>
                    #早安世界#知道劝你们玩手机是没有用的，那就只能给你们加油鼓励了，早，今天也要努力学习哦！
                  </Text>
                </View>
              </i-col>
              <i-col span='24' i-class='col-class'>
                <View className='image'>
                  <Image src={post1} style='width: 100%;height:150px' />
                </View>
              </i-col>

              <i-row i-class='icon-row'>
                {iconList.map(item => {
                  return (
                    <i-col key={item} span='6' i-class='col-class icon-wrapper'>
                      {/* <i-icon size={40} type='like_fill' /> */}
                      <View onClick={this.iconHandler.bind(this, item)}>
                        <i-icon size={30} type={item} />
                      </View>
                      <View className='number'>
                        <Text>32423</Text>
                      </View>
                    </i-col>
                  );
                })}
              </i-row>
            </i-row>
          </i-col>
        </i-row>
        <i-row i-class='row-tab3'>
          <i-col span='4' i-class='col-class avatar'>
            <i-avatar
              src='https://i.loli.net/2017/08/21/599a521472424.jpg'
              size='large'
            />
          </i-col>
          <i-col span='20' i-class='col-class'>
            <i-row i-class='row-title'>
              <i-col span='24' i-class='col-class'>
                <View className='username'>
                  <Text>网易云小秘书 发布视频：</Text>
                </View>
              </i-col>
              <i-col span='24' i-class='col-class'>
                <View className='date'>
                  <Text> 昨天06：28</Text>
                </View>
              </i-col>
              <i-col span='24' i-class='col-class'>
                <View className='content'>
                  <Text>
                    #早安世界#知道劝你们玩手机是没有用的，那就只能给你们加油鼓励了，早，今天也要努力学习哦！
                  </Text>
                </View>
              </i-col>
              <i-col span='24' i-class='col-class'>
                <View className='image'>
                  <Image src={post1} style='width: 100%;height:150px' />
                </View>
              </i-col>

              <i-row i-class='icon-row'>
                {iconList.map(item => {
                  return (
                    <i-col key={item} span='6' i-class='col-class icon-wrapper'>
                      {/* <i-icon size={40} type='like_fill' /> */}
                      <View onClick={this.iconHandler.bind(this, item)}>
                        <i-icon size={30} type={item} />
                      </View>
                      <View className='number'>
                        <Text>32423</Text>
                      </View>
                    </i-col>
                  );
                })}
              </i-row>
            </i-row>
          </i-col>
        </i-row>
      </View>
    );
  }
}

export default Tab3;
