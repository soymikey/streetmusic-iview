import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { AtImagePicker } from 'taro-ui';

import './ImagePickerComp.scss';

class ImagePickerComp extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
    },
  };
  constructor() {
    super(...arguments);
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    
  }

  componentWillUnmount() {}
  uploadPhoto(files, operation, index) {
    console.log('files', files);
    if (operation === 'remove') {
      this.props.onRemove_(index);
    }
    if (operation === 'add') {
      this.props.onAdd_(files[files.length - 1]);

      // var that = this;
      // Taro.chooseImage({
      //   count: 1, // 默认9
      //   sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      //   success: function(res) {
      //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      //     var tempFilePaths = res.tempFilePaths;
      //     console.log('res', res);
      //     // this.upload(that, tempFilePaths);
      //   },
      // });
    }
  }
  upload(page, path) {
    Taro.showToast({
      icon: 'loading',
      title: '正在上传',
    }),
      Taro.uploadFile({
        url: 'url',
        filePath: path[0],
        name: 'file',
        header: { 'Content-Type': 'multipart/form-data' },
        formData: {
          //和服务器约定的token, 一般也可以放在header中
          // session_token: Taro.getStorageSync('session_token'),
        },
        success: function(res) {
          console.log(res);
          if (res.statusCode != 200) {
            Taro.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false,
            });
            return;
          }
          var data = res.data;
          // page.setData({
          //   //上传成功修改显示头像
          //   src: path[0],
          // });
          page.setState({ poster: [...this.state.poster, data.url] });
        },
        fail: function(e) {
          console.log(e);
          Taro.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false,
          });
        },
        complete: function() {
          Taro.hideToast(); //隐藏Toast
        },
      });
  }
  onFail(mes) {
    console.log(mes);
  }
  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { files, mode, multiple, count, sizeType, sourceType, length } = this.props;

    //     files	图片文件数组, 元素为对象, 包含属性 url（必选)	Array	-	[]
    // mode	图片预览模式，详见(微信开发者文档)[https://developers.weixin.qq.com/miniprogram/dev/component/image.html]	String	'scaleToFill'|'aspectFit'|'aspectFill'|'widthFix'|'top'|'bottom'|'center'|'left'|'right'|'top left'|'top right'|'bottom left'|'bottom right'	aspectFill
    // showAddBtn	是否显示添加图片按钮	Boolean	-	true
    // multiple	是否支持多选	Boolean	-	false
    // count	最多可以选择的图片张数，2.0.2 版本起支持	Number	0 ～ 99	默认为1，当multiple为true时候，为99，此选项设置和multiple冲突时，以该项优先
    // sizeType	所选的图片的尺寸，2.0.2 版本起支持	Array	-	['original', 'compressed']
    // sourceType	选择图片的来源，2.0.2 版本起支持	Array	-	['album', 'camera']
    // length	单行的图片数量
    return (
      <View>
        <AtImagePicker
          files={files}
          mode={mode}
          showAddBtn={files.length < count}
          multiple
          count={count}
          sizeType={sizeType}
          sourceType={sourceType}
          length={length}
          onChange={this.uploadPhoto.bind(this)}
          onFail={this.onFail.bind(this)}
        />
      </View>
    );
  }
}

export default ImagePickerComp;
// defaultProps
ImagePickerComp.defaultProps = {
  files: [],
  mode: 'aspectFit',
  multiple: true,
  count: 4,
  sizeType: ['compressed'],
  sourceType: ['album', 'camera'],
  length: 4,
};
