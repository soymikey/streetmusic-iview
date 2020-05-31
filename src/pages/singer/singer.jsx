import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';
import post1 from '@/asset/images/poster1.png';

import './singer.scss';

class Singer extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '歌手详情',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-tag': '../../iView/tag/index',
      'i-avatar': '../../iView/avatar/index',
      'i-button': '../../iView/button/index',
      'i-icon': '../../iView/icon/index',
      'i-tabs': '../../iView/tabs/index',
      'i-tab': '../../iView/tab/index',
    },
  };
  constructor() {
    super(...arguments);
    this.state = {
      tabList: ['选项1', '选项2', '选项3'],
      tagList: ['15后', 'Lv.6', '北京', '白羊座'],
      colorList: ['blue', 'green', 'red', 'yellow', 'default'],
      currentTab: '选项1',
      iconList: ['like', 'share', 'document', 'collection'],
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
  onChangeTab(e) {
    const value = e.detail.key;
    this.setState({ currentTab: value });
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { tagList, colorList, tabList, currentTab, iconList } = this.state;
    return (
      <View className='singer'>
        <View className='singer-info'>
          <View class='background'>
            <Image mode='aspectFill' src={post1} style='width: 100%;height: 100%;' />
          </View>
          <i-row i-class='row-top'>
            <i-col span='17' i-class='col-class'>
              <i-avatar
                src='https://i.loli.net/2017/08/21/599a521472424.jpg'
                size='large'
              />
            </i-col>
            <i-col span='4' i-class='col-class'>
              <Text className='follow-button'>+ 关注</Text>
            </i-col>
            <i-col span='3' i-class='col-class'>
              <i-icon size={40} type='message' />
            </i-col>
          </i-row>
          <i-row i-class='row-name'>
            <i-col span='16' i-class='col-class username ellipsis'>
              <Text>冷血刺客的三碗面</Text>
            </i-col>
          </i-row>
          <i-row i-class='row-followers-fans'>
            <i-col span='8' i-class='col-class'>
              关注:23423
            </i-col>
            <i-col span='8' i-class='col-class'>
              粉丝:4324
            </i-col>
          </i-row>
          <View className='tag-container'>
            {tagList.map(item => {
              return (
                <i-tag
                  key={item}
                  color={colorList[Math.floor(Math.random() * 6)]}
                  class='i-tags'>
                  {item}
                </i-tag>
              );
            })}
          </View>
        </View>
        <View className='tabs-container'>
          <i-tabs current={currentTab} onChange={this.onChangeTab.bind(this)}>
            {tabList.map(item => {
              return <i-tab key={item} title={item} type='border' count='3'></i-tab>;
            })}
          </i-tabs>
        </View>
        <View className='tab-container'>
          <View className='tab1'>
            <i-row i-class='row-tab1'>
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
            <i-row i-class='row-tab1'>
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
        </View>
      </View>
    );
  }
}

export default Singer;
