import Taro, { Component } from '@tarojs/taro';
import { View, Image, Input, Textarea, Button } from '@tarojs/components';
import closeImg from '@/asset/images/poster1.png';
import { AtTextarea } from 'taro-ui'

import './FloatLayout.scss';

class FloatLayout extends Component {
  config = {
    usingComponents: {
      'i-input': '../../iView/input/index',
      'i-icon': '../../iView/icon/index'
    },
  };
  constructor() {
    super(...arguments);
    this.state = {
      address: ''
    };
  }


  handleClose() {
    this.props.onClose();
  }
  onChangeAddress(e) {
    this.setState({ address: e.detail.detail.value });
  }

  render() {
    const { isOpened, title } = this.props;
    const { address } = this.state;
    return (
      <View className={isOpened ? 'float-layout active' : 'float-layout'}>
        <View
          className='float-layout__overlay'
          onClick={this.handleClose.bind(this)}></View>
        <View className='float-layout__container layout'>
          <View className='layout-header  xmg-border-b'>
            {title}
            {/* <Image
              src={closeImg}
              className='close-img'
             
            /> */}

            <View className='close-img' onClick={this.handleClose.bind(this)}>  <i-icon type="close" /></View>




          </View>
          <View className='layout-body'>{this.props.children}
            {/* <View className='content1'>

              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
              <View className=''>11</View>
            </View> */}


            <View className='textarea' style='position: fixed;bottom: 0px;width: 94%;' >



              <AtTextarea
                cursorSpacing={200}
                value={address}
                onChange={this.onChangeAddress.bind(this)}
                maxLength={200}
                placeholder='请输入你的评论'
                height={100}
                style='width:100%'
              />
              <View style='text-align:center;margin-top:20px;margin-bottom:40px'>
                <Button size='mini' className='primary'>
                  发表
          </Button>

              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default FloatLayout;
