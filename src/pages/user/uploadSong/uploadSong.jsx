/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Picker } from '@tarojs/components';
import { numberOrDecimal } from '@/utils/tools.js';

import './uploadSong.scss';

class Uploadsong extends Component {
  config = {
    navigationBarTitleText: '上传歌曲',
    usingComponents: {
      'i-row': '../../../iView/row/index',
      'i-col': '../../../iView/col/index',
      'i-cell-group': '../../../iView/cell-group/index',
      'i-cell': '../../../iView/cell/index',
      'i-divider': '../../../iView/divider/index',
      'i-avatar': '../../../iView/avatar/index',
      'i-button': '../../../iView/button/index',
      'i-input': '../../../iView/input/index',
    },
  };

  constructor() {
    super(...arguments);
    this.state = {
      name: '',
      content: '',
      duration: '',
      type: '',
      price: '',
      id: '',
      isEdit: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}
  componentWillMount() {
    console.log(this.$router.params);
    if (this.$router.params.id) {
      this.setState({ isEdit: true, id: this.$router.params.id });
    } else {
      this.setState({ isEdit: false, id: '' });
    }
  }
  onChangeTime(e) {
    this.setState({ duration: e.detail.value });
  }
  onChangeName(e) {
    this.setState({ name: e.target.detail.value });
  }
  onChangeContent(e) {
    this.setState({ content: e.target.detail.value });
  }
  onChangeType(e) {
    this.setState({ type: e.target.detail.value });
  }
  onChangePrice(e) {
    let value = e.detail.detail.value;
    // value = value.replace(/[^\d.]/g, '');
    this.setState({ price: value });
  }
  onClickUpload() {
    const { name, content, duration, type, price } = this.state;
    if (!name.trim().length) {
      Taro.showToast({ title: '歌曲名称不能为空', icon: 'none' });
      return;
    }
    if (!duration.trim().length) {
      Taro.showToast({ title: '歌曲时间不能为空', icon: 'none' });
      return;
    }
    if (!type.trim().length) {
      Taro.showToast({ title: '歌曲类型不能为空', icon: 'none' });
      return;
    }
    if (!numberOrDecimal(price)) {
      Taro.showToast({
        title: '歌曲价格只能是整数或者小数',
        icon: 'none',
      });
      return;
    }
    console.log(this.state);
  }
  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { name, content, duration, type, price, isEdit, id } = this.state;
    return (
      <View className='uploadSong'>
        <i-input
          title='名称'
          placeholder='歌曲名称'
          value={name}
          maxlength={-1}
          onChange={this.onChangeName.bind(this)}
        />
        <i-input
          onChange={this.onChangeContent.bind(this)}
          value={content}
          title='介绍'
          placeholder='歌曲介绍'
          maxlength={150}
          type='textarea'
        />

        <Picker mode='time' onChange={this.onChangeTime.bind(this)}>
          <i-input title='时长' placeholder='歌曲时长' value={duration} disabled />
        </Picker>
        <i-input
          title='类型'
          placeholder='歌曲类型'
          value={type}
          maxlength={-1}
          onChange={this.onChangeType.bind(this)}
        />
        <i-input
          onChange={this.onChangePrice.bind(this)}
          title='价格'
          placeholder='歌曲价格'
          maxlength={-1}
          value={price}
        />

        <View className='button-wrapper'>
          {isEdit ? (
            <Button
              size='mini'
              className='success'
              onClick={this.onClickUpload.bind(this)}>
              更新歌曲
            </Button>
          ) : (
            <Button
              size='mini'
              className='primary'
              onClick={this.onClickUpload.bind(this)}>
              上传歌曲
            </Button>
          )}
        </View>
      </View>
    );
  }
}

export default Uploadsong;
