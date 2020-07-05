import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import FloatLayout from '@/components/FloatLayout/FloatLayout';

import './commentBarComp.scss';

class CommentBarComp extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: 'coimmentbar',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-icon': '../../iView/icon/index'
    },
  };
  constructor() {
    super(...arguments);
    this.state = {
      isOpened: false,
    };
  }
  onOpen() {
    this.setState({ isOpened: true });
  }
  onClose() {
    this.setState({ isOpened: false });
  }
  componentWillReceiveProps(nextProps) {
    console.log('1', this.props, nextProps);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { isOpened } = this.state
    return (
      <View className='commentBarComp'>
        <View className=''>

          <i-row>
            <i-col span='12' i-class='searchBar-col'>
              <View className='searchBar' onClick={this.onOpen.bind(this)}>
                <View className='content'><i-icon type="brush" size='20' />写评论</View>

              </View>

            </i-col>

            <i-col span='3' i-class='col-class'>
              <View className='icon-wrapper'>

                <i-icon size="35" type="message" />
              </View>

            </i-col>
            <i-col span='3' i-class='col-class'>
              <i-icon size="35" type="collection" />
            </i-col>
            <i-col span='3' i-class='col-class'>
              <i-icon size="35" type="praise" />
            </i-col>
            <i-col span='3' i-class='col-class'>
              <i-icon size="35" type="accessory" />
            </i-col>
          </i-row>
          <View className='tabbar-block'></View>

          <FloatLayout
            isOpened={isOpened}
            onClose={this.onClose.bind(this)}
            title='留言'
            id_={this.props.id_}
            type={this.props.type}
          />
        </View>

      </View>
    );
  }
}

export default CommentBarComp;

CommentBarComp.defaultProps = {
  id_: '',
  type: 0
};