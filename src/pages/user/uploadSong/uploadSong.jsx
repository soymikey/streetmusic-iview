/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Picker } from '@tarojs/components';

import { createSong, getSongDetailById, updateSong } from '@/api/song';
import validator from '@/utils/validator'
import './uploadSong.scss';

class Uploadsong extends Component {
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
    },
  };

  constructor() {
    super(...arguments);
    this.state = {
      name: '',
      introduction: '',
      duration: '',
      type: '',
      price: '',
      id: '',
      isEdit: false,
      isDisabled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() { }
  componentWillMount() {
    console.log(this.$router.params);
    if (this.$router.params.id) {
      this.setState({ isEdit: true, id: this.$router.params.id }, () => {
        this.getSongDetail()
      })
      Taro.setNavigationBarTitle({
        title: '更新歌曲'
      })
    } else {
      this.setState({ isEdit: false, id: '' });
      Taro.setNavigationBarTitle({
        title: '上传歌曲'
      })
    }
  }
  getSongDetail() {
    getSongDetailById({ id: this.state.id }).then(res => {
      console.log('res', res)

      const { createdDate,
        duration,
        id,
        introduction,
        name,
        price,
        type,
        userId, } = res.data
      this.setState({
        duration,
        id,
        introduction,
        name,
        price,
        type,
      })
    })
  }
  onChangeTime(e) {
    this.setState({ duration: e.detail.value });
  }
  onChangeName(e) {
    this.setState({ name: e.target.detail.value });
  }
  onChangeContent(e) {
    this.setState({ introduction: e.target.detail.value });
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
    const { name, introduction, duration, type, price } = this.state;
    const isValid = validator(
      [
        {
          value: name,
          rules: [{
            rule: 'required',
            msg: '歌曲名称不能为空'
          }]
        },
        {
          value: duration,
          rules: [{
            rule: 'required',
            msg: '歌曲时间不能为空'
          }]
        },
        // {
        //   value: type,
        //   rules: [{
        //     rule: 'required',
        //     msg: '歌曲类型不能为空'
        //   }]
        // },
        {
          value: price,
          rules: [{
            rule: 'isPrice',
            msg: '歌曲价格只能是整数或者两位小数'
          }]
        },
      ]
    )
    if (!isValid.status) {
      Taro.showToast({ title: isValid.msg, icon: 'none' });
      return;
    }
    const data = {
      name, introduction, duration, type, price
    }
    if (this.state.isEdit) {
      data.id = this.state.id
      updateSong(data).then(res => {
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
      createSong(data).then(res => {
        this.setState({ isDisabled: false });
        Taro.showToast({ title: '创建成功', icon: 'none' })
        this.setState({
          name: '', introduction: '', duration: '', type: '', price: '',
          id: '',
          isEdit: false,

        });

      }).catch(err => {
        this.setState({ isDisabled: false });
      })
    }

  }
  hideKeyBoard() {
    Taro.hideKeyboard();
  }
  componentDidShow() {

  }

  componentDidHide() { }

  render() {
    const { name, introduction, duration, type, price, isEdit, id, isDisabled } = this.state;
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
          value={introduction}
          title='介绍'
          placeholder='歌曲介绍'
          maxlength={150}
          type='textarea'
        />

        <Picker mode='time' onChange={this.onChangeTime.bind(this)}>
          <View onClick={this.hideKeyBoard.bind(this)}>
            <i-input title='时长' placeholder='歌曲时长' value={duration} disabled />
          </View>
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
              disabled={isDisabled}
              onClick={this.onClickUpload.bind(this)}
            >
              更新歌曲
            </Button>
          ) : (
              <Button
                size='mini'
                className='primary'
                disabled={isDisabled}
                onClick={this.onClickUpload.bind(this)}
              >
                上传歌曲
              </Button>
            )}
        </View>
      </View>
    );
  }
}

export default Uploadsong;
