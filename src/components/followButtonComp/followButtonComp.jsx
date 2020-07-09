import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { createFollow } from '@/api/common';

import './followButtonComp.scss';

class Followbuttoncomp extends Component {
  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillUnmount() {}
  onClickButton(value) {
    if (!this.props.userId) {
      Taro.showToast({ title: '用户id不能为空', icon: 'none' });
      return;
    }
    const data = {
      id: this.props.userId,
    };
    createFollow(data)
      .then(res => {
        this.props.onClickFollow_(value);
      })
      .catch(e => {});
  }

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { followed } = this.props;
    return (
      <View className='followButtonComp'>
        {followed ? (
          <Button
            size='mini'
            className='Disabled'
            onClick={this.onClickButton.bind(this, false)}
          >
            已关注
          </Button>
        ) : (
          <Button
            size='mini'
            className='error'
            onClick={this.onClickButton.bind(this, true)}
          >
            关注
          </Button>
        )}
      </View>
    );
  }
}

export default Followbuttoncomp;
Followbuttoncomp.defaultProps = {
  followed: true,
  userId: '',
};
