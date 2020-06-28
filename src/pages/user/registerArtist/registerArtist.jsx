/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Picker } from '@tarojs/components';
import ImagePickerComp from '@/components/ImagePickerComp/ImagePickerComp';

import './registerArtist.scss';

class Registerartist extends Component {
  config = {
    navigationBarTitleText: '注册艺人',
    usingComponents: {
      'i-row': '../../../iView/row/index',
      'i-col': '../../../iView/col/index',
      'i-cell-group': '../../../iView/cell-group/index',
      'i-cell': '../../../iView/cell/index',
      'i-divider': '../../../iView/divider/index',
      'i-avatar': '../../../iView/avatar/index',
      'i-button': '../../../iView/button/index',
      'i-input': '../../../iView/input/index',
      'i-panel': '../../../iView/panel/index',
    },
  };
  constructor() {
    super(...arguments);
    this.state = {
      realName: '',
      content: '',
      provinceCityRegion: { code: [], value: [] },
      address: '',
      avatar: [],
      phone: '',
      residentId: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  onChangeRealName(e) {
    this.setState({ realName: e.target.detail.value });
  }
  onChangeProvinceCityRegion(e) {
    this.setState({
      provinceCityRegion: { value: e.detail.value, code: e.detail.code },
    });
  }
  hideKeyBoard() {
    Taro.hideKeyboard();
  }
  onChangeAddress(e) {
    this.setState({ address: e.detail.detail.value });
  }
  onChangeContent(e) {
    this.setState({ content: e.detail.detail.value });
  }
  onChangePhone(e) {
    this.setState({ phone: e.detail.detail.value });
  }
  onChangeResidentId(e) {
    this.setState({ residentId: e.detail.detail.value });
  }
  remove(index) {
    this.setState({
      avatar: this.state.avatar.filter((item, index_) => index_ !== index),
    });
  }
  add(obj) {
    this.setState({
      avatar: this.state.avatar.concat(obj),
    });
  }
  register() {
    const {
      realName,
      content,
      provinceCityRegion,
      address,
      avatar,
      phone,
      residentId,
    } = this.state;
    const residentIdPattern = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
    const phonePattern = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;

    if (!avatar.length) {
      Taro.showToast({ title: '头像不能为空', icon: 'none' });
      return;
    }
    if (!realName.trim().length) {
      Taro.showToast({ title: '真实名字不能为空', icon: 'none' });
      return;
    }
    if (!phonePattern.test(phone)) {
      Taro.showToast({ title: '请输入有效的手机号', icon: 'none' });
      return;
    }
    if (!residentIdPattern.test(residentId)) {
      Taro.showToast({ title: '请输入有效的身份证', icon: 'none' });
      return;
    }
    if (!(provinceCityRegion.value.length && address.trim().length)) {
      Taro.showToast({ title: '地址不能为空', icon: 'none' });
      return;
    }
    if (!content.length && !content.length < 30) {
      Taro.showToast({ title: '个人介绍不能为空或者小于30个字', icon: 'none' });
      return;
    }
    Taro.showToast({ title: '注册成功' });
  }
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      realName,
      content,
      provinceCityRegion,
      address,
      avatar,
      phone,
      residentId,
    } = this.state;
    return (
      <View className='registerArtist'>
        <i-panel title='个人头像'>
          <ImagePickerComp
            count={1}
            files={avatar}
            onRemove_={this.remove.bind(this)}
            onAdd_={this.add.bind(this)}
          />
        </i-panel>
        <i-input
          title='名字'
          placeholder='真实名字'
          value={realName}
          maxlength={-1}
          onChange={this.onChangeRealName.bind(this)}
        />
        <i-input
          title='手机'
          placeholder='手机号码'
          value={phone}
          maxlength={11}
          onChange={this.onChangePhone.bind(this)}
        />
        <i-input
          title='身份证'
          placeholder='身份证号码'
          value={residentId}
          maxlength={18}
          onChange={this.onChangeResidentId.bind(this)}
        />

        <Picker mode='region' onChange={this.onChangeProvinceCityRegion.bind(this)}>
          <View onClick={this.hideKeyBoard.bind(this)}>
            <i-input
              title='省市区'
              placeholder='省份/城市/区域'
              value={provinceCityRegion.value.join('/')}
              disabled
            />
          </View>
        </Picker>
        <i-input
          title='地址'
          placeholder='详细地址'
          value={address}
          maxlength={150}
          onChange={this.onChangeAddress.bind(this)}
          type='textarea'
        />
        <i-input
          title='介绍'
          placeholder='个人介绍'
          value={content}
          maxlength={-1}
          onChange={this.onChangeContent.bind(this)}
        />
        <View className='button-wrapper'>
          <Button size='mini' className='primary' onClick={this.register.bind(this)}>
            注册艺人
          </Button>
        </View>
      </View>
    );
  }
}

export default Registerartist;
