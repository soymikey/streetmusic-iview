/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Picker } from '@tarojs/components';
import ImagePickerComp from '@/components/ImagePickerComp/ImagePickerComp';
import { createEvent, getEventDetailById, updateEvent } from '@/api/event';
import { uploadImage } from '@/api/common';
import validator from '@/utils/validator'

import './uploadEvent.scss';

class UploadEvent extends Component {
  config = {
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
      introduction: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      provinceCityRegion: { code: [], value: [] },
      province: '',
      city: '',
      region: '',
      address: '',
      id: '',
      isEdit: false,
      poster: [],
      isDisabled: false,
      today:new Date(+new Date() + 8 * 3600 * 1000).toISOString().split('T')[0]
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() { }
  componentWillMount() {
    if (this.$router.params.id) {
      this.setState({ isEdit: true, id: this.$router.params.id }, () => {
        this.getEventDetail()
        Taro.setNavigationBarTitle({
          title: '更新活动'
        })
      })
    } else {
      this.setState({ isEdit: false, id: '' });
      Taro.setNavigationBarTitle({
        title: '上传活动'
      })
    }
  }
  getEventDetail() {
    getEventDetailById({ id: this.state.id }).then(res => {
      const { address,
        city,
        cityCode,
        date,
        endTime,

        introduction,
        name,
        poster,
        province,
        provinceCode,
        region,
        regionCode,
        startTime,
      } = res.data
      let poster_ = []
      if (JSON.parse(poster).length) {
        poster_ = JSON.parse(poster).map(item => { return { url: item } })
      }
      this.setState({
        name,
        introduction,
        date: date.slice(0, 10),
        startTime,
        endTime,
        address,
        poster: poster_,
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
  onChangeTime(e) {
    this.setState({ duration: e.detail.value });
  }
  onChangeName(e) {
    this.setState({ name: e.detail.detail.value });
  }
  onChangeIntroduction(e) {
    this.setState({ introduction: e.detail.detail.value });
  }
  onChangeStartDate(e) {
    this.setState({ startDate: e.detail.value });
  }
  onChangeEndDate(e) {
    this.setState({ endDate: e.detail.value });
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
  getAddress() {
    Taro.chooseLocation({
      success: (res) => {
        if (res.errMsg === "chooseLocation:ok") {
          this.setState({ address: res.name + ' ' + res.address })
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
              Taro.showToast({ title: '获取修改状态失败' })
            }
          }

        })
      }
    })
  }
  async onClickUpload() {

    const {
      name,
      introduction,
      startDate,
      endDate,
      startTime,
      endTime,
      address,
      poster,
      provinceCityRegion,
    } = this.state;

    const isValid = validator([
      {
        value: name,
        rules: [{
          rule: 'required',
          msg: '活动名称不能为空'
        }]
      },
      {
        value: introduction,
        rules: [
          {
            rule: 'required',
            msg: '活动介绍不能为空'
          }, {
            rule: 'greater',
            type: 30,
            msg: '活动介绍不能小于30个字'
          }]
      },
      {
        value: startDate,
        rules: [{
          rule: 'required',
          msg: '活动开始日期不能为空'
        }]
      },
      {
        value: startTime,
        rules: [{
          rule: 'required',
          msg: '活动开始时间不能为空'
        }]
      },
      {
        value: endDate,
        rules: [{
          rule: 'required',
          msg: '活动结束日期不能为空'
        }]
      },
      {
        value: endTime,
        rules: [{
          rule: 'required',
          msg: '活动结束时间不能为空'
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
        value: poster,
        rules: [{
          rule: 'arrLength',
          msg: '活动图片不能为空'
        }]
      },
    ])
    if (!isValid.status) {
      Taro.showToast({ title: isValid.msg, icon: 'none' });
      return;
    }
    const now_ = new Date()
    const startTime_ = new Date(Date.parse(`${startDate} ${startTime}`));
    const endTime_ = new Date(Date.parse(`${endDate} ${endTime}`));


    if (startTime_ < now_) {
      Taro.showToast({ title: '开始时间不能小于当前时间', icon: 'none' });
      return
    }
    if (startTime_ >= endTime_) {
      Taro.showToast({ title: '开始时间不能小于结束时间', icon: 'none' });
      return
    }




    const poster_ = []
    for (const item of poster) {
      if (item.url.includes('http://qiniu.migaox.com')) {
        poster_.push(item.url)
      } else {
        const isUploaded = await uploadImage(item.url, '/api/event/image/upload')
        console.log('isUploaded', isUploaded)
        const isUploaded_ = JSON.parse(isUploaded)
        if (isUploaded_.errno !== 0) {
          Taro.showToast({ title: '图片上传失败', icon: 'none' })
          this.setState({ isDisabled: false });
          return
        } else {
          poster_.push(isUploaded_.data.url)
        }
      }

    }
    const data = {
      name,
      introduction,
      startDate, endDate,
      startTime,
      endTime,
      address,
      poster: JSON.stringify(poster_),
      provinceCityRegion,
    }
    this.setState({ isDisabled: true });
    if (this.state.isEdit) {
      data.id = this.state.id
      updateEvent(data).then(res => {
        this.setState({ isDisabled: false });

        Taro.showToast({
          title: '更新成功', icon: 'none', duration: 2000, success: () => {
            setTimeout(() => {
              Taro.navigateBack(-1)
            }, 2000);
          }
        })


      }).catch(err => {
        this.setState({ isDisabled: false });
      })

    } else {
      createEvent(data).then(res => {
        this.setState({ isDisabled: false });
        Taro.showToast({ title: '创建成功', icon: 'none' })
        this.setState({
          name: '',
          introduction: '',
          startDate: '',
          endDate: '',
          startTime: '',
          endTime: '',
          provinceCityRegion: { code: [], value: [] },
          province: '',
          city: '',
          region: '',
          address: '',
          id: '',
          isEdit: false,
          poster: [],
        });

      }).catch(err => {
        this.setState({ isDisabled: false });
      })
    }


  }
  remove(index) {
    this.setState({
      poster: this.state.poster.filter((item, index_) => index_ !== index),
    });
  }
  async add(obj) {
    this.setState({
      poster: this.state.poster.concat(obj),
    });
  }
  hideKeyBoard() {
    Taro.hideKeyboard();
  }
  componentDidShow() { }

  componentDidHide() { }

  render() {
    const {
      name,
      introduction,
      startDate, endDate,
      startTime,
      endTime,
      address,
      poster,
      provinceCityRegion,
      isEdit,
      id,
      isDisabled,today
    } = this.state;
    console.log('poster', poster)
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
          onChange={this.onChangeIntroduction.bind(this)}
          value={introduction}
          title='介绍'
          placeholder='活动介绍'
          maxlength={150}
          type='textarea'
        />

        <View style='display:flex' >
          <View style='flex:1'>
            <Picker mode='date' onChange={this.onChangeStartDate.bind(this)} value={startDate} start={today}>
              <View onClick={this.hideKeyBoard.bind(this)}>
                <i-input title='开始日期' placeholder='开始日期' value={startDate} disabled />
              </View>
            </Picker></View>
          <View style='flex:1'>
            <Picker mode='time' onChange={this.onChangeStartTime.bind(this)} value={startTime}>
              <View onClick={this.hideKeyBoard.bind(this)}>
                <i-input
                  title='开始时间'
                  placeholder='活动开始时间'
                  value={startTime}
                  disabled
                />
              </View>
            </Picker></View>
        </View>
        <View style='display:flex' >
          <View style='flex:1'>
            <Picker mode='date' onChange={this.onChangeEndDate.bind(this)} value={endDate}>
              <View onClick={this.hideKeyBoard.bind(this)}>
                <i-input title='结束日期' placeholder='结束日期' value={endDate} disabled />
              </View>
            </Picker></View>
          <View style='flex:1'>
            <Picker mode='time' onChange={this.onChangeEndTime.bind(this)} value={endTime}>
              <View onClick={this.hideKeyBoard.bind(this)}>
                <i-input
                  title='结束时间'
                  placeholder='活动结束时间'
                  value={endTime}
                  disabled
                />
              </View>
            </Picker></View>
        </View>



        <Picker mode='region' onChange={this.onChangeProvinceCityRegion.bind(this)}  value={provinceCityRegion.value}>
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
          placeholder='活动举办地址'
          value={address}
          maxlength={-1}
          onChange={this.onChangeAddress.bind(this)}
        /> */}
        <View style='display:flex'>
          <View style='width:80%;'>
            <i-input
              title='地址'
              placeholder='活动举办地址'
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
              onClick={this.getAddress.bind(this)}
            >
              地址
          </Button>
          </View>

        </View>

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
              disabled={isDisabled}
              onClick={this.onClickUpload.bind(this)}
            >
              更新活动
            </Button>
          ) : (
              <Button
                size='mini'
                className='primary'
                disabled={isDisabled}
                onClick={this.onClickUpload.bind(this)}
              >
                上传活动
              </Button>
            )}
        </View>
      </View>
    );
  }
}

export default UploadEvent;
