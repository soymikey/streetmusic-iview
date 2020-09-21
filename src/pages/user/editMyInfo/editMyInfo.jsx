/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Picker } from '@tarojs/components';
import ImagePickerComp from '@/components/ImagePickerComp/ImagePickerComp';
import './editMyInfo.scss';
import { getUserInfo, updateUserInfo } from '@/api/user';
import { connect } from '@tarojs/redux'
import validator from '@/utils/validator'
import { uploadImage } from '@/api/common';
import { setUserInfo } from '@/actions/user'

@connect(state => state, { setUserInfo })

class EditMyInfo extends Component {
  config = {
    navigationBarTitleText: '编辑资料',
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

      provinceCityRegion: { code: [], value: [] },
      address: '',
      avatar: '',
      city: '',
      cityCode: '',
      country: '',
      gender: '',
      id: '',
      introduction: '',
      language: '',
      lastLogin: '',
      nickName: '',
      phone: '',
      province: '',
      provinceCode: '',
      realName: '',
      region: '',
      regionCode: '',
      registerArtistDate: '',
      registerDate: '',
      residentId: '',
      role: '',
      state: '',
      token: '',
      isDisabled: false

    };
  }
  componentDidMount() {
    getUserInfo({ id: this.props.user.id }).then(res => {
      const {
        address,
        avatar,
        city,
        cityCode,
        country,
        gender,
        id,
        introduction,
        language,
        lastLogin,
        nickName,
        phone,
        province,
        provinceCode,
        realName,
        region,
        regionCode,
        registerArtistDate,
        registerDate,
        residentId,
        role,
        state,
        token,
      } = res.data
      this.setState({
        avatar: [{ url: avatar }],
        address,
        city,
        cityCode,
        country,
        gender,
        id,
        introduction,
        language,
        lastLogin,
        nickName,
        phone,
        province,
        provinceCode,
        realName,
        region,
        regionCode,
        registerArtistDate,
        registerDate,
        residentId,
        role,
        state,
        token,
        provinceCityRegion: {
          code: [provinceCode,
            cityCode,
            regionCode,], value: [
              province,
              city,
              region,]
        },
      })
    })

  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  onChangeName(e) {
    this.setState({ nickName: e.target.detail.value });
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
  onChangeIntroduction(e) {
    this.setState({ introduction: e.detail.detail.value });
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
  async updateMyInfo() {
    const {
      provinceCityRegion,
      address,
      avatar,
      introduction,
      nickName,
      phone,
    } = this.state;



    const isValid = validator(
      [

        {
          value: avatar,
          rules: [{
            rule: 'arrLength',
            msg: '头像不能为空'
          }]
        },
        {
          value: nickName,
          rules: [{
            rule: 'required',
            msg: '昵称不能为空'
          }]
        },
        {
          value: phone,
          rules: [{
            rule: 'isMobile',
          }]
        },

        {
          value: provinceCityRegion.value,
          rules: [{
            rule: 'arrLength',
            msg: '省市区不能为空'
          }]
        },
        {
          value: address,
          rules: [{
            rule: 'required',
            msg: '地址不能为空'
          }]
        },
        {
          value: introduction,
          rules: [{
            rule: 'required',
            msg: '个人介绍不能为空或者小于30个字'
          },
          {
            rule: 'greater',
            type: 30,
            msg: '个人介绍不能为空或者小于30个字'
          }]
        },
      ]
    )
    if (!isValid.status) {
      Taro.showToast({ title: isValid.msg, icon: 'none' });
      return;
    }
    const avatar_ = []
    for (const item of avatar) {
      if (item.url.includes('http://qiniu.migaox.com')) {
        avatar_.push(item.url)
      } else {
        const isUploaded = await uploadImage(item.url, '/api/userinfo/avatar/upload')
        const isUploaded_ = JSON.parse(isUploaded)
        if (isUploaded_.errno !== 0) {
          Taro.showToast({ title: '上传失败', icon: 'none' })
          this.setState({ isDisabled: false });
          return
        } else {
          avatar_.push(isUploaded_.data.url)
        }
      }

    }
    const data = {
      provinceCityRegion,
      address,
      avatar: avatar_[0],
      introduction,
      nickName,
      phone,
      address
    }

    this.setState({ isDisabled: true });
    updateUserInfo(data).then(res => {
      this.setState({ isDisabled: false });
      setTimeout(async () => {
        await getUserInfo({ id: this.props.user.id }).then(res => {
          this.props.setUserInfo(res.data)
        })
        Taro.navigateBack(-1)
      }, 2000);

    }).catch(e => {

      this.setState({ isDisabled: false });

    })


  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const {

      provinceCityRegion,
      address,
      avatar,
      city,
      cityCode,
      country,
      gender,
      id,
      introduction,
      language,
      lastLogin,
      nickName,
      phone,
      province,
      provinceCode,
      realName,
      region,
      regionCode,
      registerArtistDate,
      registerDate,
      residentId,
      role,
      state,
      token,
      isDisabled
    } = this.state;
    return (
      <View className='editMyInfo'>
        <i-panel title='个人头像'>
          <ImagePickerComp
            count={1}
            files={avatar}
            onRemove_={this.remove.bind(this)}
            onAdd_={this.add.bind(this)}
          />
        </i-panel>
        <i-input
          title='昵称'
          placeholder='用户昵称'
          value={nickName}
          maxlength={-1}
          onChange={this.onChangeName.bind(this)}
        />
        <i-input
          title='手机'
          placeholder='手机号码'
          value={phone}
          maxlength={11}
          onChange={this.onChangePhone.bind(this)}
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
          value={introduction}
          maxlength={-1}
          onChange={this.onChangeIntroduction.bind(this)}
        />
        <View className='button-wrapper'>
          <Button size='mini' className='primary' onClick={this.updateMyInfo.bind(this)} disabled={isDisabled}>
            更新资料
          </Button>
        </View>
      </View>
    );
  }
}

export default EditMyInfo;
