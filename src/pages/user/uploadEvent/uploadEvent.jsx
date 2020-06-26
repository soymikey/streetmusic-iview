/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Picker } from '@tarojs/components';
import ImagePickerComp from '@/components/ImagePickerComp/ImagePickerComp';
import './uploadEvent.scss';

class UploadEvent extends Component {
  config = {
    navigationBarTitleText: '上传活动',
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
      name: '',
      content: '',
      date: '',
      startTime: '',
      endTime: '',
      provinceCityRegion: { code: [], value: [] },
      province: '',
      city: '',
      region: '',
      address: '',
      id: '',
      isEdit: false,
      poster: [
        // {
        //   url: 'https://jimczj.gitee.io/lazyrepay/aragaki1.jpeg',
        // },
        // {
        //   url: 'https://jimczj.gitee.io/lazyrepay/aragaki2.jpeg',
        // },
        // {
        //   url: 'https://jimczj.gitee.io/lazyrepay/aragaki3.png',
        // },
      ],
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
    this.setState({ name: e.detail.detail.value });
  }
  onChangeContent(e) {
    this.setState({ content: e.detail.detail.value });
  }
  onChangeDate(e) {
    this.setState({ date: e.detail.value });
  }
  onChangeStartTime(e) {
    this.setState({ startTime: e.detail.value });
  }
  onChangeEndTime(e) {
    this.setState({ endTime: e.detail.value });
  }
  onChangeProvinceCityRegion(e) {
    this.setState({
      provinceCityRegion: { value: e.detail.value, code: e.detail.code },
    });
  }
  onChangeProvince(e) {
    this.setState({ province: e.detail.detail.value });
  }
  onChangeCity(e) {
    this.setState({ city: e.detail.detail.value });
  }
  onChangeRegion(e) {
    this.setState({ region: e.detail.detail.value });
  }
  onChangeAddress(e) {
    this.setState({ address: e.detail.detail.value });
  }

  onClickUpload() {
    const {
      name,
      content,
      date,
      startTime,
      endTime,
      address,
      poster,
      provinceCityRegion,
    } = this.state;
    if (!name.trim().length) {
      Taro.showToast({ title: '活动名称不能为空', icon: 'none' });
      return;
    }
    if (!content.length && !content.length < 30) {
      Taro.showToast({ title: '活动介绍不能为空或者小于30个字', icon: 'none' });
      return;
    }
    if (!date.trim().length) {
      Taro.showToast({ title: '活动日期不能为空', icon: 'none' });
      return;
    }
    if (!startTime.trim().length) {
      Taro.showToast({ title: '活动开始时间不能为空', icon: 'none' });
      return;
    }
    if (!endTime.trim().length) {
      Taro.showToast({ title: '活动结束时间不能为空', icon: 'none' });
      return;
    }
    if (!(provinceCityRegion.value.length && address.trim().length)) {
      Taro.showToast({ title: '地址不能为空', icon: 'none' });
      return;
    }
    if (!poster.length) {
      Taro.showToast({ title: '活动图片不能为空', icon: 'none' });
      return;
    }
    Taro.showToast({ title: '上传成功' });

    console.log(this.state);
  }
  remove(index) {
    this.setState({
      poster: this.state.poster.filter((item, index_) => index_ !== index),
    });
  }
  add(obj) {
    this.setState({
      poster: this.state.poster.concat(obj),
    });
  }
  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      name,
      content,
      date,
      startTime,
      endTime,
      address,
      poster,
      provinceCityRegion,
      isEdit,
      id,
    } = this.state;
    return (
      <View className='uploadEvent'>
        <i-input
          title='名称'
          placeholder='活动名称'
          value={name}
          maxlength={-1}
          onChange={this.onChangeName.bind(this)}
        />
        <i-input
          onChange={this.onChangeContent.bind(this)}
          value={content}
          title='介绍'
          placeholder='活动介绍'
          maxlength={150}
          type='textarea'
        />

        <Picker mode='date' onChange={this.onChangeDate.bind(this)}>
          <i-input title='日期' placeholder='活动日期' value={date} disabled />
        </Picker>
        <Picker mode='time' onChange={this.onChangeStartTime.bind(this)}>
          <i-input
            title='开始时间'
            placeholder='活动开始时间'
            value={startTime}
            disabled
          />
        </Picker>

        <Picker mode='time' onChange={this.onChangeEndTime.bind(this)}>
          <i-input
            title='结束时间'
            placeholder='活动结束时间'
            value={endTime}
            disabled
          />
        </Picker>
        <Picker mode='region' onChange={this.onChangeProvinceCityRegion.bind(this)}>
          <i-input
            title='省市区'
            placeholder='省份/城市/区域'
            value={provinceCityRegion.value.join('/')}
            disabled
          />
        </Picker>
        <i-input
          title='地址'
          placeholder='活动举办地址'
          value={address}
          maxlength={-1}
          onChange={this.onChangeAddress.bind(this)}
        />
        <i-panel title='活动图片'></i-panel>
        <ImagePickerComp
          files={poster}
          onRemove_={this.remove.bind(this)}
          onAdd_={this.add.bind(this)}
        />

        <View className='button-wrapper'>
          {isEdit ? (
            <Button
              size='mini'
              className='success'
              onClick={this.onClickUpload.bind(this)}>
              更新活动
            </Button>
          ) : (
            <Button
              size='mini'
              className='primary'
              onClick={this.onClickUpload.bind(this)}>
              上传活动
            </Button>
          )}
        </View>
      </View>
    );
  }
}

export default UploadEvent;
