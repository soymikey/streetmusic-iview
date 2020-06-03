import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';

import './tab3.scss';

class Tab3 extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '',
    usingComponents: {
      'i-row': '../../../iView/row/index',
      'i-col': '../../../iView/col/index',

      'i-avatar': '../../../iView/avatar/index',
      'i-divider': '../../../iView/divider/index',
      'i-icon': '../../../iView/icon/index',
      'i-divider': '../../../iView/divider/index',
    },
  };
  static defaultProps = {
    list: [],
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

    this.state.iconList.splice(index, 1, newIcon);
    this.setState({ iconList: this.state.iconList });
  }
  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    // const { iconList } = this.state;
    const { list } = this.props;
    return (
      <View className='tab3'>
        {list.map(item => {
          console.log('item.posts[0]', item.posters);
          return (
            <i-row i-class='row-tab3' key={item.id}>
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
                      <Text>{item.username} 发布视频：</Text>
                    </View>
                  </i-col>
                  <i-col span='24' i-class='col-class'>
                    <View className='date'>
                      <Text>{item.date}</Text>
                    </View>
                  </i-col>
                  <i-col span='24' i-class='col-class'>
                    <View className='content'>
                      <Text>{item.content}</Text>
                    </View>
                  </i-col>
                  {item.posters.length && (
                    <i-col span='24' i-class='col-class'>
                      <View className='image'>
                        <Image
                          src={item.posters[0]}
                          style='width: 100%;height:150px'
                        />
                      </View>
                    </i-col>
                  )}

                  <i-row i-class='icon-row'>
                    <i-col span='6' i-class='col-class icon-wrapper'>
                      <View onClick={this.iconHandler.bind(this, 'like')}>
                        <i-icon size={30} type='like' />
                      </View>
                      <View className='number'>
                        <Text>{item.likes}</Text>
                      </View>
                    </i-col>
                    <i-col span='6' i-class='col-class icon-wrapper'>
                      <View onClick={this.iconHandler.bind(this, 'share')}>
                        <i-icon size={30} type='share' />
                      </View>
                      <View className='number'>
                        <Text>{item.shares}</Text>
                      </View>
                    </i-col>
                    <i-col span='6' i-class='col-class icon-wrapper'>
                      <View onClick={this.iconHandler.bind(this, 'document')}>
                        <i-icon size={30} type='document' />
                      </View>
                      <View className='number'>
                        <Text>{item.comments}</Text>
                      </View>
                    </i-col>
                    <i-col span='6' i-class='col-class icon-wrapper'>
                      <View onClick={this.iconHandler.bind(this, 'collection')}>
                        <i-icon size={30} type='collection' />
                      </View>
                      <View className='number'>
                        <Text>{item.collections}</Text>
                      </View>
                    </i-col>
                  </i-row>
                </i-row>
              </i-col>
              <i-divider height={24}></i-divider>
            </i-row>
          );
        })}
        <i-divider content='加载已经完成,没有其他数据'></i-divider>
      </View>
    );
  }
}

export default Tab3;
