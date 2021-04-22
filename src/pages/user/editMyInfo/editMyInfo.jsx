/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Picker } from '@tarojs/components';
import ImagePickerComp from '@/components/ImagePickerComp/ImagePickerComp';
import './editMyInfo.scss';
import { getUserFullInfo, updateUserInfo } from '@/api/user';
import validator from '@/utils/validator';
import { uploadImage, getSMSCode } from '@/api/common';
import { get, set, remove, clear } from '@/utils/localStorage';
import { connect } from '@tarojs/redux';
import { setUserInfo } from '../../../actions/user';

let clock;
@connect(
  ({ user }) => ({
    user,
  }),
  dispatch => ({
    setUserInfo(data) {
      dispatch(setUserInfo(data));
    },
  })
)
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
      isDisabled: false,
      code: '',
      smsDisabled: false,
      smsText: '点击发送验证码',
      smsCountDown: 60,
      randomCode: '',
      DOB: '',
    };
  }
  componentDidMount() {
    getUserFullInfo({}).then(res => {
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
        DOB,
      } = res.data;

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
        DOB,
        role,
        state,
        token,
        provinceCityRegion: {
          code: [provinceCode, cityCode, regionCode],
          value: [province, city, region],
        },
      });
    });
  }

  componentWillReceiveProps(nextProps) {}
  onChangeNickname(e) {
    this.setState({ nickName: e.target.detail.value });
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
  getAddress() {
    Taro.chooseLocation({
      success: res => {
        if (res.errMsg === 'chooseLocation:ok') {
          this.setState({ address: res.name + ' ' + res.address });
        }
      },
      fail: err => {
        Taro.showModal({
          title: '提示',
          content: '请在设置里开启定位',
          success: res => {
            if (res.confirm) {
              Taro.switchTab({
                url: '/pages/user/user',
              });
            } else if (res.cancel) {
              Taro.showToast({ title: '获取修改状态失败' });
            }
          },
        });
      },
    });
  }
  onChangeAddress(e) {
    this.setState({ address: e.detail.detail.value });
  }
  onChangeCode(e) {
    this.setState({ code: e.detail.detail.value });
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
      realName,
      DOB,
      residentId,
    } = this.state;
    console.log('avatar', avatar);

    if (!this.state.code.length) {
      Taro.showToast({ title: '验证码不能为空', icon: 'none' });
      return;
    }
    if (this.state.code !== this.state.randomCode) {
      Taro.showToast({ title: '验证码不正确', icon: 'none' });
      return;
    }
    if (!avatar.length) {
      Taro.showToast({ title: '头像不能为空', icon: 'none' });
      return;
    }
    if (this.state.code !== this.state.randomCode) {
      Taro.showToast({ title: '验证码输入错误,请重试~', icon: 'none' });
      return;
    }
    const isValid = validator([
      {
        value: avatar,
        rules: [
          {
            rule: 'arrLength',
            msg: '头像不能为空',
          },
        ],
      },
      {
        value: nickName,
        rules: [
          {
            rule: 'required',
            msg: '昵称不能为空',
          },
        ],
      },
      {
        value: realName,
        rules: [
          {
            rule: 'required',
            msg: '真实名字不能为空',
          },
        ],
      },
      {
        value: DOB,
        rules: [
          {
            rule: 'required',
            msg: '生日不能为空',
          },
        ],
      },
      {
        value: residentId,
        rules: [
          {
            rule: 'isIdentityNumber',
          },
        ],
      },
      {
        value: phone,
        rules: [
          {
            rule: 'isMobile',
          },
        ],
      },

      {
        value: provinceCityRegion.value,
        rules: [
          {
            rule: 'arrLength',
            msg: '省市区不能为空',
          },
        ],
      },
      {
        value: address,
        rules: [
          {
            rule: 'required',
            msg: '地址不能为空',
          },
        ],
      },
      {
        value: introduction,
        rules: [
          {
            rule: 'required',
            msg: '个人介绍不能为空或者小于30个字',
          },
          {
            rule: 'greater',
            type: 30,
            msg: '个人介绍不能为空或者小于30个字',
          },
        ],
      },
    ]);
    if (!isValid.status) {
      Taro.showToast({ title: isValid.msg, icon: 'none' });
      return;
    }
    const avatar_ = [];
    console.log('avatar', avatar);
    for (const item of avatar) {
      if (item.url.includes('http://qiniu.migaox.com')) {
        avatar_.push(item.url);
      } else if (item.url.includes('thirdwx.qlogo.cn/')) {
        //微信默认头像不操作
      } else {
        console.log('item.url', item.url);
        const isUploaded = await uploadImage(item.url, '/api/userinfo/avatar/upload');
        console.log('isUploaded', isUploaded);
        const isUploaded_ = JSON.parse(isUploaded);
        if (isUploaded_.errno !== 0) {
          Taro.showToast({ title: '图片上传失败,请重新上传图片', icon: 'none' });
          this.setState({ isDisabled: false });
          return;
        } else {
          avatar_.push(isUploaded_.data.url);
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
      address,
      realName,
      DOB,
      residentId,
    };

    this.setState({ isDisabled: true });
    updateUserInfo(data)
      .then(res => {
        this.setState({ isDisabled: false, code: '' });
        setTimeout(async () => {
          const userInfo_ = get('userInfo') || {};
          await getUserFullInfo({ id: userInfo_.id }).then(res => {
            this.props.setUserInfo(res.data);
          });
          Taro.navigateBack(-1);
        }, 2000);
      })
      .catch(e => {
        this.setState({ isDisabled: false });
      });
  }
  onChangeDOB(e) {
    this.setState({ DOB: e.detail.value });
  }
  sendCode() {
    this.setState({
      smsDisabled: true,
      smsText: this.state.smsCountDown + '秒后可重新获取',
    });
    clock = setInterval(this.doLoop, 1000, this);
  }
  doLoop(that) {
    that.setState({ smsCountDown: that.state.smsCountDown - 1 }, () => {
      if (that.state.smsCountDown > 0) {
        that.setState({ smsText: that.state.smsCountDown + '秒后可重新获取' });
      } else {
        clearInterval(clock); //清除js定时器
        that.setState({
          smsText: '点击发送验证码',
          smsDisabled: false,
          smsCountDown: 60,
        });
      }
    });
  }
  fetchMSMCode() {
    const isValid = validator([
      {
        value: this.state.phone,
        rules: [
          {
            rule: 'isMobile',
          },
        ],
      },
    ]);
    if (!isValid.status) {
      Taro.showToast({ title: isValid.msg, icon: 'none' });
      return;
    }
    return getSMSCode({ phone: this.state.phone }).then(res => {
      this.setState({ randomCode: res.data.code });
      this.sendCode();
    });
  }
  hideKeyBoard() {
    Taro.hideKeyboard();
  }
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

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
      isDisabled,
      code,
      smsDisabled,
      smsCountDown,
      smsText,
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
          onChange={this.onChangeNickname.bind(this)}
        />
        <i-input
          title='实名制名字'
          placeholder='微信实名制名字'
          value={nickName}
          maxlength={8}
          onChange={this.onChangeRealName.bind(this)}
        />
        <Picker mode='date' onChange={this.onChangeDOB.bind(this)} value={DOB}>
          <View onClick={this.hideKeyBoard.bind(this)}>
            <i-input title='生日' placeholder='生日' value={DOB} disabled />
          </View>
        </Picker>
        <i-input
          title='身份证'
          placeholder='身份证号码'
          value={residentId}
          maxlength={18}
          type='number'
          onChange={this.onChangeResidentId.bind(this)}
        />
        <i-input
          title='手机'
          type='number'
          placeholder='手机号码'
          value={phone}
          maxlength={11}
          onChange={this.onChangePhone.bind(this)}
        />
        <View style='display:flex'>
          <View style='width:50%;'>
            <i-input
              title='验证码'
              placeholder='4位验证码'
              value={code}
              maxlength={4}
              onChange={this.onChangeCode.bind(this)}
              type='number'
            />
          </View>
          <View style='flex:1;display: flex; align-items: center;justify-content: end; background: #fff;'>
            <View style='text-align:right;width:100%;padding-right:15px'>
              <Button
                size='mini'
                className='success'
                onClick={this.fetchMSMCode.bind(this)}
                disabled={smsDisabled}>
                {smsText}
              </Button>
            </View>
          </View>
        </View>
        <Picker
          mode='region'
          onChange={this.onChangeProvinceCityRegion.bind(this)}
          value={provinceCityRegion.value}>
          <View onClick={this.hideKeyBoard.bind(this)}>
            <i-input
              title='省市区'
              placeholder='省份/城市/区域'
              value={provinceCityRegion.value.join('/')}
              disabled
            />
          </View>
        </Picker>
        {/* <i-input
          title='地址'
          placeholder='详细地址'
          value={address}
          maxlength={150}
          onChange={this.onChangeAddress.bind(this)}
          type='textarea'
        /> */}
        <View style='display:flex'>
          <View style='width:80%;'>
            <i-input
              title='地址'
              placeholder='详细地址'
              value={address}
              maxlength={150}
              onChange={this.onChangeAddress.bind(this)}
              type='textarea'
            />
          </View>
          <View style='flex:1;display: flex; align-items: center;justify-content: center; background: #fff;'>
            <Button
              size='mini'
              className='success'
              onClick={this.getAddress.bind(this)}>
              地址
            </Button>
          </View>
        </View>
        <i-input
          title='介绍'
          placeholder='个人介绍'
          value={introduction}
          maxlength={-1}
          onChange={this.onChangeIntroduction.bind(this)}
        />
        <View className='button-wrapper'>
          <Button
            size='mini'
            className='primary'
            onClick={this.updateMyInfo.bind(this)}
            disabled={isDisabled}>
            更新资料
          </Button>
        </View>
      </View>
    );
  }
}

export default EditMyInfo;
