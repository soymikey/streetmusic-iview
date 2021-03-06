import Taro, { Component, showToast } from '@tarojs/taro';
import { View, Image, Input, Textarea, Button } from '@tarojs/components';
import { AtTextarea } from 'taro-ui'
import { createComment } from '@/api/common';
// import {sensitiveFilter} from '@/utils/keywordFilter'
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
      content: '',
      isDisabled: false,
    };
  }


  handleClose() {
    this.props.onClose();
  }
  onChangeContent(value) {
    this.setState({ content: value });
  }

  commit() {
    if (!this.state.content) {
      Taro.showToast({
        title: '发布内容不能为空'
      })
      return
    }
    const data = {
      content: this.state.content,
      type: this.props.type,
      id: this.props.id_
    }
    createComment(data).then(res => {
      this.setState({ isDisabled: false, content: '', });
      this.props.onClose();
      Taro.showToast({
        title: '评论成功'
      })
      const currentPage = Taro.getCurrentPages()[Taro.getCurrentPages().length - 1]
      const currentPath = currentPage.$component.$router.path
      if(currentPath==='/pages/event/eventDetail/eventDetail'){
        currentPage.onReady()
      }
      console.log('currentPath', currentPath)
    }).catch(e => {
      this.setState({ isDisabled: false });
    })
  }
  render() {
    const { isOpened, title } = this.props;
    const { content, isDisabled } = this.state;
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
            <View className='textarea' style='position: fixed;bottom: 0px;width: 94%;' >
              <AtTextarea
                cursorSpacing={200}
                value={content}
                onChange={this.onChangeContent.bind(this)}
                maxLength={200}
                placeholder='请输入你的评论'
                height={100}
                style='width:100%'
              />
              <View style='text-align:center;margin-top:20px;margin-bottom:40px'>
                <Button size='mini' className='primary' onClick={this.commit.bind(this)} disabled={isDisabled}>
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

FloatLayout.defaultProps = {
  isOpened: false,
  title: '',
  id_: '',
  type: 1
};