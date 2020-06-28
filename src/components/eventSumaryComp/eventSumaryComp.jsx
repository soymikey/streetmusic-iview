import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';

import { connect } from '@tarojs/redux';

import './eventSumaryComp.scss';

class Eventsumarycomp extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',

      'i-avatar': '../../iView/avatar/index',
      'i-divider': '../../iView/divider/index',
      'i-icon': '../../iView/icon/index',
      'i-divider': '../../iView/divider/index',
    },
  };
  goToEventDetailPage() {
    console.log('goToEventDetailPage');
    Taro.navigateTo({ url: '/pages/event/eventDetail/eventDetail?id=123' });
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { list, isShowIcons } = this.props;
    return (
      <View className='eventSumaryComp'>
        {list.map(item => {
          return (
            <i-row i-class='row-tab3' key={item.id}>
              <i-col span='3' i-class='col-class avatar'>
                <i-avatar
                  src='https://i.loli.net/2017/08/21/599a521472424.jpg'
                  size='large'
                />
              </i-col>
              <i-col span='21' i-class='col-class'>
                <i-row i-class='row-title'>
                  <View onClick={this.goToEventDetailPage.bind(this)}>
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
                  </View>
                  {isShowIcons ? (
                    <i-row i-class='icon-row'>
                      <i-col span='6' i-class='col-class icon-wrapper'>
                        <View onClick={this.iconHandler.bind(this, 'like')}>
                          <i-icon size={25} type='like' />
                        </View>
                        <View className='number'>
                          <Text>{item.likes}</Text>
                        </View>
                      </i-col>
                      <i-col span='6' i-class='col-class icon-wrapper'>
                        <View onClick={this.iconHandler.bind(this, 'share')}>
                          <i-icon size={25} type='share' />
                        </View>
                        <View className='number'>
                          <Text>{item.shares}</Text>
                        </View>
                      </i-col>
                      <i-col span='6' i-class='col-class icon-wrapper'>
                        <View onClick={this.iconHandler.bind(this, 'document')}>
                          <i-icon size={25} type='document' />
                        </View>
                        <View className='number'>
                          <Text>{item.comments}</Text>
                        </View>
                      </i-col>
                      <i-col span='6' i-class='col-class icon-wrapper'>
                        <View onClick={this.iconHandler.bind(this, 'collection')}>
                          <i-icon size={25} type='collection' />
                        </View>
                        <View className='number'>
                          <Text>{item.collections}</Text>
                        </View>
                      </i-col>
                    </i-row>
                  ) : null}
                </i-row>
              </i-col>
              <i-divider i-class='divider' height={24}></i-divider>
            </i-row>
          );
        })}
      </View>
    );
  }
}

export default Eventsumarycomp;

Eventsumarycomp.defaultProps = {
  isShowIcons: true, //是否显示文件底部的图标
};
