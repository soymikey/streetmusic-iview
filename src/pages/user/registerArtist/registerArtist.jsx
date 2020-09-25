/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Picker } from '@tarojs/components';
import ImagePickerComp from '@/components/ImagePickerComp/ImagePickerComp';
import './registerArtist.scss';
import { getUserInfo, registerArtist } from '@/api/user';
import { connect } from '@tarojs/redux'
import validator from '@/utils/validator'
import { setUserInfo } from '@/actions/user'

@connect(state => state, { setUserInfo })

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
      introduction: '',
      provinceCityRegion: { code: [], value: [] },
      address: '',
      // avatar: [],
      phone: '',
      residentId: '',
      isDisabled: false,
    };
  }
  componentDidMount() {
    getUserInfo({ id: this.props.user.id }).then(res => {
      const { address,
        avatar, introduction,
      } = res.data
      this.setState({
        avatar: [{ url: avatar }],
      })
    })
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
  registerArtist() {
    const {
      realName,
      introduction,
      provinceCityRegion,
      address,
      phone,
      residentId,
    } = this.state;



    const isValid = validator(
      [

        {
          value: realName,
          rules: [{
            rule: 'required',
            msg: '真实名字不能为空'
          }]
        },
        {
          value: phone,
          rules: [{
            rule: 'isMobile',
          }]
        },
        {
          value: residentId,
          rules: [{
            rule: 'isIdentityNumber',
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
    const data = {
      realName,
      introduction,
      provinceCityRegion,
      address,
      phone,
      residentId,
    }
    this.setState({ isDisabled: true });
    registerArtist(data).then(res => {
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
      realName,
      introduction,
      provinceCityRegion,
      address,
      avatar,
      phone,
      residentId, isDisabled
    } = this.state;
    return (
      <View className='registerArtist'>
        {/* <i-panel title='个人头像'>
          <ImagePickerComp
            count={1}
            files={avatar}
            onRemove_={this.remove.bind(this)}
            onAdd_={this.add.bind(this)}
          />
        </i-panel> */}
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
          type="number"
          onChange={this.onChangePhone.bind(this)}
        />
        <i-input
          title='身份证'
          placeholder='身份证号码'
          value={residentId}
          maxlength={18}
          type="number"
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
          value={introduction}
          maxlength={-1}
          onChange={this.onChangeIntroduction.bind(this)}
        />
        <View className='button-wrapper'>
          <Button size='mini' className='primary' onClick={this.registerArtist.bind(this)} disabled={isDisabled}>
            注册艺人
          </Button>
        </View>
      </View>
    );
  }
}

export default Registerartist;
